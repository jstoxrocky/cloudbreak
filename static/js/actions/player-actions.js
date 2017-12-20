import bs58 from 'bs58';
import {Tokens, Player, Data, PLAYER_ADDRESS, web3, BASIC_OPTIONS} from "../utils/contracts"
import { NO_CURRENT_TRACK, TX_SUCCESS, TX_FAILURE, CURRENT_TRACK_LOADED } from '../utils/reports'
import axios from 'axios'
import {BASE_URL} from '../utils/endpoints'
import merge from 'lodash/merge';

export const PLAYER_UPDATE = "PLAYER_UPDATE";
export const PLAYER_UPDATE_PENDING = "PLAYER_UPDATE_PENDING";
export const PLAYER_UPDATE_FULFILLED = "PLAYER_UPDATE_FULFILLED";
export const PLAYER_STREAM = "PLAYER_STREAM";
export const PLAYER_STREAM_PENDING = "PLAYER_STREAM_PENDING";
export const PLAYER_STREAM_FULFILLED = "PLAYER_STREAM_FULFILLED";
export const PLAYER_STREAM_REJECTED = "PLAYER_STREAM_REJECTED"
export const PLAYER_UPDATE_REJECTED = "PLAYER_UPDATE_REJECTED"


const api = axios.create({
	withCredentials: true
});

const toIPFSHash = (hashFunction, size, currentTrack) => {
	const bytesHashFunction = web3.utils.hexToBytes(hashFunction);
	const bytesSize = web3.utils.hexToBytes(size);
	const bytesTrackHash = web3.utils.hexToBytes(currentTrack);
	const combinedBytes = [...bytesHashFunction, ...bytesSize, ...bytesTrackHash];
	const IPFSHash = bs58.encode(combinedBytes);
	return IPFSHash
}

const getUserAddress = () => web3.eth.getAccounts()
const getUserBalance = (user) => Tokens.methods.balanceOf(user).call()
const getServiceAllowance = (owner, spender) => Tokens.methods.allowance(owner, spender).call()
const getTrackBalance = (trackHash) => Tokens.methods.trackBalanceOf(trackHash).call()
const getPlayCount = (trackHash) => Data.methods.getPlayCount(trackHash).call()
const getCurrentTrack = (user) => Player.methods.getCurrentTrack(user).call()
const getTrackBasicMetadataByHash = (trackHash, key) => Data.methods.getTrackBasicMetadataByHash(trackHash, key).call()
const stream = (user, keccakTrackHash) => {
	BASIC_OPTIONS.from = user
	return Player.methods.stream(keccakTrackHash).send(BASIC_OPTIONS)
}

async function getCurrentTrackMetadata(user) {
	let {0:hashFunction, 1:size, 2:currentTrack} = await getCurrentTrack(user)
	if (web3.utils.hexToNumberString(currentTrack) == '0') {
		// Happens when a user has no current track in contract
		// http://www.openmusicarchive.org/search.php
		// QmToc9eiqg1bPbNGhjvnwqtECLFUyXP9cGnxWU2UYXou3b
		// Dock Boggs - Sugar Baby
		hashFunction = '0x12'
		size = '0x20'
		currentTrack = '0x513238ec31f312643fe2d73d735c9217c8403a812d0585a4312a5cbd117af996'
	}
	let [artistMetadata, titleMetadata, trackBalance, playCount] = await Promise.all([
		getTrackBasicMetadataByHash(currentTrack, 'artist'), 
		getTrackBasicMetadataByHash(currentTrack, 'title'),
		getTrackBalance(currentTrack),
		getPlayCount(currentTrack),
	])
	let {0:artist, 1:artistIsVerified} = artistMetadata
	let {0:title, 1:titleIsVerified} = titleMetadata
	return {
		artist: artist,
		artistIsVerified: artistIsVerified,
		title: title,
		titleIsVerified: titleIsVerified,
		currentTrack: toIPFSHash(hashFunction, size, currentTrack),
		trackBalance: trackBalance,
		msg: CURRENT_TRACK_LOADED,
		playCount: playCount,
		visible: false,
		msg: null,
		level: 'alert-success',
	}
}

async function getCurrentState() {
	let [user] = await getUserAddress();
	let payload = {}
	try {
		let [currentTrackMetadata, userBalance, serviceAllowance] = await Promise.all([
			getCurrentTrackMetadata(user), 
			getUserBalance(user),
			getServiceAllowance(user, PLAYER_ADDRESS),
		])
		payload = merge(payload, currentTrackMetadata);
		payload.userBalance = userBalance
		payload.serviceAllowance = serviceAllowance
	} catch(err) {
		// Happens when metamask is set to main and not testnet
		console.log(err)
		payload.userBalance = 0
		payload.serviceAllowance = 0
		payload.visible = true
		payload.msg = "Could not get current track. Please make sure you are signed into Rinkeby Testnet."
		payload.level = 'alert-danger'
	}
	return payload
}

async function streamAndUpdateState(keccakTrackHash) {

	// not ebough tokens?
	// apprived?

	let users = await getUserAddress();
	let user = users[0];
	let receipt = await stream(user, keccakTrackHash)
	let status = !!web3.utils.hexToNumber(receipt.status)
	let msg = status ? 'Success': 'Transaction failed'
	let state = await getCurrentState();
	state.msg = msg
	state.status = !status
	return state
}

export const updatePlayer = () => ({
	type: PLAYER_UPDATE,
	payload: getCurrentState(),
})

export const submitStream = keccakTrackHash => ({
	type: PLAYER_STREAM,
	payload: streamAndUpdateState(keccakTrackHash)
})







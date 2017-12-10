import bs58 from 'bs58';
import {Tokens, Player, Data, PLAYER_ADDRESS, web3, GAS, GAS_PRICE, ZERO_HEX} from "../utils/contracts"
import { NO_CURRENT_TRACK, TX_SUCCESS, TX_FAILURE, CURRENT_TRACK_LOADED } from '../utils/reports'
import axios from 'axios'
import {BASE_URL} from '../utils/endpoints'

export const UPDATE_PLAYER = "UPDATE_PLAYER";
export const UPDATE_PLAYER_PENDING = "UPDATE_PLAYER_PENDING";
export const UPDATE_PLAYER_FULFILLED = "UPDATE_PLAYER_FULFILLED";
export const STREAM = "STREAM";
export const STREAM_PENDING = "STREAM_PENDING";
export const STREAM_PENDING_REJECTED = "STREAM_PENDING_REJECTED"
export const STREAM_REJECTED = "STREAM_REJECTED"
export const STREAM_FULFILLED = "STREAM_FULFILLED";
export const RADIO_OPTION_CHANGE = "RADIO_OPTION_CHANGE";
export const SEARCH = "SEARCH"
export const SEARCH_PENDING = "SEARCH_PENDING"
export const SEARCH_FULFILLED = "SEARCH_FULFILLED"
export const APPROVE = "APPROVE"

const api = axios.create({
	withCredentials: true
});

const toIPFSHash = (hexArray) => {
	const hexHashFunction = hexArray[0];
	const hexSize = hexArray[1];
	const hexTrackHash = hexArray[2];
	const bytesHashFunction = web3.utils.hexToBytes(hexHashFunction);
	const bytesSize = web3.utils.hexToBytes(hexSize);
	const bytesTrackHash = web3.utils.hexToBytes(hexTrackHash);
	const combinedBytes = [...bytesHashFunction, ...bytesSize, ...bytesTrackHash];
	const IPFSHash = bs58.encode(combinedBytes);
	return IPFSHash
}

const _getUserAddress = () => web3.eth.getAccounts()

const _getUserBalance = (user) => Tokens.methods.balanceOf(user).call()

const _getServiceAllowance = (owner, spender) => Tokens.methods.allowance(owner, spender).call()

const _getTrackBalance = (trackHash) => Tokens.methods.trackBalanceOf(trackHash).call()

const _getPlayCount = (trackHash) => Data.methods.getPlayCount(trackHash).call()

const _getCurrentTrack = (user) => Player.methods.getCurrentTrack(user).call()

const _getTrackBasicMetadataByHash = (trackHash, key) => Data.methods.getTrackBasicMetadataByHash(trackHash, key).call()


const _getCurrentTrackMetadata = (user) => {
	let track = _getCurrentTrack(user)
	let metadata = track.then((receipt) => {
		const currentTrack = track.value()[2]
		return Promise.all([
			_getTrackBasicMetadataByHash(currentTrack, 'artist'), 
			_getTrackBasicMetadataByHash(currentTrack, 'title'),
			_getTrackBalance(currentTrack),
			_getPlayCount(currentTrack),
		])
	})
	return metadata.then(() => {
		let result = metadata.value()
		let hexTrackValues = track.value()
		let hexTrackHash = track.value()[2]
		let currentTrack = toIPFSHash(hexTrackValues)
		const payload = {
			artist: result[0][0],
			artistIsVerified: result[0][1],
			title: result[1][0],
			titleIsVerified: result[1][1],
			currentTrack: currentTrack,
			msg: CURRENT_TRACK_LOADED,
			trackBalance: result[2],
			playCount: result[3],
		}
		if (hexTrackHash == ZERO_HEX) {
			payload.msg = NO_CURRENT_TRACK;
		}
		return new Promise((resolve, reject) => resolve(payload))
	})
}

const _updatePlayer = (user) => {
	let metadata = _getCurrentTrackMetadata(user)
	let userBalance = metadata.then(() => {
		return _getUserBalance(user)
	})
	let serviceAllowance = userBalance.then(() => {
		return _getServiceAllowance(user, PLAYER_ADDRESS)
	})
	return serviceAllowance.then(() => {
		let metadataResult = metadata.value()
		metadataResult.userBalance = userBalance.value()
		metadataResult.serviceAllowance = serviceAllowance.value()
		return new Promise((resolve, reject) => resolve(metadataResult))
	})
}

const _approve = (user, spender, value) => {
	const options = {
		gas: GAS,
		gasPrice: GAS_PRICE,
		from: user,
	}
	return Tokens.methods.approve(spender, value).send(options)
		.catch(function(error){
		    return {'status':'0x0'}
		});
}

const _stream = (user, keccakTrackHash) => {
	const options = {
		gas: GAS,
		gasPrice: GAS_PRICE,
		from: user,
	}
	return Player.methods.stream(keccakTrackHash).send(options)
		.catch(function(error){
		    return {'status':'0x0'}
		});
}

const _stream_and_fetch_metadata = (user, keccakTrackHash) => {
	let streamTX = _stream(user, keccakTrackHash)
	let metadata = streamTX.then(() => {
		return _updatePlayer(user)
	})
	return metadata.then(() => {
		let txReceipt = streamTX.value()
		let txSuccess = !!web3.utils.hexToNumber(txReceipt.status)
		let payload = metadata.value()
		payload.msg = txSuccess ? TX_SUCCESS : TX_FAILURE
		return new Promise((resolve, reject) => resolve(payload))
	})
}


export const radioOptionChange = (value) => ({
	type: RADIO_OPTION_CHANGE,
	payload: value,
})

export const updatePlayer = () => ({
	type: UPDATE_PLAYER,
	payload: _getUserAddress().then((receipt) => {
			const user = receipt[0]
			return new Promise((resolve, reject) => resolve(_updatePlayer(user)))
		}),
})

export const stream = keccakTrackHash => ({
	type: STREAM,
	payload: _getUserAddress().then((receipt) => {
			const user = receipt[0]
			return new Promise((resolve, reject) => resolve(_stream(user, keccakTrackHash)))
		}),
})

export const approve = value => ({
	type: APPROVE,
	payload: _getUserAddress().then((receipt) => {
			const user = receipt[0]
			return new Promise((resolve, reject) => resolve(_approve(user, PLAYER_ADDRESS, value)))
		}),
})


export const search = (query) => {
	return {
		type: "SEARCH", 
		payload: api.get(BASE_URL+'/search', {
		    params: {
		      query: query,
		    }
  		})
	}
}

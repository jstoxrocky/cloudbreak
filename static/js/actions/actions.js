import bs58 from 'bs58';
import {Tokens, Player, Data, web3, GAS, GAS_PRICE} from "../contracts/contracts"


export const UPDATE_PLAYER = "UPDATE_PLAYER";
export const UPDATE_PLAYER_PENDING = "UPDATE_PLAYER_PENDING";
export const UPDATE_PLAYER_FULFILLED = "UPDATE_PLAYER_FULFILLED";

export const STREAM = "STREAM";
export const STREAM_PENDING = "STREAM_PENDING";
export const STREAM_PENDING_REJECTED = "STREAM_PENDING_REJECTED"
export const STREAM_REJECTED = "STREAM_REJECTED"
export const STREAM_FULFILLED = "STREAM_FULFILLED";

export const RADIO_OPTION_CHANGE = "RADIO_OPTION_CHANGE";


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

const _getTokenBalance = (user) => Tokens.methods.getTokenBalance(user).call()

const _getCurrentTrack = (user) => Player.methods.getCurrentTrack(user).call()

const _getTrackBasicMetadataByHash = (trackHash, key) => Data.methods.getTrackBasicMetadataByHash(trackHash, key).call()

const _getCurrentTrackMetadata = (user) => {
	let track = _getCurrentTrack(user)
	let metadata = track.then((receipt) => {
		const currentTrack = receipt[2]
		return Promise.all([
			_getTrackBasicMetadataByHash(currentTrack, 'artist'), 
			_getTrackBasicMetadataByHash(currentTrack, 'title'),
		])
	})
	return metadata.then(() => {
		let result = metadata.value()
		let hex_track_values = track.value()
		let IPFSHash = toIPFSHash(hex_track_values)
		const payload = {
			artist: result[0][0],
			artistIsVerified: result[0][1],
			title: result[1][0],
			titleIsVerified: result[1][1],
			currentTrack: IPFSHash,
		}
		return new Promise((resolve, reject) => resolve(payload))
	})
}

const _updatePlayer = (user) => {
	let metadata = _getCurrentTrackMetadata(user)
	let balance = metadata.then(() => {
		return _getTokenBalance(user)
	})
	return balance.then(() => {
		let tokenBalance = balance.value()
		let metadataResult = metadata.value()
		metadataResult.balance = tokenBalance
		return new Promise((resolve, reject) => resolve(metadataResult))
	})
}

const _stream = (user, keccakTrackHash) => {
	const options = {
		gas: GAS,
		gasPrice: GAS_PRICE,
		from: user,
	}
	return Player.methods.stream(keccakTrackHash).send(options)
		.catch(function(error){
		    console.log('Metamask rejection')
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
		let metadataResult = metadata.value()
		metadataResult.txSuccess = txSuccess
		return new Promise((resolve, reject) => resolve(metadataResult))
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
			return new Promise((resolve, reject) => resolve(_stream_and_fetch_metadata(user, keccakTrackHash)))
		}),
})

import bs58 from 'bs58';
import {Tokens, Player, Data, web3, PROVIDER, BLESSINGS, gas, gasPrice} from "../contracts/contracts"


export const GET_TOKEN_BALANCE = "GET_TOKEN_BALANCE";
export const GET_TOKEN_BALANCE_PENDING = "GET_TOKEN_BALANCE_PENDING";
export const GET_TOKEN_BALANCE_FULFILLED = "GET_TOKEN_BALANCE_FULFILLED";
export const GET_USER_ADDRESS = "GET_USER_ADDRESS";
export const GET_USER_ADDRESS_PENDING = "GET_USER_ADDRESS_PENDING";
export const GET_USER_ADDRESS_FULFILLED = "GET_USER_ADDRESS_FULFILLED";
export const GET_CURRENT_TRACK = "GET_CURRENT_TRACK";
export const GET_CURRENT_TRACK_PENDING = "GET_CURRENT_TRACK_PENDING";
export const GET_CURRENT_TRACK_FULFILLED = "GET_CURRENT_TRACK_FULFILLED";
export const STREAM = "STREAM";
export const STREAM_PENDING = "STREAM_PENDING";
export const STREAM_FULFILLED = "STREAM_FULFILLED";


const _getUserAddress = () => web3.eth.getAccounts();


const _getTokenBalance = () => _getUserAddress().then(receipt => {
	const user = receipt[0];
	return Tokens.methods.getTokenBalance(user).call()
});


const _getCurrentTrack = () => _getUserAddress().then(receipt => {
	const user = receipt[0];
	return Player.methods.getCurrentTrack(user).call()
})


const _getTrackBase58 = () => _getCurrentTrack().then(receipt => {
	const hexHashFunction = receipt[0];
	const hexSize = receipt[1];
	const hexTrackHash = receipt[2];
	const bytesHashFunction = web3.utils.hexToBytes(hexHashFunction);
	const bytesSize = web3.utils.hexToBytes(hexSize);
	const bytesTrackHash = web3.utils.hexToBytes(hexTrackHash);
	const combinedBytes = [...bytesHashFunction, ...bytesSize, ...bytesTrackHash];
	const base58TrackHash = bs58.encode(combinedBytes);
	const payload = base58TrackHash
	return new Promise((resolve, reject) => resolve(payload))
})


const _getTrackBasicMetadataByHashArtist = () => _getCurrentTrack().then(receipt => {
	const hexTrackHash = receipt[2];
	return Data.methods.getTrackBasicMetadataByHash(hexTrackHash, 'artist').call()
})


const _getTrackBasicMetadataByHashTitle = () => _getCurrentTrack().then(receipt => {
	const hexTrackHash = receipt[2];
	return Data.methods.getTrackBasicMetadataByHash(hexTrackHash, 'title').call()
})


const _getCurrentTrackMetadata = () => Promise.all([
	_getTrackBase58(), 
	_getTrackBasicMetadataByHashArtist(), 
	_getTrackBasicMetadataByHashTitle(), 
	_getTokenBalance()]).then((receipt) => {
		const base58TrackHash = receipt[0]
		const artistReceipt = receipt[1]
		const titleReceipt = receipt[2]
		const tokensReceipt = receipt[3]
		const artist = artistReceipt[0];
		const artistIsVerified = artistReceipt[1];
		const title = titleReceipt[0];
		const titleIsVerified = titleReceipt[1];
		const balance = tokensReceipt[0]
		const payload = {
			base58TrackHash: base58TrackHash,
			artist: artist,
			artistIsVerified: artistIsVerified,
			title: title,
			titleIsVerified: titleIsVerified,
			balance: balance,
		}
		return new Promise((resolve, reject) => resolve(payload))
})


const _stream = () => _getUserAddress().then(receipt => {
	const user = receipt[0];
	const options = {
		gas: gas,
		gasPrice: gasPrice,
		from: user,
	}
	// PROVIDER
	// BLESSINGS
	return Player.methods.stream(PROVIDER).send(options)
})


const _stream_and_fetch_metadata = () => {

	let streamTransaction = _stream();

	let fetchMetadata = streamTransaction.then(() => {
		return _getCurrentTrackMetadata()
	})

	let checkBalance = fetchMetadata.then(() => {
		return _getTokenBalance()
	})

    return checkBalance.then(() => {
    	let txReceipt = streamTransaction.value()
    	let txSuccess = !!web3.utils.hexToNumber(txReceipt.status)
    	let metadata = fetchMetadata.value()
    	let balance = checkBalance.value()
    	metadata.txSuccess = txSuccess
    	metadata.balance = balance
    	return new Promise((resolve, reject) => resolve(metadata))
    });
}


export const getUserAddress = () => ({
	type: GET_USER_ADDRESS,
	payload: _getUserAddress,
})

export const getTokenBalance = () => ({
	type: GET_TOKEN_BALANCE,
	payload: _getTokenBalance,
})

export const getCurrentTrack = () => ({
	type: GET_CURRENT_TRACK,
	payload: _getCurrentTrackMetadata,
})

export const stream = () => ({
	type: STREAM,
	payload: _stream_and_fetch_metadata,	
})








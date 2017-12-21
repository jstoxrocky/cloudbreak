import { 
	no_metamask, 
	not_signed_into_metamask,
	on_other_network, 
	metamask_user_rejection, } from '../utils/reports'
import {web3} from "../utils/contracts"

const getUserAddress = () => web3.eth.getAccounts()

export const requireMetamaskAsProvider = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
    	throw no_metamask
    }
}

export async function requireSignedInToMetamask() {
    let [user] = await getUserAddress();
    if (!user) {
    	throw not_signed_into_metamask
    }
}

export async function requireNetwork(network) {

	let netId = await web3.eth.net.getId()
	switch (netId) {
		case network:
			break
		default:
			throw on_other_network
	}
}

export async function requireMetamask(network) {
	requireMetamaskAsProvider()
	await requireSignedInToMetamask()
	await requireNetwork(network)
}

export const handleMetamaskRejection = (f) => {
	return async function inner() {
		let receipt = null
		try {
			receipt = await f.apply(this, arguments);
		} catch(err) {
			throw metamask_user_rejection
		}
		return receipt
	}
}
import { default as Web3} from 'web3';

export const web3 = new Web3(Web3.givenProvider);
export const getUserAddress = () => web3.eth.getAccounts()
export const sign = (value, user) => web3.eth.personal.sign(value, user)
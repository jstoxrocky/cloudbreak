import { default as Web3} from 'web3';

export let web3 = new Web3(Web3.givenProvider);

const TOKENS_ADDRESS = '0x498cf54820a30404e678b0135e5ea6e19305a501'
const TOKENS_ABI = [{"constant":false,"inputs":[{"name":"trackHash","type":"bytes32"},{"name":"value","type":"uint256"}],"name":"decrementTrackBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setPlayerAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newBalance","type":"uint256"}],"name":"setOwnerTokenBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"decrementUserBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"trackHash","type":"bytes32"}],"name":"getTrackBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"value","type":"uint256"}],"name":"incrementUserBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trackHash","type":"bytes32"},{"name":"value","type":"uint256"}],"name":"incrementTrackBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
export let Tokens = new web3.eth.Contract(TOKENS_ABI, TOKENS_ADDRESS)

const PLAYER_ADDRESS = '0x836c9d1a8a942284a95abed2feb60f7eef0e34e1'
const PLAYER_ABI = [{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setDataAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTokensAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setTokensAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"keccakTrackHash","type":"bytes32"}],"name":"stream","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAmount","type":"uint256"}],"name":"setpricePerStream","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDataAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"listener","type":"address"}],"name":"getCurrentTrack","outputs":[{"name":"","type":"bytes1"},{"name":"","type":"bytes1"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]
export let Player = new web3.eth.Contract(PLAYER_ABI, PLAYER_ADDRESS)

const DATA_ADDRESS = '0x35d54a036f7f6b589e37fa31d9b3f32066dcb590'
const DATA_ABI = [{"constant":true,"inputs":[{"name":"keccakTrackHash","type":"bytes32"}],"name":"convertKeccackHashToIPFSHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setPlayerAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTokensAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setTokensAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"trackHash","type":"bytes32"}],"name":"getPlayCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAmount","type":"uint256"}],"name":"setCaptchaReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"trackHash","type":"bytes32"},{"name":"key","type":"string"}],"name":"getTrackBasicMetadataByHash","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"trackHash","type":"bytes32"},{"name":"key","type":"string"},{"name":"value","type":"string"},{"name":"userToPay","type":"address"}],"name":"uploadMetadata","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"trackHash","type":"bytes32"}],"name":"getIpfsHashMetadata","outputs":[{"name":"","type":"bytes1"},{"name":"","type":"bytes1"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAmount","type":"uint256"}],"name":"setVerificationRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"hashFunction","type":"bytes1"},{"name":"size","type":"bytes1"},{"name":"trackHash","type":"bytes32"},{"name":"artist","type":"string"},{"name":"title","type":"string"}],"name":"uploadTrack","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trackHash","type":"bytes32"}],"name":"incrementPlayCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"trackHash","type":"bytes32"}],"name":"newUpload","type":"event"}]
export let Data = new web3.eth.Contract(DATA_ABI, DATA_ADDRESS)

export const GAS = 200000;
export const GAS_PRICE = 2000000000;

export const ZERO_HEX = "0x0000000000000000000000000000000000000000000000000000000000000000"
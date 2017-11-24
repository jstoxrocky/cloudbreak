import React from 'react';
import { default as Web3} from 'web3';
import bs58 from 'bs58';

var web3 = new Web3(Web3.givenProvider);

const PLAYER_ADDRESS = '0xf7729b4d76900088f3ed0323da8b8733f7146932'
const PLAYER_ABI = [{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setDataAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTokensAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setTokensAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"keccakTrackHash","type":"bytes32"}],"name":"stream","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAmount","type":"uint256"}],"name":"setpricePerStream","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDataAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"listener","type":"address"}],"name":"getCurrentTrack","outputs":[{"name":"","type":"bytes1"},{"name":"","type":"bytes1"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}]
var Player = new web3.eth.Contract(PLAYER_ABI, PLAYER_ADDRESS)

const DATA_ADDRESS = '0xcb240b795dc6214b1c4b8fc05583ad657e738a18'
const DATA_ABI = [{"constant":false,"inputs":[{"name":"keccakTrackHash","type":"bytes32"}],"name":"convertKeccackHashToIPFSHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setPlayerAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTokensAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setTokensAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAmount","type":"uint256"}],"name":"setCaptchaReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"trackHash","type":"bytes32"},{"name":"key","type":"string"}],"name":"getTrackBasicMetadataByHash","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"trackHash","type":"bytes32"},{"name":"key","type":"string"},{"name":"value","type":"string"},{"name":"userToPay","type":"address"}],"name":"uploadMetadata","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trackHash","type":"bytes32"}],"name":"getIpfsHashMetadata","outputs":[{"name":"","type":"bytes1"},{"name":"","type":"bytes1"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAmount","type":"uint256"}],"name":"setVerificationRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"hashFunction","type":"bytes1"},{"name":"size","type":"bytes1"},{"name":"trackHash","type":"bytes32"},{"name":"artist","type":"string"},{"name":"title","type":"string"}],"name":"uploadTrack","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trackHash","type":"bytes32"}],"name":"incrementPlayCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"trackHash","type":"bytes32"}],"name":"newUpload","type":"event"}]
var Data = new web3.eth.Contract(DATA_ABI, DATA_ADDRESS)

class CurrentTrack extends React.Component {

	constructor() {
		super();
		this.state = {
			currentTrack: '',
			user: '',
			trackHash: '',
			artist: '',
			artistIsVerified: false,
			title: '',
			titleIsVerified: false,
		};
	}

	componentDidMount() {
		
		web3.eth.getAccounts()
			.then(receipt => {
				const user = receipt[0];
				this.setState({user: user});
				return Player.methods.getCurrentTrack(this.state.user).call()
			})
			.then(receipt => {
				const h_hash_function = receipt[0];
				const h_size = receipt[1];
				const h_hash = receipt[2];
				const b_hash_function = web3.utils.hexToBytes(h_hash_function);
				const b_size = web3.utils.hexToBytes(h_size);
				const b_hash = web3.utils.hexToBytes(h_hash);
				const b = [...b_hash_function, ...b_size, ...b_hash];
				const currentTrack = bs58.encode(b);
				this.setState({
					currentTrack: currentTrack,
					trackHash: h_hash,
				});
				return Data.methods.getTrackBasicMetadataByHash(this.state.trackHash, 'artist').call()
			})
			.then(receipt => {
				const artist = receipt[0];
				const artistIsVerified = receipt[1];
				this.setState({
					artist: artist,
					artistIsVerified: artistIsVerified,
				});
				return Data.methods.getTrackBasicMetadataByHash(this.state.trackHash, 'title').call()
			})
			.then(receipt => {
				const title = receipt[0];
				const titleIsVerified = receipt[1];
				this.setState({
					title: title,
					titleIsVerified: titleIsVerified,
				});
			});

		}

	render() {
		const artist_class = this.state.artistIsVerified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		const title_class = this.state.titleIsVerified == 'true' ? 'fa fa-check-circle-o verified': 'fa fa-times-circle-o unverified'
		return (
			<div>
				<h4 className='currentTrack'>Now playing: </h4>
				<h3 className='currentTrack'> <strong>{this.state.title} <i className={title_class} aria-hidden="true"></i> - {this.state.artist} <i className={artist_class} aria-hidden="true"></i></strong></h3>
			</div>
		)
	}
};

export default CurrentTrack;
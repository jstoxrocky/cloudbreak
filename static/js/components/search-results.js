import React from 'react';
import { connect } from "react-redux";
import { radioOptionChange } from '../actions/actions'


const PROVIDER = '0x778626c4f776387092fbf5af6a22b7556f57fe8d814edb4c0e23f4a8e5fd9cd7'
const BLESSINGS = '0xb8f1532472debea5faf67b3e4ce06e5931c891da5e3b632becf2a4ddf6f5b64c'


@connect(({radio}) => {
	return {
		selectedOption: radio.selectedOption,
	};
})
class SearchResults extends React.Component {


	handleOptionChange(changeEvent) {
		const payload = {selectedOption: changeEvent.target.value,}
		this.props.dispatch(radioOptionChange(payload))
	}


	render() {
		const {selectedOption} = this.props;
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-12">
						<h3>Change Track</h3>
						<form>
							<div className="radio">
									<input type="radio" value={PROVIDER} onChange={this.handleOptionChange.bind(this)} checked={selectedOption === PROVIDER} />
									<label>Provider - Frank Ocean
								</label>
							</div>
							<div className="radio">
									<input type="radio" value={BLESSINGS} onChange={this.handleOptionChange.bind(this)} checked={selectedOption === BLESSINGS} />
									<label>Blessings - Chance the Rapper
								</label>
							</div>
						</form>
					</div>
				</div>
			</div> 
		)
	}
};

export default SearchResults;
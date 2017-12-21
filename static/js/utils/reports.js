// import merge from 'lodash/merge';

export const NO_CURRENT_TRACK = "No current track associated with this user";
export const CURRENT_TRACK_LOADED = "Track metadata retrieved"
export const TX_SUCCESS = "Transaction succeeded";
export const TX_FAILURE = "Transaction failed";
export const LOADING = "Loading..."


class NonVisible {
	constructor() {
		this.visible = false;
	}
}

class Visible {
	constructor() {
		this.visible = true;
	}
}

class Danger extends Visible {
	constructor(msg) {
		super()
		this.msg = msg;
		this.level = 'alert-danger'
	}
}

class Warning extends Visible {
	constructor(msg) {
		super()
		this.msg = msg;
		this.level = 'alert-warning'
	}
}

class Info extends Visible {
	constructor(msg) {
		super()
		this.msg = msg;
		this.level = 'alert-info'
	}
}

class Success extends Visible {
	constructor(msg) {
		super()
		this.msg = msg;
		this.level = 'alert-success'
	}
}

class HiddenSuccess extends NonVisible {
	constructor(msg) {
		super()
		this.msg = msg;
		this.level = 'alert-success'
	}
}


export const no_metamask = new Danger("No MetaMask found")
export const not_signed_into_metamask = new Danger("Not signed into MetaMask")
export const update_player_state_success = new HiddenSuccess("Update successful")
export const on_other_network = new Danger("You are on another network. Switch to Rinkeby")
export const not_enough_tokens = new Danger("You do not have enough tokens to stream")
export const not_enough_allowance = new Danger("You have not approved enough tokens to stream")
export const metamask_user_rejection = new Danger("Transaction rejected by user")
export const not_numeric = new Warning("Must be numeric")
export const non_zero = new Warning("Must be non-zero")
export const tx_success = new Success("The transaction was a success")
export const tx_fail = new Danger("The transaction failed")








import { 
	not_numeric, 
	non_zero,
	not_enough_tokens, 
	not_enough_allowance, } from '../utils/reports'

export async function requireMinBalance() {
	let [user] = await getUserAddress();
	let [userBalance, serviceAllowance] = await Promise.all([
		getUserBalance(user),
		getServiceAllowance(user, PLAYER_ADDRESS),
	])
	if (userBalance <= 0) {
		throw not_enough_tokens
	}
	if (serviceAllowance <= 0) {
		throw not_enough_allowance
	}
}

export const requireNumeric = (value) => {
	if (isNaN(value)) {
		throw not_numeric
	} 
	if (value == "" || value == null || value <= 0) {
		throw non_zero
	} 
}
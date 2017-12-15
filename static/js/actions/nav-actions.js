export const NAV_CAPTCHA = "NAV_CAPTCHA"
export const NAV_UPLOAD = "NAV_UPLOAD"
export const NAV_HOME = "NAV_HOME"
export const NAV_SEARCH = "NAV_HOME"
export const NAV_BUY = "NAV_BUY"
export const NAV_ALLOWANCE = "NAV_ALLOWANCE"

export function navClick(value) {
	return {
		type: value, 
		payload: null,
	}
}
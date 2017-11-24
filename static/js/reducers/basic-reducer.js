const initialState = {
}

function basicReducer(state=initialState, action) {
	switch (action.type) { 
		case "A": {
			state = Object.assign({}, state, {
			});
			break;
		}
	}
	return state;
}

export default basicReducer;
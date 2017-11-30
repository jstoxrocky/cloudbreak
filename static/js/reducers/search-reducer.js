const initialSearch = {
	matching_tracks: [],
	matching_artists: [],
	success: null,

}

export default function searchReducer(state=initialSearch, action) {
switch (action.type) { 
		case "GET_SEARCH_PENDING": {
			state = Object.assign({}, state, {
				success: null,
			});
			break;
		}
		case "GET_SEARCH_FULFILLED": {
			state = Object.assign({}, state, {
				matching_tracks: action.payload.data.matching_tracks,
				matching_artists: action.payload.data.matching_artists,
				success: true,
			});
			break;
		}
	}
	return state;
}
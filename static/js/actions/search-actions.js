import axios from 'axios'

// export function getSearch(query) {
// 	return {
// 		type: "GET_SEARCH", 
// 		payload: axios.get("/search", {
// 			params: {
//       			query: query,
//     		}
//     	}),
// 	}
// }

export function getSearch(query) {
	return {
		type: "GET_SEARCH", 
		payload: fetch('http://localhost:5000/search', {
			method: 'GET',
		})
	}
}


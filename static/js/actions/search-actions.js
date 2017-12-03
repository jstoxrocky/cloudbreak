import axios from 'axios'
import {BASE_URL} from '../utils/endpoints'

export function getSearch(query) {
	return {
		type: "GET_SEARCH", 
		payload: fetch(BASE_URL+'/search', {
			method: 'GET',
		})
	}
}


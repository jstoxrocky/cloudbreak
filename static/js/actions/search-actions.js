import axios from 'axios'
import {BASE_URL} from '../utils/endpoints'

export const SEARCH = "SEARCH"
export const SEARCH_PENDING = "SEARCH_PENDING"
export const SEARCH_FULFILLED = "SEARCH_FULFILLED"

const api = axios.create({
	withCredentials: true
});

const callAPI = (query) => api.get(
	BASE_URL+'/search', {
		params: {
		  query: query,
		}
	}) 

export const search = (query) => {
	return {
		type: SEARCH, 
		payload: callAPI(query)
	}
}

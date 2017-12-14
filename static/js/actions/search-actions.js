import axios from 'axios'
import {BASE_URL} from '../utils/endpoints'

export const SEARCH = "SEARCH"
export const SEARCH_PENDING = "SEARCH_PENDING"
export const SEARCH_FULFILLED = "SEARCH_FULFILLED"

const api = axios.create({
	withCredentials: true
});

export const search = (query) => {
	return {
		type: SEARCH, 
		payload: api.get(BASE_URL+'/search', {
		    params: {
		      query: query,
		    }
  		})
	}
}

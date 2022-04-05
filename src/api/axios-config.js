import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://pokeapi.co/api/v2/';

export const getRequest = async (url) => {
    return axiosClient.get(url);
}

export default axiosClient;
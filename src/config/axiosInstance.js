import Axios from 'axios';
import { getServerBaseUrl } from './utils';

const { API_BASE_URl } = getServerBaseUrl();

export const axiosInstance = Axios.create({
    baseURL: API_BASE_URl,
});

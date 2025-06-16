import axios from 'axios';
import { SpotifyConstants } from '../utils/constants';
import log from '@/logs/logger';

const axiosInstance = axios.create({
  baseURL: SpotifyConstants.API_BASE_V1,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((request) => {
  log.debug(`[API Request] ${request.method?.toUpperCase()} ${request.url}`);
  log.debug('Request data:', JSON.stringify(request.data, null, 2));
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    log.debug(`[API Response] ${response.status} ${response.config.url}`);
    log.debug('[Response data]:', JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    log.error('[API Error]', error.message);
    if (error.response) {
      log.error(
        `Error response: ${error.response.status} ${JSON.stringify(error.response.data, null, 2)}`,
      );
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

import axiosInstance from './axiosInstance';
import { SpotifyTokenResponseDto } from '../models/SpotifyTokenResponseDto.ts';
import { SpotifyConstants } from '../utils/constants.ts';
import { CLIENT_SECRET, CLIENT_ID } from '@env';
import log from '@/logs/logger.ts';

const fetchAccessToken = async (): Promise<SpotifyTokenResponseDto | undefined> => {
  const authString = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

  try {
    const response = await axiosInstance.post<SpotifyTokenResponseDto>(
      `${SpotifyConstants.ACCOUNTS_API_BASE}token`,
      authString,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data;
  } catch (e) {
    log.error('fetchAccessToken::Une erreur est survenue en chargeant le token Spotify', e);
  }
};

export { fetchAccessToken };

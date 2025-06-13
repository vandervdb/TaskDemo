import * as Keychain from 'react-native-keychain';
import { STORAGE_TYPE } from 'react-native-keychain';
import { useCallback, useMemo } from 'react';
import { SERVICES } from '../utils/constants';

interface KeychainStorageOptions {
  service: string;
  storage: typeof STORAGE_TYPE.AES_GCM;
}

interface TokenData {
  token: string;
  expiresAt: number;
}

interface RefreshTokenData {
  refreshToken: string;
  expiresAt: number;
}

interface UserCredentials {
  username: string;
  password: string;
}

export function useSecureStorage() {
  const createSecureStorage = useCallback(
    <T>(storageKey: string, options: KeychainStorageOptions) => {
      const saveSecureData = async (data: T): Promise<void> => {
        try {
          await Keychain.setGenericPassword(
            storageKey,
            JSON.stringify(data),
            options,
          );
        } catch (error) {
          console.error('Erreur de sauvegarde des données sécurisées:', {
            error,
            storageKey,
            service: options.service,
          });
        }
      };

      const getSecureData = async (): Promise<T | undefined> => {
        try {
          const storedData = await Keychain.getGenericPassword(options);
          return storedData ? JSON.parse(storedData.password) : undefined;
        } catch (error) {
          console.error('Erreur de lecture des données sécurisées:', {
            error,
            storageKey,
            service: options.service,
          });
          return undefined;
        }
      };

      return { saveSecureData, getSecureData };
    },
    [],
  );

  const tokenStorage = useMemo(
    () =>
      createSecureStorage<TokenData>('token', {
        service: SERVICES.API_TOKEN,
        storage: STORAGE_TYPE.AES_GCM,
      }),
    [createSecureStorage],
  );

  const refreshTokenStorage = useMemo(
    () =>
      createSecureStorage<RefreshTokenData>('refresh_token', {
        service: SERVICES.REFRESH_TOKEN,
        storage: STORAGE_TYPE.AES_GCM,
      }),
    [createSecureStorage],
  );

  const credentialsStorage = useMemo(
    () =>
      createSecureStorage<UserCredentials>('user', {
        service: SERVICES.USER_CREDENTIALS,
        storage: STORAGE_TYPE.AES_GCM,
      }),
    [createSecureStorage],
  );

  return {
    saveToken: tokenStorage.saveSecureData,
    getToken: tokenStorage.getSecureData,
    saveRefreshToken: refreshTokenStorage.saveSecureData,
    getRefreshToken: refreshTokenStorage.getSecureData,
    saveCredentials: credentialsStorage.saveSecureData,
    getCredentials: credentialsStorage.getSecureData,
  };
}

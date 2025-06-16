// 📁 src/stores/SpotifyStore.ts
import { makeAutoObservable, observable, runInAction } from 'mobx';
import log from '@/logs/logger';
import { SecureStorageService, TokenData } from '@/services/SecureStorageService';
import { fetchAccessToken } from '@/api/spotifyAuthApi';

export class SpotifyStore {
  authParams: TokenData = { token: '', expiresAt: 0 };
  loading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this, {
      authParams: observable,
      loading: observable,
      error: observable,
    });

    this.loadToken().then(() => log.debug('Token initial chargé'));
  }

  get isTokenValid(): boolean {
    return this.authParams.token !== '' && this.authParams.expiresAt > Date.now();
  }

  async loadToken(): Promise<void> {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const stored = await SecureStorageService.token.get();
      if (stored && stored.token && stored.expiresAt > Date.now()) {
        runInAction(() => {
          this.authParams = stored;
          this.loading = false;
        });
        log.debug('Token valide chargé depuis SecureStorage');
      } else {
        await this.refreshAccessToken();
      }
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e : new Error('Erreur inconnue');
        this.loading = false;
      });
      log.error('loadToken error:', e);
    }
  }

  async refreshAccessToken(): Promise<void> {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await fetchAccessToken();
      if (!response) throw new Error('Aucun token reçu de Spotify');

      const tokenData: TokenData = {
        token: response.access_token,
        expiresAt: Date.now() + response.expires_in * 1000,
      };

      await SecureStorageService.token.save(tokenData);

      runInAction(() => {
        this.authParams = tokenData;
        this.loading = false;
      });

      log.debug('Token rafraîchi avec succès');
    } catch (e) {
      runInAction(() => {
        this.error = e instanceof Error ? e : new Error('Erreur refresh token');
        this.loading = false;
      });
      log.error('refreshAccessToken error:', e);
    }
  }
}

const spotifyStore = new SpotifyStore();
export default spotifyStore;

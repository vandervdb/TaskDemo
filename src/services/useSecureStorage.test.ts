import { renderHook } from '@testing-library/react-native';
// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('react-native-keychain');
import * as Keychain from 'react-native-keychain';
import { useSecureStorage } from './useSecureStorage.ts';
import { act } from 'react';

describe('useSecureStorage', () => {
  const mockToken = { token: 'abc123', expiresAt: 1234567890 };
  const mockJsonToken = JSON.stringify(mockToken);

  beforeEach(() => {
    jest.clearAllMocks();

    (Keychain.getGenericPassword as jest.Mock).mockResolvedValue({
      username: 'token',
      password: mockJsonToken,
      service: 'mockService',
      storage: 'mockStorage',
    });

    (Keychain.setGenericPassword as jest.Mock).mockResolvedValue({
      service: 'mockService',
      storage: 'mockStorage',
    });
  });

  it('should save token correctly', async () => {
    const { result } = renderHook(() => useSecureStorage());
    await act(async () => {
      await result.current.saveToken(mockToken);
    });

    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'token',
      mockJsonToken,
      expect.objectContaining({
        service: expect.any(String),
        storage: expect.any(String),
      }),
    );
  });

  it('should retrieve token correctly', async () => {
    const { result } = renderHook(() => useSecureStorage());
    let value;
    await act(async () => {
      value = await result.current.getToken();
    });

    expect(value).toEqual(mockToken);
  });

  it('should return undefined when getGenericPassword fails', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockRejectedValueOnce(
      new Error('fail'),
    );

    const { result } = renderHook(() => useSecureStorage());
    let value;
    await act(async () => {
      value = await result.current.getToken();
    });

    expect(value).toBeUndefined();
  });
});

import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFestivals } from './useFestivals';
import { mockData } from '../../../mockData/mockData';

global.fetch = jest.fn();

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFestivals Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return festivals data when the query is successful', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() => useFestivals(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.status).toBe('success');
  });

  it('should return an error message when the fetch fails', async () => {
    const errorMessage = 'Failed to fetch data';
    (fetch as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFestivals(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(result.current.error?.message).toEqual(errorMessage);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.status).toBe('error');
  });
});

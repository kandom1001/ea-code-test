import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MusicFestivals } from './features/musicFestivals';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Music Festivals</h1>
      <MusicFestivals />
    </QueryClientProvider>
  );
};

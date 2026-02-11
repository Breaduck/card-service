import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

function getPlatformStorage() {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return localStorage;
  }
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  return AsyncStorage;
}

interface SearchState {
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recentSearches: [],

      addRecentSearch: (query) => {
        set((state) => {
          const filtered = state.recentSearches.filter((s) => s !== query);
          return { recentSearches: [query, ...filtered].slice(0, 10) };
        });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(getPlatformStorage),
    }
  )
);

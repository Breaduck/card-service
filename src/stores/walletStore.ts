import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserCard } from '../types/card';

interface WalletState {
  userCards: UserCard[];
  addCard: (cardId: string, nickname?: string) => void;
  removeCard: (userCardId: string) => void;
  hasCard: (cardId: string) => boolean;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      userCards: [],

      addCard: (cardId, nickname) => {
        if (get().hasCard(cardId)) return;
        const newCard: UserCard = {
          id: `uc-${Date.now()}`,
          cardId,
          nickname: nickname ?? null,
          addedAt: new Date().toISOString(),
          isActive: true,
        };
        set((state) => ({ userCards: [...state.userCards, newCard] }));
      },

      removeCard: (userCardId) => {
        set((state) => ({
          userCards: state.userCards.filter((c) => c.id !== userCardId),
        }));
      },

      hasCard: (cardId) => {
        return get().userCards.some((c) => c.cardId === cardId && c.isActive);
      },
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

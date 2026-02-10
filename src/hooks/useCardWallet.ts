import { useMemo } from 'react';
import { useWalletStore } from '../stores/walletStore';
import { CARD_MASTER_DATA } from '../constants/cardMasterData';
import { UserCard, Card } from '../types/card';

export function useCardWallet() {
  const { userCards, addCard, removeCard, hasCard } = useWalletStore();

  const userCardsWithData = useMemo(() => {
    return userCards
      .filter((uc) => uc.isActive)
      .map((uc) => ({
        userCard: uc,
        card: CARD_MASTER_DATA.find((c) => c.id === uc.cardId) ?? null,
      }))
      .filter((item): item is { userCard: UserCard; card: Card } => item.card !== null);
  }, [userCards]);

  return {
    userCards: userCardsWithData,
    addCard,
    removeCard,
    hasCard,
    cardCount: userCardsWithData.length,
  };
}

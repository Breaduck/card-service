import { useState, useEffect, useCallback } from 'react';
import { BenefitSearchResult, StoreBenefit } from '../types/card';
import { useWalletStore } from '../stores/walletStore';
import { CARD_MASTER_DATA } from '../constants/cardMasterData';
import { BENEFIT_DATA } from '../constants/benefitData';

function computeEffectiveDiscount(benefit: StoreBenefit): number {
  if (benefit.discountRate) return benefit.discountRate;
  if (benefit.cashbackRate) return benefit.cashbackRate;
  if (benefit.pointRate) return benefit.pointRate * 0.5;
  return 0;
}

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase();
}

function benefitMatchesQuery(benefit: StoreBenefit, query: string): boolean {
  const q = normalizeQuery(query);
  return benefit.storeNames.some(
    (name) => name.toLowerCase().includes(q) || q.includes(name.toLowerCase())
  );
}

export function useBenefitSearch(query: string) {
  const [results, setResults] = useState<BenefitSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userCards } = useWalletStore();

  const search = useCallback(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    const activeUserCards = userCards.filter((uc) => uc.isActive);
    const activeCardIds = new Set(activeUserCards.map((uc) => uc.cardId));

    const matched: BenefitSearchResult[] = [];

    for (const benefit of BENEFIT_DATA) {
      if (!activeCardIds.has(benefit.cardId)) continue;
      if (!benefitMatchesQuery(benefit, query)) continue;

      const card = CARD_MASTER_DATA.find((c) => c.id === benefit.cardId);
      if (!card) continue;

      const userCard = activeUserCards.find((uc) => uc.cardId === benefit.cardId);
      if (!userCard) continue;

      matched.push({
        userCard,
        card,
        benefit,
        effectiveDiscount: computeEffectiveDiscount(benefit),
        rank: 0,
      });
    }

    // 할인율 기준 내림차순 정렬
    matched.sort((a, b) => b.effectiveDiscount - a.effectiveDiscount);
    matched.forEach((r, i) => { r.rank = i + 1; });

    setResults(matched);
    setIsLoading(false);
  }, [query, userCards]);

  useEffect(() => {
    const timer = setTimeout(search, 200);
    return () => clearTimeout(timer);
  }, [search]);

  return { results, isLoading };
}

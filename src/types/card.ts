export type CardIssuer =
  | 'shinhan'
  | 'kb'
  | 'hyundai'
  | 'samsung'
  | 'lotte'
  | 'hana'
  | 'woori'
  | 'bc'
  | 'nh';

export type BenefitType = 'discount' | 'cashback' | 'point' | 'free';

export type BenefitCategory =
  | 'coffee'
  | 'food'
  | 'convenience'
  | 'beauty'
  | 'transport'
  | 'online_shopping'
  | 'gas'
  | 'cinema'
  | 'fitness'
  | 'travel'
  | 'etc';

export interface Card {
  id: string;
  issuer: CardIssuer;
  name: string;
  annualFee: number;
  primaryColor: string;
  ocrKeywords: string[];
}

export interface StoreBenefit {
  id: string;
  cardId: string;
  storeNames: string[];
  category: BenefitCategory;
  benefitType: BenefitType;
  discountRate: number | null;
  cashbackRate: number | null;
  pointRate: number | null;
  benefitDescription: string;
  minimumSpend: number | null;
  monthlyCap: number | null;
  weekdayOnly: boolean;
  weekendOnly: boolean;
  isOnline: boolean;
  isOffline: boolean;
  lastVerified: string;
}

export interface UserCard {
  id: string;
  cardId: string;
  nickname: string | null;
  addedAt: string;
  isActive: boolean;
}

export interface BenefitSearchResult {
  userCard: UserCard;
  card: Card;
  benefit: StoreBenefit;
  effectiveDiscount: number;
  rank: number;
}

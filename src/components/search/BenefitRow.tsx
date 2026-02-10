import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { BenefitSearchResult } from '../../types/card';
import { ISSUER_LABEL } from '../../constants/cardMasterData';

function formatDiscountBadge(result: BenefitSearchResult): string {
  const { benefit } = result;
  if (benefit.discountRate) return `${Math.round(benefit.discountRate * 100)}%`;
  if (benefit.cashbackRate) return `${Math.round(benefit.cashbackRate * 100)}%`;
  if (benefit.pointRate) return `${Math.round(benefit.pointRate * 100)}%`;
  return '혜택';
}

function formatBenefitType(result: BenefitSearchResult): string {
  switch (result.benefit.benefitType) {
    case 'discount': return '할인';
    case 'cashback': return '캐시백';
    case 'point': return '포인트 적립';
    case 'free': return '무료';
    default: return '';
  }
}

function formatConditionText(result: BenefitSearchResult): string {
  const { benefit } = result;
  const parts: string[] = [];
  if (benefit.minimumSpend) {
    parts.push(`전월 ${Math.floor(benefit.minimumSpend / 10000)}만원 이상`);
  }
  if (benefit.monthlyCap) {
    const capStr = benefit.monthlyCap >= 10000
      ? `${benefit.monthlyCap / 10000}만원`
      : `${benefit.monthlyCap / 1000}천원`;
    parts.push(`월 최대 ${capStr}`);
  }
  return parts.join(' · ');
}

function getBadgeColor(result: BenefitSearchResult): { bg: string; text: string } {
  if (result.rank === 1) return { bg: '#3182F6', text: '#FFFFFF' };
  if (result.rank === 2) return { bg: '#EBF3FE', text: '#3182F6' };
  return { bg: '#F2F4F6', text: '#6B7684' };
}

export function BenefitRow({ result, index }: { result: BenefitSearchResult; index: number }) {
  const { card } = result;
  const discountText = formatDiscountBadge(result);
  const benefitType = formatBenefitType(result);
  const condition = formatConditionText(result);
  const badgeColor = getBadgeColor(result);
  const issuerLabel = ISSUER_LABEL[card.issuer] ?? card.issuer;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/card/${card.id}`)}
      activeOpacity={0.7}
      className="mx-5 mb-2"
    >
      <View
        className="flex-row items-center bg-white rounded-3xl px-4 py-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
          borderWidth: result.rank === 1 ? 1.5 : 0,
          borderColor: result.rank === 1 ? '#3182F6' : 'transparent',
        }}
      >
        {/* 카드 색상 칩 */}
        <View
          style={{
            backgroundColor: card.primaryColor,
            width: 44,
            height: 30,
            borderRadius: 8,
            marginRight: 14,
          }}
        />

        {/* 카드 정보 */}
        <View className="flex-1">
          <Text className="text-[12px] text-toss-gray500 mb-0.5">{issuerLabel}</Text>
          <Text className="text-[15px] font-semibold text-toss-gray900" numberOfLines={1}>
            {card.name.replace(issuerLabel, '').trim() || card.name}
          </Text>
          {condition ? (
            <Text className="text-[12px] text-toss-gray400 mt-0.5" numberOfLines={1}>
              {condition}
            </Text>
          ) : null}
        </View>

        {/* 혜택 뱃지 */}
        <View className="ml-3 items-end">
          <View
            style={{
              backgroundColor: badgeColor.bg,
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderRadius: 100,
            }}
          >
            <Text style={{ color: badgeColor.text, fontSize: 16, fontWeight: '700' }}>
              {discountText}
            </Text>
          </View>
          <Text className="text-[11px] text-toss-gray400 mt-1">{benefitType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

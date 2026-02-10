import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CARD_MASTER_DATA, ISSUER_LABEL } from '../../src/constants/cardMasterData';
import { BENEFIT_DATA } from '../../src/constants/benefitData';
import { CardThumbnail } from '../../src/components/cards/CardThumbnail';
import { useWalletStore } from '../../src/stores/walletStore';
import { StoreBenefit, BenefitCategory } from '../../src/types/card';

const CATEGORY_LABELS: Record<BenefitCategory, string> = {
  coffee: '☕ 커피',
  food: '🍔 음식/배달',
  convenience: '🏪 편의점',
  beauty: '💄 뷰티',
  transport: '🚇 교통',
  online_shopping: '📦 온라인쇼핑',
  gas: '⛽ 주유',
  cinema: '🎬 영화관',
  fitness: '💪 헬스/운동',
  travel: '✈️ 여행',
  etc: '📱 기타',
};

function formatBenefitBadge(benefit: StoreBenefit): { label: string; type: string } {
  if (benefit.discountRate) return { label: `${Math.round(benefit.discountRate * 100)}%`, type: '할인' };
  if (benefit.cashbackRate) return { label: `${Math.round(benefit.cashbackRate * 100)}%`, type: '캐시백' };
  if (benefit.pointRate) return { label: `${Math.round(benefit.pointRate * 100)}%`, type: '적립' };
  return { label: '혜택', type: '' };
}

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addCard, removeCard, hasCard, userCards } = useWalletStore();

  const card = CARD_MASTER_DATA.find((c) => c.id === id);
  const benefits = BENEFIT_DATA.filter((b) => b.cardId === id);

  if (!card) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-toss-gray400">카드를 찾을 수 없습니다</Text>
      </SafeAreaView>
    );
  }

  const inWallet = hasCard(card.id);
  const userCard = userCards.find((uc) => uc.cardId === card.id);
  const issuerLabel = ISSUER_LABEL[card.issuer] ?? card.issuer;

  const benefitsByCategory = benefits.reduce<Record<string, StoreBenefit[]>>((acc, b) => {
    if (!acc[b.category]) acc[b.category] = [];
    acc[b.category].push(b);
    return acc;
  }, {});

  return (
    <SafeAreaView className="flex-1 bg-toss-gray50">
      {/* 커스텀 헤더 */}
      <View className="flex-row items-center px-5 pt-4 pb-3 bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-toss-gray100 items-center justify-center mr-3"
        >
          <Ionicons name="arrow-back" size={20} color="#333D4B" />
        </TouchableOpacity>
        <Text className="text-[17px] font-bold text-toss-gray900 flex-1" numberOfLines={1}>
          {card.name}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 카드 썸네일 섹션 */}
        <View className="bg-white items-center py-8">
          <CardThumbnail card={card} />
          <View className="flex-row mt-5" style={{ gap: 24 }}>
            <View className="items-center">
              <Text className="text-[12px] text-toss-gray500">카드사</Text>
              <Text className="text-[14px] font-semibold text-toss-gray900 mt-0.5">{issuerLabel}</Text>
            </View>
            <View style={{ width: 1, backgroundColor: '#E5E8EB' }} />
            <View className="items-center">
              <Text className="text-[12px] text-toss-gray500">연회비</Text>
              <Text className="text-[14px] font-semibold text-toss-gray900 mt-0.5">
                {card.annualFee === 0 ? '없음' : `${card.annualFee.toLocaleString()}원`}
              </Text>
            </View>
          </View>
        </View>

        {/* 지갑 추가/제거 버튼 */}
        <View className="px-5 py-4">
          {inWallet ? (
            <TouchableOpacity
              onPress={() => userCard && removeCard(userCard.id)}
              activeOpacity={0.7}
              className="flex-row items-center justify-center bg-white py-4 rounded-3xl"
              style={{ gap: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
            >
              <View className="w-5 h-5 rounded-full bg-toss-red/10 items-center justify-center">
                <Ionicons name="checkmark" size={12} color="#F04452" />
              </View>
              <Text className="text-toss-red font-semibold text-[15px]">지갑에서 제거</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => addCard(card.id)}
              activeOpacity={0.7}
              className="flex-row items-center justify-center bg-toss-blue py-4 rounded-3xl"
              style={{ gap: 6 }}
            >
              <Ionicons name="add" size={18} color="white" />
              <Text className="text-white font-bold text-[15px]">내 지갑에 추가</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 카테고리별 혜택 */}
        {Object.entries(benefitsByCategory).map(([category, categoryBenefits]) => (
          <View key={category} className="mx-5 mb-3 bg-white rounded-3xl overflow-hidden">
            <View className="px-4 pt-4 pb-2">
              <Text className="text-[13px] font-semibold text-toss-gray600">
                {CATEGORY_LABELS[category as BenefitCategory] ?? category}
              </Text>
            </View>
            {categoryBenefits.map((benefit, i) => {
              const badge = formatBenefitBadge(benefit);
              return (
                <View key={benefit.id}>
                  <View className="flex-row items-start px-4 py-3">
                    <View
                      className="bg-toss-blueBg rounded-xl items-center justify-center mr-3"
                      style={{ minWidth: 52, paddingVertical: 5, paddingHorizontal: 8 }}
                    >
                      <Text className="text-toss-blue text-[14px] font-bold">{badge.label}</Text>
                      <Text className="text-toss-blue text-[10px] font-medium">{badge.type}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-[14px] text-toss-gray800 leading-5">
                        {benefit.benefitDescription}
                      </Text>
                      <Text className="text-[12px] text-toss-gray400 mt-1" numberOfLines={1}>
                        {benefit.storeNames.slice(0, 3).join(', ')}
                      </Text>
                    </View>
                  </View>
                  {i < categoryBenefits.length - 1 && (
                    <View className="h-px bg-toss-gray100 mx-4" />
                  )}
                </View>
              );
            })}
            <View className="h-1" />
          </View>
        ))}

        {benefits.length === 0 && (
          <View className="mx-5 bg-white rounded-3xl p-6 items-center">
            <Text className="text-toss-gray400 text-[14px]">등록된 혜택이 없습니다</Text>
          </View>
        )}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}

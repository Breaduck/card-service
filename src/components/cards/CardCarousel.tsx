import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, UserCard } from '../../types/card';
import { CardThumbnail } from './CardThumbnail';
import { useWalletStore } from '../../stores/walletStore';
import { ISSUER_LABEL } from '../../constants/cardMasterData';

interface Props {
  userCards: { userCard: UserCard; card: Card }[];
}

export function CardCarousel({ userCards }: Props) {
  const { removeCard } = useWalletStore();

  return (
    <View>
      {/* 가로 스크롤 카드 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 14, paddingVertical: 8 }}
      >
        {userCards.map(({ userCard, card }) => (
          <View key={userCard.id}>
            <TouchableOpacity
              onPress={() => router.push(`/card/${card.id}`)}
              activeOpacity={0.85}
            >
              <CardThumbnail card={card} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeCard(userCard.id)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(0,0,0,0.25)',
                borderRadius: 100,
                padding: 4,
              }}
            >
              <Ionicons name="close" size={12} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        {/* 카드 추가 버튼 */}
        <TouchableOpacity
          onPress={() => router.push('/camera/scan')}
          activeOpacity={0.7}
          style={{
            width: 260,
            height: 162,
            borderRadius: 18,
            borderWidth: 1.5,
            borderStyle: 'dashed',
            borderColor: '#D1D6DB',
            backgroundColor: '#F9FAFB',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: '#EBF3FE',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="add" size={20} color="#3182F6" />
          </View>
          <Text style={{ color: '#6B7684', fontSize: 14, fontWeight: '500' }}>카드 추가</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 카드 목록 리스트 */}
      <View className="mt-2 px-5">
        <Text className="text-[13px] font-semibold text-toss-gray500 mb-3">
          내 카드
        </Text>
        <View className="bg-white rounded-3xl overflow-hidden" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
          {userCards.map(({ userCard, card }, index) => (
            <View key={userCard.id}>
              <TouchableOpacity
                onPress={() => router.push(`/card/${card.id}`)}
                activeOpacity={0.7}
                className="flex-row items-center px-4 py-4"
              >
                <View
                  style={{
                    backgroundColor: card.primaryColor,
                    width: 44,
                    height: 30,
                    borderRadius: 8,
                    marginRight: 14,
                  }}
                />
                <View className="flex-1">
                  <Text className="text-[12px] text-toss-gray500">
                    {ISSUER_LABEL[card.issuer] ?? card.issuer}
                  </Text>
                  <Text className="text-[15px] font-semibold text-toss-gray900 mt-0.5">
                    {card.name.replace(ISSUER_LABEL[card.issuer] ?? '', '').trim() || card.name}
                  </Text>
                </View>
                <View className="items-end mr-3">
                  <Text className="text-[12px] text-toss-gray400">연회비</Text>
                  <Text className="text-[13px] font-medium text-toss-gray700 mt-0.5">
                    {card.annualFee === 0 ? '없음' : `${card.annualFee.toLocaleString()}원`}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#D1D6DB" />
              </TouchableOpacity>
              {index < userCards.length - 1 && (
                <View className="h-px bg-toss-gray100 ml-16 mr-4" />
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => router.push('/card/add')}
          activeOpacity={0.7}
          className="flex-row items-center justify-center mt-3 py-3.5 bg-toss-gray100 rounded-2xl"
          style={{ gap: 6 }}
        >
          <Ionicons name="add" size={16} color="#6B7684" />
          <Text className="text-[14px] font-medium text-toss-gray600">목록에서 카드 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

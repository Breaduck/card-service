import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CardCarousel } from '../../src/components/cards/CardCarousel';
import { useCardWallet } from '../../src/hooks/useCardWallet';

export default function WalletScreen() {
  const { userCards, cardCount } = useCardWallet();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View className="flex-row items-end justify-between px-5 pt-8 pb-4">
          <View>
            <Text className="text-[26px] font-bold text-toss-gray900 tracking-tight">
              내 지갑
            </Text>
            {cardCount > 0 && (
              <Text className="text-[14px] text-toss-gray500 mt-0.5">
                카드 {cardCount}장
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => router.push('/camera/scan')}
            className="flex-row items-center bg-toss-blue px-4 py-2.5 rounded-2xl"
            style={{ gap: 6 }}
          >
            <Ionicons name="add" size={18} color="white" />
            <Text className="text-white text-[14px] font-semibold">카드 추가</Text>
          </TouchableOpacity>
        </View>

        {userCards.length === 0 ? (
          <View className="flex-1 items-center justify-center px-8 mt-20">
            {/* 빈 상태 일러스트 */}
            <View className="w-20 h-20 bg-toss-gray100 rounded-full items-center justify-center mb-5">
              <Ionicons name="card-outline" size={36} color="#B0B8C1" />
            </View>
            <Text className="text-[18px] font-bold text-toss-gray900 text-center">
              아직 카드가 없어요
            </Text>
            <Text className="text-[14px] text-toss-gray500 text-center mt-2 leading-5">
              카메라로 카드를 스캔하거나{'\n'}목록에서 직접 선택해 추가하세요
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/card/add')}
              className="mt-6 bg-toss-blueBg px-8 py-3.5 rounded-2xl"
            >
              <Text className="text-toss-blue text-[15px] font-semibold">카드 목록에서 추가</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <CardCarousel userCards={userCards} />
        )}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}

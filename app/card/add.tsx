import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CARD_MASTER_DATA, ISSUER_LABEL } from '../../src/constants/cardMasterData';
import { useWalletStore } from '../../src/stores/walletStore';
import { CardIssuer } from '../../src/types/card';

const ISSUER_ORDER: CardIssuer[] = ['shinhan', 'kb', 'hyundai', 'samsung', 'lotte', 'hana', 'woori', 'nh'];

export default function AddCardScreen() {
  const { addCard, hasCard } = useWalletStore();

  const cardsByIssuer = ISSUER_ORDER.reduce<Record<string, typeof CARD_MASTER_DATA>>((acc, issuer) => {
    acc[issuer] = CARD_MASTER_DATA.filter((c) => c.issuer === issuer);
    return acc;
  }, {});

  return (
    <SafeAreaView className="flex-1 bg-toss-gray50">
      {/* 헤더 */}
      <View className="flex-row items-center px-5 pt-4 pb-3 bg-white border-b border-toss-gray100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-toss-gray100 items-center justify-center mr-3"
        >
          <Ionicons name="arrow-back" size={20} color="#333D4B" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-[17px] font-bold text-toss-gray900">카드 선택</Text>
          <Text className="text-[12px] text-toss-gray500 mt-0.5">지갑에 추가할 카드를 선택하세요</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {ISSUER_ORDER.map((issuer) => {
          const issuerCards = cardsByIssuer[issuer];
          if (!issuerCards || issuerCards.length === 0) return null;
          const addedCount = issuerCards.filter((c) => hasCard(c.id)).length;

          return (
            <View key={issuer} className="mx-5 mt-4 bg-white rounded-3xl overflow-hidden">
              {/* 카드사 헤더 */}
              <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
                <Text className="text-[13px] font-semibold text-toss-gray600">
                  {ISSUER_LABEL[issuer] ?? issuer}
                </Text>
                {addedCount > 0 && (
                  <View className="bg-toss-blueBg px-2 py-0.5 rounded-full">
                    <Text className="text-[11px] text-toss-blue font-semibold">{addedCount}장 추가됨</Text>
                  </View>
                )}
              </View>

              {issuerCards.map((card, i) => {
                const inWallet = hasCard(card.id);
                const cardName = card.name.replace(ISSUER_LABEL[card.issuer] ?? '', '').trim() || card.name;

                return (
                  <View key={card.id}>
                    <TouchableOpacity
                      onPress={() => {
                        if (!inWallet) {
                          addCard(card.id);
                        }
                        router.dismiss();
                      }}
                      activeOpacity={0.7}
                      className="flex-row items-center px-4 py-3.5"
                    >
                      <View
                        style={{
                          backgroundColor: card.primaryColor,
                          width: 48,
                          height: 32,
                          borderRadius: 8,
                          marginRight: 14,
                        }}
                      />
                      <View className="flex-1">
                        <Text className="text-[15px] font-semibold text-toss-gray900">{cardName}</Text>
                        <Text className="text-[12px] text-toss-gray400 mt-0.5">
                          연회비 {card.annualFee === 0 ? '없음' : `${card.annualFee.toLocaleString()}원`}
                        </Text>
                      </View>
                      {inWallet ? (
                        <View
                          className="flex-row items-center bg-toss-green/10 px-3 py-1.5 rounded-full"
                          style={{ gap: 4 }}
                        >
                          <Ionicons name="checkmark" size={14} color="#00B493" />
                          <Text className="text-toss-green text-[12px] font-semibold">추가됨</Text>
                        </View>
                      ) : (
                        <View className="w-8 h-8 rounded-full bg-toss-gray100 items-center justify-center">
                          <Ionicons name="add" size={18} color="#6B7684" />
                        </View>
                      )}
                    </TouchableOpacity>
                    {i < issuerCards.length - 1 && (
                      <View className="h-px bg-toss-gray100 ml-[76px] mr-4" />
                    )}
                  </View>
                );
              })}
              <View className="h-2" />
            </View>
          );
        })}
        <View className="h-28" />
      </ScrollView>
    </SafeAreaView>
  );
}

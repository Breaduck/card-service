import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BenefitRow } from '../../src/components/search/BenefitRow';
import { useBenefitSearch } from '../../src/hooks/useBenefitSearch';

export default function SearchResultsScreen() {
  const { q } = useLocalSearchParams<{ q: string }>();
  const { results, isLoading } = useBenefitSearch(q ?? '');

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 헤더 */}
      <View className="flex-row items-center px-5 pt-4 pb-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 w-9 h-9 items-center justify-center rounded-full bg-toss-gray100"
        >
          <Ionicons name="arrow-back" size={20} color="#333D4B" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-[18px] font-bold text-toss-gray900">"{q}"</Text>
          {!isLoading && (
            <Text className="text-[12px] text-toss-gray500 mt-0.5">
              {results.length > 0 ? `${results.length}개 카드 혜택` : '혜택을 찾지 못했어요'}
            </Text>
          )}
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-toss-gray400">검색 중...</Text>
        </View>
      ) : results.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-16 h-16 bg-toss-gray100 rounded-full items-center justify-center mb-4">
            <Ionicons name="card-outline" size={28} color="#B0B8C1" />
          </View>
          <Text className="text-[17px] font-bold text-toss-gray900 text-center">
            혜택을 찾지 못했어요
          </Text>
          <Text className="text-[14px] text-toss-gray500 text-center mt-2 leading-5">
            내 지갑에 카드를 추가하거나{'\n'}다른 가게 이름을 검색해보세요
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/card/add')}
            className="mt-5 bg-toss-blueBg px-7 py-3 rounded-2xl"
          >
            <Text className="text-toss-blue text-[14px] font-semibold">카드 추가하기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.benefit.id}
          renderItem={({ item, index }) => <BenefitRow result={item} index={index} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListHeaderComponent={
            <View className="px-5 pb-2 pt-1">
              <Text className="text-[12px] font-semibold text-toss-gray500 uppercase tracking-wide">
                혜택 높은 순
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

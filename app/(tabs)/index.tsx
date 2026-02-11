import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { SearchBar } from '../../src/components/search/SearchBar';
import { PopularStoreChips } from '../../src/components/search/PopularStoreChips';
import { RecentSearchList } from '../../src/components/search/RecentSearchList';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 헤더 */}
        <View className="px-5 pt-8 pb-2">
          <Text className="text-[26px] font-bold text-toss-gray900 tracking-tight">
            어디서 쓸까요?
          </Text>
          <Text className="text-[15px] text-toss-gray500 mt-1">
            내 카드 중 최고 혜택을 찾아드려요
          </Text>
        </View>

        {/* 검색창 */}
        <View className="px-5 mt-4">
          <SearchBar />
        </View>

        {/* 인기/최근 검색 */}
        <View className="mt-6">
          <RecentSearchList />
        </View>

        <View className="px-5 mt-6">
          <PopularStoreChips />
        </View>

        <View className="h-28" />
      </ScrollView>
    </SafeAreaView>
  );
}

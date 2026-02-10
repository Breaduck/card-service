import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSearchStore } from '../../stores/searchStore';

export function RecentSearchList() {
  const { recentSearches, clearRecentSearches, addRecentSearch } = useSearchStore();

  if (recentSearches.length === 0) return null;

  const handlePress = (store: string) => {
    addRecentSearch(store);
    router.push(`/search/results?q=${encodeURIComponent(store)}`);
  };

  return (
    <View className="px-5">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-[13px] font-semibold text-toss-gray500">최근 검색</Text>
        <TouchableOpacity onPress={clearRecentSearches} activeOpacity={0.7}>
          <Text className="text-[13px] text-toss-gray400">전체 삭제</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -4 }}>
        <View className="flex-row px-1" style={{ gap: 8 }}>
          {recentSearches.slice(0, 8).map((store) => (
            <TouchableOpacity
              key={store}
              onPress={() => handlePress(store)}
              activeOpacity={0.7}
              className="flex-row items-center border border-toss-gray200 px-3.5 py-2 rounded-2xl bg-white"
              style={{ gap: 5 }}
            >
              <Ionicons name="time-outline" size={13} color="#B0B8C1" />
              <Text className="text-[14px] text-toss-gray700 font-medium">{store}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useSearchStore } from '../../stores/searchStore';

const POPULAR_STORES = [
  { name: '올리브영', emoji: '💄' },
  { name: '스타벅스', emoji: '☕' },
  { name: '메가커피', emoji: '☕' },
  { name: 'GS25', emoji: '🏪' },
  { name: 'CU', emoji: '🏪' },
  { name: '쿠팡', emoji: '📦' },
  { name: '배달의민족', emoji: '🍔' },
  { name: 'CGV', emoji: '🎬' },
  { name: '대중교통', emoji: '🚇' },
  { name: '주유소', emoji: '⛽' },
];

export function PopularStoreChips() {
  const { addRecentSearch } = useSearchStore();

  const handlePress = (store: string) => {
    addRecentSearch(store);
    router.push(`/search/results?q=${encodeURIComponent(store)}`);
  };

  return (
    <View>
      <Text className="text-[13px] font-semibold text-toss-gray500 mb-3">
        자주 찾는 가게
      </Text>
      <View className="flex-row flex-wrap" style={{ gap: 8 }}>
        {POPULAR_STORES.map(({ name, emoji }) => (
          <TouchableOpacity
            key={name}
            onPress={() => handlePress(name)}
            activeOpacity={0.7}
            className="flex-row items-center bg-toss-gray100 px-3.5 py-2.5 rounded-2xl"
            style={{ gap: 5 }}
          >
            <Text style={{ fontSize: 14 }}>{emoji}</Text>
            <Text className="text-[14px] text-toss-gray800 font-medium">{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

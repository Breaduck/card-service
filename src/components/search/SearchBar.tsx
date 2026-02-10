import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSearchStore } from '../../stores/searchStore';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const { addRecentSearch } = useSearchStore();

  const handleSubmit = () => {
    if (!query.trim()) return;
    addRecentSearch(query.trim());
    router.push(`/search/results?q=${encodeURIComponent(query.trim())}`);
    setQuery('');
  };

  return (
    <View
      className="flex-row items-center bg-toss-gray100 rounded-2xl px-4"
      style={{ height: 52 }}
    >
      <Ionicons name="search" size={20} color="#B0B8C1" />
      <TextInput
        className="flex-1 ml-3 text-[16px] text-toss-gray900"
        placeholder="가게 또는 서비스 이름"
        placeholderTextColor="#B0B8C1"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={() => setQuery('')} activeOpacity={0.7}>
          <Ionicons name="close-circle" size={20} color="#B0B8C1" />
        </TouchableOpacity>
      )}
    </View>
  );
}

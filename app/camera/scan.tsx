import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_W = width * 0.75;
const CARD_H = CARD_W * 0.63;

export default function ScanScreen() {
  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        {/* 헤더 */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: 'rgba(255,255,255,0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>카드 스캔</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* 안내 텍스트 */}
        <View className="items-center mt-6 px-8">
          <Text style={{ color: 'white', fontSize: 22, fontWeight: '700', textAlign: 'center', letterSpacing: -0.5 }}>
            카드를 프레임에 맞춰주세요
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, marginTop: 8, textAlign: 'center', lineHeight: 20 }}>
            카드 앞면의 카드사 이름이{'\n'}잘 보이도록 놓아주세요
          </Text>
        </View>

        {/* 카드 가이드 프레임 */}
        <View className="flex-1 items-center justify-center">
          <View
            style={{
              width: CARD_W,
              height: CARD_H,
              borderRadius: 18,
              borderWidth: 2,
              borderColor: '#3182F6',
              position: 'relative',
            }}
          >
            {/* 모서리 강조 */}
            {[
              { top: -2, left: -2, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 18 },
              { top: -2, right: -2, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 18 },
              { bottom: -2, left: -2, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 18 },
              { bottom: -2, right: -2, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 18 },
            ].map((style, i) => (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  width: 28,
                  height: 28,
                  borderColor: '#3182F6',
                  ...style,
                }}
              />
            ))}

            {/* 스캔 중 표시 (Phase 4에서 실제 카메라로 교체) */}
            <View className="flex-1 items-center justify-center">
              <View
                style={{
                  backgroundColor: 'rgba(49,130,246,0.12)',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
              >
                <Text style={{ color: '#3182F6', fontSize: 13, fontWeight: '600' }}>
                  카메라 준비 중
                </Text>
              </View>
            </View>
          </View>

          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 20, textAlign: 'center' }}>
            Vision Camera + ML Kit OCR (Phase 5 구현 예정)
          </Text>
        </View>

        {/* 하단 버튼 */}
        <View className="px-5 pb-8" style={{ gap: 12 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: '#3182F6',
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 8,
            }}
          >
            <Ionicons name="camera" size={20} color="white" />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>스캔하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/card/add')}
            activeOpacity={0.7}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 16,
              paddingVertical: 14,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: '600' }}>
              직접 카드 선택
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

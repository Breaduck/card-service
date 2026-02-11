import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingRowProps {
  icon: string;
  iconColor?: string;
  iconBg?: string;
  label: string;
  value?: string;
  onPress?: () => void;
}

function SettingRow({ icon, iconColor = '#3182F6', iconBg = '#EBF3FE', label, value, onPress }: SettingRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center px-5 py-4"
      activeOpacity={0.6}
    >
      <View
        style={{ backgroundColor: iconBg, width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 14 }}
      >
        <Ionicons name={icon as any} size={18} color={iconColor} />
      </View>
      <Text className="flex-1 text-[15px] text-toss-gray900 font-medium">{label}</Text>
      {value && (
        <Text className="text-[13px] text-toss-gray500 mr-2">{value}</Text>
      )}
      <Ionicons name="chevron-forward" size={16} color="#D1D6DB" />
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-toss-gray50">
      <View className="px-5 pt-8 pb-6">
        <Text className="text-[26px] font-bold text-toss-gray900 tracking-tight">설정</Text>
      </View>

      {/* 데이터 섹션 */}
      <View className="mx-5 bg-white rounded-3xl overflow-hidden mb-3">
        <View className="px-5 pt-4 pb-2">
          <Text className="text-[12px] font-semibold text-toss-gray500 uppercase tracking-wide">
            데이터
          </Text>
        </View>
        <SettingRow
          icon="refresh-circle"
          iconColor="#3182F6"
          iconBg="#EBF3FE"
          label="혜택 데이터 업데이트"
          value="오늘"
        />
        <View className="h-px bg-toss-gray100 mx-5" />
        <SettingRow
          icon="cloud-download"
          iconColor="#00B493"
          iconBg="#E6FAF6"
          label="자동 업데이트"
          value="켜짐"
        />
      </View>

      {/* 앱 정보 섹션 */}
      <View className="mx-5 bg-white rounded-3xl overflow-hidden mb-3">
        <View className="px-5 pt-4 pb-2">
          <Text className="text-[12px] font-semibold text-toss-gray500 uppercase tracking-wide">
            앱 정보
          </Text>
        </View>
        <SettingRow
          icon="information-circle"
          iconColor="#F5A623"
          iconBg="#FFF8EC"
          label="버전"
          value="1.0.0"
        />
        <View className="h-px bg-toss-gray100 mx-5" />
        <SettingRow
          icon="document-text"
          iconColor="#8B95A1"
          iconBg="#F2F4F6"
          label="개인정보 처리방침"
        />
        <View className="h-px bg-toss-gray100 mx-5" />
        <SettingRow
          icon="shield-checkmark"
          iconColor="#8B95A1"
          iconBg="#F2F4F6"
          label="이용약관"
        />
      </View>

      <Text className="text-center text-[12px] text-toss-gray400 mt-4">
        카드 혜택 정보는 실제와 다를 수 있습니다{'\n'}항상 카드사 공식 페이지를 확인하세요
      </Text>
      <View className="h-28" />
    </SafeAreaView>
  );
}

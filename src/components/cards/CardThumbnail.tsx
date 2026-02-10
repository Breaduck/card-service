import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../types/card';
import { ISSUER_LABEL } from '../../constants/cardMasterData';

interface Props {
  card: Card;
  small?: boolean;
}

// 카드사별 다크 서브 색상 (그라디언트 느낌)
function getDarkColor(primaryColor: string): string {
  const darken: Record<string, string> = {
    '#005BAC': '#003F7A',
    '#0076CE': '#0053A0',
    '#888B8D': '#5A5C5E',
    '#FFBC00': '#CC9600',
    '#002C5F': '#001A3A',
    '#1A1A1A': '#000000',
    '#1428A0': '#0D1C78',
    '#FF6900': '#CC5200',
    '#ED1C24': '#B8141B',
    '#00927A': '#006555',
    '#0066B3': '#00478A',
    '#00A650': '#007A3C',
  };
  return darken[primaryColor] ?? primaryColor;
}

export function CardThumbnail({ card, small = false }: Props) {
  const issuerLabel = ISSUER_LABEL[card.issuer] ?? card.issuer;
  const cardName = card.name.replace(issuerLabel, '').trim() || card.name;
  const darkColor = getDarkColor(card.primaryColor);

  if (small) {
    return (
      <View style={[styles.card, styles.small, { backgroundColor: card.primaryColor }]}>
        <Text style={styles.smallIssuer}>{issuerLabel}</Text>
        <Text style={styles.smallName} numberOfLines={1}>{cardName}</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.card,
        styles.large,
        {
          backgroundColor: card.primaryColor,
          shadowColor: darkColor,
        },
      ]}
    >
      {/* 장식용 원 */}
      <View
        style={{
          position: 'absolute',
          right: -24,
          top: -24,
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: 'rgba(255,255,255,0.08)',
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 20,
          bottom: -30,
          width: 90,
          height: 90,
          borderRadius: 45,
          backgroundColor: 'rgba(255,255,255,0.06)',
        }}
      />

      {/* 카드 내용 */}
      <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>
        <Text style={styles.issuer}>{issuerLabel}</Text>
        <View>
          <Text style={styles.name} numberOfLines={2}>{cardName}</Text>
          <Text style={styles.annualFee}>
            연회비 {card.annualFee === 0 ? '없음' : `${card.annualFee.toLocaleString()}원`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  large: {
    width: 260,
    height: 162,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  small: {
    width: 100,
    height: 64,
    padding: 8,
    justifyContent: 'space-between',
  },
  issuer: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  annualFee: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '400',
  },
  smallIssuer: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 9,
    fontWeight: '500',
  },
  smallName: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

import * as SQLite from 'expo-sqlite';

let _db: SQLite.SQLiteDatabase | null = null;

function getDb(): SQLite.SQLiteDatabase {
  if (!_db) {
    _db = SQLite.openDatabaseSync('card-benefits.db');
  }
  return _db;
}

export function initDatabase() {
  const db = getDb();
  db.execSync(`
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      issuer TEXT NOT NULL,
      name TEXT NOT NULL,
      annual_fee INTEGER DEFAULT 0,
      primary_color TEXT NOT NULL DEFAULT '#1F2937',
      ocr_keywords_json TEXT NOT NULL DEFAULT '[]',
      added_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS store_benefits (
      id TEXT PRIMARY KEY,
      card_id TEXT NOT NULL REFERENCES cards(id),
      store_names_json TEXT NOT NULL,
      category TEXT NOT NULL,
      benefit_type TEXT NOT NULL,
      discount_rate REAL,
      cashback_rate REAL,
      point_rate REAL,
      benefit_description TEXT NOT NULL,
      minimum_spend INTEGER,
      monthly_cap INTEGER,
      weekday_only INTEGER DEFAULT 0,
      weekend_only INTEGER DEFAULT 0,
      is_online INTEGER DEFAULT 1,
      is_offline INTEGER DEFAULT 1,
      last_verified TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_cards (
      id TEXT PRIMARY KEY,
      card_id TEXT NOT NULL,
      nickname TEXT,
      added_at TEXT NOT NULL,
      is_active INTEGER DEFAULT 1
    );
  `);
}

const SEED_CARDS = [
  { id: 'shinhan-deep-dream', issuer: 'shinhan', name: '신한카드 Deep Dream', annualFee: 15000, primaryColor: '#005BAC', ocrKeywords: ['신한', 'SHINHAN', 'DEEP DREAM'] },
  { id: 'shinhan-mycar', issuer: 'shinhan', name: '신한카드 마이카', annualFee: 10000, primaryColor: '#0076CE', ocrKeywords: ['신한', 'SHINHAN', '마이카'] },
  { id: 'kb-titanium', issuer: 'kb', name: 'KB국민 티타늄카드', annualFee: 15000, primaryColor: '#888B8D', ocrKeywords: ['KB국민', 'KB', 'TITANIUM'] },
  { id: 'kb-woori-together', issuer: 'kb', name: 'KB국민 우리동네 카드', annualFee: 0, primaryColor: '#FFBC00', ocrKeywords: ['KB국민', 'KB', '우리동네'] },
  { id: 'hyundai-zero-edition2', issuer: 'hyundai', name: '현대카드 ZERO Edition2', annualFee: 0, primaryColor: '#002C5F', ocrKeywords: ['현대카드', 'HYUNDAICARD', 'ZERO'] },
  { id: 'hyundai-m3', issuer: 'hyundai', name: '현대카드 M3', annualFee: 30000, primaryColor: '#1A1A1A', ocrKeywords: ['현대카드', 'HYUNDAICARD', 'M3'] },
  { id: 'samsung-id-on', issuer: 'samsung', name: '삼성카드 iD ON', annualFee: 20000, primaryColor: '#1428A0', ocrKeywords: ['삼성카드', 'SAMSUNG', 'iD ON'] },
  { id: 'samsung-taptap-o', issuer: 'samsung', name: '삼성카드 taptap O', annualFee: 0, primaryColor: '#FF6900', ocrKeywords: ['삼성카드', 'SAMSUNG', 'taptap'] },
  { id: 'lotte-likit', issuer: 'lotte', name: '롯데카드 likit', annualFee: 10000, primaryColor: '#ED1C24', ocrKeywords: ['롯데카드', 'LOTTE', 'likit'] },
  { id: 'hana-1q-card', issuer: 'hana', name: '하나카드 1Q카드', annualFee: 0, primaryColor: '#009B77', ocrKeywords: ['하나카드', 'HANA', '1Q'] },
  { id: 'woori-da-living', issuer: 'woori', name: '우리카드 다살림', annualFee: 0, primaryColor: '#0066B3', ocrKeywords: ['우리카드', 'WOORI', '다살림'] },
  { id: 'nh-all-at-once', issuer: 'nh', name: 'NH농협카드 올원', annualFee: 10000, primaryColor: '#00A650', ocrKeywords: ['NH농협', 'NH', '올원'] },
];

export function seedDatabase() {
  initDatabase();
  const db = getDb();

  const existing = db.getFirstSync<{ id: string }>('SELECT id FROM cards LIMIT 1');
  if (existing) return;

  const now = new Date().toISOString();

  for (const card of SEED_CARDS) {
    db.runSync(
      'INSERT OR IGNORE INTO cards (id, issuer, name, annual_fee, primary_color, ocr_keywords_json, added_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      card.id, card.issuer, card.name, card.annualFee, card.primaryColor, JSON.stringify(card.ocrKeywords), now
    );
  }
}

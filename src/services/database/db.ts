import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

const sqlite = SQLite.openDatabaseSync('card-benefits.db');
export const db = drizzle(sqlite, { schema });

export async function initDatabase() {
  sqlite.execSync(`
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

    CREATE VIRTUAL TABLE IF NOT EXISTS store_benefits_fts
    USING fts5(store_names, benefit_description, content=store_benefits, content_rowid=rowid);
  `);
}

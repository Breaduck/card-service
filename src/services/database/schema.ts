import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const cards = sqliteTable('cards', {
  id: text('id').primaryKey(),
  issuer: text('issuer').notNull(),
  name: text('name').notNull(),
  annualFee: integer('annual_fee').default(0),
  primaryColor: text('primary_color').notNull().default('#1F2937'),
  ocrKeywordsJson: text('ocr_keywords_json').notNull().default('[]'),
  addedAt: text('added_at').notNull(),
});

export const storeBenefits = sqliteTable('store_benefits', {
  id: text('id').primaryKey(),
  cardId: text('card_id').notNull().references(() => cards.id),
  storeNamesJson: text('store_names_json').notNull(),
  category: text('category').notNull(),
  benefitType: text('benefit_type').notNull(),
  discountRate: real('discount_rate'),
  cashbackRate: real('cashback_rate'),
  pointRate: real('point_rate'),
  benefitDescription: text('benefit_description').notNull(),
  minimumSpend: integer('minimum_spend'),
  monthlyCap: integer('monthly_cap'),
  weekdayOnly: integer('weekday_only', { mode: 'boolean' }).default(false),
  weekendOnly: integer('weekend_only', { mode: 'boolean' }).default(false),
  isOnline: integer('is_online', { mode: 'boolean' }).default(true),
  isOffline: integer('is_offline', { mode: 'boolean' }).default(true),
  lastVerified: text('last_verified').notNull(),
});

export const userCards = sqliteTable('user_cards', {
  id: text('id').primaryKey(),
  cardId: text('card_id').notNull(),
  nickname: text('nickname'),
  addedAt: text('added_at').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
});

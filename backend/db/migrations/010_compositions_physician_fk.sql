-- Migration 010: Link compositions to physician accounts.
-- physician_id is intentionally nullable: compositions created before v2.4.0
-- retain a NULL physician_id and are preserved in the database.
-- All queries in v2.4.0 filter WHERE physician_id = $1, so legacy rows
-- are effectively invisible to authenticated users but are never deleted.
ALTER TABLE compositions
    ADD COLUMN IF NOT EXISTS physician_id UUID REFERENCES physician_accounts(id);

CREATE INDEX IF NOT EXISTS idx_compositions_physician_id ON compositions (physician_id);

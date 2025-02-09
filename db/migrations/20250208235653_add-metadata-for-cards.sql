-- migrate:up
ALTER TABLE cards
ADD COLUMN metadata JSONB;

-- migrate:down
ALTER TABLE cards
DROP COLUMN metadata;

-- migrate:up
ALTER TABLE cards
  ALTER COLUMN rarity TYPE bigint USING rarity::bigint,
  ADD CONSTRAINT fk_cards_rarity
    FOREIGN KEY (rarity)
    REFERENCES card_rarities(id);
-- migrate:down


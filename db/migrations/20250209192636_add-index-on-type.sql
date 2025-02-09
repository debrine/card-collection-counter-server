-- migrate:up
CREATE INDEX idx_cards_type ON  cards(type);


-- migrate:down


-- migrate:up
CREATE INDEX idx_card_name ON cards (name);
CREATE INDEX idx_set_number ON cards (set_number);

-- migrate:down

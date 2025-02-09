-- migrate:up
CREATE TABLE card_rarities (
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "collection_id" bigint NOT NULL,
    "set_id" bigint,
    "value" smallint NOT NULL,
    "label" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "created_by" bigint,
    "archived_at" TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY("id"),
    FOREIGN KEY ("collection_id")
        REFERENCES collections("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY ("set_id")
        REFERENCES sets("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- migrate:down
DROP TABLE card_rarities;

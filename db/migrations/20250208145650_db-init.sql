-- migrate:up
CREATE TABLE users (
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "first_name" VARCHAR(64) NOT NULL,
    "last_name" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("id")
);

CREATE TABLE collections (
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(64) NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "created_by" bigint,
    "archived_at" TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY("id"),
    FOREIGN KEY ("created_by")
        REFERENCES users("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE sets (
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(64) NOT NULL,
    "collection_id" bigint NOT NULL,
    "release_date" DATE,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "created_by" bigint,
    "archived_at" TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY("id"),
    FOREIGN KEY ("collection_id")
        REFERENCES collections("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE boosters (
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(64) NOT NULL,
    "set_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "created_by" bigint,
    "archived_at" TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY("id"),
    FOREIGN KEY ("set_id")
        REFERENCES sets("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE cards (
    "id" bigint GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(64) NOT NULL,
    "collection_id" BIGINT NOT NULL,
    "set_id" BIGINT NOT NULL,
    "booster_id" BIGINT,
    "rarity" VARCHAR(64), -- enum? , or a table that has rarities based on the collection?
    "type" VARCHAR(64),
    "set_number" SMALLINT,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "created_by" bigint,
    "archived_at" TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("collection_id")
        REFERENCES collections("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY ("set_id")
        REFERENCES sets("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY ("booster_id")
        REFERENCES boosters("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- migrate:down
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS boosters;
DROP TABLE IF EXISTS sets;
DROP TABLE IF EXISTS collections;
DROP TABLE IF EXISTS users;

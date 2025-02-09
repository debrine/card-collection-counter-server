-- migrate:up
DO $$
DECLARE
    pocket_collection_id bigint;
BEGIN
    INSERT INTO collections ("name")
    VALUES ('Pokemon TCG Pocket')
    RETURNING id INTO pocket_collection_id;
    
    INSERT INTO sets ("name", "collection_id", "release_date")
    VALUES 
        ('Promo-A', pocket_collection_id, '2024-10-30');
END $$;

-- migrate:down


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
        ('Genetic Apex', pocket_collection_id, '2024-10-30'),
        ('Mythical Island', pocket_collection_id, '2024-12-17'),
        ('Space-Time Smackdown', pocket_collection_id, '2025-01-29');
END $$;

-- migrate:down


-- migrate:up
DO $$
DECLARE
    pocket_collection_id bigint;
BEGIN
    SELECT id 
      INTO pocket_collection_id 
      FROM collections 
     WHERE "name" = 'Pokemon TCG Pocket'
     LIMIT 1;
    
    INSERT INTO card_rarities ("collection_id", "value", "label")
    VALUES 
        (pocket_collection_id, 0, 'Promo');
END $$;

-- migrate:down


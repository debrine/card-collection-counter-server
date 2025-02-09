-- migrate:up
DO $$
DECLARE
    pocket_collection_id bigint;
    promo_set_id bigint;
BEGIN
    SELECT id 
      INTO pocket_collection_id 
      FROM collections 
     WHERE "name" = 'Pokemon TCG Pocket'
     LIMIT 1;

    SELECT id
        INTO promo_set_id
    FROM sets 
    WHERE "name" = 'Promo-A'
    LIMIT 1;


    -- Insert into sets using the captured id
    INSERT INTO boosters ("name", "set_id")
    VALUES 
        ('Promo-A', promo_set_id);
        
END $$;

-- migrate:down


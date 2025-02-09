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
        (pocket_collection_id, 1, '\u25C7'),
        (pocket_collection_id, 2, '\u25C7\u25C7'),
        (pocket_collection_id, 3, '\u25C7\u25C7\u25C7'),
        (pocket_collection_id, 4, '\u25C7\u25C7\u25C7\u25C7'),
        (pocket_collection_id, 5, '\u2606'),
        (pocket_collection_id, 6, '\u2606\u2606'),
        (pocket_collection_id, 7, '\u2606\u2606\u2606'),
        (pocket_collection_id, 8, '\u265B');
END $$;

-- migrate:down


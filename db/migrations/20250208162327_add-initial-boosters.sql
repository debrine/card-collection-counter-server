-- migrate:up
DO $$
DECLARE
    pocket_collection_id bigint;
    genetic_set_id bigint;
    mythical_set_id bigint;
    spacetime_set_id bigint;
BEGIN
    SELECT id 
      INTO pocket_collection_id 
      FROM collections 
     WHERE "name" = 'Pokemon TCG Pocket'
     LIMIT 1;

    SELECT id
        INTO genetic_set_id
    FROM sets 
    WHERE "name" = 'Genetic Apex'
    LIMIT 1;


    SELECT id
        INTO spacetime_set_id
    FROM sets 
    WHERE "name" = 'Space-Time Smackdown'
    LIMIT 1;

    -- Insert into sets using the captured id
    INSERT INTO boosters ("name", "set_id")
    VALUES 
        ('Charizard', genetic_set_id),
        ('Mewtwo', genetic_set_id),
        ('Pikachu', genetic_set_id),
        ('Dialga', spacetime_set_id),
        ('Palkia', spacetime_set_id);
END $$;


-- migrate:down


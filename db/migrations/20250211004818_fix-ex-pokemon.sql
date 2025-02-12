-- migrate:up
UPDATE cards
SET name = CONCAT(name, ' EX')
WHERE 
    rarity IN (4, 6 ,7, 8)
    AND type != 'Suppporter'

;

-- migrate:down


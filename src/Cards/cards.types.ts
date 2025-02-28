export type Card = {
  id: string;
  name: string;
  type: string;
  set_number: number;
  set: {
    id: string;
    name: string;
    release_date: string; // YYYY-MM-DD
  };
  booster?: {
    id: string;
    name: string;
  };
  rarity: string;
  metadata: any;
};

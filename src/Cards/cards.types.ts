export type Card = {
  id: string;
  name: string;
  type: string;
  set_number: number;
  set: {
    id: string;
    name: string;
  };
  booster?: {
    id: string;
    name: string;
  };
  rarity: string;
  metadata: any;
};

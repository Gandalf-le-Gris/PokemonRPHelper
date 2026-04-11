export type Type =
    'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'stellar'
  | 'unknown';

export interface TypeDetail {
  type: Type,
  title: string,
  src: string,
  offensive: {
    strong: Type[],
    weak: Type[],
    ineffective: Type[],
  },
  defensive: {
    strong: Type[],
    weak: Type[],
    ineffective: Type[],
  }
}

const POKEPEDIA_BASE = 'https://www.pokepedia.fr/images';

export const typeArray = [
  {
    value: 'bug',
    title: 'Insecte',
    src: `${POKEPEDIA_BASE}/a/a9/Miniature_Type_Insecte_EV.png`,
  },
  {
    value: 'dark',
    title: 'Ténèbres',
    src: `${POKEPEDIA_BASE}/b/bc/Miniature_Type_T%C3%A9n%C3%A8bres_EV.png`,
  },
  {
    value: 'dragon',
    title: 'Dragon',
    src: `${POKEPEDIA_BASE}/3/3d/Miniature_Type_Dragon_EV.png`,
  },
  {
    value: 'electric',
    title: 'Electrik',
    src: `${POKEPEDIA_BASE}/6/6d/Miniature_Type_%C3%89lectrik_EV.png`,
  },
  {
    value: 'fairy',
    title: 'Fée',
    src: `${POKEPEDIA_BASE}/5/58/Miniature_Type_F%C3%A9e_EV.png`,
  },
  {
    value: 'fighting',
    title: 'Combat',
    src: `${POKEPEDIA_BASE}/9/96/Miniature_Type_Combat_EV.png`,
  },
  {
    value: 'fire',
    title: 'Feu',
    src: `${POKEPEDIA_BASE}/c/c7/Miniature_Type_Feu_EV.png`,
  },
  {
    value: 'flying',
    title: 'Vol',
    src: `${POKEPEDIA_BASE}/9/99/Miniature_Type_Vol_EV.png`,
  },
  {
    value: 'ghost',
    title: 'Spectre',
    src: `${POKEPEDIA_BASE}/4/43/Miniature_Type_Spectre_EV.png`,
  },
  {
    value: 'grass',
    title: 'Plante',
    src: `${POKEPEDIA_BASE}/d/d9/Miniature_Type_Plante_EV.png`,
  },
  {
    value: 'ground',
    title: 'Sol',
    src: `${POKEPEDIA_BASE}/4/40/Miniature_Type_Sol_EV.png`,
  },
  {
    value: 'ice',
    title: 'Glace',
    src: `${POKEPEDIA_BASE}/e/e7/Miniature_Type_Glace_EV.png`,
  },
  {
    value: 'normal',
    title: 'Normal',
    src: `${POKEPEDIA_BASE}/b/bf/Miniature_Type_Normal_EV.png`,
  },
  {
    value: 'poison',
    title: 'Poison',
    src: `${POKEPEDIA_BASE}/1/1c/Miniature_Type_Poison_EV.png`,
  },
  {
    value: 'psychic',
    title: 'Psy',
    src: `${POKEPEDIA_BASE}/8/81/Miniature_Type_Psy_EV.png`,
  },
  {
    value: 'rock',
    title: 'Roche',
    src: `${POKEPEDIA_BASE}/f/fe/Miniature_Type_Roche_EV.png`,
  },
  {
    value: 'steel',
    title: 'Acier',
    src: `${POKEPEDIA_BASE}/2/27/Miniature_Type_Acier_EV.png`,
  },
  {
    value: 'stellar',
    title: 'Stellaire',
    src: `${POKEPEDIA_BASE}/0/08/Miniature_Type_Stellaire_EV.png`,
  },
  {
    value: 'unknown',
    title: 'Inconnu',
    src: `${POKEPEDIA_BASE}/0/0f/Miniature_Type_Inconnu_EV.png`,
  },
  {
    value: 'water',
    title: 'Eau',
    src: `${POKEPEDIA_BASE}/3/3d/Miniature_Type_Eau_EV.png`,
  },
] as { value: Type, title: string, src: string }[];

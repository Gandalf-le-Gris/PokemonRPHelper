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

export const typeArray = [
  {
    value: 'bug',
    title: 'Insecte'
  },
  {
    value: 'dark',
    title: 'Ténèbres'
  },
  {
    value: 'dragon',
    title: 'Dragon'
  },
  {
    value: 'electric',
    title: 'Electrik'
  },
  {
    value: 'fairy',
    title: 'Fée'
  },
  {
    value: 'fighting',
    title: 'Combat'
  },
  {
    value: 'fire',
    title: 'Feu'
  },
  {
    value: 'flying',
    title: 'Vol'
  },
  {
    value: 'ghost',
    title: 'Spectre'
  },
  {
    value: 'grass',
    title: 'Plante'
  },
  {
    value: 'ground',
    title: 'Sol'
  },
  {
    value: 'ice',
    title: 'Glace'
  },
  {
    value: 'normal',
    title: 'Normal'
  },
  {
    value: 'poison',
    title: 'Poison'
  },
  {
    value: 'psychic',
    title: 'Psy'
  },
  {
    value: 'rock',
    title: 'Roche'
  },
  {
    value: 'steel',
    title: 'Acier'
  },
  {
    value: 'stellar',
    title: 'Stellaire'
  },
  {
    value: 'unknown',
    title: 'Inconnu'
  },
  {
    value: 'water',
    title: 'Eau'
  },
] as { value: Type, title: string }[]

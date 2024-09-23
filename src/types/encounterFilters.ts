export type Difficulty = 'hard' | 'normal' | 'easy'
export const difficulties = [
  {
    value: 'hard',
    title: 'Difficile',
  },
  {
    value: 'normal',
    title: 'Normal',
  },
  {
    value: 'easy',
    title: 'Facile',
  },
] as { value: Difficulty, title: string }[];

export type Biome = 'cave' | 'forest' | 'grassland' | 'mountain' | 'rare' | 'rough-terrain' | 'sea' | 'urban' | 'waters-edge'
export const biomes = [
  {
    value: 'cave',
    title: 'Grotte',
  },
  {
    value: 'forest',
    title: 'Forêt',
  },
  {
    value: 'grassland',
    title: 'Prairie',
  },
  {
    value: 'mountain',
    title: 'Montagne',
  },
  {
    value: 'rare',
    title: 'Rare',
  },
  {
    value: 'rough-terrain',
    title: 'Terrain difficile',
  },
  {
    value: 'sea',
    title: 'Océan',
  },
  {
    value: 'urban',
    title: 'Urbain',
  },
  {
    value: 'waters-edge',
    title: 'Aquatique',
  },
] as { value: Biome, title: string }[];

export interface EncounterFilters {
  difficulty: Difficulty,
  biome?: Biome,
  amount: number,
  level: number,
}

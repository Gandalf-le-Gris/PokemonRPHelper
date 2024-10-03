import { Habitat } from "./habitats";

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

export interface EncounterFilters {
  difficulty: Difficulty,
  biome?: Habitat,
  amount: number,
  level: number,
}

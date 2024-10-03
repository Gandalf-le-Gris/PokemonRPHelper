import habitatMap from '@/assets/habitats.json';

export type Habitat =
    'any-land'
  | 'grasslands'
  | 'temperate-forests'
  | 'boreal-forests'
  | 'subtropical-deserts'
  | 'coastal-deserts'
  | 'tundras-taigas'
  | 'wastelands'
  | 'tropical'
  | 'swamps'
  | 'rivers-lakes'
  | 'oceans'
  | 'warm-oceans'
  | 'cold-oceans'
  | 'caves'
  | 'rare'

export const habitatArray = [
  {
    value: 'any-land',
    title: "Terrestre"
  },
  {
    value: 'boreal-forests',
    title: "Forêt boréale"
  },
  {
    value: 'caves',
    title: "Grotte"
  },
  {
    value: 'coastal-deserts',
    title: "Désert côtier"
  },
  {
    value: 'cold-oceans',
    title: "Océan froid"
  },
  {
    value: 'grasslands',
    title: "Plaine"
  },
  {
    value: 'oceans',
    title: "Océan"
  },
  {
    value: 'rare',
    title: "Rare"
  },
  {
    value: 'rivers-lakes',
    title: "Lac ou rivière"
  },
  {
    value: 'subtropical-deserts',
    title: "Désert subtropical"
  },
  {
    value: 'swamps',
    title: "Marais"
  },
  {
    value: 'temperate-forests',
    title: "Forêt tempérée"
  },
  {
    value: 'tropical',
    title: "Tropical"
  },
  {
    value: 'tundras-taigas',
    title: "Toundra ou taïga"
  },
  {
    value: 'warm-oceans',
    title: "Océan chaud"
  },
  {
    value: 'wastelands',
    title: "Terre désolée"
  }
] as { value: Habitat, title: string }[]

export default habitatMap as Record<Habitat, string[]>;

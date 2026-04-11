import { Character } from '@/types/pokemon';
import { hidden, varietyMap, appendVarietyMap, formVarieties } from './varietyData';

function matchesSegment(name: string, key: string): boolean {
  const idx = name.indexOf(key);
  if (idx === -1) return false;
  const end = idx + key.length;
  return end === name.length || name[end] === '-';
}

export function getVarieties(character: Character): { value: number, title: string }[] {
  const baseVarieties = character.pokemon.varieties
    .map((e, i) => ({
      value: i,
      title: Object.entries(varietyMap).find(v => matchesSegment(e.pokemon.name, v[0]))?.[1] ?? 'Normal',
      pokemon: e.pokemon
    }))
    .map(e => ({
      ...e,
      title: Object.entries(appendVarietyMap).reduce((acc, x) => {
        if (acc === 'Normal' && matchesSegment(e.pokemon.name, x[0])) {
          acc = '';
        }
        return matchesSegment(e.pokemon.name, x[0]) ? acc + ' ' + x[1] : acc;
      }, e.title)
    }))
    .filter(e => !hidden.some(h => e.pokemon.name.includes(h)))
    .map(({ value, title }) => ({ value, title }));

  const extraForms = (formVarieties[character.pokemon.name] ?? [])
    .map((form, i) => ({ value: character.pokemon.varieties.length + i, title: form.title }));

  return [...baseVarieties, ...extraForms];
}

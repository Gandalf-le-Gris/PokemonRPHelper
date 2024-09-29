import { encounterService } from "@/services/instances/encounterService.instance";
import { talentArray, TalentType } from "./talents";
import { getPokemonSpecificities, SpecificityType } from "./specificities";
import { Type } from "./types";
import { Ability, getAbility } from "./abilities";
import { IQSkill } from "./iqSkills";

export interface Pokemon {
  id: number,
  name: string,
  names: any[],
  baseStats: Stats,
  types: Type[],
  varieties: any[]
}

export type StatName = 'hp' | 'atk' | 'def' | 'spatk' | 'spdef' | 'spd';

export const statsArray = [
  {
    value: 'hp',
    title: 'PV',
  },
  {
    value: 'atk',
    title: 'Attaque',
  },
  {
    value: 'def',
    title: 'Défense',
  },
  {
    value: 'spatk',
    title: 'Attaque spé.',
  },
  {
    value: 'spdef',
    title: 'Défense spé.',
  },
  {
    value: 'spd',
    title: 'Vitesse',
  },
] as { value: StatName, title: string }[];

export interface Stats {
  hp: number,
  atk: number,
  def: number,
  spatk: number,
  spdef: number,
  spd: number,
}

export interface Character {
  uuid: string,
  name: string,
  species: string,
  variety: number,
  pokemon: Pokemon,
  stats: Stats,
  hpt: number,
  talents: {talent: TalentType, mod: number}[],
  specificities: SpecificityType[],
  level: number,
  ability: Ability,
  inventory: string
  attacks: string[],
  items: {
    held: string
    head: string,
    neck: string,
    belt: string
  },
  iqSkills: IQSkill[]
}

export async function createCharacter(pokemon: Pokemon, level: number): Promise<Character> {
  const detail = await encounterService.getPokemonDetail(pokemon.id);
  pokemon.types = Object.values(detail.types).map((e: any) => e.type.name)
  pokemon.baseStats = {
    hp: detail.stats[0].base_stat,
    atk: detail.stats[1].base_stat,
    def: detail.stats[2].base_stat,
    spatk: detail.stats[3].base_stat,
    spdef: detail.stats[4].base_stat,
    spd: detail.stats[5].base_stat,
  };

  const character: Character = {
    uuid: crypto.randomUUID(),
    name: pokemon.names.find((e: any) => e.language.name === 'fr').name ?? pokemon.name,
    species: pokemon.name,
    pokemon,
    variety: 0,
    stats: {
      hp: 0,
      atk: 0,
      def: 0,
      spatk: 0,
      spdef: 0,
      spd: 0,
    },
    hpt: 1,
    talents: talentArray.map(e => ({talent: e.value, mod: 0})),
    specificities: [],
    level,
    ability: { value: 'Special', title: 'Special', desc: 'WIP' },
    inventory: '',
    attacks: ['', '', '', ''],
    items: {
      held: '',
      head: '',
      neck: '',
      belt: ''
    },
    iqSkills: []
  };

  if (level > 0) {
    character.talents[Math.floor(Math.random() * character.talents.length)].mod = 2;
    for (let i = 0; i < 2; i++) {
      let ind: number;
      do {
        ind = Math.floor(Math.random() * character.talents.length);
      } while (character.talents[ind].mod)
      character.talents[ind].mod = 1;
    }
  }
  character.specificities = getPokemonSpecificities(character);
  character.ability = getAbility(character);

  for (let i = 1; i <= level; i++) {
    levelUp(character, i);
  }
  return character;
}

export async function changeSpecies(character: Character) {
  const pokemon = await encounterService.getPokemonSpecies(character.species);
  const detail = await encounterService.getPokemonDetailByVariety(pokemon.varieties[character.variety].pokemon.url);
  pokemon.types = Object.values(detail.types).map((e: any) => e.type.name);
  character.pokemon = pokemon;
  character.specificities = getPokemonSpecificities(character);
  character.ability = getAbility(character);
}

function levelUp(character: Character, level: number) {
  const learnedTalents = character.talents.filter(e => !e.mod).length;
  if (level % 5 !== 0) {
    if (learnedTalents < talentArray.length && Math.random() < 1 / learnedTalents) {
      let ind: number;
      do {
        ind = Math.floor(Math.random() * character.talents.length);
      } while (character.talents[ind].mod)
      character.talents[ind].mod = 1;
    } else {
      enchanceStatsOnce(character);
    }
  } else {
    if (learnedTalents < talentArray.length && Math.random() < 1 / (learnedTalents - 1)) {
      let ind: number;
      do {
        ind = Math.floor(Math.random() * character.talents.length);
      } while (character.talents[ind].mod)
      character.talents[ind].mod = 2;
    } else {
      enchanceStatsOnce(character);
      enchanceStatsOnce(character);
    }
    character.iqSkills.push({ value: 'Not learned', title: 'Pas encore appris', desc: 'Pas encore appris', level: 1 });
  }
  character.hpt = computeHPT(character);
}

function enchanceStatsOnce(character: Character) {
  const bst: number = Object.values(character.pokemon.baseStats).reduce((acc, v) => acc + v, 0);
  const pmf = Object.values(character.pokemon.baseStats).map(e => e / bst);
  const cdf = pmf.map((sum => value => sum += value)(0));
  let rd: number;
  let stat;
  for (let i = 0; i < 3; i++) {
    rd = Math.random();
    stat = Object.keys(character.stats)[cdf.findIndex(e => rd <= e)] as StatName;
    character.stats[stat]++;
  }
}

export function computeHPT(character: Character) {
  if (character.ability.value === 'Tank' || character.iqSkills.some(e => e.value === 'Brick house') || character.iqSkills.some(e => e.value === 'Advanced brick house')) {
    if (character.ability.value === 'Tank' && character.iqSkills.some(e => e.value === 'Brick house')
        || character.ability.value === 'Tank' && character.iqSkills.some(e => e.value === 'Advanced brick house')
        || character.iqSkills.some(e => e.value === 'Brick house') && character.iqSkills.some(e => e.value === 'Advanced brick house')) {
      if (character.ability.value === 'Tank' && character.iqSkills.some(e => e.value === 'Brick house') && character.iqSkills.some(e => e.value === 'Advanced brick house')) {
        return Math.max(1, character.stats.hp * 9);
      }
      return Math.max(1, character.stats.hp * 7);
    }
    return Math.max(1, character.stats.hp * 5);
  }
  return Math.max(1, character.stats.hp * 3);
}
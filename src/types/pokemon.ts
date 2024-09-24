import { encounterService } from "@/services/instances/encounterService.instance";
import { talentArray, TalentType } from "./talents";
import { getPokemonSpecificities, SpecificityType } from "./specificities";

export interface Pokemon {
  id: number,
  name: string,
  names: any[],
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
  pokemon: Pokemon,
  baseStats: Stats,
  stats: Stats,
  hpt: number,
  talents: {talent: TalentType, mod: number}[],
  specificities: SpecificityType[],
}

export async function createCharacter(pokemon: Pokemon, level: number): Promise<Character> {
  const detail = await encounterService.getPokemonDetail(pokemon.id);
  const baseStats = {
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
    species: pokemon.names.find((e: any) => e.language.name === 'fr').name ?? pokemon.name,
    pokemon: pokemon,
    baseStats,
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
  };
  character.talents[Math.floor(Math.random() * character.talents.length)].mod = 2;
  for (let i = 0; i < 2; i++) {
    let ind: number;
    do {
      ind = Math.floor(Math.random() * character.talents.length);
    } while (character.talents[ind].mod)
    character.talents[ind].mod = 1;
  }
  character.specificities = getPokemonSpecificities(character);
  for (let i = 1; i <= level; i++) {
    levelUp(character, level);
  }
  console.log(character.name, character.specificities);
  return character;
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
  }
}

function enchanceStatsOnce(character: Character) {
  const bst: number = Object.values(character.baseStats).reduce((acc, v) => acc + v, 0);
  const pmf = Object.values(character.baseStats).map(e => e / bst);
  const cdf = pmf.map((sum => value => sum += value)(0));
  let rd: number;
  let stat;
  for (let i = 0; i < 3; i++) {
    rd = Math.random();
    stat = Object.keys(character.stats)[cdf.findIndex(e => rd <= e)] as StatName;
    character.stats[stat]++;
  }
}
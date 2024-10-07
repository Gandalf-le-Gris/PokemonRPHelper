import { encounterService } from "@/services/instances/encounterService.instance";
import { talentArray, TalentType } from "./talents";
import { getPokemonSpecificities, SpecificityType } from "./specificities";
import { Type, typeArray } from "./types";
import { Ability, getAbility } from "./abilities";
import { IQSkill, iqSkillArray } from "./iqSkills";
import { Experience } from "./experience";
import statusMoves from "./statusMoves";

export interface Pokemon {
  id: number,
  name: string,
  names: any[],
  baseStats: Stats,
  types: Type[],
  varieties: any[],
  sprites: {
    front_default: string,
  },
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
  attacks: { type?: Type, detail?: string }[],
  items: {
    held: string
    head: string,
    neck: string,
    belt: string
  },
  iqSkills: IQSkill[],
  experience: Experience
}

export async function createCharacter(pokemon: Pokemon, level: number, uuid?: string): Promise<Character> {
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
  pokemon.sprites = { front_default: detail.sprites.front_default };

  const character: Character = {
    uuid: uuid ?? crypto.randomUUID(),
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
    level: Number(level),
    ability: { value: 'Special', title: 'Special', desc: 'WIP' },
    inventory: '',
    attacks: [{}, {}, {}, {}],
    items: {
      held: '',
      head: '',
      neck: '',
      belt: ''
    },
    iqSkills: [],
    experience: {
      dungeonClear: false,
      exploration: false,
      fail: false,
      success: false,
      friend: false,
      ko: false,
      help: false,
    }
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

    if (character.pokemon.types.length > 1 && !character.pokemon.types.includes('normal')) {
      character.attacks[0].type = character.pokemon.types[0];
      character.attacks[1].type = character.pokemon.types[1];
      character.attacks[2].type = 'normal';
    } else {
      if (character.pokemon.types.length > 1) {
        character.attacks[0].type = character.pokemon.types[0];
        character.attacks[1].type = character.pokemon.types[1];
      } else if (character.pokemon.types[0] === 'normal') {
        character.attacks[0].type = character.pokemon.types[0];
        const types = typeArray.map(e => e.value).filter(e => e !== 'normal' && e !== 'stellar' && e !== 'unknown');
        character.attacks[1].type = types[Math.floor(Math.random() * types.length)];
      } else {
        character.attacks[0].type = character.pokemon.types[0];
        character.attacks[1].type = 'normal';
      }
      character.attacks[2].type = 'normal';
      let status = statusMoves['normal'][Math.min(3, 1 + Math.floor(Math.random() * character.level / 20))];
      if (!status.length) {
        status = statusMoves['normal'][2];
      }
      character.attacks[2].detail = status[Math.floor(Math.random() * status.length)];
    }
    character.attacks[3].type = character.pokemon.types[Math.floor(Math.random() * character.pokemon.types.length)];
    let status = statusMoves[character.attacks[3].type][Math.min(3, 1 + Math.floor(Math.random() * character.level / 10))];
    if (!status.length) {
      status = statusMoves[character.attacks[3].type][2];
    }
    character.attacks[3].detail = status[Math.floor(Math.random() * status.length)];
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
  pokemon.sprites = { front_default: detail.sprites.front_default };
  character.pokemon = pokemon;
  character.specificities = getPokemonSpecificities(character);
  character.ability = getAbility(character);
}

function levelUp(character: Character, level: number) {
  enchanceStatsOnce(character);
  const learnedTalents = character.talents.filter(e => !e.mod).length;
  if (level % 5 !== 0 && level % 2 === 0) {
    if (learnedTalents < talentArray.length && Math.random() < 1 / learnedTalents) {
      let ind: number;
      do {
        ind = Math.floor(Math.random() * character.talents.length);
      } while (character.talents[ind].mod)
      character.talents[ind].mod = 1;
    } else {
      enchanceStatsOnce(character);
    }
  } else if (level % 5 === 0) {
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

    let availableSkills = iqSkillArray
      .filter(e => !character.iqSkills.includes(e)
        && e.level <= level
        && (e.level > level - 15 || e.level === 50)
        && !e.value.toLowerCase().includes('bond'));
    if (!availableSkills.length) {
      availableSkills = iqSkillArray
        .filter(e => !character.iqSkills.includes(e)
          && e.level <= level
          && !e.value.toLowerCase().includes('bond'));
    }
    if (availableSkills.length) {
      character.iqSkills.push(availableSkills[Math.floor(Math.random() * availableSkills.length)]);
    } else {
      character.iqSkills.push({ value: 'None', title: 'Aucun', desc: 'Aucun talent disponible', level: 0 });
    }
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
    const lowestStat = Object.values(character.stats).reduce((acc, x) => acc > x ? x : acc, character.stats.hp);
    do {
      rd = Math.random();
      stat = Object.keys(character.stats)[cdf.findIndex(e => rd <= e)] as StatName;
    } while (character.stats[stat] >= lowestStat + 20)
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

export function isCharacter(obj: any): obj is Character {
  return !!obj.uuid && typeof obj.uuid === 'string'
    && !!obj.name && typeof obj.name === 'string'
    && !!obj.species && typeof obj.species === 'string'
    && obj.variety !== undefined && typeof obj.variety === 'number'
    && !!obj.pokemon
    && obj.level !== undefined && typeof obj.level === 'number'
}
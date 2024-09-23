import { encounterService } from "@/services/instances/encounterService.instance";

export interface Pokemon {
  name: string,
  names: any[],
}

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
  pokemon: Pokemon,
  baseStats: Stats,
  stats: Stats,
  hpt: number,
}

export async function createCharacter(pokemon: Pokemon, level: number): Promise<Character> {
  const detail = await encounterService.getPokemonDetail(pokemon.name);
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
  };
  for (let i = 1; i <= level; i++) {
    if (i % 5 === 0) {

    } else {

    }
  }
  return character;
}

function statsUp(character: Character) {

}
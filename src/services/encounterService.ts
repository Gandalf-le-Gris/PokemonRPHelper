import habitatMap, { Habitat } from "@/types/habitats";
import axios from "axios";

const TOTAL_POKEMON_COUNT = 1025;

export class EncounterService {
  public async getPokemonSpecies(name: string | number) {
    try {
      return (await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)).data;
    } catch (e) {
      throw new Error(`Espèce ${name} non trouvée`);
    }
  }

  public async getPokemonDetail(name: string | number) {
    return (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
  }

  public async getPokemonDetailByVariety(url: string) {
    return (await axios.get(url)).data;
  }

  public async getRandomPokemon(habitat?: Habitat) {
    if (habitat) {
      if (habitat !== 'any-land' && !habitat.includes('ocean') && !habitat.includes('river') && Math.random() < .1) {
        habitat = 'any-land';
      }
      const pokemonList = habitatMap[habitat];
      const pokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)].toLowerCase().split(' ')[0];
      return this.getPokemonSpecies(pokemon);
    }
    return this.getPokemonSpecies(Math.floor(Math.random() * TOTAL_POKEMON_COUNT));
  }

  public async getRandomPokemonWithLevel(level: number, habitat?: Habitat) {
    let pokemon;
    let base;
    let evolution;
    let tier;
    do {
      pokemon = await this.getRandomPokemon(habitat);
      base = (await axios.get(pokemon.evolution_chain.url)).data.chain;
      evolution = undefined;
      tier = 0;
      while (base.evolves_to.length) {
        evolution = base.evolves_to[Math.floor(Math.random() * base.evolves_to.length)];
        tier++;
        if (!evolution.evolution_details[0]
          || evolution.evolution_details[0].min_level && evolution.evolution_details[0].min_level > level
          || !evolution.evolution_details[0].min_level && tier * 20 > level
        ) {
          break;
        }
        base = evolution;
      }
    } while (pokemon.name !== base.species.name);
    return pokemon;
  }
}

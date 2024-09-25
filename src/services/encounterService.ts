import { Biome } from "@/types/encounterFilters";
import axios from "axios";

const TOTAL_POKEMON_COUNT = 1025;

export class EncounterService {
  public async getBiomeDetail(biome: Biome) {
    return (await axios.get(`https://pokeapi.co/api/v2/pokemon-habitat/${biome}`)).data;
  }

  public async getPokemonSpecies(name: string | number) {
    return (await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)).data;
  }

  public async getPokemonDetail(name: string | number) {
    return (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
  }

  public async getRandomPokemon(biome?: Biome) {
    if (biome) {
      const pokemonList = (await this.getBiomeDetail(biome)).pokemon_species.map((e: any) => e.name);
      return this.getPokemonSpecies(pokemonList[Math.floor(Math.random() * pokemonList.length)]);
    }
    return this.getPokemonSpecies(Math.floor(Math.random() * TOTAL_POKEMON_COUNT));
  }
}
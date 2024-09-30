import { Type, TypeDetail, typeArray } from "@/types/types";
import axios from "axios";

export class TypeService {
  public typeList: TypeDetail[] = [];

  constructor() {
    typeArray.forEach(t => {
      this.getTypeDetail(t.value).then(r => this.typeList.push(r));
    });
  }

  public async getType(type: Type) {
    return (await axios.get(`https://pokeapi.co/api/v2/type/${type}`)).data;
  }

  public async getTypeIcon(type: Type): Promise<string> {
    return (await this.getType(type))
      .sprites["generation-viii"]["sword-shield"].name_icon;
  }

  public async getOrFetchTypeIcon(type: Type): Promise<string> {
    return this.typeList.find(e => e.type === type)?.src ?? await this.getTypeIcon(type);
  }

  public async getTypeDetail(type: Type): Promise<TypeDetail> {
    const r = await this.getType(type);
    return {
      type,
      title: typeArray.find(e => e.value === type)?.title ?? '',
      src: r.sprites["generation-viii"]["sword-shield"].name_icon,
      offensive: {
        strong: r.damage_relations.double_damage_to.map((e: { name: string }) => e.name),
        weak: r.damage_relations.half_damage_to.map((e: { name: string }) => e.name),
        ineffective: r.damage_relations.no_damage_to.map((e: { name: string }) => e.name),
      },
      defensive: {
        strong: r.damage_relations.half_damage_from.map((e: { name: string }) => e.name),
        weak: r.damage_relations.double_damage_from.map((e: { name: string }) => e.name),
        ineffective: r.damage_relations.no_damage_from.map((e: { name: string }) => e.name),
      },
    }
  }

  public async getOrFetchTypeDetail(type: Type): Promise<TypeDetail> {
    return this.typeList.find(e => e.type === type) ?? await this.getTypeDetail(type);
  }
}

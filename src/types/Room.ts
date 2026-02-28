import { Character, StatName } from "./pokemon"
import { StatusEffect } from "./statusEffects"

export interface Room {
  uuid: string,
  map: RoomTile[][],
  environment: string,
  characters: BattleCharacter[],
  initiativeList: string[],
  activeCharacter?: string,
  persistent: boolean,
}

export interface RoomTile {
  terrain: RoomTileType,
  assets: TileAsset[]
}

export type RoomTileType = 'p' | 's' | 'w'

export const roomTileTypeArray: { value: RoomTileType, title: string }[] = [
  {
    value: 'p',
    title: 'Primaire'
  },
  {
    value: 's',
    title: 'Secondaire'
  },
  {
    value: 'w',
    title: 'Mur'
  }
]

export type BattleCharacterStatus = Partial<Record<StatusEffect, boolean>>
export type BattleCharacterStats = Partial<Record<StatName, number>>

export interface BattleCharacter {
  i: number,
  j: number,
  isPlayer: boolean,
  character: Character
  status: BattleCharacterStatus
  stats: BattleCharacterStats
}

export interface TileAsset {
  uuid: string,
  value: string,
  visible: boolean
}

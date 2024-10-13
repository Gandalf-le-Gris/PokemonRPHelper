import { Character } from "./pokemon"

export interface Room {
  uuid: string,
  map: RoomTile[][],
  environment: string,
  characters: BattleCharacter[],
  initiativeList: string[],
  activeCharacter?: string
}

export interface RoomTile {
  terrain: RoomTileType
}

export type RoomTileType = 'p' | 's' | 'w'

export interface BattleCharacter {
  i: number,
  j: number,
  isPlayer: boolean,
  character: Character
}

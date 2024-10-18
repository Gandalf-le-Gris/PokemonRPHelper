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

export interface BattleCharacter {
  i: number,
  j: number,
  isPlayer: boolean,
  character: Character
}

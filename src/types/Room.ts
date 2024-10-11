export interface Room {
  uuid: string,
  map: RoomTile[][],
}

export interface RoomTile {
  terrain: RoomTileType
}

export type RoomTileType = 'grass'

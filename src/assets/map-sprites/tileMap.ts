import { RoomTile } from "@/types/Room"

export interface TileNeighborhood {
  tl: boolean | null,
  t: boolean | null,
  tr: boolean | null,
  l: boolean | null,
  r: boolean | null,
  bl: boolean | null,
  b: boolean | null,
  br: boolean | null,
}

const neighborhoodMap: TileNeighborhood[][] = [
  [
    {
      tl: null,
      t: false,
      tr: null,
      l: false,
      r: true,
      bl: null,
      b: true,
      br: true,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: true,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: true,
      r: false,
      bl: true,
      b: true,
      br: null,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: false,
      r: true,
      bl: null,
      b: true,
      br: false,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: true,
      r: true,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: true,
      r: false,
      bl: false,
      b: true,
      br: null,
    },
  ],
  [
    {
      tl: null,
      t: true,
      tr: true,
      l: false,
      r: true,
      bl: null,
      b: true,
      br: true,
    },
    {
      tl: true,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: true,
    },
    {
      tl: true,
      t: true,
      tr: null,
      l: true,
      r: false,
      bl: true,
      b: true,
      br: null,
    },
    {
      tl: null,
      t: true,
      tr: null,
      l: false,
      r: false,
      bl: null,
      b: true,
      br: null,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: false,
      r: false,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: false,
      t: true,
      tr: null,
      l: true,
      r: false,
      bl: null,
      b: false,
      br: null,
    },
  ],
  [
    {
      tl: null,
      t: true,
      tr: true,
      l: false,
      r: true,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: true,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: true,
      t: true,
      tr: null,
      l: true,
      r: false,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: null,
      t: true,
      tr: false,
      l: false,
      r: true,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: false,
      r: false,
      bl: null,
      b: true,
      br: null,
    },
  ],
  [
    {
      tl: true,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: false,
    },
    {
      tl: false,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: true,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: false,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: false,
      r: true,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: false,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: false,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: true,
      r: false,
      bl: null,
      b: false,
      br: null,
    },
  ],
  [
    {
      tl: false,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: true,
    },
    {
      tl: true,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: false,
    },
    {
      tl: false,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: null,
      t: true,
      tr: false,
      l: false,
      r: true,
      bl: null,
      b: true,
      br: false,
    },
    {
      tl: null,
      t: true,
      tr: null,
      l: false,
      r: false,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: false,
      t: true,
      tr: null,
      l: true,
      r: false,
      bl: false,
      b: true,
      br: null,
    },
  ],
  [
    {
      tl: true,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: false,
    },
    {
      tl: true,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: true,
    },
    {
      tl: null,
      t: true,
      tr: true,
      l: false,
      r: true,
      bl: null,
      b: true,
      br: false,
    },
    {
      tl: true,
      t: true,
      tr: null,
      l: true,
      r: false,
      bl: false,
      b: true,
      br: null,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: false,
    },
    {
      tl: null,
      t: false,
      tr: null,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: true,
    },
  ],
  [
    {
      tl: true,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: true,
    },
    {
      tl: false,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: true,
    },
    {
      tl: null,
      t: true,
      tr: false,
      l: false,
      r: true,
      bl: null,
      b: true,
      br: true,
    },
    {
      tl: false,
      t: true,
      tr: null,
      l: true,
      r: false,
      bl: true,
      b: true,
      br: null,
    },
    {
      tl: true,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: null,
      b: false,
      br: null,
    },
    {
      tl: false,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: null,
      b: false,
      br: null,
    },
  ],
  [
    {
      tl: false,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: true,
    },
    {
      tl: false,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: false,
    },
    {
      tl: false,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: false,
    },
    {
      tl: true,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: false,
    },
    {
      tl: false,
      t: true,
      tr: true,
      l: true,
      r: true,
      bl: true,
      b: true,
      br: false,
    },
    {
      tl: true,
      t: true,
      tr: false,
      l: true,
      r: true,
      bl: false,
      b: true,
      br: true,
    },
  ],
];

export function findTilePosition(map: RoomTile[][], i: number, j: number): { i: number, j: number } {
  const pattern: TileNeighborhood = {
    tl: i == 0 || j == 0 || map[i - 1][j - 1].terrain === map[i][j].terrain,
    t: i == 0 || map[i - 1][j].terrain === map[i][j].terrain,
    tr: i == 0 || j == map[0].length - 1 || map[i - 1][j + 1].terrain === map[i][j].terrain,
    l: j == 0 || map[i][j - 1].terrain === map[i][j].terrain,
    r: j == map[0].length - 1 || map[i][j + 1].terrain === map[i][j].terrain,
    bl: i == map.length - 1 || j == 0 || map[i + 1][j - 1].terrain === map[i][j].terrain,
    b: i == map.length - 1 || map[i + 1][j].terrain === map[i][j].terrain,
    br: i == map.length - 1 || j == map[0].length - 1 || map[i + 1][j + 1].terrain === map[i][j].terrain,
  };

  let ri = neighborhoodMap
    .findIndex((row: TileNeighborhood[]) => row
      .some((tile: TileNeighborhood) => Object.keys(tile)
        .every(key => tile[key as 't'] === pattern[key as 't'])));
  if (ri < 0) {
    ri = neighborhoodMap
    .findIndex((row: TileNeighborhood[]) => row
      .some((tile: TileNeighborhood) =>
        tile.t === pattern.t
        && tile.l === pattern.l
        && tile.r === pattern.r
        && tile.b === pattern.b
        && (!!tile.tl === pattern.tl || tile.tl === null && pattern.tl)
        && (!!tile.tr === pattern.tr || tile.tr === null && pattern.tr)
        && (!!tile.bl === pattern.bl || tile.bl === null && pattern.bl)
        && (!!tile.br === pattern.br || tile.br === null && pattern.br)
      ));
  }
  if (ri < 0) {
    console.log(pattern);
    return { i: 2, j: 5 };
  }
  let rj = neighborhoodMap[ri]
    .findIndex((tile: TileNeighborhood) => Object.keys(tile)
      .every(key => tile[key as 't'] === pattern[key as 't']));
  if (rj < 0) {
    rj = neighborhoodMap[ri]
      .findIndex((tile: TileNeighborhood) => 
        tile.t === pattern.t
        && tile.l === pattern.l
        && tile.r === pattern.r
        && tile.b === pattern.b
        && (!!tile.tl === pattern.tl || tile.tl === null && pattern.tl)
        && (!!tile.tr === pattern.tr || tile.tr === null && pattern.tr)
        && (!!tile.bl === pattern.bl || tile.bl === null && pattern.bl)
        && (!!tile.br === pattern.br || tile.br === null && pattern.br)
      );
  }
  if (rj < 0) {
    return { i: 2, j: 5 };
  }

  switch (map[i][j].terrain) {
    case 'w':
      return { i: ri, j: rj };
    case 's':
      return { i: ri, j: 6 + rj };
    case 'p':
      return { i: ri, j: 12 + rj };
    default:
      return { i: 2, j: 5 };
  }
}

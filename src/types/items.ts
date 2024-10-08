import items from '@/assets/items.json';

export interface Item {
  name: string,
  desc?: string,
  buy?: number,
  sell?: number,
}

export interface Clothing extends Item {
  head?: boolean,
  neck?: boolean,
  belt?: boolean,
}

export type ItemType = 'berry' | 'seed' | 'orb' | 'wand' | 'clothing' | 'flag' | 'throwing' | 'rare' | 'miscellaneous';

export const itemTypeArray = [
  {
    value: 'berry',
    title: 'Baies',
  },
  {
    value: 'clothing',
    title: 'Vêtements',
  },
  {
    value: 'flag',
    title: 'Fanions',
  },
  {
    value: 'miscellaneous',
    title: 'Divers',
  },
  {
    value: 'orb',
    title: 'Orbes',
  },
  {
    value: 'rare',
    title: 'Objets rares',
  },
  {
    value: 'seed',
    title: 'Graines',
  },
  {
    value: 'throwing',
    title: 'Objets à lancer',
  },
  {
    value: 'wand',
    title: 'Bâtons',
  },
] as { value: ItemType, title: string }[];

export default items as Record<ItemType, Item[]>;

export function computeValue(inventory: string): number {
  const lines = inventory.split('\n');
  return lines.reduce((acc, x) => {
    if (x.match(/\d+ *P/gi)?.length) {
      return acc + Number(x.match(/\d+/g)?.[0]);
    }
    const item = Object.values(items).flat().find(e => x.startsWith(e.name));
    if (item && item.sell) {
      const arr = x.split(' ');
      const mult = Number(arr[arr.length - 1]);
      if (!Number.isNaN(mult) && mult > 0) {
        return acc + item.sell * mult;
      }
      return acc + item.sell;
    }
    return acc;
  }, 0);
}

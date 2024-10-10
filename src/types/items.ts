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
    value: 'seed',
    title: 'Graines',
  },
  {
    value: 'orb',
    title: 'Orbes',
  },
  {
    value: 'wand',
    title: 'Bâtons',
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
    value: 'throwing',
    title: 'Objets à lancer',
  },
  {
    value: 'rare',
    title: 'Objets rares',
  },
  {
    value: 'miscellaneous',
    title: 'Divers',
  },
] as { value: ItemType, title: string }[];

export default items as Record<ItemType, Item[]>;

export function computeValue(inventory: string): number {
  const lines = inventory.split('\n');
  return lines.reduce((acc, x) => {
    if (x.match(/\d+ *P(?:[^\w]|$)/gi)?.length) {
      return acc + Number(x.match(/\d+/g)?.[0]);
    }
    const item = Object.values(items).flat().find(e => x.toLowerCase().includes(e.name.toLowerCase()));
    if (item && item.sell) {
      const mult = x.match(/(\d+)/gi)?.map(e => Number(e)).find(e => e > 0);
      if (mult) {
        return acc + item.sell * mult;
      }
      return acc + item.sell;
    }
    return acc;
  }, 0);
}

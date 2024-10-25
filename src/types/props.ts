export const assetsArray: Record<Asset, { value: string, title: string }[]> = {
  'decor': [
    {
      value: 'trunk',
      title: 'Souche'
    },
    {
      value: 'block',
      title: 'Bloc'
    },
    {
      value: 'hedge',
      title: 'Haie'
    },
    {
      value: 'logs',
      title: 'Rondins'
    }
  ],
  'item': [
    {
      value: 'campfire',
      title: 'Feu de camp'
    },
    {
      value: 'chest',
      title: 'Coffre'
    },
    {
      value: 'flowerpot',
      title: 'Pot de fleurs'
    },
    {
      value: 'pot',
      title: 'Pot'
    },
    {
      value: 'sign',
      title: 'Panneau'
    }
  ],
  'tile': [
    {
      value: 'stairs_down',
      title: 'Escaliers descendants'
    },
    {
      value: 'stairs_up',
      title: 'Escaliers montants'
    },
    {
      value: 'compass_tile',
      title: 'Case Compas'
    },
    {
      value: 'rescue_tile',
      title: 'Case Secours'
    },
    {
      value: 'shop_tile',
      title: 'Case Boutique'
    },
    {
      value: 'wonder_tile',
      title: 'Case Miracle'
    }
  ],
  'trap': [
    {
      value: 'spikes_trap',
      title: 'Piège Picots'
    },
    {
      value: 'explosion_trap',
      title: 'Piège Explosion'
    },
    {
      value: 'warp_trap',
      title: 'Piège Téléportation'
    },
    {
      value: 'grimy_trap',
      title: 'Piège Collant'
    },
    {
      value: 'grudge_trap',
      title: 'Piège Dépit'
    },
    {
      value: 'gust_trap',
      title: 'Piège Tornade'
    },
    {
      value: 'poison_trap',
      title: 'Piège Poison'
    },
    {
      value: 'stealth_rock_trap',
      title: 'Piège de Roc'
    },
    {
      value: 'seal_trap',
      title: 'Piège Sceau'
    },
    {
      value: 'pitfall_trap',
      title: 'Piège Trou'
    }
  ]
};

export type Asset = 'trap' | 'decor' | 'item' | 'tile';

export const assetsLabelArray: { value: Asset, title: string }[] = [
  {
    value: 'decor',
    title: 'Nature'
  },
  {
    value: 'item',
    title: 'Objets'
  },
  {
    value: 'tile',
    title: 'Cases'
  },
  {
    value: 'trap',
    title: 'Pièges'
  }
];

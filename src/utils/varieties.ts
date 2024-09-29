import { Character } from "@/types/pokemon";

export function getVarieties(character: Character): { value: number, title: string }[] {
  return character.pokemon.varieties
    .map((e, i) => ({
      value: i,
      title: Object.entries(varietyMap).find(v => e.pokemon.name.includes(v[0]))?.[1] ?? 'Normal',
      pokemon: e.pokemon
    }))
    .map(e => ({
      ...e,
      title: Object.entries(appendVarietyMap).reduce((acc, x) => {
        if (acc === 'Normal' && e.pokemon.name.includes(x[0])) {
          acc = '';
        }
        return e.pokemon.name.includes(x[0]) ? acc + ' ' + x[1] : acc;
      }, e.title)
    }))
    .filter(e => !hidden.some(h => e.pokemon.name.includes(h)))
    .map(({ value, title }) => ({ value, title }));
}

const hidden = [
  '-totem',
  '-busted',
  '-noice',
  '-rock-star',
  '-belle',
  '-phd',
  '-pop-star',
  '-libre',
  '-cosplay',
  '-cap',
  '-starter',
  '-droopy',
  '-stretchy',
  '-power-construct',
  '-resolute',
  '-orange',
  '-yellow',
  '-green',
  'minior-blue',
  '-indigo',
  '-violet',
  'magearna-original',
  '-gulping',
  '-gorging',
  '-dada',
  '-family-of-three',
  '-blue-plumage',
  '-yellow-plumage',
  '-white-plumage',
  '-three-segment',
  '-roaming',
  '-own-tempo'
];

const varietyMap = {
  '-alola': 'Alola',
  '-galar': 'Galar',
  '-hisui': 'Hisui',
  '-paldea': 'Paldea',
  '-single-strike': 'Poing Final',
  '-rapid-strike': 'Mille Poings',
  '-unbound': 'Déchaîné',
  '-incarnate': 'Avatar',
  '-therian': 'Totémique',
  '-midday': 'Diurne',
  '-midnight': 'Nocturne',
  'lycanroc-dusk': 'Crépusculaire',
  '-ice': 'Cavalier du Froid',
  'calyrex-shadow': 'Cavalier d\'Effroi',
  '-altered': 'Alternative',
  '-origin': 'Originelle',
  '-land': 'Terrestre',
  '-sky': 'Céleste',
  'necrozma-dusk': 'Crinière du Couchant',
  '-dawn': 'Ailes de l\'Aurore',
  '-ultra': 'Ultra',
  '-zero': 'Zéro',
  '-hero': 'Héros',
  '-solo': 'Solitaire',
  '-school': 'Banc',
  '-terastal': 'Téracristal',
  '-stellar': 'Stellaire',
  '-heat': 'Chaleur',
  '-frost': 'Froid',
  '-fan': 'Hélice',
  '-mow': 'Tondeuse',
  '-wash': 'Lavage',
  '-bloodmoon': 'Lune vermeille',
  '-small': 'Mini',
  '-large': 'Maxi',
  '-super': 'Ultra',
  '-eternamax': 'Infinimax',
  '-attack': 'Attaque',
  '-defense': 'Défense',
  '-speed': 'Vitesse',
  '-battle-bond': 'Synergie',
  '-ash': 'Sacha',
  '-sunny': 'Solaire',
  '-rainy': 'Eau de Pluie',
  '-snowy': 'Blizzard',
  '-full-belly': 'Rassasié',
  '-hangry': 'Affamé',
  '-black': 'Noir',
  '-white': 'Blanc',
  '-amped': 'Aiguë',
  '-low-key': 'Grave',
  '-male': 'Mâle',
  '-female': 'Femelle',
  '-crowned': 'Couronné',
  '-wellspring-mask': 'Masque du Puits',
  '-hearthflame-mask': 'Masque du Fourneau',
  '-cornerstone-mask': 'Masque de Pierre',
  '-aria': 'Chant',
  '-pirouette': 'Danse',
  '-50': '50%',
  '-complete': 'Parfait',
  '-10': '10%',
  '-plant': 'Cape Plante',
  '-sandy': 'Cape Sable',
  '-trash': 'Cape Déchet',
  '-red-striped': 'Rouge',
  '-blue-striped': 'Bleu',
  '-white-striped': 'Blanc',
  '-eternal': 'Fleur éternelle',
  '-shield': 'Bouclier',
  '-blade': 'Epée',
  '-baile': 'Flamenco',
  '-pom-pom': 'Pom-Pom',
  '-pau': 'Hula',
  '-sensu': 'Buyō',
  '-red-meteor': 'Météore',
  'minior-red': 'Noyau'
}

export const appendVarietyMap = {
  '-gmax': 'Gigamax',
  '-mega': 'Méga',
  '-zen': 'Zen',
  '-x': 'X',
  '-y': 'Y',
  '-primal': 'Primal'
}

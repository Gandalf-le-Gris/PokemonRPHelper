import specificities from '@/assets/specificities.json';
import { Character, Stats } from './pokemon';
import { TalentType } from './talents';

export type SpecificityType = 
    'twoLegs'
  | 'manyLegs'
  | 'rollWiggleSlide'
  | 'bouncing'
  | 'burrow'
  | 'winged'
  | 'levitation'
  | 'floating'
  | 'swim'
  | 'sticky'
  | 'twoHands'
  | 'manyHands'
  | 'telekinesis'
  | 'waterBreathing'
  | 'telepathy'
  | 'nightVision'
  | 'blindVision'
  | 'superSpeed'
  | 'superResistance'
  | 'tiny'
  | 'small'
  | 'average'
  | 'big'
  | 'giant'
  | 'massive';

export interface Mod {
  stats?: Stats,
  talents?: {
    name: TalentType,
    mod: number 
  }[]
}

export const specificityArray = [
  {
    value: 'average',
    title: 'Taille moyenne',
    desc: 'Mesure moins de 3m',
  },
  {
    value: 'big',
    title: 'Grande taille',
    desc: 'Mesure moins de 5m',
  },
  {
    value: 'blindVision',
    title: 'Vision aveugle',
    desc: 'Peut voir sans yeux et dans le noir (immunité à l\'aveuglement)',
  },
  {
    value: 'bouncing',
    title: 'Rebond',
    desc: 'Se déplace en rebondissant (+1 à la concentration et à la nage)',
    effect: () => ({
      talents: [{
        name: 'Focus',
        mod: 1
      },
      {
        name: 'Swim',
        mod: 1
      }]
    })
  },
  {
    value: 'burrow',
    title: 'Enfouissement',
    desc: 'Peut se déplacer sous terre',
  },
  {
    value: 'floating',
    title: 'Flottant',
    desc: 'Flotte au-dessus du sol (immunité aux attaques sol)',
  },
  {
    value: 'giant',
    title: 'Géant',
    desc: 'Mesure moins de 10m',
  },
  {
    value: 'levitation',
    title: 'Lévitation',
    desc: 'Lévite au-dessus du sol (immunité aux attaques sol, peut transporter lentement d\'autres Pokémon)',
  },
  {
    value: 'manyHands',
    title: 'Plus de 2 mains',
    desc: 'Peut tenir plusieurs objets (+2 en dextérité)',
    effect: () => ({
      talents: [{
        name: 'Finesse',
        mod: 2
      }]
    })
  },
  {
    value: 'manyLegs',
    title: 'Plus de 2 jambes',
    desc: 'Se tient à 4 pattes ou plus (+1 en équilibre et endurance)',
    effect: () => ({
      talents: [{
        name: 'Balance',
        mod: 1
      },
      {
        name: 'Endurance',
        mod: 1
      }]
    })
  },
  {
    value: 'massive',
    title: 'Colossal',
    desc: 'Mesure plus de 10m',
  },
  {
    value: 'nightVision',
    title: 'Nyctalope',
    desc: 'Voit dans le noir',
  },
  {
    value: 'rollWiggleSlide',
    title: 'Rampant',
    desc: 'Se déplace en roulant, rampant ou serpentant (+1 en perspicacité et discrétion)',
    effect: () => ({
      talents: [{
        name: 'Sense motive',
        mod: 1
      },
      {
        name: 'Stealth',
        mod: 1
      }]
    })
  },
  {
    value: 'small',
    title: 'Petite taille',
    desc: 'Mesure moins de 1m20',
  },
  {
    value: 'sticky',
    title: 'Adhérence',
    desc: 'Peut s\'accrocher aux murs (réussite automatique lors de jets d\'escalade)',
    effect: () => ({
      talents: [{
        name: 'Climb',
        mod: 9999
      }]
    })
  },
  {
    value: 'superResistance',
    title: 'Résistant',
    desc: 'Particulièrement résistant (+2 en défense et défense spéciale au niveau 1 et tous les 10 niveaux)',
    effect: (c: Character) => ({
      stats: {
        hp: 0,
        atk: 0,
        def: 2 * Math.ceil((c.level + 1) / 10),
        spatk: 0,
        spdef: 2 * Math.ceil((c.level + 1) / 10),
        spd: 0
      }
    })
  },
  {
    value: 'superSpeed',
    title: 'Rapide',
    desc: 'Particulièrement rapide (+3 en vitesse au niveau 1 et tous les 10 niveaux)',
    effect: (c: Character) => ({
      stats: {
        hp: 0,
        atk: 0,
        def: 0,
        spatk: 0,
        spdef: 0,
        spd: 3 * Math.ceil((c.level + 1) / 10)
      }
    })
  },
  {
    value: 'swim',
    title: 'Nageur',
    desc: 'Nage rapidement (réussite automatique lors de jets de nage)',
    effect: () => ({
      talents: [{
        name: 'Swim',
        mod: 9999
      }]
    })
  },
  {
    value: 'telekinesis',
    title: 'Télékinésie',
    desc: 'Peut manipuler et tenir un objet par télékinésie (+1 en dextérité pour manipuler des objets ainsi) ; peut léviter pendant Concentration * 5 tours (minimum 2) chaque jour (immunité aux attaques sol)',
  },
  {
    value: 'telepathy',
    title: 'Télépathie',
    desc: 'Peut communiquer par télépathie avec n\'importe quel Pokémon qu\'il connaît (jet de concentration, compétence désactivée pendant 2h en cas d\'échec)',
  },
  {
    value: 'tiny',
    title: 'Minuscule',
    desc: 'Mesure moins de 60cm',
  },
  {
    value: 'twoHands',
    title: '2 mains',
    desc: 'Peut tenir un objet (+1 en dextérité)',
    effect: () => ({
      talents: [{
        name: 'Finesse',
        mod: 1
      }]
    })
  },
  {
    value: 'twoLegs',
    title: '2 jambes',
    desc: 'Se déplace sur deux jambes (+1 en escalade et en dextérité)',
    effect: () => ({
      talents: [{
        name: 'Climb',
        mod: 1
      },
      {
        name: 'Finesse',
        mod: 1
      }]
    })
  },
  {
    value: 'waterBreathing',
    title: 'Amphibie',
    desc: 'Peut respirer sous l\'eau (réussite automatique aux jets d\'endurance dans ce cas)',
  },
  {
    value: 'winged',
    title: 'Ailé',
    desc: 'Se déplace en volant (immunité aux attaques sol, peut transporter d\'autres Pokémon mais subit alors 1 dégât par passager et par heure)',
  },
] as { value: SpecificityType, title: string, desc: string, effect?: (c: Character) => Mod }[];

export function getPokemonSpecificities(character: Character): SpecificityType[] {
  return specificityArray
    .map(e => e.value)
    .filter(e => specificities[e].some(s => s.toLowerCase().includes(character.pokemon.name)));
}

export function computeGlobalModifiers(character: Character): Mod {
  const mod: Mod = character.specificities
    .reduce((acc, x) => {
      const effect = specificityArray.find(s => s.value === x)?.effect;
      if (effect) {
        const modTemp = effect(character);
        if (modTemp.stats) {
          acc.stats = {
            hp: acc.stats.hp + modTemp.stats.hp,
            atk: acc.stats.atk + modTemp.stats.atk,
            def: acc.stats.def + modTemp.stats.def,
            spatk: acc.stats.spatk + modTemp.stats.spatk,
            spdef: acc.stats.spdef + modTemp.stats.spdef,
            spd: acc.stats.spd + modTemp.stats.spd,
          }
        }
        if (modTemp.talents) {
          modTemp.talents.forEach(t => {
            const ind = acc.talents.findIndex(e => e.name === t.name);
            if (ind >= 0) {
              acc.talents[ind].mod += t.mod;
            } else {
              acc.talents.push(t);
            }
          })
        }
      }
      return acc;
    }, {
      stats: {
        hp: 0,
        atk: 0,
        def: 0,
        spatk: 0,
        spdef: 0,
        spd: 0
      },
      talents: [] as { name: TalentType, mod: number }[]
    });
    if (character.ability.value === 'Force of wind' && mod.stats) {
      mod.stats = { ...mod.stats, spd: mod.stats.spd * 3 };
    }
    return character.iqSkills
      .reduce((acc, x) => {
        if (x.effect) {
          const modTemp = x.effect(character);
          if (modTemp.talents) {
            modTemp.talents.forEach(t => {
              if (acc.talents) {
                const ind = acc.talents.findIndex(e => e.name === t.name);
                if (ind >= 0) {
                  acc.talents[ind].mod += t.mod;
                } else {
                  acc.talents.push(t);
                }
              }
            })
          }
        }
        return acc;
      }, mod);
}

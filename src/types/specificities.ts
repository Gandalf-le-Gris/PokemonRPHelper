import specificities from '@/assets/specificities.json';
import { Character } from './pokemon';

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
  },
  {
    value: 'manyLegs',
    title: 'Plus de 2 jambes',
    desc: 'Se tient à 4 pattes ou plus (+1 en équilibre et endurance)',
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
  },
  {
    value: 'small',
    title: 'Petite taille',
    desc: 'Mesure moins de 1m20',
  },
  {
    value: 'sticky',
    title: 'Adhérence',
    desc: 'Peut s\'accrocher aux murs (réussite automatique lors d\'escalade)',
  },
  {
    value: 'superResistance',
    title: 'Résistant',
    desc: 'Particulièrement résistant (+2 en défense et défense spéciale au niveau 1 et tous les 10 niveaux)',
  },
  {
    value: 'superSpeed',
    title: 'Rapide',
    desc: 'Particulièrement rapide (+3 en vitesse au niveau 1 et tous les 10 niveaux)',
  },
  {
    value: 'swim',
    title: 'Nageur',
    desc: 'Nage rapidement (réussite automatique lors de nage)',
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
  },
  {
    value: 'twoLegs',
    title: '2 jambes',
    desc: 'Se déplace sur deux jambes (+1 en escalade et en dextérité)',
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
] as { value: SpecificityType, title: string, desc: string }[];

export function getPokemonSpecificities(character: Character): SpecificityType[] {
  return specificityArray
    .map(e => e.value)
    .filter(e => specificities[e].some(s => s.toLowerCase().includes(character.pokemon.name)));
}

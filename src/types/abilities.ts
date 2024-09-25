import abilities from '@/assets/abilities.json';
import { Character } from "./pokemon";
import { Type } from "./types";

export interface Ability {
  value: string,
  title: string,
  desc: string,
  effect?: (c: Character) => void
}

type TypeAbilities = Record<'A' | 'B' | 'C' | 'D', Ability>

const normalAbilities: TypeAbilities = {
  A: {
    value: 'Imitate',
    title: 'Imitation',
    desc: 'Ce Pokémon peut utiliser n\'importe quel type d\'attaque d\'un allié proche'
  },
  B: {
    value: 'Tank',
    title: 'Tank',
    desc: 'Le maximum de PV de ce Pokémon est égal à 5 fois sa statistique de PV au lieu de 3'
  },
  C: {
    value: 'Hoarder',
    title: 'Collectionneur',
    desc: 'Ce Pokémon peut tenir deux objets, porter deux vêtements par emplacement, et trouve un objet mineur en fin de donjon'
  },
  D: {
    value: 'Healer',
    title: 'Soigneur',
    desc: 'Ce Pokémon réussit toujours ses jets de soin'
  },
}

const fightingAbilities: TypeAbilities = {
  A: {
    value: 'Scrappy',
    title: 'Querelleur',
    desc: 'Les attaques inefficaces de ce Pokémon infligent des dégâts normaux'
  },
  B: {
    value: 'Jujutsu',
    title: 'Jujutsu',
    desc: 'Lorsqu\'une attaque physique ennemie rate ce Pokémon, il inflige à l\'attaquant un nombre de dégâts physiques de type combat égal à son attaque'
  },
  C: {
    value: 'Flurry of blows',
    title: 'Volée de coups',
    desc: 'Une fois par combat, ce Pokémon peut attaquer de nouveau après avoir réussi une attaque'
  },
  D: {
    value: 'Pressure points',
    title: 'Points faibles',
    desc: 'Ce Pokémon assène un coup critique sur 11 et 12'
  },
}

const flyingAbilities: TypeAbilities = {
  A: {
    value: 'Flit and flicker',
    title: 'Insaisissable',
    desc: 'Tant que ce Pokémon a au moins 3/4 de ses PV, les autres Pokémon ont un désavantage pour l\'attaquer'
  },
  B: {
    value: 'Tailwind',
    title: 'Vent arrière',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque, il passe en première position dans l\'ordre d\'initiative. S\'il y est déjà, il agit de nouveau'
  },
  C: {
    value: 'Birdsong',
    title: 'Chant d\'oiseau',
    desc: 'Lorsque ce Pokémon rate une attaque, il se soigne à hauteur de 1/8 de ses PV max'
  },
  D: {
    value: 'Swoop',
    title: 'Piqué',
    desc: 'Lorsque ce Pokémon réussit une attaque sur un ennemi, celui-ci a un désavantage lors de sa prochaine attaque contre ce Pokémon'
  },
}

const poisonAbilities: TypeAbilities = {
  A: {
    value: 'Venom Spray',
    title: 'Jet de venin',
    desc: 'Lorsqu\'un ennemi rate ce Pokémon, il devient ébloui pendant 4 tours'
  },
  B: {
    value: 'Sticky hold',
    title: 'Ventouse',
    desc: 'Lorsque ce Pokémon est touché par une attaque physique, sa prochaine attaque contre l\'attaquant réussit toujours'
  },
  C: {
    value: 'Poison point',
    title: 'Point poison',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque physique, il empoisonne l\'attaquant'
  },
  D: {
    value: 'Stench',
    title: 'Puanteur',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque physique, il empoisonne le Pokémon touché'
  },
}

const groundAbilities: TypeAbilities = {
  A: {
    value: 'Pocket sand',
    title: 'Jet de sable',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque, il éblouit l\'attaquant pendant 3 tours'
  },
  B: {
    value: 'Stomper',
    title: 'Piétinement',
    desc: 'Lorsque ce Pokémon rate une attaque, il paralyse la cible de peur'
  },
  C: {
    value: 'Trap setter',
    title: 'Piège sable',
    desc: 'Une fois par combat, lorsque ce Pokémon rate une attaque, il prépare un piège. La prochaine fois qu\'il est touché par une attaque, l\'attaquant déclenche le piège et subit des dégâts égaux à ceux qu\'aurait dû infliger l\'attaque ratée'
  },
  D: {
    value: 'Sand stream',
    title: 'Sable volant',
    desc: 'Au début du combat et jusqu\'à la fin du combat ou jusqu\'à ce que ce Pokémon soit mis KO, une tempête de sable se lève'
  },
}

const rockAbilities: TypeAbilities = {
  A: {
    value: 'Rough terrain',
    title: 'Terrain difficile',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque, il ralentit l\'attaquant pendant 3 tours'
  },
  B: {
    value: 'On a roll',
    title: 'Pierre qui roule',
    desc: 'Lorsque ce Pokémon réussit une attaque, si l\'attaque utilisée est la même que celle du tour précédent, les dégâts augmentent de 50% (additif)'
  },
  C: {
    value: 'Hard headed',
    title: 'Tête de roc',
    desc: 'Une fois par combat, lorsque ce Pokémon utilise une attaque physique, il effraie le Pokémon ciblé pendant 5 tours'
  },
  D: {
    value: 'Bonebreaker',
    title: 'Briseur d\'os',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque, il paralyse le Pokémon touché'
  },
}

const bugAbilities: TypeAbilities = {
  A: {
    value: 'Swarm',
    title: 'Essaim',
    desc: 'Pour chaque allié proche, les dégâts des attaques de ce Pokémon sont triplés'
  },
  B: {
    value: 'Buzzer',
    title: 'Bourdonnement',
    desc: 'Lorsque ce Pokémon réussit une attaque, lancez 1d6. Sur un 5 ou un 6, ce Pokémon devient accéléré pendant 3 tours'
  },
  C: {
    value: 'Compound eyes',
    title: 'Œil Composé',
    desc: 'Lorsque ce Pokémon rate une attaque, il peut relancer les dés. S\'il touche la 2e fois, les dégâts sont réduits de moitié'
  },
  D: {
    value: 'Disable bite',
    title: 'Piqûre',
    desc: 'Lorsque ce Pokémon réussit une attaque, lancez 1d6. Sur un 5 ou un 6, la dernière attaque utilisée par le Pokémon touché est entravée'
  },
}

const ghostAbilities: TypeAbilities = {
  A: {
    value: 'Cold spot',
    title: 'Momie',
    desc: 'Lorsque ce Pokémon est touché par une attaque physique, il remplace le talent de l\'attaquant par Momie (inefficace contre certains talents)'
  },
  B: {
    value: 'Cursed body',
    title: 'Corps maudit',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque, il entrave cette attaque'
  },
  C: {
    value: 'Boo!',
    title: 'Bouh !',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque, il effraie le Pokémon touché'
  },
  D: {
    value: 'Incorporeal',
    title: 'Intangible',
    desc: 'Ce Pokémon inflige 2 et reçoit 2 fois moins de dégâts physiques'
  },
}

const steelAbilities: TypeAbilities = {
  A: {
    value: 'Weak armor',
    title: 'Armurouillée',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque physique, il devient accéléré pendant 3 tours'
  },
  B: {
    value: 'Adaptive armor',
    title: 'Armure adaptative',
    desc: 'Après avoir été touché par une attaque, ce Pokémon réduit de moitié les dégâts infligés par cette attaque jusqu\'à être touché par une autre attaque'
  },
  C: {
    value: 'Cacophony',
    title: 'Cacophonie',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque, il fait enrager le Pokémon touché'
  },
  D: {
    value: 'Barbed wire',
    title: 'Barbelé',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque physique, l\'attaquant subit en retour la moitié des dégâts infligés'
  },
}

const fireAbilities: TypeAbilities = {
  A: {
    value: 'Blaze',
    title: 'Brasier',
    desc: 'Tant que ce Pokémon a 1/4 de ses PV ou moins, les dégâts de ses attaques de type feu sont doublés'
  },
  B: {
    value: 'Flame body',
    title: 'Corps ardent',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque physique, il brûle l\'attaquant'
  },
  C: {
    value: 'Flash fire',
    title: 'Torche',
    desc: 'Lorsque ce Pokémon est touché par une attaque de type feu, il ignore les dégâts et se soigne de la moitié des dégâts qu\'il aurait dû subir'
  },
  D: {
    value: 'Drought',
    title: 'Sécheresse',
    desc: 'Au début du combat et jusqu\'à la fin du combat ou jusqu\'à ce que ce Pokémon soit mis KO, le soleil s\'intensifie'
  },
}

const waterAbilities: TypeAbilities = {
  A: {
    value: 'Torrent',
    title: 'Torrent',
    desc: 'Tant que ce Pokémon a 1/4 de ses PV ou moins, les dégâts de ses attaques de type eau sont doublés'
  },
  B: {
    value: 'Volumetric',
    title: 'Volumétrique',
    desc: 'Tant que ce Pokémon a 1/4 de ses PV ou moins, les Pokémon qui l\'attaquent ont un désavantage'
  },
  C: {
    value: 'Storm drain',
    title: 'Cuvette',
    desc: 'Les attaques eau des ennemis à moins de 50m sont redirigées vers ce Pokémon et n\'infligent aucun dégât'
  },
  D: {
    value: 'Splash zone',
    title: 'Crachin',
    desc: 'Au début du combat et jusqu\'à la fin du combat ou jusqu\'à ce que ce Pokémon soit mis KO, il commence à pleuvoir'
  },
}

const grassAbilities: TypeAbilities = {
  A: {
    value: 'Torrent',
    title: 'Torrent',
    desc: 'Tant que ce Pokémon a 1/4 de ses PV ou moins, les dégâts de ses attaques de type plante sont doublés'
  },
  B: {
    value: 'Absorbent',
    title: 'Absorbant',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque, il se soigne à hauteur de la moitié des dégâts infligés'
  },
  C: {
    value: 'Sap sipper',
    title: 'Herbivore',
    desc: 'Lorsque ce Pokémon est ciblé par une attaque de type plante, les dégâts de sa prochaine attaque sont doublés'
  },
  D: {
    value: 'Harvest',
    title: 'Récolte',
    desc: 'Lorsque ce Pokémon consomme une baie, lancez une pièce. Si c\'est face, récupérez la baie consommée'
  },
}

const electricAbilities: TypeAbilities = {
  A: {
    value: 'Polarize',
    title: 'Polarisation',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque, les dégâts de sa prochaine attaque de type électrik contre la même cible sont doublés'
  },
  B: {
    value: 'Paralyzing touch',
    title: 'Statik',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque, il paralyse l\'attaquant'
  },
  C: {
    value: 'Overdrive',
    title: 'Dynamo',
    desc: 'Lorsque ce Pokémon est ciblé par une attaque de type électrik, il avance d\'un rang dans l\'ordre d\'initiative. S\'il est déjà en haut, il devient accéléré à la place pendant 3 tours'
  },
  D: {
    value: 'Lightning strike',
    title: 'Frappe éclair',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque, il peut contre-attaquer'
  },
}

const psychicAbilities: TypeAbilities = {
  A: {
    value: 'Disorient',
    title: 'Désorientation',
    desc: 'Lorsque ce Pokémon réussit une attaque, le Pokémon touché a un désavantage lors de sa prochaine attaque contre ce Pokémon'
  },
  B: {
    value: 'Mirror',
    title: 'Miroir magik',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque spéciale, l\'attaquant subit en retour la moitié des dégâts infligés'
  },
  C: {
    value: 'Trace',
    title: 'Calque',
    desc: 'Au début du combat, le talent de ce Pokémon devient celui d\'un autre Pokémon en combat, à l\'exception des talents uniques'
  },
  D: {
    value: 'Forewarn',
    title: 'Anticipation',
    desc: 'Lorsque ce Pokémon est touché par une attaque super efficace, les dégâts de la prochaine attaque infligée à ce Pokémon par l\'attaquant sont réduits de moitié'
  },
}

const iceAbilities: TypeAbilities = {
  A: {
    value: 'Slippery',
    title: 'Glissant',
    desc: 'Une fois par combat, lorsque ce Pokémon devrait être touché par une attaque, il peut faire rater l\'attaque'
  },
  B: {
    value: 'Freezer',
    title: 'Toucher gelé',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque, il gèle le Pokémon touché'
  },
  C: {
    value: 'Snow warning',
    title: 'Alerte neige',
    desc: 'Au début du combat et jusqu\'à la fin du combat ou jusqu\'à ce que ce Pokémon soit mis KO, il commence à grêler'
  },
  D: {
    value: 'Frostbite',
    title: 'Corps gel',
    desc: 'Une fois par combat, lorsque ce Pokémon est touché par une attaque, il gèle l\'attaquant'
  },
}

const dragonAbilities: TypeAbilities = {
  A: {
    value: 'Resilience',
    title: 'Résilience',
    desc: 'Tant que ce Pokémon est affecté par une anomalie de statut, il a l\'avantage sur ses attaques'
  },
  B: {
    value: 'Outrage',
    title: 'Colère',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque, il peut quadrupler les dégâts. S\'il le fait, il devient ralenti et l\'attaque est entravée'
  },
  C: {
    value: 'Unnerving',
    title: 'Tension',
    desc: 'Les ennemis de ce Pokémon doivent réussir un jet de concentration pour utiliser des objets'
  },
  D: {
    value: 'Regal bearing',
    title: 'Attitude royale',
    desc: 'Ce Pokémon ne peut pas être paralysé par la peur, tomber amoureux, s\'enrager ou être effrayé'
  },
}

const darkAbilities: TypeAbilities = {
  A: {
    value: 'Pressure',
    title: 'Pression',
    desc: 'Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite'
  },
  B: {
    value: 'Feint',
    title: 'Feinte',
    desc: 'Lorsque ce Pokémon rate une attaque, sa prochaine attaque inflige des dégâts doublés'
  },
  C: {
    value: 'Unsettling presence',
    title: 'Présence inquiétante',
    desc: 'Lorsque ce Pokémon réussit une attaque physique, lancez une pièce. Si c\'est face, le Pokémon touché est parlaysé par la peur'
  },
  D: {
    value: 'Filcher',
    title: 'Pickpocket',
    desc: 'Lorsque ce Pokémon réussit une attaque physique, il vole l\'objet tenu par le Pokémon touché'
  },
}

const fairyAbilities: TypeAbilities = {
  A: {
    value: 'Charming',
    title: 'Joli sourire',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque physique, le Pokémon touché tombe amoureux de ce Pokémon'
  },
  B: {
    value: 'Tasty',
    title: 'Goûteux',
    desc: 'Lorsque ce Pokémon est touché par une attaque physique, l\'attaquant ne peut plus l\'attaquer avant d\'avoir attaqué un autre Pokémon, à moins d\'être seul'
  },
  C: {
    value: 'Veiled',
    title: 'Médic nature',
    desc: 'Ce Pokémon guérit automatiquement de la brûlure, de la paralysie, du poison, de l\'amour, de la rage, de la peur et de la lenteur après 2 tours'
  },
  D: {
    value: 'Fey time',
    title: 'Tour des faes',
    desc: 'Une fois par combat, lorsque ce Pokémon réussit une attaque spéciale, il ralentit le Pokémon touché pendant 3 tours'
  },
}

const noAbilities: TypeAbilities = {
  A: {  value: '', title: '', desc: '' },
  B: {  value: '', title: '', desc: '' },
  C: {  value: '', title: '', desc: '' },
  D: {  value: '', title: '', desc: '' },
}

export const abilityRecord: Record<Type, TypeAbilities> = {
  normal: normalAbilities,
  fighting: fightingAbilities,
  flying: flyingAbilities,
  poison: poisonAbilities,
  ground: groundAbilities,
  rock: rockAbilities,
  bug: bugAbilities,
  ghost: ghostAbilities,
  steel: steelAbilities,
  fire: fireAbilities,
  water: waterAbilities,
  grass: grassAbilities,
  electric: electricAbilities,
  psychic: psychicAbilities,
  ice: iceAbilities,
  dragon: dragonAbilities,
  dark: darkAbilities,
  fairy: fairyAbilities,
  stellar: noAbilities,
  unknown: noAbilities
}

export function getAbility(character: Character): Ability {
  const key = (['A', 'B', 'C', 'D'] as ('A' | 'B' | 'C' | 'D')[]).find(e => abilities[e].some(n => n.toLowerCase().includes(character.pokemon.name)));
  return key ? abilityRecord[character.pokemon.types[0]][key] : { value: 'Special', title: 'Special', desc: 'WIP' }
}

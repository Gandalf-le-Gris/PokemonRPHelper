import abilities from '@/assets/abilities.json';
import { Character } from "./pokemon";
import { Type } from "./types";
import { splitMatchPokemonName } from '@/utils/stringUtils';

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
    desc: 'Ce Pokémon inflige et reçoit 2 fois moins de dégâts physiques'
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
    value: 'Engrais',
    title: 'Engrais',
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
    title: 'Voile miroir',
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

const protosynthesis: Ability = {
  value: "Protosynthesis",
  title: "Paléosynthèse",
  desc: "Sous le soleil, la statistique la plus élevée de ce Pokémon augmente de 50%"
}

const quarkDrive: Ability = {
  value: "Quark Drive",
  title: "Charge quantique",
  desc: "Sous la pluie ou l'orage, la statistique la plus élevée de ce Pokémon augmente de 50%"
}

const specialAbilities: Record<string, Ability> = {
  ditto: {
    value: "Transform",
    title: "Imposteur",
    desc: "Au début du combat, ce Pokémon copie les caractéristiques et l'apparence d'un autre Pokémon qu'il peut voir"
  },
  articuno: {
    value: "Legendary blizzard",
    title: "Blizzard légendaire",
    desc: "Ce Pokémon peut déclencher à volonté un blizzard dans un rayon de 1km autour de lui"
  },
  'articuno (galar)': {
    value: "Psychic freeze",
    title: "Gel psychique",
    desc: "Lorsque ce Pokémon réussit une attaque, le Pokémon touché est paralysé par la peur"
  },
  zapdos: {
    value: "Legendary thunderstorm",
    title: "Orage légendaire",
    desc: "Ce Pokémon peut déclencher à volonté un orage dans un rayon de 1km autour de lui"
  },
  'zapdos (galar)': {
    value: "Overdrive kick",
    title: "Coup de pied surchargé",
    desc: "Lorsque ce Pokémon réussit une attaque, le Pokémon touché est paralysé par la peur"
  },
  moltres: {
    value: "Legendary heatwave",
    title: "Canicule légendaire",
    desc: "Ce Pokémon peut déclencher à volonté une canicule dans un rayon de 1km autour de lui"
  },
  'moltres (galar)': {
    value: "Draining flame",
    title: "Flamme épuisante",
    desc: "Lorsque ce Pokémon réussit une attaque, le Pokémon touché est paralysé par la peur"
  },
  mewtwo: {
    value: "Puppets on strings",
    title: "Marionnettiste",
    desc: "Ce Pokémon peut prendre 20min pour créer une copie parfaite d'un Pokémon qu'il a vu. Cette copie est sous le contrôle de ce Pokémon et n'est différenciable que par des marques discrètes sur son corps"
  },
  mew: {
    value: "Versatility",
    title: "Versatilité",
    desc: "Ce Pokémon peut utiliser des attaques de n'importe quel type"
  },
  wobbuffet: {
    value: "Punching bag",
    title: "Sac de frappe",
    desc: "Lorsque ce Pokémon est touché par une attaque physique, l'attaquant subit en retour des dégâts physiques de type normal équivalents à la moitié des dégâts infligés"
  },
  lugia: {
    value: "Guardian of the sea",
    title: "Gardien des mers",
    desc: "Ce Pokémon peut manipuler les mouvements de l'océan. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  'ho-oh': {
    value: "Guardian of the skies",
    title: "Gardien des cieux",
    desc: "Ce Pokémon peut contrôler le vent et les nuages. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  celebi: {
    value: "Passage of time",
    title: "Passeur temporel",
    desc: "Ce Pokémon peut voyager dans le temps, en créant des portails entre deux époques. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  gardevoir: {
    value: "Black hole",
    title: "Trou noir",
    desc: "Lorsque ce Pokémon est mis KO, ce Pokémon déclenche une attaque spéciale sans type infligeant des dégâts équivalents à 3 fois son attaque spéciale à un ennemi"
  },
  munja: {
    value: "Wonder guard",
    title: "Garde mystik",
    desc: "Seules les attaques super efficaces infligent des dégâts à ce Pokémon, mais il est mis KO par toute attaque super efficace"
  },
  lunatone: {
    value: "Moonstone",
    title: "Pierre lune",
    desc: "Les attaques de ce Pokémon infligent 2 fois plus de dégâts la nuit et 2 fois moins le jour"
  },
  solrock: {
    value: "Sunstone",
    title: "Pierre soleil",
    desc: "Les attaques de ce Pokémon infligent 2 fois plus de dégâts le jour et 2 fois moins la nuit"
  },
  castform: {
    value: "Weather change",
    title: "Météo",
    desc: "Le type de ce Pokémon dépend de la météo actuelle"
  },
  'castform-sunny': {
    value: "Weather change",
    title: "Météo",
    desc: "Le type de ce Pokémon dépend de la météo actuelle"
  },
  'castform-rainy': {
    value: "Weather change",
    title: "Météo",
    desc: "Le type de ce Pokémon dépend de la météo actuelle"
  },
  'castform-snowy': {
    value: "Weather change",
    title: "Météo",
    desc: "Le type de ce Pokémon dépend de la météo actuelle"
  },
  kecleon: {
    value: "Color change",
    title: "Homochromie",
    desc: "Après avoir été touché par une attaque, le type de ce Pokémon devient celui de cette attaque"
  },
  kyogre: {
    value: "Tsunami",
    title: "Mer primordiale",
    desc: "Ce Pokémon peut déclencher des tsunamis. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  groudon: {
    value: "Earthquake",
    title: "Terre finale",
    desc: "Ce Pokémon peut déclencher des séismes. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  rayquaza: {
    value: "Balance",
    title: "Air lock",
    desc: "Ce Pokémon peut supprimer les pouvoirs de Groudon et Kyogre. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  jirachi: {
    value: "Wish",
    title: "Vœu",
    desc: "Ce Pokémon peut exaucer les souhaits des autres. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  'deoxys-normal': {
    value: "Form change",
    title: "Forme extraterrestre",
    desc: "Ce Pokémon peut changer de forme à volonté, ce qui modifie ses statistiques"
  },
  'deoxys-speed': {
    value: "Form change",
    title: "Forme extraterrestre",
    desc: "Ce Pokémon peut changer de forme à volonté, ce qui modifie ses statistiques"
  },
  'deoxys-attack': {
    value: "Form change",
    title: "Forme extraterrestre",
    desc: "Ce Pokémon peut changer de forme à volonté, ce qui modifie ses statistiques"
  },
  'deoxys-defense': {
    value: "Form change",
    title: "Forme extraterrestre",
    desc: "Ce Pokémon peut changer de forme à volonté, ce qui modifie ses statistiques"
  },
  burmy: {
    value: "Camouflage",
    title: "Camouflage",
    desc: "Le type de ce Pokémon dépend de son environnement"
  },
  'wormadam-plant': {
    value: "Camouflage",
    title: "Camouflage",
    desc: "Le type de ce Pokémon dépend de son environnement"
  },
  'wormadam-sandy': {
    value: "Camouflage",
    title: "Camouflage",
    desc: "Le type de ce Pokémon dépend de son environnement"
  },
  'wormadam-trash': {
    value: "Camouflage",
    title: "Camouflage",
    desc: "Le type de ce Pokémon dépend de son environnement"
  },
  rotom: {
    value: "Poltergeist",
    title: "Esprit frappeur",
    desc: "Ce Pokémon peut changer de type en imaginant un appareil électrique et en réussissant un jet de concentration. Son type secondaire dépend de l'appareil électrique choisi"
  },
  'rotom-heat': {
    value: "Poltergeist",
    title: "Esprit frappeur",
    desc: "Ce Pokémon peut changer de type en imaginant un appareil électrique et en réussissant un jet de concentration. Son type secondaire dépend de l'appareil électrique choisi"
  },
  'rotom-frost': {
    value: "Poltergeist",
    title: "Esprit frappeur",
    desc: "Ce Pokémon peut changer de type en imaginant un appareil électrique et en réussissant un jet de concentration. Son type secondaire dépend de l'appareil électrique choisi"
  },
  'rotom-wash': {
    value: "Poltergeist",
    title: "Esprit frappeur",
    desc: "Ce Pokémon peut changer de type en imaginant un appareil électrique et en réussissant un jet de concentration. Son type secondaire dépend de l'appareil électrique choisi"
  },
  'rotom-mow': {
    value: "Poltergeist",
    title: "Esprit frappeur",
    desc: "Ce Pokémon peut changer de type en imaginant un appareil électrique et en réussissant un jet de concentration. Son type secondaire dépend de l'appareil électrique choisi"
  },
  'rotom-fan': {
    value: "Poltergeist",
    title: "Esprit frappeur",
    desc: "Ce Pokémon peut changer de type en imaginant un appareil électrique et en réussissant un jet de concentration. Son type secondaire dépend de l'appareil électrique choisi"
  },
  uxie: {
    value: "Knowledge",
    title: "Savoir",
    desc: "Ce Pokémon peut donner ou prendre la connaissance des autres, se téléporter, et créer des illusions détectables avec une grande réussite lors d'un jet d'exploration. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  mesprit: {
    value: "Emotion",
    title: "Emotion",
    desc: "Ce Pokémon peut créer ou supprimer des émotions chez les autres, quitter et regagner son corps à volonté, et communiquer par télépathie sans limite. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  azelf: {
    value: "Willpower",
    title: "Volonté",
    desc: "Ce Pokémon peut décupler ou étouffer la volonté des autres, contrôler un Pokémon qui échoue à un jet de concentration, et manipuler par télékinésie des objets faisant jusqu'à 10 fois son poids. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  dialga: {
    value: "Time mender",
    title: "Maître du temps",
    desc: "Ce Pokémon peut stopper le cours du temps, et créer et manipuler des lignes temporelles alternatives. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  'dialga-origin': {
    value: "Time mender",
    title: "Maître du temps",
    desc: "Ce Pokémon peut stopper le cours du temps, et créer et manipuler des lignes temporelles alternatives. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  palkia: {
    value: "Space mender",
    title: "Maître de l'espace",
    desc: "Ce Pokémon peut manipuler l'espace pour téléporter des objets et des Pokémon ou créer des portails entre deux endroits. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  'palkia-origin': {
    value: "Space mender",
    title: "Maître de l'espace",
    desc: "Ce Pokémon peut manipuler l'espace pour téléporter des objets et des Pokémon ou créer des portails entre deux endroits. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  'giratina-altered': {
    value: "The distorted one",
    title: "Le banni",
    desc: "Ce Pokémon peut s'approprier les pouvoirs de Dialga et Palkia et distordre l'espace-temps autour de lui. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  'giratina-origin': {
    value: "The distorted one",
    title: "Le banni",
    desc: "Ce Pokémon peut s'approprier les pouvoirs de Dialga et Palkia et distordre l'espace-temps autour de lui. Un Pokémon qui attaque ce Pokémon ne peut pas utiliser la même attaque deux tours de suite"
  },
  cresselia: {
    value: "Pleasant dream",
    title: "Joli rêve",
    desc: "Ce Pokémon peut apparaître en rêve aux autres et manipuler leurs rêves. Sur un jet de concentration réussi, il peut endormir un Pokémon et le soigner de 5 PV au début du tour de ce Pokémon tant qu'il reste endormi"
  },
  manaphy: {
    value: "Heart swap",
    title: "Echange d'âme",
    desc: "Ce Pokémon peut échanger les esprits de deux Pokémon, intervertissant leurs statistiques, spécificités, types et talents"
  },
  darkrai: {
    value: "Pleasant dream",
    title: "Joli rêve",
    desc: "Ce Pokémon peut apparaître en rêve aux autres et manipuler leurs rêves. Sur un jet de concentration réussi, il peut endormir un Pokémon et lui infliger 5 dégâts au début du tour de ce Pokémon tant qu'il reste endormi"
  },
  'shaymin-land': {
    value: "Land and sky",
    title: "Ciel et terre",
    desc: "Ce Pokémon peut changer de forme à volonté, changeant ainsi de type"
  },
  'shaymin-sky': {
    value: "Land and sky",
    title: "Ciel et terre",
    desc: "Ce Pokémon peut changer de forme à volonté, changeant ainsi de type"
  },
  arceus: {
    value: "creator",
    title: "Créateur",
    desc: "Ce Pokémon peut copier n'importe quel talent et adopter n'importe quelle combinaison de types à volonté. Ses statistiques sont doublées en début de combat"
  },
  victini: {
    value: "V stands for victory",
    title: "V comme victoire",
    desc: "Ce Pokémon peut lancer les dés 3 fois lorsqu'il attaque et choisir le résultat qu'il veut garder, et gagne toujours aux jeux de chance"
  },
  'darmanitan-standard': {
    value: "Zen mode",
    title: "Mode transe",
    desc: "Lorsque ce Pokémon chute en-deça de la moitié de ses PV ou repasse au-dessus, il change de forme et de type"
  },
  'darmanitan-standard-galar': {
    value: "Zen mode",
    title: "Mode transe",
    desc: "Lorsque ce Pokémon chute en-deça de la moitié de ses PV ou repasse au-dessus, il change de forme et de type"
  },
  zorua: {
    value: "Illusion",
    title: "Illusion",
    desc: "Ce Pokémon peut utiliser une illusion pour prendre l'apparence de n'importe quel Pokémon qu'il a déjà vu. L'illusion disparaît lorsque ce Pokémon subit des dégâts"
  },
  zoroark: {
    value: "Illusion",
    title: "Illusion",
    desc: "Ce Pokémon peut utiliser une illusion pour prendre l'apparence de n'importe quel Pokémon qu'il a déjà vu. L'illusion disparaît lorsque ce Pokémon subit des dégâts"
  },
  'zorua-hisui': {
    value: "Illusion",
    title: "Illusion",
    desc: "Ce Pokémon peut utiliser une illusion pour prendre l'apparence de n'importe quel Pokémon qu'il a déjà vu. L'illusion disparaît lorsque ce Pokémon subit des dégâts"
  },
  'zoroark-hisui': {
    value: "Illusion",
    title: "Illusion",
    desc: "Ce Pokémon peut utiliser une illusion pour prendre l'apparence de n'importe quel Pokémon qu'il a déjà vu. L'illusion disparaît lorsque ce Pokémon subit des dégâts"
  },
  cobalion: {
    value: "Swords together",
    title: "Epée de la justice",
    desc: "Lorsqu'ils combattent avec ce Pokémon, Terrakium, Viridium et Keldeo voient leur attaque doublée"
  },
  terrakion: {
    value: "Swords together",
    title: "Epée de la justice",
    desc: "Lorsqu'ils combattent avec ce Pokémon, Cobaltium, Viridium et Keldeo voient leur attaque doublée"
  },
  virizion: {
    value: "Swords together",
    title: "Epée de la justice",
    desc: "Lorsqu'ils combattent avec ce Pokémon, Cobaltium, Terrakium et Keldeo voient leur attaque doublée"
  },
  'tornadus-incarnate': {
    value: "Force of wind",
    title: "Force du vent",
    desc: "Ce Pokémon se déplace si vite qu'il peut lever des bourrasques. Sa vitesse est triplée"
  },
  'tornadus-therian': {
    value: "Force of wind",
    title: "Force du vent",
    desc: "Ce Pokémon se déplace si vite qu'il peut lever des bourrasques. Sa vitesse est triplée"
  },
  'thundurus-incarnate': {
    value: "Force of thunder",
    title: "Force de la foudre",
    desc: "Ce Pokémon peut déclencher des orages. Ses attaques de type électrik infligent 2 fois plus de dégâts"
  },
  'thundurus-therian': {
    value: "Force of thunder",
    title: "Force de la foudre",
    desc: "Ce Pokémon peut déclencher des orages. Ses attaques de type électrik infligent 2 fois plus de dégâts"
  },
  'landorus-incarnate': {
    value: "Force of nature",
    title: "Force de la nature",
    desc: "Ce Pokémon peut faire pousser des plantes et rendre les sols fertiles. Il récupère 5 PV au début de son tour"
  },
  'landorus-therian': {
    value: "Force of nature",
    title: "Force de la nature",
    desc: "Ce Pokémon peut faire pousser des plantes et rendre les sols fertiles. Il récupère 5 PV au début de son tour"
  },
  reshiram: {
    value: "Truth seeker",
    title: "Chercheur de vérité",
    desc: "Ce Pokémon sait quand on ment, et inflige 2 fois plus de dégâts aux Pokémon qui ont menti en sa présence. Ses attaques ignorent le talent des Pokémon touchés"
  },
  zekrom: {
    value: "Ideal chaser",
    title: "Chercheur d'idéal",
    desc: "Ce Pokémon sait quand on compromet ses idéaux, et inflige 2 fois plus de dégâts aux Pokémon qui l'ont fait en sa présence. Ses attaques ignorent le talent des Pokémon touchés"
  },
  kyurem: {
    value: "Shatter",
    title: "Brise-glace",
    desc: "Lorsque ce Pokémon réussit une attaque de type glace, le Pokémon touché subit 2 fois plus de dégâts des attaques physiques pendant 5h"
  },
  'kyurem-white': {
    value: "Shatter",
    title: "Brise-glace",
    desc: "Lorsque ce Pokémon réussit une attaque de type glace, le Pokémon touché subit 2 fois plus de dégâts des attaques physiques pendant 5h"
  },
  'kyurem-black': {
    value: "Shatter",
    title: "Brise-glace",
    desc: "Lorsque ce Pokémon réussit une attaque de type glace, le Pokémon touché subit 2 fois plus de dégâts des attaques physiques pendant 5h"
  },
  'keldeo-ordinary': {
    value: "Sword of determination",
    title: "Epée de la détermination",
    desc: "Ce Pokémon a l'avantage sur tous ses jets"
  },
  'meloetta-aria': {
    value: "Genre form",
    title: "Artiste",
    desc: "Ce Pokémon peut changer de forme et de type en chantant"
  },
  'meloetta-pirouette': {
    value: "Genre form",
    title: "Artiste",
    desc: "Ce Pokémon peut changer de forme et de type en chantant"
  },
  genesect: {
    value: "Drive form",
    title: "Techno buster",
    desc: "Ce Pokémon peut utiliser une cinquième attaque dont le type dépend du module tenu"
  },
  'aegislash-shield': {
    value: "Stance change",
    title: "Déclic tactique",
    desc: "Ce Pokémon peut changer de forme pendant son tour, ce qui modifie ses statistiques"
  },
  'aegislash-blade': {
    value: "Stance change",
    title: "Déclic tactique",
    desc: "Ce Pokémon peut changer de forme pendant son tour, ce qui modifie ses statistiques"
  },
  xerneas: {
    value: "Lifebringer",
    title: "Porteur de vie",
    desc: "Ce Pokémon peut ramener les autres à la vie et les soigner de 20 PV par tour. Les attaques de type fée des autres Pokémon infligent 50% de dégâts supplémentaires"
  },
  yveltal: {
    value: "Deathbringer",
    title: "Porteur de mort",
    desc: "Ce Pokémon peut drainer la vie des autres, et se soigner de la moitié des dégâts qu'il inflige. Les attaques de type ténèbres des autres Pokémon infligent 50% de dégâts supplémentaires"
  },
  'zygarde-10': {
    value: "Orderbringer",
    title: "Porteur de paix",
    desc: "Ce Pokémon nullifie les talents de Xerneas et Yvletal, et leur inflige 2 fois plus de dégâts"
  },
  'zygarde-50': {
    value: "Orderbringer",
    title: "Porteur de paix",
    desc: "Ce Pokémon nullifie les talents de Xerneas et Yvletal, et leur inflige 2 fois plus de dégâts"
  },
  'zygarde-complete': {
    value: "Orderbringer",
    title: "Porteur de paix",
    desc: "Ce Pokémon nullifie les talents de Xerneas et Yvletal, et leur inflige 2 fois plus de dégâts"
  },
  hoopa: {
    value: "Uncork",
    title: "Déchaînement",
    desc: "Ce Pokémon peut se téléporter à volonté. Lorsque sa bouteille est ouverte, il change de forme et de statistiques"
  },
  'oricorio-baile': {
    value: "Nectar sipper",
    title: "Butineur de nectar",
    desc: "La forme et le type de ce Pokémon dépendent de la flore locale et changent selon le continent"
  },
  'oricorio-pom-pom': {
    value: "Nectar sipper",
    title: "Butineur de nectar",
    desc: "La forme et le type de ce Pokémon dépendent de la flore locale et changent selon le continent"
  },
  'oricorio-pau': {
    value: "Nectar sipper",
    title: "Butineur de nectar",
    desc: "La forme et le type de ce Pokémon dépendent de la flore locale et changent selon le continent"
  },
  'oricorio-sensu': {
    value: "Nectar sipper",
    title: "Butineur de nectar",
    desc: "La forme et le type de ce Pokémon dépendent de la flore locale et changent selon le continent"
  },
  'wishiwashi-solo': {
    value: "Schooling",
    title: "Banc",
    desc: "Tant que ce Pokémon a plus de 1/4 de ses PV, ses statistiques autres que ses PV sont doublées"
  },
  'wishiwashi-school': {
    value: "Schooling",
    title: "Banc",
    desc: "Tant que ce Pokémon a plus de 1/4 de ses PV, ses statistiques autres que ses PV sont doublées"
  },
  pyukumuku: {
    value: "Guts out",
    title: "Expuls'Organes",
    desc: "Lorsque ce Pokémon est mis KO, il inflige à l'attaquant le double des dégâts subis"
  },
  mimikyu: {
    value: "Disguise",
    title: "Déguisement",
    desc: "La première attaque chaque combat n'inflige aucun dégât à ce Pokémon"
  },
  solgaleo: {
    value: "Sun devourer",
    title: "Métallo-Garde",
    desc: "Tant que ce Pokémon a tous ses PV, les attaquants ont le désavantage"
  },
  'necrozma (dusk)': {
    value: "Sun devourer",
    title: "Métallo-Garde",
    desc: "Tant que ce Pokémon a tous ses PV, les attaquants ont le désavantage"
  },
  lunala: {
    value: "Sun devourer",
    title: "Spectro-Bouclier",
    desc: "Tant que ce Pokémon a tous ses PV, les attaques lui infligent 2 fois moins de dégâts"
  },
  'necrozma (dawn)': {
    value: "Sun devourer",
    title: "Spectro-Bouclier",
    desc: "Tant que ce Pokémon a tous ses PV, les attaques lui infligent 2 fois moins de dégâts"
  },
  falinks: {
    value: "Break up",
    title: "Rassemblement",
    desc: "Plusieurs individus de cette espèce peuvent se rassembler en un seul Pokémon. Les statistiques du Pokémon ainsi formé sont les plus hautes de chacun de ses membres, et il peut utiliser toutes les compétences de ses membres"
  },
  'eiscue-ice': {
    value: "Ice face",
    title: "Tête de gel",
    desc: "La première attaque physique chaque combat n'inflige aucun dégât à ce Pokémon"
  },
  zacian: {
    value: "Intrepid sword",
    title: "Lame Indomptable",
    desc: "Tant que ce Pokémon porte son épée, son attaque est doublée"
  },
  'zacian-crowned': {
    value: "Intrepid sword",
    title: "Lame Indomptable",
    desc: "Tant que ce Pokémon porte son épée, son attaque est doublée"
  },
  zamazenta: {
    value: "Dauntless shield",
    title: "Égide Inflexible",
    desc: "Tant que ce Pokémon porte son bouclier, sa défense est doublée"
  },
  'zamazenta-crowned': {
    value: "Dauntless shield",
    title: "Égide Inflexible",
    desc: "Tant que ce Pokémon porte son bouclier, sa défense est doublée"
  },
  eternatus: {
    value: "Max storm",
    title: "Orage dynamax",
    desc: "Ce Pokémon peut déclencher à volonté un orage dynamax dans un rayon de 1km autour de lui"
  },
  'eternatus-eternamax': {
    value: "Max storm",
    title: "Orage dynamax",
    desc: "Ce Pokémon peut déclencher à volonté un orage dynamax dans un rayon de 1km autour de lui"
  },
  kubfu: {
    value: "Lightning fists",
    title: "Poing invisible",
    desc: "Ce Pokémon assène un coup critique sur 11 et 12, et peut alors réattaquer"
  },
  'urshifu-single-strike': {
    value: "Lightning fists",
    title: "Poing invisible",
    desc: "Ce Pokémon assène un coup critique sur 11 et 12, et peut alors réattaquer"
  },
  'urshifu-rapid-strike': {
    value: "Lightning fists",
    title: "Poing invisible",
    desc: "Ce Pokémon assène un coup critique sur 11 et 12, et peut alors réattaquer"
  },
  regieleki: {
    value: "Transistor",
    title: "Transistor",
    desc: "Les attaques de type électrik de ce Pokémon infligent 50% de dégâts supplémentaires"
  },
  regidrago: {
    value: "Dragon's maw",
    title: "Dent de Dragon",
    desc: "Les attaques de type dragon de ce Pokémon infligent 50% de dégâts supplémentaires"
  },
  glastrier: {
    value: "Chilling neigh",
    title: "Blanche Ruade",
    desc: "Lorsque ce Pokémon met KO un ennemi, son attaque augmente de 50% pendant 1h (additif)"
  },
  'calyrex-ice': {
    value: "Chilling neigh",
    title: "Blanche Ruade",
    desc: "Lorsque ce Pokémon met KO un ennemi, son attaque augmente de 50% pendant 1h (additif)"
  },
  spectrier: {
    value: "Grim neigh",
    title: "Sombre Ruade",
    desc: "Lorsque ce Pokémon met KO un ennemi, son attaque spéciale augmente de 50% pendant 1h (additif)"
  },
  'calyrex-shadow': {
    value: "Grim neigh",
    title: "Sombre Ruade",
    desc: "Lorsque ce Pokémon met KO un ennemi, son attaque spéciale augmente de 50% pendant 1h (additif)"
  },
  'ursaluna (bloodmoon)': {
    value: "Mind's eye",
    title: "Œil Révélateur",
    desc: "Les attaques de ce Pokémon ne peuvent pas rater, et ses attaques de type normal peuvent toucher les Pokémon de type spectre"
  },
  'enamorus-incarnate': {
    value: "Force of emotion",
    title: "Force de l'émotion",
    desc: "Tous les ennemis de ce Pokémon tombent amoureux de lui au début du combat"
  },
  'enamorus-therian': {
    value: "Force of emotion",
    title: "Force de l'émotion",
    desc: "Tous les ennemis de ce Pokémon tombent amoureux de lui au début du combat"
  },
  'palafin-zero': {
    value: "Zero to hero",
    title: "Supermutation",
    desc: "Les attaques de ce Pokémon sont toutes peu efficaces. S'il passe un tour en dehors du combat, lorsqu'il revient, à la place toutes ses attaques super efficaces infligent des dégâts doublés jusqu'à la fin du combat"
  },
  'palafin-hero': {
    value: "Hero to zero",
    title: "Supermutation",
    desc: "Les attaques de ce Pokémon sont toutes peu efficaces. S'il passe un tour en dehors du combat, lorsqu'il revient, à la place toutes ses attaques super efficaces infligent des dégâts doublés jusqu'à la fin du combat"
  },
  'tatsugiri-curly': {
    value: "Commander",
    title: "Commandant",
    desc: "Si ce Pokémon combat avec un Oyacata, il peut se cacher dans sa bouche. Il ne peut plus agir, mais toutes les statistiques du Oyacata à l'exception de ses PV sont doublées"
  },
  'great-tusk': protosynthesis,
  'scream-tail': protosynthesis,
  'brute-bonnet': protosynthesis,
  'flutter-mane': protosynthesis,
  'slither-wing': protosynthesis,
  'sandy-shock': protosynthesis,
  'roaring-moon': protosynthesis,
  'walking-wake': protosynthesis,
  'gauging-fire': protosynthesis,
  'raging-bolt': protosynthesis,
  'iron-threads': quarkDrive,
  'iron-bundle': quarkDrive,
  'iron-hands': quarkDrive,
  'iron-jugulis': quarkDrive,
  'iron-moth': quarkDrive,
  'iron-thorns': quarkDrive,
  'iron-valiant': quarkDrive,
  'iron-leaves': quarkDrive,
  'iron-boulder': quarkDrive,
  'iron-crown': quarkDrive,
  gholdengo: {
    value: "Good as gold",
    title: "Corps en or",
    desc: "Ce Pokémon est immunisé aux capacités de statut"
  },
  'wo-chien': {
    value: "Tablets of ruin",
    title: "Bois du Fléau",
    desc: "Tous les autres Pokémon voient leur attaque réduite de 25%"
  },
  'chien-pao': {
    value: "Sword of ruin",
    title: "Epée du Fléau",
    desc: "Tous les autres Pokémon voient leur défense réduite de 25%"
  },
  'ting-lu': {
    value: "Vessel of ruin",
    title: "Urne du Fléau",
    desc: "Tous les autres Pokémon voient leur attaque spéciale réduite de 25%"
  },
  'chi-yu': {
    value: "Beads of ruin",
    title: "Perles du Fléau",
    desc: "Tous les autres Pokémon voient leur défense spéciale réduite de 25%"
  },
  koraidon: {
    value: "Orichalcum pulse",
    title: "Pouls orichalque",
    desc: "Au début du combat, les rayons du soleil s'intensifient. Sous le soleil, l'attaque de ce Pokémon augmente de 50%"
  },
  miraidon: {
    value: "Hadron engine",
    title: "Moteur à hadrons",
    desc: "Au début du combat, il commence à pleuvoir. Sous la pluie, l'attaque spéciale de ce Pokémon augmente de 50%"
  },
  okidogi: {
    value: "Toxic chain",
    title: "Chaîne toxique",
    desc: "Lorsque ce Pokémon réussit une attaque, le Pokémon touché est empoisonné"
  },
  munkidori: {
    value: "Toxic chain",
    title: "Chaîne toxique",
    desc: "Lorsque ce Pokémon réussit une attaque, le Pokémon touché est empoisonné"
  },
  fezandipiti: {
    value: "Toxic chain",
    title: "Chaîne toxique",
    desc: "Lorsque ce Pokémon réussit une attaque, le Pokémon touché est empoisonné"
  },
  ogerpon: {
    value: "Masking",
    title: "Masque",
    desc: "Le type de ce Pokémon et l'effet secondaire de ce talent dépendent du masque tenu"
  },
  'ogerpon-wellspring-mask': {
    value: "Masking",
    title: "Masque",
    desc: "Le type de ce Pokémon et l'effet secondaire de ce talent dépendent du masque tenu"
  },
  'ogerpon-hearthflame-mask': {
    value: "Masking",
    title: "Masque",
    desc: "Le type de ce Pokémon et l'effet secondaire de ce talent dépendent du masque tenu"
  },
  'ogerpon-cornerstone-mask': {
    value: "Masking",
    title: "Masque",
    desc: "Le type de ce Pokémon et l'effet secondaire de ce talent dépendent du masque tenu"
  },
  terapagos: {
    value: "Tera shell",
    title: "Téra-carapace",
    desc: "Au début du combat, ce Pokémon passe en forme Téracristal. Sous cette forme, il peut nullifier la météo et toute tentative de téracristallisation des autres Pokémon. Tant que ce Pokémon a tous ses PV, les attaques qui le ciblent sont peu efficaces"
  },
  'terapagos-terastal': {
    value: "Tera shell",
    title: "Téra-carapace",
    desc: "Au début du combat, ce Pokémon passe en forme Téracristal. Sous cette forme, il peut nullifier la météo et toute tentative de téracristallisation des autres Pokémon. Tant que ce Pokémon a tous ses PV, les attaques qui le ciblent sont peu efficaces"
  },
  'terapagos-stellar': {
    value: "Tera shell",
    title: "Téra-carapace",
    desc: "Au début du combat, ce Pokémon passe en forme Téracristal. Sous cette forme, il peut nullifier la météo et toute tentative de téracristallisation des autres Pokémon. Tant que ce Pokémon a tous ses PV, les attaques qui le ciblent sont peu efficaces"
  },
  pecharunt: {
    value: "Poison puppeteer",
    title: "Emprise toxique",
    desc: "Ce Pokémon peut contrôler tout Pokémon qui consomme ses fruits. Une fois par combat, lorsqu'il est touché par une attaque, il empoisonne et fait enrager l'attaquant"
  },
}

export function getAbility(character: Character): Ability {
  const variety = character.pokemon.varieties[character.variety].pokemon.name;
  const key = (['A', 'B', 'C', 'D'] as ('A' | 'B' | 'C' | 'D')[]).find(e => abilities[e].some(s => splitMatchPokemonName(variety, s.toLowerCase())));
  return key ? abilityRecord[character.pokemon.types[0]][key] : getSpecialAbility(character);
}

function getSpecialAbility(character: Character): Ability {
  const variety = character.pokemon.varieties[character.variety].pokemon.name;
  return Object.entries(specialAbilities).find(s => splitMatchPokemonName(variety, s[0].toLowerCase()))?.[1] ?? { value: 'Not found', title: 'Non trouvé', desc: 'Non trouvé' }
}

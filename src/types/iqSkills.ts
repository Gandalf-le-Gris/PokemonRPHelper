import { Character } from "./pokemon"
import { Mod } from "./specificities"

export interface IQSkill {
  value: string,
  title: string,
  desc: string,
  level: number,
  effect?: (c: Character) => Mod
}

export const iqSkillArray = [
  {
    value: "Combo",
    title: "Combo",
    desc: "Pour chaque utilisation consécutive de la même attaque, ce Pokémon ajoute 1 à son jet d'attaque",
    level: 5
  },
  {
    value: "Fashionista",
    title: "Fashionista",
    desc: "Ce Pokémon peut porter plusieurs vêtements dans le même emplacement (limité à 1 emplacement)",
    level: 5
  },
  {
    value: "Thrower",
    title: "Lanceur",
    desc: "Ce Pokémon n'a plus besoin de jet pour lancer un objet",
    level: 5,
    effect: () => ({
      talents: [{
        name: 'Throw',
        mod: 9999
      }]
    })
  },
  {
    value: "Marcher",
    title: "Guide",
    desc: "Lorsque ce Pokémon mène le groupe, les temps de trajet sont réduits de 25%",
    level: 5
  },
  {
    value: "Escape artist",
    title: "Artiste de l'évasion",
    desc: "Lorsque ce Pokémon est attaché ou ligoté, il peut se libérer en réussissant un jet de dextérité",
    level: 5
  },
  {
    value: "Orb user",
    title: "Connaisseur des orbes",
    desc: "Ce Pokémon n'a plus besoin de faire un jet pour utiliser un orbe",
    level: 5
  },
  {
    value: "Wand user",
    title: "Connaisseur des bâtons",
    desc: "Ce Pokémon n'a plus besoin de faire un jet pour utiliser un bâton",
    level: 5
  },
  {
    value: "Follow through",
    title: "Impitoyable",
    desc: "Lorsque ce Pokémon met un ennemi KO, il peut réattaquer",
    level: 5
  },
  {
    value: "Fast metabolism",
    title: "Métabolisme rapide",
    desc: "Les soins reçus par ce Pokémon augmentent de 50%",
    level: 5
  },
  {
    value: "Ranged attacker",
    title: "Attaquant à distance",
    desc: "Ce Pokémon peut attaquer à distance avec ses attaques spéciales",
    level: 5
  },
  {
    value: "Bond",
    title: "Lien",
    desc: "Ce Pokémon est lié à un autre Pokémon avec qui il partage un lien fort, déterminé lorsque ce talent est appris. Lorsqu'il est à proximité de cet autre Pokémon, il récupère 1 PV par tour et peut, une fois par combat, tenter un jet d'endurance pour survivre à un coup fatal avec 1 PV. Si le lien est mutuel, ce bonus est doublé",
    level: 5
  },
  {
    value: "Type change",
    title: "Changement de type",
    desc: "Ce Pokémon acquiert le second type de son choix, déterminé lorsque ce talent est appris",
    level: 20
  },
  {
    value: "Capable",
    title: "Capable",
    desc: "Ce Pokémon remplace une de ses spécificités par une autre, déterminée lorsque ce talent est appris",
    level: 20
  },
  {
    value: "Super critical",
    title: "Super critique",
    desc: "Les attaques super efficaces de ce Pokémon assènent des coups critiques sur un 11 ou un 12",
    level: 20
  },
  {
    value: "Cover",
    title: "Protecteur",
    desc: "Une fois par tour, si un allié proche devait être touché par une attaque, ce Pokémon peut la subir à sa place. Les dégâts sont alors réduits de 25%",
    level: 20
  },
  {
    value: "Distance dodge",
    title: "Esquive de projectiles",
    desc: "Les Pokémon qui attaquent ce Pokémon à distance, avec un objet à jeter ou avec un bâton ont le désavantage",
    level: 20
  },
  {
    value: "Keen senses",
    title: "Sens affûtés",
    desc: "Les compétences de perception, fouille et perspicacité de ce Pokémon augmentent de 1",
    level: 20,
    effect: () => ({
      talents: [{
        name: 'Awareness',
        mod: 1
      }, {
        name: 'Forage',
        mod: 1
      }, {
        name: 'Sense motive',
        mod: 1
      }]
    })
  },
  {
    value: "Swimmer",
    title: "Nageur",
    desc: "Ce Pokémon n'a plus besoin de jet pour nager",
    level: 20,
    effect: () => ({
      talents: [{
        name: 'Swim',
        mod: 9999
      }]
    })
  },
  {
    value: "Performer",
    title: "Saltimbanque",
    desc: "Ce Pokémon peut effectuer une performance artistique devant une foule neutre ou amicale pour gagner 3d6 P. Pour chaque Pokémon qui le rejoint, la récompense augmente de 1d6 P",
    level: 20
  },
  {
    value: "Haggler",
    title: "Camelot",
    desc: "Ce Pokémon vend ses objets 2 fois plus cher",
    level: 20
  },
  {
    value: "Charismatic",
    title: "Charismatique",
    desc: "Les compétences de persuasion et intimidation de ce Pokémon augmentent de 2",
    level: 20,
    effect: () => ({
      talents: [{
        name: 'Convince',
        mod: 2
      }, {
        name: 'Intimidate',
        mod: 2
      }]
    })
  },
  {
    value: "Strong bond",
    title: "Lien fort",
    desc: "Amélioration du Lien. Lorsque le Pokémon lié est mis KO, les attaques de ce Pokémon infligent 50% de dégâts supplémentaires. Si le lien fort est mutuel, le bonus monte à 100%",
    level: 20
  },
  {
    value: "Brick house",
    title: "Inébranlable",
    desc: "Le maximum de PV de ce Pokémon est égal à 5 fois sa statistique de PV au lieu de 3 (ou 7 si ce Pokémon a le talent Tank)",
    level: 35
  },
  {
    value: "Cheerleader",
    title: "Supporter",
    desc: "Au début du combat, ce Pokémon choisit un allié. Les statistiques du Pokémon choisi autres que les PV augmentent de 50% jusqu'à ce que ce Pokémon soit mis KO",
    level: 35
  },
  {
    value: "Advanced fashionista",
    title: "Fashion victim",
    desc: "Ce Pokémon peut porter plusieurs vêtements dans chaque emplacement",
    level: 35
  },
  {
    value: "Climber",
    title: "Grimpeur",
    desc: "Ce Pokémon n'a plus besoin de jet pour escalader",
    level: 35,
    effect: () => ({
      talents: [{
        name: 'Climb',
        mod: 9999
      }]
    })
  },
  {
    value: "Advanced thrower",
    title: "Catapulte",
    desc: "Les objets lancés par ce Pokémon infligent 2 fois plus de dégâts",
    level: 35
  },
  {
    value: "Friendly face",
    title: "Visage amical",
    desc: "Lorsque ce Pokémon met un autre Pokémon KO, il peut faire un jet de persuasion. Sur une réussite, le Pokémon KO rejoint l'équipe avec 1 PV",
    level: 35
  },
  {
    value: "Advanced haggler",
    title: "Négociateur",
    desc: "Les prix d'achat sont divisés par 2 pour ce Pokémon",
    level: 35
  },
  {
    value: "Well-read",
    title: "Erudit",
    desc: "Les compétences d'histoire, identification, mythologie et connaissance des Pokémon de ce Pokémon augmentent de 2",
    level: 35,
    effect: () => ({
      talents: [{
        name: 'History',
        mod: 2
      }, {
        name: 'Identify object',
        mod: 2
      }, {
        name: 'Mythology',
        mod: 2
      }, {
        name: 'Pokémon knowledge',
        mod: 2
      }]
    })
  },
  {
    value: "Big eater",
    title: "Gros mangeur",
    desc: "Lorsque ce Pokémon mange quelque chose, sa défense et son attaque augmentent de 50% pour 5 tours (additif)",
    level: 35
  },
  {
    value: "True bond",
    title: "Lien sincère",
    desc: "Amélioration du Lien fort. Ce Pokémon peut communiquer par télépathie avec le Pokémon lié sur un jet de concentration. Si le lien est mutuel, la position des deux Pokémon est également connue par télépathie",
    level: 35
  },
  {
    value: "Home turf",
    title: "Chez soi",
    desc: "Lorsqu'il se trouve dans une zone d'un rayon de 50km déterminée lorsque ce talent est appris, ce Pokémon inflige 2 fois plus de dégâts subit 2 fois moins de dégâts, et se relève avec 1 PV en 10min après avoir été mis KO",
    level: 50
  },
  {
    value: "Resilient",
    title: "Résilient",
    desc: "Ce Pokémon ne subit aucun dégât de la météo, des anomalies de statut et des talents des autres Pokémon",
    level: 50
  },
  {
    value: "Fast learner",
    title: "Vif d'esprit",
    desc: "Ce Pokémon n'a besoin que de 3 points d'expérience pour gagner un niveau",
    level: 50
  },
  {
    value: "Versatile",
    title: "Versatile",
    desc: "Ce Pokémon acquiert un second talent issu de son type primaire ou secondaire, déterminé lorsque ce talent est appris",
    level: 50
  },
  {
    value: "Advanced type change",
    title: "Protéen",
    desc: "Ce Pokémon acquiert le premier ou second type de son choix, déterminé lorsque ce talent est appris",
    level: 50
  },
  {
    value: "Advanced capable",
    title: "Expert",
    desc: "Ce Pokémon acquiert la spécificité de son choix, déterminée lorsque ce talent est appris",
    level: 50
  },
  {
    value: "Advanced brick house",
    title: "Juggernaut",
    desc: "Le maximum de PV de ce Pokémon est égal à 5 fois sa statistique de PV au lieu de 3 (ou 7 si ce Pokémon a le talent Tank ou le talent Inébranlable, ou 9 s'il a les deux)",
    level: 50
  },
  {
    value: "Advanced friendly face",
    title: "Visage adorable",
    desc: "Lorsque ce Pokémon met un autre Pokémon KO, il peut faire un jet de persuasion. Sur une réussite, le Pokémon KO rejoint l'équipe avec tous ses PV",
    level: 50
  },
  {
    value: "Advanced cheerleader",
    title: "Fan n°1",
    desc: "Au début du combat, ce Pokémon choisit un allié. Les statistiques du Pokémon choisi autres que les PV sont doublées jusqu'à ce que ce Pokémon soit mis KO",
    level: 50
  },
  {
    value: "Unbreakable bond",
    title: "Lien éternel",
    desc: "Amélioration du Lien sincère. Ce Pokémon ne peut plus être mis KO tant que le Pokémon lié a plus de 1/4 de ses PV. Si le lien est mutuel, ce Pokémon peut réanimer le Pokémon lié avec 1 PV en réussissant un jet de concentration",
    level: 50
  },
  {
    value: "Status student",
    title: "Etudiant en statuts",
    desc: "Les capacités de statut de ce Pokémon peuvent atteindre des Pokémon éloignés",
    level: 5
  },
  {
    value: "Status adept",
    title: "Adepte des statuts",
    desc: "Lorsqu'un ennemi est mis KO par ce Pokémon ou un de ses alliés, ce Pokémon peut immédiatement utiliser une capacité de statut",
    level: 20
  },
  {
    value: "Status professor",
    title: "Professeur de statuts",
    desc: "Ce Pokémon peut utiliser 2 capacités de statut différentes dans le même tour",
    level: 35
  },
  {
    value: "Advanced status professor",
    title: "Docteur ès statuts",
    desc: "Ce Pokémon peut utiliser 3 capacités de statut dans le même tour",
    level: 50
  },
] as IQSkill[]

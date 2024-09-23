export type TalentType = 'Awareness' | 'Balance' | 'Climb' | 'Convince' | 'Dungeoneering' | 'Endurance' | 'Finesse' | 'Focus' | 'Forage' | 'Heal' | 'History' | 'Identify object' | 'Intimidate' | 'Mythology' | 'Pokémon knowledge' | 'Sense motive' | 'Stealth' | 'Swim' | 'Throw';

export const talentArray = [
  {
    value: 'Awareness',
    title: 'Perception',
  },
  {
    value: 'Balance',
    title: 'Equilibre',
  },
  {
    value: 'Climb',
    title: 'Escalade',
  },
  {
    value: 'Convince',
    title: 'Persuasion',
  },
  {
    value: 'Dungeoneering',
    title: 'Exploration',
  },
  {
    value: 'Endurance',
    title: 'Endurance',
  },
  {
    value: 'Finesse',
    title: 'Dextérité',
  },
  {
    value: 'Focus',
    title: 'Concentration',
  },
  {
    value: 'Forage',
    title: 'Fouille',
  },
  {
    value: 'Heal',
    title: 'Soin',
  },
  {
    value: 'History',
    title: 'Histoire',
  },
  {
    value: 'Identify object',
    title: 'Identification d\'objets',
  },
  {
    value: 'Intimidate',
    title: 'Intimidation',
  },
  {
    value: 'Mythology',
    title: 'Mythologie',
  },
  {
    value: 'Pokémon knowledge',
    title: 'Connaissance des Pokémon',
  },
  {
    value: 'Sense motive',
    title: 'Perspicacité',
  },
  {
    value: 'Stealth',
    title: 'Discrétion',
  },
  {
    value: 'Swim',
    title: 'Nage',
  },
  {
    value: 'Throw',
    title: 'Lancer',
  },
] as { value: TalentType, title: string }[];

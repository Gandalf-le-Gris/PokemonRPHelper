export type StatusEffect =
    'burned'
  | 'paralyzed'
  | 'poisoned'
  | 'frozen'
  | 'disabled'
  | 'flinched'
  | 'infatuated'
  | 'dimmed'
  | 'blinded'
  | 'terrified'
  | 'slowed'
  | 'quickened';

export const statusEffectArray = [
  {
    value: 'burned',
    title: 'Brûlé',
    color: 'red',
    icon: 'mdi-fire'
  },
  {
    value: 'paralyzed',
    title: 'Paralysé',
    color: 'yellow',
    icon: 'mdi-lightning-bolt'
  },
  {
    value: 'poisoned',
    title: 'Empoisonné',
    color: 'purple-lighten-1',
    icon: 'mdi-skull'
  },
  {
    value: 'frozen',
    title: 'Gelé',
    color: 'cyan-lighten-3',
    icon: 'mdi-snowflake'
  },
  {
    value: 'disabled',
    title: 'Entravé',
    color: 'green-lighten-1',
    icon: 'mdi-lock'
  },
  {
    value: 'flinched',
    title: 'Apeuré',
    color: 'grey',
    icon: 'mdi-exclamation-thick'
  },
  {
    value: 'infatuated',
    title: 'Charmé',
    color: 'pink-lighten-2',
    icon: 'mdi-heart'
  },
  {
    value: 'dimmed',
    title: 'Ébloui',
    color: 'yellow-lighten-3',
    icon: 'mdi-lightbulb-outline'
  },
  {
    value: 'blinded',
    title: 'Aveuglé',
    color: 'indigo',
    icon: 'mdi-eye-off'
  },
  {
    value: 'terrified',
    title: 'Terrifié',
    color: 'brown',
    icon: 'mdi-ghost'
  },
  {
    value: 'slowed',
    title: 'Ralenti',
    color: 'blue-grey-darken-1',
    icon: 'mdi-snail'
  },
  {
    value: 'quickened',
    title: 'Accéléré',
    color: 'light-green-lighten-2',
    icon: 'mdi-rabbit'
  }
] as { value: StatusEffect, title: string, color: string, icon: string }[];
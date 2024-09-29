export interface Experience {
  dungeonClear: boolean,
  exploration: boolean,
  fail: boolean,
  success: boolean,
  friend: boolean,
  ko: boolean,
  help: boolean,
}

export const experienceLabels = {
  dungeonClear: 'Donjon terminé',
  exploration: 'Nouvel endroit',
  fail: 'Grand échec',
  success: 'Grande réussite',
  friend: 'Nouvel ami',
  ko: '5 KO',
  help: 'Aide altruiste',
}

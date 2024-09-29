import translations from '@/assets/translations.json';

export const searchArray = Object.entries(translations).map(e => ({ value: e[1], title: e[0] })).sort((a, b) => a.title.localeCompare(b.title));

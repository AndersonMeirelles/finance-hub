import 'server-only';
import type { Locale } from './config';

const dictionaries = {
  'pt-br': () => import('@/dictionaries/pt-br.json').then((module) => module.default),
  'en-us': () => import('@/dictionaries/en-us.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries['pt-br']();
};


import data from '../data/texts.json';

type Lang = 'es' | 'en';

export function getText(section: string, lang: Lang = 'es') {
  const sec = (data as any)[section] || {};
  return sec[lang] || {};
}

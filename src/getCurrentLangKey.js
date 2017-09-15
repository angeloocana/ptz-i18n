import { filter, curry, startsWith } from 'ramda';

/**
 * Get current language key from url.
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @param {String} url browser url 
 * @returns {String} current langKey
 */
const getCurrentLangKey = curry((langs, defaultLangKey, url) => {
  const langKey = url.split('/')[1];
  const currentLangKey = filter(l => startsWith(l, langKey), langs);
  return currentLangKey[0] || defaultLangKey;
});

export {
  getCurrentLangKey
};

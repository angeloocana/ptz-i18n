import { any, curry, startsWith } from 'ramda';

/**
 * Gets the number of paths in a url
 * @param {*} url pathName
 * @returns {Number} number of paths
 */
const nPaths = (url) => (url.match(/\//g) || []).length - 1;

/**
 * Checks if the url is /, /en/ or /pt/
 * @param {*} url this.props.location
 * @returns {Boolean} is home or not
 */
const isHomePage = (url) => nPaths(url) <= 1;

/**
 * Get current language key. 
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @param {String} url browser url 
 * @returns {String} current langKey
 */
const getCurrentLangKey = curry((langs, defaultLangKey, url) => {
  const langKey = (url || `/${defaultLangKey}/`).split('/')[1];
  const currentLangKey = any(l => startsWith(l, langKey), langs);
  return currentLangKey[0] || defaultLangKey;
});

/**
 * Get url to the language
 * @param {String} homeLink  link for the home page
 * @param {String} url  browser url
 * @param {String} langKey default browser language key
 * @returns {String} new url
 */
const getUrlForLang = curry((homeLink, url, langKey) => {
  return url === '/' || !startsWith(homeLink, url)
    ? `/${langKey}/`
    : url.replace(homeLink, `/${langKey}/`);
});

/**
 * Get langs to create Menu
 * @param {[String]} langs lang keys ['en', 'fr', 'pt']
 * @param {String} currentLangKey current Lang Key
 * @param {func} getUrlForLang getUrlForLang curried, waiting for langKey
 * @returns {Array} langs menu data
 */
const getLangs = curry((langs, currentLangKey, getUrlForLang) => {  
  return langs.map(langKey => {
    return {
      langKey,
      selected: currentLangKey === langKey,
      link: getUrlForLang(langKey)
    };
  });
});

/**
 * Get i18n obj for the given langKey or first when not found
 * @param {*} i18n Translations object
 * @param {*} langKey langKey
 * @returns {*} i18n[langKey] or i18n[defaultLangKey]
 */
const getI18nBase = curry((i18n, langKey) =>
  i18n[langKey] || Object.values(i18n)[0]);

/**
 * Get slug (path) and langKey for a given file path.
 * 
 * Used by gatsby-plugin-i18n and gatsby-plugin-i18n-tags
 * 
 * @param {*} defaultLangKey default langKey
 * @param {*} fileAbsolutePath local file absolute path
 * @return {{slug: string, langKey: string}} slug and langKey
 */
const getSlugAndLang = curry((defaultLangKey, fileAbsolutePath) => {
  const filePath = fileAbsolutePath.split('/pages')[1];
  const fileName = filePath.split('.');
  const langKey = fileName.length === 3 ? fileName[1] : defaultLangKey;
  const slug = fileName.length === 3
    ? `/${langKey}${fileName[0].replace('/index', '')}/`
    : `${fileName[0].replace('/index', '')}/`;

  return {
    slug,
    langKey
  };
});

export {
  getI18nBase,
  getCurrentLangKey,
  getLangs,
  getSlugAndLang,
  getUrlForLang,
  nPaths,
  isHomePage
};

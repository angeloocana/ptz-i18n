'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHomePage = exports.nPaths = exports.getUrlForLang = exports.getSlugAndLang = exports.getLangs = exports.getCurrentLangKey = exports.getI18nBase = undefined;

var _ramda = require('ramda');

/**
 * Gets the number of paths in a url
 * @param {*} url pathName
 * @returns {Number} number of paths
 */
var nPaths = function nPaths(url) {
  return (url.match(/\//g) || []).length - 1;
};

/**
 * Checks if the url is /, /en/ or /pt/
 * @param {*} url this.props.location
 * @returns {Boolean} is home or not
 */
var isHomePage = function isHomePage(url) {
  return nPaths(url) <= 1;
};

/**
 * Get current language key. 
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @param {String} url browser url 
 * @returns {String} current langKey
 */
var getCurrentLangKey = (0, _ramda.curry)(function (langs, defaultLangKey, url) {
  var langKey = (url || '/' + defaultLangKey + '/').split('/')[1];
  var currentLangKey = (0, _ramda.any)(function (l) {
    return (0, _ramda.startsWith)(l, langKey);
  }, langs);
  return currentLangKey[0] || defaultLangKey;
});

/**
 * Get url to the language
 * @param {String} homeLink  link for the home page
 * @param {String} url  browser url
 * @param {String} langKey default browser language key
 * @returns {String} new url
 */
var getUrlForLang = (0, _ramda.curry)(function (homeLink, url, langKey) {
  return url === '/' || !(0, _ramda.startsWith)(homeLink, url) ? '/' + langKey + '/' : url.replace(homeLink, '/' + langKey + '/');
});

/**
 * Get langs to create Menu
 * @param {[String]} langs lang keys ['en', 'fr', 'pt']
 * @param {String} currentLangKey current Lang Key
 * @param {func} getUrlForLang getUrlForLang curried, waiting for langKey
 * @returns {Array} langs menu data
 */
var getLangs = (0, _ramda.curry)(function (langs, currentLangKey, getUrlForLang) {
  return langs.map(function (langKey) {
    return {
      langKey: langKey,
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
var getI18nBase = (0, _ramda.curry)(function (i18n, langKey) {
  return i18n[langKey] || Object.values(i18n)[0];
});

/**
 * Get slug (path) and langKey for a given file path.
 * 
 * Used by gatsby-plugin-i18n and gatsby-plugin-i18n-tags
 * 
 * @param {*} defaultLangKey default langKey
 * @param {*} fileAbsolutePath local file absolute path
 * @return {{slug: string, langKey: string}} slug and langKey
 */
var getSlugAndLang = (0, _ramda.curry)(function (defaultLangKey, fileAbsolutePath) {
  var filePath = fileAbsolutePath.split('/pages')[1];
  var fileName = filePath.split('.');
  var langKey = fileName.length === 3 ? fileName[1] : defaultLangKey;
  var slug = fileName.length === 3 ? '/' + langKey + fileName[0].replace('/index', '') + '/' : fileName[0].replace('/index', '') + '/';

  return {
    slug: slug,
    langKey: langKey
  };
});

exports.getI18nBase = getI18nBase;
exports.getCurrentLangKey = getCurrentLangKey;
exports.getLangs = getLangs;
exports.getSlugAndLang = getSlugAndLang;
exports.getUrlForLang = getUrlForLang;
exports.nPaths = nPaths;
exports.isHomePage = isHomePage;
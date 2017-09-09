'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHomePage = exports.nPaths = exports.getUrlForLang = exports.getSlugAndLang = exports.getLangs = exports.getCurrentLangKey = exports.getI18nBase = exports.getI18n = undefined;

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

var defaultLangKey = 'en';

/**
 * Get current language key. 
 * @param {String} url browser url
 * @param {String} browserLang default browser language key
 * @returns {String} current langKey
 */
var getCurrentLangKey = function getCurrentLangKey(url) {
  var browserLang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultLangKey;

  var langKey = (url || '/' + browserLang + '/').split('/')[1];
  switch (langKey === '' ? browserLang : langKey) {
    case 'en':
      return 'en';
    case 'fr':
      return 'fr';
    case 'pt':
      return 'pt';
    default:
      return 'en';
  }
};

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
 * @param {String} currentLangKey current Lang Key
 * @param {func} getUrlForLang getUrlForLang curried, waiting for langKey
 * @returns {Array} langs menu data
 */
var getLangs = function getLangs(currentLangKey, getUrlForLang) {
  var langs = ['en', 'fr', 'pt'];

  return langs.map(function (langKey) {
    return {
      langKey: langKey,
      selected: currentLangKey === langKey,
      link: getUrlForLang(langKey)
    };
  });
};

/**
 * Get i18n obj for the given langKey
 * @param {*} defaultLangKey default langKey
 * @param {*} i18n Translations object
 * @param {*} langKey langKey
 * @returns {*} i18n[langKey] or i18n[defaultLangKey]
 */
var getI18n = (0, _ramda.curry)(function (defaultLangKey, i18n, langKey) {
  return i18n[langKey] || i18n[defaultLangKey];
});

var getI18nBase = getI18n(defaultLangKey);

/**
 * Get slug (path) and langKey for a given file path.
 * 
 * Used by gatsby-plugin-i18n and gatsby-plugin-i18n-tags
 * 
 * @param {*} defaultLangKey default langKey
 * @param {*} fileAbsolutePath local file absolute path
 * @return {{slug: string, langKey: string}} slug and langKey
 */
var getSlugAndLang = function getSlugAndLang(defaultLangKey, fileAbsolutePath) {
  var filePath = fileAbsolutePath.split('/pages')[1];
  var fileName = filePath.split('.');
  var langKey = fileName.length === 3 ? fileName[1] : defaultLangKey;
  var slug = fileName.length === 3 ? '/' + langKey + fileName[0].replace('/index', '') + '/' : fileName[0].replace('/index', '') + '/';

  return {
    slug: slug,
    langKey: langKey
  };
};

exports.getI18n = getI18n;
exports.getI18nBase = getI18nBase;
exports.getCurrentLangKey = getCurrentLangKey;
exports.getLangs = getLangs;
exports.getSlugAndLang = getSlugAndLang;
exports.getUrlForLang = getUrlForLang;
exports.nPaths = nPaths;
exports.isHomePage = isHomePage;
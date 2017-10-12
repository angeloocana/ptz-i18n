import getUserLangKey from './getUserLangKey';

/**
 * Redirect to user language home page, from: / to: /langKey/
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @return {string} newUrl
 */
const redirectToHome = (langs, defaultLangKey) => {
  const langKey = getUserLangKey(langs, defaultLangKey);
  const newUrl = `/${langKey}/`;
  console.log('newUrl:', newUrl);
  window.location.replace(newUrl);
  return newUrl;
};

export default redirectToHome;

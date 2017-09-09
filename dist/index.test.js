'use strict';

var _index = require('./index');

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('langs', function () {

  describe('getCurrentLangKey', function () {
    it('/ & en => en', function () {
      var url = '/';
      assert.equal((0, _index.getCurrentLangKey)(url), 'en');
    });
    it('/ & pt => pt', function () {
      var url = '/';
      var browserLang = 'pt';
      assert.equal((0, _index.getCurrentLangKey)(url, browserLang), 'pt');
    });
    it('/en/about/ & en => en', function () {
      var url = '/en/about/';
      var browserLang = 'en';
      assert.equal((0, _index.getCurrentLangKey)(url, browserLang), 'en');
    });
  });

  describe('getUrlForLang', function () {
    it('/ & en => /en/', function () {
      var url = '/';
      var lang = 'en';
      var home = '/' + lang + '/';
      assert.equal((0, _index.getUrlForLang)(home, url, lang), '/en/');
    });
    it('/ & pt => /pt/', function () {
      var url = '/';
      var lang = 'pt';
      var home = '/' + lang + '/';
      assert.equal((0, _index.getUrlForLang)(home, url, lang), '/pt/');
    });
    it('/en/ & en => /en/', function () {
      var url = '/en/';
      var lang = 'en';
      var home = '/' + lang + '/';
      assert.equal((0, _index.getUrlForLang)(home, url, lang), '/en/');
    });
    it('/pt/ & en => /en/', function () {
      var url = '/pt/';
      var lang = 'en';
      var home = url;
      assert.equal((0, _index.getUrlForLang)(home, url, lang), '/en/');
    });
    it('/en/about/ & en => /en/about/', function () {
      var url = '/en/about/';
      var lang = 'en';
      var home = '/' + lang + '/';
      assert.equal((0, _index.getUrlForLang)(home, url, lang), '/en/about/');
    });
    it('/pt/about/ & en => /en/about/', function () {
      var url = '/pt/about/';
      var lang = 'en';
      var home = '/pt/';
      assert.equal((0, _index.getUrlForLang)(home, url, lang), '/en/about/');
    });
  });

  describe('getLangs', function () {
    it('/ & en', function () {
      var langs = (0, _index.getLangs)('en', (0, _index.getUrlForLang)('/en/', '/'));
      var expected = [{
        'langKey': 'en',
        'link': '/en/',
        'selected': true
      }, {
        'langKey': 'fr',
        'link': '/fr/',
        'selected': false
      }, {
        'langKey': 'pt',
        'link': '/pt/',
        'selected': false
      }];
      assert.deepEqual(langs, expected);
    });
  });

  describe('getI18nBase', function () {
    var en = {
      title: 'test'
    };
    var pt = {
      title: 'teste'
    };

    var getI18n = (0, _index.getI18nBase)({
      en: en,
      pt: pt
    });

    it('return pt for pt', function () {
      var i18n = getI18n('pt');
      assert.equal(i18n, pt);
    });
    it('return en for any', function () {
      var i18n = getI18n('any');
      assert.equal(i18n, en);
    });
  });

  describe('getSlugAndLang', function () {
    it('.pt file', function () {
      var absoluteFilePath = '/home/angeloocana/dev/angeloocana/src/pages/blog/linux/arch/extract-files.pt.md';
      var slugAndLangKey = (0, _index.getSlugAndLang)('en', absoluteFilePath);
      var expected = {
        slug: '/pt/blog/linux/arch/extract-files/',
        langKey: 'pt'
      };

      assert.deepEqual(slugAndLangKey, expected);
    });

    it('no .langKey file', function () {
      var absoluteFilePath = '/home/angeloocana/dev/angeloocana/src/pages/Tutoriais/DicaRapida_1_Melhorar_Performance_MVC.md';
      var slugAndLangKey = (0, _index.getSlugAndLang)('any', absoluteFilePath);
      var expected = {
        slug: '/Tutoriais/DicaRapida_1_Melhorar_Performance_MVC/',
        langKey: 'any'
      };

      assert.deepEqual(slugAndLangKey, expected);
    });
  });
});
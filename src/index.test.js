import {
  getLangs,
  getUrlForLang,
  getI18nBase,
  getSlugAndLang,
  isHomePage
} from './index';
import * as assert from 'ptz-assert';

describe('langs', () => {
  describe('getUrlForLang', () => {
    it('/ & en => /en/', () => {
      const url = '/';
      const lang = 'en';
      const home = `/${lang}/`;
      assert.equal(getUrlForLang(home, url, lang), '/en/');
    });
    it('/ & pt => /pt/', () => {
      const url = '/';
      const lang = 'pt';
      const home = `/${lang}/`;
      assert.equal(getUrlForLang(home, url, lang), '/pt/');
    });
    it('/en/ & en => /en/', () => {
      const url = '/en/';
      const lang = 'en';
      const home = `/${lang}/`;
      assert.equal(getUrlForLang(home, url, lang), '/en/');
    });
    it('/pt/ & en => /en/', () => {
      const url = '/pt/';
      const lang = 'en';
      const home = url;
      assert.equal(getUrlForLang(home, url, lang), '/en/');
    });
    it('/en/about/ & en => /en/about/', () => {
      const url = '/en/about/';
      const lang = 'en';
      const home = `/${lang}/`;
      assert.equal(getUrlForLang(home, url, lang), '/en/about/');
    });
    it('/pt/about/ & en => /en/about/', () => {
      const url = '/pt/about/';
      const lang = 'en';
      const home = `/pt/`;
      assert.equal(getUrlForLang(home, url, lang), '/en/about/');
    });
  });

  describe('getLangs', () => {
    it('/ & en', () => {
      const langs = getLangs(['en', 'fr', 'pt'], 'en', getUrlForLang('/en/', '/'));
      const expected = [
        {
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

  describe('getI18nBase', () => {
    const en = {
      title: 'test'
    };
    const pt = {
      title: 'teste'
    };

    const getI18n = getI18nBase({
      en,
      pt
    });

    it('return pt for pt', () => {
      const i18n = getI18n('pt');
      assert.equal(i18n, pt);
    });
    it('return en for any', () => {
      const i18n = getI18n('any');
      assert.equal(i18n, en);
    });
  });

  describe('getSlugAndLang', () => {
    it('.pt file', () => {
      const absoluteFilePath = '/home/angeloocana/dev/angeloocana/src/pages/blog/linux/arch/extract-files.pt.md';
      const slugAndLangKey = getSlugAndLang('en', absoluteFilePath);
      const expected = {
        slug: '/pt/blog/linux/arch/extract-files/',
        langKey: 'pt'
      };

      assert.deepEqual(slugAndLangKey, expected);
    });

    it('no .langKey file', () => {
      const absoluteFilePath = '/home/angeloocana/dev/angeloocana/src/pages/Tutoriais/DicaRapida_1_Melhorar_Performance_MVC.md';
      const slugAndLangKey = getSlugAndLang('any', absoluteFilePath);
      const expected = {
        slug: '/Tutoriais/DicaRapida_1_Melhorar_Performance_MVC/',
        langKey: 'any'
      };

      assert.deepEqual(slugAndLangKey, expected);
    });

    it('should accept nodes not in the "pages" dir', () => {
      const absoluteFilePath = '/home/angeloocana/dev/angeloocana/src/content/blog/linux/arch/extract-files.pt.md';
      const slugAndLangKey = getSlugAndLang('en', absoluteFilePath);
      const expected = {
        slug: '/pt/blog/linux/arch/extract-files/',
        langKey: 'pt'
      };

      assert.deepEqual(slugAndLangKey, expected);
    })

  });

  describe('isHomePage', () => {
    it('/ true', () => {
      assert.ok(isHomePage('/'));
    });
    it('/en/ true', () => {
      assert.ok(isHomePage('/en/'));
    });
    it('/pt/ true', () => {
      assert.ok(isHomePage('/pt/'));
    });
    it('/en/tags/ false', () => {
      assert.notOk(isHomePage('/en/tags/'));
    });
  });
});

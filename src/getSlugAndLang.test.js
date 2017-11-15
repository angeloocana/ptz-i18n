import { getSlugAndLang } from './index';
import * as assert from 'ptz-assert';

describe('getSlugAndLang', () => {
  it('.pt file', () => {
    const absoluteFilePath = '/what/ever/src/pages/blog/test.pt.md';
    const slugAndLangKey = getSlugAndLang('en', absoluteFilePath);
    const expected = {
      slug: '/pt/blog/test/',
      langKey: 'pt'
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

  it('no .langKey file', () => {
    const absoluteFilePath = '/what/ever/src/pages/test.md';
    const slugAndLangKey = getSlugAndLang('any', absoluteFilePath);
    const expected = {
      slug: '/test/',
      langKey: 'any'
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

  it('pagesPaths /custom/folder/', () => {
    const absoluteFilePath = '/custom/folder/blog/test.pt.md';
    const options = {
      pagesPaths: ['/custom/folder/'],
      langKeyDefault: 'en'
    };
    const slugAndLangKey = getSlugAndLang(options, absoluteFilePath);
    const expected = {
      slug: '/pt/blog/test/',
      langKey: 'pt'
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

  it('pagesPaths /custom/folder', () => {
    const absoluteFilePath = '/custom/folder/blog/test.md';
    const options = {
      pagesPaths: ['/custom/folder'],
      langKeyDefault: 'en'
    };
    const slugAndLangKey = getSlugAndLang(options, absoluteFilePath);
    const expected = {
      slug: '/blog/test/',
      langKey: 'en'
    };

    assert.deepEqual(slugAndLangKey, expected);
  });

});


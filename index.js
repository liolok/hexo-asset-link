'use strict';

const url = require('url');
const chalk = require('chalk');
const cheerio = require('cheerio');

hexo.extend.filter.register('after_post_render', function (data) {
  if (!hexo.config.post_asset_folder) return;

  // Get asset folder's path which is root-relative to site host (strip suffix)
  const root = url.parse(data.permalink).pathname.replace(/\.[^/.]+$/, '/');
  hexo.log.info('Post asset folder: %s', chalk.blue(root));

  const keys = ['content', 'excerpt', 'more'];
  for (let i = 0; i < keys.length; i++) {
    const $ = cheerio.load(data[keys[i]], { decodeEntities: false });

    function convertLink(element, attribute) {
      $(element).each(function () {
        const link = $(this).attr(attribute);
        if (!link  // no link found in element
          || url.parse(link).protocol  // absolute link
          || link.startsWith('/')  // root-relative link
          || link.startsWith('#')  // in-page fragment link
        ) return;  // only process base-relative link

        // Get file's path which is base-relative to asset folder (strip prefix)
        const base = decodeURI(link.replace(/^\.\//, '').replace(/^.*?\//, ''));
        $(this).attr(attribute, root + base);
        hexo.log.debug('Link converted in data[\'%s\']: %s',
          keys[i], chalk.cyan(root + base));
      });
    }

    convertLink('img', 'src');  // images
    convertLink('a', 'href');  // other files

    data[keys[i]] = $.html();
  }
});

'use strict';

const url = require('url');
const cheerio = require('cheerio');

hexo.extend.filter.register('after_post_render', function (data) {
  if (!hexo.config.post_asset_folder) return;

  // Get asset folder's path which is root-relative to site host (strip suffix)
  const root = url.parse(data.permalink).pathname.replace(/\.[^/.]+$/, '/');
  console.info && console.info("Asset folder root-relative path: " + root);

  const keys = ['excerpt', 'more', 'content'];
  for (let i = 0; i < keys.length; i++) {
    const $ = cheerio.load(data[keys[i]], { decodeEntities: false });

    function convertLink(element, attribute) {
      $(element).each(function () {
        const link = $(this).attr(attribute);
        if (!link  // no link found in element
          || url.parse(link).protocal  // absolute link
          || link.startsWith('/')  // root-relative link
          || link.startsWith('#')  // in-page fragment link
        ) return;  // only process base-relative link

        // Get file's path which is base-relative to asset folder (strip prefix)
        const base = decodeURI(link.replace(/^\.\//, '').replace(/^.*?\//, ''));
        $(this).attr(attribute, root + base);
        console.info && console.info("Converted link: " + root + base);
      });
    }

    convertLink('img', 'src');  // images
    convertLink('a', 'href');  // other files

    data[keys[i]] = $.html();
  }
});

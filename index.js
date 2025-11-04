'use strict';

const pc = require('picocolors');

// Only work when post asset folder option enabled
if (hexo.config.post_asset_folder) hexo.extend.filter.register('before_post_render', convertLink);

function convertLink(data) {
  if (!data.asset_dir) return; // need asset_dir attribute available
  hexo.log.d('Post asset folder path:', pc.magenta(data.asset_dir));
  // Split by path delimiter, filter out empty string, last one is asset folder's name.
  const asset_dir_name = data.asset_dir.split(/[\/\\]/).filter(i => i).pop();
  hexo.log.d('Post asset folder name:', pc.magenta(asset_dir_name));
  // Character may be ahead of paths: '(' or '<' or whitespace.
  const look_behind = '(?<=[(<\\s])';
  // Asset paths in markdown start with './' or not, then folder's name, end with '/'.
  const path_markdown = RegExp(look_behind + '(.\/)?' + asset_dir_name.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&') + '\/', 'g');
  if (!path_markdown.test(data.content)) return; // no asset link found, do nothing
  // Permalink's pathname, supposed to start with '/'
  const pathname = new URL(data.permalink).pathname;
  hexo.log.d('Post html path name:', pc.magenta(pathname));
  // Strip any suffix if exists, supposed to start and end with '/', this is where assets would be in html.
  const path_html = pathname.replace(/\.[^/.]+$/, '/');
  data.content = data.content.replace(path_markdown, path_html);
  hexo.log.i('Path converted:', pc.yellow(path_markdown.toString()), '→', pc.green(path_html));
}

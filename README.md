# hexo-asset-link

Convert base-relative asset links to root-relative ones, so that user can insert assets like images in markdown way.

[![NPM version](https://badge.fury.io/js/hexo-asset-link.svg)](https://www.npmjs.com/package/hexo-asset-link)

## Install

```shell
$ npm i --save hexo-asset-link
```

## Config

This plugin only works when [`Asset Folders`](https://hexo.io/docs/asset-folders) feature enabled in `_config.yml`:

```yml
post_asset_folder: true
```

## Write

For example, if you have these files in `source/_post/`:

```
+-- _posts
|   +-- 2019-02-14-Test-Post.md
|   +-- 2019-02-14-Test-Post
|       +-- Test-Image.png
|       +-- Test-Other-File.pdf
```

Then in `2019-02-14-Test-Post.md`:

### Images

```markdown
![Alt Text](./2019-02-14-Test-Post/Test-Image.png "Title Text")
![Alt Text](2019-02-14-Test-Post/Test-Image.png "Title Text")
```

### Other Files

```markdown
[Text](./2019-02-14-Test-Post/Test-Other-File.pdf)
[Text](2019-02-14-Test-Post/Test-Other-File.pdf)
```

### Unrecommended Way

This way is quite dirty, and will **not** work when there exists **any subdirectory**, e.g. `2019-02-14-Test-Post/Sub/Directory/Test-Image.png`.

```markdown
![Alt Text](Test-Image.png "Title Text")
[Text](Test-Other-File.pdf)
```

Writing in this way makes no sense to markdown, asset files will **not** be found correctly.

## FAQ

### Why not hexo-asset-image?

1. It has been unmaintained for two years;
2. It has security vulnerability due to out-dated dependency;
3. It seems incompatible with plugins like hexo-abbrlink.

### Then is hexo-asset-link better?

1. My code is really better (^_^);
2. If this plugin meets your requirement, just install and have fun writing;
3. A detailed issue is always welcomed if any trouble.

## Reference

Coding style and `cheerio` usage: [hexo/external_link.js at 3.8.0 · hexojs/hexo](https://github.com/hexojs/hexo/blob/3.8.0/lib/plugins/filter/after_post_render/external_link.js)

### API

[Filter | Hexo](https://hexo.io/api/filter)

[URL | Node.js v10.15.1 Documentation](https://nodejs.org/docs/latest-v10.x/api/url.html)

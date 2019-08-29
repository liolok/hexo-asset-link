# hexo-asset-link [![NPM version](https://badge.fury.io/js/hexo-asset-link.svg)](https://www.npmjs.com/package/hexo-asset-link)

Convert base-relative asset links to root-relative ones, so that user can insert assets like images in markdown way.

## Install

In Hexo blog instance directory:

```shell
$ npm i -s hexo-asset-link
```

## Config

This plugin works only when [`Post Asset Folders`](https://hexo.io/docs/asset-folders#Post-Asset-Folder) feature enabled in `_config.yml`:

```yml
post_asset_folder: true
```

## Usage

For example, if you have these files in `source/_post/`:

```
+-- _posts/
|   +-- 2019-02-14-Test-Post.md
|   +-- 2019-02-14-Test-Post/
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

After this we'll get the right asset path result in:

- Blog home page of `hexo server` preview;
- Blog post page of `hexo server` preview;
- Blog home page of online website;
- Blog post page of online website;
- Markdown preview of editors like VS Code.

Now shall we just have fun writing!

## Comparision to `hexo-asset-image`

At first when I wrote this plugin, the older `hexo-asset-image` has been inactive for quite a long while.

 Up to now, there is still a lot of issues remaining open. And I smell of hardcode (no offence), which may lead to more and more problems.

In the end, all of these trouble comes from upstream Hexo, I'll keep an eye on it. This plugin's maintenance will last until I deprecate Hexo, which would a long time later, no need to worry.

## Reference

Coding style and `cheerio` usage: [hexo/external_link.js at 3.9.0 · hexojs/hexo](https://github.com/hexojs/hexo/blob/3.9.0/lib/plugins/filter/after_post_render/external_link.js)

### API

[Filter | Hexo](https://hexo.io/api/filter)

[`url.parse`](https://nodejs.org/docs/latest-v12.x/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost "URL | Node.js v12.9.1 Documentation")

[`url.pathname`](https://nodejs.org/docs/latest-v12.x/api/url.html#url_url_pathname "URL | Node.js v12.9.1 Documentation")

[`url.protocol`](https://nodejs.org/docs/latest-v12.x/api/url.html#url_url_protocol "URL | Node.js v12.9.1 Documentation")

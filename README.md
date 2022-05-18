# hexo-asset-link [![NPM version](https://badge.fury.io/js/hexo-asset-link.svg)](https://www.npmjs.com/package/hexo-asset-link)

Convert Markdown style asset links to HTML style ones.

## Install

In Hexo blog instance directory:

```shell
$ npm i -s hexo-asset-link
```

**or** if you prefer yarn:

```shell
$ yarn add hexo-asset-link
```

## Config

**Find** (not *add*) and enable [`Post Asset Folders`](https://hexo.io/docs/asset-folders#Post-Asset-Folder) feature in `_config.yml`:

```yml
# Writing
...
post_asset_folder: true
...
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

## Reference

- [Filter | Hexo](https://hexo.io/api/filter "Filter | Hexo")
- [Posts | Hexo](https://hexo.io/api/posts "Posts | Hexo")
- [`new URL`](https://nodejs.org/docs/latest-v18.x/api/url.html#new-urlinput-base)
- [`url.pathname`](https://nodejs.org/docs/latest-v18.x/api/url.html#urlpathname)
- [RegExp - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp "RegExp - JavaScript | MDN")

# less-plugin-remove-antd-global-styles

This is a [less plugin](https://lesscss.org/tools/#plugins) that removes [ant-design global styles](https://github.com/ant-design/ant-design/blob/master/components/style/core/global.less).

It works well with vite, webpack, rollup and babel-plugin-import.

Solve https://github.com/ant-design/ant-design/issues/9363 .

## How it works

It works by mapping the [global.less](https://github.com/ant-design/ant-design/blob/master/components/style/core/global.less) into an empty file: https://github.com/csr632/less-plugin-remove-antd-global-styles/blob/main/src/index.ts

## Usage

```
npm i -D less-plugin-remove-antd-global-styles
```

### vite

If you are using vite:

```ts
// vite.config.ts
import { LessPluginRemoveAntdGlobalStyles } from 'less-plugin-remove-antd-global-styles'

export default {
  // ...
  css: {
    preprocessorOptions: {
      less: {
        // put less plugin here
        plugins: [new LessPluginRemoveAntdGlobalStyles()],
      },
    },
  },
}
```

### webpack

If you are using webpack, pass it to [less-loader options](https://webpack.js.org/loaders/less-loader/#plugins):

```js
// webpack.config.js
const { LessPluginRemoveAntdGlobalStyles } = require('less-plugin-remove-antd-global-styles');

module.exports = {
  ...
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          plugins: [
            new LessPluginRemoveAntdGlobalStyles(),
          ],
        },
      },
    },
  ...
};
```

### rollup

If you are using rollup, pass it to [rollup-plugin-postcss](https://www.npmjs.com/package/rollup-plugin-postcss):

```js
// rollup.config.js
import { LessPluginRemoveAntdGlobalStyles } from 'less-plugin-remove-antd-global-styles'

export default {
  plugins: [
    postcss({
      use: {
        less: {
          plugins: [new LessPluginRemoveAntdGlobalStyles()],
        },
      },
    }),
  ],
}
```

### babel-plugin-import

If you are using [babel-plugin-import](https://github.com/umijs/babel-plugin-import) to do import-on-demand, you should pass `style: true` to the babel plugin. Here is a `babel.config.json` example:

```json
{
  "plugins": [
    [
      "babel-plugin-import",
      {
        "libraryName": "antd",
        "style": true
      }
    ]
  ]
}
```

## Tips

You may want to add some reasonable global styles to your own stylesheet after removing global styles from antd. For example, you probably want to keep these styles:

```css
/* your-own-global-style.css  */

/* 
pick some reasonable global styles from
https://github.com/ant-design/ant-design/blob/master/components/style/core/global.less
*/
*,
*::before,
*::after {
  box-sizing: border-box;
}

a {
  text-decoration: none;
}
```

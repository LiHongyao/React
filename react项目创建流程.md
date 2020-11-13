# 创建项目

```shell
$ cd 至项目存放目录
$ npx create-react-app project-name --template typescript 
```

# 配置扩展

安装依赖

```shell
$ yarn add react-app-rewired customize-cra --dev
```

修改package.json

```json
{
    "scripts": {
        // ++++
        "start": "react-app-rewired start",
        "build": "react-app-rewired build",
        "test": "react-app-rewired test",
        // ++++
      
        // ---
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        // ---
      
        "eject": "react-scripts eject"
    }
}
```

创建配置文件：“config-overrides.js”

```js
const {
  override
} = require('customize-cra');

module.exports = {
  webpack: override({

  })
}
```

# 环境变量

.env.development

```ini
REACT_APP_ENV = 'development'
REACT_APP_HOST  = ?
```

.env.production

```ini
REACT_APP_ENV = 'production'
REACT_APP_HOST  = ?
```

# pxtorem

安装依赖：

```shell
$ yarn add postcss-pxtorem -D && yarn add amfe-flexible 
```

添加配置：config-overrides.js

```js
addPostcssPlugins([
  require('postcss-pxtorem')({
    rootValue: 37.5,
    // rootValue: 100,
    propList: ['*']
  })
])
```

引入：index.tsx

```
import 'amfe-flexible'
```

# @babel/polyfill

安装：

```shell
$ yarn add core-js regenerator-runtime --save
```

在index.tsx文件导入：

```js
import "core-js/stable";
import "regenerator-runtime/runtime";
```

修改package.json：

```json
"browserslist": [
    "> 0.1%"
  ],
```

添加babel.config.js文件，内容如下：

```js
module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/preset-env", {
            "useBuiltIns": "usage",
            "corejs": 3
        }]
    ];
    const plugins = [
       
    ]
    return {
        presets,
        plugins
    };
}
```

# axios

# 静态路由

安装依赖

```shell
$ yarn add react-router-dom react-router-config  @types/react-router-dom @types/react-router-config 
```










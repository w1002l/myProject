重点梳理
1. 侧边栏渲染多级菜单
两种方法
① 先过滤，把有子级和无子级的分开，再渲染，缺点：不按照菜单顺序进行渲染，不推荐
```javascript
const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren = computed(() => list.value.filter(item => item.children))
<el-menu>
    <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path">
      <component class="icons" :is="item.icon"></component>
      <span>{{ item.label }}</span>
    </el-menu-item>
    <el-sub-menu v-for="subItem in hasChildren" :key="subItem.path" :index="subItem.path">
      <template #title>
        <component class="icons" :is="subItem.icon"></component>
        <span>{{ subItem.label }}</span>
      </template>
      <el-menu-item v-for="childItem in subItem.children" :key="childItem.path" :index="childItem.path">
        {{ childItem.label }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
```
②在渲染过程中判断有无子级，有的话按照子级方式渲染，无的话按照无子级方式渲染，菜单按照顺序，推荐
```javascript
<el-menu>
    <template v-for="item in list" :key="item.path">
      <template v-if="item.children">
        <el-sub-menu :index="item.path">
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
            <template #title>
              <component class="icons" :is="subItem.icon"></component>
              <span>{{ subItem.label }}</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.path">
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>

```
2.引入图片的几种方法
①使用静态资源， 将图片放在 public 目录中，例如 public/images/my-image.png
```javascript
 <img src="/images/my-image.png" alt="Description" />
```

②使用 src 目录中的图片, 图片放在 src/assets 目录中，可以直接在模板中使用 import 来引入它们
```javascript
<template>
  <div>
    <img :src="imageSrc" alt="Description" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import image from '@/assets/my-image.png'; // 使用别名 @ 指向 src 目录

const imageSrc = ref(image);
</script>

```

③动态图片加载，方式一 import.meta.url 来构建动态 URL
```javascript
<template>
  <div>
    <img :src="dynamicImageSrc" alt="Description" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 动态生成图片的 URL
const imagePath = './assets/my-image.png'; // 使用相对路径
const dynamicImageSrc = new URL(imagePath, import.meta.url).href;
</script>

```

④动态图片加载，方式二 使用 require 函数
```javascript
<template>
  <div>
    <img :src="requireImage('my-image.png')" alt="Description" />
  </div>
</template>

<script setup>
const requireImage = (imageName) => require(`@/assets/${imageName}`);
</script>

```

3.在vite.config.js中设置路径别名
```javascript
import path from "path";
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // '@'代表src目录
      components: path.resolve(__dirname, "./src/components"), // 例如，设置 'components' 别名
    },
  },
});
```


4.使用new URL()方法时，路径中不能使用别名，如‘@’，否则无法正确解析，因为别名是构建工具（如 Vite）处理的，new URL() 不能理解这些别名，它直接将其作为普通字符串处理
```javascript
// 错误写法
const getImg = imgName => new URL(`@/assets/${imgName}.jpg`, import.meta.url).href
// 正确写法
const getImg = imgName => new URL(`../assets/${imgName}.jpg`, import.meta.url).href
```

5.折叠侧边栏时不够平滑，解决方法：关闭动画
```javascript
<el-menu :collapse-transition="false">
```

6.环境变量①②③④⑤
①vue默认的环境变量是development
②配置、切换环境变量
配置环境：要在项目根目录创建三个文件，.env.development、.env.production、.env.test
```javascript
// .env.development vue3
VITE_APP_API_BASE_URL = http://api.development.com
VITE_APP_ENV = development

// .env.development vue2
VUE_APP_API_BASE_URL = http://api.development.com
VUE_APP_ENV = development

```
在代码中使用环境变量
```javascript
// vue3
const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

// vue2
const apiUrl = process.env.VUE_APP_API_BASE_URL;
```
注意，在vue3(vite)中，定义环境变量以 VITE_APP_ 开头，在vue2(webpack)中，以 VUE_APP_ 开头
使用环境变量，在vue3(vite)中，使用 import.meta.env 访问环境变量；在vue2(webpack)中，使用 process.env 访问环境变量

配置完环境变量后，axios的baseurl要替换为 import.meta.env.VITE_APP_API_BASE_URL (vue3),vue2同理替换为 process.env.VUE_APP_API_BASE_URL

切换环境：首先在package.json中配置
```javascript
"scripts": {
    // 开发环境
    "dev": "vite --mode development",
    // 生产环境
    "dev:production": "vite --mode production",
    // 测试环境
    "dev:test": "vite --mode test",
    // 生产环境打包
    "build": "vite build --mode production",
    // 测试环境打包
    "build:test": "vite build --mode test",
    // 打包后预览环境
    "serve": "vite preview"
  },
```
这些命令都是可以手动配的，带build的都是打包用的

第二步要切换到哪个环境，就在命令行进行切换
```javascript
// 生产环境
npm run dev:production
// 测试环境
npm run dev:test
```

7. 因为同源策略，要配置代理，解决跨域问题
在开发过程中配置代理，可以解决跨域问题，但也仅限于开发过程，在生产环境中还是要靠后端配置CORS跨域
在vite.config.js (vue3) 或在 vue.config.js (vue2)中配置
```javascript
// vite.config.js vue3
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',  // 目标服务器地址
        changeOrigin: true,                 // 是否修改请求头中的 Origin
        rewrite: (path) => path.replace(/^\/api/, ''),       // 将请求路径中的 /api 替换为空
        rewrite: (path) => path,  // 保留/api
        secure: false,                      // 忽略 HTTPS 自签名证书
      },
    },
  },
};

// vue.config.js vue2
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',  // 目标服务器地址
        changeOrigin: true,                 // 是否修改请求头中的 Origin
        pathRewrite: { '^/api': '' },       // 将请求路径中的 /api 替换为空
        pathRewrite: {  },                  // 保留/api
        secure: false,                      // 忽略 HTTPS 自签名证书
      },
    },
  },
};

```
注意vue2和vue3替换路径的写法不同 <br>
代理过程：<br>
1.假设baseURL为 http://localhost:3000, 请求路径 /api/getData，那么请求完整路径为 http://localhost:3000/api/getData<br>
2.根据配置的代理规则，/api开头的请求会被代理服务器转发到目标服务器上，即 https://api.example.com，又因为/api被替换为空，所以最终请求地址为 https://api.example.com/getData <br>
http://localhost:3000 是本地开发服务器 <br>
https://api.example.com 是目标服务器 <br>
代理配置 是在本地开发服务器中设置的，它负责将特定路径的请求转发到目标服务器，而不是作为单独的服务器存在 <br>

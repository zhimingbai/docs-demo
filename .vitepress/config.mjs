import { defineConfig } from "vitepress";
import { set_sidebar } from "./utils/auto_sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  base: "/docs-demo/",
  title: "我的博客",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",

    outline: {
      label: "目录",
      level: [2, 6],
    },

    nav: [
      // { text: "Home", link: "/" },
      {
        text: "前端",
        items: [{ text: "css", link: "/poem/css" }],
      },
      {
        text: "408",
        items: [{ text: "数据结构", link: "408/data-structure" }],
      },
      { text: "其他的东西", link: "/else" },
    ],

    // sidebar: [
    //   {
    //     text: "about",
    //     items: [
    //       { text: "个人介绍", link: "/about" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    // sidebar: { "/about": set_sidebar("about") },

    sidebar: false,
    aside: "left",

    socialLinks: [{ icon: "github", link: "https://github.com/zhimingbai" }],

    footer: {
      copyright: "Copyright © 2025 白芷茗",
    },

    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  },
});

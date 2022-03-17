/**
 * 项目环境配置
 * main服务中通过
 * declare var CONFIG:any; 文件顶部
 *
 * console.log(CONFIG); 获取得该值
 */
const baseConfig = {
  projectName: "xx",
  brandName: "YO组件",
  brandLogo: "images/logo.svg",
};

module.exports = {
  dev: {
    baseUrl: "/base-url/",
    routerMode: "history",
    httpHost: "http://localhost:5000",
    httpTicketKey: "cm-auth-token",
    ...baseConfig,
  },
  trial: {
    baseUrl: "/base-url/",
    routerMode: "history",
    httpHost: "x",
    httpTicketKey: "cm-auth-token",
    ...baseConfig,
  },
  prod: {
    baseUrl: "/yo-cm/",
    routerMode: "hash",
    httpHost: "x",
    httpTicketKey: "cm-auth-token",
    ...baseConfig,
  },
};

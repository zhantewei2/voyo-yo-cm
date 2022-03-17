import { nativeStore } from "./nativeStore";
import { userLoginByToken } from "@/request/common.request";
import CONFIG, { http } from "@env";

export interface UserState {
  accountName: string;
  nickName: string;
  position: string;
  token: string;
  isLogin: boolean;
}

export const userStore = nativeStore({
  namespace: "yo-ams-user",
  autoRestore: true, //自动从localstorage恢复state
  module: {
    namespaced: true,
    state: {
      accountName: "",
      nickName: "nick_name",
      position: "001",
      token: "",
      isLogin: true,
      projectName: CONFIG.projectName,
      brandName: CONFIG.brandName,
      brandLogo: CONFIG.brandLogo,
    },
    mutations: {},
    actions: {
      userAuth({ state, commit }) {
        // 首先内存状态需为已登陆
        if (!state.isLogin) return false;
        // 通过token调用登陆接口
        return userLoginByToken(state.token)
          .then((userInfo) => {
            // 登陆成功保存用户信息。
            commit("saveStore", {
              token: userInfo.token,
            });
            http.setGlobalHeader(CONFIG.httpTicketKey, userInfo.token);
            return true;
          })
          .catch((err) => {
            console.error("[校验失败]", err);
            return false;
          });
      },
    },
  },
});

import {
  HttpBeforeParams,
  HttpSuccessResult,
  HttpWrapperParams,
} from "@voyo/http";
import { Observer } from "rxjs";
import { map } from "rxjs/operators";
import CONFIG, { http } from "@env";

/**
 * 注册http 同时插入一个插件
 */
export const registryHttpPlugin = () => {
  http.addPlugin({
    priority: 10,
    name: "custom-ams",
    /**
     * 请求前修改params
     * @param params
     */
    before(params: HttpBeforeParams): Promise<void> {
      return Promise.resolve();
    },
    /**
     * 变更请求结果
     * @param httpObserver
     * @return Observer<HttpSuccessResult> 修改请求结果
     */
    wrapper({ http, httpObserver }: HttpWrapperParams) {
      return httpObserver.pipe(
        map((result) => {
          //console.log(result,5555);
          //可发起action
          //console.log(global.store);
          return result;
        }),
      );
    },
  });
  http.initPlugin();
  http.setHost(CONFIG.httpHost);
};

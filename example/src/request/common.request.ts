export const userLoginByToken = (token: string): Promise<any> => {
  /**
   * fetch token for login
   */
  return Promise.resolve({
    token: "xx",
    nickName: "nickName",
    accountName: "accountName",
  });

  // return http.xhr({
  //   method:"post",
  //   path:"/login",
  // }).toPromise();
};

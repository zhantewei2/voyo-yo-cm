import { VoyoHttp } from "@voyo/http";

declare let CONFIG: {
  baseUrl: string;
  routerMode: "history" | "hash";
  httpHost: string;
  httpTicketKey: string;
  projectName: string;
  brandName: string;
  brandLogo: string;
};

export default CONFIG;

export const http = new VoyoHttp({});

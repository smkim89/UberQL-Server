import dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";
import decodeJWT from "./utils/decodeJWT";

//console.log(process.env); process.evn는 환경설정을 가져옴.
const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";
const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async connectionParams => {
      const token = connectionParams["X-JWT"];
      if (token) {
        const user = await decodeJWT(token);
        console.log(user);
        if (user) {
          //subscriptions 의 resolvers의 context에 currentUser 전달. 
          //websocket은 Header의 정보로 커넥션이 연결이 됌.
          return {
            currentUser: user
          };
        }
      }
      throw new Error("No JWT. Can't subscribe");
    }
  }
};
 
const handleAppStart = () => console.log(`Listening on port ${PORT}`);
createConnection(connectionOptions).then(() => {
  app.start(appOptions, handleAppStart);
});
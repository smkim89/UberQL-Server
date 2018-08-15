import { GraphQLServer } from "graphql-yoga";
import cors  from "cors";
import helmet from "helmet";
import logger  from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { NextFunction, Response } from "../node_modules/@types/express-serve-static-core";
class App {
    public app : GraphQLServer;
    constructor(){
        //최신 자바스크립트에서는 객체의 key : value가 같은경우 하나만 입력해 줘도 된다. (schema)
        //미들 웨어가 먼저 시작됌.
        //resolvers에 context에 미들웨어에서 선행된 데이터들을 셋팅 해 줄수 있다.
        this.app = new GraphQLServer({
            schema,
            context: req => {
                return {
                  req: req.request
                };
            }
        });
        this.middlewares();
    }

    private middlewares = () : void => {
        //express nodejs framework graphql-yoga 안에 포함되어있음.
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
    }

    //헤더값에 값(토큰 값이) 있느지 체크하여 graphql-yoga가 실행되기전에 데이터를 읽어올 수 있다.
    private jwt = async (req, res:Response, next:NextFunction): Promise<void> => {
        const token = req.get("X-JWT");
        if (token) {
          const user = await decodeJWT(token);
          console.log(user);
          if (user) {
            req.user = user;
          } else {
            req.user = undefined;
          }
        }
        next();
      };
}

export default new App().app;
import { GraphQLServer } from "graphql-yoga";
import cors  from "cors";
import helmet from "helmet";
import logger  from "morgan";
import schema from "./schema";
class App {
    public app : GraphQLServer;
    constructor(){
        //최신 자바스크립트에서는 객체의 key : value가 같은경우 하나만 입력해 줘도 된다. (schema)
        this.app = new GraphQLServer({
            schema
        });
        this.middlewares();
    }

    private middlewares = () : void => {
        //express nodejs framework graphql-yoga 안에 포함되어있음.
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
    }
}

export default new App().app;
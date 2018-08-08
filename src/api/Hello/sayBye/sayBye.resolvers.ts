import { Greeting } from "../../../types/graph";

const resolvers = {
    Query : {
        sayBye : () : Greeting => {
            return {
                error : false,
                text : "hihi"
            }
        }
    }
    
};


export default resolvers;
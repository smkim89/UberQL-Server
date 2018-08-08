import { SayByeQueryArgs, sayByeResponse } from "../../../types/graph";

const resolvers = {
    Query : {
        sayBye : (_, args:SayByeQueryArgs) : sayByeResponse => {
            return {
                error : false,
                text : `hihi ${args.name}`
            }
        }
    }
    
};


export default resolvers;
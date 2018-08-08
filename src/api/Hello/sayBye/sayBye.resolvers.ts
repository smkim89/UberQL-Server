import { SayByeQueryArgs, sayByeResponse } from "../../../types/graph";



//args 또한 type으로 설정이 가능하다.
//sayBye.graphql파일에서 name파라메터를 설정하면 SayByeQueryArgs 메소드가 자동으로 생성된다.
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
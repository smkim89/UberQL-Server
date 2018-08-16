import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "../../../types/graph";
import { cleanNullArgs } from "../../../utils/cleanNullArgs";



const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (_, args: UpdateMyProfileMutationArgs, { req }) : Promise<UpdateMyProfileResponse>=> {
        const user: User = req.user;
        const notNullArgs = cleanNullArgs(args);
        
        try{
            //user의 id로 업데이트를 하는경우에는 instance가 없기 때문에 BeforeUpdate가 일어 나지 않는다.
            //아이디가 없을 수도 있기때문에,
            //BeforeUpdate가 필요한경우 해당 instance를 finde하고 save() 한다.
            if (args.password !== null) {
                user.password = args.password;
                user.save();
            }
            
            await User.update({ id: user.id }, { ...notNullArgs });
            
            return {
                ok : true,
                error : null
            }
        }catch(error){
            return {
                ok :false,
                error : error.message
            }
        }
        
      }
    )
  }
};
 export default resolvers;
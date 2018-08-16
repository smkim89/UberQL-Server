import User from "../../../entities/User";
import { ToggleDrivingModeResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
 const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: privateResolver(
      async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
        const user: User = req.user;
        if(user.isDriving == 0){
            user.isDriving = 1;
        }else{
            user.isDriving = 0;
        }
        user.save();
        return {
          ok: true,
          error: null
        };
      }
    )
  }
};
 export default resolvers;
import User from "../../../entities/User";
import {
  ReportMovementMutationArgs,
  ReportMovementResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { cleanNullArgs } from "../../../utils/cleanNullArgs";
 const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (_, args: ReportMovementMutationArgs, { req, pubSub }): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNullArgs = cleanNullArgs(args);
        try {
          await User.update({ id: user.id }, { ...notNullArgs });
          //pubsub연결되어있는 녀석에게 보냄 Subscription이름은 같아야함.
          pubSub.publish("driverUpdate", { DriversSubscription: user });
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};
 export default resolvers;
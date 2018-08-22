import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  RequestRideMutationArgs,
  RequestRideResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
 const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        if(user.isRiding == 1){
            try {
                const ride = await Ride.create({ ...args, passenger: user }).save();
                pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
                user.isRiding = 1;
                user.save();
                return {
                  ok: true,
                  error: null,
                  ride
                };
              } catch (error) {
                return {
                  ok: false,
                  error: error.message,
                  ride: null
                };
              }
        }else{
            return{
                ok: false,
                error: "you cant request 2 rides.",
                ride: null
            }
        }
      }
    )
  }
};
 export default resolvers;

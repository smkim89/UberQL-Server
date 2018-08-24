import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

 const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req, pubSub }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;
        if (user.isDriving == 1) {
          try {
              let ride : Ride | undefined;
              if(args.status == "ACCEPTED"){
                ride = await Ride.findOne(
                  {
                    id: args.rideId,
                    status: "REQUESTING"
                  },
                  { relations: ["passenger"] }
                );
                if(ride){
                  ride.status = "ACCEPTED";
                  ride.driver = user;
                  ride.save();
                  const chat = await Chat.create({
                    driver: user,
                    passenger: ride.passenger
                  }).save();
                  ride.chat = chat;
                  ride.save();
                }
              }else{
                ride = await Ride.findOne({
                  id: args.rideId,
                  driver: user
                });
              }
              if (ride) {
                ride.status = args.status;
                ride.save();
                pubSub.publish("rideUpdate", { RideStatusSubscription: ride });
                return {
                  ok: true,
                  error: null
                }
              } else {
                return {
                  ok: false,
                  error: "Cant update ride"
                };
              }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        }else{
          return {
            ok: false,
            error: "you are not driver."
          };
        }
      }
    )
  }
};
export default resolvers;
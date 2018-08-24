import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
 const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
        (payload, _, { context }) => {
        //(payload, _, { context }) _에 args가 온다. subscript에서 파라메터를 받을 경우 args로 받으면 됌
          const user: User = context.currentUser;
          const {
            RideStatusSubscription: { driverId, passengerId }
          } = payload;
          return user.id === driverId || user.id === passengerId;
        }
      )
    }
  }
};
 export default resolvers;
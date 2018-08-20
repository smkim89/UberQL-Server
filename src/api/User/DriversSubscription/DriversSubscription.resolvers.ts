import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";


//Subscription type은 웹소켓형태임. 연결시켜놓고 들어오기를 기다림..
//pubsub은 운영환경에서 사용안함.
const resolvers = {
    Subscription: {
      DriversSubscription: {
        //withFilter 는 iterator와 fillter function 두가지 파라메터를 갖는다.
        //filter function은 boolean값을 리턴하고, false를 리턴하면 listening하고 있는 유저에게 도달하지않는다.
        subscribe: withFilter(
          (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
          //payload 에는 요청자의 정보가 담겨있음. 
          //pubSub.publish("driverUpdate", { DriversSubscription: user });
          //{ context } 는 주체자의 정보가 담겨있음 context.currentUser;
          (payload, _, { context }) => {
            const user: User = context.currentUser;
            console.log(payload.DriversSubscription.email);
            console.log(context);
            //  query의 as처럼 이름을 바꾸는것임 변수선언.
            const {
              DriversSubscription: {
                lastLat: driverLastLat,
                lastLng: driverLastLng
              }
            } = payload;
            const { 
              lastLat: userLastLat, 
              lastLng: userLastLng 
            } = user;
            return (
              driverLastLat >= userLastLat - 0.05 &&
              driverLastLat <= userLastLat + 0.05 &&
              driverLastLng >= userLastLng - 0.05 &&
              driverLastLng <= userLastLng + 0.05
            );
          }
        )
      }
    }
  };
  export default resolvers;

//Subscription type은 웹소켓형태임. 연결시켜놓고 들어오기를 기다림..
//pubsub은 운영환경에서 사용안함.
const resolvers = {
    Subscription: {
      DriversSubscription: {
        subscribe: (_, __, { pubSub }) => {
          return pubSub.asyncIterator("driverUpdate");
        }
      }
    }
  };
  export default resolvers;
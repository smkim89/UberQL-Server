import { Resolvers } from "../../../types/resolvers";


const resolvers: Resolvers = {
    Query: {
        //{ req } 는 content.req 임.
      GetMyProfile: async (_, __, { req }) => {
        const { user } = req;
        return {
          ok: true,
          error: null,
          user
        };
      }
    }
  };
export default resolvers;
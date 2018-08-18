import { Between, getRepository  } from "typeorm";
import User from "../../../entities/User";
import { GetNearbyDriversResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
 const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: privateResolver(
      async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        try {
            // 찾는 where절에 연산자가 들어갈경우 getRepository를 사용해야 한다.
            const drivers: User[] = await getRepository(User).find({
              isDriving: 1,
              lastLat: Between(lastLat - 0.05, lastLat + 0.05),
              lastLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
            return {
              ok: true,
              error: null,
              drivers
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              drivers: null
            };
          }
      }
    )
  }
};
export default resolvers;
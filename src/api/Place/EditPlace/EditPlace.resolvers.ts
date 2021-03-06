import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { cleanNullArgs } from "../../../utils/cleanNullArgs";
 const resolvers: Resolvers = {
  Mutation: {
    EditPlace: privateResolver(
      async ( _, args: EditPlaceMutationArgs, { req } ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne({ id: args.placeId }); 
          //Place.findOne({ id: args.placeId }, {relations : ["user"]}); 관계형 데이터 가져올수있음 inner join
          if (place) {
            if (place.userId === user.id) {
              const notNull = cleanNullArgs(args);
              await Place.update({ id: args.placeId }, { ...notNull });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized"
              };
            }
          } else {
            return {
              ok: false,
              error: "Place not found"
            };
          }
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
import { Resolvers } from "../../../types/resolvers";
import { CompletePhoneVerificationMutationArgs, ComplatePhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";



const resolvers : Resolvers = {
    Mutation : {
        CompletePhoneVerification : async (_, args:CompletePhoneVerificationMutationArgs ):Promise<ComplatePhoneVerificationResponse> => {
            const { phoneNumber, key } = args;
            try{
                const verification = await Verification.findOne( { payload : phoneNumber, key });
                if(!verification){
                    return{
                        ok:false,
                        error:"wrong verification key!",
                        token:null
                    }
                } else {
                    verification.verified = 1;
                    verification.save();
                }
            }catch(error){
                return{
                    ok:false,
                    error:error.message,
                    token:null
                }
            }
            try {
                const user = await User.findOne({ phoneNumber });
                if (user) {
                  user.verifiedPhoneNumber = 1;
                  user.save();
                  const token = createJWT(user.id);
                  return {
                    ok: true,
                    error: null,
                    token
                  };
                } else {
                  return {
                    ok: true,
                    error: null,
                    token: null
                  };
                }
              } catch (error) {
                return {
                  ok: false,
                  error: error.message,
                  token: null
                };
              }
        }
    }
}

export default resolvers;
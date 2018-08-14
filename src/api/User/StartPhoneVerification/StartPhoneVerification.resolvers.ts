import Verification from "../../../entities/Verification";
import { Resolvers } from "../../../types/resolvers";
import { StartPhoneVerificationMutationArgs, StartPhoneVerificationResponse } from "../../../types/graph";
import { sendVerificationSMS } from "../../../utils/SendSms";



const resolvers : Resolvers = {
    Mutation : {
        StartPhoneVerification : async (_, args:StartPhoneVerificationMutationArgs ): Promise<StartPhoneVerificationResponse> => {
          const { phoneNumber } = args;
          try{
            const verificationOne = await Verification.findOne({ payload : phoneNumber });
            if(verificationOne){
                verificationOne.remove();
            }
            const newVerification = await Verification.create({
                payload: phoneNumber,
                target: "PHONE"
            }).save();
            await sendVerificationSMS(newVerification.payload, newVerification.key);

            return{
                ok:true,
                error:null
            }
          }catch(error){
              return{
                  ok: false,
                  error: error.message
              };
          }

        }
    }
};

export default resolvers;
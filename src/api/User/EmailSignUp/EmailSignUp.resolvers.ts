import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { EmailSignUpMutationArgs, EmailSignUpResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import { sendVerificationEmail } from "../../../utils/sendEmail";

 const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
      const { email } = args;
      try {
        const existingUser = await User.findOne({ email });
       
        if (existingUser) {
          const token = createJWT(existingUser.id);
          return {
            ok: false,
            error: "You should log in instead",
            token
          };
        } else {
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: 1
          });
          if (phoneVerification) {
            const newUser = await User.create({ ...args }).save();
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: "EMAIL"
              }).save();
              await sendVerificationEmail(
                newUser.email,
                newUser.fullName,
                emailVerification.key
              );
            }
            const token = createJWT(newUser.id);
            return {
              ok: true,
              error: null,
              token
            };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null
            };
          }

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
};
 export default resolvers;
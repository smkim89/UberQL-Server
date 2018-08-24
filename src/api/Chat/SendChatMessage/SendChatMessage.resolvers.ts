import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { SendChatMessageMutationArgs, SendChatMessageResponse } from "../../../types/graph";

import Message from "../../../entities/Message";
import Chat from "../../../entities/Chat";
import User from "../../../entities/User";

const resolvers : Resolvers = {
    Mutation : {
        SendChatMessage : privateResolver(async(_, args:SendChatMessageMutationArgs , { req, pubSub } ) : Promise<SendChatMessageResponse> => {
            const user: User = req.user;
            
            try{
                const chat = await Chat.findOne({ id: args.chatId });
                if(chat){
                    if(chat.passengerId == user.id || chat.driverId == user.id){
                        const message = await Message.create({
                            text: args.text,
                            chat,
                            user
                          }).save();
                          pubSub.publish("newChatMessage", {
                            MessageSubscription: message
                          });
                        return {
                            ok: true,
                            error: null,
                            message
                        }
                    }else{
                        return {
                            ok: false,
                            error: "you have not auth",
                            message: null
                        }
                    }
                }else{
                    return {
                        ok: false,
                        error: "not found chat",
                        message: null
                    }
                }
            }catch(error){
                return {
                    ok: false,
                    error: error.message,
                    message: null
                }
    
            }
            
            

        })
    }


}

export default resolvers;
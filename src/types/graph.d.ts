export const typeDefs = ["type Query {\n  sayBye(name: String!): sayByeResponse!\n  sayHello: String!\n}\n\ntype sayByeResponse {\n  error: Boolean!\n  text: String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: sayByeResponse;
  sayHello: string;
}

export interface SayByeQueryArgs {
  name: string;
}

export interface sayByeResponse {
  error: boolean;
  text: string;
}

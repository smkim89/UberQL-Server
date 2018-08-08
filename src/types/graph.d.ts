export const typeDefs = ["type Query {\n  sayBye: Greeting!\n  sayHello: String!\n}\n\ntype Greeting {\n  error: Boolean!\n  text: String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: Greeting;
  sayHello: string;
}

export interface Greeting {
  error: boolean;
  text: string;
}

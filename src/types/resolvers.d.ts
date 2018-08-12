
//기본적인 Resolver 파라메터
//export type Resolvers = (parent, args, content, info) => {};

export type Resolver = (parent: any, args: any, context: any, info: any) => any;
export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}
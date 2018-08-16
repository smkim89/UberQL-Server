//파라메터로 받은 function을 다시 되돌려줌. JWT체크하고 이상없으면 그냥 하던일 해~ (아규먼트가 resolverFunction임)

const privateResolver = resolverFunction => async (parent,args,context,info) => {
    if (!context.req.user) {
      throw new Error("No JWT. I refuse to proceed");
    }
    const resolved = await resolverFunction(parent, args, context, info);
    return resolved;
  };
   export default privateResolver;
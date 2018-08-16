

export const cleanNullArgs = (args: Object) => {
    const notNullArgs = {};
    Object.keys(args).forEach(key => {
        if(args[key] !== null){
            notNullArgs[key] = args[key];
        }
    })
    return notNullArgs; 
}
/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_,{input} , ctx){
      return ctx.models.Pet.findMany();
    },
    pet(_,input , ctx){
      console.log('query=>pet')
      return ctx.models.Pet.findOne (input);
    }
  },
  Mutation: {
    newPet(_,{input},ctx){
      console.log(input)
      const pet = ctx.models.Pet.create(input)
      console.log(pet)
      console.log("akjdhsajkfa")
      return pet
    }
   },
  Pet: {
    owner(_,__ , ctx){
      console.log('pet=>owner')
      return  ctx.models.User.findOne()
    }
  }
  ,
  User: {
    pets(user,_,ctx){
      return ctx.models.Pet.findMany()
    }
  }
}

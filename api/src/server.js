const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const {models, db} = require('./db')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context({req}){
    const jwt = req.headers.authorization;
    return {models , db}
  }
})

console.log("asdljksakld");

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})

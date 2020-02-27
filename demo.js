const gql = require('graphql-tag')
const {ApolloServer} = require('apollo-server')
const typeDefs = gql`
type User {
    email: String!
    avatar: String
    friends: [User]!
}
 type Query {
     me: User!
 }
`
const resolver = {
    Query:{
        me(){
            return {
                email: 'rac.sru3@gmail.com',
                avatar: 'hsdlkfjsd',
                friends: []
            }
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolver
})

server.listen(4000).then(()=>console.log("Gql at port 4000"));

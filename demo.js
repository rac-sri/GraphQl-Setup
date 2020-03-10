const gql = require('graphql-tag');
const {ApolloServer} = require('apollo-server')
const typeDefs=gql`
type User{
    email: String!
    avatar: String
    friends: [User]
}
    type Query{
        me: User!
    }

`
const resolvers={
    Query:{
        me(){
            return {
                email: "jkdsfhjk@jksdf",
                avatar: 'dishfsjkdf',
                friends:[]
            }
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000).then('Gql running');
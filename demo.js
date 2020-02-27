const gql = require('graphql-tag')
const {ApolloServer} = require('apollo-server')
const typeDefs = gql`
type User {
    email: String!
    avatar: String
    friends: [User] 
}
 type Query {
     me: User!
     shoes(input:ShoesInput): [Shoe]!
 }

 type Shoe {
     brand: String!
     size: Int!
 }

 input ShoesInput{
     brand:String
     size: Int
 }
`
const resolver = {
    Query:{
        shoes(_, {input}){
            return [{brand:'nike', size:12},
                    {brand:'puma', size:10}]
        },
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

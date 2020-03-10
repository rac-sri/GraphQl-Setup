const gql = require('graphql-tag');
const {ApolloServer} = require('apollo-server')
const typeDefs=gql`
"""
this is a documentation
"""
enum ShoeType{
    JORDAN
    RACHIT
    KAKASHI
}
type User{
    email: String!
    avatar: String
    friends: [User]
}
type Shoe{
    brand: ShoeType!
    size:Int!
}
input ShoesInput{
    brand: ShoeType,
    size:Int
}
input NewShoeInput{
    brand:ShoeType!
    size:Int!
}
    type Query{
        me: User!
        shoes(input : ShoesInput):[Shoe]!
    }

    type Mutation{
        newShoe(input: NewShoeInput!):Shoe!
    }
`
const resolvers={
    Query:{
        shoes(_,{input}){
            return [{brand:'nike',size:12},
                        {brand:'adidas', size:11}].filter(shoe=>shoe.brand===input.brand)
        },
        me(){
            return {
                email: "jkdsfhjk@jksdf",
                avatar: 'dishfsjkdf',
                friends:[]
            }
        }

    },
    Mutation:{
            
        newShoe(_,{input}){
            return input
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000).then('Gql running');
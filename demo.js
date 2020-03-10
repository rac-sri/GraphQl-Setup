const gql = require('graphql-tag');
const {ApolloServer} = require('apollo-server')
const typeDefs=gql`
type User{
    email: String!
    avatar: String
    friends: [User]
}
type Shoe{
    brand: String!
    size:Int!
}
input ShoesInput{
    brand: String,
    size:Int
}
input NewShoeInput{
    brand:String!
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
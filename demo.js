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
interface Shoe{  #describes the common field to clean up queries
    brand: ShoeType! #cant query a shoe
    size:Int!#client can ask for these common fields , if without specification
}

type Sneaker implements Shoe {
    brand: ShoeType!
    size:Int!
    sport: String!
}

type Boot implements Shoe {
    brand: ShoeType!
    size:Int!
    hasGrip: Boolean!
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
            return [{brand:'nike',size:12 , sport:'basketball'},
                        {brand:'adidas', size:11 , hasGrip:true}].filter(shoe=>shoe.brand===input.brand)
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
    },
    Shoe:{
        __resolveType(shoe){
            if(shoe.sport) return Sneaker
            return 'Boot'
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000).then('Gql running');
const gql = require('graphql-tag');;
const {ApolloServer} = require('apollo-server')

const user={
    id :1,
    email: "jkdsfhjk@jksdf",
    avatar: 'dishfsjkdf',
    shoes:[]
}
const typeDefs=gql`
"""
this is a documentation
"""
union Footwear = Sneaker | Boot

enum ShoeType{
    JORDAN
    RACHIT
    KAKASHI
}
type User{
    email: String!
    avatar: String
shoes:[Shoe]!
}
interface Shoe{  #describes the common field to clean up queries
    brand: ShoeType! #cant query a shoe
    size:Int!#client can ask for these common fields , if without specification
    user:User!
}

type Sneaker implements Shoe {
    brand: ShoeType!
    size:Int!
    user:User!

    sport: String!
}

type Boot implements Shoe {
    brand: ShoeType!
    size:Int!
    user:User!

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
            return [{brand:'nike',size:12 , sport:'basketball' , user : 1},
                        {brand:'adidas', size:11 , hasGrip:true , user:1}];
        },
        me(){
            return {
                id :1,
                email: "jkdsfhjk@jksdf",
                avatar: 'dishfsjkdf',
                shoes:[]
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
        },

    },
    Sneaker:{
        user(shoe){
            return user;
        }
    }
    Boot:{        user(shoe){
        return user;
    }}
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000).then('Gql running');
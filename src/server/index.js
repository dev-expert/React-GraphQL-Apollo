const express=require('express');
const graphqlHTTP=require('express-graphql');
const {GraphQLSchema,GraphQLObjectType,GraphQLInt,GraphQLString,GraphQLList,graphql} =require("graphql");
var cors = require('cors');

const users=[
  {id:1,name:"Ram Kumar",age:20},
  {id:2,name:"Raman",age:5},
  {id:3,name:"John Doe",age:24},
];

const UserType=new GraphQLObjectType({
  name:'Users',
  fields:{
    id:{
      type:GraphQLInt
    },
    name:{
      type:GraphQLString
    },
    age:{
      type:GraphQLInt
    }

  }
});


const schema=new GraphQLSchema({
  query:new GraphQLObjectType({
    name:'Query',
    fields:()=>({
      users:{
        type:GraphQLList(UserType),
        resolve:(parent,args)=>{
          return users;
        }
      },
      user:{
        type:UserType,
        args:{
          id:{
            type:GraphQLInt
          }
        },
        resolve:(parent,{id})=>{
          return users.find(user=>user.id === id);
        }
      },
      multipleUser:{
        type:GraphQLList(UserType),
        args:{
          ids:{
            type:GraphQLList(GraphQLInt)
          }
        },
        resolve:(parent,args)=>{
          return users.filter(x=>args.ids.includes(x.id));
        }
      }
    })
  }),
  mutation:new GraphQLObjectType(
    {
      name:"UserMutation",
      fields:{
        createUser:{
          type:UserType,
          args:{
            id:{
              type:GraphQLInt
            },
            name:{
              type:GraphQLString
            },
            age:{
              type:GraphQLInt
            }
          },
          resolve:(parent,args)=>{
            users.push(args);
            return args;
          }
        },
        updateUser:{
          type:UserType,
          args:{
            id:{
              type:GraphQLInt
            },
            name:{
              type:GraphQLString
            }
          },
          resolve:(parent,args)=>{
            const index=users.findIndex(x=>x.id===args.id);
            if(index > -1){
              users[index].name = args.name;
            }
            return users[index];
          }
        }
      }
      
    }
  )
 
});
const app=express();

// Then use it before your routes are set up:
app.use(cors());

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql:true
}))


app.listen(5000,()=>console.log("Listen done 5000"))



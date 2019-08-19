const express=require('express');
const graphqlHTTP=require('express-graphql');
const Mongoose=require("mongoose");
const {GraphQLSchema,GraphQLNonNull,GraphQLObjectType,GraphQLInt,GraphQLString,GraphQLList,graphql} =require("graphql");
var cors = require('cors');

const users=[
  {id:1,name:"Ram Kumar",age:20},
  {id:2,name:"Raman",age:5},
  {id:3,name:"John Doe",age:24},
];


const app=express();



Mongoose.connect("mongodb://localhost/graph_mongo");

const UserModel=Mongoose.model("users",{
  name:String,
  age:Number
});

const UserType=new GraphQLObjectType({
  name:'Users',
  fields:{
    id:{
      type:GraphQLString
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
          //return users;
          return UserModel.find().exec();
        }
      },
      user:{
        type:UserType,
        args:{
          id:{
            type:GraphQLNonNull(GraphQLString)
          }
        },
        resolve:(parent,args)=>{
          //return users.find(user=>user.id === id);
          return UserModel.findById(args.id).exec();
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
            name:{
              type:GraphQLString
            },
            age:{
              type:GraphQLInt
            }
          },
          resolve:(parent,args)=>{
            //users.push(args);
            //return args;
            var user=new UserModel(args);
            return user.save();
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

// Then use it before your routes are set up:
app.use(cors());

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql:true
}))

app.listen(5000,()=>console.log("Listen done 5000"))



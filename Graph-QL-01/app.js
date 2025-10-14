const express = require("express");
const {ApolloServer} = require("@apollo/server");
const { expressMiddleware } = require('@as-integrations/express5');

const PORT = Number(process.env.PORT) || 8000;

async function startServer(){
    const app = express();

    app.use(express.json());

    const server = new ApolloServer({
        typeDefs:`
           type Book {
           title: String
           author: String
           }

           type Query{
            getBooks: [Book],
            books:[Book]
           }
        `,
        resolvers:{
            Query:{
                getBooks:()=>
                    [
                        { title: "Book 1", author: "Author A" },
                        { title: "Book 2", author: "Author B" },
                    ]
                ,
                books: () => [
                    { title: "Book 1", author: "Author A" },
                    { title: "Book 2", author: "Author B" },
                  ],
            }
        },
    })

    await server.start()


    app.get("/",(req,res)=>{
         res.json({msg:"Hello using GraphQL"});
    })
    app.use("/graphql",expressMiddleware(server));

    app.listen(PORT,()=>console.log(`Server Up and running at PORT : ${PORT}` ));
}

startServer()
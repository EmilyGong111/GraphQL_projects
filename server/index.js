const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db")
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

connectDB()

//play with the query at localhost:5000/graphql, query structure follow schema
app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === "development",
}))

app.listen(port, console.log(`server is running on ${port}`))

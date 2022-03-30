const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const schema = require('../schema/schema')
const mongoose = require('mongoose')

const app = express()
const PORT = 3005
const  mongoAtlasUri = 'mongodb+srv://killrill:killrill@cluster0.v2hz2.mongodb.net/film?retryWrites=true&w=majority'

mongoose.connect(
    mongoAtlasUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!')
})
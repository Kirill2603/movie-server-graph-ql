const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql

const Movies = require('../models/movie')
const Directors = require('../models/directors')

// const movies = [
//     {id: '1', name: 'Movie1', genre: "WFF?", directorId: '1'},
//     {id: '2', name: 'Movie2', genre: "WFF?", directorId: '2'},
//     {id: '3', name: 'Movie3', genre: "WFF?", directorId: '3'},
//     {id: '4', name: 'Movie4', genre: "WFF?", directorId: '4'},
//     {id: '5', name: 'Movie5', genre: "WFF?", directorId: '4'},
//     {id: '6', name: 'Batman!', genre: "Batman movie", directorId: '5'},
//     {id: '7', name: 'Batman Forever', genre: "Batman movie", directorId: '5'},
//     {id: '8', name: 'Batman and Robin', genre: "Batman movie", directorId: '5'},
// ]
//
// const directors = [
//     {id: '1', name: 'Joker', age: 30},
//     {id: '2', name: 'Robin', age: 30},
//     {id: '3', name: 'Mr. freeze', age: 30},
//     {id: '4', name: 'Clark Kent', age: 30},
//     {id: '5', name: 'Batman!!!', age: 28},
// ]

console.log(Movies.find({}))

const MovieType = new GraphQLObjectType({
    name: 'Movies',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, args) {
                // return directors.find(director => director.id === parent.id)
                return Directors.findById(parent.directorId)
            }
        },
    }),
})

const DirectorType = new GraphQLObjectType({
    name: 'Directors',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies.filter(movie => movie.directorId === parent.id)
                return Movies.find({directorId: parent.id})
            },
        },
    }),
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return movies.find(movie => movie.id === args.id)
                return Movies.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve (parent, args) {
                // return movies
                return Movies.find({})
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return directors.find(director => director.id === args.id)
                return Directors.findById(args.id)
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve (parent, args) {
                // return directors
                return Directors.find({})
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: Query,
})

// qt 6244afff1d1faf3e0fa6ed27

// gr 6244b0751d1faf3e0fa6ed2a
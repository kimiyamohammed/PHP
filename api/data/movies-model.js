const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:1,
        max:120
    }
    
});

// const productionSchema= new mongoose.Schema({
//     name: {
//         type: String,
//         "default": ""
//     },
//     location: {
//         state: {
//             type:String,
//             default:""
//         },
//         coordinates:{
//             type: [Number],
//             index:"2dshpere"
//         }
//     }
// });
    


const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    genre:String,
    casts:[actorSchema],
    //production: productionSchema
    production:{
        prodName: {
            type: String,
            "default": ""
        },
        location: {
            state: {
                type:String,
                default:""
            },
            coordinates:{
                type: [Number],
                index:"2dsphere"
            }
        }
    }
});

module.exports = mongoose.model(process.env.MOVIE_MODEL,movieSchema,"movies");
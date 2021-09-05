import mongoose from 'mongoose';
const { Schema } = mongoose;

const movieSchema = new Schema({
  imdbID: {type: String, unique: true, required: true},
  Title: {type: String, required: true},
  Year: {type: Number, required: false},
  Genre: {type: String, required: false},
  Metascore: {type: Number, required: false},
  Personal_rating: {type: Number, required: false}
})

export const movie = mongoose.model('movie', movieSchema);


import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    updatedAt: { type: Date, required: true }  // Für die Konfliktlösung
});

const Note = mongoose.model('Note', noteSchema);

export default Note;


import express from 'express';
import mongoose from 'mongoose';
import noteRoutes from './routes/note.js';

const app = express();
app.use(express.json());  // Für JSON-Anfragen
const PORT = 3000;

// MongoDB-Verbindung
mongoose.connect('mongodb://database_notes:27017/notes')
    .then(() => console.log('MongoDB verbunden'))
    .catch((err) => console.log('MongoDB Verbindungsfehler:', err));


app.use('/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

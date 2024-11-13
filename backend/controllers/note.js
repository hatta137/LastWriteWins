import Note from "../models/note.js";


export const syncChanges = async (request, response) => {
    const notes = request.body.notes;  // Erwartet ein Array von Notizen vom Client
    const syncedNotes = [];

    for (let noteData of notes) {
        const { id, title, description, updatedAt } = noteData;

        // Versuche, die Notiz in der DB zu finden
        let note = await Note.findById(id);

        if (!note) {
            // Falls die Notiz nicht existiert, erstellen wir eine neue
            note = new Note({
                _id: id, // Verwende die ID des Clients
                title,
                description,
                updatedAt: new Date(updatedAt),
            });
            await note.save();
            syncedNotes.push(note);
        } else {
            // Falls die Notiz existiert, prüfen wir den Zeitstempel
            if (new Date(updatedAt) > note.updatedAt) {
                // Wenn die Client-Daten neuer sind, aktualisieren wir den Eintrag
                note.title = title;
                note.description = description;
                note.updatedAt = new Date(updatedAt);
                await note.save();
            }
            // Egal ob aktualisiert oder nicht, die aktuelle Version zur Antwort hinzufügen
            syncedNotes.push(note);
        }
    }

    // Sende die aktuelle Liste der Notizen als Antwort an den Client
    response.json({ notes: syncedNotes });
}

export const getNotes = async (request, response) => {
    try {
        const notes = await Note.find();
        response.json({ notes });
    } catch (error) {
        console.error(error);
    }
}

export const getNotesById = async (request, response) => {
    const note = await Note.findById(request.params.id);
    if (!note) {
        return response.status(404).json({ error: 'Notiz nicht gefunden' });
    }
    response.json(note);
}

export const createNote = async (request, response) => {
    const { title, description } = request.body;
    const note = new Note({
        title,
        description,
        updatedAt: new Date(),
    });
    await note.save();
    response.status(201).json(note);
}

export const updateNoteById = async (request, response) => {
    const { title, description } = request.body;
    const note = await Note.findById(request.params.id);

    if (!note) {
        return response.status(404).json({ error: 'Notiz nicht gefunden' });
    }

    note.title = title;
    note.description = description;
    note.updatedAt = new Date();
    await note.save();

    response.json(note);
}

export const deleteNoteById = async (request, response) => {
    const note = await Note.findByIdAndDelete(request.params.id);
    if (!note) {
        return response.status(404).json({ error: 'Notiz nicht gefunden' });
    }
    response.status(204).send(); // Keine Rückgabedaten erforderlich
}
import express from "express";
import {syncChanges, getNotes, getNotesById, updateNoteById, deleteNoteById, createNote} from "../controllers/note.js";

const router = express.Router();

router.post('/sync', syncChanges);
router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNotesById);
router.put('/:id', updateNoteById);
router.delete('/:id', deleteNoteById);

export default router;
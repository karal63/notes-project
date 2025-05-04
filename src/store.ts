import { defineStore } from "pinia";
import { ref } from "vue";
import type { Note, Tag, editNoteProps } from "./types";

export const useGlobalStore = defineStore("storeId", () => {
    // make exactly this way because JSON.parse expects a string, so you need to convert you example array into json
    const notes = ref<Note[]>(
        JSON.parse(
            localStorage.getItem("NOTES") ||
                JSON.stringify([
                    {
                        name: "hello",
                        desc: "123",
                        tags: [{ id: 0, name: "React" }],
                        id: 0,
                    },
                ])
        ) as Note[]
    );
    const addNote = (newNote: Note) => {
        notes.value = [
            ...notes.value,
            { ...newNote, id: getNextId(notes.value) },
        ];
        localStorage.setItem("NOTES", JSON.stringify(notes.value));
    };

    const deleteNote = (id: number) => {
        notes.value = notes.value.filter((note) => note.id !== id);
        localStorage.setItem("NOTES", JSON.stringify(notes.value));
    };

    const editNoteName = ({ id, newName }: editNoteProps) => {
        notes.value = notes.value.map((note) => {
            if (note.id === id) {
                ``;
                return {
                    ...note,
                    name: newName,
                };
            }
            return note;
        });
        localStorage.setItem("NOTES", JSON.stringify(notes.value));
    };

    const getNextId = (items: Note[] | Tag[]) => {
        return items.length > 0
            ? Math.max(...items.map((item: any) => item.id)) + 1
            : 0;
    };

    return { notes, addNote, deleteNote, editNoteName };
});

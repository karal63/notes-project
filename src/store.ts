import { defineStore } from "pinia";
import { ref } from "vue";
import type { Note } from "./types";

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
    const addNote = (newNote: any) => {
        notes.value = [...notes.value, { ...newNote, id: getNextId(notes) }];
        localStorage.setItem("NOTES", JSON.stringify(notes.value));
    };

    const deleteNote = (id?: number) => {
        notes.value = notes.value.filter((note) => note.id !== id);
        localStorage.setItem("NOTES", JSON.stringify(notes.value));
    };

    const editNoteName = (id?: number, newName?: string) => {
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

    const getNextId = (items: any) => {
        return items.value.length > 0
            ? Math.max(...items.value.map((item: any) => item.id)) + 1
            : 0;
    };

    return { notes, addNote, deleteNote, editNoteName };
});

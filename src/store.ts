import { defineStore } from "pinia";
import { ref } from "vue";
import type { Note } from "./types";

export const useGlobalStore = defineStore("storeId", () => {
    const notes = ref<Note[]>([
        {
            name: "hello",
            desc: "123",
            tags: [{ id: 0, name: "React" }],
            id: 0,
        },
    ]);
    const addNote = (newNote: any) => {
        notes.value = [...notes.value, { ...newNote, id: getNextId(notes) }];
    };

    const getNextId = (items: any) => {
        return items.value.length > 0
            ? Math.max(...items.value.map((item: any) => item.id)) + 1
            : 0;
    };

    return { notes, addNote };
});

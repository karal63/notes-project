<template>
    <div class="flex justify-between items-center py-10">
        <h1 class="text-3xl">Notes</h1>
        <!-- buttons -->
        <div class="flex gap-2">
            <button
                class="bg-blue-500 text-white px-5 py-1 rounded-md cursor-pointer"
            >
                Create
            </button>
            <button
                class="px-5 py-1 rounded-md border border-gray-300 cursor-pointer"
            >
                Edit
            </button>
        </div>
    </div>

    <NoteForm :tags="tags" @addTag="addTag" @deleteTag="deleteTag" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import NoteForm from "../components/NoteForm.vue";
import type { Tag } from "../types";

const tags = ref<Tag[]>([
    {
        name: "Math",
        id: 5,
    },
]);

const addTag = (newTag: string) => {
    const maxIndex =
        tags.value.length > 0
            ? Math.max(...tags.value.map((tag: any) => tag.id)) + 1
            : 0;

    tags.value = [
        ...tags.value,
        {
            name: newTag,
            id: maxIndex,
        },
    ];
};

const deleteTag = (id: number) => {
    tags.value = tags.value.filter((tag: any) => tag.id !== id);
};
</script>

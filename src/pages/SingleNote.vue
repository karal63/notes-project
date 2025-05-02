<template>
    <div class="flex justify-between items-center py-10">
        <div>
            <h1 class="text-3xl">{{ currentNote?.name }}</h1>
            <ul class="flex gap-1 mt-4">
                <li
                    v-for="tag in currentNote?.tags"
                    class="bg-blue-500 rounded-md px-2 text-sm py-1 text-white"
                >
                    {{ tag.name }}
                </li>
            </ul>
        </div>
        <!-- buttons -->
        <div class="flex gap-2">
            <button
                class="bg-blue-500 text-white px-5 py-1 rounded-md cursor-pointer"
            >
                Edit
            </button>

            <button
                @click="deleteExistNote"
                class="px-5 py-1 rounded-md border border-red-400 text-red-400 cursor-pointer"
            >
                Delete
            </button>

            <RouterLink
                to="/"
                class="px-5 py-1 rounded-md border border-gray-300 cursor-pointer"
            >
                Back
            </RouterLink>
        </div>
    </div>

    <div>
        {{ currentNote?.desc }}
    </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "../store";

const store = useGlobalStore();

const route = useRoute();
const noteID = route.params.id;
const router = useRouter();

const currentNote = store.notes.find((note) => note.id === Number(noteID));

if (!currentNote) {
    router.push("/");
}

const deleteExistNote = () => {
    store.deleteNote(currentNote?.id);
    router.push("/");
};

console.log(currentNote);
</script>

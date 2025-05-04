<template>
    <div class="flex justify-between items-center py-10">
        <h1 class="text-3xl">Notes</h1>
        <!-- buttons -->
        <div class="flex gap-2">
            <RouterLink
                to="/new"
                class="bg-blue-500 text-white px-5 py-1 rounded-md cursor-pointer"
            >
                Create
            </RouterLink>
            <button
                @click="modelOpen = true"
                class="px-5 py-1 rounded-md border border-gray-300 cursor-pointer"
            >
                Edit
            </button>
        </div>
    </div>

    <form class="flex gap-5">
        <div class="w-1/2">
            <label class="block pb-2 text-gray-500">Title</label>
            <input
                type="text"
                v-model="noteName"
                class="border border-gray-300 w-full rounded-md py-1 px-3 outline-none h-[40px]"
            />
        </div>

        <div class="w-1/2">
            <label class="block pb-2 text-gray-500">Tags</label>
            <div
                class="relative border border-gray-300 w-full rounded-md py-1 px-3 outline-none h-[40px] flex justify-between"
            >
                <div class="flex gap-1">
                    <div
                        v-for="tag in tags"
                        class="rounded-md px-2 flex items-center gap-2 bg-gray-200"
                    >
                        {{ tag.name }}
                        <button
                            @click="() => deleteTag(tag.id)"
                            class="text-lg"
                        >
                            &times;
                        </button>
                    </div>
                </div>
                <input
                    type="text"
                    v-model="tagName"
                    @input="tagsDropListOpen = true"
                    class="outline-none w-full ml-3"
                />

                <button
                    @click.prevent="tagsDropListOpen = !tagsDropListOpen"
                    class="cursor-pointer"
                >
                    &#xf042;
                </button>

                <div
                    v-if="tagsDropListOpen"
                    class="absolute top-[120%] left-0 w-full border border-gray-300 bg-white"
                >
                    <button
                        @click.prevent="tagName = 'React'"
                        class="flex justify-start w-full px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                        React
                    </button>
                    <button
                        class="flex justify-start w-full pl-4 py-2 hover:bg-blue-100 cursor-pointer"
                        @click.prevent="addTag"
                    >
                        Add "{{ tagName }}"
                    </button>
                </div>
            </div>
        </div>
    </form>

    <div class="grid grid-cols-3 gap-4 mt-10">
        <RouterLink :to="`/${note.id}`" v-for="note in sortedNotes">
            <div
                class="h-[150px] border border-gray-300 rounded-md shadow-md hover:shadow-xl transition-all cursor-pointer p-4 flex flex-col justify-center items-center"
            >
                <h1 class="text-2xl font-semibold">
                    {{ note.name }}
                </h1>
                <ul class="flex gap-1 mt-2">
                    <li
                        v-for="tag in note.tags"
                        class="bg-blue-500 rounded-md px-2 text-sm py-1 text-white"
                    >
                        {{ tag.name }}
                    </li>
                </ul>
            </div>
        </RouterLink>
    </div>

    <Modal v-if="modelOpen" @hideModal="modelOpen = false" />
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useGlobalStore } from "../store";
import { ref, watch, watchEffect } from "vue";
import type { Note, Tag } from "../types";
import Modal from "../components/Modal.vue";
const store = useGlobalStore();

const noteName = ref<string>("");
const tags = ref<Tag[]>([]);
const tagName = ref<string>("");

const tagsDropListOpen = ref(false);
const modelOpen = ref(false);

const sortedNotes = ref<Note[]>([...store.notes]);

const addTag = () => {
    const maxIndex =
        tags.value.length > 0
            ? Math.max(...tags.value.map((tag: any) => tag.id)) + 1
            : 0;

    tags.value = [
        ...tags.value,
        {
            name: tagName.value,
            id: maxIndex,
        },
    ];

    tagName.value = "";
    tagsDropListOpen.value = false;
};

const deleteTag = (id: number) => {
    tags.value = tags.value.filter((tag: any) => tag.id !== id);
};

watchEffect(() => {
    sortedNotes.value = store.notes;
});

watch([noteName, tags], () => {
    sortedNotes.value = store.notes.filter((note) => {
        let titleMatch = true;
        if (noteName.value.length !== 0) {
            titleMatch = note.name
                .toLowerCase()
                .includes(noteName.value.toLowerCase());
        }

        let tagsMatch = true;
        if (tags.value.length !== 0) {
            tagsMatch =
                tags.value.length > 0 &&
                tags.value.every((selectedTag) =>
                    note.tags.some(
                        (noteTag) =>
                            noteTag.name.toLowerCase() ===
                            selectedTag.name.toLowerCase()
                    )
                );
        }

        return titleMatch && tagsMatch;
    });
});
</script>

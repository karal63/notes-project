<template>
    <form @submit.prevent="onSubmit">
        <div class="flex gap-5">
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
                                @click.prevent="() => deleteExistingTag(tag.id)"
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
                        <!-- show here all previously used list of tags -->
                        <button
                            @click.prevent="tagName = 'React'"
                            class="flex justify-start w-full px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                            React
                        </button>
                        <button
                            @click.prevent="addNewTag"
                            class="flex justify-start w-full pl-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                            Add "{{ tagName }}"
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col mt-5">
            <label class="block pb-2 text-gray-500">Description</label>
            <textarea
                v-model="noteDesc"
                rows="10"
                class="border border-gray-300 rounded-md outline-none p-3"
            ></textarea>
        </div>

        <div class="flex justify-end gap-2 mt-5">
            <button
                type="submit"
                class="bg-blue-500 text-white px-5 py-1 rounded-md cursor-pointer"
            >
                Create
            </button>
            <RouterLink
                to="/"
                class="px-5 py-1 rounded-md border border-gray-300 cursor-pointer"
            >
                Cancel
            </RouterLink>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Tag } from "../types";
import { useGlobalStore } from "../store";
import { useRouter } from "vue-router";

const store = useGlobalStore();
const router = useRouter();

const props = defineProps<{ tags: Tag[] }>();
const emit = defineEmits<{
    (e: "addTag", tagName: string): void;
    (e: "deleteTag", tagName: number): void;
}>();

const noteName = ref<string>("");
const noteDesc = ref<string>("");
const tagName = ref<string>("");
const tagsDropListOpen = ref(false);

const onSubmit = () => {
    store.addNote({
        name: noteName.value,
        desc: noteDesc.value,
        tags: props.tags,
    });
    router.push("/");
};

const addNewTag = () => {
    emit("addTag", tagName.value);
    tagName.value = "";
    tagsDropListOpen.value = false;
};

const deleteExistingTag = (id: number) => {
    emit("deleteTag", id);
};
</script>

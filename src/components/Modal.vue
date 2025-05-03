<template>
    <div ref="modal" class="absolute w-full h-full top-0 right-0 bg-black/10">
        <div
            class="absolute left-1/2 transform -translate-[50%] top-1/2 border border-gray-300 shadow-xl px-7 py-4 w-[600px] bg-white rounded-md"
        >
            <h1 class="text-left text-2xl font-semibold">Edit notes</h1>

            <ul class="mt-10 flex flex-col gap-2">
                <li
                    v-for="note in store.notes"
                    class="w-full transition-all flex gap-5"
                >
                    <input
                        type="text"
                        :value="note.name"
                        @input="
                            (e) => store.editNoteName(note.id, e.target.value)
                        "
                        class="py-2 px-2 w-full border border-gray-200 rounded-md outline-blue-500 hover:bg-gray-100"
                    />

                    <div class="w-[50px]">
                        <button
                            @click="store.deleteNote(note.id)"
                            class="border h-full w-full border-red-300 text-red-300 rounded-md text-2xl cursor-pointer"
                        >
                            &times;
                        </button>
                    </div>
                </li>
            </ul>

            <!-- make note name updating, create for every list element a component or smth -->

            <button
                @click="emit('hideModal')"
                class="absolute top-1 right-4 text-5xl cursor-pointer"
            >
                &times;
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";
import { useGlobalStore } from "../store";

const emit = defineEmits<{
    (e: "hideModal"): void;
}>();

const store = useGlobalStore();

const modal = useTemplateRef("modal");

const hide = (e: Event) => {
    if ((e.target as HTMLElement) === modal.value) {
        emit("hideModal");
    }
};

let handleClick: EventListener;

onMounted(() => {
    handleClick = hide;
    document.addEventListener("click", handleClick);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClick);
});
</script>

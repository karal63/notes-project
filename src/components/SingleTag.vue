<template>
    <div class="rounded-md px-2 flex items-center gap-2 bg-gray-200">
        {{ tag.name }}
        <button @click="deleteExistingTag" class="text-lg">&times;</button>
    </div>
</template>

<script setup lang="ts">
import { Tag } from "../App.vue";

defineProps<{ tag: Tag[] }>();
const emit = defineEmits<{
    (e: "deleteTag", tagName?: number): void;
}>();

const deleteExistingTag = () => {
    emit("deleteTag", 0);
    console.log(123);
};
</script>

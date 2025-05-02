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
                class="px-5 py-1 rounded-md border border-gray-300 cursor-pointer"
            >
                Edit
            </button>
        </div>
    </div>

    <!-- <form class="flex gap-5" @submit.prevent="onSubmit">
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
                            @click="() => deleteExistingTag(tag.id)"
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
                    class="absolute top-[120%] left-0 w-full border border-gray-300"
                >
                    <button
                        @click="tagName = 'React'"
                        class="flex justify-start w-full px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                        React
                    </button>
                    <button
                        class="flex justify-start w-full pl-4 py-2 hover:bg-blue-100 cursor-pointer"
                        @click="addNewTag"
                    >
                        Add "{{ tagName }}"
                    </button>
                </div>
            </div>
        </div>
    </form> -->
</template>

<script setup lang="ts"></script>

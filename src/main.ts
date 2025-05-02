import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import { createRouter, createWebHistory } from "vue-router";

// components
import App from "./App.vue";
import Home from "./pages/Home.vue";
import NewNote from "./pages/NewNote.vue";
import SingleNote from "./pages/SingleNote.vue";

const pinia = createPinia();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/new", component: NewNote },
        { path: "/:id", component: SingleNote },
    ],
});

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");

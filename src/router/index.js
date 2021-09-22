import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/public-routes/Home.vue";
import Signup from "../views/public-routes/Signup.vue";
import Login from "../views/public-routes/Login.vue";
import Profile from "../views/public-routes/Profile.vue";
import Doc from "../views/public-routes/Doc.vue";
import UserProfile from "../views/user-routes/UserProfile.vue";
import AddDoc from "../views/user-routes/AddDoc.vue";
import store from "../store/index";
const routes = [
    // Public routes
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup,
        beforeEnter: async(to, from, next) => {
            if (store.getters.currentToken) {
                next({ name: "Home" });
            } else {
                next();
            }
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: async(to, from, next) => {
            if (store.getters.currentToken) {
                next({ name: "Home" });
            } else {
                next();
            }
        },
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
    },
    {
        path: "/doc",
        name: "Doc",
        component: Doc,
    },
    // User routes
    {
        path: "/user/userprofile",
        name: "UserProfile",
        component: UserProfile,
        beforeEnter: async(to, from, next) => {
            if (store.getters.currentToken) {
                next();
            } else {
                next({ name: "Login" });
            }
        },
    },
    {
        path: "/user/adddoc",
        name: "AddDoc",
        component: AddDoc,
        beforeEnter: async(to, from, next) => {
            if (store.getters.currentToken) {
                next();
            } else {
                next({ name: "Login" });
            }
        },
    },
    {
        path: "/user/logout",
        beforeEnter: async(to, from, next) => {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("useremail");
            sessionStorage.removeItem("userid");
            sessionStorage.removeItem("bio", null);
            sessionStorage.removeItem("skills", null);
            sessionStorage.removeItem("profileimages", null);
            sessionStorage.removeItem("joined", null);
            store.commit("addToken", null);
            store.commit("addUsername", null);
            store.commit("addUseremail", null);
            store.commit("addUserid", null);
            store.commit("bio", null);
            store.commit("skills", null);
            store.commit("profileimages", null);
            store.commit("joined", null);
            next({ name: "Login" });
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
export default router;
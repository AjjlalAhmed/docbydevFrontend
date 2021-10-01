import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/public-routes/Home.vue";
import Signup from "../views/public-routes/Signup.vue";
import Login from "../views/public-routes/Login.vue";
import Profile from "../views/public-routes/UserPublicProfile.vue";
import Doc from "../views/public-routes/Doc.vue";
import UserProfile from "../views/user-routes/UserProfile.vue";
import EditProfile from "../views/user-routes/EditProfile.vue";
import EditDoc from "../views/user-routes/EditDoc.vue";
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
        path: "/user/editprofile",
        name: "EditProfile",
        component: EditProfile,
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
        path: "/user/editdoc",
        name: "EditDoc",
        component: EditDoc,
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
            sessionStorage.removeItem("bio");
            sessionStorage.removeItem("skills");
            sessionStorage.removeItem("profileimages");
            sessionStorage.removeItem("joined");
            sessionStorage.removeItem("address");
            sessionStorage.removeItem("birthday");
            sessionStorage.removeItem("gender");
            sessionStorage.removeItem("phone");
            sessionStorage.removeItem("profession");
            sessionStorage.removeItem("site");
            store.commit("addToken", null);
            store.commit("addUsername", null);
            store.commit("addUseremail", null);
            store.commit("addUserid", null);
            store.commit("addBio", null);
            store.commit("addSkills", null);
            store.commit("addProfileimage", null);
            store.commit("addJoined", null);
            store.commit("addAddress", null);
            store.commit("addBirthday", null);
            store.commit("addGender", null);
            store.commit("addPhone", null);
            store.commit("addProfession", null);
            store.commit("addSite", null);
            next({ name: "Login" });
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
export default router;
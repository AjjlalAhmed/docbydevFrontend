import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Profile from "../views/UserPublicProfile.vue";
import Doc from "../views/Doc.vue";
import Jobs from "../views/Jobs.vue";
import News from "../views/News.vue";
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
    {
        path: "/jobs",
        name: "Jobs",
        component: Jobs,
    },
    {
        path: "/news",
        name: "News",
        component: News,
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
            store.commit("addAlertPopupMessage", `${store.getters.currentUsername} logout.`);
            store.commit("addShowAlertPopupMessage", true);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("username");
            localStorage.removeItem("useremail");
            localStorage.removeItem("userid");
            localStorage.removeItem("bio");
            localStorage.removeItem("skills");
            localStorage.removeItem("profileimages");
            localStorage.removeItem("joined");
            localStorage.removeItem("address");
            localStorage.removeItem("birthday");
            localStorage.removeItem("gender");
            localStorage.removeItem("phone");
            localStorage.removeItem("profession");
            localStorage.removeItem("site");
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

router.beforeEach((to, from, next) => {
    if (to.query.title)
        document.title = `${process.env.VUE_APP_TITLE} - ${to.query.title}`;
    else document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
    next();
});

export default router;
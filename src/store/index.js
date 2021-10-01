import { createStore } from "vuex";
export default createStore({
    state: {
        token: sessionStorage.getItem("accessToken"),
        username: sessionStorage.getItem("username"),
        useremail: sessionStorage.getItem("useremail"),
        userid: sessionStorage.getItem("userid"),
        bio: sessionStorage.getItem("bio"),
        skills: sessionStorage.getItem("skills"),
        profileimage: sessionStorage.getItem("profileimages"),
        jonied: sessionStorage.getItem("joined"),
        address: sessionStorage.getItem("address"),
        birthday: sessionStorage.getItem("birthday"),
        gender: sessionStorage.getItem("gender"),
        phone: sessionStorage.getItem("phone"),
        profession: sessionStorage.getItem("profession"),
        site: sessionStorage.getItem("site"),
    },
    mutations: {
        addToken(state, payload) {
            state.token = payload;
        },
        addUsername(state, payload) {
            state.username = payload;
        },
        addUseremail(state, payload) {
            state.useremail = payload;
        },
        addUserid(state, payload) {
            state.userid = payload;
        },
        addBio(state, payload) {
            state.bio = payload;
        },
        addSkills(state, payload) {
            state.skills = payload;
        },
        addProfileimage(state, payload) {
            state.profileimage = payload;
        },
        addJoined(state, payload) {
            state.jonied = payload;
        },
        addAddress(state, payload) {
            state.address = payload;
        },
        addBirthday(state, payload) {
            state.birthday = payload;
        },
        addGender(state, payload) {
            state.gender = payload;
        },
        addPhone(state, payload) {
            state.phone = payload;
        },
        addProfession(state, payload) {
            state.profession = payload;
        },
        addSite(state, payload) {
            state.site = payload;
        },
    },
    getters: {
        currentToken: (state) => {
            return state.token;
        },
        currentUsername: (state) => {
            return state.username;
        },
        currentUseremail: (state) => {
            return state.useremail;
        },
        currentUserid: (state) => {
            return state.userid;
        },
        currentBio(state) {
            return state.bio;
        },
        currentSkills(state) {
            return state.skills;
        },
        currentProfileimage(state) {
            return state.profileimage;
        },
        currentJoined(state) {
            return state.jonied;
        },
        currentAddress(state) {
            return state.address;
        },
        currentGender(state) {
            return state.gender;
        },
        currentPhone(state) {
            return state.phone;
        },
        currentBirthday(state) {
            return state.birthday;
        },
        currentProfession(state) {
            return state.profession;
        },
        currentSite(state) {
            return state.site;
        },
    },
    actions: {},
    modules: {},
});
import { createStore } from "vuex";
export default createStore({
    state: {
        // Site related
        showRightSide: false,
        alertPopupMessage: [],
        showAlertPopupMessage: false,
        // User related
        token: localStorage.getItem("accessToken"),
        username: localStorage.getItem("username"),
        useremail: localStorage.getItem("useremail"),
        userid: localStorage.getItem("userid"),
        bio: localStorage.getItem("bio"),
        skills: localStorage.getItem("skills"),
        profileimage: localStorage.getItem("profileimages"),
        jonied: localStorage.getItem("joined"),
        address: localStorage.getItem("address"),
        birthday: localStorage.getItem("birthday"),
        gender: localStorage.getItem("gender"),
        phone: localStorage.getItem("phone"),
        profession: localStorage.getItem("profession"),
        site: localStorage.getItem("site"),
    },
    mutations: {
        // Site related
        addSideMenu(state, payload) {
            if (state.showRightSide != true) state.showRightSide = payload;
            else state.showRightSide = false;
        },
        addAlertPopupMessage(state, payload) {
            state.alertPopupMessage.push(payload);
        },
        addShowAlertPopupMessage(state, payload) {
            if (payload == false) state.alertPopupMessage = []
            state.showAlertPopupMessage = payload;
        },
        // User related
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
        // Site related
        currentMenuValue: (state) => {
            return state.showRightSide;
        },
        currentAlertPopupMessage: (state) => {
            return state.alertPopupMessage;
        },
        currentShowAlertPopupMessage: (state) => {
            return state.showAlertPopupMessage;
        },
        // User related
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
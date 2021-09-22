// Importing thing we need
import store from "../store/index";
// This fucntion store user info to session & vuex storage
const storeUserInfo = (data) => {
    // Storing to session storage
    sessionStorage.setItem("accessToken", data.token);
    sessionStorage.setItem("username", data.username);
    sessionStorage.setItem("useremail", data.useremail);
    sessionStorage.setItem("userid", data.userid);
    sessionStorage.setItem("bio", data.bio);
    sessionStorage.setItem("skills", data.skills);
    sessionStorage.setItem("profileimages", data.profileimage);
    sessionStorage.setItem("joined", data.joined);
    // Storing to vuex
    store.commit("addToken", data.token);
    store.commit("addUsername", data.username);
    store.commit("addUseremail", data.useremail);
    store.commit("addUserid", data.userid);
    store.commit("addBio", data.bio);
    store.commit("addSkills", data.skills);
    store.commit("addProfileimage", data.profileimage);
    store.commit("addJoined", data.joined);
};

export default storeUserInfo;
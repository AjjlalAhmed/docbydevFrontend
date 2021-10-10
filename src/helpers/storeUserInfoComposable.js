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
    sessionStorage.setItem("address", data.address);
    sessionStorage.setItem("birthday", data.birthday);
    sessionStorage.setItem("gender", data.gender);
    sessionStorage.setItem("phone", data.phone);
    sessionStorage.setItem("profession", data.profession);
    sessionStorage.setItem("site", data.site);
    // Storing to vuex
    store.commit("addToken", data.token);
    store.commit("addUsername", data.username);
    store.commit("addUseremail", data.useremail);
    store.commit("addUserid", data.userid);
    store.commit("addBio", data.bio);
    store.commit("addSkills", data.skills);
    store.commit("addProfileimage", data.profileimage);
    store.commit("addJoined", data.joined);
    store.commit("addAddress", data.address);
    store.commit("addBirthday", data.birthday);
    store.commit("addGender", data.gender);
    store.commit("addPhone", data.phone);
    store.commit("addProfession", data.profession);
    store.commit("addSite", data.site);
};

export default storeUserInfo;
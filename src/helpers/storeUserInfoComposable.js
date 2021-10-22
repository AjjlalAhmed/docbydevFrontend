// Importing thing we need
import store from "../store/index";
// This fucntion store user info to session & vuex storage
const storeUserInfo = (data) => {
    // Storing to session storage
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("useremail", data.useremail);
    localStorage.setItem("userid", data.userid);
    localStorage.setItem("bio", data.bio);
    localStorage.setItem("skills", data.skills);
    localStorage.setItem("profileimages", data.profileimage);
    localStorage.setItem("joined", data.joined);
    localStorage.setItem("address", data.address);
    localStorage.setItem("birthday", data.birthday);
    localStorage.setItem("gender", data.gender);
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("profession", data.profession);
    localStorage.setItem("site", data.site);
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
let url = 'http://localhost:8080';
let userLoginDropdown, userLoginInProfile, userEmailInProfile, emailVerifiedStatus

window.onload = async function() {
    userLoginDropdown = document.querySelector(".user-login-dropdown")
    userLoginInProfile = document.querySelector(".user-login")
    userEmailInProfile = document.querySelector(".user-email")
    emailVerifiedStatus = document.querySelector(".verified-status")
    verifyButton = document.querySelector(".verify-button")
    res = await sendUserRequest()
    console.log(window.localStorage.getItem("token"))   
}

async function sendUserRequest() {
    await fetch(url + "/me", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        },
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        userLoginDropdown.textContent = res.login
        userLoginInProfile.textContent = res.login
        userEmailInProfile.textContent = res.email
        if (res.email_verified) {
            emailVerifiedStatus.textContent = "Verified"
            emailVerifiedStatus.classList = "link-success verified-status"
            verifyButton.style.display = 'none';
        }
    })
}
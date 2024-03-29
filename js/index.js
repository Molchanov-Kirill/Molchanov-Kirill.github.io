let login_input, password, data;
let url = 'https://astartes.takserver.ru';

const urlParams = new URLSearchParams(window.location.search);
const responseType = urlParams.get('response_type');

window.onload = function() {
    login_input = document.getElementById('login_form');
    password = document.getElementById ('password_form');

    window.YaAuthSuggest.init({
        client_id: '58b5439db67e41348837a81ee7c2ae58',
            response_type: 'token',
            redirect_uri: 'https://astartes.takserver.ru/token-redirect.html'
        },
        'https://astartes.takserver.ru', {
            view: 'button',
            parentId: 'login-form',
            buttonView: 'main',
            buttonTheme: 'light',
            buttonSize: 'm',
            buttonBorderRadius: 4
        }
    )
    .then(result => {
        return result.handler()
    })
    .then(tokenMsg => fetch(url + "/oauth/yandex", {
        method: 'POST',
        body: JSON.stringify({
            "token": tokenMsg["access_token"],
            "telegram_id": urlParams.get('telegram_id')
         }),
    }))
    .then(res => res.json())
    .then(token => {
        window.localStorage.setItem("token", token.jwt)
        window.location.replace("/user.html")
    })
    .catch(error => {
        console.log('Error: ', error);
    })
}

async function sign(){
    if (responseType == "code") {
        sendCredentialsForYandex();
    } else {
        let token = await sendCredentials();
        console.log(token)
        window.localStorage.setItem("token", token.jwt)
        window.location.replace("/user.html")
    }
}

async function sendCredentials() {

    data = {login: login_input.value, password: password.value, telegram_id: urlParams.get('telegram_id')};

    let res = await fetch(url + "/auth", {
        method: 'POST',
        body: JSON.stringify(data),
    })
    return await res.json();
}


async function sendCredentialsForYandex() {
    data = {
        "login": login_input.value, 
        "password": password.value,
        "client_id": urlParams.get('client_id'),
        "redirect_uri": urlParams.get('redirect_uri'),
        "client_id":  urlParams.get('client_id'),
        "state": urlParams.get('state'),
        "response_type": "code",
    };

    const FD = new FormData();
    for (const [name, value] of Object.entries(data)) {
        FD.append(name, value);
    }
    
    console.log(urlParams.get('redirect_uri'))
    console.log(urlParams.get('client_id'))
    console.log(urlParams.get('scope'))

    let res = await fetch(url + "/code", {
        method: 'POST',
        body: FD,
    })
    .then(response => console.log(response))
}
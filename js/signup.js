let loginInput, passwordInput, passwordConfirmInput, data, emailInput;
let url = 'https://astartes.takserver.ru';

window.onload = function() {
    loginInput = document.getElementById('login_form');
    emailInput = document.getElementById('email_form');
    passwordInput = document.getElementById ('password_form');
    passwordConfirmInput = document.getElementById ('password_confirm_form');


   // Fetch all the forms we want to apply custom Bootstrap validation styles to
   const form = document.querySelector('.needs-validation')

   window.YaAuthSuggest.init({
      client_id: '58b5439db67e41348837a81ee7c2ae58',
            response_type: 'token',
            redirect_uri: 'https://molchanov-kirill.github.io/token-redirect.html'
      },
      'https://molchanov-kirill.github.io', {
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
      body: {
            "token": tokenMsg["access_token"],
            "telegram_id": urlParams.get('telegram_id')
      },
   }))
   .then(() => {
      window.localStorage.setItem("token", token.jwt)
      window.location.replace("/user.html")
   })
   .catch(error => {
      console.log('Error: ', error);
   })

   document.getElementById("submit-btn").addEventListener("click", async e => {
      e.preventDefault()

      if (!form.checkValidity()) {
         form.classList.add('was-validated')
         return
      }
      form.classList.add('was-validated')
      // if (passwordInput.value != passwordConfirmInput.value) {
      //    //
      //    return
      // }

      console.log(loginInput.value)
      console.log(emailInput.value)
      console.log(passwordConfirmInput.value)
      data = {login: loginInput.value, email: emailInput.value, password: passwordInput.value}

      await fetch(url + "/register", {
          method: 'POST',
          body: JSON.stringify(data),
      })
         .then(res => {
            if (res.status == 401) {
               alert("User already exists")
            }
            if (res.status == 200) {
               alert("User is registered")
            }
         })
   })
}
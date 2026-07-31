/*=========================================
AUTHENTICATION
=========================================*/

const registerForm =
document.getElementById("register-form");

const loginForm =
document.getElementById("login-form");


const registerPassword =
document.getElementById("register-password");

const confirmPassword =
document.getElementById("confirm-password");

const strengthFill =
document.getElementById("strength-fill");

const strengthText =
document.getElementById("strength-text");


/*=========================================
PASSWORD STRENGTH
=========================================*/

if(registerPassword){

registerPassword.addEventListener(

"input",

function(){

const password = registerPassword.value;

let strength = 0;

if(password.length >= 8) strength++;

if(/[A-Z]/.test(password)) strength++;
if(/[0-9]/.test(password)) strength++;
if(/[!@#$%^&*]/.test(password)) strength++;

const colors = [

"red",

"orange",

"gold",

"green"

];

const texts = [

"Weak",

"Fair",

"Good",

"Strong"

];

strengthFill.style.width =
`${strength*25}%`;

strengthFill.style.background =
colors[Math.max(strength-1,0)];

strengthText.textContent =
texts[Math.max(strength-1,0)];

});

}


/*=========================================
REGISTER
=========================================*/

if(registerForm){

registerForm.addEventListener(

"submit",

function(event){

event.preventDefault();

if(

registerPassword.value !==

confirmPassword.value

){

alert(

"Passwords do not match."

);

return;

}

const email =

document.getElementById(

"register-email"

).value;

const emailPattern =

/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(

!emailPattern.test(email)

){

alert(

"Enter a valid email."

);

return;

}


const user={

name:

document.getElementById("register-name").value,

email:

document.getElementById("register-email").value,

password:

document.getElementById("register-password").value

};

localStorage.setItem(

"user",

JSON.stringify(user)

);

alert("Registration Successful!");

window.location="login.html";

});

}

/*=========================================
LOGIN
=========================================*/

if(loginForm){

loginForm.addEventListener(

"submit",

function(event){

event.preventDefault();

const email=

document.getElementById("login-email").value;

const password=

document.getElementById("login-password").value;

const user=

JSON.parse(

localStorage.getItem("user")

);

if(

user &&

user.email===email &&

user.password===password

){

const remember =

document.getElementById(

"remember-me"

);

if(

remember &&

remember.checked

){

localStorage.setItem(

"loggedIn",

"true"

);

}else{

sessionStorage.setItem(

"loggedIn",

"true"

);
}

window.location="index.html";

}else{

alert("Invalid Credentials");

}

});

}

function setupPasswordToggle(

iconId,

inputId

){

const icon =

document.getElementById(iconId);

const input =

document.getElementById(inputId);

if(!icon || !input) return;

icon.addEventListener(

"click",

function(){

if(input.type === "password"){

input.type = "text";

icon.classList.remove("fa-eye");

icon.classList.add("fa-eye-slash");

}else{

input.type = "password";

icon.classList.remove("fa-eye-slash");

icon.classList.add("fa-eye");

}

});

}

setupPasswordToggle(

"toggle-register-password",

"register-password"

);

setupPasswordToggle(

"toggle-confirm-password",

"confirm-password"

);

setupPasswordToggle(

"toggle-login-password",

"login-password"

);       
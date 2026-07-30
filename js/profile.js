/*=========================================
PROFILE SETTINGS
=========================================*/

const imageInput =
document.getElementById("image-input");

const profileImage =
document.getElementById("profile-image");

const profileName =
document.getElementById("profile-name");

const profileEmail =
document.getElementById("profile-email");

const currencySelect =
document.getElementById("currency-select");

const darkMode =
document.getElementById("dark-mode");

const themeColor =
document.getElementById("theme-color");

const saveButton =
document.getElementById("save-profile");

/*=========================================
LOAD SETTINGS
=========================================*/

const settings =

JSON.parse(

localStorage.getItem("settings")

) || {};

if(settings.darkMode){

    document.body.classList.add("dark");

}

if(settings.theme){

    document.body.classList.add(settings.theme);

}

profileName.value =
settings.name || "";

profileEmail.value =
settings.email || "";

currencySelect.value =
settings.currency || "₹";

themeColor.value =
settings.theme || "blue";

darkMode.checked =
settings.darkMode || false;

if(settings.image){

profileImage.src =
settings.image;

}

/*=========================================
IMAGE PREVIEW
=========================================*/

imageInput.addEventListener(

"change",

function(){

const file = imageInput.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(){

profileImage.src =
reader.result;

};

reader.readAsDataURL(file);

});

/*=========================================
SAVE SETTINGS
=========================================*/

saveButton.addEventListener(

"click",

function(){

const settings = {

name:
profileName.value,

email:
profileEmail.value,

currency:
currencySelect.value,

darkMode:
darkMode.checked,


theme:
themeColor.value,

image:
profileImage.src

};

localStorage.setItem(

"settings",

JSON.stringify(settings)

);

document.body.className = "";

if(settings.darkMode){

    document.body.classList.add("dark");

}

document.body.classList.add(settings.theme);

alert(

"Profile Updated Successfully"

);

});

document.body.className = "";

if(settings.darkMode){

    document.body.classList.add("dark");

}

document.body.classList.add(settings.theme || "blue");
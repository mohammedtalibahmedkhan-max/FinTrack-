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

const saveButton =
document.getElementById("save-profile");

/*=========================================
LOAD SETTINGS
=========================================*/

const settings =

JSON.parse(

localStorage.getItem("settings")

) || {};

profileName.value =
settings.name || "";

profileEmail.value =
settings.email || "";

currencySelect.value =
settings.currency || "₹";

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

image:
profileImage.src

};

localStorage.setItem(

"settings",

JSON.stringify(settings)

);

alert(

"Profile Updated Successfully"

);

});
//1. pull in all the DOM elements we need

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


//display input error message

function showError(input, message) {
    const formControl = input.parentElement; //gets the div with .form-control 
    formControl.className = "form-control error"; //change the class name if error
    const small = formControl.querySelector('small'); //grab the small element in html
    small.innerText = message; //changes the default error text
}

//display success outline
function showSuccess(input) {
    const formControl = input.parentElement; //gets the div with .form-control 
    formControl.className = "form-control success"; // change the class name if success

}

//check if email is valid

function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Email is not valid");
    }
}

//check required fields

function checkRequired(inputArr){
    inputArr.forEach(function(input) {
    if(input.value.trim() === "") {
        showError(input, `${getFieldName(input)} is required`);
    } else {
        showSuccess(input);
    }
    });
}

//get field name and capitalize
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check username and password length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }  
}

//check passwords match

function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value) {
        showError(input2, "passwords do not match");
    } else {
        showSuccess(input);
    }
}

//add event listeners for validation

form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});

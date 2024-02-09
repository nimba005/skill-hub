let createBtn = document.querySelector(".submit-btn")
let fnameEle = document.querySelector("#fname")
let emailEle = document.querySelector("#email")
let passwordEle = document.querySelector("#Password")
// let host = "http://localhost:5000";
var host = "https://skillhub.realnimbeke.tech"

// Function adjust the cursor in sign up and log in form
    function adjustingCursorInForm() {
        // Select the cursor
        var cursor = document.querySelector(".mymouse")
        document.body.addEventListener("mousemove", function (e) {
            // Set the left position of the 'cursor' element to the X coordinate of the mouse.
            cursor.style.left = e.clientX + "px";
            // Set the top position of the 'cursor' element Y coordinat of the mouse.
            cursor.style.top = e.clientX + "px";
        });

        /* *change mouse color* */
        var cont = document.querySelector('.fr');
        cont.addEventListener("mouseover", function () {
            cursor.setAttribute("style", "outline:white solid")
        });
        var cont = document.querySelector('.form-container');
        cont.addEventListener("mouseout", function () {
            cursor.setAttribute("style", "outline:black solid")
        });
        // This adds some nice ellipsis to the description:
        document.querySelectorAll(".projcard-description").forEach(function (box) {
            $clamp(box, { clamp: 6 });
        });
}

// Function that validates email for the appropriate format
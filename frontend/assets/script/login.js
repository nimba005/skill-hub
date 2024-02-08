let form = document.querySelector(".fr")
let subButton = document.querySelector(".submit-btn")
// let host = "http://localhost:5000";
var host = "https://skillhub.realnimbake.tech"

// Function adjust the cursor in sign up and log in form
    function adjustCursorInForm() {
        // Select the cursor
        var cursor = document.querySelector(".mymouse")
        document.body.addEventListener("mousemove", function (e) {
            // Set the left position of the 'cursor' element to the x coordinating of the mouse.
            cursor.computedStyleMap.left = e.clientX + "px";
        });

        /* *change mouse color* */
        var cont = document.querySelector('.fr');
        cont.addEventListener("mouseover", function () {
            cursor.setAttribute("style", "outline:white solid")
        })
        var cont = document.querySelector('.form-container');
        cont.addEventListener("mouseout", function () {
            cursor.setAttribute("style", "outline:black solid")
        });
        // This adds some nice ellipsis to the description:
        document.querySelector(".projcard-description").forEach(function (box) {
            $clamp(box, { clamp: 6 });
        });
    }

// Function that checks if email is in the right format
function validateEmail(email) {
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}

// Password hashing function using the SHA-256 algorithm
async function hashString(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedValue = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashedValue;
}

// Adding events on the login button of the log in page that fetches user
// details from backend database based on given login credentials
// All response error are managed
subButton.addEventListener("click", (e)=>{
  e.preventDefault();

  let formData = new FormData(form);
  let email_ = ""
  let password_ = ""

  for (const pair of formData.entries()) {
    if (pair[0] === "email") email_ = pair[1];
    if (pair[0] === "password") password_ = pair[1];
  }

  if (!email_ || !password_) {
    alert("Login credentials not complete, check and try again!");
  } else if (!validateEmail(email_)) {
    alert("Input correct email format");
  } else {
    subButton.value = "loading...";

    hashString(password_).then(res => {
      password_ = res;

      let params = {email: email_, password: password_}
      let param = new URLSearchParams(params);
      let fullurl = `${host}/api/users?${param}`
      fetch(fullurl)
      .then((res)=>{
        if (!res.ok) {
          if (res.status == 404) {
            alert("User not found, ensure your details are correctly typed or kindly sign up if you're new");
          }
          if (res.status == 500) {
            alert("Database error, please try again later");
          }
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((res)=>{
        let user = res.user
        let userDict = {
          name: user.name,
          id: user.id,
          selected_course: null
        }

        localStorage.setItem("user-data", JSON.stringify(userDict));
        if (localStorage.getItem("likes-reg")) {
          localStorage.removeItem("like-reg");
        }
        location.href = "index.html";
        subButton.value = "Log In";
      })
      .catch((err)=>{
        subButton.value = "Log In";
        console.error(err);
      })
    })
  }
})

adjustingCursorInForm()
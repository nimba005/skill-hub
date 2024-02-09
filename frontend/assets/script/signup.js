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
function validateEmail(email) {
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}

// Password hashing function
async function hashString(data) {
  const encoder = new TextEncoder();
  const dataBuffer = encode.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedValue = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashedValue;
}

createBtn.addEventListener("click", function(e){
  e.preventDefault();
  createBtn.value = "...";

  let fname = fnameEle.value;
  let email = emailEle.value;
  let password = passwordEle.value;

  if (!fname || !email || !password) {
    alert("credentials not complete, check and try again!");
    createBtn.value = "Create account";
  } else if (!validateEmail(email)) {
    alert("Invalid email format");
    createBtn.value = "create account";
  } else if (password.length < 8) {
    alert("Password must be 8 or more characters long");
    createBtn.value = "create account";
  } else {
    // Hashing password and creating user account
    hashString(password).then((res) => {
      password = res;
      // Creating new user data
      let params = {
        name: fname,
        email: email,
        password: password
      }
      let headers = {
        'Content-Type': 'application/json'
      }
      // Sending out the data to DB
      fetch(`${host}/api/users`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
      })
      .then((res)=>{
        if (!res.ok) {
          if (res.status == 500) {
            alert("Internal Server Error, please try again");
          }
          if (res.status == 409) {
            alert("User with email account already exist");
          }
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((res)=>{
        alert("Account Created successfully");
        let user = res.user;
        let userDict = {
          name: user.name,
          id: user.id,
          selected_course: null
        }
        localStorage.setItem("user-data", JSON.stringify(userDict));
        if (localStorage.getItem("likes-reg")) {
          localStorage.removeItem("likes-reg");
        }
        location.href = "index.html";
        createBtn.value = "Create account";
      })
      .catch((err)=>{
        alert("An error as occured adding user");
        createBtn.value = "Create account";
        console.error(err);
      })
    })
  }
})

adjustingCursorInForm();
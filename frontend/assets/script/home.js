var JoinNow = document.querySelector('.joinNow');
var login = document.querySelector('.login');
var aboutBtn = document.querySelector('.about-btn');
var popCoursesCont = document.querySelector('.container')
var courses = []
var popCoursesList = []
// var host = "https://localhost:5000";
var host = "https://skillhub.realnimbake.tech"

// Sending request to the database for courses data
function getPopCourses() {
  fetch(`${host}/api/course`)
    .then(function(data) {
      if (!data.ok) {
	    // If the request was not successful, throw an error that will be handled in the catche block
	    throw new Error('Error Fetching Courses!');
      }
      // Returns data in json
      return data.json();
    })
    .then(function(res) {
      res = res.courses;
      let data = []

      // Getting popular courses
      for (let dt of res) {
        if (dt.is_popular) {
          data.push(dt);
        }
      }

      // Getting random 6 unique datas from data
      for (let i = 0; i < 6; i++) {
        var randomNumber = Math.floor(Math.random() * data.length);
    	while (popCoursesList.includes(data[randomNumber])) {
    	  randomNumber = Math.floor(Math.random() * data.length);
    	}
	    popCoursesList.push(data[randomNumber]);
      }

      popCoursesCont.innerHTML = popCoursesList.map((course)=>{
        return `
        <div class="square" onclick="courseClick('${course.id}')">
          <img
	        src="${course.image_url}">
	        <div class="title">${course.title}</div>
	      <p class='desc'>${course.description}
          </p>
        </div>`
      }).join("");
    })
    .catch(function(error) {
      popCoursesCont.innerHTML = `<p class='courseError'>Error Fetching Courses</p>`;
      console.error(error);
    })
}

function courseClick(course_id) {
  let user = localStorage.getItem("user-data");

  if (!user) {
    alert("You have to sign in to access the course");
  } else {
    user = JSON.parse(user);
    user.selected_course = course_id;
    localStorage.setItem("user-data", JSON.stringify(user));
    location.href = "details.html"
  }
}

// Make an even, When we click on the button
JoinNow.addEventListener('click', function () {
  // It render the signup.html page
  location.href = 'signup.html';
});

// 2. Add event when we click it redirect us to the log in form
login.addEventListener('click', function () {
  location.href = 'login.html';
});

// Make an even, when we click on the button
aboutBtn.addEventListener('click', function () {
  // it changes the page to about-us page
  location.href = 'about.html';
});

getPopCourses()
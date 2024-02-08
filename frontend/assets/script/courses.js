var popCoursesCont = document.querySelector('.pop-container')
var topCoursesCont = document.querySelector('.top-container')
var allCourseBtn = document.querySelector('.all-courses-btn')
var courses = []
var popCoursesList = []
var topCoursesList = []
// var host = "https://localhost:5000";
var host = "https://skillhub.realnimbake.tech"

// Sending request to the database for courses data
function getCourses() {
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
      // RENDERING TOP COURSES
      // Getting randon 6 unique datas from courses data
      for (let i = 0; i < 6; i++) {
	var randomNumber = Math.floor(Math.random() * res.length);
	while (topCoursesList.includes(res[randomNumber])) {
	  randomNumber = Math.floor(Math.random() * res.length);
	}
	topCoursesList.push(res[randomNumber]);
      }
      topCoursesCont.innerHTML = topCoursesList.map((course)=>{
	return `
	<div class="square" onclick="courseClick('${course.id}')">
	  <img
	    src="${course.image_url}">
	    <div class="title">${course.title}</div>
	  <p class='desc'>${course.description}
	  </p>
	</div>`
      }).join("");

      // RENDERING POPULAR COURSES
      // Sorting popular courses from the res data
      let data = []
      for (let dt of res) {
	if (dt.is_popular) {
	  data.push(dt);
	}
      }

      // Getting random 6 unique datas from popular courses data
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
      topCoursesCont.innerHTML = "<p class='courseError'>Error Fetching Courses</p>";
      popCoursesCont.innerHTML = "<p class='courseError'>Error Fetching Courses</p>";
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

allCourseBtn.addEventListener("click", ()=>{
  location.href = "allCourses.html";
})

getCourses();

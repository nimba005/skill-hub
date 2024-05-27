var coursesCont = document.querySelector('.course-container')
// var host = "https://localhost:5000";

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

      coursesCont.innerHTML = res.map((course)=>{
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
      coursesCont.innerHTML = `<p class='courseError'>Error Fetching Courses</p>`;
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

getCourses()

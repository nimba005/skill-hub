let course_tit = document.querySelector("course-tit");
let course_desc = document.querySelector("course-desc");
let course_likes = document.querySelector("#tot-likes");
let video_cont = document.querySelector(".video-container");
let userDet = localstorage.getItem("user-data");
let course = {};
let course_videos = [];
let likeBtn = document.querySelector(".likeBt");
// let host = "https://localhost:5000";
var host = "https://skillhub.realnimbake.tech"

function course_render() {
  if (!userDet) {
    alert("You need to be signed in to access this page!");
    location.href = "index.html";
  } else {
    let course_id = JSON.parse(userDet).selected_course;
    if (!course_id) {
      alert("Please sign in again and retry!");
      location.href = "index.html";
    }

    let url = `${host}/api/courses/${course_id}`;
    fetch(url)
    .then((res)=>{
      if (!res.ok) {
	if (res.status == 500) {
	  alert("Internal database error, please try again later!");
	  throw new Error(res.status);
	}
	throw new Error(res.status);
      }
      return res.json();
    })
    .then((res)=>{
      // Updating the course info with the course data
      course = res.course;
      course_desc.innerText = course.description;
      course_tit.innerText = course.title;
      course_likes.innerText = course.likes;

      // Updating the course videos with the video values of the course data
      course_videos = course.videos;
      video_cont.innerHTML = course_videos.map((video)=>{
	return `
	  <div class="video-details">
	    <div class="video-title">
	      <h3>${video.title}</h3>
	    </div>
	    <div class="videos">
	      ${video.embed_link}
	      <div class='heart'></div>
	      <div class='clock'></div>
              <div class='share'></div>
	    </div>
          </div>`
      }).join("");
    })
    .catch((err)=>{
      console.error(err.message);
    })
  }
}

likeBt.addEventListener("click", ()=> {
  if (userDet) {
    likeBt.innerText = "..."

      let dt = JSON.parse(userDet);
      let userId = dt.id;
      let courseId = dt.selected_course;
      let courseTitle = course_tit.innerText;

      

      
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
    .catch(fuction(error) {
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

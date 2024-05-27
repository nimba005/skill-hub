let course_tit = document.querySelector("course-tit");
let course_desc = document.querySelector("course-desc");
let course_likes = document.querySelector("#tot-likes");
let video_cont = document.querySelector(".video-container");
let userDet = localstorage.getItem("user-data");
let course = {};
let course_videos = [];
let likeBtn = document.querySelector(".likeBt");
// let host = "https://localhost:5000";

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
      
    let rLikes = localStorage.getItem("likes-reg")
    if (JSON.stringify(rLikes).includes(courseId)) {
      alert("You already liked the course!");
      likeBt.innerText = "LIKE"
      return
    }

    let postData = {
      course_id: courseId,
      user_id: userId,
      course_tittle: courseTitle
    }
    fetch( `${host}/api/registered`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then((res)=>{
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then((res)=>{
      rLikes = JSON.parse(rLikes)
      rLikes.push(res.registered_course.course_id)
      localStorage.setItem("likes-reg", JSON.stringify(rLikes))
      var newLikes = parseInt(course_likes.innerText, 10) + 1;
      course_likes.innerText = newLikes;
      likeBt.innerText = "Like"
    })
    .catch((err)=>{
      likeBt.innerText = "LIKE"
      console.error(err);
    })
  }
});

course_render();
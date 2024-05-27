var user = localStorage.getItem('user-data');
var reLikes = localStorage.getItem('likes-reg');
var JoinNow = document.querySelector('.joinNow');
var login = document.querySelector('.login');
var aboutBtn = document.querySelector('.about-btn');
var logout = document.getElementById('logout');
var showCourse = document.querySelector('.show-courses');
// var host = "http://localhost:5000";

function checkUserSignIn() {
  if (user != null) {
    if (JoinNow) {
      JoinNow.style.display = 'none';
    }
    if (logout) {
      logout.style.display = 'inline';
      logout.addEventListener('click', function () {
        localStorage.removeItem('user-data');
        // location.reload();
        location.href = 'index.html';
      });
    }

    let userDict = JSON.parse(localStorage.getItem("user-data"));
    if (typeof(userDict) !== 'object' || Array.isArray(userDict) || !userDict.id) {
      localStorage.removeItem("user-data");
      location.reload();
    } else {
      let fullurl = `${host_}/api/users/${userDict.id}`
      fetch(fullurl)
      .then((res)=>{
        if (!res.ok) {
          throw new Error(res.status);
        }

        return res.json();
      })
      .then((res)=>{
        res = res.user;
        if (res.id == userDict.id && res.name == userDict.name) {
          console.log("MainUserCheck ok");
        } else {
          localStorage.removeItem("user-data");
        }
      })
      .catch((erro)=>{
        localStorage.removeItem("user-data");
        console.log(err);
      })
    }
  }
}

function checkRegLikes() {
  if (user && !reLikes) {
    let usr = JSON.parse(user);
    let params = {user_id: usr.id}
    let param = new URLSearchParams(params);
    let fullurl = `${host_}/api/registered?${param}`
    fetch(fullurl)
    .then((res)=>{
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((res)=>{
      res = res.registered_courses
      let course_ids = []
      for (const regCourse of res) {
        course_ids.push(regCourse.course_id);
      }
      localStorage.setItem("likes-reg", JSON.stringify(course_ids))
    })
    .catch((err)=>{
      console.error(err);
    })
  }
}

if (showCourse) {
  showCourse.addEventListener('click', function () {
    // It render the signup.html page
    location.href = 'allCourses.html';
  });
}

checkUserSignIn();
checkRegLikes();
// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyATJiJTJhtu1_5vYv1_FxrroYPhap8w0nM",
//     authDomain: "bounceup-1eabd.firebaseapp.com",
//     projectId: "bounceup-1eabd",
//     storageBucket: "bounceup-1eabd.appspot.com",
//     messagingSenderId: "625846739265",
//     appId: "1:625846739265:web:3e3e3a2faffdf54a8001c0",
//     measurementId: "G-1V344W9KF1"
//   };
  
//   // Initialize Firebase
//   const app = firebase.initializeApp(firebaseConfig);
//   const highScoresCollection = firebase.firestore().collection('high-scores');
//   // const analytics = getAnalytics(app);
  
  // I commented out the firebase stuff just in case. because we might have to connect it or something
  
  
  // code beginning
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let raf;
  let score = 0;
  let started = false;
  let timeLeft = 90; // 90
  let pause = false;
  let highScore = 0; // this is the current game high score
  let highestScore;  // this is for the all time high score
  
//   highScoresCollection.get().then(scores => {
//     scores.forEach((score) => {
//       // Get highest score
//       if (!highestScore) {
//         highestScore = score.data();
//       }
//       else if (score.data().score > highestScore.score) {
//         highestScore = score.data();
//       }
//     });
  
//     // console.log('highest score', highestScore);
//     // document.getElementById('high-score-name').innerHTML = highestScore.name;
//     // document.getElementById('high-score').innerHTML = highestScore.score;
//   });
  
  
  // const ball = {
  //   x: 100,
  //   y: 100,
  //   vx: 4,
  //   vy: 7,
  //   radius: 25,
  //   color: 'crimson',
  //   draw: function () {
  //     ctx.beginPath();
  //     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  //     ctx.closePath();
  //     ctx.fillStyle = this.color;
  //     ctx.fill();
  //   }
  // };
  
  // const bouncer = {
  //   x: 240,
  //   vx: 7,
  //   y: 285,
  //   w: 120,
  //   h: 20,
  //   color: 'lime',
  //   draw: function () {
  //     ctx.beginPath();
  //     ctx.fillRect(this.x, this.y, this.w, this.h);
  //     ctx.closePath();
  //     ctx.fillStyle = this.color;
  //     ctx.fill();
  //   }
  // };
  
  // This sets the exact time of seconds
  setInterval(function () {
    if (started) {
      timeLeft--;
    }
  }, 1000);
  
  async function draw() {
    // this stops the game 
    if (pause) {
      ctx.fillStyle = 'black'
      ctx.font = '30px serif';
      ctx.fillText("click to restart, in progress", 250, 150, 250);
      return;
    }
    // frames and movement
    ctx.fillStyle = 'rgba(127, 255, 0, .3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    bouncer.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
  
    // this sends the score, date, and name to firebase
    if (timeLeft <= 0) {
      timeLeft = 0;
      pause = true;
    //   await highScoresCollection.add({
    //     name: document.getElementById('name').value,
    //     score: highScore,
    //     createDate: new Date()
    //   });
    }
    // minus one to score && (ball.y <= 20 && ball.x === bouncer.x)
    if (ball.y >= bouncer.y && (ball.x > bouncer.x && ball.x < bouncer.x + bouncer.w)) {
      score += 1;
      if (score >= highScore) {
        highScore += 1;
      }
      ball.vy = -ball.vy;
    }
    else if (ball.y > canvas.height) {
      score -= 1;
    }
  
    // ceiling and floor collision
    if (ball.y > canvas.height || ball.y < 0) {
      ball.vy = -ball.vy;
    }
  
    // bounces the ball of the sides
    if (ball.x > canvas.width || ball.x < 0) {
      ball.vx = -ball.vx;
    }
  
    if (goLeft) {
      if (bouncer.x >= 0) {
        bouncer.x -= bouncer.vx;
      }
    }
    else if (goRight) {
      if (bouncer.x + bouncer.w <= canvas.width) {
        bouncer.x += bouncer.vx;
      }
    }
    ctx.fillStyle = 'black'
    ctx.font = '30px serif';
  
    // this starts the game when you click on the canvas
    if (!started) {
      ctx.fillText("click to start", 150, 300, 200);
    }
  
    raf = window.requestAnimationFrame(draw);
    ctx.fillText(score, 40, 40, 200);
    ctx.fillText("Time remaining: " + timeLeft, 300, 40, 200);
    if (score <= -25) {
      ball.x = 100;
      ball.y = 100;
      score = highScore;
    }
  }
  
  
  
  canvas.addEventListener('mouseover' && 'click', function (e) {
    if (!started) {
      raf = window.requestAnimationFrame(draw);
      started = true;
    }
  
  });
  
  // this moves the paddle
  let goRight = false;
  let goLeft = false;
  canvas.addEventListener('keydown', function (key) {
    console.log("keydown", key)
    if ((key.key === 'ArrowLeft' || key.key === 'a')) {
      goLeft = true;
    }
    else if (key.key === 'ArrowRight' || key.key === 'd') {
      goRight = true
    }
  });
  
  canvas.addEventListener('keyup', function (key) {
    if (key.key === 'ArrowLeft' || key.key === 'a') {
      goLeft = false;
    }
    else if (key.key === 'ArrowRight' || key.key === 'd') {
      goRight = false;
    }
  });
  
  bouncer.draw();
  ball.draw();
  
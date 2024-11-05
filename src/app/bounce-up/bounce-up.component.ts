import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-bounce-up',
  templateUrl: './bounce-up.component.html',
  styleUrls: ['./bounce-up.component.css']
})
export class BounceUpComponent implements OnInit {
  public scores: any[] = [];
  public raf: any;
  public score = 0;
  public started = false;
  public timeLeft = 90;
  public pause = false;
  public highScore = 0;
  public highestScore: number | undefined;
  public goLeft = false;
  public goRight = false;
  public name = '';
  public highScoresCollection = collection(this.firestore, 'high-scores');
  // its important myCanvas matches the variable name in the template
  @ViewChild('myCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> = {} as unknown as ElementRef<HTMLCanvasElement>;

  public ctx: CanvasRenderingContext2D | undefined | null;

  public ball: any = {};
  public bouncer: any = {};

  constructor(public firestore: Firestore) { }

  public ngOnInit(): void {
    const highScores$ = collectionData(this.highScoresCollection);
    highScores$.subscribe(fetchedScores => {
        console.log('Original scores:', JSON.parse(JSON.stringify(fetchedScores)));
        fetchedScores.sort(compare); // Sort the array in place
        this.scores = fetchedScores; // Assign sorted array to this.scores
        console.log('Sorted scores:', this.scores);
    });
}

  public ngAfterViewInit() {
    console.log('canvas', this.canvas);
    if (!this.canvas) {
      return;
    }
    console.log('after view init');
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ball = {
      x: 100,
      y: 100,
      vx: 4,
      vy: 7,
      radius: 25,
      color: 'crimson',
      ctx: this.ctx,
      draw: function () {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
      }
    };

    this.bouncer = {
      x: 240,
      vx: 7,
      y: 285,
      w: 120,
      h: 20,
      color: 'lime',
      ctx: this.ctx,
      draw: function () {
        this.ctx.beginPath();
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
      }
    };
    setInterval(() => {
      if (this.started) {
        this.timeLeft--;
      }
    }, 1000);

    this.canvas.nativeElement.addEventListener('mouseover' && 'click', (e: any) => {
      if (!this.started) {
        this.raf = window.requestAnimationFrame(this.draw.bind(this));
        this.started = true;
      }
    });

    this.canvas.nativeElement.addEventListener('keydown', (key: any) => {
      console.log("keydown", key)
      if ((key.key === 'ArrowLeft' || key.key === 'a')) {
        this.goLeft = true;
      }
      else if (key.key === 'ArrowRight' || key.key === 'd') {
        this.goRight = true
      }
    });

    this.canvas.nativeElement.addEventListener('keyup', (key: any) => {
      if (key.key === 'ArrowLeft' || key.key === 'a') {
        this.goLeft = false;
      }
      else if (key.key === 'ArrowRight' || key.key === 'd') {
        this.goRight = false;
      }
    });

    this.bouncer.draw();
    this.ball.draw();
  }

  public async draw() {
    if (!this.ctx) {
      return;
    }
    // this stops the game 
    if (this.pause) {
      this.ctx.fillStyle = 'black'
      this.ctx.font = '30px serif';
      this.ctx.fillText("click to restart, in progress", 250, 150, 250);
      return;
    }
    // frames and movement
    this.ctx.fillStyle = 'rgba(127, 255, 0, .3)';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ball.draw();
    this.bouncer.draw();
    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;

    // this sends the score, date, and name to firebase
    if (this.timeLeft <= 0 && this.name !== '') { 
      this.timeLeft = 0;
      this.pause = true;
      this.highScoresCollection
      await addDoc(this.highScoresCollection, {
        name: this.name,
        score: this.highScore,
        createDate: new Date()
      });
    }

    // minus one to score && (ball.y <= 20 && ball.x === bouncer.x)
    if (this.ball.y >= this.bouncer.y && (this.ball.x > this.bouncer.x && this.ball.x < this.bouncer.x + this.bouncer.w)) {
      this.score += 1;
      if (this.score >= this.highScore) {
        this.highScore += 1;
      }
      this.ball.vy = -this.ball.vy;
    }
    else if (this.ball.y > this.canvas.nativeElement.height) {
      this.score -= 1;
    }

    // ceiling and floor collision
    if (this.ball.y > this.canvas.nativeElement.height || this.ball.y < 0) {
      this.ball.vy = -this.ball.vy;
    }

    // bounces the ball of the sides
    if (this.ball.x > this.canvas.nativeElement.width || this.ball.x < 0) {
      this.ball.vx = -this.ball.vx;
    }

    if (this.goLeft) {
      if (this.bouncer.x >= 0) {
        this.bouncer.x -= this.bouncer.vx;
      }
    }
    else if (this.goRight) {
      if (this.bouncer.x + this.bouncer.w <= this.canvas.nativeElement.width) {
        this.bouncer.x += this.bouncer.vx;
      }
    }
    this.ctx.fillStyle = 'black'
    this.ctx.font = '30px serif';

    // this starts the game when you click on the canvas
    if (!this.started) {
      this.ctx.fillText("click to start", 150, 300, 200);
    }

    this.raf = window.requestAnimationFrame(this.draw.bind(this));
    this.ctx.fillText(this.score.toString(), 40, 40, 200);
    this.ctx.fillText("Time remaining: " + this.timeLeft, 300, 40, 200);
    if (this.score <= -25) {
      this.ball.x = 100;
      this.ball.y = 100;
      this.score = this.highScore;
    }
  }
}

function compare(a: any, b: any) {
  // Handle cases where score is missing or undefined
  const scoreA = a.score ?? -Infinity;
  const scoreB = b.score ?? -Infinity;

  if (scoreA < scoreB) return 1;
  if (scoreA > scoreB) return -1;

  // Secondary sort by createDate (if scores are equal)
  if (a.createDate && b.createDate) {
    if (a.createDate.seconds < b.createDate.seconds) return 1;
    if (a.createDate.seconds > b.createDate.seconds) return -1;

    // Further sort by nanoseconds if seconds are also the same
    if (a.createDate.nanoseconds < b.createDate.nanoseconds) return 1;
    if (a.createDate.nanoseconds > b.createDate.nanoseconds) return -1;
  }

  // If both score and createDate are identical, consider them equal
  return 0;
}

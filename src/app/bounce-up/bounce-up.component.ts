import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

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
  public originalTime: number = 90;
  public timeLeft: number = 1;
  public pause = false;
  public highScore = 0;
  public highestScore: number | undefined;
  public goLeft = false;
  public goRight = false;
  public name = '';
  public highScoresCollection = collection(this.firestore, 'high-scores');

  @ViewChild('myCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> = {} as unknown as ElementRef<HTMLCanvasElement>;
  public ctx: CanvasRenderingContext2D | undefined | null;

  public ball: any = {};
  public bouncer: any = {};

  public lastTime = 0;
  public deltaTime = 0;

  constructor(public firestore: Firestore) {}

  async ngOnInit() {
    this.timeLeft = this.originalTime;
    try {
      const querySnapshot = await getDocs(this.highScoresCollection);
      const scores: any[] = [];

      querySnapshot.forEach((doc) => {
        scores.push({ id: doc.id, ...doc.data() });
      });

      this.scores = scores.sort(compare);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  public ngAfterViewInit() {
    if (!this.canvas) return;

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

    this.canvas.nativeElement.addEventListener('mouseover' && 'click', () => {
      if (!this.started) {
        this.raf = window.requestAnimationFrame(this.draw.bind(this));
        this.started = true;
      }
    });

    this.canvas.nativeElement.addEventListener('keydown', (key: any) => {
      if (key.key === 'ArrowLeft' || key.key === 'a') this.goLeft = true;
      if (key.key === 'ArrowRight' || key.key === 'd') this.goRight = true;

      if (key.key === 'r' && this.pause) this.resetGame();

      // Listen for 'f' key press to toggle fullscreen
      if (key.key === 'f') this.toggleFullscreen();
    });

    this.canvas.nativeElement.addEventListener('keyup', (key: any) => {
      if (key.key === 'ArrowLeft' || key.key === 'a') this.goLeft = false;
      if (key.key === 'ArrowRight' || key.key === 'd') this.goRight = false;
    });

    this.bouncer.draw();
    this.ball.draw();
  }

  public async draw(timestamp: number) {
    if (!this.ctx) return;

    if (this.lastTime === 0) this.lastTime = timestamp;
    this.deltaTime = (timestamp - this.lastTime) / 1000; // Seconds since last frame
    this.lastTime = timestamp;

    if (this.pause) {
      this.ctx.fillStyle = 'black';
      this.ctx.font = '30px serif';
      this.ctx.fillText('Press R to Restart', 250, 150, 250);
      return;
    }

    this.ctx.fillStyle = 'rgba(127, 255, 0, .3)';
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.ball.x += this.ball.vx * this.deltaTime * 60;
    this.ball.y += this.ball.vy * this.deltaTime * 60;

    this.ball.draw();
    this.bouncer.draw();

    if (this.ball.y >= this.bouncer.y && (this.ball.x > this.bouncer.x && this.ball.x < this.bouncer.x + this.bouncer.w)) {
      this.score += 1;
      if (this.score >= this.highScore) this.highScore += 1;
      this.ball.vy = -this.ball.vy;
    } else if (this.ball.y > this.canvas.nativeElement.height) {
      this.score -= 1;
    }

    if (this.ball.y > this.canvas.nativeElement.height || this.ball.y < 0) {
      this.ball.vy = -this.ball.vy;
    }

    if (this.ball.x > this.canvas.nativeElement.width || this.ball.x < 0) {
      this.ball.vx = -this.ball.vx;
    }

    if (this.goLeft && this.bouncer.x >= 0) {
      this.bouncer.x -= this.bouncer.vx * this.deltaTime * 60;
    } else if (this.goRight && this.bouncer.x + this.bouncer.w <= this.canvas.nativeElement.width) {
      this.bouncer.x += this.bouncer.vx * this.deltaTime * 60;
    }

    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px serif';

    if (!this.started) {
      this.ctx.fillText('Click to start', 150, 300, 200);
    }

    this.raf = window.requestAnimationFrame(this.draw.bind(this));
    this.ctx.fillText(this.score.toString(), 40, 40, 200);
    this.ctx.fillText('Time remaining: ' + this.timeLeft, 300, 40, 200);

    if (this.score <= -25) {
      this.ball.x = 100;
      this.ball.y = 100;
      this.score = this.highScore;
    }

    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.pause = true;
      if (this.name !== '') {
        await addDoc(this.highScoresCollection, {
          name: this.name,
          score: this.highScore,
          createDate: new Date()
        });
      }
    }
  }

  public resetGame() {
    this.score = 0;
    this.timeLeft = this.originalTime;
    this.highScore = 0;
    this.pause = false;
    this.started = true;

    this.ball.x = 0;
    this.ball.y = 0;
    this.ball.vx = 4;
    this.ball.vy = 7;

    this.bouncer.x = 240;
    this.bouncer.y = 285;

    this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.raf = window.requestAnimationFrame(this.draw.bind(this));
  }

  // Method to toggle fullscreen
  public toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.canvas.nativeElement.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  }
}

function compare(a: any, b: any) {
  const scoreA = a.score ?? -Infinity;
  const scoreB = b.score ?? -Infinity;

  if (scoreA < scoreB) return 1;
  if (scoreA > scoreB) return -1;

  if (a.createDate && b.createDate) {
    if (a.createDate.seconds < b.createDate.seconds) return 1;
    if (a.createDate.seconds > b.createDate.seconds) return -1;

    if (a.createDate.nanoseconds < b.createDate.nanoseconds) return 1;
    if (a.createDate.nanoseconds > b.createDate.nanoseconds) return -1;
  }

  return 0;
}

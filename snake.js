let head;
class Snake {
  constructor() {
    console.log("constructor");
    this.body = [];
    this.xdir = 0;
    this.ydir = 0;
    let initialLength = 10;
    for (let i = 0; i < initialLength; i++) {
      this.body[i] = createVector(floor(w / 2) - i, floor(h / 2));
    } 
  }

  show() {
    for (let i=0;this.body.length>i;i++) {
      if(i==this.body.length-1){
        fill(getComputedStyle(document.documentElement).getPropertyValue('--snake-head-fill-color'));
        noStroke();
        rect(this.body[i].x-0.15, this.body[i].y-0.15,1.3,1.3,0.5);
      }
      else{
        fill(getComputedStyle(document.documentElement).getPropertyValue('--snake-body-fill-color'));
        noStroke();
        rect(this.body[i].x, this.body[i].y, 1, 1, 1);
      }
      
    }
    console.log("show");
  }

  setDir(x, y) {
    if (this.xdir === 0 && this.ydir === 0) {
      this.xdir = x;
      this.ydir = y;
      return;
    }
    if (this.xdir === -x && this.ydir === 0) {
      return;
    }
    if (this.ydir === -y && this.xdir === 0) {
      return;
    }
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    for (let i = 0; i < this.body.length - 1; i++) {
      this.body[i].x = this.body[i + 1].x;
      this.body[i].y = this.body[i + 1].y;
    }
    let head = this.body[this.body.length - 1];
    head.x += this.xdir * 0.3;
    head.y += this.ydir * 0.3;
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    head.x += this.xdir * 0.3;
    head.y += this.ydir * 0.3;
    this.body.push(head);
  }

  eat(foodPos, bigFoodPos) {
    let head = this.body[this.body.length - 1];
    let d = dist(head.x, head.y, foodPos.x, foodPos.y);
    if (d < 1) {
      this.grow();
      this.grow();
      print('food consumed');
      return { eaten: true, big: false };
    }
  
    d = dist(head.x, head.y, bigFoodPos.x, bigFoodPos.y);
    if (d < 1) {
      for (let i = 0; i < 10; i++) {
        this.grow();
      }
      print('big food consumed');
      return { eaten: true, big: true };
    }
    return { eaten: false };
  }
  

  gameEnd(){
    let x=this.body[this.body.length-1].x
    let y=this.body[this.body.length-1].y
    if (x<0 || x>w*0.99 ||y<0 || y>h*0.643){
      return true;
    }
    for (let i=0;this.body.length-1>i;i++) {
      let part=this.body[i]
      if(part.x==x && part.y==y){
        return true
      }
    }
    return false;
  }

  restartGame(){
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
  }
}

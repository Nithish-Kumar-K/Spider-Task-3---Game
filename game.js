function jav(){

  var e,score = 0,pause = 1,pspeed = 1,yspeed = 0,xspeed = 0;
  //yspeed is speed along y axis xspeed is along x axis
  //pspeed is speed of paddle and
  var reqid,frames = 1;
  lives = 3;
  //,toggleinvisible = 0;

  var arr = [];   //t is used to cycle the images for running of falcon
  document.getElementById('message').innerHTML = 'Press Enter to start the game, '
  +'Up arrow and down arrow will control the paddle';



  for (var i = 1; i <= 300; i++) {
    arr.push(0);
  }  // pause is 1 if it's pause
  //reqid is the requestID used and al tells if game over alert message has been
  // given or not, frames is to control the increase of score
  //arr is array of key checker
  var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame ||
  window.webkitCancelAnimationFrame;
  window.addEventListener('keydown', keycheck);
  function keycheck(e){
    arr[e.keyCode] = 1;
                                 //arr is a global variable that can
    //be used anywhere, e is local and and has the property keyCode arr stores e's
    //keyCode
  }
  window.addEventListener('keyup', keycheck2);
  function keycheck2(e){
    if(arr[80]){
        arr[80] = 0;
        location.reload();
        }
    if(arr[73]){
      arr[73] = 0;
    }
    if(e != 13 && e!= 38 && e!=40)
      arr[e.keyCode] = 0;  //enter(keycode 13) is a special case, as it is the
      //pause option
    }
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  function createElements(x,y,w,h,color,type){   //this is the main object
    //it will draw the images and clear them using it's functions it stores
    // the co-ordinates of all images, images are the instances of this object
    var i=0;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color= color;

    this.draw = function() {
      if(type == "paddle"){
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.rect(this.x,this.y,this.width,this.height );
        ctx.fill();
      }
      else{
        ctx.fillStyle=this.color;
        ctx.arc(this.x, this.y, this.width, 0, Math.PI*2);
        ctx.fill();
      }
    }

    this.update = function() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    this.crashWith = function(obj2) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = obj2.x;
      var otherright = obj2.x + (obj2.width);
      var othertop = obj2.y;
      var otherbottom = obj2.y + (obj2.height);
      var crash = true;
      if ((mybottom -2< othertop) || (mytop > otherbottom) ||
      (myright-4 < otherleft) || (myleft > otherright)) {
          crash = false;
      }
      return crash;
    }
  }
  var ypos = randomIntFromInterval(0,120);
  var paddle = new createElements(0,ypos,5,30,"green","paddle");
  var ball = new createElements(100,75.5,5,0,"red","ball");

  //the main thing to remember is that we should clear before we draw

  paddle.update();
  ball.update();
  paddle.draw();
  ball.draw();
  document.getElementById('message2').innerHTML = "Score: "+score+" "+"Lives: "+lives;
  xspeed = 2;

  function upd(){
    if( arr[13] == 1 && pause == 0){
      pause = 1;
      document.getElementById('message').innerHTML = 'Press enter for start/pause';
      arr[13] =0;
    }
    else if(arr[13] == 1 && pause == 1){
      document.getElementById('message').innerHTML = 'Press enter for start/pause';
      pause = 0;
      arr[13] = 0;
      }
    if(!pause){
      frames++;
      if(frames == 500) {
        frames = 1;       //frames becomes 1 again to prevent large values
        }
    //paddle controls
    if(arr[38] == 1 && paddle.y > 0){
      paddle.y -= 2;
      pspeed = -2;
    }
    if(arr[40] == 1 && paddle.y < 120){
      paddle.y += 2;
      pspeed = 2;
    }
    if(arr[40] != 1 && arr[38] !=1)
      pspeed = 0;
    if(ball.x >= 295)
      xspeed = -xspeed;
    else if (ball.crashWith(paddle)){
        score++;
        xspeed = -xspeed;
        if(score %3 == 0)
          xspeed += 0.5;
        yspeed += pspeed/5;
        paddle.y = randomIntFromInterval(0,120);
      }
    if(ball.y >= 145.5)
      yspeed = -yspeed;
    else if(ball.y <= 4)
      yspeed = -yspeed;

    ball.x += xspeed;
    ball.y += yspeed;
    paddle.update();
    ball.update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   }
   else{
     ctx.clearRect(0, 0, canvas.width, canvas.height);
   }
    paddle.draw();
    ball.draw();
    document.getElementById('message2').innerHTML ="Score: "+score+"            Lives: "+lives;
  }

  function animate() {
    reqAnimFrame = window.RequestAnimationFrame    ||
                window.webkitRequestAnimationFrame ||
                window.RequestAnimationFrame     ||
                window.RequestAnimationFrame
                ;
    reqid = reqAnimFrame(animate);
    upd();
  }
  animate();
  setInterval(function(){
      if(ball.x <= 0){
      if(lives != 0){
        lives--;
        ball.x = 100;
        ball.y = 75.5;
        xspeed = -xspeed;
        pause = 1;
        document.getElementById('message').innerHTML = 'Life Lost! '+lives+' lives left '+'Press enter for start/pause';
      }
      else
        stopAnimation();
      //if(lives)
      }
    }
  ,8);


  function stopAnimation(){
    cancelAnimationFrame(reqid);
    document.getElementById('message').innerHTML = 'Game Over! Press P to play again';
    }
}

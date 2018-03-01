"use strict";

window.onload = function() {
  const SPEED = 200;
  const GRAVITY = 900;
  const JET = 420; 
  var ocean;
  var player;
  
  var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
  
  var state = {
                
                jet: function(){
                  if(!this.gameStarted){
                    this.start();
                  }
                  if(!this.gameOver){

                    this.player.body.velocity.y = -JET;

                  } else if(this.time.now > this.timeOver + 400){
                      this.reset();
                  }
    
                },
                
                start: function(){
                  this.player.body.allowGravity = true;
                  this.scoreText.setText("SCORE\n"+this.score);
                  this.gameStarted = true;

                },
                
                preload: function(){
                  ocean = game.load.image('background', 'assets/ocean.png');
                  //ocean.scale.x = .5;
                  this.load.spritesheet('player', 'assets/polarBear.png', 200, 300);
                  
                },
                create: function(){
                  //ocean.scale.setTo(.5,.3);
                  this.physics.startSystem(Phaser.Physics.ARCADE);
                  this.physics.arcade.gravity.y = GRAVITY;
                  this.background = this.add.tileSprite(0,0,this.world.width, this.world.height, 'background');
                 
                  this.player = this.add.sprite(0,0, 'player');
                  
                  this.player.animations.add('fly', [0,1,2], 10, true);
                  this.physics.arcade.enableBody(this.player);
                  this.player.body.collideWorldBounds = true;
                  this.scoreText = this.add.text(
                        this.world.centerX,
                        this.world.height/5,
                        "",
                        {

                          size: "32px",
                          fill: "#FFF",
                          align: "center"

                        }
                  );
                  this.scoreText.anchor.setTo(.5,.5);
                  this.input.onDown.add(this.jet, this);

                  
                  this.reset();
                },
                update: function(){
                  if(this.gameStarted){
                    if(this.player.body.velocity.y > -20){
                      this.player.frame = 3;
                    }
                  } else { 
                   
                    this.player.animations.play("fly");
                  }
                  if(!this.gameOver){
                    if(this.player.body.bottom >= this.world.bounds.bottom){
                        this.setGameOver();
                    }

                  }

                  else{
                       this.player.y = this.world.centerY + (8*Math.cos(this.time.now/200));
                  }
                  
                },
                reset: function(){
                  this.gameStarted =false;
                  this.gameOver = false;
                  this.score =0;
                  this.player.body.allowGravity = false;
                  this.player.reset(this.world.width / 4, this.world.centerY);
                  this.player.animations.play('fly');
                  this.background.autoScroll(-SPEED*.8, 0);
                  this.scoreText.setText("Touch To\nStart Game");
                },
                setGameOver: function(){
                  this.gameOver = true;
                  this.scoreText.setText("FINAL SCORE\n" + this.score+"\n\nTOUCH TO\n TRY AGAIN");;
                  this.timeOver = this.time.now;
                }
  }
  
  var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    'game',
    state
   )
 
};
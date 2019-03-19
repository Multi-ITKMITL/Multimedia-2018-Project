var gameplaying = false;
var hitDetect;
var enemyInt;
var stage = $('#stage');
var gameCredits;

showWelcome();
$('#stage').css({'animation-play-state':'paused'});

$('.ctaRestartGame').click(function(){
  $('.item').remove();
  $('#bird').removeClass().attr('style', '');
  $('.restartGamePop').fadeOut();
 $('#credits span').html(0); 
  setTimeout(function(){
    $('#stage').css({'animation-play-state':'running'});
    gameplaying = true;
    gravitypull();
    hitDetect = setInterval(charHit, 5);
    enemyInt = setInterval(createItems, 600);
  },500);
});

$('.ctaStartGame').click(function(){
  $('.welcomePop').fadeOut();


  setTimeout(function(){
    $('#stage').css({'animation-play-state':'running'});
    gameplaying = true;
    gravitypull();
    hitDetect = setInterval(charHit, 5);
    enemyInt = setInterval(createItems, 600);
  },500);
});

$(document).keydown( function(e){

  if(e.keyCode == 32){
    if(gameplaying){
      $('#bird').removeClass('goDown').addClass('birdMove');
    }
  }
  if(e.keyCode == 38){
    if(gameplaying){
      $('#bird').removeClass('goDown').addClass('birdMove');
    }
  }
  if(e.keyCode == 37){
    if(gameplaying){
      $('#bird').removeClass('goDown').addClass('birdMove');
    }
  }

}); //end keydown

$(document).keyup(function(evt) {
  if (evt.keyCode == 32) {
    if(gameplaying){
      $('#bird').removeClass('birdMove').addClass('goDown');
    }
  }
  if (evt.keyCode == 38) {
    if(gameplaying){
      $('#bird').removeClass('birdMove').addClass('goDown');
    }
  }
   if (evt.keyCode == 37) {
    if(gameplaying){
      $('#bird').removeClass('birdMove').addClass('goDown');
    }
  }
});//end keyup

function gravitypull(){

  if(gameplaying){
    $('#bird').removeClass('birdMove').addClass('goDown');
  }
}


function charHit(){
  //check for enemies
  $('.enemy').each( function(){
    if( rectHit($('#bird'), $(this)) ){
      var birdPos = $('#bird').position().top;
      //remove enemies
      $(this).stop();
      $('#bird').css('top', birdPos);
      gameplaying = false;
      clearInterval(hitDetect);
      clearInterval(enemyInt);
      showRestartGame();
      $('#stage').css({'animation-play-state':'paused'});
    }
  });
  
  //check for credits
  $('.gold').each( function(){
    if( rectHit($('#bird'), $(this)) ){
      $(this).addClass('goldFound');
      //$('#bird').css('top', birdPos);
      updateCredits();
      setTimeout(function(){
        $(this).remove();
      },300);
    }
  });
}

function updateCredits() {
  gameCredits = Number($('#credits span').html());
  $('#credits span').html(gameCredits + 1);
}

function createItems(){
  //console.log('createItems');
  //create enemy
  var item = $('<div>').addClass('item');
  //decide if this is an enemy 1 or 2
  if(Math.random() > 0.3){
    item.addClass('enemy');
  }else{
    item.addClass('gold');        
  }

  //starting location for my enemies
  var eleft = stage.width() + 50;
  var etop = Math.random() * (stage.height()-50); //0 to (gameheight-50);

  item.css({top:etop, left:eleft});

  //add to stage:
  stage.append(item);

  //move enemy from right to left    
  item.animate({left: -100}, 3000, 'linear', function(){
    //callback function runs after animation is complete
    $(this).remove();

  });//end animate    

}//end createItems()    


//hit detect:
function rectHit(rectone, recttwo){
  //console.log('recthit called');
  var r1 = $(rectone);
  var r2 = $(recttwo);

  var r1x = r1.offset().left;
  var r1w = r1.width();
  var r1y = r1.offset().top;
  var r1h = r1.height();

  var r2x = r2.offset().left;
  var r2w = r2.width();
  var r2y = r2.offset().top;
  var r2h = r2.height();

  if( r1y+r1h < r2y ||
     r1y > r2y+r2h ||
     r1x > r2x+r2w ||
     r1x+r1w < r2x ){
    //console.log('recthit-false')
    return false;
  }else{
    //console.log('recthit-true')
    return true;
  }

}//end function 

function showWelcome() {
  $('.welcomePop').fadeIn();
}
function showRestartGame() {
  $('.restartGamePop').fadeIn();
}
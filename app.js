 angular.module("myapp", [])
   
   .controller("HelloController", function($scope,$interval) {
     
     $scope.showTile = false;
     $scope.countDown = 3;
     $scope.life = 3;
     $scope.startText = "Start";
     $scope.headingText  = "Do you want to play tiles?";
     $scope.tiles = [];
     
     var leftTile = 0;
     var num = 4;
     
     createRandomMatrix(4);
    
      function tile(x,y,bool){
          return {
              x:x,
              y:y,
              colored:bool
          }
      } 
      function createRandomMatrix(n){
         for(var i = 0; i<n; i++){
         var tileRow = [];
         for(var j = 0; j<n; j++){
             var obj = new tile(i,j,false);
             tileRow.push(obj);
         }
         $scope.tiles.push(tileRow);
     } 
     }
      function createRandomColoredCells(n){
          for(var i = 0; i<n; i++){
              colorOneCell();
         };
     }
      function colorOneCell(){
          var tileToBeColored  = $scope.tiles[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 4)];
        if(tileToBeColored.colored === false){
            tileToBeColored.colored = true;
        }else{
             colorOneCell();
        }
       
    }   
       function checkAllDone(){
           var check = true;
           leftTile = 0;
           for(var i =0; i < $scope.tiles.length;i++){
               for(var j=0; j< $scope.tiles[i].length;j++){
                   if($scope.tiles[i][j].colored){
                       check = false;
                       leftTile++;
                   }
               }
           }
           if(check){
               // alert('you won');
               $scope.headingText = "You are Awesome :D";
               $scope.showTile = false;
               $scope.startText = "Play Again";
                $scope.stopTimer();
           }
       }
     function countDownOver(){
         $scope.stopTimer();
       //alert('you lost try again');
        $scope.life--;
        if($scope.life > 0){
            $scope.tryAgain();
        }else{
            $scope.showTile = false;
            $scope.startText = "Play Again";
            $scope.headingText = "There is always a next time! :("
        }
     }
     
     
     $scope.changeColor = function(tile){
           tile.colored = false;
           checkAllDone();
       }
     $scope.tryAgain = function(){
          checkAllDone();
         createRandomColoredCells(5-leftTile);
         leftTile = 0;
         $scope.countDown = 3;
         $scope.timer = $interval(function(){
               if($scope.countDown >0){
                   $scope.countDown--;
               }else if($scope.countDown == 0){
                   countDownOver();
               }
          },1000,0);
         
     }
     
    $scope.startGame = function(){
           $scope.tiles = [];
           createRandomMatrix(4);
           createRandomColoredCells(5);
           $scope.showTile = true;
           $scope.countDown = 3;
           $scope.life = 3;
            $scope.timer = $interval(function(){
               if($scope.countDown >0){
                   $scope.countDown--;
               }else if($scope.countDown == 0){
                  countDownOver();
               }
           },1000,0);
       }
     $scope.stopTimer = function () {
           if (angular.isDefined($scope.timer)) {
                    $interval.cancel($scope.timer);
                }
            };
   });
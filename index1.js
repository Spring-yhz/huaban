
	var sketch=angular.module('sketch',[]);
	sketch.controller('sketchController',['$scope',function($scope){
		$scope.canvasWH={width:600,height:600}


		var canvas=document.querySelector('#canvas');
	 ctx=canvas.getContext('2d'); //相当于画笔

	var current;
	canvas.onmousedown=function(e){
		canvas.onmousemove=function(ev){
			ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
			if(current){
				ctx.putImageData(current,0,0);
			}
			ctx.beginPath();
			ctx.moveTo(e.offsetX,e.offsetY);
			ctx.lineTo(ev.offsetX,ev.offsetY);
			ctx.stroke();
		}
		document.onmouseup=function(){
			canvas.onmousemove=null;
			canvas.onmouseup=null;
			current=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
		}
	}

	
	canvas.onmousedown=function(e){
		canvas.onmousemove=function(ev){
			ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
			if(current){
				ctx.putImageData(current,0,0);
			}
			ctx.beginPath();
			var r=Math.abs(ev.offsetX-e.offsetX);
			ctx.arc(e.offsetX,e.offsetY,r,0,Math.PI*2);
			ctx.stroke();
		}
		document.onmouseup=function(){
			canvas.onmousemove=null;
			canvas.onmouseup=null;
			current=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
		}
	}


	    
	}])


	

	var sketch=angular.module('sketch',[]);
	sketch.controller('sketchController',['$scope',function($scope){
		$scope.canvasWH={width:600,height:600};
		$scope.tool = 'line';
		$scope.tools ={
			'画线':'line',
			'画圆':'arc',
			'矩形':'rect',
			'橡皮':'earse',
			'铅笔':'pen'
			
		}
		$scope.csState={
			fillStyle:'rgb(255,255,128)',
			strokeStyle:'red',
			lineWidth:'1',
			style:'stroke'
		}

		$scope.setStyle=function(s){
			$scope.csState.style=s;
		}

		$scope.newSketch = function(){
		if(previous){
			if( confirm('是否保存') ){
				location.href = canvas.toDataURL();		
			}
		}
		clearCanvas();
		previous = null;
	}
	$scope.save = function(ev){
		if(previous){
			ev.srcElement.href=canvas.toDataURL();
			ev.srcElement.download = 'mypic.png';
		}else{
			alert('空画布');
		}
	}
	 var canvas=document.querySelector('#canvas');
	 ctx=canvas.getContext('2d'); //相当于画笔

	var previous;
	$scope.settool=function(tool){
		$scope.tool=tool;
		console.log($scope.tool)
	}
	var clearcanvas=function(){
		ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
	}
	var setmousemove={
        arc:function(e){
	         canvas.onmousemove=function(ev){
				clearcanvas();
				if(previous){
					ctx.putImageData(previous,0,0);
				}
	        	ctx.beginPath();
	            var r=Math.abs(ev.offsetX-e.offsetX);
	            ctx.arc(e.offsetX,e.offsetY,r,0,Math.PI*2);
	           
	            if($scope.csState.style=='stroke'){
	            	 ctx.stroke();
	            	}else{
	            		ctx.fill();
	            	}
			}
	    },
		line:function(e){
	         canvas.onmousemove=function(ev){
				clearcanvas();
				if(previous){
					ctx.putImageData(previous,0,0);
				}
			
			    ctx.beginPath();
	            ctx.moveTo(e.offsetX,e.offsetY);
	            ctx.lineTo(ev.offsetX,ev.offsetY);
	            ctx.stroke();
			}
		},
		rect:function(e){
	         canvas.onmousemove=function(ev){
				clearcanvas();
				if(previous){
					ctx.putImageData(previous,0,0);
				}
				ctx.beginPath();
	            var w=ev.offsetX-e.offsetX;
	            var h=ev.offsetY-e.offsetY;
	            
	            if($scope.csState.style=='stroke'){
	            	ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,w,h);
	            }else{
	            	ctx.fillRect(e.offsetX-0.5,e.offsetY-0.5,w,h);
	            }
	           
			}
		},

		pen:function(e){
			 ctx.beginPath();
	         canvas.onmousemove=function(ev){
				clearcanvas();
				if(previous){
					ctx.putImageData(previous,0,0);
				}
			
			    ctx.lineTo(ev.offsetX,ev.offsetY);
	            ctx.stroke();
			}
		},
		earse:function(e){
			canvas.onmousemove=function(ev){
				ctx.clearRect(e.offsetX,e.offsetY,50,50);
			}
		}
	}
	
	canvas.onmousedown=function(e){
        setmousemove[$scope.tool](e);
       	ctx.fillStyle=$scope.csState.fillStyle;
       	ctx.strokeStyle=$scope.csState.strokeStyle;
       	ctx.lineWidth=$scope.csState.lineWidth;
		document.onmouseup=function(){
           canvas.onmousemove=null;
           canvas.onmouseup=null;
           previous=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
		}
	}
}])

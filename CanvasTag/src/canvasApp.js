	

	window.addEventListener('load', eventWindowLoaded,false);
	var Debugger = function(){};
	Debugger.log= function(message){
		try{
			console.log(message);
			
		}catch(exception){
			return;
		}
	};
	function eventWindowLoaded(){
		canvasApp();
		document.getElementById('divCanvas').onmouseover= mouseOver;
		document.getElementById('divCanvas').onmouseout= mouseOut;

		

	}
	function mouseOver(ev){
		MOUSE.setSmallXHairCursor('divCanvas');
		document.getElementById('divCanvas').onmousemove = mouseMove;
	};
	function mouseOut(ev){
		MOUSE.setDefaultCursor('divCanvas');
		document.getElementById('divCanvas').onmousemove = null;
	
	};
	
	function canvasSupport(){
		return Modernizr.canvas;
	}

	function mouseMove(ev){
		ev = ev || window.event;
		var mousePos=mouseCoords(ev);
		document.getElementById('mousePos').innerHTML= 'x:'+mousePos.x+'y:'+mousePos.y;
	}
	function mouseCoords(ev){
	
			return {x:ev.pageX, y:ev.pageY};
	
	}
	
	function canvasApp(){

		if(!canvasSupport()){
			return;
		}
		
		var theCanvas=document.getElementById('canvasOne');
		var context=theCanvas.getContext('2d');
		Debugger.log('DrawingCanvas');
		function drawScreen(){
			//background
			Debugger.log('DrawingRects');
			context.fillStyle = '#ffffaa';
			context.fillRect(0,0,500,300);
			//text
			context.fillStyle='#000000';
			context.font-'20px _sans';
			context.textBaseline='top';
			context.fillText('Hello World!',195,80);
			//image
			var helloWorldImage = new Image();
			helloWorldImage.src='../other/ok.png';
			helloWorldImage.onload = function(){
				context.drawImage(helloWorldImage,160,130);
				};
			//box
			context.strokeStyle ='#000000';
			context.strokeRect(5,5,490,290);
			Debugger.log('DrawingShapes');
			//draw some shapes
			context.fillRect(100,100,20,50);
			context.strokeRect(110,110,50,20);
			//fill circle
			context.beginPath();
			context.strokeStyle='black';
			context.lineWidth=5;
			context.arc(200,200,60,(Math.PI/180)*0,(Math.PI/180)*360,false);
			context.stroke();
			context.closePath();
			
			
		}
		drawScreen();
		
		
	}
	//end canvas app
	
	// Try to set the mouse style for the tag passed
	var MOUSE= (function(id){
		var my={};
		my.setDefaultCursor=function(id){
			document.getElementById(id).setAttribute('style', 'cursor:default');
			return;

		};
		my.setSmallXHairCursor=function(id){
			document.getElementById(id).setAttribute('style', 'cursor:crosshair');
			return;
		};
		return my;
		
	}());

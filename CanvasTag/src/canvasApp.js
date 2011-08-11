	

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
	
		document.getElementById('layer1').onmouseover= mouseOver;
		document.getElementById('layer1').onmouseout= mouseOut;
		canvasApp();
	}

	function mouseOver(ev){
		//MOUSE.setSmallXHairCursor('layer1');
		MOUSE.setHiddenCursor('layer1');
		document.getElementById('layer1').onmousemove = mouseMove;
	}
	
	function mouseOut(ev){
		MOUSE.setDefaultCursor('layer1');
		document.getElementById('layer1').onmousemove = null;
	
	}
	
	function canvasSupport(){
		return Modernizr.canvas;
	}

	function mouseMove(ev){
		ev = ev || window.event;
		var mousePos=mouseCoords(ev);
		document.getElementById('mousePos').innerHTML= 'x:'+mousePos.x+'y:'+mousePos.y;
		
		//setup canvas
		var theCanvas=document.getElementById('layer1');
		var context=theCanvas.getContext('2d');
		context.globalAlpha=1;
		context.clearRect(0,0,500,300);
		MOUSEcustom.setRingCursor(context,mousePos.x,mousePos.y,500,300);
		//MOUSEcustom.setHoleCursor(context,mousePos.x,mousePos.y,500,300);

	}
	
	function mouseCoords(ev){
		return {x:ev.pageX, y:ev.pageY};
	}
	
	function canvasApp(){

		if(!canvasSupport()){
			return;
		}
		
		var theCanvas=document.getElementById('layer0');
		var context=theCanvas.getContext('2d');
		Debugger.log('DrawingCanvas');
		function drawScreen(){
			//background
			Debugger.log('DrawingRects');
			/*
			context.fillStyle = '#ffffaa';
			context.fillRect(0,0,500,300);
			context.globalAlpha=1.0;
			//text
			context.fillStyle='#000000';
			context.font-'20px _sans';
			context.textBaseline='top';
			context.fillText('Hello World!',195,80);
			*/
			//image
			var helloWorldImage = new Image();
			helloWorldImage.src='../other/target1.jpg';
			helloWorldImage.onload = function(){
				//context.drawImage(helloWorldImage,0,0);
				context.drawImage(helloWorldImage,100,10,500,300,0,0,500,300);

				};
				/*
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
			//draw horiz line
			context.beginPath();
			context.moveTo(250,150);
			context.lineTo(250,300);
			context.stroke();
			context.closePath();
			*/
			
		}
		drawScreen();
		
		
	}
	//end canvas app
	
	// Try to set the mouse style for the id passed, css style set
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
		my.setHiddenCursor=function(id){
			document.getElementById(id).setAttribute('style', 'cursor:none');
			return;
		};
		
		return my;
		
	}());
	
	//custom cursor, drawn vs style
	var MOUSEcustom =(function(context,x,y,xMax,yMax){
		var my={};
		my.setRingCursor=function(context,x,y,xMax,yMax){
			Debugger.log('drawingLineforMouse');
			//context.save();
			context.strokeStyle='gray';
			context.lineWidth=2;
				context.beginPath();
					context.moveTo(10,y-50);
					context.lineTo(xMax,y-50);
					context.stroke();
				context.closePath();
			
				context.beginPath();
					context.moveTo(x-50,0);
					context.lineTo(x-50,yMax);
					context.stroke();
				context.closePath();
				return;
		};
		my.setHoleCursor=function(context,x,y,xMax,yMax){
			var offset=50;
			var radius=7;
			var length=7;
			context.strokeStyle='red';
			context.lineWidth=1;
			context.beginPath();
				context.arc(x-offset,y-offset,radius,(Math.PI/180)*0,(Math.PI/180)*360,false);
				context.stroke();
			context.closePath();
			//left
			context.beginPath();
					context.moveTo(x-offset-radius-length,y-offset);
					context.lineTo(x-offset-radius,y-offset);
					context.stroke();
			context.closePath();
			//right
			context.beginPath();
					context.moveTo(x-offset+radius+length,y-offset);
					context.lineTo(x-offset+radius,y-offset);
					context.stroke();
			context.closePath();
			//top
			context.beginPath();
					context.moveTo(x-offset,y-offset-radius-length);
					context.lineTo(x-offset,y-offset-radius);
					context.stroke();
			context.closePath();
			//bottom
			context.beginPath();
					context.moveTo(x-offset,y-offset+radius);
					context.lineTo(x-offset,y-offset+radius+length);
					context.stroke();
			context.closePath();
			
			
		};
		return my;
	}());
		
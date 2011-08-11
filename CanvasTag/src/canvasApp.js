	

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
		var activeLayer='layer1';
		//setup canvas
		var theCanvas=document.getElementById('layer1');
		var context=theCanvas.getContext('2d');
		//MOUSE.setSmallXHairCursor('layer1');
		MOUSE.setHiddenCursor('layer1');
		document.getElementById('layer1').addEventListener('mousemove',function(ev){mouseMove(context,ev)},false);

		//document.getElementById('layer1').onmousemove = mouseMove;
		document.getElementById('layer1').onmousedown = mouseDown;

		document.getElementById('layer').innerHTML= 'ScoringRings';
		document.getElementById('mode').innerHTML= 'InsertMode';

	}
	
	function mouseOut(ev){
		MOUSE.setDefaultCursor('layer1');
		document.getElementById('layer1').onmousemove = null;
	
	}
	function mouseDown(ev){
		ev=ev || window.event;
		var mousePos=mouseCoords(ev);
		document.getElementById('capturedClick').innerHTML= 'x:'+mousePos.x+'y:'+mousePos.y;
		//drawHole();

	}
	
	function canvasSupport(){
		return Modernizr.canvas;
	}

	function mouseMove(context,ev){
		Debugger.log('MouseMove');
		ev = ev || window.event;
		var mousePos=mouseCoords(ev);
		document.getElementById('mousePos').innerHTML= 'x:'+mousePos.x+'y:'+mousePos.y;
		//var context= this.context;
		//setup canvas
		//var theCanvas=document.getElementById('layer1');
		//var context=theCanvas.getContext('2d');
		
		context.globalAlpha=1;
		context.clearRect(0,0,500,300);
		//MOUSEcustom.setRingCursor(context,mousePos.x,mousePos.y,500,300);
		MOUSEcustom.setHoleCursor(context,mousePos.x,mousePos.y,500,300);

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
			
			//image
			var helloWorldImage = new Image();
			helloWorldImage.src='../other/target1.jpg';
			helloWorldImage.onload = function(){
				//context.drawImage(helloWorldImage,0,0);
				context.drawImage(helloWorldImage,100,10,500,300,0,0,500,300);

				};
			
		}
		drawScreen();
	}

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
		
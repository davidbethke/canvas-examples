	

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
		MOUSE.setSmallXHairCursor('layer1');
		document.getElementById('layer1').onmousemove = mouseMove;
	};
	function mouseOut(ev){
		MOUSE.setDefaultCursor('layer1');
		document.getElementById('layer1').onmousemove = null;
	
	};
	
	function canvasSupport(){
		return Modernizr.canvas;
	}

	function mouseMove(ev){
		ev = ev || window.event;
		var mousePos=mouseCoords(ev);
		document.getElementById('mousePos').innerHTML= 'x:'+mousePos.x+'y:'+mousePos.y;
		// try to create a large cursor composed of two lines, ie(mousePos.x,0),(mousePos.x,maxY)
		//setup?
		
		var drawn=0;
		//var lastImg= new Image();
		//setup canvas
		var theCanvas=document.getElementById('layer1');
		var context=theCanvas.getContext('2d');
		context.globalAlpha=1;
		context.clearRect(0,0,500,300);
		MOUSEcustom.setLargeXHairCursor(context,mousePos.x,mousePos.y,500,300);

		//if(!drawn){
		//lastImg.src=theCanvas.toDataURL('image/png');
		//drawn=1;
		//}
		
		Debugger.log('drawlastImg');
		//lastImg.onload=function(){
		//	context.drawImage(lastImg,0,0);
		//};
		/*
		Debugger.log('drawingLineforMouse');
		//context.save();
		context.strokeStyle='black';
		context.lineWidth=2;
			context.beginPath();
			
			
				context.moveTo(10,mousePos.y-50);
				context.lineTo(500,mousePos.y-50);
				context.stroke();

				context.closePath();
		
			context.beginPath();
				
				context.moveTo(mousePos.x-50,0);
				context.lineTo(mousePos.x-50,300);
				
				context.stroke();

				
			context.closePath();

		*/
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
			context.fillStyle = '#ffffaa';
			context.fillRect(0,0,500,300);
			context.globalAlpha=1.0;
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
			//draw horiz line
			context.beginPath();
			context.moveTo(250,150);
			context.lineTo(250,300);
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
	var MOUSEcustom =(function(context,x,y,xMax,yMax){
		var my={};
		my.setLargeXHairCursor=function(context,x,y,xMax,yMax){
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
		return my;
	}());
		
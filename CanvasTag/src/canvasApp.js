	

	window.addEventListener('load', eventWindowLoaded,false);
	//log events
	var Debugger = function(){};
	Debugger.log= function(message){
		try{
			console.log(message);
			
		}catch(exception){
			return;
		}
	};
	
	//Pseudo ENUMS
	var CursorType = {'holes':1,'rings':2};
	var Mode = {'insert':1,'delete':2};
	var LayersNumber={0:'layer0',1:'layer1',2:'layer2',3:'layer3'};
	var LayersName={'imageLayer':LayersNumber[0],'ringsLayer':LayersNumber[1],'holesLayer':LayersNumber[2],'cursorLayer':LayersNumber[3]};
	
	var dimension=function(){
		var startx;
		var starty;
		var width;
		var height;
	};
	
	//BOZO freeze don't work
	//Object.freeze(CursorType);
	
	// Try to make a layer object, should contain name, dimensions, 
	var Layer= function(){
		var name;
		var size = new dimension();
		var myObjects= new Array();
		this.getName=function(){ return this.name;};
		this.setName=function(name){this.name=name;};
		this.setSize=function(size){this.size=size;};
		this.getNumberOfObjects=function(){return myObjects.length;};
		this.addObject=function(someObj){myObject.push(someObj);};
		this.getObjects=function(){return myObjects;};
		
	}();
	
	function eventWindowLoaded(){
	
		document.getElementById(LayersName.cursorLayer).onmouseover= mouseOver;
		document.getElementById(LayersName.cursorLayer).onmouseout= mouseOut;
		document.getElementById('layer').onmouseup= layerClick;
		document.getElementById('mode').onmouseup= modeClick;
		
		canvasApp();
	}
	
	//helper functions for nicer looking code?
	function modeClick(){
		Debugger.log('ModeClick');
		value=document.getElementById('mode').getAttribute('value');
		if (value =='insert'){
			document.getElementById('mode').setAttribute('value','delete');
			document.getElementById('mode').innerHTML='DeleteMode';
		}
		else{
			document.getElementById('mode').setAttribute('value','insert');
			document.getElementById('mode').innerHTML='InsertMode';
		}
	}
	function layerClick(){
		Debugger.log('LayerClick');
		value=document.getElementById('layer').getAttribute('value');
		if (value == 'ringsLayer'){
			document.getElementById('layer').setAttribute('value', 'holesLayer');
			document.getElementById('layer').innerHTML='BulletHoles';
		}
		else{
			document.getElementById('layer').setAttribute('value', 'ringsLayer');
			document.getElementById('layer').innerHTML='ScoringRings';
		}
	}
	function getCursorType(){
		var layer= document.getElementById('layer').getAttribute('value');
		if(layer == 'holesLayer'){
			return CursorType.holes;
		}
		else{
			return CursorType.rings;
		}
		
	}
	function getActiveLayer(){
		return document.getElementById('layer').getAttribute('value');
	}
	function getActiveMode(){
		return document.getElementById('mode').getAttribute('value');
	}
	function isCenterSet(){
		return document.getElementById('center').getAttribute('set');
	}
	function getRingCenter(){
		return document.getElementById('center').innerHTML;
	}

		// this is where most of the action happens
	function mouseOver(ev){
		var activeLayer= getActiveLayer();
		var activeMode= getActiveMode();
		Debugger.log('ActiveLayer:'+activeLayer);
		Debugger.log('ActiveMode:'+activeMode);
		Debugger.log('ActiveName:'+LayersName[activeLayer]);
		
		//setup Active layer canvas
		var activeCanvas=document.getElementById(LayersName[activeLayer]);
		var activeContext=activeCanvas.getContext('2d');
		
		//setup Cursor canvas
		var cursorCanvas=document.getElementById(LayersName.cursorLayer);
		var cursorContext=cursorCanvas.getContext('2d');
		
		var cursorType= getCursorType();
		
		//MOUSE.setSmallXHairCursor('layer1');
		MOUSE.setHiddenCursor(LayersName.cursorLayer);
		document.getElementById(LayersName.cursorLayer).addEventListener('mousemove',function(ev){mouseMove(cursorContext,cursorType,ev)},false);

		//document.getElementById('layer1').onmousemove = mouseMove;
		//document.getElementById(LayersName.cursorLayer).onmousedown = mouseDown;
		document.getElementById(LayersName.cursorLayer).addEventListener('mousedown',function(activeContext,activeLayer,activeMode,ev){return mouseDown(activeContext,activeLayer,activeMode,ev)}(activeContext,activeLayer,activeMode,ev),false);


		//document.getElementById('mode').innerHTML= 'InsertMode';

	}
	
	function mouseOut(ev){
		MOUSE.setDefaultCursor(LayersName.cursorLayer);
		document.getElementById(LayersName.cursorLayer).onmousemove = null;
	
	}
	function mouseDown(context,activeLayer,activeMode,ev){
		Debugger.log('MouseDown');
		Debugger.log('ModePassed:'+Mode[activeMode]);
		Debugger.log('ModeCompare:'+Mode.insert);
		Debugger.log('LayerPassed:'+LayersName[activeLayer]);
		Debugger.log('LayerCompare:'+LayersName.holesLayer);
		ev=ev || window.event;
		var mousePos=mouseCoords(ev);
		document.getElementById('capturedClick').innerHTML= 'x:'+mousePos.x+'y:'+mousePos.y;
		if(Mode[activeMode] == Mode['insert']) {
			Debugger.log('compareModePassed');
			if (LayersName[activeLayer] == LayersName.holesLayer){
				drawHole(context,mousePos.x,mousePos.y);
			}
		}
		/*
		if(isCenterSet()){
			var center= getRingCenter();
		}
		else{
			center={x:x,y:y};
		}
		*/
	}
	function drawHole(context,x,y){
		var offset=50;
		var radius=10;
		context.strokeStyle='red';
		context.fillStyle='silver';
		context.lineWidth=1;
		context.beginPath();
			context.arc(x-offset,y-offset,radius,(Math.PI/180)*0,(Math.PI/180)*360,false);
			context.stroke();
			context.fill();
		context.closePath();
			
	}
	function drawRing(context,x,y){
		var offset=50;
		var radius=Math.SQRT2(Math.S)
		context.strokeStyle='yellow';
		
		context.lineWidth=2;
		context.beginPath();
			context.arc(x-offset,y-offset,radius,(Math.PI/180)*0,(Math.PI/180)*360,false);
			context.stroke();
		context.closePath();
				
	}
	
	function canvasSupport(){
		return Modernizr.canvas;
	}

	function mouseMove(context,cursorType,ev){
		//Debugger.log('MouseMove');
		ev = ev || window.event;
		var mousePos=mouseCoords(ev);
		document.getElementById('mousePos').innerHTML= 'x:'+mousePos.x+'y:'+mousePos.y;
		
		context.globalAlpha=1;
		context.clearRect(0,0,500,300);
		
		if(cursorType == CursorType.holes){
			//MOUSEcustom.setRingCursor(context,mousePos.x,mousePos.y,500,300);
			MOUSEcustom.setHoleCursor(context,mousePos.x,mousePos.y,500,300);
		}
		else{
			MOUSEcustom.setRingCursor(context,mousePos.x,mousePos.y,500,300);
		}

	}
	
	function mouseCoords(ev){
		return {x:ev.pageX, y:ev.pageY};
	}
	
	 //loads target image
	function canvasApp(){

		if(!canvasSupport()){
			return;
		}
		
		var theCanvas=document.getElementById(LayersName.imageLayer);
		var context=theCanvas.getContext('2d');
		Debugger.log('DrawingCanvas');
		function drawScreen(){
			//background
			//Debugger.log('DrawingRects');
			
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

	// Some mouse modules?
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
			//Debugger.log('drawingLineforMouse');
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
		
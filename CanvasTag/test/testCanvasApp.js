TestCanvasApp =  TestCase('testCanvasApp');

TestCanvasApp.prototype.setUp= function(){
	
};

TestCanvasApp.prototype.tearDown= function(){
	
};

TestCanvasApp.prototype.testCanvasSupport=function(){
	assertTrue(canvasSupport());
};
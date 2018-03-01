console.log('加载main.js成功！');
require.config({
	paths: {
		"socketio":"lib/socketio",
		"mainloop":"lib/mainloop.min",
		"pixi":"lib/pixi.min"
	},
	shim: {
		socketio: { deps: [] },
		mainloop: { deps: [] },
		pixi: { deps: [] },
	}
});
console.log('加载配置成功！');

//游戏数据更新逻辑
function update(){
	//console.log("gameloop update...");
}

//游戏画面渲染逻辑
var pixiApp = null;
function draw(){
	//console.log(pixiApp);	
}

//初始化2D渲染库
function initPIXI(pixi){
	
	//Create a Pixi Application
	var app = new pixi.Application({width: 256, height: 256});

	//全窗口
	app.renderer.view.style.position = "absolute";
	app.renderer.view.style.display = "block";
	app.renderer.autoResize = true;
	app.renderer.resize(window.innerWidth, window.innerHeight);
	
	//Add the canvas that Pixi automatically created for you to the HTML document
	document.body.appendChild(app.view);
	
	
	console.log("pixi加载成功！");
	return app;
	
}

require(['gameClientEngine','pixi'],function(engine,pixi){
	
	pixiApp=initPIXI(pixi);
	
	console.log("客户端游戏引擎加载成功！");
	engine.start(update,draw);
	
});

window.console.log('加载main.js成功！');
require.config({
	paths: {
		'socketio':'lib/socketio',
		'mainloop':'lib/mainloop.min',
		'pixi':'lib/pixi.min'
	},
	shim: {
		socketio: { deps: [] },
		mainloop: { deps: [] },
		pixi: { deps: [] },
	}
});
window.console.log('加载配置成功！');

require(['gameClientEngine','pixi'],function(engine,pixi){
	
	initPIXI(pixi);
	
	window.console.log('客户端游戏引擎加载成功！');
	engine.start(update,draw);
	
	
});

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
	pixiApp = new pixi.Application({width: 256, height: 256});

	//全窗口
	pixiApp.renderer.view.style.position = 'absolute';
	pixiApp.renderer.view.style.display = 'block';
	pixiApp.renderer.autoResize = true;
	pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
	
	//Add the canvas that Pixi automatically created for you to the HTML document
	document.body.appendChild(pixiApp.view);

	//
	pixi.loader.add('/views/assets/img/timg.jpg')
		.load(function(){
			var cat = new pixi.Sprite(pixi.loader.resources['/views/assets/img/timg.jpg'].texture);
			pixiApp.stage.addChild(cat);
		});
	
	
	window.console.log('pixi加载成功！');
	
}

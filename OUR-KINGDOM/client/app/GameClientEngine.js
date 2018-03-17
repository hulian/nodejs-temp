define(['socketio','mainloop'],function(socketio,mainloop){
	
	//接口--游戏引擎启动
	function start(update,draw){
		
		//初始化网络连接
		initSocketio(socketio);
		
		//启动gameloop
		startGameLoop(update,draw);
		
		window.console.log('客户端游戏引擎启动！');
	}
	
	//接口--游戏引擎关闭
	function stop(){
		
		//关闭gameloop
		stopGameLoop();
		
		window.console.log('客户端游戏引擎关闭！');
	}
	
	
	function initSocketio(){
		var token = getCookie('token');
		window.console.log('初始化WEBSOCKET,token:'+token);
		var socket = socketio.connect('http://localhost:3000',{'query':'token='+token});
		socket.emit('command',{'command':'testDao'},function(data){
			window.console.log(data);
		});
	}
	
	function getCookie(c_name)
	{
		if (document.cookie.length>0)
		{
			var c_start=document.cookie.indexOf(c_name + '=');
			if (c_start!=-1)
			{ 
				c_start=c_start + c_name.length+1; 
				var c_end=document.cookie.indexOf(';',c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			} 
		}
		return '';
	}
	
	function startGameLoop(update,draw){
		mainloop.setUpdate(update).setDraw(draw).start();
	}
	
	function stopGameLoop(){
		mainloop.stop();
	}
		
	
	return{
		start:start,
		stop:stop
	};
});
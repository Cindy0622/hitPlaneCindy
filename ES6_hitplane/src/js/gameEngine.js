


//游戏引擎
let gameEngine = {
	
	//属性
	//游戏区域，在背景图的区域
	ele:null,
	bullets:[], //当前页面上显示的所有子弹
	enemys:[], //当前页面上显示的所有敌机
	
	//总分数
	totalScore:0,
	
	//方法
	//init
	init(){
		this.ele = document.getElementById("main");
		return this;
	}, 
	
	//开始游戏
	start(){
		console.log("开始游戏");
		
		//加载游戏
		
		this.loading(function(){
			console.log("游戏加载完成!");
			
			//创建我的飞机,且让其可以拖动
			myPlane.init().move();
			//让我的飞机可以发射子弹
			myPlane.fire();
			
			//创建敌机
			gameEngine.createEnemy();
			
			//检测碰撞
			gameEngine.crashListening();
			
			//移动背景图
			gameEngine.moveBackground();
		});
		
	},
	
	//加载游戏
	loading(cb){
		
		//logo
		let logo = document.createElement("div");
		gameEngine.ele.appendChild(logo);
		logo.className="logo";
		
		//load
		let load = document.createElement("div");
		gameEngine.ele.appendChild(load);
		load.className="load";
		
		//load 动画
		let img =["images2/loading1.png","images2/loading2.png","images2/loading3.png"];
		
		let i=0;
		let timer = setInterval(()=>{
			
			if(i>=5){
				clearInterval(timer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//加载完成时回调
				if(cb) cb();
				
			}
			else{
				load.style.background = "url("+img[++i%3]+") no-repeat";
			}
			
			
		},500);
		
	},
	
	//创建敌机
	createEnemy(){
		//随机创建敌机
		//创建大敌机
		setInterval(()=>{
			let b = Math.random()>0.5 ? true : false;
			if(b){
				let enemy = new Enemy(Enemy.prototype.ENEMY_TYPE_LARGE);
			    enemy.init().move();
			}
		},6000);
		
		//创建中敌机
		setInterval(()=>{
			let b = Math.random()>0.4 ? true : false;
			if(b){
				let enemy = new Enemy(Enemy.prototype.ENEMY_TYPE_MIDDLE);
				enemy.init().move();
			}
		},3000);
		
		//创建小敌机
		setInterval(()=>{
			let b = Math.random()>0.5 ? true : false;
			if(b){
				let enemy = new Enemy(Enemy.prototype.ENEMY_TYPE_SMALL);
				enemy.init().move();
			}
		},2000);
	},
	
	//碰撞检测
	crashListening(){
		
		let timer = setInterval(()=>{
			
			//遍历所有敌机
			for(let i =0;i<gameEngine.enemys.length;i++){
				
				//遍历所有子弹
				for(let j=0;j<gameEngine.bullets.length;j++){
					
					//判断每个敌机节点跟每个子弹节点是否由碰撞
					
					if( isCrash(gameEngine.enemys[i].ele,gameEngine.bullets[j].ele) ){
//						console.log("发生了碰撞");
						
						//让子弹爆炸并消失
						gameEngine.bullets[j].boom();
						gameEngine.bullets.splice(j--,1);
						//让敌机受到一点伤害
						gameEngine.enemys[i].hurt();
					}
				}	
					//判断敌机是否与我的飞机发生碰撞
					
				if(isCrash(gameEngine.enemys[i].ele,myPlane.ele)){
					console.log("gameOver!");
					
					clearInterval(timer);
					//我的飞机爆炸
					myPlane.boom(function(){
						
						
						let myName = prompt("请留下您的大名， 您当前的分数是:"+gameEngine.totalScore,"");
						
						ajax({
							type:"post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data:{name:myName, score : gameEngine.totalScore},
							
							success: function(data){
								console.log("提交成功:"+data);
								
								//进入排行榜
								location.href ="03_rand.html";
							}
						})
					});
					
					break;
					
				}
				
				
			}
		},30);
	},
	
	//移动背景图
	moveBackground(){
		let y= 0;
		setInterval(()=>{
			gameEngine.ele.style.backgroundPositionY = y++ +"px";
		},30);
	}
    
	
}

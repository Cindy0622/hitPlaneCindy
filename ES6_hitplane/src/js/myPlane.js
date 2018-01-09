

//创建我的飞机
let myPlane ={
	
	ele:null,
	fireInterval :300, //发射子弹的间隔
	//方法
	
	//init
	init(){
		
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		this.ele.className ="myplane";
		this.ele.style.left =(gameEngine.ele.offsetWidth- this.ele.offsetWidth)/2 +"px";
		this.ele.style.top = gameEngine.ele.offsetHeight - this.ele.offsetHeight +"px";
		return this;
	},
	
	//开火发射子弹
	fire(){
		setInterval(()=>{
			
			//创建子弹对象并发射
			let bullet = new Bullet();
			bullet.init().move();
			
		},this.fireInterval);
	},
	
	//move 拖拽移动
	move(){
		
		myPlane.ele.onmousedown= (e)=>{
			e = e||event;
			let disx = e.offsetX;
			let disy = e.offsetY;
			
			document.onmousemove = (e)=>{
				e = e||event;
				
				let x = e.pageX - disx - gameEngine.ele.offsetLeft;
				let y = e.pageY - disy;
				if(x<=0){
					x=0;
				}else if(x>= gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth){
					x= gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
				}
				myPlane.ele.style.left = x +"px";
				myPlane.ele.style.top = y +"px";
				
			}
			
			document.onmouseup = ()=>{
				document.onmousemove=null;
				document.onmouseup = null;
			}
		}
	},
	
	boom(callback){
		//停止发射子弹
		clearInterval(this.timer);
		
		//动画
		let dieImgs = ["images2/me_die1.png", "images2/me_die2.png", "images2/me_die3.png", "images2/me_die4.png"];
		let i =0;
		let dieTimer = setInterval(()=>{
			
			if(i>= dieImgs.length){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(myPlane.ele);
				
				callback();
			}else{
				myPlane.ele.style.backgroundImage= "url(" + dieImgs[i++] +")";
			}
		},100)
		
	}
	
	
}

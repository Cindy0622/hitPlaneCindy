


class Bullet extends Base{
	
	//属性
	constructor() {
		super();
	    //this.ele = null;
	}
	
	
	//方法
	//init
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		//将子弹节点添加到页面的同时，将子弹对象添加到数组bullets中保存
		gameEngine.bullets.push(this);
		
		
		this.ele.className="bullet";
		this.ele.style.left = myPlane.ele.offsetLeft+ myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2+"px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight +"px";
		return this;
	}
	
	//移动
	move(){
		
	 let that = this;
		this.timer= setInterval(()=>{
			
			if(that.ele.offsetTop<=-18){
				clearInterval(that.timer);//停止运动
				gameEngine.ele.removeChild(that.ele);//删除子弹节点
				
				//当子弹节点从页面上移除的同时，将当前的子弹对象从数组bullets中移除
				gameEngine.bullets.splice(gameEngine.bullets.indexOf(that),1);
				
				
			}
			else {
				that.ele.style.top = that.ele.offsetTop - 10+"px";
			}
		},30)
	}
	
	//爆炸
	
	boom(){
		//停止移动
		clearInterval(this.timer);
		
		this.ele.className="bullet-die";
		
		//爆炸动画
		let that = this;
		let dieImgs=["images2/die1.png","images2/die2.png"];
		
		let i=0;
		let dieTimer = setInterval(()=>{
			
			if(i>=1){
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(that.ele);//移除子弹节点
				
			}
			else{
				that.ele.style.background= "url(" + dieImgs[++i] +") no-repeat";
			}
		},100);
	}
	
}

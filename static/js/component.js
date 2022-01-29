/**
 * param {
			 title:'窗口',必传
			 width:800,
			 height:400,
		 }
		 ondblclick=\"dbClik(this)\"
 */
// 弹窗组件
Vue.component('modal',{
	template:"<div>\
				<div >\
	 	            <div  class=\"winDialog captionModalDialog\"  data-val=\"0,0,0,0\" :style=\"style\" >\
	 	                <div id=\"caption\" class=\"winCaption captionModal\" style=\"border-top: 1px solid #c1e1ff;border-bottom: 1px solid #c1e1ff;\" onmousedown=\"mosDown(this,event)\" onmouseup=\"mosUp()\" >\
	 	                    <div class=\"winLeft\">...<\/div>\
	 	                    <div class=\"winText\">{{title}}<\/div>\
	 	                    <div class=\"winRightback\"><\/div>\
	 	                    <div class=\"winClose\" @click=\"closeModal\"><\/div>\
	 	                </div>\
	 	                <hr class=\"winLine\"/>\
						<slot ref=\"modal\" ></slot>\
	 	            </div>\
	 	        </div>\
	 	        <div >\
	 	        </div>\
	 	        <div id=\"backGound\" @click=\"closeModal\" style=\"width:100%;height:100%;background-color:#494949;opacity:0.6;position:fixed;top:0;left:0\" ></div>\
			</div>",
	 props:{
		param:{
			type:Object,
			require:true
		},
		close:{
			type:Function,
			require:true
		},
	 },
	 data:function(){
		 return{
			 title:'窗口',
			 width:800,
			 height:400,
			 style:'',
			 contentH: "",
			 // initStyle:'',
			 // max:'',
			 // state:0,//初始值
		 }
	 },
	 mounted:function(){
		 var $this = this;
	 	setTimeout(function(){
			
			$this.init();
		},1000)
	 },
	 methods:{
		init:function(){
			var size = this.WinSize();
			if(this.param.title){
				this.title = this.param.title;
			}
			if(this.param.width){
				this.width = size.width-100 > this.param.width ? this.param.width : size.width-100;
			}
			if(this.param.height){
				this.height = size.height-60 > this.param.height ? this.param.height : size.height-60;
			}
			var top = (size.height - this.height) / 2;
			var left = (size.width - this.width) / 2;
			if(top>80) top = 80;
			this.style = 'top:'+top +'px;left:'+left+'px;width:'+this.width+'px;height:'+this.height+'px';
		},
		changTitle:function(title){
			this.title = title;
		},
		WinSize:function (win) {
		    if (win == undefined || win == null) { win = window; }
		    var winHei = win.document.documentElement.clientHeight || win.innerHeight;
		    var winWid = win.document.documentElement.clientWidth || win.innerWidth;
		    return { width: winWid, height: winHei };
		},
		closeModal:function(){
			this.$emit('close');
		},
		dbclick:function(){
			if(this.state == 0){//最大化
				this.state = 1;
				this.ininStyle = this.style;
				var wSize = WinSize();
				// { width: wSize.width - 12, height: wSize.height - 12, left: 6, top: 6 }
			}else{//还原
				this.state = 0;
				// { width: toVal.width, height: toVal.height, left: toVal.left, top: toVal.top }
			}
		}
	 }
})
// <div class=\"winMin\" onclick=\"chgWin(this)\"><\/div>最小化
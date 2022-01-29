// 弹窗组件
Vue.component('Drag', {
	template: "<div id=\"box\" style=\"zoom:100%;\" @wheel=\"bbimg($event)\" v-show=\"isMyshow\">\
	     <img id=\"img\" border=\"0\" :src=\"mysrc\"/>\
	     <div id=\"scale\"></div>\
			<div class=\"btn\">\
				<i class=\"dxicon dxicon-uniE9DE\" style=\"margin-right: 5px;\" @click=\"toBIgChange\"></i>\
				<i class=\"dxicon dxicon-uniE9DF\" style=\"margin-right:5px;\" @click=\"toSmallChange\"></i>\
				<i class=\"dxicon dxicon-refresh\" style=\"margin-right:5px;\" @click=\"imgRoll('right')\"></i>\
				<i class=\"dxicon dxicon-uniECFE\" @click=\"close()\"></i>\
			</div>\
	  </div>\
	",
	props: {
        myshow:{
        	type:Boolean,
        	default:false
        },
		mysrc:{
			type:String,
		},
		myparent:{
			type:String,
		}
	},
	data: function() {
		return {
			odiv: null,
			current: 0,
			multiples: 1,
			isMyshow:true,
		}
	},
	mounted: function() {
		this.isMyshow=this.myshow;
		this.initDate();
	},
	methods: {
		initDate(){
			var box = document.getElementById("box");
			var fa = document.getElementById(this.myparent);
			var scale = document.getElementById("scale");
			box.onmousedown = function(ev) {
				var oEvent = ev;
				// 浏览器有一些图片的默认事件,这里要阻止
				oEvent.preventDefault();
				var disX = oEvent.clientX - box.offsetLeft;
				var disY = oEvent.clientY - box.offsetTop;
				fa.onmousemove = function(ev) {
					oEvent = ev;
					oEvent.preventDefault();
					var x = oEvent.clientX - disX;
					var y = oEvent.clientY - disY;
			
					// 图形移动的边界判断
					x = x <= 0 ? 0 : x;
					x = x >= fa.offsetWidth - box.offsetWidth ? fa.offsetWidth - box.offsetWidth : x;
					y = y <= 0 ? 0 : y;
					y = y >= fa.offsetHeight - box.offsetHeight ? fa.offsetHeight - box.offsetHeight : y;
					box.style.left = x + 'px';
					box.style.top = y + 'px';
				}
				// 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
				fa.onmouseleave = function() {
					fa.onmousemove = null;
					fa.onmouseup = null;
				}
				// // 鼠标弹起后停止移动
				fa.onmouseup = function() {
					fa.onmousemove = null;
					fa.onmouseup = null;
				}
			}
			// 右下角图片缩放效果
			scale.onmousedown = function(e) {
				// 阻止冒泡,避免缩放时触发移动事件
				e.stopPropagation();
				e.preventDefault();
				var pos = {
					'w': box.offsetWidth,
					'h': box.offsetHeight,
					'x': e.clientX,
					'y': e.clientY
				};
				fa.onmousemove = function(ev) {
					ev.preventDefault();
					// 设置图片的最小缩放为30*30
					var w = Math.max(30, ev.clientX - pos.x + pos.w)
					var h = Math.max(30, ev.clientY - pos.y + pos.h)
					// console.log(w,h)
			
					// 设置图片的最大宽高
					w = w >= fa.offsetWidth - box.offsetLeft ? fa.offsetWidth - box.offsetLeft : w
					h = h >= fa.offsetHeight - box.offsetTop ? fa.offsetHeight - box.offsetTop : h
					box.style.width = w + 'px';
					box.style.height = h + 'px';
					// console.log(box.offsetWidth,box.offsetHeight)
				}
				fa.onmouseleave = function() {
					fa.onmousemove = null;
					fa.onmouseup = null;
				}
				fa.onmouseup = function() {
					fa.onmousemove = null;
					fa.onmouseup = null;
				}
			}
		},
		toBIgChange() {
			// if (this.multiples >= 2) {
			//   return;
			// }
			this.multiples += 0.25;
			this.commonChange();
		},
		// 缩小
		toSmallChange() {
			// if (this.multiples <= 1) {
			//   return;
			// }
			this.multiples -= 0.25;
			this.commonChange();
		},
		// 按钮缩放图片
		imgToSize(oBool) {
			var pic = document.getElementById("box");
			pic.style.zoom = parseInt(pic.style.zoom) + (oBool ? 2 : -2) + '%';
		},
		imgRoll(direction) {
			if (direction == "left") {
				this.current = (this.current - 90) % 360;
			} else if (direction == "right") {
				this.current = (this.current + 90) % 360;
			}
			this.commonChange();
		},
		//图片缩放
		bbimg(e) {
			this.multiples += e.wheelDelta / 1200;
			if (this.multiples >= 0.2) {
				this.commonChange();
			} else {
				this.multiples = 0.2;
				this.commonChange();
				return false;
			}
		},
		mouseDownEvent(e) {
			var oEvent = e;
			// 浏览器有一些图片的默认事件,这里要阻止
			oEvent.preventDefault();
			var disX = oEvent.clientX - box.offsetLeft;
			var disY = oEvent.clientY - box.offsetTop;
		},
		mouseMoveEvent(e) {
			oEvent = e;
			oEvent.preventDefault();
			var x = oEvent.clientX - disX;
			var y = oEvent.clientY - disY;
			// 图形移动的边界判断
			x = x <= 0 ? 0 : x;
			x = x >= fa.offsetWidth - box.offsetWidth ? fa.offsetWidth - box.offsetWidth : x;
			y = y <= 0 ? 0 : y;
			y = y >= fa.offsetHeight - box.offsetHeight ? fa.offsetHeight - box.offsetHeight : y;
			box.style.left = x + 'px';
			box.style.top = y + 'px';
		},
		commonChange(){
			var pic = document.getElementById("img");
			pic.style.transform = 'rotate(' + this.current + 'deg)'+' '+'scale('+this.multiples+','+this.multiples+')';
		},
	    close(){
			this.isMyshow=false;
		},
		show(){
			this.isMyshow=true;
		}
	}
})

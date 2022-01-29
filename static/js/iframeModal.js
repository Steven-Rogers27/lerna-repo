/**
 * obj={
	width:500, 宽度
	height:300, 高度
	url:'animate.html' 地址
	}
 */

var globalModal = {
	count:0,//打开弹层个数
	top:80,//距顶部距离
	minWidth:200,//最小化宽度
	mixCount:4,//最大弹层个数 0开始的
	obj:{},
	init:function(obj){//初始化弹窗
		this.obj = obj;
		
		console.log(this);
		if(this.count>this.mixCount){
			DX.optionTitle('最多打开5个窗口');return;
		}
		this.count+=1;
		var width = $(window).width();
		var left = (width - obj.width)/2;
		
		var str = 'left:'+left+'px;top:'+this.top+'px';
		var text = "";
		text += "<div class=\"iframeModel\" style="+str+" number="+this.count+">";
		text += "		<div class=\"modelTop clearfix\">";
		text += "			<span class=\"fr close\">&#59846</span>";
		text += "			<span class=\"fr big none\">&#59847</span>";
		text += "			<span class=\"fr small\">&#59848</span>";
		text += "		</div>";
		text += "		<iframe  width="+obj.width+"px height="+obj.height+"px  src="+obj.url+"></iframe>";
		text += "	</div>";
		$('body').append(text);
		
		this.func();
		this.drap($('.modelTop'));
	},
	func:function(){
		var that = this;
		$('body').on('click','.modelTop .close',function(){//删除
			$(this).parents('.iframeModel').remove();
		})
		$('body').on('click','.modelTop .small',function(){//最小化
			var top = $(window).height();
			var number = $(this).parents('.iframeModel').attr('number');
			var left = Number(number-1) * that.minWidth;
			$(this).parents('.iframeModel').css({'width':'200px','height':'35px','left':left,'top':top-40});
			$(this).parent('.modelTop').next().css('display','none');
			$(this).addClass('none').siblings('.big').removeClass('none');
			
		})
		$('body').on('click','.modelTop .big',function(){//最大化
			var width = $(window).width();
			var number = $(this).parents('.iframeModel').attr('number');
			var left = (width - that.obj.width)/2+(number-1)*30;
			$(this).parents('.iframeModel').css({'width':'auto','height':'auto','left':left,'top':that.top});
			$(this).parent('.modelTop').next().css('display','block');
			$(this).addClass('none').siblings('.small').removeClass('none');
			
		})
		
		$('body').on('click','.iframeModel',function(){//提升窗口层级
			$('.iframeModel').css('z-index',500);
			$(this).css('z-index',999);
		})
		
	},
	close:function(){
		$('.iframeModel').remove();
	},
	/**
	 * @param {Object} dom对象  标题  modalTitle
	 * doms  弹窗盒子  modal-c
	 */
	drap:function(dom){
		var disX = 0;
		var disY = 0;
		
		dom.on('mousedown',function(ev){
			disX = ev.pageX- $(this).offset().left;
			disY = ev.pageY - $(this).offset().top;
			// doms.css('position','relative');
			doms = $(this).parent();
			// $(this).css('cursor','move');
			var that = $(this);
			$(document).on('mousemove',function(ev){
				// if(ev.target.nodeName.toLowerCase() === 'input'){ //如果目标元素是input则跳出滑动事件
				//     return false;
				// }
				// that.css('cursor','move');
				// that.css('margin','0');
				that.siblings('iframe').css("pointerEvents", "none");
				var iL = ev.pageX - disX;
				var iT = ev.pageY - disY;
				// dom.outerWidth()
				var maxL = $(document).width() - doms.outerWidth();
				var maxT = $(document).height() - doms.outerHeight();
				
				iL = iL < 0 ? 0 : iL;
				iL = iL > maxL ? maxL : iL;
				iT = iT < 0 ? 0 : iT;
				iT = iT > maxT ? maxT : iT;
				doms.css({'left':iL,'top':iT});
				// doms.css('left',iL);
				// doms.css('top', iT);
				return false;
			})
	
			$(document).bind('mouseup',function(ev){
				   $(this).off('mousedown');
				   $(this).off('mousemove');
				   that.siblings('iframe').css("pointerEvents", "none");
				   // that.css('cursor','auto');
				   // doms.css('position','');
				   // that.css('cursor','auto');
				   return false;
			});
			// 
		});
	}
}
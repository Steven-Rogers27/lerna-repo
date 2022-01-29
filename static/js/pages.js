// 分页

/**
	 * @param {Object} res
	 * key 查询条件的字段 可选[]
	 * value 查询条件的值 可选[]
	 * index 页码 可选{index,size} {index:1,size:20}
	 * id 可选 多分页传 可选
	 * url 请求地址
	 * type 请求方式 默认get
	 * callBack 回调函数
	 */
	
// $(document).ready(function(){
// 	$('body').on('keydown','.show1 input',function(e){
// 		keyDown(e);
// 	})
// })
var pages = {
	init:function(param){
		new Page(param);
	}
}

var Page =function(res){

	var param = {
		contant:[],//查询条件的字段 index可选 表示当前的页码
		checkeds:[],//查询条件的输入框id '#sss'
		url:'',//请求接口地址
		type:'GET',
		index:1,
		size:20,
		id:"page",
		callBack:function(res){
			
		},//回调函数
		
	}
	
	initParam(res);
	initHtml();
	var pageObj ;
	//初始化调用
	select({'curPage':param.index,'pageSize':pageObj.find('.page_number').val()});
	
	
	/**
	 * @param {Object} res 初始化参数
	 */
	function initParam(res){
		//分页的条件
		if(res.key){
			param.contant = res.key;
		}
		if(res.value){
			param.checkeds =res.value; 
		}
		//外层盒子的id
		if(res.id){
			param.id=res.id;
		}else{
			if($(".page1").attr("id")==undefined||$(".page1").attr("id")=="undefined"){
				$(".page1").attr("id","page");
			}
		}
		//异部刷新数据 保留当前页码
		var newPageNum = $('#'+param.id).find('input.page_index').val();
		if(newPageNum){
			param.index = newPageNum;
		}
        //动态控制每页条数
        if($(window).width()<=1368){
            param.size = 15;
        }
		//传进来的页码和条数 权重最大
		if(res.index){
			if(res.index.size){
				param.size = res.index.size;
			}
			if(res.index.index){
				param.index = res.index.index;
			}
		}

		//请求方式
		if(res.type){
			param.type =res.type; 
		}
		//请求地址和回调函数
		param.url = res.url;
		param.callBack = res.callBack;
		pageObj = $("#"+param.id+"");
	}
	
	
	/**
	 * 初始化html
	 */
	function initHtml(){
		var html = '';
		html += '<ul class="pages1 clearfix noSelect" ><li class="page_first">首页</li><li class="page_pre">上一页</li><li class="page_next">下一页</li><li class="page_last">尾页</li></ul>';
		html += '<div class="show1 clearfix">';
		html +=		'<span class="page_index">第 <input type="number" value="1" > 页</span>';
		html +=		'<span class="page_count">/ 共1页</span>';
		html +=		'<span class="page_count1">共0条</span>';
		html +=		'<span>每页</span>';
		
		// var size = param.size;
		// var index = param.index;
		// if(res.index){
		// 	if(res.index.size){
		// 		size = res.index.size;
		// 	}
		// 	if(res.index.index){
		// 		index = res.index.index;
		// 	}
		// }
		
		html +=		'<input type="number"  class="page_number" value="'+Number(param.size)+'" class="fl" />';
		html +=		'<span>条</span>';
		html +=	'</div>';
		
			//<!-- 当前页码 -->
		html +=	'<input type="hidden" name="" class="page_index" value="'+param.index+'">';
			//上一页
		html +=	'<input type="hidden" name="" class="page_pre" value="1">';
			//下一页
		html +=	'<input type="hidden" name="" class="page_next" value="1">';			
			//<!-- 共多少页 -->
		html +=	'<input type="hidden" name="" class="page_last" value="1" />';
		
		pageObj.html(html);
	}
	
	// 点击首页
	pageObj.find('.page_first').click(function(){
	    // $('.pages1 li').removeClass('page_active');
	    var obj = pageValue();
	    if(Number(obj.page_index) > 1) {
			var page = {'curPage':1,'pageSize':obj.page_number};
			select(page);	
		}
	
	});
	// 点击上一页
	pageObj.find('.page_pre').click(function(){
	    // $('.pages1 li').removeClass('page_active');
	    var obj = pageValue();
	    if(Number(obj.page_index) > 1) {
	        var page = {'curPage':obj.page_pre,'pageSize':obj.page_number};
	        select(page);	
	    }
	    if(Number(obj.page_index) <= 2){
			pageObj.find('.page_first').addClass('page_active');
			pageObj.find('.page_pre').addClass('page_active');
		}
	    
	})
	// 点击下一页
	pageObj.find('.page_next').click(function(){
		
	    var obj = pageValue();
	    if(Number(obj.page_index) < Number(obj.page_last)) {
			var page = {'curPage':obj.page_next,'pageSize':obj.page_number};
			select(page);
	    }

	    
	})
	// 点击尾页
	pageObj.find('.page_last').click(function(){
	    // $('.pages1 li').removeClass('page_active');
	    var obj = pageValue();
		if(Number(obj.page_index) < Number(obj.page_last)){
			var page = {'curPage':obj.page_last,'pageSize':obj.page_number};
			select(page);
		}

	})
	
	
	
	
	/* 获取分页value
	* page_index 当前页码
	* page_number 显示数量
	* page_last 共多少页
	*/
	function pageValue(){
	    var page_index = pageObj.find('input.page_index').val();
	    var page_number = pageObj.find('.page_number').val();
	    var page_last = pageObj.find('input.page_last').val();
	    var page_pre = pageObj.find('input.page_pre').val();
	    var page_next = pageObj.find('input.page_next').val();
	    return obj = {"page_index":page_index,"page_number":page_number,"page_last":page_last,
	    'page_pre':page_pre,'page_next':page_next}
	}
	
	$('.show1 input').on('keydown',function(e){
		keyDown(e);
	})
	
	/**
	 * @param {Object} event 回车调用接口
	 */
	function keyDown(event){
		
		if (event.keyCode == 13){
			event.returnValue=false;
			event.cancel = true;
			var page_index = pageObj.find('.page_index input').val();
			page_index = parseInt(page_index)
			var obj = pageValue();
			if(page_index <1){
				page_index = 1;
			}
			if(page_index > parseInt(obj.page_last)){
				page_index = parseInt(obj.page_last);
			}
			var page = {'curPage':page_index,'pageSize':obj.page_number};
			
			select(page);
		}
	}
	
	//请求函数
	function select(obj){
		
		for (var i=0;i<param.contant.length;i++) {
			obj[param.contant[i]] = param.checkeds[i];
		}
		
	    DX.ajax_method({
	        'type':param.type,
	        'url':param.url,
	        'param':obj,
	        'callBack':selectcall
	    });
	}
	
	
	function selectcall(res){
		if(res.code != '200'&&res.code != '401'){
			console.log('数据错误');return;
		}
		if (res.code == '401'){
			param.callBack(res);
			return;
		}
		pageObj.find('.page_index input').val(res.data.pageNum);
		pageObj.find('.page_count').html('/ 共'+res.data.pages+'页');
		pageObj.find('.page_count1').html('共'+res.data.total+'条');
		
		pageObj.find("input.page_index").val(res.data.pageNum);
		pageObj.find("input.page_last").val(res.data.pages);
		pageObj.find("input.page_pre").val(res.data.prePage);
		pageObj.find("input.page_next").val(res.data.nextPage);
		pageObj.find(".page_number").val(res.data.pageSize);
		// var width = $('.page1 .show1').width();
		
		pageObj.find('.pages1 li').removeClass('page_active');
		if(res.data.pages<=1){
			pageObj.find('page_first').addClass('page_active');
			pageObj.find('page_next').addClass('page_active');
			pageObj.find('page_pre').addClass('page_active');
			pageObj.find('page_last').addClass('page_active');
		}
		if(res.data.pageNum == 1){
			
			pageObj.find('page_first').addClass('page_active');
			pageObj.find('page_pre').addClass('page_active');
		}
		if(res.data.pageNum == res.data.pages){
			pageObj.find('page_next').addClass('page_active');
			pageObj.find('page_last').addClass('page_active');
		}
		
		$('.table tbody tr').removeClass('checkTr');//处理渲染页面选中效果
		
		param.callBack(res);
	}
	
	
}
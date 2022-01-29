var projectName

var loginType = DX.getLocalStorage('loginType');
// var loginType =0;
//两个首页的初始化加载
function domReady() {
	if (loginType == 0) {
		DX.ajax_method({ //权限控制
			'type': 'GET',
			'url': '/user/emp/getUserInfo',
			'callBack': function(res) {
				if (res.code == '200') {
					//登录所属机关名称
					// $('#loginName').text(res.data.name);
					$('#loginName').val(res.data.name);
					projectName = res.data.name
					$('#loginName').attr('pid', res.data.proid);
					DX.setCookie('proid', res.data.proid, 7); //存储项目部id
					// DX.setCookie('power', JSON.stringify(res.data.operation), 1); //存储填写原因的权限
					DX.setLocalStorage('power', JSON.stringify(res.data.operation));
					//登录人 部门 姓名加职位
					var userName = res.data.userName + ' ' + res.data.departName;
					$('#userName').text(userName);
					var src = res.data.avatarPath;
					if (DX.isNull(src)) {
						$('#headInfo').text(res.data.userName.split(' ')[0].substr(res.data.userName.split(' ')[0].length - 1, 1));
					} else {
						$('#headInfo').css('display', 'none');
						var srcUrl = DX.domain('user') + '/user/file/img?fid=' + src
						$('#headImg').attr('src', srcUrl);
					}
					setTimeout(function() {
						if ($('#headImg').attr('src') == "static/images/pc.png") {
							$('#headInfo').show();
							$('#headImg').attr('src', 'static/images/my.png')
							$('#headInfo').text(res.data.userName.split(' ')[0].substr(res.data.userName.split(' ')[0].length - 1, 1));
						}
					}, 1000)
					menuList = res.data.threeMenuNew;
					creatMenu(res.data.threeMenuNew); //渲染页面
				}
			}
		});
	} else if (loginType == 1 || loginType == 2) {
		DX.ajax_method({ //权限控制
			'type': 'GET',
			'url': '/user/cooperation/cooperationLogin/getLogCooperationUserInfo',
			'callBack': function(res) {
				if (res.code == '200') {
					//登录所属机关名称
					$('#loginName').val(res.data.platform.platformName);
					$('#home, #operate, #message,#baseInfo,#help,#feedback,').css('visibility', 'hidden');
					//登录人 部门 姓名加职位
					var userName = res.data.userName;
					$('#userName').text(userName);
					var src = res.data.avatarPath;
					if (DX.isNull(src)) {
						$('#headInfo').text(res.data.userName.split(' ')[0].substr(res.data.userName.split(' ')[0].length - 1, 1));
					} else {
						$('#headInfo').css('display', 'none');
						var srcUrl = DX.domain('user') + '/user/file/img?fid=' + src
						$('#headImg').attr('src', srcUrl);
					}
					creatMenu(res.data.threeMenu); //渲染页面
					init();
				}
			}
		});
	}
	// 合作伙伴登录
	else if (loginType == 3) {
		DX.ajax_method({ //权限控制
			'url': '/other/dxOtherUser/getLogOtherUserPC',
			'callBack': function(res) {
				if (res.code == '200') {
					var loginName;
					$('#flexible,#home, #operate, #message,#baseInfo,#help,#feedback,#process,#introduce').css('visibility', 'hidden');
					if (res.data.companyName != '' && res.data.projectName != '') {
						loginName = res.data.projectName + '_' + res.data.companyName;
						projectName = res.data.projectName + '_' + res.data.companyName
					} else if (res.data.companyName != '' && res.data.projectName == '') {
						loginName = res.data.companyName;
					} else if (res.data.companyName == '' && res.data.projectName != '') {
						loginName = res.data.projectName;
					} else {
						loginName = ''
					}
					$('#loginName').val(loginName);
					//登录人 部门 姓名加职位
					var userName = res.data.name;
					$('#userName').text(userName);
					
					var src = res.data.photoFid;
					if (DX.isNull(res.data.photoFid)) {
						$('#headInfo').text(res.data.name.split(' ')[0].substr(res.data.name.split(' ')[0].length - 1, 1));
					} else {
						$('#headInfo').css('display', 'none');
						var srcUrl = DX.domain('other') + '/other/file/img?fid=' + src
						$('#headImg').attr('src', srcUrl);
					}
					setTimeout(function() {
						if ($('#headImg').attr('src') == "upAndDown/static/img/pc.png") {
							$('#headInfo').show();
							$('#headImg').attr('src', 'static/images/my.png')
							$('#headInfo').text(res.data.name.split(' ')[0].substr(res.data.name.split(' ')[0].length - 1, 1));
						}
					}, 100)
					if(!res.data.menuList.length){
						DX.optionTitle('当前身份暂无PC菜单，请前往“数字土木伙伴APP”查看更多信息')
						return
					}
					if(res.data.companyId=="" && res.data.proid==""){
						DX.optionTitle("当前账户暂无身份，请前往“数字土木伙伴APP”申请")
						return
					}
					creatMenuOther(res.data.menuList); //渲染页面
				} else {
					alert(res.msg);
				}
			}
		});
	} else {
		window.location.href = 'hr/login.html';
	}
}

function reloadHeadImg() { //异步刷新头像
	DX.ajax_method({
		'type': 'GET',
		'url': '/user/emp/getUserInfo',
		'callBack': function(res) {
			if (res.code == '200') {

				var src = res.data.avatarPath;
				if (DX.isNull(src)) {
					$('#headInfo').text(res.data.userName.split(' ')[0].substr(res.data.userName.split(' ')[0].length - 1, 1));
				} else {
					$('#headInfo').css('display', 'none');
					var srcUrl = DX.domain('user') + '/user/file/img?fid=' + src
					$('#headImg').attr('src', srcUrl);
				}
			}
		}
	});
}

//交集
function intersection(arr1, arr2) {
	if (DX.switchs() == 0) return false;
	arr2 = arr2.split(',');
	var le = arr2.filter(function(v) {
		return arr1.indexOf(v) !== -1 // 利用filter方法来遍历是否有相同的元素
	})
	if (le.length > 0) {
		return false;
	} else {
		return true;
	}
}

//渲染菜单栏
function creatMenu(arr) {
	var text = "";
	for (var i = 0; i < arr.length; i++) {
		// //一级菜单
		// text += '<div class="menu0">'
		// text += '	<div class="menu0-inco">' + arr[i].ico + '</div>'
		// text += '	<div class="secTree"></div> <span class="menu0-span">' + arr[i].name +'</span>'
		// text += '</div>'
		// text += '<div style="display:none" class="curClick">'
		// text += '<div>'
		// //二级菜单
		// text += '<div class="menu1 menu-common" title="人员信息" url="" bussid="">'
		// text += '			<img src="static/img/select.png" class="direction-icon">'
		// text += '			 <span>二级菜单</span>'
		// text += '		</div>'
		// text += '		<div style="display:none">'
		// //三级菜单
		// text += '			<div class="menu2 menu-common" title="全员信息" url="people/peopleListS1.html" bussid="">'
		// text += '				<img src="static/img/select.png" class="direction-icon">'
		// text += '				<span>三级菜单</span>'
		// text += '			</div>'
		// text += '			<div style="display:none">'
		// //四级菜单
		// text += '				<div class="menu3 menu-common" title="4级菜单" url="people/peopleListS1.html" bussid="">'
		// text += '					<div><span>四级菜单</span></div>'
		// text += '				</div>'
		// text += '			</div>'
		// text += '		</div>'
		// text += '	</div>'
		// text += '</div>'
		
			//一级菜单
			text += '<div class="menu0">'
			text += '	<div class="menu0-inco">' + arr[i].ico + '</div>'
			text += '	<div class="menu0-right">'
			text += '		<span class="menu0-span">' + arr[i].name +'</span><div class="secTree"></div> '
			text += '	</div>'
			text += '</div>'
			text += '<div style="display:none;background: #076dcf;" class="curClick">'
			text += '<div>'
			for (var j = 0; j < arr[i].children.length; j++) {
				var url = arr[i].children[j].url
				if(arr[i].children[j].children.length == 0 && arr[i].children[j].url == ''){
					url = 'dxconfig/development.html'
				}
				text += '<div class="menu1 menu-common" page-id="'+ arr[i].children[j].id +'" title="'+ arr[i].children[j].name +'" url="'+ url +'" bussid="'+ (arr[i].children[j].bussId ? arr[
						i].children[j].bussId : "") +'">'
				
				if( arr[i].children[j].children.length == 0){
					text += '				<span style="width: 24px;display:inline-block" class="notParentInLevel2"></span>'
				}else{
					text += '				<span class="direction-icon direction-icon-right">&#58915</span>'
					// text += '				<img src="static/img/menu-right.png" class="direction-icon direction-icon-right">'
				}		
				text += '<span>'+ arr[i].children[j].name +'</span>'
				text += '</div>'
				text += '<div style="display:none">'
					
					var data3 = arr[i].children[j].children;
					for (var x = 0; x < data3.length; x++) {
						var str2 = i + "," + j + "," + x
						var isTab2 = data3[x].children.length == 0 ? '' : str2
						var tabUrl2 = data3[x].url;
						if(tabUrl2 == '' && data3[x].children.length == 0){
							tabUrl2 = 'dxconfig/development.html'
						}
						//三级
						text += '			<div class="menu2 menu-common" page-id="'+ data3[x].id + '" parentId="'+ data3[x].id + '" isTab="' + isTab2 + '" title="'+ data3[x].name +'" url="'+ tabUrl2 +'" bussid="'+ data3[x].bussId +'">'
						if(data3[x].children.length == 0){
							text += '				<span style="width: 24px;display:inline-block" class="notParentInLevel2"></span>'
						}else{
							text += '				<span class="direction-icon direction-icon-right">&#58915</span>'
							// text += '				<img src="static/img/menu-right.png" class="direction-icon direction-icon-right">'
						}
						text += '				<span>'+ data3[x].name +'</span>'
						text += '			</div>'
						text += '			<div style="display:none">'
						//
							var data4 = data3[x].children;
							for(var z = 0; z < data4.length; z++){
								var str = i + "," + j + "," + x + "," + z
								var isTab = data4[z].children.length == 0 ? '' : str
								var tabUrl = data4[z].url;
								if(isTab){
									tabUrl = "dxconfig/tabs.html?parentId=" + data4[z].id
								}
								if(tabUrl == ''){
									tabUrl = 'dxconfig/development.html'
								}
								//四级
								text += '<div class="menu3 menu-common" page-id="'+ data4[z].id +'" parentId="'+ data4[z].id +'" isTab="' + isTab + '" title="'+ data4[z].name +'" url="'+ tabUrl +'" bussid="'+ data4[z].bussId +'">'
								text += '<div><span>'+ data4[z].name +'</span></div>'
								text += '</div>'
							}
						text += '</div>'
					}
				text += "  </div>";
			}
			text += " </div>";
			text += " </div>";
	}

	$('#menus').html(text);
}
//渲染合作伙伴菜单栏
function creatMenuOther(arr) {
	var text = "";
	for (var i = 0; i < arr.length; i++) {
		//一级菜单
		text += '<div class="menu0">'
		text += '	<div class="menu0-inco">' + arr[i].ico + '</div>'
		text += '	<div class="menu0-right">'
		text += '		<span class="menu0-span" style="padding:0;padding-left:5px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width:120px;"'+"title="+arr[i].name+'>' + arr[i].name +'</span><div class="secTree"></div> '
		text += '	</div>'
		text += '</div>'
		text += '<div style="display:none;background: #076dcf;" class="curClick">'
		text += '<div>'
		
		for (var j = 0; j < arr[i].list.length; j++) {
			var url = arr[i].list[j].url
			if(arr[i].list[j].list.length == 0 && arr[i].list[j].url == ''){
				url = 'dxconfig/development.html'
			}
			text += " <div class=\"menu1 menu-common\" title=\"" + arr[i].list[j].name + "\"  url=\"" + arr[i].list[j].url+'&factId='+arr[i].list[j].partnersUnitId + "\" bussid=\"" +
			         (arr[i].list[j].bussId ? arr[
			          i].list[j].bussId : "") + "\">";
			
			if( arr[i].list[j].list.length == 0){
				text += '				<span style="width: 24px;display:inline-block" class="notParentInLevel2"></span>'
			}else{
				text += '				<span class="direction-icon direction-icon-right">&#58915</span>'
			}		
			text += '<span>'+ arr[i].list[j].name +'</span>'
			text += '</div>'
		}
		text += " </div>";
		text += " </div>";
	}
	
	$('#menus').html(text);
}
// 右键点击标签刷新iframe 
var fFiveId = ""  //当前标签的data-id
var fFiveDataUrl = ""//当前标签的url
var fFiveText = ""//当前标签页面的名字
$('body').on('mousedown', '#tabnav li', function(e) {
	if (3 == e.which) {
		
		$('#fFivebackGound').show()
		// var top = $(this).offset().top-$(document).scrollTop();  //当前点击的标签在浏览器中的top
		// top = top + $(this).height()-10
		// var left = $(this).offset().left
		// left = left + $(this).width() -10
		// $('.fFive').css({top: top, left: left}).show();   固定位置
		if($(this).hasClass('active')){
			vm.istabSelf = true
		}else{
			vm.istabSelf = false
		}
		$('.fFive').css({
			top: e.clientY,
			left: e.clientX
		}).show();
		fFiveId = $(this).attr('data-id');
		fFiveDataUrl = $(this).attr('data-url');
		fFiveText = $(this).text().substr(0,$(this).text().length-2);
	} else if (1 == e.which) {
		return
	}
})
document.addEventListener('contextmenu', function(e) {
	e.preventDefault ? e.preventDefault() : e.returnValue = false;
})
$('body').on('click', '.shuaxin', function(e) {
	$('#fFivebackGound').hide()
	$('.fFive').hide()
	$('.fFiveClo').hide()
	document.getElementById(fFiveId).contentWindow.location.reload();
	DX.optionTitle('刷新成功')
})
$('body').on('click', '.closeNotSelf', function(e) { //关闭除自己以外的标签
	$('#tabnav').html('')
	$('#contDiv').html('')
	ajaxHtml(fFiveDataUrl, fFiveText);
	$('#fFivebackGound').hide()
	$('.fFive').hide()
	$('.fFiveClo').hide()
	$('#left').click()
	$('#tabnav').css('width',$('.topnav').width()-68 + 'px')
})
$('body').on('click', '.openNew', function(e) {
	$('#fFivebackGound').hide()
	$('.fFive').hide()
	$('.fFiveClo').hide()
	window.open(getIframUrl(fFiveId));
})

// $('body').on('dblclick', '#tabnav li', function(e) {  //双击刷新
// 	fFiveId = $(this).attr('data-id');
// 	document.getElementById(fFiveId).contentWindow.location.reload();
// 	DX.optionTitle('刷新成功')
// })

//请求加载页面
function ajaxHtml(url, text, bussid,pageId,isTab,parentId,menu) {
	$('.removeIframe').remove();
	if (isOpen(url, text,pageId)) return;
	$('.showFrame').css('display', 'none');
	
	//添加iframe
	var id = 'iframe' + parseInt(Math.random() * (100000 - 1) + 1);
	if(url == ""){
		url = "dxconfig/development.html"
	}
	var str = '<iframe  id="' + id + '" bussid="' + (bussid !== '' ? bussid : '') +
		'" class="showFrame" style="border:none;width:100%;" scrolling="auto" frameborder="0" src="' + url + '" ></iframe>';
	if (!text) {
		
		var str = '<iframe  id="' + id + '" bussid="' + (bussid !== '' ? bussid : '') +
			'" class="showFrame removeIframe" style="border:none;width:100%;" scrolling="auto" frameborder="0" src="' + url +
			'"  ></iframe>';
	}
	var urlTab = "dxconfig/tabs.html?parentId=" + parentId
	if(isTab && isTab.length != 0){
		str = '<iframe  id="' + id + '" bussid="' + (bussid !== '' ? bussid : '') +
			'" class="showFrame" style="border:none;width:100%;" scrolling="auto" frameborder="0" src="' + urlTab + '" parentId="'+ parentId + '"></iframe>';
	}

	var cDom = $('#contDiv').append(str);
	$("#" + id)[0].contentWindow.pOpenId = bussid !== '' ? bussid : '';

	//添加tabbar
	if (text !== null) {
		// $('.topnav').css('display','block');
		var string = '<li class="active" page-id="'+ pageId + '" data-url="' + url + '" data-id="' + id + '" menu="'+ menu +'">' + text + ' <span>x</span></li>';
		
		if(isTab && isTab.length != 0){
			string = '<li class="active" page-id="'+ pageId + '" data-url="' + urlTab + '" data-id="' + id + '" parentId="'+ parentId + '" menu="'+ menu +'">' + text + ' <span>x</span></li>'
		}
		
		$('#tabnav').children('li').removeClass('active');
		$('#tabnav').append(string);
		//处理宽度问题
		var width = 0;
		if ($('#tabnav li').length > 8) {
			$.each($('#tabnav li'), function(val) {
				width += $(this).outerWidth() + 1;
			})
		}
		if (width) {
			$('#tabnav').css('width', width);
		}
		//处理菜单太多，让当前显示问题
		var width = $('#tabnav').width();
		var wrap = $('.topnav').width();
		if (wrap - width < 68) {
			$('#tabnav').animate({
				'left': wrap - width - 30 + 'px'
			}, 100)
		}
		$('.topnav').show();
	} else {
		$('.topnav').hide();
	}
	init();
	$('#' + id).show();

}

//判断当前路径是否已经打开
function isOpen(url, text,pageId) {
	var flag = false;
	$.each($('#tabnav li'), function(val) {
		if(pageId == undefined){
			if($(this).attr('data-url') == url && $(this).text().indexOf(text) != -1){
				flag = true;
			}
		}else if($(this).attr('page-id') == pageId){
			flag = true;
		}
		// if ($(this).attr('data-url') == url && $(this).text().indexOf(text) != -1) {
		if(flag){
			$(this).addClass('active').siblings().removeClass('active');
			$('.showFrame').css('display', 'none');
			var id = $(this).attr('data-id');
			$(this).click()
			return false;
		}
	})
	// if (flag) {
	// 	$('.topnav').show();
	// }
	return flag;
}
//初始化
function init(isHome) {
	if ($('.topnav').css('display') == "none") {
		isHome = true;
	} else {
		isHome = false;
	}
	var winHei = document.documentElement.clientHeight || window.innerHeight;
	var toHei = (winHei - parseFloat($("#leftDiv").css("marginTop"))) + "px";
	$("#leftDiv").css("minHeight", toHei);
	// if(window.innerWidth > 1280){
	var h = isHome ? (68 - 30) : 68;
	$(".showFrame").css("height", winHei - h);
	// 	// return winHei - 59;
	// }else{
	// var h=isHome ? (88+28) : 88
	// return winHei - 79;
	// $(".showFrame").css("height", winHei - 88);
	// }

}
//tabbar点击
$('body').on('click', '#tabnav li', function() {
	$(this).addClass('active').siblings().removeClass('active');
	var id = $(this).attr('data-id');
	var pageId = $(this).attr('page-id');
	var url = $(this).attr('data-url');
	var parentId = $(this).attr('parentId');
	var menu = $(this).attr('menu');
	// var istab = $(this).attr('istab');
	var text = $(this).text();
	$('.showFrame').css('display', 'none');
	$('#' + id).show();
	// $('.menu3').removeClass('menuSlt');
	// $('.menu2').removeClass('menuSlt');
	$('.menuSlt').removeClass('menuSlt');
	
	//选中左边菜单栏
	if(menu == 3){
		$.each($('.menu3'), function(val) {
			if(pageId == $(this).attr('page-id')){
				$(this).addClass('menuSlt');
			}
			// if(parentId){
			// 	if ($(this).attr('url') == url && text.indexOf($(this).children().children('span').text()) != -1 && $(this).attr('parentId') == parentId) {
			// 		$(this).addClass('menuSlt');
			// 	}
			// }else if ($(this).attr('url') == url && text.indexOf($(this).children().children('span').text()) != -1){
			// 	$(this).addClass('menuSlt');
			// }
		})
	}
	if(menu == 2){
		$.each($('.menu2'), function(val) {
			if(pageId == $(this).attr('page-id')){
				$(this).addClass('menuSlt');
			}
			// if(parentId){
			// 	if ($(this).attr('url') == url && text.indexOf($(this).children('span').text()) != -1 && $(this).attr('parentId') == parentId) {
			// 		$(this).addClass('menuSlt');
			// 	}
			// }else{
			// 	if ($(this).attr('url') == url && text.indexOf($(this).children('span').text()) != -1) {
			// 		$(this).addClass('menuSlt');
			// 	}
			// }
		})
	}
	if(menu == 1){
		$.each($('.menu1'), function(val) {
			if(pageId == $(this).attr('page-id')){
				$(this).addClass('menuSlt');
			}
			// if(parentId){
			// 	if ($(this).attr('url') == url && text.indexOf($(this).children('span').text()) != -1 && $(this).attr('parentId') == parentId) {
			// 		$(this).addClass('menuSlt');
			// 	}
			// }else{
			// 	if ($(this).attr('url') == url && text.indexOf($(this).children('span').text()) != -1) {
			// 		$(this).addClass('menuSlt');
			// 	}
			// }
		})
	}
})
//关闭当前选项卡
$('body').on('click', '#tabnav li span', function(e) {
	e = e || window.event;
	if (e.stopPropagation) { //W3C阻止冒泡方法 
		e.stopPropagation();
	} else {
		e.cancelBubble = true; //IE阻止冒泡方法
	}
	//删除
	var oid = $(this).parent().attr('data-id');
	$('#' + oid).remove();

	if ($(this).parent().hasClass('active')) {
		//选中
		$(this).parent().prev().addClass('active');
		var id = $(this).parent().prev().attr('data-id');
		var url = $(this).parent().prev().attr('data-url');
		var text = $(this).parent().prev().text();
		$('.showFrame').css('display', 'none');
		$('#' + id).show();

		//选中左边菜单栏
		$.each($('.menu3'), function(val) {
			if ($(this).attr('url') == url && text.indexOf($(this).children().children('span').text()) != -1) {
				$('.menu3').removeClass('menuSlt');
				$(this).addClass('menuSlt');
			}
		})
	}
	$(this).parent().remove();

	$.each($('#tabnav li'), function() { //关闭父标签页面，子标签页面同时关闭
		if (oid == $(this).attr('parent-id')) {
			$(this).find('span').click()
		}
	})
	var parID = $(this).parent().attr('parent-iframeId') //获取当前要关闭的标签的父页面的id
	$.each($('#tabnav li'), function() { // 循环找到这个父页面，模拟点击
		if (parID == $(this).attr('data-id')) {
			$(this).click()
		}
	})
})

$("body").on("propertychange input", "#loginName", function() {
	if (loginType == 0) {
		clickProject();
	} else if (loginType == 3) {
		clickOtherProject()
	}
});



/**获取iframe 的当前url
 * @param {Object} id iframe的id
 */
function getIframUrl(id) {
	var url = parent.document.getElementById(id).contentWindow.location.href;
	url += (url.indexOf('?') > -1 ? "&" : "?") + "userOpenId=" + parent.document.getElementById(id).getAttribute("bussid");
	return url;
}



//拉取项目部列表
function clickProject() {
	DX.ajax_method({
		'type': 'GET',
		// 'url': '/user/emp/findUserProjectsForPC',
		'url': '/user/emp/findLandProjects',
		'param': {
			'condition': $('#loginName').val()
		},
		'callBack': function(red) {
			if (red.code == '200') {
				var html1 = '';
				var sumIndex = 1;
				$.each(red.data, function(i, v) {
					html1 += addProjectHtml(v.sortedName, sumIndex, v.list);
					sumIndex += v.list.length;
				})
				// html1 += addProjectHtml('公司总部', sumIndex, red.data.unit);
				// sumIndex += red.data.unit.length;

				// html1 += addProjectHtml('进场项目', sumIndex, red.data.newlyBuild);
				// sumIndex += red.data.newlyBuild.length;

				// html1 += addProjectHtml('在建项目', sumIndex, red.data.continuedBuild);
				// sumIndex += red.data.continuedBuild.length;

				// html1 += addProjectHtml('收尾项目', sumIndex, red.data.waitEnd);
				// sumIndex += red.data.waitEnd.length;

				// html1 += addProjectHtml('竣工(待确权)项目', sumIndex, red.data.ending);
				// sumIndex += red.data.ending.length;

				// html1 += addProjectHtml('清欠项目', sumIndex, red.data.clearUp);
				// sumIndex += red.data.clearUp.length;

				// html1 += addProjectHtml('销号项目', sumIndex, red.data.cancelNumber);
				// sumIndex += red.data.cancelNumber.length;

				// html1 += addProjectHtml('其他项目', sumIndex, red.data.unconfirmed);
				$('#projectbox').html(html1);
				if (html1.length > 0) {
					var winHei = (document.documentElement.clientHeight || window.innerHeight) - 56;
					var toHei = $("#projectbox").height();
					toHei = Math.min(toHei, winHei);
					$("#projectbox").css("height", toHei);
					$("#projectbox").slideDown(300);
					$("#showFrame").css("pointerEvents", "none");
				}
				$('#projectbox li').click(function() { //点击切换项目部
					changePro($(this).attr('id'));
				});

				//键盘上下
				var li = $('#projectbox');
				if (li.css('display') == 'none') return;
				var ele = $('#loginName');
				$(ele).unbind('keydown');
				$(ele).on("keydown", function(e) {
					var c = li.find('li').hasClass('checkBack');
					var index;
					var length = li.children().length;
					if (e.keyCode == 38) { //上
						if (c) {
							index = li.find('li.checkBack').index();
							if (index <= 0) return;
							if (li.children().eq(index - 1).hasClass('ptab')) {
								index -= 2;
							} else {
								index -= 1;
							}
							li.children().removeClass('checkBack').eq(index).addClass('checkBack');
						}
					} else if (e.keyCode == 40) { //下
						if (c) {
							index = li.find('li.checkBack').index();
							if (index >= length - 1) return;
							if (li.children().eq(index + 1).hasClass('ptab')) {
								index += 2;
							} else {
								index += 1;
							}
							li.children().removeClass('checkBack').eq(index).addClass('checkBack');
						} else {
							console.log(li);
							li.find('li').eq(0).addClass('checkBack');
						}
					} else if (e.keyCode == 13) {
						var checkId = li.find('li.checkBack').attr('id')
						changePro(checkId);
					}
				})
			}
		}
	});
}
// 拉取合作伙伴项目部
function clickOtherProject() {
	DX.ajax_method({
		'type': 'GET',
		'url': '/other/dxOtherUser/getLogUserOtherProject',
		'param': {
			'condition': $('#loginName').val()
		},
		'callBack': function(red) {
			if (red.code == '200') {
				var html1 = '';
				var sumIndex = 1;
				$.each(red.data, function(i, v) {
					html1 += addProjectOtherHtml(v.typeName, sumIndex, v.otherProject);
					sumIndex += v.otherProject.length;
				})
				$('#projectbox').html(html1);
				if (html1.length > 0) {
					var winHei = (document.documentElement.clientHeight || window.innerHeight) - 56;
					var toHei = $("#projectbox").height();
					toHei = Math.min(toHei, winHei);
					$("#projectbox").css("height", toHei);
					$("#projectbox").slideDown(300);
					$("#showFrame").css("pointerEvents", "none");
				}
				$('#projectbox li').click(function() { //点击切换项目部
					changeOtherPro($(this).attr('id'),$(this).attr('comId'),$(this).attr('type'));
				});

				//键盘上下
				var li = $('#projectbox');
				if (li.css('display') == 'none') return;
				var ele = $('#loginName');
				$(ele).unbind('keydown');
				$(ele).on("keydown", function(e) {
					var c = li.find('li').hasClass('checkBack');
					var index;
					var length = li.children().length;
					if (e.keyCode == 38) { //上
						if (c) {
							index = li.find('li.checkBack').index();
							if (index <= 0) return;
							if (li.children().eq(index - 1).hasClass('ptab')) {
								index -= 2;
							} else {
								index -= 1;
							}
							li.children().removeClass('checkBack').eq(index).addClass('checkBack');
						}
					} else if (e.keyCode == 40) { //下
						if (c) {
							index = li.find('li.checkBack').index();
							if (index >= length - 1) return;
							if (li.children().eq(index + 1).hasClass('ptab')) {
								index += 2;
							} else {
								index += 1;
							}
							li.children().removeClass('checkBack').eq(index).addClass('checkBack');
						} else {
							console.log(li);
							li.find('li').eq(0).addClass('checkBack');
						}
					} else if (e.keyCode == 13) {
						var checkId = li.find('li.checkBack').attr('id');
						var comId= li.find('li.checkBack').attr('comId');
						var type=li.find('li.checkBack').attr('type');
						changeOtherPro(checkId,comId,type);
					}
				})
			}
		}
	});
}

function replaceStr(str, rep) {
	var result;
	if (this.isNull(rep)) {
		result = str;
	} else {
		var subStr = new RegExp(rep); //创建正则表达式对象
		var res = '<span style="color:#20c762;margin:0;width: auto;">' + rep + '</span>';
		result = str.replace(subStr, res);
	}
	return result;
}

function isNull(str) {
	if (str == undefined || str == "" || str == null || str == 'undefined') return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}
/**
 * @param {Object} name 标题
 * @param {Object} data 项目部列表
 */
function addProjectHtml(name, sumIndex, data) {
	var html = '<p class="ptab">' + name + '</p>';
	// sumIndex += red.data.waitEnd.length;
	// $.each(data, function(i, val) {
	// 	if (val.active) {
	// 		html += '<li id="' + val.projectId + '" class="active"><span>' + (i + sumIndex) + '</span>' + val.abbreviation +
	// 			'</li>';
	// 	} else {
	// 		html += '<li id="' + val.projectId + '"><span>' + (i + sumIndex) + '</span>' + val.abbreviation + '</li>';
	// 	}
	// });
	$.each(data, function(i, val) {
		if (val.active) {
			html += '<li id="' + val.projectId + '" class="active"><span>' + (i + sumIndex) + '</span>' + replaceStr(val.abbreviation,
					$('#loginName').val()) +
				'</li>';
		} else {
			html += '<li id="' + val.projectId + '"><span>' + (i + sumIndex) + '</span>' + replaceStr(val.abbreviation, $(
				'#loginName').val()) + '</li>';
		}
	});

	if (data.length > 0) {
		return html;
	} else {
		return '';
	}

}
// 合作伙伴项目部
function addProjectOtherHtml(name, sumIndex, data) {
	var html = '<p class="ptab">' + name + '</p>';
	$.each(data, function(i, val) {
		if (val.isSelect) {
			html += '<li id="' + val.proid + '" comId="' + val.companyId + '"  type="' + val.otherType + '" class="active"><span>' + (i + sumIndex) + '</span>' + replaceStr(val.abbreviation+'_'+val.companyName,
					$('#loginName').val()) +
				'</li>';
		} else {
			html += '<li id="' + val.proid + '" comId="' + val.companyId + '"  type="' + val.otherType + '"><span>' + (i + sumIndex) + '</span>' + replaceStr(val.abbreviation+'_'+val.companyName, $(
				'#loginName').val()) + '</li>';
		}
	});

	if (data.length > 0) {
		return html;
	} else {
		return '';
	}
}

//点击li切换项目部
function changePro(id) {
	if (id == undefined) {
		return
	}
	DX.ajax_method({
		'type': 'POST',
		'url': "/user/emp/changeProject",
		'param': {
			'proid': id
		},
		'callBack': function(res) {
			if (res.code == '200') {
				console.log(res.data)
				location.reload(); //本页面刷新	
			}
		}
	})
};
// 点击li切换合作伙伴项目部
function changeOtherPro(id,comId,type) {
	console.log(id,comId,type);
	if (id == undefined) {
		return
	}
	DX.ajax_method({
		'type': 'POST',
		'url': "/other/dxOtherUser/changeLogOtherProjectPC",
		'param': {
			'proid': id,
			'companyId': comId,
			'otherType':type
		},
		'callBack': function(res) {
			if (res.code == '200') {
				location.reload(); //本页面刷新 
			}
		}
	})
};


//退出登录
$("body").on('click', "#loginout", function(e) {
	if (loginType == 0) {
		DX.ajax_method({
			'type': 'POST',
			'url': '/user/login/loginout',
			'callBack': function(res) {
				if (res.code == '200') {
					DX.deleteCookie('token');
					DX.delLocalStorage('loginType');
				}
			}
		})
	} else if (loginType == 1 || loginType == 2) {
		DX.ajax_method({
			'type': 'POST',
			'url': '/user/cooperation/cooperationLogin/cooperationLogout',
			'callBack': function(res) {
				if (res.code == '200') {
					DX.deleteCookie('token');
					DX.delLocalStorage('loginType');
				}
			}
		})
	} else if (loginType == 3) {
		DX.ajax_method({
			'type': 'POST',
			'url': '/other/dxOtherUserLogin/loginoutPC',
			'callBack': function(res) {
				if (res.code == '200') {
					DX.deleteCookie('token');
					DX.delLocalStorage('loginType');
				}
			}
		})
	}
	window.location.href = 'hr/login.html';
})
//个人信息
$("body").on('click', "#baseInfo", function(e) {
	ajaxHtml('message/personal-center.html', '个人中心');
	// $("#nav").text('个人信息');
	// $("#newWin").show();
})
//头像链接
$("body").on('click', "#headInfo", function(e) {
	ajaxHtml('message/personal-center.html', '个人中心');
	// $("#nav").text('个人信息');
	// $("#newWin").show();
})
$("body").on('click', "#headImg", function(e) {
	ajaxHtml('message/personal-center.html', '个人中心');
	// $("#nav").text('个人信息');
	// $("#newWin").show();
})
//消息
$("body").on('click', "#message", function(e) {
	ajaxHtml('message/message.html', '消息中心')
	$("#message").removeClass("newTip")
	// $("#nav").text('消息');
	// $("#newWin").show();
})
$("body").on('click', "#operate", function(e) {
	ajaxHtml('common/operationLog.html', '操作日志')
	// $("#nav").text('消息');
	// $("#newWin").show();
})

//打开新窗口
$("body").on('click', "#openWin", function(e) {
	if ($('.topnav').css('display') == "none") {

		$('.showFrame').each(function(val, index) {
			if ($(this).css('display') != "none") {
				window.open(getIframUrl($(this).attr('id')));
			}
		})
	} else {
		var id = $('#tabnav li.active').attr('data-id');
		if (id) {
			window.open(getIframUrl(id));
		}
	}
})
// 切换项目部
$("body").on('click', "#loginName", function(e) {
	// if (loginType != 0) {
	// 	return false
	// }
	e = e || window.event;
	if (e.stopPropagation) { //W3C阻止冒泡方法 
		e.stopPropagation();

	} else {
		e.cancelBubble = true; //IE阻止冒泡方法
	}
	$(".showFrame").css("pointerEvents", "none");
	var pbox = $("#projectbox");
	if (pbox.css('display') == 'block') {
		$(".showFrame").css("pointerEvents", "");
		pbox.slideUp(function() {
			pbox.html("");
			pbox.css("height", '');
		});
		$('#loginName').css({
			'cursor': 'pointer'
		})
		$('#loginName').css({
			'width': '100%'
		})
		$('#loginName').val(projectName)
		$('#loginName').blur()
	} else {
		$('#loginName').css({
			'cursor': 'auto'
		})
		$('#loginName').css({
			'width': '255px'
		})
		$('#loginName').val('')
		if (loginType == 0) {
			clickProject();
		} else if (loginType == 3) {
			// 调用合作伙伴项目部
			clickOtherProject();
		}

	}
})

// 切换项目部
$(document).click(function() {
	// if (loginType != 0) {
	// 	return false
	// }
	var pbox = $("#projectbox");
	$(".showFrame").css("pointerEvents", "");
	// $('#'+$('#tabnav li.active').attr('data-id')).css("pointerEvents", "");
	pbox.slideUp(function() {
		pbox.html("");
		pbox.css("height", '');
	});
	$('#loginName').css({
		'cursor': 'pointer'
	})
	$('#loginName').css({
		'width': '100%'
	})
	$('#loginName').val(projectName)
	// $(".showFrame").css("pointerEvents", "");
});


$("body").on('click', "#feedback", function(e) {
	// $("#nav").text('反馈');
	ajaxHtml('message/poster.html', '反馈中心');
	// $("#newWin").show();
})
$("body").on('click', "#help", function(e) {
	// $("#nav").text('帮助');
	ajaxHtml('help/helpLook.html', '帮助中心');
	// $("#newWin").show();
})
$("body").on('click', "#home", function(e) {
	// ajaxHtml('home/index.html', null, "");
	var hrefurl = '';
	var back = 0; //默认开发环境
	var index = window.location.hostname.indexOf("dx185.com");
	var index1 = window.location.hostname.indexOf("itest.dx185.com");
	if (index != -1 && index1 == -1) { //线上
		back = 1;
	} else if (index1 != -1) { //测试
		back = 2;
	}
	if (back == 1) {
		hrefurl = 'https://' + window.location.host + '/home/index.html';
	} else if (back == 2) {
		hrefurl = 'http://' + window.location.host + '/home/index.html';
	} else {
		hrefurl = 'http://' + window.location.host + '/web/home/index.html';
	}
	window.open(hrefurl, '_blank');
})

$("body").on('click', "#left", function(e) {
	$('#tabnav').animate({
		'left': '33px'
	}, 500)
})
$("body").on('click', "#right", function(e) {
	var width = $('#tabnav').width();
	var wrap = $('.topnav').width();
	if (wrap - width < 68) {
		$('#tabnav').animate({
			'left': wrap - width - 33 + 'px'
		}, 500)
	}
})
$("body").on('click', "#process", function(e) {
	ajaxHtml('svgTest.html', '流程示意图');
})
$("body").on('click', "#introduce", function(e) {
	if(DX.switchs() == 3){
		window.open('http://cz.dx185.com/home/link/project.pdf')
	}else{
		DX.ajax_method({
			'url': '/hrs/papers/getFileId',
			param : {
				fileId: '2973479'
			},
			'callBack': function(res) {
				if (res.code == 200) {
					window.open(DX.preview("user",res.data))
				}
			}
		})
	}
})
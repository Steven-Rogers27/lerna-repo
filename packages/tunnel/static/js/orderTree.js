// $(document).ready(function() {
	// getTreeMessage();
	// ---------------------------------------------------------------挂载部位js
	var zTreeObj; //树对象
	var newTempArr;
	var setting = {
		// check: {
		// 	enable: true,
		// 	chkboxType: {
		// 		"Y": "s",
		// 		"N": "s"
		// 	},
		// 	chkStyle: "checkbox",
		// },
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "parentId"
			},
			keep: {
				leaf: true,
				parent: false
			},
			key: {
				name: "name",
			}
		},
		view: {
			fontCss: {
				color: "#000000",
			},
			showLine: true,
			showIcon: true,
			selectedMulti: true,
			// addDiyDom:addHoverDom,
		},
		callback: {
			beforeCheck: true,
			onCheck: zTreeOnCheck,
			onClick:zTreeOnClick,
			beforeDrag: true,
		},
		edit: {
			enable: false,
			showRenameBtn: false,
			showRemoveBtn: false,
		}
	};
	//获取五级树信息
	function getTreeMessage() {
		
		DX.ajax_method({
			'url': '/wbsp/xwbs/listL4Xwbs',
			'callBack': function(res) {
				if (res.code == 200) {
					setTimeout(function() {
						setTreeData(res.data,2);
					}, 500)
				} else {
					alert(res.msg);
				}
			}
		});
	}
	function setTreeData(data,type) {
		data.sort(function(i, n) {
			return i.orderBy - n.orderBy
		})
		$.fn.zTree.init($("#tree-moudle"), setting, data);
		zTreeObj = $.fn.zTree.getZTreeObj("tree-moudle");
		var nodesSys = zTreeObj.getNodes(); //可以获取所有的父节点
		var nodesSysAll = zTreeObj.transformToArray(nodesSys); //获取树所有节点
	}
	//选中完成操作
	function zTreeOnCheck(event, treeId, treeNode) {
		console.log(2222);
	};	
	function zTreeOnClick(event, treeId, treeNode){
		if(treeNode.level==3){
			SelectedById(treeNode.id);
		}
	}
	function SelectedById(id){
		// 先清空
		vm.tunnelList=[];
		vm.originalList=[];
		vm.the4thWbsId=id;
		vm.disabled =true;
		DX.ajax_method({
			'url': '/prod/l4dplan/list',
			'param': {
				'xwbsId':id
			},
			'callBack': function(res) {
				if (res.code == 200) {
					vm.disabled =false;
					// 先清空
					vm.tableUnit='';
					if(res.data.datas){
						for(var i=0;i<res.data.datas.length;i++){
							if(res.data.datas[i].startMileage){
								res.data.datas[i].startMileage=format(res.data.datas[i].startMileage,res.data.mileagePrefix,res.data.mileageFormat);
							}
							if(res.data.datas[i].endMileage){
								res.data.datas[i].endMileage=format(res.data.datas[i].endMileage,res.data.mileagePrefix,res.data.mileageFormat);
							}
							if(res.data.datas[i].centerMileage){
								res.data.datas[i].centerMileage=format(res.data.datas[i].centerMileage,res.data.mileagePrefix,res.data.mileageFormat);
							}
							// res.data.datas[i].planEndTime='2021-09-25 00:00:00'
							// res.data.datas[i].expectEndTime='2021-09-23 00:00:00'
							if(res.data.datas[i].planStartTime){
								var arr=res.data.datas[i].planStartTime.split(' ')
								res.data.datas[i].planStartTime=arr[0]
							}
							if(res.data.datas[i].planEndTime){
								var arr=res.data.datas[i].planEndTime.split(' ')
								res.data.datas[i].planEndTime=arr[0]
							}
							if(res.data.datas[i].expectStartTime){
								var arr=res.data.datas[i].expectStartTime.split(' ')
								res.data.datas[i].expectStartTime=arr[0]
							}
							if(res.data.datas[i].expectEndTime){
								var arr=res.data.datas[i].expectEndTime.split(' ')
								res.data.datas[i].expectEndTime=arr[0]
							}
							if(res.data.datas[i].implStartTime){
								var arr=res.data.datas[i].implStartTime.split(' ')
								res.data.datas[i].implStartTime=arr[0]
							}
							if(res.data.datas[i].implEndTime){
								var arr=res.data.datas[i].implEndTime.split(' ')
								res.data.datas[i].implEndTime=arr[0]
							}
							if(res.data.datas[i].precedes.length>0){
								if(res.data.datas[i].precedes.length==1){
									res.data.datas[i].precedesName=res.data.datas[i].precedes[0].name;
								}
								else if(res.data.datas[i].precedes.length>1){
									for(var j=0;j<res.data.datas[i].precedes.length;j++){
										if(j<res.data.datas[i].precedes.length-1){
											res.data.datas[i].precedesName+=res.data.datas[i].precedes[j].name+';';
										}
										else if(j==res.data.datas[i].precedes.length-1){
											res.data.datas[i].precedesName+=res.data.datas[i].precedes[j].name+'。';
										}
									}
								}
							}
							if(res.data.datas[i].planStartTime&&res.data.datas[i].planEndTime){
								res.data.datas[i].duration=vm.TimeDiff(res.data.datas[i].planStartTime,res.data.datas[i].planEndTime);
							}
							if(res.data.datas[i].expectEndTime&&res.data.datas[i].planEndTime){
								res.data.datas[i].warning=vm.TimeDiff(res.data.datas[i].planEndTime,res.data.datas[i].expectEndTime);
							}
							res.data.datas[i].totalLength=Number(res.data.datas[i].totalLength).toFixed(1);
							res.data.datas[i].imageDesignQuantity=Number(res.data.datas[i].imageDesignQuantity).toFixed(1);
							res.data.datas[i].imageAccuQuantity=Number(res.data.datas[i].imageAccuQuantity).toFixed(1);
							res.data.datas[i].imageLeftQuantity=Number(res.data.datas[i].imageLeftQuantity).toFixed(1);
						}
						vm.tunnelList=res.data.datas;
						// 单位
						if(res.data.datas[0]){
							vm.tableUnit=res.data.datas[0].imageUnit;
						}
						// debugger
						// vm.originalList=JSON.parse(JSON.stringify(vm.tunnelList));
						setTimeout(function(){
							$.each(vm.tunnelList,function(index,v){
								vm.initTime(v.id)
							})
						},500)
					}
				} else {
					vm.disabled =false;
					DX.optionTitle(res.msg);
				}
			}
		});
	}
	function format(value, prefix, format){
		// debugger
		
		var K_SYMBOL = "K";
		var L_SYMBOL = "+";
		// 123456.7
		var valueStr = value.toString();
		var indexOfPot = valueStr.lastIndexOf(".");
		var decimalStr = "0." + ((indexOfPot == -1) ? "000" : valueStr.substring(indexOfPot + 1))
		var decimal = parseFloat(decimalStr);
		// 获取公里级
		var kilemeter = parseInt(value / 1000);
		// 获取米级 带小数
		var meter = parseInt(value) - kilemeter * 1000 + decimal;
		switch(format){
			case "K#+###.###":
			    var final=finalDeal(meter.toFixed(3));
				return prefix + K_SYMBOL + kilemeter + L_SYMBOL +final;
			case "+###.###":
			    var final=finalDeal(meter.toFixed(3));
				return prefix + L_SYMBOL + final;
			case "K#":
				return prefix + K_SYMBOL + kilemeter;
			case "+#":
			    var final=finalDeal(meter.toFixed(0));
				return prefix + L_SYMBOL + final;
			case "K#+###":
			    var final=finalDeal(meter.toFixed(0));
				return prefix + K_SYMBOL + kilemeter + L_SYMBOL + final;
			case "K#+###.##":
			    var final=finalDeal(meter.toFixed(2));
				return prefix + K_SYMBOL + kilemeter + L_SYMBOL + final;
			case "K#+###.#":
			    var final=finalDeal(meter.toFixed(1));
				return prefix + K_SYMBOL + kilemeter + L_SYMBOL + final;
			case "+###.##":
			    var final=finalDeal(meter.toFixed(2));
				return prefix + L_SYMBOL + final;
			case "+###.#":
			    var final=finalDeal(meter.toFixed(1));
				return prefix + L_SYMBOL + final;
			default:
				return "";
		}
	} 
	function finalDeal(result){
		var finalResult;
		var resultStr=parseInt(result).toString();
		if(resultStr.length==0){
			finalResult='000'
		}
		else if(resultStr.length==1){
			finalResult='00'+result;
		}
		else if(resultStr.length==2){
			finalResult='0'+result;
		}
		else if(resultStr.length==3){
			finalResult=result;
		}
		return finalResult;
	}
// })

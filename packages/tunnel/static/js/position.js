// $(document).ready(function() 
	// ---------------------------------------------------------------挂载部位js
	var zTreeObj; //树对象
	var newTempArr;
	var setting = {
		check: {
			enable: true,
			chkStyle: "checkbox", // 添加生效
			chkboxType: {
				"Y": "s",
				"N": "s"
			},
			chkStyle: "checkbox",
		},
		data: {
			simpleData: {
				enable: true,
				idKey: "wbsId",
				pIdKey: "wbsParentId"
			},
			keep: {
				leaf: true,
				parent: false
			},
			key: {
				name: "nodeName",
			}
		},
		view: {
			fontCss: {
				color: "#000000",
			},
			showLine: true,
			showIcon: true,
			selectedMulti: true,
			addDiyDom:addHoverDom,
		},
		callback: {
			beforeCheck: true,
			onCheck: zTreeOnCheck,
			beforeDrag: true,
		},
		edit: {
			enable: false,
			showRenameBtn: false,
			showRemoveBtn: false,
		}
	};
	function setTreeData(data,type) {
		data.sort(function(i, n) {
			return i.orderBy - n.orderBy
		})
		$.fn.zTree.init($("#tree-moudle"), setting, data);
		zTreeObj = $.fn.zTree.getZTreeObj("tree-moudle");
	}
	
// })

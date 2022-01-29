//  nodes 数组 获取到的所有树节点数据
//  level 需要设置最多可以展开至第几级
//  width 树节点及搜索部位区域宽度
//  height 树节点及搜索部位区域宽度
Vue.component("tree", {
	props: {
		nodes: {
			type: Array
		},
		level: {},
		width: {},
		height: {},
		text: {}
	},
	template: `
	<div class="ztree-content" :style="{width:width,height:height}">
		<div style="border-bottom:1px solid #ececec;height:40px;padding:0 10px;display:flex;align-items:center;position: relative">
			<input v-model="keyword" type="text" class="input" style="width:50%;" placeholder="请输入部位名称搜索"/>
			<img :src="img==5 ? '../../static/img/expandWbs.png' : '../../static/img/expandWbs1.png'" title="折叠/展开指定层级" class="ml10" @click="showExpandMenu($event)" style="cursor: pointer;" @mouseover="changeImg(5)" @mouseout="changeImg('')">
			<div id="cover" class="hide" @click="hideMenu"></div>
			<div id="expandMenu" class="hide">
				<ul>
					<li v-for="(item,index) in level" :key="index" @click="expandLevel(index)">展开至第{{item}}级</li>
				</ul>
			</div>
		</div>
		<div id="tree-moudle" class="ztree" style="box-sizing:border-box;overflow: auto;" :style="{height:treeHeight}"></div>
	</div>
	`,

	data() {
		return {
			setting: {
				check: {
					chkboxType: {
						"Y": "s",
						"N": "s"
					}
				},
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
						title: ""
					},
				},
				view: {
					fontCss: {
						color: "#000000",
					},
					showLine: true,
					selectedMulti: true,
				},
				callback: {
					onClick: this.zTreeOnClick, //鼠标点击事件
					onRightClick: this.zTreeOnRightClick, //鼠标右键事件
					onDblClick: this.zTreeOnDblClick, //鼠标双击,
					onRename: this.zTreeOnRename, //编辑节点名称完成后
				}
			},
			keyword: '',
			img: '',
			expandIndex: 0,
			treeHeight: '',
			selectNodes: []
		}
	},
	mounted() {
		$.fn.zTree.init($("#tree-moudle"), this.setting, this.nodes);
		$.each(this.nodes, function(i, n) {
			if (n.orderBy === undefined) {
				n.orderBy = 100;
			}
			if (n.level == 1 || n.level == 3 || n.level == 4 || n.level == 5) {
				n.icon = "../../static/ztree/img/diy/zTreeF.png"
			} else {
				n.icon = "../../static/ztree/img/diy/zTreeC.png"
			}
		})
		treeObj = $.fn.zTree.getZTreeObj("tree-moudle");
		var nodes = treeObj.transformToArray(treeObj.getNodes())
		var arr = []
		$.each(nodes, function(i, v) {
			if (v.level == 5) {
				arr.push(v)
			}
			if (v.name == "甘芳特大桥左线2号桥") {
				treeObj.expandNode(v, true, false, false, true);
			}
		})
		this.treeHeight = ($('.ztree-content').height() - 40) + 'px'
	},
	methods: {
		search: function() { //模糊搜索数节点
			var keyType = "name";
			$(".redFontsize").removeClass("redFontsize")
			nodeList = treeObj.getNodesByParamFuzzy(keyType, this.keyword); //调用ztree的模糊查询功能，得到符合条件的节点  
			this.setColorNodes(); //更新节点
		},
		setColorNodes: function() { //高亮显示被搜索到的节点 
			for (var i = 0, l = nodeList.length; i < l; i++) {
				treeObj.expandNode(nodeList[i].getParentNode(), true, false, false); //将搜索到的节点的父节点展开
				$("#" + nodeList[i].tId + "_span").addClass("redFontsize")
			}
		},
		showExpandMenu: function(event) {
			$("#expandMenu").removeClass("hide");
			$("#cover").removeClass("hide");
			$("#expandMenu").css({
				"top": (event.currentTarget.offsetHeight + 20) + "px",
				"left": (event.clientX - 30) + "px"
			});
		},
		//隐藏右键菜单
		hideMenu: function() {
			$("#cover").addClass("hide");
			$("#expandMenu").addClass("hide");
		},
		changeImg: function(num) {
			this.img = num;
		},
		expandLevel: function(index) {
			treeObj = $.fn.zTree.getZTreeObj("tree-moudle");
			if (index > this.expandIndex) {
				this.showZtreeNum(true, treeObj, index, 1)
			} else if (index < this.expandIndex) {
				this.showZtreeNum(true, treeObj, index, 0)
			}
			this.expandIndex = index
			this.hideMenu()
		},
		showZtreeNum: function(status, childnodes, level, check) {
			var $this = this
			zTree = $.fn.zTree.getZTreeObj("tree-moudle");
			if (check == 1) {
				if (status) {
					var rootnodes = zTree.getNodes();
					$this.showZtreeNum(false, rootnodes, level, 1); //递归
				} else {
					if (childnodes) {
						var len = childnodes.length;
						if (len > 0 && level < childnodes[0].level + 1) {
							return;
						}
						for (var i = 0; i < len; i++) {
							zTree.expandNode(childnodes[i], true, false, false, true);
							var child = childnodes[i].children;
							$this.showZtreeNum(false, child, level, 1); //递归
						}
					}
				}
			} else {
				// 获取指定层级数据
				var nodes = treeObj.transformToArray(treeObj.getNodes())
				var arr = []
				$.each(nodes, function(i, v) {
					if (v.level == level) {
						arr.push(v)
					}
				})
				for (var i = 0; i < arr.length; i++) {
					zTree.expandNode(arr[i], false, true, false, true);
				}
			}
		},
		zTreeOnClick: function(event, treeId, treeNode) {
			this.$emit('tree-click', event, treeId, treeNode);
		},
		zTreeOnRightClick: function(event, treeId, treeNode) {
			this.$emit('tree-right-click', event, treeId, treeNode);
		},
		zTreeOnDblClick: function(event, treeId, treeNode) {
			this.$emit('tree-dbl-click', event, treeId, treeNode);
		},
		zTreeOnRename: function(event, treeId, treeNode) {
			this.$emit('tree-rename-click', event, treeId, treeNode);
		},
	},
	watch: {
		keyword: function(newValue, oldValue) {
			this.keyword = newValue
			if (this.keyword) {
				this.search()
			} else {
				$.fn.zTree.init($("#tree-moudle"), this.setting, this.nodes);
			}
		}
	}
})

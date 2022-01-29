var echarts = {
	config:{
		
	},
	//初始化调用
	/**
	 * @param {Object} option
	 * option.legend 图标上边的提示图标 可选 {left: 'center',top: 25}
	 * option.id id名 默认echart
	 * option.tooltip 数据提示 可选
	 * option.xAxis {type 默认 可选 name x方向单位 默认空 data x显示数据 axisLabel 可选 字的角度}
	 * option.yAxis y方向 默认 可选 
	 * option.series 必须 [
		        {
		            name: '平均值',
		            type: 'line',
		            data: aveArr
		        },
		        {
		            name: '单车',
		            type: 'line',
		            data: persionArr
		        },
		       
		    ]
	 */
	init:function(option){
		this.config = option;
		this.config.id = option.id ? 'echart' : option.id;
		this.config.tooltip = option.tooltip ? option.tooltip : {trigger: 'item',formatter: '{a} <br/>{b} : {c}'};
		
		if(option.legend){//图标上边的提示图标 可选
			var data = [];
			for (var i = 0; i < option.series.length; i++) {
				data.push(option.series[i].name);
			}
		
			this.config.legend = { left: option.legend.left ? option.legend.left :'center',top: option.legend.top ? option.legend.top : 25,data: data};
		}
		
		this.config.xAxis = {
		        type: option.xAxis.type ? option.xAxis.type :'category',
		        name: option.xAxis.name ? option.xAxis.name : '',
		        splitLine: {show: false},
				// axisLabel:{
				//     interval:0,
				//     rotate:45,
				// },
		        data: option.xAxis.data
		    }
		
		if(option.axisLabel){//可选
			this.config.xAxis.axisLabel = option.axisLabel;
		}
		
		
		//y方向
		if(option.yAxis){
			this.config.yAxis.option.yAxis;
		}else{
			this.config.yAxis = {
			    type: 'value',
			    name: ''
			}
		}
		
		this.config.series = option.series;
		
		
		var myChart = echarts.init(document.getElementById(config.id),'walden');
		
		
		
		myChart.setOption(this.config);
		window.onresize  = myChart.resize;
		
		
		
	}
	
	
}
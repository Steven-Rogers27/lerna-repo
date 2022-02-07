document.oncontextmenu = function() {
  return false;
}
var vm = new Vue({
  el: '#companyIndexPage',
  data: function() {
    return {
      suidaoTime: '', //进尺时间
      todayInVal: '', //当日进尺
      positionsdTimeVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      treelist: [],
      flag: false, //用来判断鼠标是不是点击在圆圈上
      list: [],
      val: 0,
      index: 0, //现在点击的将要移动的圆球的index
      aa: "-10,-10,100,200",
      partTitle: '', //弹窗内的标题
      delWorkObj: '', //正在操作的工序对象
      afterIdIndex: 0,
      nowPartId: '', //现在的部位id 六级
      xuanfu: {
        startTime: '2020-10-15',
        endTime: '2020-10-15',
      },
      enterVal: '', //鼠标悬浮的val
      ceshi: '',
      maLeftArr: ['', '10px', '20px', '38px', '54px', '71px', '87px'],
      show: false,
      // colorStatusArr: ['#fca000', '#1e90ff', '#1bc088'],
      lineRectColorArr: ['#1e90ff', '#f2292a', '#fee703', '#1bc088', '#1e90ff'],
      colorStatusArr: ['#1e90ff', '#1e90ff', '#f2292a', '#fee703', '#1bc088'],
      bgColorStatusArr: ['#fff5e5', '#e8f4ff', '#e8f9f3'],
      bgColorStatusArr: ['#f2f2f2', '#f2f2f2', '#f2f2f2'],
      workShow: false,
      workShowIndex: 0,
      dialogVisible: false,
      timeText: "修改计划开始时间",
      updateTime: "",
      updateType: 1,
      fullList: [],
      verClickNum: 1,
      clickTimer: null,
      lastClickTime: 0,
      projectId: 0,

      drawer: false,
      direction: 'rtl',
      UnitList: '', //单位工程列表
      param4: {
        width: 500,
        height: 300,
        title: "选择单位工程",
      },
      hide4: true,
      checkList: [],
      timenode: '', //现在点开的时间的部位
      startOrEnd: '', //判断是开始时间还是结束时间

      param3: {
        width: 700,
        height: 400,
        title: "配置紧前节点",
      },
      hide3: true,
      param6: {
        width: 500,
        height: 400,
        title: "选择单位工程",
      },
      hide6: true,
      setSrc: '',
      atlevelList: [], //查询所有同级的列表
      checkLevelList: [], //已经选中的同级部位
      jinqianVal: '', //设置紧前节点时
      topImg: true,
      gongqiVisible: false, //修改工序的工期的弹窗是否显示
      nowGongqiVal: '', //正在更改的工序的val
      gongxugongqi: '',
      firstLbuildStatus: 0, //第一个圈圈
      GxTimeChange: [], //修改工序的时间弹窗内的绑定时间
      dialogGxTimeVisible: false, //修改工序的时间弹窗
      GxTimeChangeVal: '', //当前点击的改时间的工序
      GxTimeChangeIndex: '', //当前点击的改时间的工序index
      defaultProps: {
        children: 'children',
        label: 'name',
        disabled: 'children',
      },
      checkedlevelList: [], //右边已选list
      oldList: [],
      allProjectList: [], //所有单位工程
      projectCheckedList: [], //已选择
      Interval: '',
      percentage: 0,
      TKflag: 1, //1刷新  2导出
      TKtype: 0,
      gxtkTitle: '修改施工时间',
      lastCheckedList: [], //已选的部位，紧前
      chushihuaFlag: false,
      chushiDate: new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date()
        .getMonth() +
        1) : '0' + (new Date().getMonth() + 1)) + '-' + ((new Date().getDate()) >= 10 ? (
        new Date().getDate()) : '0' + (new Date().getDate())),
      isDisabled: false,
      buildSixStatus: '', //当前第六级的状态
      dialogfiveVisible: false,
      timeFiveNode: '',
      MainCodeval: '', //当前点击的设置关键节点
      mainCodeText: '设置为关键节点',
      suidaoShow: false, //展示隧道进度的小部分
      ///////隧道进度
      ruler_size: 1,
      standard_size: 1,
      ruler_data: [],
      box_width: 100,
      records_data: [],
      whole_width: 0,
      sdAllVal: '', //隧道指标进度查询数据
      suidaoGongxuList: [],
      nowPartName: '', //当前点击的工序名
      nowCaijiPartName:'',//当前点击的进尺
      sixPart: '',
      jinchiTimeVal: '', //当前进尺时间
      jinchiNum: 1, //代表是已完成还是未完成的进尺点进来的,1表示已完成，3表示未完成
      topActiveName: 'topActivefirst',
      jinchiStartTime: '',
      jinchiEndTime: '',
    }
  },
  mounted: function() {
    var $this = this
    this.getTreeLists()
    this.getFullList()
    this.getUnitList()
    this.getAllProject()
    setInterval(function() {
      var twoTime = ''
      var oneTime = ''
      var time = new Date().getMinutes()
      if (time == 10 || time == 40) {
        twoTime = new Date().getTime()
        if (oneTime == '' && ((twoTime - oneTime) <= 60000)) {
          return
        }
        $this.getUnfinishNum()
        oneTime = new Date().getTime()
      }
    }, 59999);
  },
  methods: {
    clickRecord: function(index, num, val, e) {
      if (num == 1) {
        if($(e.target).css('display')=='block'){ //点击的是长条的子元素span
          $(e.target).parent().css('background', '#03f6ce')
          this.nowCaijiPartName = $(e.target).parent()
        }else{
          $(e.target).css('background', '#03f6ce')
          this.nowCaijiPartName = $(e.target)
        }
        if (index != 0) {
          this.jinchiStartTime = this.records_data[index - 1].time
          this.jinchiEndTime = val.time
        } else {
          this.jinchiStartTime = this.sixPart.sjStartTime
          this.jinchiEndTime = val.time
        }
      }
      this.jinchiTimeVal = val
      this.jinchiNum = num //代表是已完成还是未完成的进尺点进来的
      // var top = $(e.target).offset().top - $(document).scrollTop(); //当前点击的标签在浏览器中的top
      // top = top + $(e.target).height() - 80
      // var left = $(e.target).offset().left
      // left = left + $(e.target).width() / 2
      this.openWin(this.suidaoGongxuList[0].id, this.suidaoGongxuList[0].parentId, 0, this
        .suidaoGongxuList[0].name, 2, e)
      return
      var top = e.y - $('.fFiveClo').height() + 70 //当前点击的标签在浏览器中的top
      var left = e.x + 10
      $('#fFivebackGound').show()
      $('.fFiveClo').css({
        top: top,
        left: left
      }).show(); //固定位置
    },
    suidaoTClose: function() {
      this.positionsdTimeVisible = false
    },
    curCaiji: function() {
      var $this = this
      if ($this.sixPart.buildStatus == 0) {
        DX.optionTitle('点部位未开始，不可采集进尺量')
        return
      }
      this.positionsdTimeVisible = true
    },
    todayIn: function() { //今日进尺量采集
      var $this = this
      if ($this.todayInVal == '') {
        DX.optionTitle('请输入进尺数量')
        return
      }
      if (Number($this.todayInVal) < 0) {
        DX.optionTitle('进尺量不可为负数')
        return
      }
      $('#loadbackGound').css('display', 'flex')
      DX.ajax_method({
        'type': 'POST',
        'param': {
          'wbsId': $this.nowPartId,
          'linear': $this.todayInVal,
          'acquisitionTime': $this.suidaoTime,
        },
        'url': '/prod/con/image/progress/batchAddProgress',
        'callBack': function(res) {
          if (res.code == 200) {
            $this.$message({
              type: 'success',
              message: '添加成功'
            });
            $this.todayInVal = ''
            $this.positionsdTimeVisible = false
            $this.getSuiList()
          }
        },
        'errorCall': function(res) {
          $('#loadbackGound').css('display', 'none')
        },
      });
    },
    getSuiList: function() {
      var $this = this
      DX.ajax_method({
        'type': 'GET',
        'param': {
          'wbsId': $this.nowPartId,
        },
        'url': '/prod/con/image/progress/getXproNumProgress',
        'callBack': function(res) {
          if (res.code == 200) {
            $('#loadbackGound').css('display', 'none')
            $this.sdAllVal = res.data
            // $.each($('.suidao_wrap'),function(i,v){
            // 	if($(this).css('display')!='none'){
            // 		$this.box_width = $(this).outerWidth();
            // 		return false
            // 	}
            // })
            var extra = JSON.parse(res.data.extra);
            if(extra){
              $this.sdAllVal.direction = extra.directName;
            }		


            var hasK = true //是否包含K，默认包含
            var kleftNum = res.data.startMileageFormat.split('+')[0]
            var isIndex = kleftNum.indexOf('K')
            if (isIndex != -1) { //包含k
              hasK = true
              kleftNum = Number(kleftNum.split('K')[1]) //加号左侧除去“k”字母后的纯数值
            } else {
              hasK = false
              kleftNum = Number(kleftNum)
            }
            // 隧道方向 从大里程到小里程 or 小里程到大里程 
            if(extra.directName == 0){
              var krightNum = Number(res.data.startMileageFormat.split('+')[
              1]) //加号后面的值
              var nowRightNum = krightNum + Number(res.data.quantityImpl)
              var lastLeft = ''
              if (nowRightNum >= 1000) { //如果相加后的数值大于一千，则向前进一位
                nowRightNum = nowRightNum - 1000
                if (hasK) {
                  lastLeft = 'K' + (kleftNum + 1)
                } else {
                  lastLeft = kleftNum + 1
                }
              } else {
                if (hasK) {
                  lastLeft = 'K' + kleftNum
                } else {
                  lastLeft = kleftNum
                }
              }
              if(nowRightNum>=0 && nowRightNum <=9){
                nowRightNum = '00' + nowRightNum
              }else if(nowRightNum>=10 && nowRightNum <=99){
                nowRightNum = '0' + nowRightNum
              }
              $this.sdAllVal.kaileiLicheng = lastLeft + '+' + nowRightNum
            }else{
              var krightNum = Number(res.data.endMileageFormat.split('+')[
              1]) //加号后面的值
              var nowRightNum = krightNum - Number(res.data.quantityImpl)
              var lastLeft = ''
              if (nowRightNum < 0 ) { //如果相加后的数值大于一千，则向前进一位
                nowRightNum = nowRightNum + 1000
                if (hasK) {
                  lastLeft = 'K' + (kleftNum - 1)
                } else {
                  lastLeft = kleftNum - 1
                }
              } else {
                if (hasK) {
                  lastLeft = 'K' + kleftNum
                } else {
                  lastLeft = kleftNum
                }
              }
              if(nowRightNum>=0 && nowRightNum <=9){
                nowRightNum = '00' + nowRightNum
              }else if(nowRightNum>=10 && nowRightNum <=99){
                nowRightNum = '0' + nowRightNum
              }
              $this.sdAllVal.kaileiLicheng = lastLeft + '+' + nowRightNum
            }
            $this.box_width = $('.el-table__row--level-6').width() * 0.8
            $this.computeRuler(res.data.totalLenght);
            var records = res.data.details;
            $this.showRecord(res.data.totalLenght, records)
            DX.ajax_method({
              'param': {
                'parentId': $this.nowPartId,
                'level': 7
              },
              'url': '/prod/xact/list/byLevel/union',
              'callBack': function(res) {
                if (res.code == 200) {
                  if (res.data != "") {
                    vm.suidaoGongxuList = res.data
                  }
                }
              }
            });
          }
        },
      });
    },
    computeRuler: function(range) {
      var data = [];
      var size = this.getStandardRange(range) / this.ruler_size;
      for (var i = 0; i < size; i++) {
        if (size <= 10) {
          data.push({
            num: i,
            class: ''
          })
        } else {
          if (i % 5 == 0) {
            data.push({
              // num: Number(i * this.ruler_size ) + Number(this.sdAllVal.startMileage),
              num: Number(i * this.ruler_size),
              class: 'size_5_or_10'
            })
          } else {
            data.push({
              num: '',
              class: ''
            })
          }
        }
      }
      this.ruler_data = data;
    },
    showRecord: function(point_len, records) {
      var width_per_size = this.box_width / this.standard_size;
      this.whole_width = {
        width: point_len * width_per_size + "px"
      };
      var data = [];
      for (var i = 0; i < records.length; i++) {
        data.push({
          width: records[i].quantityImpl * width_per_size + 'px',
          time: records[i].time,
          widthVal: records[i].quantityImpl,
          pxval: records[i].quantityImpl * width_per_size
        })
      }
      this.records_data = data;
    },
    getStandardRange: function(num) {
      var standard_size;
      if (num <= 10) {
        standard_size = Math.ceil(num);
      } else if (num <= 100) {
        standard_size = Math.ceil(num / 5) * 5;
      } else {
        standard_size = Math.ceil(num / 10) * 10;
        this.ruler_size = 5;
      }
      this.standard_size = standard_size;
      return standard_size;
    },
    setMainCode: function() {
      var $this = this
      DX.ajax_method({
        'param': {
          'id': $this.MainCodeval.id,
          'flag': $this.MainCodeval.mainNode == 1 ? 0 : 1
        },
        'url': '/prod/xactivity/setMainNode',
        'callBack': function(res) {
          if (res.code == 200) {
            DX.optionTitle()
            setTimeout(function() {
              location.reload()
            }, 800)
          }
        },
      });
    },
    mainCodehideBack: function() {
      $('#mainCodebackGound').hide()
      $('.mainCode').hide()
    },
    rightClick: function(e, val) {
      this.MainCodeval = val
      if (val.mainLine == 1 && val.level == 6) { //关键路径且点部位，可设置为关键节点
        if (val.mainNode == 1) {
          this.mainCodeText = '取消关键节点设置'
        } else {
          this.mainCodeText = '设置为关键节点'
        }
        $('#mainCodebackGound').show()
        $('.mainCode').css({
          top: e.clientY,
          left: e.clientX
        }).show();
      }
    },
    startGx: function() {
      var that = this
      if (that.list[0].startTime == '') {
        return
      }
      if (this.buildSixStatus == 0) { //父级未开始
        DX.ajax_method({
          'type': 'POST',
          'param': {
            'xjobId': that.list[0].id,
          },
          'url': '/prod/data/collect/start/xjob',
          'callBack': function(res) {
            if (res.code == 200) {
              DX.optionTitle()
              that.getGongxu()
            }
          },
        });
      } else {
        return
      }
    },
    jChangeGongqi: function() { //修改点部位工期
      var that = this
      if (that.timenode.expectStartTime == '') {
        DX.ajax_method({
          'type': 'POST',
          'param': {
            'id': that.timenode.id,
            'duration': that.timenode.gongqi
          },
          'url': '/algp/plan/modifyXWbsDuration',
          'callBack': function(res) {
            if (res.code == 200) {
              DX.optionTitle()
              setTimeout(function() {
                location.reload()
              }, 1000)
            }
          },
        });
      } else {
        var dd = new Date(that.timenode.expectStartTime);
        var planEndTime = ""
        dd.setDate(dd.getDate() + Number(that.timenode.gongqi)); //获取p_count天后的日期
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? ('0' + (dd.getMonth() + 1)) : (dd.getMonth() +
          1); //获取当前月份的日期
        var d = dd.getDate() < 10 ? ('0' + dd.getDate()) : dd.getDate();
        var h = dd.getHours() < 10 ? ('0' + dd.getHours()) : dd.getHours();
        var f = dd.getMinutes() < 10 ? ('0' + dd.getMinutes()) : dd.getMinutes();
        var s = dd.getSeconds() < 10 ? ('0' + dd.getSeconds()) : dd.getSeconds();
        planEndTime = y + "-" + m + "-" + d + ' ' + h + ":" + f + ":" + s;
        DX.ajax_method({
          'type': 'POST',
          'param': {
            'id': that.timenode.id,
            'predictEndTime': planEndTime
          },
          'url': '/algp/predict/modifyXWbsPredictEndTime',
          'callBack': function(res) {
            if (res.code == 200) {
              DX.optionTitle()
              window.location.reload()
            }
          },
        });
      }
    },
    jchangeDbwTime: function(num) {
      var that = this;
      var planStartTime = that.timenode.expectStartTime
      var planEndTime = that.timenode.expectEndTime
      if (num == 1) { //开始
        if (planEndTime == '') {
          planEndTime = planStartTime
        }
        // var oDate1 = new Date(that.timenode.startTime); //开始
        // var oDate2 = new Date(planEndTime);
        // if (oDate1.getTime() > oDate2.getTime()) {
        // 	DX.optionTitle('开始时间不可大于结束时间')
        // 	return false; //第一个大
        // }
      } else { //结束
        if (planStartTime == '') {
          planStartTime = planEndTime
        }
        // var oDate1 = new Date(that.timenode.endTime); //结束
        // var oDate2 = new Date(planStartTime);
        // if (oDate1.getTime() < oDate2.getTime()) {
        // 	DX.optionTitle('开始时间不可大于结束时间')
        // 	return false; //第一个大
        // }
      }
      if (num == 1) {
        DX.ajax_method({
          'type': 'POST',
          'param': {
            'id': that.timenode.id,
            // 'planStartTime': num == 1 ? that.timenode.startTime : planStartTime,
            'predictStartTime': num == 1 ? that.timenode.expectStartTime :
              planStartTime,
          },
          // 'url': '/algp/plan/modifyXWbsPlanStartTime',
          'url': '/algp/predict/modifyXWbsPredictStartTime',
          'callBack': function(res) {
            if (res.code == 200) {
              DX.optionTitle()
              setTimeout(function() {
                location.reload()
              }, 1000)
            }
          },
        });
      } else {
        DX.ajax_method({
          'type': 'POST',
          'param': {
            'id': that.timenode.id,
            // 'planEndTime': num == 2 ? that.timenode.endTime : planEndTime,
            'predictEndTime': num == 2 ? that.timenode.expectEndTime : planEndTime,
          },
          // 'url': '/algp/plan/modifyXWbsPlanEndTime',
          'url': '/algp/predict/modifyXWbsPredictEndTime',
          'callBack': function(res) {
            if (res.code == 200) {
              DX.optionTitle()
              setTimeout(function() {
                location.reload()
              }, 1000)
            }
          },
        });
      }
    },
    jchangeGxTime: function(num) {
      var that = this;
      var planStartTime = that.GxTimeChangeVal.startTime
      var planEndTime = that.GxTimeChangeVal.endTime
      if (num == 1) { //开始
        if (planEndTime == '') {
          planEndTime = planStartTime
        }
        var oDate1 = new Date(that.GxTimeChange[0]); //开始
        var oDate2 = new Date(planEndTime);
        if (oDate1.getTime() > oDate2.getTime()) {
          DX.optionTitle('开始时间不可大于结束时间')
          return false; //第一个大
        }
      } else { //结束
        if (planStartTime == '') {
          planStartTime = planEndTime
        }
        var oDate1 = new Date(that.GxTimeChange[1]); //结束
        var oDate2 = new Date(planStartTime);
        if (oDate1.getTime() < oDate2.getTime()) {
          DX.optionTitle('开始时间不可大于结束时间')
          return false; //第一个大
        }
      }
      if (num == 1) {
        DX.ajax_method({
          'type': 'POST',
          'param': {
            'id': that.GxTimeChangeVal.id,
            'planStartTime': num == 1 ? that.GxTimeChange[0] : planStartTime,
          },
          'url': '/algp/plan/modifyXjobPlanStartTime',
          'callBack': function(res) {
            if (res.code == 200) {
              DX.optionTitle()
              that.getGongxu()
            }
          },
        });
      } else {
        DX.ajax_method({
          'type': 'POST',
          'param': {
            'id': that.GxTimeChangeVal.id,
            'planEndTime': num == 2 ? that.GxTimeChange[1] : planEndTime,
          },
          'url': '/algp/plan/modifyXjobPlanEndTime',
          'callBack': function(res) {
            if (res.code == 200) {
              DX.optionTitle()
              that.getGongxu()
            }
          },
        });
      }
    },
    getAllProject: function() { //获取所有单位工程，给刷新时做准备
      var $this = this
      DX.ajax_method({
        'url': "/algp/xact/listSubProject",
        'callBack': function(res) {
          if (res.code == 200) {
            $this.allProjectList = res.data
          } else {
            DX.optionTitle(res.msg)
          }
        }
      })
    },
    getUnfinishNum: function() {
      var $this = this
      DX.ajax_method({
        'url': "/prod/dispose/warning/get/user/unfinish/num",
        'callBack': function(res) {
          if (res.code == 200) {
            var str = ''
            if (res.data != '') {
              str += '<p>' + res.data + '</p>'
              $this.$message({
                dangerouslyUseHTMLString: true,
                message: str,
                type: 'success',
                duration: 3000
              });
              $('body', window.top.document).find('#message').addClass("newTip")
            }
          } else {
            DX.optionTitle(res.msg)
          }
        }
      })
    },
    workDown: function(v) { //施工完成
      var $this = this
      if (this.buildSixStatus == 0) {
        DX.optionTitle('父级点部位未开始，无法执行该操作')
        return
      } else {
        var yes = confirm('确认结束吗？')
        if (yes) {
          // if (v.buildStatus != 1) {
          // 	DX.optionTitle('工序未进行，无法执行该操作')
          // 	return
          // }
          DX.ajax_method({
            'type': "POST",
            'url': "/prod/data/collect/finish/xJob?xJobId=" + v.id,
            'callBack': function(res) {
              if (res.code == 200) {
                var str = ''
                if (res.data != '') {
                  $.each(res.data, function(i, v) {
                    if (v.level == 6) {
                      str += '<p>' + v.pathname + v.name +
                        '部位预警等级为' + v.warnLevel + '级；</p>'
                    }
                  })
                  str += '<p>请关注协调生产安排，以免延期</p>'
                  $this.$message({
                    dangerouslyUseHTMLString: true,
                    message: str,
                    type: 'success',
                    duration: 3000
                  });
                  $('body', window.top.document).find('#message').addClass(
                    "newTip")
                }
                $this.getGongxu()
              } else {
                DX.optionTitle(res.msg)
              }
            }
          })
        }
      }

    },
    jqdelRedEnter: function(v) {
      v.jqdelRed = true
      this.$forceUpdate()
    },
    jqdelRedLeave: function(v) {
      v.jqdelRed = false
      this.$forceUpdate()
    },
    changeGxTime: function() { //更新时间
      var $this = this
      var oDate1 = new Date($('.el-date-editor--datetimerange').find('input').eq(0).val()); //开始
      var oDate2 = new Date($('.el-date-editor--datetimerange').find('input').eq(1).val());
      if (oDate1.getTime() > oDate2.getTime()) {
        DX.optionTitle('开始时间不可大于结束时间')
        return false; //
      }
      // DX.ajax_method({
      // 	'type': 'POST',
      // 	'url': '/prod/xact/xjob/modify/time/plan',
      // 	'param': {
      // 		'startTime': $('.el-date-editor--datetimerange').find('input').eq(0).val(),
      // 		'endTime': $('.el-date-editor--datetimerange').find('input').eq(1).val(),
      // 		'currId': $this.GxTimeChangeVal.id,
      // 		'preId': $this.GxTimeChangeIndex == 0 ? '' : $this.list[$this
      // 			.GxTimeChangeIndex - 1].id,
      // 		'afterId': $this.GxTimeChangeIndex == $this.list.length - 1 ? '' : $this.list[
      // 			$this.GxTimeChangeIndex + 1].id,
      // 	},
      // 	'callBack': function(res) {
      // 		if (res.code == 200) {
      // 			DX.optionTitle()
      // 			$this.dialogGxTimeVisible = false
      // 		} else {
      // 			DX.optionTitle(res.msg);
      // 		}
      // 	}
      // })
      DX.ajax_method({
        'type': 'POST',
        'url': '/prod/xact/xjob/modify/time/plan',
        'param': {
          'startTime': $('.el-date-editor--datetimerange').find('input').eq(0).val(),
          'endTime': $('.el-date-editor--datetimerange').find('input').eq(1).val(),
          'currId': $this.GxTimeChangeVal.id,
          'preId': $this.GxTimeChangeIndex == 0 ? '' : $this.list[$this
            .GxTimeChangeIndex - 1].id,
          'afterId': $this.GxTimeChangeIndex == $this.list.length - 1 ? '' : $this.list[
            $this.GxTimeChangeIndex + 1].id,
        },
        'callBack': function(res) {
          if (res.code == 200) {
            DX.optionTitle()
            $this.dialogGxTimeVisible = false
          } else {
            DX.optionTitle(res.msg);
          }
        }
      })
    },
    closeDxTime: function(val) {
      this.dialogGxTimeVisible = false
    },
    openGxTimeModal: function(val, i) {
      this.dialogGxTimeVisible = true
      this.gxtkTitle = '修改' + val.name + '的施工时间'
      this.GxTimeChange = [val.startTime, val.endTime]
      this.GxTimeChangeVal = val
      this.GxTimeChangeIndex = i
    },
    opengongqiVisible: function(v, i) {
      this.gongqiVisible = true
      this.nowGongqiVal = v
      this.gongxugongqi = i == 0 ? (v.xian * v.pxTimes).toFixed(1) : ((v.xian - this.list[i - 1]
        .xian) * v.pxTimes).toFixed(1)
    },
    gongqihandleClose: function() {
      this.gongqiVisible = false
    },
    changeGongxuGongqi: function() {
      var that = this;
      if (this.nowGongqiVal.buildStatus == 3) {
        DX.optionTitle('已完成,不能修改')
        return
      }
      var val = this.nowGongqiVal
      // var dd = new Date(val.expectStartTime);
      let timestamp = new Date(val.expectStartTime).getTime(); //当前的时间戳
      timestamp = timestamp + (this.gongxugongqi * 60 * 60 * 1000);
      //格式化时间获取年月日
      var dd = new Date(timestamp);
      var planEndTime = ""
      // dd.setHours(dd.getHours() + Number(this.gongxugongqi));
      var y = dd.getFullYear();
      var m = (dd.getMonth() + 1) < 10 ? ('0' + (dd.getMonth() + 1)) : (dd.getMonth() +
        1); //获取当前月份的日期
      var d = dd.getDate() < 10 ? ('0' + dd.getDate()) : dd.getDate();
      var h = dd.getHours() < 10 ? ('0' + dd.getHours()) : dd.getHours();
      var f = dd.getMinutes() < 10 ? ('0' + dd.getMinutes()) : dd.getMinutes();
      var s = dd.getSeconds() < 10 ? ('0' + dd.getSeconds()) : dd.getSeconds();
      planEndTime = y + "-" + m + "-" + d + ' ' + h + ":" + f + ":" + s;
      DX.ajax_method({
        'type': 'POST',
        'param': {
          'nodeId': val.id,
          'planStartTime': null,
          'planEndTime': planEndTime,
          'preNodeIdListStr': null
        },
        'url': '/timenetwork/plan/changePlanNode',
        'callBack': function(res) {
          if (res.code == 200) {
            DX.optionTitle()
            that.gongqiVisible = false
            that.getGongxu()
          }
        },
      });
    },
    delRedEnter: function() {
      this.topImg = false
      this.$forceUpdate()
    },
    delRedLeave: function() {
      this.topImg = true
      this.$forceUpdate()
    },
    getDevice: function(num) { //刷新抽屉
      // document.getElementById('newSettingId').contentWindow.location.reload(true);
      var fun
      if (num == 1) {
        fun = 'vm.getQitaList()' //其他
      } else if (num == 2) {
        fun = 'vm.getDevice()' //机械
      } else if (num == 3) {
        fun = 'vm.getCaiLiao()' //材料
      } else if (num == 4) {
        fun = 'vm.getYongGongCount()' //用工数量
      } else if (num == 5) {
        fun = 'vm.getGongcheng()' //工程数量
      } else if (num == 6) {
        fun = 'vm.getObsTbs()' //tbs
      } else if (num == 7) {
        fun = 'vm.newGetObs()' //0bs
      }
      var javascript
      javascript = "document.getElementById('newSettingId').contentWindow." + fun;
      try {
        if (fun) { //如果传了方法名就执行传入的方法
          eval(javascript);
        } else { //如果没传就刷新整个父页面
          javascript =
            "document.getElementById('newSettingId').contentWindow.location.reload()";
          eval(javascript);
        }
      } catch (e) {}
    },
    changeMilestone: function(val) {
      var $this = this
      DX.ajax_method({
        'type': 'POST',
        'param': {
          'nodeId': val.id,
          'milestone': val.milestone,
        },
        'url': '/timenetwork/plan/setMilestone',
        'callBack': function(res) {
          if (res.code == 200) {
            DX.optionTitle()
          }
        },
      });
    },
    changeJinqian: function() {
      var $this = this
      DX.ajax_method({
        'type': 'POST',
        'param': {
          'id': $this.jinqianVal.id,
          // 'planStartTime': null,
          // 'planEndTime': null,
          'tightenUpIds': $this.checkLevelList.join(',')
        },
        'url': '/algp/plan/resetTightenUp',
        'callBack': function(res) {
          if (res.code == 200) {
            DX.optionTitle()
            $this.hide3 = true
            window.location.reload()
          }
        },
      });
    },
    checkLevel: function(val) {
      val.flag = !val.flag
      val.jqdelRed = false
      if (val.flag) {
        this.checkLevelList.push(val.id)
      } else {
        var index = this.checkLevelList.indexOf(val.id)
        this.checkLevelList.splice(index, 1)
      }
      this.$forceUpdate()
    },
    rightChange: function(a, b) {
      var $this = this
      var index = $this.checkLevelList.indexOf(a.id)
      $this.checkLevelList.splice(index, 1)
      $this.checkedlevelList = JSON.parse(JSON.stringify($this.atlevelList))
      $this.getcheckedlevelList($this.checkedlevelList)
      $this.atlevelList = []
      $this.atlevelList = JSON.parse(JSON.stringify($this.oldList))
    },
    changeProjectCheck: function(a, d) { //刷新时选择工程部位
      var $this = this
      var index = d.checkedKeys.indexOf(a.id)
      if (index == -1) { //说明是取消选中
        var ii = $this.projectCheckedList.indexOf(a.id)
        $this.projectCheckedList.splice(ii, 1)
      } else { //说明是选中它
        $this.projectCheckedList = [a.id]
        $this.$refs.tree6.setCheckedKeys($this.projectCheckedList);
        if (a.planStartTime != '') {
          this.chushiDate = a.planStartTime.split(' ')[0];
        }
        if (a.status != 0) {
          this.isDisabled = true
        } else {
          this.isDisabled = false
        }
      }
    },
    changeCheck: function(a, d) {
      var $this = this
      var index = d.checkedKeys.indexOf(a.id)
      if (index == -1) { //说明是取消选中
        var ii = $this.checkLevelList.indexOf(a.id)
        $this.checkLevelList.splice(ii, 1)
        var arr = []
        $.each($this.lastCheckedList, function(i, v) {
          if (v.id != a.id) {
            arr.push(v)
          }
        })
        $this.lastCheckedList = arr
      } else { //说明是选中它
        $this.checkLevelList.push(a.id)
        a.fullName = a.pathName + '/' + a.name
        $this.lastCheckedList.push(a)
      }
      // $this.checkedlevelList = JSON.parse(JSON.stringify($this.atlevelList))
      // $this.getcheckedlevelList($this.checkedlevelList)
    },
    delLastCheck: function(v) {
      var $this = this
      var ii = $this.checkLevelList.indexOf(v.id)
      $this.checkLevelList.splice(ii, 1)
      $this.checkedlevelList = JSON.parse(JSON.stringify($this.atlevelList))
      $this.getcheckedlevelList($this.checkedlevelList)
      $this.atlevelList = []
      $this.atlevelList = JSON.parse(JSON.stringify($this.oldList))
      var arr = []
      $.each($this.lastCheckedList, function(i, vv) {
        if (vv.id != v.id) {
          arr.push(vv)
        }
      })
      $this.lastCheckedList = arr
    },
    setJinQian: function(val) {
      var $this = this
      if (val.level != 6) {
        DX.optionTitle('只有点部位可配置')
        return
      }
      this.lastCheckedList = []
      this.checkLevelList = []
      this.jinqianVal = val
      if (val.tightenUpList != '') {
        $.each(val.tightenUpList, function(i, v) {
          $this.checkLevelList.push(v.id)
        })
        $this.lastCheckedList = JSON.parse(JSON.stringify(val.tightenUpList))
      }
      DX.ajax_method({
        'url': '/prod/xact/list/tighten/options',
        'param': {
          'xWbsId': val.id,
          'isTree': true
        },
        'callBack': function(res) {
          if (res.code == 200) {
            $this.hide3 = false;
            $this.atlevelList = [res.data]
            $this.oldList = JSON.parse(JSON.stringify([res.data]))
            $this.checkedlevelList = JSON.parse(JSON.stringify([res.data]))
            $this.getcheckedlevelList($this.checkedlevelList)
          }
        }
      });
    },
    getcheckedlevelList: function(data, id, name) {
      var $this = this
      $.each(data, function(i, v) {
        if (v.children) {
          $this.getcheckedlevelList(v.children, v.id, v.name)
        } else {
          var newData = data.filter(x => $this.checkLevelList.indexOf(x.id) != -1)
          $this.foreachIn($this.checkedlevelList, id, newData)
          $this.getcheckedlevelList([], v.id, v.name)
        }
      })
    },
    foreachIn: function(data, id, val) {
      var $this = this
      $.each(data, function(i, v) {
        if (v.id == id) {
          v.children = val
          return false
        }
        if (v.children) {
          $this.foreachIn(v.children, id, val)
        }
      })
    },
    changeGongqi: function(val) {
      var that = this;
      var dd = new Date(val.expectStartTime);
      var planEndTime = ""
      dd.setDate(dd.getDate() + Number(val.gongqi)); //获取p_count天后的日期
      var y = dd.getFullYear();
      var m = (dd.getMonth() + 1) < 10 ? ('0' + (dd.getMonth() + 1)) : (dd.getMonth() +
        1); //获取当前月份的日期
      var d = dd.getDate() < 10 ? ('0' + dd.getDate()) : dd.getDate();
      var h = dd.getHours() < 10 ? ('0' + dd.getHours()) : dd.getHours();
      var f = dd.getMinutes() < 10 ? ('0' + dd.getMinutes()) : dd.getMinutes();
      var s = dd.getSeconds() < 10 ? ('0' + dd.getSeconds()) : dd.getSeconds();
      planEndTime = y + "-" + m + "-" + d + ' ' + h + ":" + f + ":" + s;
      DX.ajax_method({
        'type': 'POST',
        'param': {
          'nodeId': val.id,
          'planStartTime': null,
          'planEndTime': planEndTime,
          'preNodeIdListStr': null
        },
        'url': '/timenetwork/plan/changePlanNode',
        'callBack': function(res) {
          if (res.code == 200) {
            DX.optionTitle()
            window.location.reload()
          }
        },
      });
    },
    changeTime: function() {
      var that = this;
      var planStartTime = that.timenode.expectStartTime
      var planEndTime = that.timenode.expectEndTime
      if (that.startOrEnd == 1) { //开始
        if (planEndTime == '') {
          planEndTime = planStartTime
        }
        var oDate1 = new Date(that.updateTime); //开始
        var oDate2 = new Date(planEndTime);
        if (oDate1.getTime() > oDate2.getTime()) {
          DX.optionTitle('开始时间不可大于结束时间')
          return false; //第一个大
        }
      } else { //结束
        if (planStartTime == '') {
          planStartTime = planEndTime
        }
        var oDate1 = new Date(that.updateTime); //结束
        var oDate2 = new Date(planStartTime);
        if (oDate1.getTime() < oDate2.getTime()) {
          DX.optionTitle('开始时间不可大于结束时间')
          return false; //第一个大
        }
      }
      DX.ajax_method({
        'type': 'POST',
        'param': {
          'nodeId': that.timenode.id,
          'planStartTime': that.startOrEnd == 1 ? that.updateTime : planStartTime,
          'planEndTime': that.startOrEnd == 2 ? that.updateTime : planEndTime,
          'preNodeIdListStr': null
        },
        'url': '/timenetwork/plan/changePlanNode',
        'callBack': function(res) {
          if (res.code == 200) {
            DX.optionTitle()
            that.dialogVisible = false
            window.location.reload()
          }
        },
      });
    },
    openHide4: function() {
      this.hide6 = false
      this.TKflag = 2 //导出
      return
      this.hide4 = false
      this.checkList = []
    },
    daochu: function() {
      var $this = this
      // return
      if ($this.checkList.length == 0) {
        DX.optionTitle('请先选择单位工程')
        return
      }
      DX.DownLoadFile({
        // 'url': '/timenetwork/plan/exportPlan?Token=' + DX.getToken() + '&projectId=' + $this.projectId + '&nodeIdList=' + $this.checkList.join(',')
        'url': '/timenetwork/plan/exportPlan?Token=' + DX.getToken() + '&nodeIdList=' +
          $this.checkList.join(',')
      });
      this.closeModal()
    },
    checkUnit: function(val) {
      val.flag = !val.flag
      if (val.flag) {
        this.checkList.push(val.id)
      } else {
        var index = this.checkList.indexOf(val.id)
        this.checkList.splice(index, 1)
      }
      this.$forceUpdate()
    },
    closeModal: function() {
      this.hide4 = true
      this.hide3 = true
      this.hide6 = true
      this.checkList = []
    },
    getUnitList: function() {
      var that = this;
      DX.ajax_method({
        'type': 'GET',
        // 'param': {
        // 	'projectId': that.projectId
        // },
        'url': '/timenetwork/plan/fetchUnitProjectList',
        'callBack': function(res) {
          if (res.code == 200) {
            that.UnitList = res.data
            $.each(that.UnitList, function(i, v) {
              v.flag = false
            })
            that.$forceUpdate()
          }
        },
      });
    },
    daoru: function() {
      var $this = this;
      $('#importFileId').click();
      $('#importFileId').unbind("change");
      $('#importFileId').change(function(e) {
        // if ($("#importFileId")[0].files[0]) {
        var that = this;
        var config = ['xlsx', 'xls'];
        if ($(that)[0].files[0].name) {
          var type = $(that)[0].files[0].name.split('.');
          var size = $(that)[0].files[0].size;
          var str = config.indexOf(type[type.length - 1]);
          if (str == -1) {
            DX.optionTitle('请上传xls/xlsx格式文件')
            return;
          }
        }
        $this.uplaodFile({
          url: '/algp/xact/importFile',
          id: 'importFileId',
          callBack: function(res) {
            if (res.code == 200) {
              $('#importFileId').val('');
              if (res.data != '') {
                $this.taskDetail(res.data.id)
                $this.Interval = setInterval(function() {
                  $this.taskDetail(res.data.id)
                }, 1000)
              }
            } else {
              DX.optionTitle(res.msg)
            }
          }
        });
        // }
      });
    },
    uplaodFile: function(obj) {
      var key = obj.url.split('/');
      var url = DX.domain(key[1]) + obj.url;
      var file = document.getElementById(obj.id).files[0];
      var model = window.parent.showModel;
      $(model).css('display', 'block');
      var formData = new FormData();
      formData.append('file', file);
      // formData.append('projectId', this.projectId);
      var token = DX.getToken();
      formData.append('Token', token);
      var req = new XMLHttpRequest();
      req.open("post", url, true);
      req.onload = function() {
        $(model).css('display', 'none');
        var red = JSON.parse(req.responseText);
        if (red.code != '200') {
          var message = red.msg == "" ? '上传失败' : red.msg;
          DX.optionTitle(message)
        }
        obj.callBack(red);
      }
      req.send(formData);
    },
    righthandleClose: function(done) {
      this.drawer = false
    },
    realshuaxin: function() {
      var that = this
      if (that.projectCheckedList.length == 0) {
        DX.optionTitle('请选择单位工程')
        return
      }
      if (this.TKflag == 1) {
        if (this.chushihuaFlag) { //初始化
          if (that.chushiDate == '') {
            DX.optionTitle('请选择初始日期')
            return
          }
          DX.ajax_method({
            'type': 'POST',
            'change': event.target,
            'param': {
              subProjectId: that.projectCheckedList[0],
              planStartTime: that.chushiDate + ' 00:00:00'
            },
            'url': '/algp/plan/reinitialize',
            'callBack': function(res) {
              if (res.code == 200) {
                that.hide6 = true
                if (res.data != '') {
                  that.taskDetail(res.data.id)
                  that.Interval = setInterval(function() {
                    that.taskDetail(res.data.id)
                  }, 1000)
                }
              }
            },
          });
        } else { //刷新
          DX.ajax_method({
            'type': 'POST',
            'change': event.target,
            'param': {
              subProjectId: that.projectCheckedList[0]
            },
            'url': '/algp/predict/refresh',
            'callBack': function(res) {
              if (res.code == 200) {
                that.hide6 = true
                if (res.data != '') {
                  that.taskDetail(res.data.id)
                  that.Interval = setInterval(function() {
                    that.taskDetail(res.data.id)
                  }, 1000)
                }
              }
            },
          });
        }
      } else {
        DX.DownLoadFile({
          'url': '/algp/xact/export/?subProjectIds=' + that.projectCheckedList[0] +
            '&type=' + that.TKtype
        });
        that.hide6 = true
      }
    },
    taskDetail: function(id) {
      var that = this
      DX.ajax_method({
        'param': {
          id: id
        },
        'url': '/algp/task/detail',
        'callBack': function(res) {
          if (res.code == 200) {
            $('.backPross').css('display', 'flex')
            that.percentage = res.data.percent
            if (res.data.status == 100) {
              clearInterval(that.Interval)
              DX.ajax_method({
                'url': '/prod/xact/listWarns',
                'callBack': function(res) {
                  if (res.code == 200) {
                    $('.backPross').css('display', 'none')
                    var str = ''
                    if (res.data != '') {
                      $.each(res.data, function(i, v) {
                        str += '<p>' + v
                          .pathname + v
                          .name +
                          '部位预警等级为' + v
                          .warnLevel +
                          '级；</p>'
                      })
                      str += '<p>请关注协调生产安排，以免延期</p>'
                      that.$message({
                        dangerouslyUseHTMLString: true,
                        message: str,
                        type: 'success',
                        duration: 3000
                      });
                    }
                    setTimeout(function() {
                      location.reload()
                    }, 3000)
                  }
                },
              });
            } else if (res.data.status == 99) {
              $('.backPross').css('display', 'none')
              clearInterval(that.Interval)
              DX.optionTitle('刷新失败')
            }
          }
        },
      });
    },
    shuaxin: function(event) {
      this.getAllProject()
      this.hide6 = false
      this.TKflag = 1 //刷新
      return
      var that = this
      DX.ajax_method({
        'type': 'POST',
        'change': event.target,
        'param': {
          subProjectId: 'b152011125274403a38d51a750a42aa9'
        },
        'url': '/algp/predict/refresh',
        'callBack': function(res) {
          if (res.code == 200) {
            var bigRes = res.data
            // DX.ajax_method({
            // 	'url': "/prod/dispose/warning/get/user/unfinish/num",
            // 	'callBack': function(res) {
            // 		if (res.code == 200) {
            // 			var str = ''
            // 			if (bigRes != '') {
            // 				$.each(bigRes, function(i, v) {
            // 					if (v.level == 6) {
            // 						str += '<p>' + v
            // 							.pathname + v.name +
            // 							'部位预警等级为' + v
            // 							.warnLevel + '级；</p>'
            // 					}
            // 				})
            // 				str += '<p>请关注协调生产安排，以免延期</p>'
            // 				if (res.data != '') {
            // 					str += '<p style="color:red;">' + res
            // 						.data + '</p>'
            // 				}
            // 				that.$message({
            // 					dangerouslyUseHTMLString: true,
            // 					message: str,
            // 					type: 'success',
            // 					duration: 3000
            // 				});
            // 				$('body', window.top.document).find(
            // 					'#message').addClass("newTip")
            // 			} else {
            // 				that.$message({
            // 					message: '刷新成功',
            // 					type: 'success',
            // 				});
            // 			}
            // 			setTimeout(function() {
            // 				location.reload()
            // 			}, 3000)
            // 		} else {
            // 			DX.optionTitle(res.msg)
            // 		}
            // 	}
            // })

          }
        },
      });
    },
    openCell: function(row, column, cell, event) {
      if (column.label == '部位') {
        $(event.target).parents('.el-table_1_column_1').find(".el-table__expand-icon").click()
      }
    },
    getFullList: function() {
      var that = this;
      DX.ajax_method({
        'type': 'GET',
        'param': {
          'maxLevel': 6
        },
        'url': '/prod/xact/simpleList',
        'callBack': function(res) {
          if (res.code == 200) {
            that.fullList = res.data == "" ? [] : res.data;
          }
        },
      });
    },
    load: function(tree, treeNode, resolve) {
      if (tree.level == 6) {
        this.buildSixStatus = tree.buildStatus
        resolve([{
          level: 7,
          id: tree.id + '1',
          show: false
        }])
        this.clickTree(tree)
        return
      }
      var that = this;
      DX.ajax_method({
        'type': 'GET',
        'param': {
          'parentId': tree.id,
          'level': Number(tree.level) + 1
        },
        'url': '/prod/xact/list/byLevel/union',
        'callBack': function(res) {
          if (res.code == 200) {
            if (res.data != "") {
              resolve(that.setTree(res.data))
            } else {
              tree.hasChildren = false
            }
          }
        },
      });
    },
    setTree: function(nodes = []) {
      var that = this
      for (let item of nodes) {
        var sDate1 = new Date(item.expectStartTime).getTime();
        var sDate2 = new Date(item.expectEndTime).getTime();
        var dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        //工期
        // var daynum = Math.floor((dateSpan / (24 * 3600 * 1000))) //天
        // var hournum = ((dateSpan % 86400000) / (1000 * 3600)).toFixed(2) //小时
        // item.gongqi = Number.isNaN(Number(hournum)) ? '' : daynum + '天' + hournum + '小时';
        var daynum = Math.floor((dateSpan / (24 * 3600 * 1000))) //天
        item.gongqi = Number.isNaN(Number(daynum)) ? '' : daynum
        //预测天数
        var yuceDayNum = Math.floor(item.planPeriod / (24 * 3600))
        var yuceHourNum = ((item.planPeriod % 86400) / 3600).toFixed(2)
        item.yuceTime = Number.isNaN(Number(yuceHourNum)) ? '' : yuceDayNum + '天' + yuceHourNum +
          '小时';
        //实际天数
        var shijiDayNum = Math.floor(item.expectPeriod / (24 * 3600))
        var shijiHourNum = ((item.expectPeriod % 86400) / 3600).toFixed(2)
        item.shijiTime = Number.isNaN(Number(shijiHourNum)) ? '' : shijiDayNum + '天' +
          shijiHourNum + '小时';
        //延迟天数
        if (item.buildStatus == 3) { //实际完成时间减去计划完成时间
          if (item.endTime == '' || item.sjEndTime == '') {
            item.yanchiTime = "0天0.00时"
            item.fuyanchiTime = "0天0.00时"
          } else {
            var stime = new Date(item.endTime).getTime();
            var etime = new Date(item.sjEndTime).getTime();
            var usedTime = etime - stime; //两个时间戳相差的毫秒数
            if (usedTime < 0) { //提前，负数
              var days = -Math.floor(usedTime / (24 * 3600 * 1000));
              var leave1 = -(usedTime % (24 * 3600 * 1000)); //计算天数后剩余的毫秒数
              var hours = (leave1 / (3600 * 1000)).toFixed(2)
              var time = days + "天" + hours + "时"
              item.yanchiFlag = false //不延迟，提前
              item.fuyanchiTime = time
            } else {
              var days = Math.floor(usedTime / (24 * 3600 * 1000));
              var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
              var hours = (leave1 / (3600 * 1000)).toFixed(2)
              var time = days + "天" + hours + "时"
              item.yanchiFlag = true //
              item.yanchiTime = time
            }
          }
        } else { //预计完成减去计划完成
          if (item.endTime == '' || item.expectEndTime == '') {
            item.yanchiTime = "0天0.00时"
            item.fuyanchiTime = "0天0.00时"
          } else {
            var stime = new Date(item.endTime).getTime();
            var etime = new Date(item.expectEndTime).getTime();
            var usedTime = etime - stime; //两个时间戳相差的毫秒数
            if (usedTime < 0) { //提前，负数
              var days = -Math.floor(usedTime / (24 * 3600 * 1000));
              var leave1 = -(usedTime % (24 * 3600 * 1000)); //计算天数后剩余的毫秒数
              var hours = (leave1 / (3600 * 1000)).toFixed(2)
              var time = days + "天" + hours + "时"
              item.yanchiFlag = false //不延迟，提前
              item.fuyanchiTime = time
            } else {
              var days = Math.floor(usedTime / (24 * 3600 * 1000));
              var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
              var hours = (leave1 / (3600 * 1000)).toFixed(2)
              var time = days + "天" + hours + "时"
              item.yanchiFlag = true
              item.yanchiTime = time
            }
          }
        }
        // var yanchi = item.expectPeriod - item.planPeriod
        // if (item.expectPeriod - item.planPeriod >= 0) { //延迟
        // 	var yanchiDayNum = Math.floor(yanchi / (24 * 3600))
        // 	var yanchiHourNum = ((yanchi % 86400) / 3600).toFixed(2)
        // 	item.yanchiTime = Number.isNaN(Number(yanchiHourNum)) ? '' : yanchiDayNum + '天' +
        // 		yanchiHourNum + '小时';
        // } else { //提前
        // 	var yanchiDayNum = -Math.floor(yanchi / (24 * 3600))
        // 	var yanchiHourNum = -((yanchi % 86400) / 3600).toFixed(2)
        // 	item.fuyanchiTime = Number.isNaN(Number(yanchiHourNum)) ? '' : yanchiDayNum + '天' +
        // 		yanchiHourNum + '小时';
        // }
        item.hasChildren = true
        // if (item.childrenSize > 0) {     //如果后端返是否有子级的字段
        // 	item.hasChildren = true
        // } else {
        // 	item.hasChildren = false
        // }
      }
      return nodes
    },
    openFiveModal: function(val) {
      this.timeText = val.partName + '的时间'
      this.timeFiveNode = JSON.parse(JSON.stringify(val))
      this.dialogfiveVisible = true;
    },
    openUglyModal: function(type, time, val) {
      this.updateType = type;
      this.updateTime = time;
      this.timeText = '修改' + val.partName + '的计划时间'
      if (type == 1) {
        this.startOrEnd = 1
      } else {
        this.startOrEnd = 2
      }
      this.dialogVisible = true;
      this.timenode = JSON.parse(JSON.stringify(val))
    },
    handleClose: function(done) {
      this.dialogVisible = false;
      this.dialogfiveVisible = false;
    },
    goWarn: function(val) {
      DX.open('./setting/warn.html?id=' + val.id, {
        width: 700,
        height: 650,
        title: '预警处置'
      })
    },
    letWorkShow: function(e, val, index) {
      $('.xuanfu').hide()
      // 全局声明verClickNum = 1, clickTimer = null, lastClickTime = 0;
      var nowTime = new Date().getTime();
      if (nowTime - this.lastClickTime < 300) {
        /*双击*/
        this.verClickNum++;
        this.lastClickTime = 0;
        this.clickTimer && clearTimeout(this.clickTimer);
        $('#fFivebackGound').show()
        $('.fFive').css({
          top: e.pageY,
          left: e.clientX
        }).show();
        this.delWorkObj = val
        this.afterIdIndex = index + 1
      } else {
        /*单击*/
        this.lastClickTime = nowTime;
        this.clickTimer = setTimeout(function() {
          if (this.verClickNum > 1) {
            this.verClickNum = 1;
            return;
          } else {}
        }, 300);
        if (index == this.workShowIndex) {
          this.workShow = !this.workShow
        } else {
          this.workShow = true
        }
        this.workShowIndex = index
      }
    },
    getTreeLists: function() { //
      var that = this;
      DX.ajax_method({
        'type': 'GET',
        'param': {
          'parentId': 0,
          'level': 1
        },
        'url': '/prod/xact/list/byLevel/union',
        'callBack': function(res) {
          if (res.code == 200) {
            that.treelist = res.data == "" ? [] : res.data;
            if (res.data != "") {
              that.readNodes(that.treelist)
            }
          }
        },
      });
    },
    readNodes: function(nodes = []) {
      var that = this
      for (let item of nodes) {
        var sDate1 = new Date(item.expectStartTime).getTime();
        var sDate2 = new Date(item.expectEndTime).getTime();
        var dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        // item.gongqi = !Boolean(Number((dateSpan / (24 * 3600 * 1000)).toFixed(2))) ? '' : (dateSpan / (24 * 3600 *1000)).toFixed(2);
        //工期
        // var daynum = Math.floor((dateSpan / (24 * 3600 * 1000))) //天
        // var hournum = ((dateSpan % 86400000) / (1000 * 3600)).toFixed(2) //小时
        // item.gongqi = Number.isNaN(Number(hournum)) ? '' : daynum + '天' + hournum + '小时';
        var daynum = Math.floor((dateSpan / (24 * 3600 * 1000))) //天
        item.gongqi = Number.isNaN(Number(daynum)) ? '' : daynum
        //预测天数
        var yuceDayNum = Math.floor(item.planPeriod / (24 * 3600))
        var yuceHourNum = ((item.planPeriod % 86400) / 3600).toFixed(2)
        item.yuceTime = Number.isNaN(Number(yuceHourNum)) ? '' : yuceDayNum + '天' + yuceHourNum +
          '小时';
        //实际天数
        var shijiDayNum = Math.floor(item.expectPeriod / (24 * 3600))
        var shijiHourNum = ((item.expectPeriod % 86400) / 3600).toFixed(2)
        item.shijiTime = Number.isNaN(Number(shijiHourNum)) ? '' : shijiDayNum + '天' +
          shijiHourNum + '小时';
        //延迟天数
        // var yanchi = item.expectPeriod - item.planPeriod
        // if (item.expectPeriod - item.planPeriod >= 0) { //延迟
        // 	var yanchiDayNum = Math.floor(yanchi / (24 * 3600))
        // 	var yanchiHourNum = ((yanchi % 86400) / 3600).toFixed(2)
        // 	item.yanchiTime = Number.isNaN(Number(yanchiHourNum)) ? '' : yanchiDayNum + '天' +
        // 		yanchiHourNum + '小时';
        // } else { //提前
        // 	var yanchiDayNum = -Math.floor(yanchi / (24 * 3600))
        // 	var yanchiHourNum = -((yanchi % 86400) / 3600).toFixed(2)
        // 	item.fuyanchiTime = Number.isNaN(Number(yanchiHourNum)) ? '' : yanchiDayNum + '天' +
        // 		yanchiHourNum + '小时';
        // }
        if (item.buildStatus == 3) { //实际完成时间减去计划完成时间
          if (item.endTime == '' || item.sjEndTime == '') {
            item.yanchiTime = "0天0.00时"
            item.fuyanchiTime = "0天0.00时"
          } else {
            var stime = new Date(item.endTime).getTime();
            var etime = new Date(item.sjEndTime).getTime();
            var usedTime = etime - stime; //两个时间戳相差的毫秒数
            if (usedTime < 0) { //提前，负数
              var days = -Math.floor(usedTime / (24 * 3600 * 1000));
              var leave1 = -(usedTime % (24 * 3600 * 1000)); //计算天数后剩余的毫秒数
              var hours = (leave1 / (3600 * 1000)).toFixed(2)
              var time = days + "天" + hours + "时"
              item.yanchiFlag = false //不延迟，提前
              item.fuyanchiTime = time
            } else {
              var days = Math.floor(usedTime / (24 * 3600 * 1000));
              var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
              var hours = (leave1 / (3600 * 1000)).toFixed(2)
              var time = days + "天" + hours + "时"
              item.yanchiFlag = true //
              item.yanchiTime = time
            }
          }
        } else { //预计完成减去计划完成
          if (item.endTime == '' || item.expectEndTime == '') {
            item.yanchiTime = "0天0.00时"
            item.fuyanchiTime = "0天0.00时"
          } else {
            var stime = new Date(item.endTime).getTime();
            var etime = new Date(item.expectEndTime).getTime();
            var usedTime = etime - stime; //两个时间戳相差的毫秒数
            if (usedTime < 0) { //提前，负数
              var days = -Math.floor(usedTime / (24 * 3600 * 1000));
              var leave1 = -(usedTime % (24 * 3600 * 1000)); //计算天数后剩余的毫秒数
              var hours = (leave1 / (3600 * 1000)).toFixed(2)
              var time = days + "天" + hours + "时"
              item.yanchiFlag = false //不延迟，提前
              item.fuyanchiTime = time
            } else {
              var days = Math.floor(usedTime / (24 * 3600 * 1000));
              var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
              var hours = (leave1 / (3600 * 1000)).toFixed(2)
              var time = days + "天" + hours + "时"
              item.yanchiFlag = true
              item.yanchiTime = time
            }
          }
        }
        item.hasChildren = true
        // if (item.childrenSize > 0) {   //如果后端返是否有子级的字段
        // 	item.hasChildren = true
        // } else {
        // 	item.hasChildren = false
        // }
        // that.readNodes(item.children)   //异步了，无序递归
      }
    },
    spanMethod: function(row) {
      if (row.row.level == 7 && row.columnIndex == 0) {
        return {
          rowspan: 1,
          colspan: 8
        }
      }
    },
    rowClassName: function(row) {
      var str = ""
      if (row.row.delayDays > 0 && row.row.mainLine == 1) { //关键线路延迟
        str += 'redColor '
      } else if (row.row.delayDays > 0 && row.row.mainLine == 0) { //非关键线路延迟
        str += 'yellowColor '
      } else if (row.row.delayNow <= 0 && row.row.buildStatus == 3) { //当天完成
        str += 'greenColor'
      }
      if (row.row.mainLine == 1) {
        str += 'mainLine '
      }
      if (row.row.level == 7) {
        str += "trClass "
      }
      return str
    },
    clickTree: function(row) {
      var $this = this
      this.sixPart = row
      vm.nowPartId = row.partid
      if (row.code.substring(0, 8) == 10020004 || row.code.substring(0, 8) == 10030004) { //隧道
        $this.suidaoShow = true
        $this.show = false
        $this.getSuiList()
        return
      }
      $this.suidaoShow = false
      vm.partTitle = row.partName
      var lengthS = $('thead').width() - 50 - 250
      var startTimeS //第一个开始时间
      var endTimeS //最后一个结束时间
      var msS //第一个开始时间到最后一个结束时间时间差
      DX.ajax_method({
        'param': {
          'parentId': row.partid,
          'level': 7
        },
        'url': '/prod/xact/list/byLevel/union',
        'callBack': function(res) {
          if (res.code == 200) {
            if (res.data != "") {
              vm.show = false
              vm.partTitle = row.partName
              vm.nowPartId = row.partid
              vm.list = []
              $this.firstLbuildStatus = res.data[0].buildStatus
              // var num = (lengthS / res.data.length).toFixed(0) //没时间的时候，整体800，除以一格多少像素。
              var num = (lengthS / res.data.length) //没时间的时候，整体800，除以一格多少像素。
              var haveTime = 100
              var noTime = 100
              var haveTimeFlag = true //有时间
              if (res.data[0].expectStartTime == '') {
                haveTimeFlag = false //无时间
              } else { //有时间
                startTimeS = new Date(res.data[0].expectStartTime.replace(
                  /-/g,
                  '/'));
                endTimeS = new Date(res.data[res.data.length - 1]
                  .expectEndTime
                  .replace(/-/g, '/'));
                msS = Math.abs(endTimeS.getTime() - startTimeS.getTime());
              }
              var allLength = 0
              $.each(res.data, function(i, val) {
                noTime = (i + 1) * num;
                s1 = new Date(val.expectStartTime.replace(/-/g, '/'));
                s2 = new Date(val.expectEndTime.replace(/-/g, '/'));
                var ms = Math.abs(s1.getTime() - s2.getTime());
                // haveTime = (ms / (msS / lengthS)).toFixed(0) //(msS/lengthS)==	1px代表多少时间
                haveTime = (ms / (msS /
                  lengthS)) //(msS/lengthS)==	1px代表多少时间
                // haveTime = (ms / 1000 / 60 / 60 * 2 * 50).toFixed(0); //相距几个0.5小时，再乘以50就是距离
                allLength += Number(haveTime)
                var status = 0
                if (val.buildStatus != 3 && val.buildStatus != 0 &&
                  val.delayNow <= 0) { //当天进行中
                  status = 1
                } else if (val.buildStatus != 3 && val.buildStatus !=
                  0 && val.delayNow > 0) { //当天进行中且延迟
                  status = 2
                } else if (val.buildStatus != 3 && val.buildStatus !=
                  0 && val.delayDays > 0) { //非当天预计延迟
                  status = 3
                } else if (val.buildStatus == 3 && val.delayNow <=
                  0) { //当天完成
                  status = 4
                }
                // var lineRectColor = 0
                // if (val.delayDays > 0 && val.mainLine == 1) { //关键线路延迟
                // 	lineRectColor = 1
                // } else if (val.delayDays > 0 && val.mainLine == 0) { //非关键线路延迟
                // 	lineRectColor = 2
                // } else if (val.delayNow <= 0 && val.buildStatus == 3) { //当天完成
                // 	lineRectColor = 3
                // }
                var lineRectColor = 0
                if (val.buildStatus == 3) { //已完成
                  lineRectColor = 0
                } else if (val.buildStatus == 0) {
                  lineRectColor = 0
                } else { //进行中
                  if ((val.expectPeriod - val.planPeriod) > 0 && val
                    .mainLine == 1) { //关键线路延迟
                    lineRectColor = 1
                  } else if ((val.expectPeriod - val.planPeriod) >
                    0 && val.mainLine == 0) { //非关键线路延迟
                    lineRectColor = 2
                  } else if ((val.expectPeriod - val.planPeriod) <
                    0) { //进度提前
                    lineRectColor = 3
                  }
                }
                //预测天数
                var yuceDayNum = Math.floor(val.planPeriod / (24 *
                  3600))
                var yuceHourNum = ((val.planPeriod % 86400) / 3600)
                  .toFixed(2)
                val.yuceTime = Number.isNaN(Number(yuceHourNum)) ?
                  '' : yuceDayNum + '天' + yuceHourNum + '小时';
                //实际天数
                var shijiDayNum = Math.floor(val.expectPeriod / (24 *
                  3600))
                var shijiHourNum = ((val.expectPeriod % 86400) / 3600)
                  .toFixed(2)
                val.shijiTime = Number.isNaN(Number(shijiHourNum)) ?
                  '' : shijiDayNum + '天' + shijiHourNum + '小时';
                //延迟天数
                if (val.buildStatus == 3) { //实际完成时间减去计划完成时间
                  if (val.endTime == '' || val.sjEndTime == '') {
                    val.yanchiTime = "0天0.00时"
                    val.fuyanchiTime = "0天0.00时"
                  } else {
                    var stime = new Date(val.endTime).getTime();
                    var etime = new Date(val.sjEndTime).getTime();
                    var usedTime = etime - stime; //两个时间戳相差的毫秒数
                    if (usedTime < 0) { //提前，负数
                      var days = -Math.floor(usedTime / (24 *
                        3600 * 1000));
                      var leave1 = -(usedTime % (24 * 3600 *
                        1000)); //计算天数后剩余的毫秒数
                      var hours = (leave1 / (3600 * 1000))
                        .toFixed(2)
                      var time = days + "天" + hours + "时"
                      val.yanchiFlag = false //不延迟，提前
                      val.fuyanchiTime = time
                    } else {
                      var days = Math.floor(usedTime / (24 *
                        3600 * 1000));
                      var leave1 = usedTime % (24 * 3600 *
                        1000); //计算天数后剩余的毫秒数
                      var hours = (leave1 / (3600 * 1000))
                        .toFixed(2)
                      var time = days + "天" + hours + "时"
                      val.yanchiFlag = true //
                      val.yanchiTime = time
                    }
                  }
                } else { //预计完成减去计划完成
                  if (val.endTime == '' || val.expectEndTime ==
                    '') {
                    val.yanchiTime = "0天0.00时"
                    val.fuyanchiTime = "0天0.00时"
                  } else {
                    var stime = new Date(val.endTime).getTime();
                    var etime = new Date(val.expectEndTime)
                      .getTime();
                    var usedTime = etime - stime; //两个时间戳相差的毫秒数
                    if (usedTime < 0) { //提前，负数
                      var days = -Math.floor(usedTime / (24 *
                        3600 * 1000));
                      var leave1 = -(usedTime % (24 * 3600 *
                        1000)); //计算天数后剩余的毫秒数
                      var hours = (leave1 / (3600 * 1000))
                        .toFixed(2)
                      var time = days + "天" + hours + "时"
                      val.yanchiFlag = false //不延迟，提前
                      val.fuyanchiTime = time
                    } else {
                      var days = Math.floor(usedTime / (24 *
                        3600 * 1000));
                      var leave1 = usedTime % (24 * 3600 *
                        1000); //计算天数后剩余的毫秒数
                      var hours = (leave1 / (3600 * 1000))
                        .toFixed(2)
                      var time = days + "天" + hours + "时"
                      val.yanchiFlag = true
                      val.yanchiTime = time
                    }
                  }
                }
                // var yanchi = val.expectPeriod - val.planPeriod
                // if (val.expectPeriod - val.planPeriod >= 0) { //延迟
                // 	var yanchiDayNum = Math.floor(yanchi / (24 *
                // 		3600))
                // 	var yanchiHourNum = ((yanchi % 86400) / 3600)
                // 		.toFixed(2)
                // 	val.yanchiTime = Number.isNaN(Number(
                // 			yanchiHourNum)) ? '' : yanchiDayNum +
                // 		'天' + yanchiHourNum + '小时';
                // } else { //提前
                // 	var yanchiDayNum = -Math.floor(yanchi / (24 *
                // 		3600))
                // 	var yanchiHourNum = -((yanchi % 86400) / 3600)
                // 		.toFixed(2)
                // 	val.fuyanchiTime = Number.isNaN(Number(
                // 			yanchiHourNum)) ? '' : yanchiDayNum +
                // 		'天' + yanchiHourNum + '小时';
                // }
                vm.list.push({
                  name: val.partName,
                  // xian: haveTimeFlag ? allLength : noTime,
                  xian: noTime, //2021.3.28都设置为无时间，时间之间无间隔	
                  xianH: haveTimeFlag ? allLength :
                  noTime, //用来显示时间差xianH
                  startTime: val.startTime,
                  endTime: val.endTime,
                  id: val.id,
                  parentId: val.parentId,
                  pxTimes: msS / lengthS / 1000 / 60 /
                    60, //1px代表多少小时
                  status: status,
                  sjEndTime: val.sjEndTime,
                  sjStartTime: val.sjStartTime,
                  expectEndTime: val.expectEndTime,
                  expectStartTime: val.expectStartTime,
                  buildStatus: val.buildStatus,
                  lineRectColor: lineRectColor,
                  planPeriod: val.planPeriod,
                  expectPeriod: val.expectPeriod,
                  yuceTime: val.yuceTime,
                  shijiTime: val.shijiTime,
                  yanchiTime: val.yanchiTime,
                  fuyanchiTime: val.fuyanchiTime,
                  yanchiFlag: val.yanchiFlag,
                  // colorStatus: Math.floor(Math.random() * (4 - 1) + 1)
                })
              })
              vm.show = true
            }
          }
        }
      });
      $this.accordion($this.fullList, row)
    },
    clickTreeAccordion: function(row, expanded) {
      if (row.level != 6) {
        return
      }
      if (expanded) {
        this.accordion(this.fullList, row)
        this.clickTree(row)
      }
    },
    accordion: function(nodes = [], row) { //第六级手风琴
      var that = this
      let $table = this.$refs.table;
      $.each(nodes, function(i, item) {
        if (item.level == 6) {
          if (row.id !== item.id) {
            $table.toggleRowExpansion(item, false);
          }
        }
        that.accordion(item.children, row)
      })
    },
    down: function(e, v, i) {
      if (e.which == 3) { //右键操作
        $('#fFivebackGound').show()
        $('.fFive').css({
          top: e.pageY,
          left: e.clientX
        }).show();
        this.delWorkObj = v
        this.afterIdIndex = i + 1
      } else {
        if (v.buildStatus == 3) {
          DX.optionTitle('已完成,不能修改')
          return
        }
        this.val = v
        this.index = i
        if (i == (this.list.length - 1)) { //最后一个圆圈，不能拖
          return
        }
        // else if(this.list[i].status==2 || this.list[i+1].status==2){   	//若某工序状态为已完成，则不能拖动左右圆圈。 也就是一个工序下一个或上一个工序状态是已完成的话就不能拖动。
        // 	DX.optionTitle('该节点不可拖拽')
        // 	return
        // }else if(this.list[i+1].status==1){  //若某工序任务为进行中，则不可拖其左侧圆圈。即若当前工序的下一个为进行中，则当前节点不可拖动。
        // 	DX.optionTitle('该节点不可拖拽')
        // 	return
        // }
        this.flag = true
      }
    },
    move: function(e) {
      if (this.flag == true) { //↓↓↓↓先判断是不是左起第二个圆圈，也就是index==0的圆圈
        if (e.clientX - 248 <= (this.index == 0 ? (0.5 / this.val.pxTimes) : (this.list[this
            .index - 1].xian + (0.5 /
            this.val.pxTimes)))) { //圆圈拖动不能超过前一个圆圈,且最小距离0.5小时。
          this.val.xian = (this.index == 0 ? (0.5 / this.val.pxTimes) : this.list[this.index -
            1].xian + (0.5 / this.val
            .pxTimes))
        } else if (e.clientX - 248 >= (this.list[this.index + 1].xian - (0.5 / this.val
            .pxTimes))) { //圆圈拖动不能超过后一个圆圈，且最小距离0.5小时。
          this.val.xian = this.list[this.index + 1].xian - (0.5 / this.val.pxTimes)
        } else {
          // this.val.xian = e.clientX + $('thead').scrollLeft() - 248 //当前鼠标位置加上滚动条距离
          // this.val.xian = Math.floor((e.clientX - 248 - this.list[this.index-1].xian)/50)*50 + this.list[this.index-1].xian   //步进0.5小时
          this.val.xian = e.clientX - 248 //当前鼠标位置加上滚动条距离
        }
      }
    },
    up: function(e) {
      var $this = this
      if (this.flag == false) {
        return
      }
      if (this.flag && $this.list[0].expectStartTime == '') {
        $this.$message('暂无计划时间，修改无效');
        this.flag = false
        return
      }
      this.flag = false
      var timeWidth = (this.val.xian - (this.index == 0 ? 0 : $this.list[this.index - 1]
        .xian)) //当前长度
      var newTime = (new Date(this.val.expectStartTime)).getTime();
      newTime += 3600 * 1000 * 24 * (timeWidth * this.val.pxTimes / 24) //新时间等于开始时间加上历时长度
      newTime = this.format(newTime) //新结束时间
      DX.ajax_method({
        'type': 'POST',
        'url': '/prod/xact/xjob/modify/time/plan/by/point',
        'param': {
          'time': newTime,
          'leftId': $this.list[$this.index].id,
          'rightId': $this.list.length - 1 == $this.index ? '' : $this.list[$this
            .index + 1].id,
        },
        'callBack': function(res) {
          if (res.code == 200) {
            $this.$message({
              message: '修改成功',
              type: 'success'
            });
            $this.getGongxu()
          } else {
            $this.$message.error(res.msg);
          }
        }
      })
    },
    touchStart: function(e, v, i) {
      this.val = v
      this.index = i
      if (i == (this.list.length - 1)) { //最后一个圆圈，不能拖
        return
      }
      // else if(this.list[i].status==2 || this.list[i+1].status==2){   	//若某工序状态为已完成，则不能拖动左右圆圈。 也就是一个工序下一个或上一个工序状态是已完成的话就不能拖动。
      // 	DX.optionTitle('该节点不可拖拽')
      // 	return
      // }else if(this.list[i+1].status==1){  //若某工序任务为进行中，则不可拖其左侧圆圈。即若当前工序的下一个为进行中，则当前节点不可拖动。
      // 	DX.optionTitle('该节点不可拖拽')
      // 	return
      // }
      this.flag = true
    },
    touchMove: function(e) {
      if (this.flag == true) { //↓↓↓↓先判断是不是左起第二个圆圈，也就是index==0的圆圈
        if (e.changedTouches[0].clientX - 248 <= (this.index == 0 ? (0.5 / this.val.pxTimes) : (
            this.list[this.index -
              1].xian + (0.5 /
              this.val.pxTimes)))) { //圆圈拖动不能超过前一个圆圈,且最小距离0.5小时。
          this.val.xian = (this.index == 0 ? (0.5 / this.val.pxTimes) : this.list[this.index -
            1].xian + (0.5 / this.val
            .pxTimes))
        } else if (e.changedTouches[0].clientX - 248 >= (this.list[this.index + 1].xian - (0.5 /
            this.val.pxTimes))) { //圆圈拖动不能超过后一个圆圈，且最小距离0.5小时。
          this.val.xian = this.list[this.index + 1].xian - (0.5 / this.val.pxTimes)
        } else {
          // this.val.xian = e.changedTouches[0].clientX + $('thead').scrollLeft() - 248 //当前鼠标位置加上滚动条距离
          // this.val.xian = Math.floor((e.changedTouches[0].clientX - 248 - this.list[this.index-1].xian)/50)*50 + this.list[this.index-1].xian   //步进0.5小时
          this.val.xian = e.changedTouches[0].clientX - 248 //当前鼠标位置加上滚动条距离
        }
      }
    },
    touchEnd: function(e) {
      var $this = this
      if (this.flag == false) {
        return
      }
      if (this.flag && $this.list[0].expectStartTime == '') {
        $this.$message('暂无计划时间，修改无效');
        this.flag = false
        return
      }
      this.flag = false
      var timeWidth = (this.val.xian - (this.index == 0 ? 0 : $this.list[this.index - 1]
        .xian)) //当前长度
      var newTime = (new Date(this.val.expectStartTime)).getTime();
      newTime += 3600 * 1000 * 24 * (timeWidth * this.val.pxTimes / 24) //新时间等于开始时间加上历时长度
      newTime = this.format(newTime) //新结束时间
      DX.ajax_method({
        'type': 'POST',
        'url': '/prod/xact/xjob/modify/time/plan/by/point',
        'param': {
          'time': newTime,
          'leftId': $this.list[$this.index].id,
          'rightId': $this.list.length - 1 == $this.index ? '' : $this.list[$this
            .index + 1].id,
        },
        'callBack': function(res) {
          if (res.code == 200) {
            $this.$message({
              message: '修改成功',
              type: 'success'
            });
            $this.getGongxu()
          } else {
            $this.$message.error(res.msg);
          }
        }
      })
    },
    add0: function(m) {
      return m < 10 ? '0' + m : m
    },
    format: function(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换  
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(
        mm) + ':' + this.add0(
        s);
    },
    mousetishiEnter: function(e, v, i) { //矩形rect的鼠标移入
      $('.xuantishifu').css({
        left: e.clientX + 20,
        top: e.pageY
      }).show();
    },
    mousetishiLeave: function() { //矩形rect的鼠标移出
      $('.xuantishifu').hide()
    },
    mouseFirstEnter: function(e) { //矩形rect的鼠标移入
      $('.xuanFirstfu').css({
        left: e.clientX + 20,
        top: e.pageY
      }).show();
    },
    mouseFirstLeave: function() { //矩形rect的鼠标移出
      $('.xuanFirstfu').hide()
    },
    mouseEnter: function(e, v, i) { //矩形rect的鼠标移入
      $('.xuanfu').css({
        left: e.clientX + 20,
        top: e.pageY
      }).show();
      this.enterVal = v
      this.xuanfu.expectStartTime = v.expectStartTime
      this.xuanfu.expectEndTime = v.expectEndTime
    },
    mouseLeave: function() { //矩形rect的鼠标移出
      $('.xuanfu').hide()
    },
    rectDown: function(e, v, i) { //点击矩形
      // if (e.which == 3) { //右键操作
      $('#fFivebackGound').show()
      $('.fFive').css({
        top: e.pageY,
        left: e.clientX
      }).show();
      this.delWorkObj = v
      this.afterIdIndex = i + 1
      // }
    },
    openWin: function(id, parentId, i, partName, num, e) { //打开配置弹窗
      if (num == 1) {
        $(e.target).css('color', '#009688')
        this.nowPartName = $(e.target)
      }
      this.drawer = true //打开右边抽屉
      if (num == 2) {
        if (this.jinchiNum == 3) {
          this.setSrc = 'setting/newSetting.html?id=' + id + '&index=' + i + '&parentId=' +
            parentId + '&num=' + 3 + '&buildSixStatus=' + this.buildSixStatus
        } else {
          this.setSrc = 'setting/newSetting.html?id=' + id + '&index=' + i + '&parentId=' +
            parentId + '&num=' + num + '&jinchiTime=' + encodeURI(this.jinchiTimeVal.time) +
            '&buildSixStatus=' + this.buildSixStatus + '&jinchiStartTime=' + encodeURI(this
              .jinchiStartTime) + '&jinchiEndTime=' + encodeURI(this.jinchiEndTime)
        }
      } else {
        this.setSrc = 'setting/newSetting.html?id=' + id + '&index=' + i + '&parentId=' +
          parentId + '&num=' + num + '&buildSixStatus=' + this.buildSixStatus
      }
      if (document.getElementById('newSettingId')) {
        document.getElementById('newSettingId').contentWindow.location.reload(true);
      }
      return
      if (i == 0 || i == (this.list.length - 1)) {
        return
      }
      DX.tagIframe("production/planAhead/setting/setting.html?id=" + id + '&parentId=' + parentId +
        '&index=' + i,
        partName,
        true)
    },
    delWork: function() {
      var $this = this
      DX.ajax_method({
        'url': '/prod/xact/delete/by/id',
        'type': 'POST',
        'param': {
          id: this.delWorkObj.id,
          afterId: $this.list[$this.afterIdIndex].id
        },
        'callBack': function(res) {
          if (res.code == 200) {
            $this.getGongxu()
            $this.$message({
              message: '操作成功',
              type: 'success'
            });
            fFivehideBack()
          } else {
            $this.$message.error(res.msg);
          }
        }
      })
    },
    getGongxu: function() {
      var $this = this
      var lengthS = $('thead').width() - 50 - 250
      var startTimeS //第一个开始时间
      var endTimeS //最后一个结束时间
      var msS //第一个开始时间到最后一个结束时间时间差
      DX.ajax_method({
        'param': {
          'parentId': $this.nowPartId,
          'level': 7
        },
        'url': '/prod/xact/list/byLevel/union',
        'callBack': function(res) {
          if (res.code == 200) {
            if (res.data != "") {
              $this.firstLbuildStatus = res.data[0].buildStatus
              vm.list = []
              // var num = (lengthS / res.data.length).toFixed(0) //没时间的时候，整体800，除以一格多少像素。
              var num = (lengthS / res.data.length) //没时间的时候，整体800，除以一格多少像素。
              var haveTime = 100
              var noTime = 100
              var haveTimeFlag = true //有时间
              if (res.data[0].expectStartTime == '') {
                haveTimeFlag = false //无时间
              } else { //有时间
                startTimeS = new Date(res.data[0].expectStartTime.replace(
                  /-/g,
                  '/'));
                endTimeS = new Date(res.data[res.data.length - 1]
                  .expectEndTime
                  .replace(/-/g, '/'));
                msS = Math.abs(endTimeS.getTime() - startTimeS.getTime());
              }
              var allLength = 0
              $.each(res.data, function(i, val) {
                noTime = (i + 1) * num;
                s1 = new Date(val.expectStartTime.replace(/-/g, '/'));
                s2 = new Date(val.expectEndTime.replace(/-/g, '/'));
                var ms = Math.abs(s1.getTime() - s2.getTime());
                // haveTime = (ms / (msS / lengthS)).toFixed(0) //(msS/lengthS)==	1px代表多少时间
                haveTime = (ms / (msS /
                  lengthS)) //(msS/lengthS)==	1px代表多少时间
                // haveTime = (ms / 1000 / 60 / 60 * 2 * 50).toFixed(0); //相距几个0.5小时，再乘以50就是距离
                allLength += Number(haveTime)
                var status = 0
                if (val.buildStatus != 3 && val.buildStatus != 0 &&
                  val.delayNow <= 0) { //当天进行中
                  status = 1
                } else if (val.buildStatus != 3 && val.buildStatus !=
                  0 && val.delayNow > 0) { //当天进行中且延迟
                  status = 2
                } else if (val.buildStatus != 3 && val.buildStatus !=
                  0 && val.delayDays > 0) { //非当天预计延迟
                  status = 3
                } else if (val.buildStatus == 3 && val.delayNow <=
                  0) { //当天完成
                  status = 4
                }
                var lineRectColor = 0
                if (val.buildStatus == 3) { //已完成
                  lineRectColor = 0
                } else if (val.buildStatus == 0) {
                  lineRectColor = 0
                } else { //进行中
                  if ((val.expectPeriod - val.planPeriod) > 0 && val
                    .mainLine == 1) { //关键线路延迟
                    lineRectColor = 1
                  } else if ((val.expectPeriod - val.planPeriod) >
                    0 && val.mainLine == 0) { //非关键线路延迟
                    lineRectColor = 2
                  } else if ((val.expectPeriod - val.planPeriod) <
                    0) { //进度提前
                    lineRectColor = 3
                  }
                }
                //预测天数
                var yuceDayNum = Math.floor(val.planPeriod / (24 *
                  3600))
                var yuceHourNum = ((val.planPeriod % 86400) / 3600)
                  .toFixed(2)
                val.yuceTime = Number.isNaN(Number(yuceHourNum)) ?
                  '' : yuceDayNum + '天' + yuceHourNum + '小时';
                //实际天数
                var shijiDayNum = Math.floor(val.expectPeriod / (24 *
                  3600))
                var shijiHourNum = ((val.expectPeriod % 86400) / 3600)
                  .toFixed(2)
                val.shijiTime = Number.isNaN(Number(shijiHourNum)) ?
                  '' : shijiDayNum + '天' + shijiHourNum + '小时';
                //延迟天数
                // var yanchi = val.expectPeriod - val.planPeriod
                // if (val.expectPeriod - val.planPeriod >= 0) { //延迟
                // 	var yanchiDayNum = Math.floor(yanchi / (24 *
                // 		3600))
                // 	var yanchiHourNum = ((yanchi % 86400) / 3600)
                // 		.toFixed(2)
                // 	val.yanchiTime = Number.isNaN(Number(
                // 			yanchiHourNum)) ? '' : yanchiDayNum +
                // 		'天' + yanchiHourNum + '小时';
                // } else { //提前
                // 	var yanchiDayNum = -Math.floor(yanchi / (24 *
                // 		3600))
                // 	var yanchiHourNum = -((yanchi % 86400) / 3600)
                // 		.toFixed(2)
                // 	val.fuyanchiTime = Number.isNaN(Number(
                // 			yanchiHourNum)) ? '' : yanchiDayNum +
                // 		'天' + yanchiHourNum + '小时';
                // }
                if (val.buildStatus == 3) { //实际完成时间减去计划完成时间
                  if (val.endTime == '' || val.sjEndTime == '') {
                    val.yanchiTime = "0天0.00时"
                    val.fuyanchiTime = "0天0.00时"
                  } else {
                    var stime = new Date(val.endTime).getTime();
                    var etime = new Date(val.sjEndTime).getTime();
                    var usedTime = etime - stime; //两个时间戳相差的毫秒数
                    if (usedTime < 0) { //提前，负数
                      var days = -Math.floor(usedTime / (24 *
                        3600 * 1000));
                      var leave1 = -(usedTime % (24 * 3600 *
                        1000)); //计算天数后剩余的毫秒数
                      var hours = (leave1 / (3600 * 1000))
                        .toFixed(2)
                      var time = days + "天" + hours + "时"
                      val.yanchiFlag = false //不延迟，提前
                      val.fuyanchiTime = time
                    } else {
                      var days = Math.floor(usedTime / (24 *
                        3600 * 1000));
                      var leave1 = usedTime % (24 * 3600 *
                        1000); //计算天数后剩余的毫秒数
                      var hours = (leave1 / (3600 * 1000))
                        .toFixed(2)
                      var time = days + "天" + hours + "时"
                      val.yanchiFlag = true //
                      val.yanchiTime = time
                    }
                  }
                } else { //预计完成减去计划完成
                  if (val.endTime == '' || val.expectEndTime ==
                    '') {
                    val.yanchiTime = "0天0.00时"
                    val.fuyanchiTime = "0天0.00时"
                  } else {
                    var stime = new Date(val.endTime).getTime();
                    var etime = new Date(val.expectEndTime)
                      .getTime();
                    var usedTime = etime - stime; //两个时间戳相差的毫秒数
                    if (usedTime < 0) { //提前，负数
                      var days = -Math.floor(usedTime / (24 *
                        3600 * 1000));
                      var leave1 = -(usedTime % (24 * 3600 *
                        1000)); //计算天数后剩余的毫秒数
                      var hours = (leave1 / (3600 * 1000))
                        .toFixed(2)
                      var time = days + "天" + hours + "时"
                      val.yanchiFlag = false //不延迟，提前
                      val.fuyanchiTime = time
                    } else {
                      var days = Math.floor(usedTime / (24 *
                        3600 * 1000));
                      var leave1 = usedTime % (24 * 3600 *
                        1000); //计算天数后剩余的毫秒数
                      var hours = (leave1 / (3600 * 1000))
                        .toFixed(2)
                      var time = days + "天" + hours + "时"
                      val.yanchiFlag = true
                      val.yanchiTime = time
                    }
                  }
                }
                vm.list.push({
                  name: val.partName,
                  xianH: haveTimeFlag ? allLength :
                  noTime, //用来显示时间差xianH
                  xian: noTime,
                  startTime: val.startTime,
                  endTime: val.endTime,
                  id: val.id,
                  parentId: val.parentId,
                  pxTimes: msS / lengthS / 1000 / 60 /
                    60, //1px代表多少小时
                  status: status,
                  sjEndTime: val.sjEndTime,
                  sjStartTime: val.sjStartTime,
                  expectEndTime: val.expectEndTime,
                  expectStartTime: val.expectStartTime,
                  buildStatus: val.buildStatus,
                  planPeriod: val.planPeriod,
                  expectPeriod: val.expectPeriod,
                  yuceTime: val.yuceTime,
                  shijiTime: val.shijiTime,
                  yanchiTime: val.yanchiTime,
                  fuyanchiTime: val.fuyanchiTime,
                  lineRectColor: lineRectColor,
                  yanchiFlag: val.yanchiFlag,
                  // colorStatus: Math.floor(Math.random() * (4 - 1) + 1)
                })
              })
            }
          }
        }
      });
    },
    addWork: function(
      num) { //$this.afterIdIndex是当前点击的矩形的index+1,num==1，前方增加，前方增加的话就传当前点击的id,后方增加传当前点击的下一个的id
      var $this = this
      var xjobId = num == 1 ? $this.list[$this.afterIdIndex].id : $this.list[$this.afterIdIndex + 1]
        .id
      this.$prompt('请填写工序名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({
        value
      }) => {
        DX.ajax_method({
          'url': '/prod/xjob/add',
          'type': 'POST',
          'data': {
            id: xjobId,
            parentId: $this.nowPartId,
            name: value,
            obsGroup: "",
            orderNumber: '', //num=1前方增加
            projNumDtos: [],
            split: 0,
            tbsGroup: '',
          },
          'callBack': function(res) {
            if (res.code == 200) {
              $this.getGongxu()
              $this.$message({
                message: '操作成功',
                type: 'success'
              });
              fFivehideBack()
            } else {
              $this.$message.error(res.msg);
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
  },
  watch: {
    drawer: function() {
      if (!this.drawer) {
        if (this.nowPartName) {
          this.nowPartName.css('color', '#636464')
        }
        if(this.nowCaijiPartName){
          this.nowCaijiPartName.css('background', '#66CCBB')
        }
      }
    }
  },
})

function fFivehideBack() {
  $('#fFivebackGound').hide()
  $('.fFive').hide()
  $('.fFiveClo').hide()
}
var pMSet = {
  check: {
    enable: true,
    chkStyle: "checkbox", // 添加生效
    chkboxType: {
      "Y": "s",
      "N": "s"
    },
    radioType: "level"
  },
  data: {
    simpleData: {
      enable: true,
      idKey: "nodeId",
      pIdKey: "parentId"
    },
    keep: {
      leaf: true,
      parent: false
    },
    key: {
      name: "nodeName",
      title: "nodeName"
    }
  },
  view: {
    showLine: true,
    selectedMulti: true
  },
  callback: {
    beforeCheck: true,
    // onCheck: leftPeopleCheck,
  },
};

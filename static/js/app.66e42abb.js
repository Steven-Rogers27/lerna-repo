(function(t){function e(e){for(var o,r,u=e[0],l=e[1],d=e[2],c=0,h=[];c<u.length;c++)r=u[c],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&h.push(i[r][0]),i[r]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);a&&a(e);while(h.length)h.shift()();return s.push.apply(s,d||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],o=!0,u=1;u<n.length;u++){var l=n[u];0!==i[l]&&(o=!1)}o&&(s.splice(e--,1),t=r(r.s=n[0]))}return t}var o={},i={app:0},s=[];function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var a=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"35bc":function(t,e,n){"use strict";n("4b24")},"4b24":function(t,e,n){},"508d":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);var o={};n.r(o),n.d(o,"ConnectWithLine",(function(){return A}));n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("b0c0");var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"100%","overflow-x":"scroll"},attrs:{"min-height":"500"}},[n("svg",{attrs:{width:t.svgWidth,height:t.svgHeight,version:"1.1",xmlns:"http://www.w3.org/2000/svg"},on:{mousemove:t.move,mouseup:t.up,mouseleave:t.mouseleave,mousedown:t.down}},[n("line",{directives:[{name:"show",rawName:"v-show",value:t.ifShowDragLine,expression:"ifShowDragLine"}],staticStyle:{stroke:"#1989fa","stroke-width":"2","stroke-dasharray":"5 5"},attrs:{x1:t.dragLinePoints.x1,y1:t.dragLinePoints.y1,x2:t.dragLinePoints.x2,y2:t.dragLinePoints.y2}}),n("selected-lines",{attrs:{ups:t.ups,downs:t.downs,value:t.relations,pos:t.selectedPos,id:t.selectedId},on:{"remove-relation":t.removeRelation}}),t._l(t.ups,(function(e,o){return n("block",{key:e.id,attrs:{pos:"UP",index:o,removable:t.removable,id:e.id,text:e.text,title:e.title},on:{down:t.blockDown,leave:t.blockLeave,enter:t.blockEnter,delete:t.deleteBlock}})})),t._l(t.downs,(function(e,o){return n("block",{key:e.id,attrs:{pos:"DOWN",index:o,removable:t.removable,id:e.id,text:e.text},on:{down:t.blockDown,leave:t.blockLeave,enter:t.blockEnter,delete:t.deleteBlock}})}))],2)])},s=[],r=(n("4de4"),n("a434"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",t._l(t.selectBlockLines,(function(e,o){return n("line",{key:o,style:t.myStyle(o),attrs:{x1:e.upX,y1:60,x2:e.downX,y2:90},on:{mousedown:function(n){return t.remove(e)},mouseenter:function(n){return t.select(e)},mouseleave:t.leave}})})),0)}),u=[],l=(n("d81d"),n("159b"),n("c740"),60),d=20,a={name:"selected-lines",props:{ups:{type:Array,default:function(){return[]}},downs:{type:Array,default:function(){return[]}},pos:{type:String,default:"UP"},id:{type:String,default:null},value:{type:Array,default:function(){return[]}}},data:function(){return{index:-1,relations:this.value}},computed:{selectBlockLines:function(){var t=this;return this.pos?this.relations.filter((function(e){return"UP"==t.pos?t.id==e.upId:t.id==e.downId})).map((function(e){return{upId:e.upId,downId:e.downId,upX:t.upMap[e.upId]*(l+d)+l/2,downX:t.downMap[e.downId]*(l+d)+l/2}})):[]},upMap:function(){var t={};return this.ups.forEach((function(e,n){return t[e.id]=n})),t},downMap:function(){var t={};return this.downs.forEach((function(e,n){return t[e.id]=n})),t}},methods:{remove:function(t){var e=this.relations.findIndex((function(e){return e.upId==t.upId&&e.downId==t.downId}));e>=0&&(this.$emit("remove-relation",Object.assign({},this.relations[e])),this.relations.splice(e,1),this.index=-1)},select:function(t){this.index=this.selectBlockLines.findIndex((function(e){return e.upId==t.upId&&e.downId==t.downId}))},leave:function(){this.index=-1},myStyle:function(t){var e={stroke:this.index==t?"#F20D0D":"#a1a1a1","stroke-width":this.index==t?3:2};return this.index==t&&(e.cursor="pointer"),e}}},c=a,h=n("2877"),f=Object(h["a"])(c,r,u,!1,null,null,null),p=f.exports,m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{on:{click:t.click}},[n("foreignObject",{attrs:{x:t.position.x,y:t.position.y,width:"60",height:"60"}},[n("div",{staticClass:"my-text",staticStyle:{display:"flex","text-align":"center","justify-content":"center","align-items":"center","font-size":"13px",height:"100%"}},[t._v(t._s(t.text))])]),n("rect",{staticClass:"my-rect",style:t.myStyle,attrs:{width:"60",height:"60",x:t.position.x,y:t.position.y,rx:"5",ry:"5"},on:{mouseenter:t.enter,mouseleave:t.leave,mousedown:t.down}},[n("title",[t._v(t._s(t.title))])]),n("text",{directives:[{name:"show",rawName:"v-show",value:t.removable,expression:"removable"}],staticClass:"my-text canHover",attrs:{x:t.position.x+50,y:t.position.y+11,width:"10",height:"15",fill:"#F20D0D"},on:{mousedown:t.deleteBlock}},[t._v("x")])],1)},v=[],w=(n("a9e3"),60),y=60,x=20,g=30,b={name:"block",props:{pos:{type:String,default:"UP"},index:{type:Number,default:0},text:{type:String,default:null},id:{type:String,default:null},selected:{type:Boolean,default:!1},removable:{type:Boolean,default:!0},title:{type:String,default:null}},data:function(){return{in:!1,showDelete:!1,hoverDelete:!1}},computed:{position:function(){return{x:(w+x)*this.index+1,y:"UP"==this.pos?1:y+g+1}},connectPoint:function(){return{x:(w+x)*this.index+w/2+1,y:"UP"==this.pos?y+1:y+g+1}},myStyle:function(){return{fill:"white","fill-opacity":.5,"stroke-width":this.highlight?2:1,stroke:this.highlight?"#1989fa":"#878787"}},highlight:function(){return this._selected||this.in},_selected:function(){return this.selected},deleteStyle:function(){return this.hoverDelete?{cursor:"pointer"}:{}}},methods:{enter:function(){this.in=!0,this.showDelete=!0,this.dispatch("enter")},leave:function(){this.in=!1,this.showDelete=!1,this.dispatch("leave")},down:function(){this.dispatch("down")},up:function(){this.dispatch("up")},click:function(){this.dispatch("select")},deleteBlock:function(){this.dispatch("delete")},dispatch:function(t){this.$emit(t,{id:this.id,pos:this.pos})}}},I=b,P=(n("6755"),Object(h["a"])(I,m,v,!1,null,"1c385ad9",null)),k=P.exports,D={data:function(){return{ifMouseDown:!1,ifMouseMove:!1,fromId:null,fromPos:null,toId:null,toPos:null,mouseX:null,mouseY:null}},methods:{down:function(){this.ifMouseDown=!0},up:function(){this.ifMouseDown=!1,this.add2relation(),this.resetDragLine()},move:function(t){this.ifMouseDown&&(this.mouseX=t.clientX-this.$el.getBoundingClientRect().left,this.mouseY=t.clientY-this.$el.getBoundingClientRect().top)},blockEnter:function(t){this.fromId&&this.fromPos!=t.pos&&(this.toId=t.id,this.toPos=t.pos)},blockLeave:function(){this.toId=null,this.toPos=null},dragDown:function(t){this.fromId=t.id,this.fromPos=t.pos;var e=this.connectPoint(t.id,t.pos);this.mouseX=e.x,this.mouseY=e.y},mouseleave:function(){this.resetDragLine()},add2relation:function(){if(this.fromId&&this.toId&&this.fromPos!=this.toPos){var t={upId:"UP"==this.fromPos?this.fromId:this.toId,downId:"DOWN"==this.fromPos?this.fromId:this.toId};t.upExtra=this.upDataMap[t.upId].extra,t.downExtra=this.downDataMap[t.downId].extra,t.upType=this.upDataMap[t.upId].type,t.downType=this.downDataMap[t.downId].type;var e=this.relations.findIndex((function(e){return e.upId==t.upId&&e.downId==t.downId}));e<0&&this.relations.push(t)}},resetDragLine:function(){this.fromId=null,this.fromPos=null,this.toId=null,this.toPos=null,this.mouseX=null,this.mouseY=null}},computed:{ifShowDragLine:function(){return!!this.fromId},dragLinePoints:function(){var t={x1:0,y1:0,x2:0,y2:0};if(this.fromId){var e=this.connectPoint(this.fromId,this.fromPos);t.x1=e.x,t.y1=e.y}if(this.toId){var n=this.connectPoint(this.toId,this.toPos);t.x2=n.x,t.y2=n.y}else t.x2=this.mouseX,t.y2=this.mouseY;return t}}},M=60,S=60,_=20,L=30,O={computed:{upMap:function(){var t={};return this.ups.forEach((function(e,n){return t[e.id]=n})),t},downMap:function(){var t={};return this.downs.forEach((function(e,n){return t[e.id]=n})),t},upDataMap:function(){var t={};return this.ups.forEach((function(e){return t[e.id]=e})),t},downDataMap:function(){var t={};return this.downs.forEach((function(e){return t[e.id]=e})),t}},methods:{connectPoint:function(t,e){var n={},o="UP"==e?this.upMap[t]:this.downMap[t];return"number"!=typeof o||(n.x=o*(M+_)+M/2,n.y="UP"==e?S+1:S+L+1),n},isNumber:function(t){return"number"==typeof t}}},j=60,B=60,E=20,U=30,X={name:"connect-with-line",mixins:[D,O],components:{Block:k,SelectedLines:p},props:{ups:{type:Array,default:function(){return[]}},downs:{type:Array,default:function(){return[]}},relations:{type:Array,default:function(){return[]}},removable:{type:Boolean,default:!1}},data:function(){return{selectedPos:null,selectedId:null,svgHeight:2*B+U+2}},computed:{svgWidth:function(){var t=(j+E)*Math.max(this.ups.length,this.downs.length)-E+2;return Math.max(t,100)}},mounted:function(){this.filter()},methods:{blockDown:function(t){this.select(t),this.dragDown(t)},select:function(t){this.selectedPos=t.pos,this.selectedId=t.id},deleteBlock:function(t){var e="UP"==t.pos?this.upMap[t.id]:this.downMap[t.id],n="UP"==t.pos?this.ups:this.downs;"number"==typeof e&&(this.$emit("remove-block",Object.assign({},n[e])),n.splice(e,1))},removeRelation:function(t){this.$emit("remove-relation",t)},filter:function(){for(var t=this.relations.length-1;t>=0;t--){var e=this.relations[t];this.isNumber(this.upMap[e.upId])&&this.isNumber(this.downMap[e.downId])||this.relations.splice(t,1)}}},watch:{ups:function(){this.filter()},downs:function(){this.filter()}}},$=X,N=(n("35bc"),Object(h["a"])($,i,s,!1,null,"4bc1b7f5",null)),A=N.exports,C={install:function(t){for(var e in o){var n=o[e];t.component(n.name,n)}}};e["default"]=C;"undefined"!==typeof window&&window.Vue&&window.Vue.use(C)},6755:function(t,e,n){"use strict";n("508d")}});
//# sourceMappingURL=app.66e42abb.js.map
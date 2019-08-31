/*
byId( id:string )
通过id并且参数id的类型为string类。
返回值：返回一个唯一的元素对象
 */
function byId(id) {
	return document.getElementById( id )
}

/*
getStyle( ele:ElementObject, prop:[styleString] )
返回值：获取元素的样式
 */
function getStyle( ele, prop ) {
	return ele.currentStyle ? ele.currentStyle[prop] : window.getComputedStyle(ele)[prop]
}

/*
linearMove( ele:ElementObject,prop:[styleString] ,target:[number] )
 */
/*
参数就是配置，
配置：通过配置可以产生不同的效果
config|options
 */

/*
var o = {
	ele:'xxx',
	prop:'xxx',
	target:'xxx'
}
 */

function linearMove( options ) {

	var ele = options.ele
	var prop = options.prop
	var target = options.target

	//console.log( ele,prop,target )
	//return;
	var speed = target > parseInt(getStyle( ele,prop )) ? 10 : -10
	clearInterval( ele.timer )
	ele.timer = setInterval(function(){

		var pos = parseInt(getStyle( ele,prop ))//前：获取当前位置 0  后：400
	
		
		var cur = pos + speed//新位置 前：cur = 10  后：390

		if( (cur > target && speed > 0) || (cur < target && speed < 0) ){// 往前走，速度一定是正的，当大于目标位置的时候，赋值目标位置为新位置，并且清除定时器
			cur = target
			clearInterval(ele.timer)
		}

		//console.log( cur )
		ele.style[prop] = cur + 'px'

	},30)
}


/*
获取到计时功能
var t = new Date( '2019,6,5,00:00:00' ) //目标时间
getT( t ) => 返回一个 `距离6.5号还有5天13小时31分4秒`
 */
function getT( targetTime ) {
	var currentTime = new Date() //当前时间

	//console.log( targetTime - currentTime )//得到一个毫秒数的剩余时间

	var t = parseInt( (targetTime - currentTime)/1000 )//
	//console.log( t )

	var day = parseInt( t/(1*24*60*60) )
	var hour = parseInt( t%86400/3600 )
	var min = parseInt( t%3600/60 )
	var sec = parseInt( t%60 )



	//console.log( '距离6.5号还有'+ day +'天'+ hour +'小时'+ min +'分'+ sec +'秒' )
	return '距离6.5号还有'+ day +'天'+ hour +'小时'+ min +'分'+ sec +'秒'
}


/*
var str = 'name=小明&age=18&sex=男&city=北京'
	var obj = strToJson( str )
	console.log( obj )
	console.log( obj.name )
	传一个str变量形式的字符串，转换成一个object对象
 */
function strToJson( str ) {
		
	var json = {}

	var arr1 = str.split('&')

	for(var i=0;i<arr1.length;i++){
		var arr2 = arr1[i].split('=')
		json[ arr2[0] ] = arr2[1]
	}

	return json//object
}


function firstCodeToUpper( str ) {
	
	//var newStr = ''

	var firstStr = str.substring(0,1).toUpperCase()
	var endStr = str.substring(1).toLowerCase()

	return firstStr + endStr
}


function getZero( num ) {
	return num < 10 ? '0'+num : ''+num
}


/*
creatCode()//没传参则返回5位的验证码 默认  至少5位
createCode(6)//生成6位的验证码
 */
function createCode( len ) {
	var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

	var code = ''//保存验证码

	if( typeof len == 'undefined' || typeof len != 'number' || len < 5){
		len = 5
	}

	var arrCode = str.split('')// 转换成数组才能使用sort方法

	arrCode.sort(function () {
		return Math.random() - 0.5
	})

	for( var i=0;i<len;i++ ){
		code+= arrCode[i]
	}

	return code
}

//  模拟图片验证码
function superCreateCode(len) {
	var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

	var code = ''//保存验证码

	if( typeof len == 'undefined' || typeof len != 'number' || len < 5){
		len = 5
	}

	var arrCode = str.split('')// 转换成数组才能使用sort方法

	arrCode.sort(function () {
		return Math.random() - 0.5
	})

	for( var i=0;i<len;i++ ){
		//code+= '<span>'+arrCode[i]+'</span>'
		//
		var r = Math.round( Math.random()*255 )
		var g = Math.round( Math.random()*255 )
		var b = Math.round( Math.random()*255 )
		var rDeg = Math.round( Math.random()*40 ) - 20
		code += '<span style="display: inline-block;color: rgb('+ r +','+ g +','+ b +'); transform: rotate('+ rDeg +'deg);">'+ arrCode[i] +'</span>'
	}

	return code
}

// 获取元素到页面的距离
function getPosition( ele ) {
	var position = {
		left:0,//left
		top:0//top
	}
	while(ele){

		position.left += ele.offsetLeft
		position.top += ele.offsetTop

		ele = ele.offsetParent
	}

	return position
}

//滚动条距顶部的位置
function scrollTop() {
	return document.body.scrollTop || document.documentElement.scrollTop
}


//var oBtn = document.getElementById('btn1')
//bind(oBtn,'click',fn1)
//注意this指向 -> var _this = ev.srcElement || ev.target
function bind(ele,type,fn){
	if( ele.addEventListener ){
		ele.addEventListener( type,fn )
	}else{
		ele.attachEvent( 'on'+type,fn )
	}
}

function unbind(ele,type,fn){
	if( ele.addEventListener ){
		ele.removeEventListener( type,fn )
	}else{
		ele.detachEvent( 'on'+type,fn )
	}
}


//阻止事件冒泡 都依赖事件函数中的事件对象event
function cancelBubble(ev) {
	ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true
}

//阻止事件默认行为 都依赖事件函数中的事件对象event
function preventDefault(ev) {
	/*if( ev.preventDefault ){
		ev.preventDefault()
	}else{
		ev.returnValue = false
	}*/

	ev.preventDefault ? ev.preventDefault() : ev.returnValue = false
}


// ele,upFn,downFn
/*
	ele: 为ele元素绑定滚轮事件
	upFn: 向上要做的事情 function
	downFn: 向下要做的事情 function
	依赖preventDefault() 阻止默认行为
 */ 
function bindScroll(ele,upFn,downFn) {
	
	function scrollFn(e) {
		//alert('滚轮事件发生了')
		var ev = window.event || e

		preventDefault(ev)//阻止默认行为
		var dir = true//  标记：代表方向，假设true为向上，则false向下
		// 谷歌IE
		if( ev.wheelDelta ){
			if( ev.wheelDelta > 0 ){
				dir = true
			}else{
				dir = false
			}
		}
		//火狐
		if( ev.detail ){
			if( ev.detail > 0 ){
				dir = false
			}else{
				dir = true
			}
		}

		if( dir ){
			upFn()
		}else{
			downFn()
		}

	}

	//火狐
	if( ele.addEventListener ){
		ele.addEventListener("DOMMouseScroll",scrollFn)
	}

	//IE和谷歌
	ele.onmousewheel = scrollFn
}

//缓冲运动
function sMove( ele,options,callback ) {
	//oDiv.style.left = '600px'
	clearInterval(ele.timer)
	ele.timer = setInterval(function () {
		
		var flag = true ;//假设都到目标位置则为true 只要有一个没到就为false
		for(var attr in options){

			var target = options[attr]
			if( attr == 'opacity' ){
				var cur = parseFloat( getStyle( ele,attr ) ) * 100
			}else{
				var cur = parseInt(getStyle( ele,attr ))
			}
			
			// speed = (0-600)/10  ->  -60
			var speed =  (target - cur )/10 

			//   往前走速度一定是正的，往回走速度一定是负的
			speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed )

			if( attr == 'opacity' ){
				ele.style.opacity = (cur + speed)/100
				ele.style.filter = 'alpha(opacity='+ (cur + speed) +')'
			}else{
				ele.style[attr] = cur + speed + 'px'
			}

			if( cur != target ){
				flag = false
			}

		}
		if( flag ){
			clearInterval( ele.timer )
			callback && callback()
		}

	},30)
}



/* 
            假设我们以后都是以天为单位
        */
 function setCookie( key,value,d ){
		var t = new Date()
		t.setDate( t.getDate() + d ) // d 天以后过期
		document.cookie = key+'='+ value +';expires='+t
	}

	// username=admin; age=18; sex=男
	//getCookie( 'username' )=> admin
	//getCookie( 'age' )=> 18

function getCookie( key ){

	var json = {}
	var str = document.cookie    
	var arr1 = str.split('; ')

	for(var i=0;i<arr1.length;i++){
		var arr2 = arr1[i].split('=')
		json[ arr2[0] ] = arr2[1]
	}

	return json[key]

}


// username=admin; age=18; sex=男
function removeCookie( key ){
	setCookie( key,'134',-1 )
}


/*

抽参数
	method:请求 get|post
	url:请求地址
	async:是否异步
	success:请求成功要做的事情
	
	url和sucess参数必须传

ajax({
	method:'get',
	url:'a.txt',
	async:true,
	success:function(result){
		console.log(result,'111111')
	}
})*/
function ajax( options ) {
	//var ajax = new XMLHttpRequest()//IE7+
	var async = options.async === false ? false : true//如果没传则为true，代表异步
	var method = options.method || 'get'
	var url = options.url
	var success = options.success
	
	//做兼容
	if( window.XMLHttpRequest ){
		var ajax = new XMLHttpRequest()//IE7+
	}else{
		var ajax = new ActiveXObject('Microsoft.XMLHTTP')
	}

	ajax.open(method,url,async)

	ajax.send()//

	ajax.onreadystatechange = function () {
		if( ajax.readyState == 4 ) {
			if( ajax.status == 200 ){
				//console.log( ajax.responseText )
				//05使用函数的异步不能使用return，而是使用回调函数拿到结果
				//return ajax.responseText
				success(ajax.responseText)
			}
		}
		
	}	
}
/**
 * Created by Tiny on 2017/6/13.
 */
//运动事件监听            重力感应和摇一摇
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',deviceMotionHandler,false);
}
//获取加速度信息
//通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
//而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
var SHAKE_THRESHOLD = 4000;
var last_update = 0;
var speed = 30;//速度
var x, y, z, last_x = 0, last_y = 0, last_z = 0;
function deviceMotionHandler(eventData) {
    var acceleration =eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime-last_update)> 10) {
        var diffTime = curTime -last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
            alert("你中奖啦！");  // Do something
        }
        if(Math.abs(x-last_x) > speed || Math.abs(y-last_y) > speed || Math.abs(z-last_z) > speed) {
            //简单的摇一摇触发代码
            alert('触发了重力感应');
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}


var timer = null;           //定时器
var hookPosX = 0;           // 当前X轴方向位置
var hookPosY = 0;           // 当前Y轴方向位置
var step = 2;               // 单位时间内通过的距离
var timeSpeed = 10;        // 通过时间控制移动速度
function moveX(elem, step){          //移动事件（elem:移动的元素，step:移动的速度和方向）
    hookPosX += step;
    translate3d = 'translate3d( ' + hookPosX + 'px, 0, 0)';
    elem.css(getTransforms(translate3d));
}
$('#left').on('click',function(e) {        //向左移动
    e.preventDefault();// 阻止浏览器默认事件，重要
    clearInterval(timer);
    timer = setInterval(function(){
        if(hookPosX < 0 || hookPosX >=200){            //移动到可以移动的最大位置后，停止
            step = -step;
        }
        moveX($('#hook'),step);
        //console.log($('#hook').css('transform').match(/matrix\(\d+, \d+, \d+, \d+, (\d+), (\d+)\)/)[1])
    },timeSpeed);
});
$('#left').on('touchstart',function(e) {        //向左移动
     e.preventDefault();// 阻止浏览器默认事件，重要
     clearInterval(timer);
     timer = setInterval(function(){
     if(hookPosX <= 0){            //移动到可以移动的最大位置后，停止
     clearInterval(timer);
     return;
 }
 moveX($('#hook'),-step);
     //console.log($('#hook').css('transform').match(/matrix\(\d+, \d+, \d+, \d+, (\d+), (\d+)\)/)[1])
     },timeSpeed);
 });
 $('#left').on('touchend',function(e) {          //结束移动
     e.preventDefault();// 阻止浏览器默认事件，重要
     clearInterval(timer);
 });
$('#right').on('touchstart',function(e) {       //向右移动
    e.preventDefault();// 阻止浏览器默认事件，重要
    clearInterval(timer);
    timer = setInterval(function(){
        if(hookPosX >= 200){          //移动到可以移动的最大位置后，停止
            clearInterval(timer);
            return;
        }
        moveX($('#hook'),step);
    },timeSpeed);
});
$('#right').on('touchend',function(e) {         //结束移动
    e.preventDefault();// 阻止浏览器默认事件，重要
    clearInterval(timer);
});
$('#sure').on('click',function(e) {         //确定
    clearInterval(timer);
    timer = setInterval(function(){
        if(hookPosY >= 200){
            step = -step
        }
        hookPosY += step;
        translate3d = 'translate3d( ' + hookPosX + 'px,' + hookPosY + 'px, 0)';
        $('#hook').css(getTransforms(translate3d));
        if(hookPosY <= 0){
            step = -step
            clearInterval(timer);
        }
    },timeSpeed);
});

$('body').on('touchmove',function(e) {
    //e.preventDefault();// 阻止浏览器默认事件，重要
    var touch = e.originalEvent.targetTouches[0];
    var x = touch.pageX;
    var y = touch.pageY;
    console.log("touchmove" + x);
});
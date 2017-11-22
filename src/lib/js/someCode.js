/**
 * Created by Tiny on 2017/6/13.
 */
//�˶��¼�����            ������Ӧ��ҡһҡ
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',deviceMotionHandler,false);
}
//��ȡ���ٶ���Ϣ
//ͨ��������һ����ȡ����x, y, z ֵ��һ��ʱ�䷶Χ�ڵı仯�ʣ������豸�Ƿ��н��лζ����жϡ�
//��Ϊ�˷�ֹ�����ƶ������У���Ҫ���ñ仯������һ�����ʵ��ٽ�ֵ��
var SHAKE_THRESHOLD = 4000;
var last_update = 0;
var speed = 30;//�ٶ�
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
            alert("���н�����");  // Do something
        }
        if(Math.abs(x-last_x) > speed || Math.abs(y-last_y) > speed || Math.abs(z-last_z) > speed) {
            //�򵥵�ҡһҡ��������
            alert('������������Ӧ');
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}


var timer = null;           //��ʱ��
var hookPosX = 0;           // ��ǰX�᷽��λ��
var hookPosY = 0;           // ��ǰY�᷽��λ��
var step = 2;               // ��λʱ����ͨ���ľ���
var timeSpeed = 10;        // ͨ��ʱ������ƶ��ٶ�
function moveX(elem, step){          //�ƶ��¼���elem:�ƶ���Ԫ�أ�step:�ƶ����ٶȺͷ���
    hookPosX += step;
    translate3d = 'translate3d( ' + hookPosX + 'px, 0, 0)';
    elem.css(getTransforms(translate3d));
}
$('#left').on('click',function(e) {        //�����ƶ�
    e.preventDefault();// ��ֹ�����Ĭ���¼�����Ҫ
    clearInterval(timer);
    timer = setInterval(function(){
        if(hookPosX < 0 || hookPosX >=200){            //�ƶ��������ƶ������λ�ú�ֹͣ
            step = -step;
        }
        moveX($('#hook'),step);
        //console.log($('#hook').css('transform').match(/matrix\(\d+, \d+, \d+, \d+, (\d+), (\d+)\)/)[1])
    },timeSpeed);
});
$('#left').on('touchstart',function(e) {        //�����ƶ�
     e.preventDefault();// ��ֹ�����Ĭ���¼�����Ҫ
     clearInterval(timer);
     timer = setInterval(function(){
     if(hookPosX <= 0){            //�ƶ��������ƶ������λ�ú�ֹͣ
     clearInterval(timer);
     return;
 }
 moveX($('#hook'),-step);
     //console.log($('#hook').css('transform').match(/matrix\(\d+, \d+, \d+, \d+, (\d+), (\d+)\)/)[1])
     },timeSpeed);
 });
 $('#left').on('touchend',function(e) {          //�����ƶ�
     e.preventDefault();// ��ֹ�����Ĭ���¼�����Ҫ
     clearInterval(timer);
 });
$('#right').on('touchstart',function(e) {       //�����ƶ�
    e.preventDefault();// ��ֹ�����Ĭ���¼�����Ҫ
    clearInterval(timer);
    timer = setInterval(function(){
        if(hookPosX >= 200){          //�ƶ��������ƶ������λ�ú�ֹͣ
            clearInterval(timer);
            return;
        }
        moveX($('#hook'),step);
    },timeSpeed);
});
$('#right').on('touchend',function(e) {         //�����ƶ�
    e.preventDefault();// ��ֹ�����Ĭ���¼�����Ҫ
    clearInterval(timer);
});
$('#sure').on('click',function(e) {         //ȷ��
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
    //e.preventDefault();// ��ֹ�����Ĭ���¼�����Ҫ
    var touch = e.originalEvent.targetTouches[0];
    var x = touch.pageX;
    var y = touch.pageY;
    console.log("touchmove" + x);
});
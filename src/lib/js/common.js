/**
 * Created by Tiny on 2017/4/17.
 */
function Common(){
    function shareFriend(shareTitle,descContent,lineLink,shareImg) {
        wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    function shareTimeline(shareTitle,descContent,lineLink,shareImg) {
        wx.onMenuShareTimeline({
            title: shareTitle,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    function shareQQ(shareTitle,descContent,lineLink,shareImg){
        wx.onMenuShareQQ({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    };

    function shareWeibo(shareTitle,descContent,lineLink,shareImg){
        wx.onMenuShareWeibo({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    };
    function setWxShare(share_title, share_desc, share_link,share_img) {
        var url = location.href.split('#').toString();
        $.ajax({
            //url: 'http://inews.p5w.net/wx/sign.php',
            url: 'http://data.p5w.net/trs/sign.php',
            type: 'post',
            dataType: 'json',
            data: {'url': url},
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (signPackage) {
                if (signPackage) {
                    var share_appid = signPackage.appId;
                    var share_nonceStr = signPackage.nonceStr;
                    var share_signature = signPackage.signature;
                    var share_timestamp = signPackage.timestamp;

                    wx.config({
                        debug: false,
                        appId: share_appid,
                        timestamp: share_timestamp,
                        nonceStr: share_nonceStr,
                        signature: share_signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
                    });

                    wx.ready(function () {

                        //发送给好友
                        shareFriend(share_title, share_desc, share_link, share_img);

                        //分享到朋友圈
                        shareTimeline(share_title, share_desc, share_link, share_img);

                        //分享给QQ好友
                        shareQQ(share_title, share_desc, share_link, share_img);

                        //分享到微博
                        shareWeibo(share_title, share_desc, share_link, share_img);
                    });

                }
            }
        });
    };
    function setMusic(){
        //点击暂停和启动音乐
        var music = document.getElementById("bgMusic");
        $("#audioBtn").click(function(){
            if(music.paused){music.play();
                $("#audioBtn").removeClass("pause").addClass("play");
            }else{music.pause();
                $("#audioBtn").removeClass("play").addClass("pause");
            }
        });
        //手动触发启动音乐
        if(!document.getElementById('bgMusic') == undefined) {
            document.getElementById('bgMusic').play();
        }  //一般情况下，这样就可以自动播放了，但是一些奇葩iPhone机不可以
        document.addEventListener("WeixinJSBridgeReady", function () {  //必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
            document.getElementById('bgMusic').play();
            document.getElementById('video').play();
        }, false);
    };
    function loading(callback) {
        var images = [];                //存放所有的图片src的数组
        var imgs = document.images;     //获取所有image节点
        //通过dom方法获取页面中的所有img，包括<img>标签和css中的background-image
        for (var i = 0; i < imgs.length; i++) {
            images.push(imgs[i].src);       //保存dom中的图片src
        }
        var cssImages = getallBgimages();       //获得背景图
        for (var j = 0; j < cssImages.length; j++) {
            images.push(cssImages[j]);          //保存背景图等的src
        }
        var imgNum = images.length;
        var loadImgProgress = 0;
        $.imgpreload(images, {
            each: function () {
                var status = $(this).data('loaded') ? 'success' : 'error';
                if (status == 'success') {
                    loadImgProgress++;
                    var percent = Math.ceil(loadImgProgress / imgNum * 100);
                    $('#progress i').html(percent + '%');
                }
            },
            all: function () {
                 setTimeout(function(){
                     $('#loading').fadeOut();
                     callback && callback();
                 },500)
            }
        });
    }
    //get all images in style（此方法引用其他博客的）
    function getallBgimages() {
        var url, B = [], A = document.getElementsByTagName('*');
        A = B.slice.call(A, 0, A.length);
        while (A.length) {
            url = deepCss(A.shift(), 'background-image');
            if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
            url = url[1];
            if (url && B.indexOf(url) == -1) B[B.length] = url;
        }
        return B;
    }
    function deepCss (who, css) {
        if (!who || !who.style) return '';
        var sty = css.replace(/\-([a-z])/g, function (a, b) {
            return b.toUpperCase();
        });
        if (who.currentStyle) {
            return who.style[sty] || who.currentStyle[sty] || '';
        }
        var dv = document.defaultView || window;
        return who.style[sty] ||
            dv.getComputedStyle(who, "").getPropertyValue(css) || '';
    }
    Array.prototype.indexOf = Array.prototype.indexOf ||
        function (what, index) {
            index = index || 0;
            var L = this.length;
            while (index < L) {
                if (this[index] === what) return index;
                ++index;
            }
            return -1;
        }

    function getTransforms(translate3d){
        return {
            '-webkit-transform': translate3d,
            '-moz-transform': translate3d,
            '-ms-transform':translate3d,
            'transform': translate3d
        };
    }

    //===========================
    //函数名:   touch
    //功能:    滑动
    //输入参数: obj  滑动区域的父节点类
    //返回值:  无
    //============
    function touch(obj) {
        var $chooselist = $('.' + obj);
        var $ul = $("."+ obj +" ul"),startX,startY,translateX = 0,nowtranslateX;
        var li = $ul.find("li");
        //console.log($chooselist.innerWidth())
        //console.log($ul.width())
        var loopnum = 5,lastNum = -1;
        function touchStart(event){
            if($chooselist.innerWidth() >= $ul.width()){
                return false;
            }
            event.preventDefault();
            var touch = event.originalEvent.targetTouches[0];
            startX = touch.pageX;
            startY = touch.pageY;
            $ul.css("webkitTransition","none");
        };
        function touchMove(event){
            if($chooselist.innerWidth() >= $ul.width()){
                return false;
            }
            event.preventDefault();
            var touch = event.originalEvent.targetTouches[0],
                x = touch.pageX-startX,
                y = touch.pageY-startY;
            nowtranslateX = x + translateX;
            $ul.css('transform', 'translateX(' + nowtranslateX + 'px)' );
        };
        function touchEnd(){
            if($chooselist.innerWidth() >= $ul.width()){
                return false;
            }
            translateX = nowtranslateX;
            if(nowtranslateX>=0){
                $ul.css("transform","translateX(0)");
                translateX = 0;
                $ul.css("webkitTransition","transform 500ms");
            }else{
                var $cwidth = $chooselist.innerWidth()-$ul.outerWidth();
                if(nowtranslateX<$cwidth){
                    $ul.css("webkitTransition","transform 500ms");
                    $ul.css('transform', 'translateX(' + $cwidth + 'px)' );
                    translateX = $cwidth;
                }
            }
        };
        this.ifTouch = function () {
            $ul.css("transform","translateX(0)");
        }
        $chooselist.on("touchstart","ul",function(event){
            touchStart(event);
        });
        $chooselist.on("touchmove","ul",function(event){
            touchMove(event);
        });
        $chooselist.on("touchend","ul",function(event){
            touchEnd(event);
        });
        this.ifTouch();
    };
    //返回android还是iOS
    function getPlatform(){
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            return 'iOS';
        } else if (/android/.test(ua)) {
            return 'android';
        }
    }

    return {
        setWxShare: setWxShare,
        setMusic: setMusic,
        loading: loading,
        getTransforms: getTransforms,
        touch: touch,
        getPlatform: getPlatform
    };
}
export default Common;

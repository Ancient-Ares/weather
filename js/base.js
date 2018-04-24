var baseUrl = 'http://121.40.249.208:8080/weather/app/';
// var baseUrl = 'http://192.168.1.122:8080/weather/app/';

var articleUrl = 'https://webapp.snzfnm.com/webapp/';
// var articleUrl = 'https://192.168.1.127:8443/webapp/';

// 判断 ios | android | wechat
(function ($, window) {
    function detect(ua) {
        this.os = {};
        var funcs = [

            function () { //wechat
                var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
                if (wechat) { //wechat
                    this.os.wechat = {
                        version: wechat[2].replace(/_/g, '.')
                    };
                }
                return false;
            },
            function () { //android
                var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
                if (android) {
                    this.os.android = true;
                    this.os.version = android[2];

                    this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
                }
                return this.os.android === true;
            },
            function () { //ios
                var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
                if (iphone) { //iphone
                    this.os.ios = this.os.iphone = true;
                    this.os.version = iphone[2].replace(/_/g, '.');
                } else {
                    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
                    if (ipad) { //ipad
                        this.os.ios = this.os.ipad = true;
                        this.os.version = ipad[2].replace(/_/g, '.');
                    }
                }
                return this.os.ios === true;
            }
        ];
        [].every.call(funcs, function (func) {
            return !func.call($);
        });
    }

    detect.call($, navigator.userAgent)
})($, window);

function routerBack() {
    window.history.go(-1)
}
$(".goBack").click(function () {
    if ($.os.ios) {
        // ios
        window.webkit.messageHandlers.toback.postMessage(null)
    } else {
        // android
        toback.back()
    }
})
$(".back").click(function(){
    routerBack()
})

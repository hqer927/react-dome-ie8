webpackJsonp([8,10],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(545);
	module.exports = __webpack_require__(357);


/***/ }),

/***/ 357:
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Created by hqer on 2017/11/8.
	 */
	module.exports = {
	    set: function set(_url, _data) {
	        function checkStatus(response) {
	            if (response.status >= 200 && response.status < 300) {
	                return response;
	            } else {
	                var error = new Error(response.statusText);
	                error.response = response;
	                throw error;
	            }
	        }
	        function parseJSON(response) {
	            window.GLOBAL.token = response.headers.get('token');
	            if (response && response.sessionOut) {
	                window.GLOBAL.isLogin = 0;
	            }
	            return response.json();
	        }
	        /* 用于不跨越，token放在header中*/
	        /*        let myHeaders = new Headers();
	        myHeaders.append('token', GLOBAL.token);
	        _data.headers = myHeaders;
	        _data.credentials = "same-origin";*/
	        /* 用于跨域，token放在body中*/
	        /*        let dataBody = Object.assign({token: GLOBAL.token},JSON.parse(_data.body));
	        _data.body = JSON.stringify(dataBody);*/
	        var req = new Request(_url, _data);
	        return fetch(req).then(checkStatus).then(parseJSON);
	    }
	};

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(546);
	
	module.exports = {
	    isNotEmpty: function isNotEmpty(_v, _tips) {
	        var _val = $.trim(_v);
	        if (!_val) {
	            var _t = '* 输入项不能为空';
	            if (typeof _tips === 'string') {
	                _t = _tips;
	            }
	            return _t;
	        }
	        return '';
	    },
	    isCheckLogUserName: function isCheckLogUserName(_v) {
	        var _rv = this.isNotEmpty(_v, '* 用户名/邮箱/手机号码不能为空');
	        if (!_rv && !(/^[0-9a-zA-Z_]{4,20}$/.test(_v) || /^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_\.\-])+\.[a-zA-Z]{2,3}$/.test(_v))) {
	            return '* 请输入正确格式的用户名/邮箱/手机号码';
	        }
	        return _rv;
	    },
	    isPhoneNum: function isPhoneNum(_v) {
	        var _rv = this.isNotEmpty(_v, '* 手机号码不能为空');
	        if (!_rv && !/^1(3[0-9]|5[0-9]|8[0-9]|4[0-9]|7[0-9])\d{8}$/.test(_v)) {
	            return '* 请输入正确的手机号码';
	        }
	        return _rv;
	    },
	    isImgCode: function isImgCode(_v, _maxLength) {
	        var _rv = this.isNotEmpty(_v, '* 图形验证码不能为空');
	        if (!_rv && !(/^[0-9a-zA-Z]+$/.test(_v) && _v.length === _maxLength)) {
	            return '* 请输入正确的图形验证码';
	        }
	        return _rv;
	    },
	    isSmsCode: function isSmsCode(_v, _maxLength) {
	        var _rv = this.isNotEmpty(_v, '* 验证码不能为空');
	        if (!_rv && !(/^[0-9a-zA-Z]+$/.test(_v) && _v.length === _maxLength)) {
	            return '* 验证码错误';
	        }
	        return _rv;
	    },
	    isEmail: function isEmail(_v) {
	        var _rv = this.isNotEmpty(_v, '* 邮箱地址不能为空');
	        if (!_rv && (!/^([a-zA-Z0-9_\.])+@([a-zA-Z0-9_\.])+\.[a-zA-Z]{2,3}$/.test(_v) || _v.indexOf('._') > -1 || _v.indexOf('_.') > -1 || _v.indexOf('..') > -1 || _v.indexOf('__') > -1 || _v.slice(0, 1) === '.' || _v.slice(0, 1) === '_')) {
	            return '* 请输入正确格式的email地址';
	        }
	        return _rv;
	    },
	    isPwd: function isPwd(_v) {
	        var _rv = this.isNotEmpty(_v, '* 密码不能为空');
	        if (!_rv && !/^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[$#@^&_=+%<>{}?~!])|(?=.*?[A-Za-z])(?=.*?[$#@^&_=+%<>{}?~!]))[\dA-Za-z$#@^&_=+%<>{}?~!]{8,20}$/.test(_v)) {
	            return '* 密码格式不正确';
	        }
	        return _rv;
	    },
	    isVerifyPwd: function isVerifyPwd(_v, _vp) {
	        var _rv = this.isNotEmpty(_v, '* 密码不能为空');
	        if (!_rv && _v !== _vp) {
	            return '* 密码不一致，请重新输入';
	        }
	        return _rv;
	    }
	}; /**
	    * Created by hqer on 2016/12/30.
	    */

/***/ })

});
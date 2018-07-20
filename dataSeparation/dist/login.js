webpackJsonp([1,10],{

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _JSON$stringify = __webpack_require__(311)['default'];
	
	var _classCallCheck = __webpack_require__(229)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(230)['default'];
	
	var _inherits = __webpack_require__(298)['default'];
	
	/**
	 * Created by hqer on 2016/12/12.
	 */
	var React = __webpack_require__(10);
	var Button = __webpack_require__(362).Button;
	var Glyphicon = __webpack_require__(362).Glyphicon;
	var MD5 = __webpack_require__(541);
	var hashHistory = __webpack_require__(168).hashHistory;
	
	var CheckFun = __webpack_require__(545);
	var Fetch = __webpack_require__(357);
	var UICheckBox = __webpack_require__(547);
	var SystemTips = __webpack_require__(548);
	
	var loginData = window.GLOBAL.pageData.login;
	var systemError = window.GLOBAL.pageData.systemError;
	
	var Login = function (_React$Component) {
	    _inherits(Login, _React$Component);
	
	    function Login(props) {
	        _classCallCheck(this, Login);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.state = {
	            userName: '',
	            userNameTips: '',
	            password: '',
	            passwordTips: '',
	            smsCode: '',
	            smsCodeTips: '',
	            imgCode: '',
	            imgCodeTips: '',
	            isCheckBox: false,
	            showTips: { type: 0, text: '', className: '' },
	            isSentSms: false,
	            smsSentTime: loginData.smsSentBtn.times,
	            imgCodeIcon: loginData.imgCode.action + '?' + new Date().getTime(),
	            status: localStorage.getItem('loginStatus') ? localStorage.getItem('loginStatus') * 1 : 0
	        };
	        _this.checkUseInfo = _this.checkUseInfo.bind(_this);
	        _this.handleChangeUserName = _this.handleChangeUserName.bind(_this);
	        _this.handleBlurUserName = _this.handleBlurUserName.bind(_this);
	        _this.handleChangePassWord = _this.handleChangePassWord.bind(_this);
	        _this.handleBlurPassWord = _this.handleBlurPassWord.bind(_this);
	        _this.handleChangeSmsCode = _this.handleChangeSmsCode.bind(_this);
	        _this.handleBlurSmsCode = _this.handleBlurSmsCode.bind(_this);
	        _this.handleChangeImgCode = _this.handleChangeImgCode.bind(_this);
	        _this.handleBlurImgCode = _this.handleBlurImgCode.bind(_this);
	        _this.submit = _this.submit.bind(_this);
	        _this.sentSms = _this.sentSms.bind(_this);
	        _this.refreshImgCode = _this.refreshImgCode.bind(_this);
	        _this.closeTips = _this.closeTips.bind(_this);
	        return _this;
	    }
	
	    Login.prototype.checkUseInfo = function checkUseInfo() {
	        var _isCheckBox = this.state.isCheckBox;
	        if (_isCheckBox) {
	            _isCheckBox = false;
	        } else {
	            _isCheckBox = true;
	        }
	        this.setState({ isCheckBox: _isCheckBox });
	    };
	
	    Login.prototype.handleChangeUserName = function handleChangeUserName(event) {
	        var _eT = event.srcElement ? event.srcElement : event.target;
	        var _val = _eT.value;
	        if (/^[0-9a-zA-Z_.@]*$/.test(_val)) {
	            this.setState({ userName: _val });
	        }
	    };
	
	    Login.prototype.handleBlurUserName = function handleBlurUserName() {
	        this.setState({ userNameTips: CheckFun.isNotEmpty(this.state.userName, '* 用户名/邮箱/手机号码不能为空') });
	    };
	
	    Login.prototype.handleChangePassWord = function handleChangePassWord(event) {
	        var _eT = event.srcElement ? event.srcElement : event.target;
	        var _val = _eT.value;
	        if (/^[a-zA-Z0-9$#@^&_=+%<>{}?~!]*$/.test(_val)) {
	            this.setState({ password: _val });
	        }
	    };
	
	    Login.prototype.handleBlurPassWord = function handleBlurPassWord() {
	        this.setState({ passwordTips: CheckFun.isNotEmpty(this.state.password, '* 密码不能为空') });
	    };
	
	    Login.prototype.handleChangeSmsCode = function handleChangeSmsCode(event) {
	        var _eT = event.srcElement ? event.srcElement : event.target;
	        var _val = _eT.value;
	        if (/^[a-zA-Z0-9]*$/.test(_val)) {
	            this.setState({ smsCode: _val });
	        }
	    };
	
	    Login.prototype.handleBlurSmsCode = function handleBlurSmsCode() {
	        this.setState({ smsCodeTips: CheckFun.isSmsCode(this.state.smsCode, loginData.smsCode.maxLength) });
	    };
	
	    Login.prototype.handleChangeImgCode = function handleChangeImgCode(event) {
	        var _eT = event.srcElement ? event.srcElement : event.target;
	        var _val = _eT.value;
	        if (/^[a-zA-Z0-9]*$/.test(_val)) {
	            this.setState({ imgCode: _val });
	        }
	    };
	
	    Login.prototype.handleBlurImgCode = function handleBlurImgCode() {
	        this.setState({ imgCodeTips: CheckFun.isImgCode(this.state.imgCode, loginData.imgCode.maxLength) });
	    };
	
	    Login.prototype.submit = function submit() {
	        var _this2 = this;
	
	        var _status = this.state.status;
	        if (_status === 0) {
	            if (CheckFun.isCheckLogUserName(this.state.userName)) {
	                this.setState({ userNameTips: CheckFun.isCheckLogUserName(this.state.userName) });
	            } else if (CheckFun.isPwd(this.state.password)) {
	                this.setState({ passwordTips: CheckFun.isPwd(this.state.password) });
	            } else if (CheckFun.isImgCode(this.state.imgCode, loginData.imgCode.maxLength)) {
	                this.setState({ imgCodeTips: CheckFun.isImgCode(this.state.imgCode, loginData.imgCode.maxLength) });
	            } else {
	                setMaxDigits(130);
	                var _key = new RSAKeyPair('10001', '', window.GLOBAL.key);
	                Fetch.set(loginData.submit.action, {
	                    method: 'POST',
	                    cache: 'no-cache',
	                    body: _JSON$stringify({
	                        userName: encryptedString(_key, encodeURIComponent(this.state.userName)),
	                        password: encryptedString(_key, encodeURIComponent(this.state.password)),
	                        imgCode: encryptedString(_key, encodeURIComponent(this.state.imgCode)),
	                        isCheck: this.state.isCheckBox ? 1 : 0,
	                        key: MD5(GLOBAL.userName + this.state.password + this.state.imgCode + this.state.token + 'devPortal')
	                    })
	                }).then(function (r) {
	                    if (!r.code && r.errorTips) {
	                        _this2.setState({ showTips: { type: -1, text: r.errorTips } });
	                    } else if (r.code && r.resultCode) {
	                        if (r.resultCode === '200') {
	                            sessionStorage.removeItem('loginStatus');
	                            sessionStorage.setItem('devPortalUid', r.userId);
	                            window.GLOBAL.userId = r.userId;
	                            _this2.setState({ status: 0 });
	                            hashHistory.push('/workBench');
	                        } else {
	                            var _newTips = {
	                                userName: '',
	                                userNameTips: '',
	                                password: '',
	                                passwordTips: '',
	                                imgCode: '',
	                                imgCodeTips: '',
	                                imgCodeIcon: loginData.imgCode.action + '?' + new Date().getTime()
	                            };
	                            sessionStorage.setItem('loginStatus', r.status);
	                            _newTips.status = r.status;
	                            if (r.status === 2) {
	                                loginData.status.result.map(function (item) {
	                                    if (r.status === item.apiCode) {
	                                        if (item.type === -1) {
	                                            _newTips.showTips = { type: -1, text: item.text, className: item.key };
	                                        }
	                                    }
	                                }, _this2);
	                            }
	                            loginData.smsSentBtn.result.map(function (item) {
	                                if (r.resultCode === item.apiCode) {
	                                    if (item.type === 0) {
	                                        _newTips[item.key] = item.text;
	                                    }
	                                }
	                            }, _this2);
	                            _this2.setState(_newTips);
	                        }
	                    }
	                })['catch'](function () {
	                    _this2.setState({ showTips: { type: -1, text: systemError['2000'].text, className: systemError['2000'].key } });
	                });
	            }
	        } else if (_status === 3) {
	            loginData.status.result.map(function (item) {
	                if (_status === item.apiCode) {
	                    var _newTips = {};
	                    if (item.type === -1) {
	                        _newTips.showTips = { type: -1, text: item.text, className: item.key };
	                    }
	                    _this2.setState(_newTips);
	                }
	            }, this);
	        } else {
	            if (CheckFun.isCheckLogUserName(this.state.userName)) {
	                this.setState({ userNameTips: CheckFun.isCheckLogUserName(this.state.userName) });
	            } else if (CheckFun.isPwd(this.state.password)) {
	                this.setState({ passwordTips: CheckFun.isPwd(this.state.password) });
	            } else if (CheckFun.isSmsCode(this.state.smsCode, loginData.smsCode.maxLength)) {
	                this.setState({ smsCodeTips: CheckFun.isSmsCode(this.state.smsCode, loginData.smsCode.maxLength) });
	            } else if (CheckFun.isImgCode(this.state.imgCode, loginData.imgCode.maxLength)) {
	                this.setState({ imgCodeTips: CheckFun.isImgCode(this.state.imgCode, loginData.imgCode.maxLength) });
	            } else {
	                setMaxDigits(130);
	                var _key2 = new RSAKeyPair('10001', '', window.GLOBAL.key);
	                Fetch.set(loginData.submit.action, {
	                    method: 'POST',
	                    cache: 'no-cache',
	                    body: _JSON$stringify({
	                        userName: encryptedString(_key2, encodeURIComponent(this.state.userName)),
	                        password: encryptedString(_key2, encodeURIComponent(this.state.password)),
	                        smsCode: encryptedString(_key2, encodeURIComponent(this.state.smsCode)),
	                        imgCode: encryptedString(_key2, encodeURIComponent(this.state.imgCode)),
	                        isCheck: this.state.isCheckBox ? 1 : 0,
	                        key: MD5(GLOBAL.userName + this.state.password + this.state.smsCode + this.state.imgCode + this.state.token + 'devPortal')
	                    })
	                }).then(function (r) {
	                    if (!r.code && r.errorTips) {
	                        _this2.setState({ showTips: { type: -1, text: r.errorTips } });
	                    } else if (r.code && r.resultCode) {
	                        if (r.resultCode === '200') {
	                            sessionStorage.removeItem('loginStatus');
	                            sessionStorage.setItem('devPortalUid', r.userId);
	                            window.GLOBAL.userId = r.userId;
	                            _this2.setState({ status: 0 });
	                            hashHistory.push('/workBench');
	                        } else {
	                            var _newTips = {
	                                userName: '',
	                                userNameTips: '',
	                                password: '',
	                                passwordTips: '',
	                                smsCode: '',
	                                smsCodeTips: '',
	                                imgCode: '',
	                                imgCodeTips: '',
	                                imgCodeIcon: loginData.imgCode.action + '?' + new Date().getTime()
	                            };
	                            sessionStorage.setItem('loginStatus', r.status);
	                            _newTips.status = r.status;
	                            if (r.status === 2) {
	                                loginData.status.result.map(function (item) {
	                                    if (r.status === item.apiCode) {
	                                        if (item.type === -1) {
	                                            _newTips.showTips = { type: -1, text: item.text, className: item.key };
	                                        }
	                                    }
	                                }, _this2);
	                            }
	                            loginData.smsSentBtn.result.map(function (item) {
	                                if (r.resultCode === item.apiCode) {
	                                    if (item.type === 0) {
	                                        _newTips[item.key] = item.text;
	                                    }
	                                }
	                            }, _this2);
	                            _this2.setState(_newTips);
	                        }
	                    }
	                })['catch'](function () {
	                    _this2.setState({ showTips: { type: -1, text: systemError['2000'].text, className: systemError['2000'].key } });
	                });
	            }
	        }
	    };
	
	    Login.prototype.sentSms = function sentSms() {
	        var _this3 = this;
	
	        var _userNameTips = CheckFun.isCheckLogUserName(this.state.userName);
	        if (_userNameTips) {
	            this.setState({ userNameTips: _userNameTips });
	        } else {
	            Fetch.set(loginData.smsSentBtn.action, {
	                method: 'POST',
	                cache: 'no-cache',
	                body: _JSON$stringify({
	                    userName: this.state.userName
	                })
	            }).then(function (r) {
	                if (!r.code && r.errorTips) {
	                    _this3.setState({ showTips: { type: -1, text: r.errorTips } });
	                } else if (r.code && r.resultCode) {
	                    var _newTips = {};
	                    loginData.smsSentBtn.result.map(function (item) {
	                        if (r.resultCode === item.apiCode) {
	                            if (r.resultCode === '200') {
	                                _newTips.isSentSms = true;
	                                window.GLOBAL.timer.sendSms = window.setInterval(function () {
	                                    var _smsSentTime = _this3.state.smsSentTime;
	                                    _smsSentTime = _smsSentTime - 1;
	                                    if (_smsSentTime === 0) {
	                                        _this3.setState({ smsSentTime: loginData.smsSentBtn.times, isSentSms: false });
	                                        clearInterval(window.GLOBAL.timer.sendSms);
	                                        delete window.GLOBAL.timer.sendSms;
	                                    } else {
	                                        _this3.setState({ smsSentTime: _smsSentTime });
	                                    }
	                                }, 1000);
	                            }
	                            if (item.type === 0) {
	                                _newTips[item.key] = item.text;
	                            }
	                        }
	                    }, _this3);
	                    _this3.setState(_newTips);
	                }
	            })['catch'](function () {
	                _this3.setState({ showTips: { type: -1, text: systemError['2000'].text, className: systemError['2000'].key } });
	            });
	        }
	    };
	
	    Login.prototype.refreshImgCode = function refreshImgCode() {
	        this.setState({ imgCodeTips: '', imgCode: '', imgCodeIcon: loginData.imgCode.action + '?' + new Date().getTime() });
	    };
	
	    Login.prototype.closeTips = function closeTips() {
	        this.setState({ showTips: { type: 0, text: '', className: '' } });
	    };
	
	    Login.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            { className: 'login' },
	            React.createElement(
	                'div',
	                { className: 'loginInputArea' },
	                React.createElement(
	                    'div',
	                    { className: 'title fl' },
	                    '\u767B\u5F55'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'inputLine' },
	                    React.createElement('input', {
	                        type: 'text',
	                        className: 'inputBtn',
	                        value: this.state.userName,
	                        placeholder: loginData.userName.placeholder,
	                        maxLength: loginData.userName.maxLength,
	                        autoComplete: 'off',
	                        onChange: this.handleChangeUserName,
	                        onBlur: this.handleBlurUserName
	                    }),
	                    React.createElement(
	                        'span',
	                        { className: 'errorTips' },
	                        this.state.userNameTips
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'inputLine' },
	                    React.createElement('input', {
	                        type: 'password',
	                        className: 'inputBtn',
	                        value: this.state.password,
	                        placeholder: loginData.password.placeholder,
	                        maxLength: loginData.password.maxLength,
	                        autoComplete: 'off',
	                        onChange: this.handleChangePassWord,
	                        onBlur: this.handleBlurPassWord
	                    }),
	                    React.createElement(
	                        'span',
	                        { className: 'errorTips' },
	                        this.state.passwordTips
	                    )
	                ),
	                this.state.status !== 0 ? React.createElement(
	                    'div',
	                    { className: 'inputLine' },
	                    React.createElement('input', {
	                        type: 'text',
	                        className: 'inputBtn smsCode',
	                        value: this.state.smsCode,
	                        placeholder: loginData.smsCode.placeholder,
	                        maxLength: loginData.smsCode.maxLength,
	                        autoComplete: 'off',
	                        onChange: this.handleChangeSmsCode,
	                        onBlur: this.handleBlurSmsCode
	                    }),
	                    this.state.isSentSms ? React.createElement(
	                        Button,
	                        { className: 'smsCodeBtn fr', bsStyle: 'info', disabled: true },
	                        '\u91CD\u65B0\u83B7\u53D6\uFF08',
	                        this.state.smsSentTime,
	                        '\uFF09'
	                    ) : React.createElement(
	                        Button,
	                        { className: 'smsCodeBtn fr', bsStyle: 'info', onClick: this.sentSms },
	                        loginData.smsSentBtn.text
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'errorTips' },
	                        this.state.smsCodeTips
	                    )
	                ) : '',
	                React.createElement(
	                    'div',
	                    { className: 'inputLine' },
	                    React.createElement('input', {
	                        type: 'text',
	                        className: 'inputBtn imgCode',
	                        value: this.state.imgCode,
	                        maxLength: loginData.imgCode.maxLength,
	                        placeholder: loginData.imgCode.placeholder,
	                        autoComplete: 'off',
	                        onChange: this.handleChangeImgCode,
	                        onBlur: this.handleBlurImgCode
	                    }),
	                    React.createElement(
	                        'div',
	                        { className: 'imgCodeBtn fr', onClick: this.refreshImgCode },
	                        React.createElement('img', { className: 'imgCodeShow', src: this.state.imgCodeIcon }),
	                        React.createElement(Glyphicon, { glyph: 'repeat' })
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'errorTips' },
	                        this.state.imgCodeTips
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'inputLine' },
	                    React.createElement(UICheckBox, { s: this.state.isCheckBox ? true : false, onClick: this.checkUseInfo }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u8BB0\u4F4F\u5BC6\u7801'
	                    )
	                ),
	                React.createElement(
	                    Button,
	                    { className: 'submit', bsStyle: 'primary', onClick: this.submit },
	                    '\u767B\u5F55'
	                )
	            ),
	            this.state.showTips.type === -1 ? React.createElement(SystemTips, { className: this.state.showTips.className, text: this.state.showTips.text, onCancel: this.closeTips, btns: [{ text: '确定', type: 0 }] }) : '',
	            this.props.children
	        );
	    };
	
	    return Login;
	}(React.Component);
	
	module.exports = Login;

/***/ })

});
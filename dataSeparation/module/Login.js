/**
 * Created by hqer on 2016/12/12.
 */
const React = require('react');
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const MD5 = require( 'md5');
const hashHistory = require('react-router').hashHistory;

const CheckFun = require('../config/checkFun');
const Fetch = require('../config/fetch');
const UICheckBox = require('../componentUI/js/CheckBox');
const SystemTips = require('../componentUI/js/SystemTips');

const loginData = window.GLOBAL.pageData.login;
const systemError = window.GLOBAL.pageData.systemError;
const header = window.GLOBAL.pageData.header;

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            userName:'',
            userNameTips:'',
            password:'',
            passwordTips:'',
            smsCode:'',
            smsCodeTips:'',
            imgCode:'',
            imgCodeTips:'',
            isCheckBox:false,
            showTips:{type:0,text:'',className:''},
            isSentSms:false,
            smsSentTime:loginData.smsSentBtn.times,
            imgCodeIcon:`${loginData.imgCode.action}?${new Date().getTime()}`,
            status:sessionStorage.getItem('loginStatus') ? sessionStorage.getItem('loginStatus') * 1 : 0
        };
        this.checkUseInfo = this.checkUseInfo.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleBlurUserName = this.handleBlurUserName.bind(this);
        this.handleChangePassWord = this.handleChangePassWord.bind(this);
        this.handleBlurPassWord = this.handleBlurPassWord.bind(this);
        this.handleChangeSmsCode = this.handleChangeSmsCode.bind(this);
        this.handleBlurSmsCode = this.handleBlurSmsCode.bind(this);
        this.handleChangeImgCode = this.handleChangeImgCode.bind(this);
        this.handleBlurImgCode = this.handleBlurImgCode.bind(this);
        this.submit = this.submit.bind(this);
        this.sentSms = this.sentSms.bind(this);
        this.refreshImgCode = this.refreshImgCode.bind(this);
        this.closeTips = this.closeTips.bind(this);
    }
    checkUseInfo () {
        let _isCheckBox = this.state.isCheckBox;
        if (_isCheckBox) {
            _isCheckBox = false;
        } else {
            _isCheckBox = true;
        }
        this.setState({isCheckBox:_isCheckBox});
    }
    handleChangeUserName (event) {
        const _eT = event.srcElement ? event.srcElement : event.target;
        const _val = _eT.value;
        if (/^[0-9a-zA-Z_.@]*$/.test(_val)) {
            this.setState({userName:_val});
        }
    }
    handleBlurUserName () {
        this.setState({userNameTips:CheckFun.isNotEmpty(this.state.userName,'* 用户名/邮箱/手机号码不能为空')});
    }
    handleChangePassWord (event) {
        const _eT = event.srcElement ? event.srcElement : event.target;
        const _val = _eT.value;
        if (/^[a-zA-Z0-9$#@^&_=+%<>{}?~!]*$/.test(_val)) {
            this.setState({password:_val});
        }
    }
    handleBlurPassWord () {
        this.setState({passwordTips:CheckFun.isNotEmpty(this.state.password,'* 密码不能为空')});
    }
    handleChangeSmsCode (event) {
        const _eT = event.srcElement ? event.srcElement : event.target;
        const _val = _eT.value;
        if (/^[a-zA-Z0-9]*$/.test(_val)) {
            this.setState({smsCode:_val});
        }
    }
    handleBlurSmsCode () {
        this.setState({smsCodeTips:CheckFun.isSmsCode(this.state.smsCode,loginData.smsCode.maxLength)});
    }
    handleChangeImgCode (event) {
        const _eT = event.srcElement ? event.srcElement : event.target;
        const _val = _eT.value;
        if (/^[a-zA-Z0-9]*$/.test(_val)) {
            this.setState({imgCode:_val});
        }
    }
    handleBlurImgCode () {
        this.setState({imgCodeTips:CheckFun.isImgCode(this.state.imgCode,loginData.imgCode.maxLength)});
    }
    submit () {
        const _status = this.state.status;
        if (_status === 0) {
            if (CheckFun.isCheckLogUserName(this.state.userName)) {
                this.setState({userNameTips:CheckFun.isCheckLogUserName(this.state.userName)});
            } else if (CheckFun.isPwd(this.state.password)) {
                this.setState({passwordTips:CheckFun.isPwd(this.state.password)});
            } else if (CheckFun.isImgCode(this.state.imgCode,loginData.imgCode.maxLength)) {
                this.setState({imgCodeTips:CheckFun.isImgCode(this.state.imgCode,loginData.imgCode.maxLength)});
            } else {
                setMaxDigits(130);
                const _key = new RSAKeyPair('10001','',window.GLOBAL.key);
                Fetch.set(loginData.submit.action,{
                    method: 'POST',
                    cache: 'no-cache',
                    body: JSON.stringify({
                        userName:encryptedString(_key,encodeURIComponent(this.state.userName)),
                        password:encryptedString(_key,encodeURIComponent(this.state.password)),
                        imgCode:encryptedString(_key,encodeURIComponent(this.state.imgCode)),
                        isCheck:this.state.isCheckBox ? 1 : 0,
                        key:MD5(`${GLOBAL.userName + this.state.password + this.state.imgCode + this.state.token}devPortal`)
                    })
                }).then((r) => {
                    if (!r.code && r.errorTips) {
                        this.setState({showTips:{type:-1,text:r.errorTips}});
                    } else if (r.code && r.resultCode) {
                        if (r.resultCode === '200') {
                            sessionStorage.removeItem('loginStatus');
                            sessionStorage.setItem('devPortalUid', r.userId);
                            window.GLOBAL.userId = r.userId;
                            this.setState({status:0});
                            Fetch.set(header.action,{
                                method: 'POST',
                                cache: 'no-cache',
                                body: JSON.stringify({
                                    userId:window.GLOBAL.userId
                                })
                            }).then((r) => {
                                if (r.code) {
                                    window.GLOBAL.isLogin = r.isLogin;
                                    window.GLOBAL.userInfo = r.userInfo;
                                    hashHistory.push('/workBench');
                                }
                            });
                        } else {
                            const _newTips = {
                                userName:'',
                                userNameTips:'',
                                password:'',
                                passwordTips:'',
                                imgCode:'',
                                imgCodeTips:'',
                                imgCodeIcon:`${loginData.imgCode.action}?${new Date().getTime()}`
                            };
                            sessionStorage.setItem('loginStatus', r.status);
                            _newTips.status = r.status;
                            if (r.status === 2) {
                                loginData.status.result.map((item) => {
                                    if (r.status === item.apiCode) {
                                        if (item.type === -1) {
                                            _newTips.showTips = {type:-1,text:item.text,className:item.key};
                                        }
                                    }
                                },this);
                            }
                            loginData.smsSentBtn.result.map((item) => {
                                if (r.resultCode === item.apiCode) {
                                    if (item.type === 0) {
                                        _newTips[item.key] = item.text;
                                    }
                                }
                            },this);
                            this.setState(_newTips);
                        }
                    }
                }).catch(() => {
                    this.setState({showTips:{type:-1,text:systemError['2000'].text,className:systemError['2000'].key}});
                });
            }
        } else if (_status === 3) {
            loginData.status.result.map((item) => {
                if (_status === item.apiCode) {
                    const _newTips = {};
                    if (item.type === -1) {
                        _newTips.showTips = {type:-1,text:item.text,className:item.key};
                    }
                    this.setState(_newTips);
                }
            },this);
        } else {
            if (CheckFun.isCheckLogUserName(this.state.userName)) {
                this.setState({userNameTips:CheckFun.isCheckLogUserName(this.state.userName)});
            } else if (CheckFun.isPwd(this.state.password)) {
                this.setState({passwordTips:CheckFun.isPwd(this.state.password)});
            } else if (CheckFun.isSmsCode(this.state.smsCode,loginData.smsCode.maxLength)) {
                this.setState({smsCodeTips:CheckFun.isSmsCode(this.state.smsCode,loginData.smsCode.maxLength)});
            } else if (CheckFun.isImgCode(this.state.imgCode,loginData.imgCode.maxLength)) {
                this.setState({imgCodeTips:CheckFun.isImgCode(this.state.imgCode,loginData.imgCode.maxLength)});
            } else {
                setMaxDigits(130);
                const _key = new RSAKeyPair('10001','',window.GLOBAL.key);
                Fetch.set(loginData.submit.action,{
                    method: 'POST',
                    cache: 'no-cache',
                    body: JSON.stringify({
                        userName:encryptedString(_key,encodeURIComponent(this.state.userName)),
                        password:encryptedString(_key,encodeURIComponent(this.state.password)),
                        smsCode:encryptedString(_key,encodeURIComponent(this.state.smsCode)),
                        imgCode:encryptedString(_key,encodeURIComponent(this.state.imgCode)),
                        isCheck:this.state.isCheckBox ? 1 : 0,
                        key:MD5(`${GLOBAL.userName + this.state.password + this.state.smsCode + this.state.imgCode + this.state.token}devPortal`)
                    })
                }).then((r) => {
                    if (!r.code && r.errorTips) {
                        this.setState({showTips:{type:-1,text:r.errorTips}});
                    } else if (r.code && r.resultCode) {
                        if (r.resultCode === '200') {
                            sessionStorage.removeItem('loginStatus');
                            sessionStorage.setItem('devPortalUid', r.userId);
                            window.GLOBAL.userId = r.userId;
                            this.setState({status:0});
                            Fetch.set(header.action,{
                                method: 'POST',
                                cache: 'no-cache',
                                body: JSON.stringify({
                                    userId:window.GLOBAL.userId
                                })
                            }).then((r) => {
                                if (r.code) {
                                    window.GLOBAL.isLogin = r.isLogin;
                                    window.GLOBAL.userInfo = r.userInfo;
                                    hashHistory.push('/workBench');
                                }
                            });
                        } else {
                            const _newTips = {
                                userName:'',
                                userNameTips:'',
                                password:'',
                                passwordTips:'',
                                smsCode:'',
                                smsCodeTips:'',
                                imgCode:'',
                                imgCodeTips:'',
                                imgCodeIcon:`${loginData.imgCode.action}?${new Date().getTime()}`
                            };
                            sessionStorage.setItem('loginStatus', r.status);
                            _newTips.status = r.status;
                            if (r.status === 2) {
                                loginData.status.result.map((item) => {
                                    if (r.status === item.apiCode) {
                                        if (item.type === -1) {
                                            _newTips.showTips = {type:-1,text:item.text,className:item.key};
                                        }
                                    }
                                },this);
                            }
                            loginData.smsSentBtn.result.map((item) => {
                                if (r.resultCode === item.apiCode) {
                                    if (item.type === 0) {
                                        _newTips[item.key] = item.text;
                                    }
                                }
                            },this);
                            this.setState(_newTips);
                        }
                    }
                }).catch(() => {
                    this.setState({showTips:{type:-1,text:systemError['2000'].text,className:systemError['2000'].key}});
                });
            }
        }
    }
    sentSms () {
        const _userNameTips = CheckFun.isCheckLogUserName(this.state.userName);
        if (_userNameTips) {
            this.setState({userNameTips:_userNameTips});
        } else {
            Fetch.set(loginData.smsSentBtn.action,{
                method: 'POST',
                cache: 'no-cache',
                body: JSON.stringify({
                    userName:this.state.userName
                })
            }).then((r) => {
                if (!r.code && r.errorTips) {
                    this.setState({showTips:{type:-1,text:r.errorTips}});
                } else if (r.code && r.resultCode) {
                    const _newTips = {};
                    loginData.smsSentBtn.result.map((item) => {
                        if (r.resultCode === item.apiCode) {
                            if (r.resultCode === '200') {
                                _newTips.isSentSms = true;
                                window.GLOBAL.timer.sendSms = window.setInterval(() => {
                                    let _smsSentTime = this.state.smsSentTime;
                                    _smsSentTime = _smsSentTime - 1;
                                    if (_smsSentTime === 0) {
                                        this.setState({smsSentTime:loginData.smsSentBtn.times,isSentSms:false});
                                        clearInterval(window.GLOBAL.timer.sendSms);
                                        delete window.GLOBAL.timer.sendSms;
                                    } else {
                                        this.setState({smsSentTime:_smsSentTime});
                                    }
                                },1000);
                            }
                            if (item.type === 0) {
                                _newTips[item.key] = item.text;
                            }
                        }
                    },this);
                    this.setState(_newTips);
                }
            }).catch(() => {
                this.setState({showTips:{type:-1,text:systemError['2000'].text,className:systemError['2000'].key}});
            });
        }
    }
    refreshImgCode () {
        this.setState({imgCodeTips:'',imgCode:'',imgCodeIcon:`${loginData.imgCode.action}?${new Date().getTime()}`});
    }
    closeTips () {
        this.setState({showTips:{type:0,text:'',className:''}});
    }
    render () {
        return (
            <div className='login'>
                <div className='loginInputArea'>
                    <div className='title fl'>登录</div>
                    <div className='inputLine'>
                        <input
                            type='text'
                            className='inputBtn'
                            value={this.state.userName}
                            placeholder={loginData.userName.placeholder}
                            maxLength={loginData.userName.maxLength}
                            autoComplete='off'
                            onChange={this.handleChangeUserName}
                            onBlur={this.handleBlurUserName}
                        />
                        <span className='errorTips'>{this.state.userNameTips}</span>
                    </div>
                    <div className='inputLine'>
                        <input
                            type='password'
                            className='inputBtn'
                            value={this.state.password}
                            placeholder={loginData.password.placeholder}
                            maxLength={loginData.password.maxLength}
                            autoComplete='off'
                            onChange={this.handleChangePassWord}
                            onBlur={this.handleBlurPassWord}
                        />
                        <span className='errorTips'>{this.state.passwordTips}</span>
                    </div>
                    {
                        this.state.status !== 0 ? (
                            <div className='inputLine'>
                                <input
                                    type='text'
                                    className='inputBtn smsCode'
                                    value={this.state.smsCode}
                                    placeholder={loginData.smsCode.placeholder}
                                    maxLength={loginData.smsCode.maxLength}
                                    autoComplete='off'
                                    onChange={this.handleChangeSmsCode}
                                    onBlur={this.handleBlurSmsCode}
                                />
                                {
                                    this.state.isSentSms ? (
                                        <Button className='smsCodeBtn fr' bsStyle='info' disabled>重新获取（{this.state.smsSentTime}）</Button>
                                    ) : (
                                        <Button className='smsCodeBtn fr' bsStyle='info' onClick={this.sentSms}>{loginData.smsSentBtn.text}</Button>
                                    )
                                }
                                <span className='errorTips'>{this.state.smsCodeTips}</span>
                            </div>
                        ) : ''
                    }
                    <div className='inputLine'>
                        <input
                            type='text'
                            className='inputBtn imgCode'
                            value={this.state.imgCode}
                            maxLength={loginData.imgCode.maxLength}
                            placeholder={loginData.imgCode.placeholder}
                            autoComplete='off'
                            onChange={this.handleChangeImgCode}
                            onBlur={this.handleBlurImgCode}
                        />
                        <div className='imgCodeBtn fr' onClick={this.refreshImgCode}>
                            <img className='imgCodeShow' src={this.state.imgCodeIcon} />
                            <Glyphicon glyph='repeat'/>
                        </div>
                        <span className='errorTips'>{this.state.imgCodeTips}</span>
                    </div>
                    <div className='inputLine'>
                        <UICheckBox s={this.state.isCheckBox ? true : false} onClick={this.checkUseInfo}/>
                        <span>记住密码</span>
                    </div>
                    <Button className='submit' bsStyle='primary' onClick={this.submit}>登录</Button>
                </div>
                {this.state.showTips.type === -1 ? (
                    <SystemTips className={this.state.showTips.className} text={this.state.showTips.text} onCancel={this.closeTips} btns={[{text:'确定',type:0}]}/>
                ) : ''}
                {this.props.children}
            </div>
        );
    }
}
module.exports = Login;

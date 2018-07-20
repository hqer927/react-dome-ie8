/**
 * Created by hqer on 2016/12/30.
 */
import $ from 'jquery';
module.exports = {
    isNotEmpty (_v,_tips) {
        const _val = $.trim(_v);
        if (!_val) {
            let _t = '* 输入项不能为空';
            if (typeof _tips === 'string') {
                _t = _tips;
            }
            return _t;
        }
        return '';
    },
    isCheckLogUserName (_v) {
        const _rv = this.isNotEmpty(_v,'* 用户名/邮箱/手机号码不能为空');
        if (!_rv && !(/^[0-9a-zA-Z_]{4,20}$/.test(_v) || /^([a-zA-Z0-9_\.\-])+@([a-zA-Z0-9_\.\-])+\.[a-zA-Z]{2,3}$/.test(_v))) {
            return '* 请输入正确格式的用户名/邮箱/手机号码';
        }
        return _rv;
    },
    isPhoneNum (_v) {
        const _rv = this.isNotEmpty(_v,'* 手机号码不能为空');
        if (!_rv && !/^1(3[0-9]|5[0-9]|8[0-9]|4[0-9]|7[0-9])\d{8}$/.test(_v)) {
            return '* 请输入正确的手机号码';
        }
        return _rv;
    },
    isImgCode (_v,_maxLength) {
        const _rv = this.isNotEmpty(_v,'* 图形验证码不能为空');
        if (!_rv && !(/^[0-9a-zA-Z]+$/.test(_v) && _v.length === _maxLength)) {
            return '* 请输入正确的图形验证码';
        }
        return _rv;
    },
    isSmsCode (_v,_maxLength) {
        const _rv = this.isNotEmpty(_v,'* 验证码不能为空');
        if (!_rv && !(/^[0-9a-zA-Z]+$/.test(_v) && _v.length === _maxLength)) {
            return '* 验证码错误';
        }
        return _rv;
    },
    isEmail (_v) {
        const _rv = this.isNotEmpty(_v,'* 邮箱地址不能为空');
        if (!_rv && (!/^([a-zA-Z0-9_\.])+@([a-zA-Z0-9_\.])+\.[a-zA-Z]{2,3}$/.test(_v) || _v.indexOf('._') > -1 || _v.indexOf('_.') > -1 || _v.indexOf('..') > -1 || _v.indexOf('__') > -1 || _v.slice(0,1) === '.' || _v.slice(0,1) === '_')) {
            return '* 请输入正确格式的email地址';
        }
        return _rv;
    },
    isPwd (_v) {
        const _rv = this.isNotEmpty(_v,'* 密码不能为空');
        if (!_rv && !/^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[$#@^&_=+%<>{}?~!])|(?=.*?[A-Za-z])(?=.*?[$#@^&_=+%<>{}?~!]))[\dA-Za-z$#@^&_=+%<>{}?~!]{8,20}$/.test(_v)) {
            return '* 密码格式不正确';
        }
        return _rv;
    },
    isVerifyPwd (_v,_vp) {
        const _rv = this.isNotEmpty(_v,'* 密码不能为空');
        if (!_rv && _v !== _vp) {
            return '* 密码不一致，请重新输入';
        }
        return _rv;
    }
};

/**
 * Created by hqer on 2017/12/15.
 */
const Reflux = require('reflux');
const actions = require('../actions/header');
module.exports = Reflux.createStore({
    listenables: [actions],
    init () {
        this.data = {
            isLogin: 0,
            name: '',
            unReadMail:0,
            navSelect:'index'
        };
    },
    onSetUserInfo (_obj) {
        this.data = Object.assign(this.data,_obj);
        this.trigger(this.data);
    },
    onSetUnReadMail (_num) {
        this.data.unReadMail = _num;
        this.trigger(this.data);
    },
    onSetNavSelect (_key) {
        this.data.navSelect = _key;
        this.trigger(this.data);
    }
});

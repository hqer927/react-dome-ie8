/**
 * Created by hqer on 2017/12/15.
 */
const Reflux = require('reflux');
const actions = require('../actions/left');
module.exports = Reflux.createStore({
    listenables: [actions],
    init () {
        this.data = {
            unPayOrder:0,
            unReadMail:0,
            navSelect:0
        };
    },
    onSetLeftState (_obj) {
        this.data = Object.assign(this.data,_obj);
        this.trigger(this.data);
    },
    onSetUnPayOrder (_num) {
        this.data.unPayOrder = _num;
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

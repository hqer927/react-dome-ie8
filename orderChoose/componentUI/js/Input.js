/**
 * Created by hqer on 2016/12/21.
 */
import React from 'react';
import PropTypes from 'prop-types';
class Input extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            v: this.props.v,
            isReturn:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this._setPositiveInt = this._setPositiveInt.bind(this);
        this._setNaturalNum = this._setNaturalNum.bind(this);
        this._setMoney = this._setMoney.bind(this);
        this._setNum = this._setNum.bind(this);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.v != this.state.v) {
            this.setState({v:newProps.v});
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.state.isReturn && !prevState.isReturn && typeof this.props.onBlur === 'function') {
            this.props.onBlur(this);
            this.setState({isReturn:false});
        }
    }
    _setPositiveInt (_val) {
        if (/^[1-9]\d*$/.test(_val)) {
            this.setState({v:_val * 1});
        }
    }
    _setNaturalNum (_val) {
        if (/^\d*$/.test(_val)) {
            this.setState({v:_val * 1});
        }
    }
    _setMoney (_val) {
        if (/^(\-)?(\d)*(\.)?(\d{0,2})$/.test(_val)) {
            let f = '';
            let _v = _val;
            if (_val.indexOf('-') == 0) {
                f = _val.slice(0,1);
                _v = _val.substring(1);
            }
            const re = /\d{1,3}(?=(\d{3})+$)/g;
            const n1 = _v.replace(/^(\d+)((\.\d+)?)$/,(s,s1,s2) => { return s1.replace(re,'$&,') + s2; });
            this.setState({v:f + n1});
        }
    }
    _setNum (_val) {
        if (/^(\-)?(\d)*(\.)?\d*$/.test(_val)) {
            this.setState({v:_val});
        }
    }
    handleChange (event) {
        const _eT = event.srcElement ? event.srcElement : event.target;
        const _val = _eT.value;
        if (_val === '') {
            this.setState({v:''});
        } else if (this.props.type === 'money') {
            const _newVal = _val.toString().replace(/\,/g, '');
            if (this.props.maxValue && _newVal * 1 > this.props.maxValue * 1) {
                this._setMoney(this.props.maxValue.toString());
            } else {
                this._setMoney(_newVal);
            }
        } else if (this.props.type === 'positiveInt') {
            if (this.props.maxValue && _val * 1 > this.props.maxValue * 1) {
                this._setPositiveInt(this.props.maxValue.toString());
            } else {
                this._setPositiveInt(_val);
            }
        } else if (this.props.type === 'naturalNum') {
            if (this.props.maxValue && _val * 1 > this.props.maxValue * 1) {
                this._setNaturalNum(this.props.maxValue);
            } else {
                this._setNaturalNum(_val);
            }
        } else if (this.props.type === 'number') {
            if (this.props.maxValue && _val * 1 > this.props.maxValue * 1) {
                this._setNum(this.props.maxValue);
            } else {
                this._setNum(_val);
            }
        }
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this);
        }
    }
    handleBlur (event) {
        if (this.props.type === 'money') {
            if (this.state.v) {
                if (this.state.v === '-') {
                    this.setState({v:'',isReturn:true});
                } else {
                    let _newVal = '';
                    if (typeof this.state.v === 'string') {
                        _newVal = this.state.v.replace(/\,/g, '');
                    } else {
                        _newVal = this.state.v;
                    }
                    const _newV = parseFloat(_newVal).toFixed(2);
                    this.setState({v:_newV,isReturn:true});
                }
            } else {
                if (typeof this.props.onBlur === 'function') {
                    this.props.onBlur(this,event);
                }
            }
        } else if (this.props.type === 'number') {
            if (this.state.v === '-') {
                this.setState({v:'',isReturn:true});
            } else {
                if (typeof this.props.onBlur === 'function') {
                    this.props.onBlur(this,event);
                }
            }
        } else {
            if (typeof this.props.onBlur === 'function') {
                this.props.onBlur(this);
            }
        }
    }
    handleKeyUp (event) {
        if (typeof this.props.onKeyUp === 'function') {
            this.props.onKeyUp(this,event);
        }
    }
    handleFocus (event) {
        if (typeof this.props.onFocus === 'function') {
            this.props.onFocus(this,event);
        }
    }
    render () {
        const other = Object.assign({},this.props);
        delete other.type;
        delete other.maxValue;
        delete other.v;
        return (
            <input
                {...other}
                type='text'
                value={this.state.v}
                onKeyUp={this.handleKeyUp}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
            />
        );
    }
}

Input.propTypes = {
    type: PropTypes.string.isRequired
};
Input.defaultProps = {
    type:'text',
    className:'',
    v:'',
    maxValue:''
};
module.exports = Input;

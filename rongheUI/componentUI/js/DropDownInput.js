/**
 * Created by hqer on 2017/5/16.
 */
import React from 'react';
import $ from 'jquery';
import {findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';


class DropDownInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            a:this.props.a,
            v: this.props.v,
            t:this.props.a.length && this.props.v !== '' ? this.props.a.map((n) => (n.v === this.props.v ? n.t : '')).toString().replace(/\,/g,'') : '',
            isReturn: false
        };
        this.selectItem = this.selectItem.bind(this);
        this._clickAway = this._clickAway.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.v != this.state.v && newProps.a != this.state.a) {
            this.setState({v:newProps.v,a:newProps.a,isShowList:false});
        } else if (newProps.v != this.state.v ) {
            this.setState({v:newProps.v,isShowList:false});
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.state.isReturn && !prevState.isReturn && typeof this.props.returnValue === 'function') {
            this.setState({isReturn:false});
            this.props.returnValue(this);
        }
    }
    componentWillUnmount () {
        $(document).off('click');
    }
    selectItem (_item) {
        this.setState({isShowList:false,v:_item.v,isReturn:true,t:_item.t});
    }
    _clickAway () {
        $(document).off('click').on('click',(event) => {
            const _el = findDOMNode(this);
            if ($(_el).hasClass('showUl')) {
                const _eventTarget = event.srcElement ? event.srcElement : event.target;
                if (_eventTarget !== _el && $(_el).find(_eventTarget).length == 0) {
                    let _isShowList = true;
                    let _v = '';
                    let _t = '';
                    let _isReturn = false;
                    for (let i = 0;i < this.state.a.length;i++) {
                        if (this.state.a[i].t === this.state.t) {
                            _isShowList = false;
                            _v = this.state.a[i].v;
                            _t = this.state.t;
                            _isReturn = true;
                            break;
                        }
                    }
                    if (_isShowList) {
                        for (let i = 0;i < this.state.a.length;i++) {
                            if (this.state.a[i].v === this.state.v) {
                                _isShowList = false;
                                _v = this.state.v;
                                _t = this.state.a[i].t;
                                _isReturn = true;
                                break;
                            }
                        }
                    }
                    this.setState({isShowList:_isShowList,v:_v,t:_t,isReturn:_isReturn});
                }
            }
        });
    }
    handleFocus () {
        this.setState({isShowList:true});
    }
    handleChange (e) {
        const _eT = e.srcElement ? e.srcElement : e.target;
        const _val = _eT.value;
        this.setState({t:_val});
    }
    render () {
        return (
            <div className={this.state.isShowList ? 'DropDownUI showUl' : 'DropDownUI'} onClick={this._clickAway}>
                <input
                    type='text'
                    className={this.props.className}
                    placeholder='请选择'
                    value={this.state.t}
                    onFocus={(e) => this.handleFocus(e)}
                    onChange={(e) => this.handleChange(e)}
                />
                {
                    this.state.isShowList ? (
                        <div className='DropDownListArea'>
                            <ul className='DropDownList'>
                                {this.state.a.map((n,i) => (
                                    n.t.indexOf(this.state.t) > -1 ? (
                                        <li key={i} onClick={this.selectItem.bind(this,n)}>{n.t}</li>
                                    ) : ''
                                ))}
                            </ul>
                        </div>
                    ) : ''
                }
            </div>
        );
    }
}

DropDownInput.propTypes = {
    a: PropTypes.array.isRequired
};
DropDownInput.defaultProps = {
    className:'',
    v:'',
    a:[]
};
module.exports = DropDownInput;

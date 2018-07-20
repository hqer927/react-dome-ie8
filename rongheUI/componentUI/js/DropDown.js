/**
 * Created by hqer on 2017/5/16.
 */
import React from 'react';
import $ from 'jquery';
import {findDOMNode } from 'react-dom';
import {Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';


class DropDown extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            a:this.props.a,
            v: this.props.v,
            isReturn: false
        };
        this.selectItem = this.selectItem.bind(this);
        this._clickAway = this._clickAway.bind(this);
        this.toggle = this.toggle.bind(this);
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
    selectItem (_v) {
        this.setState({isShowList:false,v:_v,isReturn:true});
    }
    _clickAway () {
        $(document).off('click').on('click',(event) => {
            const _el = findDOMNode(this);
            if ($(_el).hasClass('showUl')) {
                const _eventTarget = event.srcElement ? event.srcElement : event.target;
                if (_eventTarget !== _el && $(_el).find(_eventTarget).length == 0) {
                    this.setState({isShowList:false});
                }
            }
        });
    }
    toggle () {
        const _el = findDOMNode(this);
        $(_el).find('input').focus();
        if (this.state.isShowList) {
            this.setState({isShowList:false});
        } else {
            this.setState({isShowList:true});
        }
    }
    render () {
        return (
            <div className={this.state.isShowList ? 'DropDownUI showUl' : 'DropDownUI'} onClick={this._clickAway}>
                <input
                    type='text'
                    readOnly
                    className={this.props.className}
                    placeholder='请选择'
                    value={this.state.a.map((n) => (n.v === this.state.v ? n.t : '')).toString().replace(/\,/g,'')}
                    onClick={this.toggle}
                />
                <div className={this.state.isShowList ? 'icon top' : 'icon'}>
                    <Glyphicon glyph='chevron-down' onClick={this.toggle}/>
                </div>
                {
                    this.state.isShowList ? (
                        <div className='DropDownListArea'>
                            <ul className='DropDownList'>
                                {this.state.a.map((n,i) => (
                                    <li key={i} onClick={this.selectItem.bind(this,n.v)}>{n.t}</li>
                                ))}
                            </ul>
                        </div>
                    ) : ''
                }
            </div>
        );
    }
}

DropDown.propTypes = {
    a: PropTypes.array.isRequired
};
DropDown.defaultProps = {
    className:'',
    v:'',
    a:[]
};
module.exports = DropDown;

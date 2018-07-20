/**
 * Created by hqer on 2017/4/28.
 */
import React from 'react';
import $ from 'jquery';
import {findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

class SearchInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            v: this.props.v,
            showStatus:false,
            isReturn: false,
            isRight:true
        };
        this.selectItem = this.selectItem.bind(this);
        this._listenShowList = this._listenShowList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.checkUI = this.checkUI.bind(this);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.v != this.state.v) {
            this.setState({v:newProps.v,showStatus:false});
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.state.isReturn && !prevState.isReturn && typeof this.props.returnValue === 'function') {
            this.setState({isReturn:false});
            this.props.returnValue(this);
        }
    }
    handleChange (e) {
        const _eT = e.srcElement ? e.srcElement : e.target;
        let _isRight = this.state.isRight;
        if (this.props.a.find((n) => (n.t === _eT.value))) {
            _isRight = true;
        }
        this.setState({v:_eT.value,isRight:_isRight});
    }
    handleFocus () {
        this.setState({showStatus:true});
    }
    selectItem (_v,e) {
        this.setState({showStatus:false,v:_v,isReturn:true,isRight:true});
        e.stopPropagation();
    }
    _listenShowList () {
        $(document).off('click').on('click',(event) => {
            const _el = findDOMNode(this);
            if ($(_el).hasClass('showUl')) {
                const _eventTarget = event.srcElement ? event.srcElement : event.target;
                if (_eventTarget !== _el && $(_el).find(_eventTarget).length == 0) {
                    let _isRight = false;
                    if (this.props.a.find((n) => (n.t === this.state.v))) {
                        _isRight = true;
                    }
                    this.setState({showStatus:false,isRight:_isRight,isReturn:true});
                }
            }
        });
    }
    checkUI () {
        let isOk = true;
        if (!this.state.isRight || this.state.v === '') {
            isOk = false;
            this.setState({isRight:false});
        }
        return isOk;
    }
    componentWillUnmount () {
        $(document).off('click');
    }
    render () {
        return (
            <div className={this.state.showStatus ? 'SearchInputUI showUl' : 'SearchInputUI'} onClick={this._listenShowList}>
                <input
                    type='text'
                    className={this.props.className}
                    placeholder={this.props.placeholder}
                    maxLength={this.props.maxLength}
                    value={this.state.v}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                />
                {
                    this.state.showStatus ? (
                        <div className='SearchInputListArea'>
                            <ul className='SearchInputList'>
                                {
                                    this.props.a.map((item,i) => (
                                        item.t.indexOf(this.state.v) > -1 || this.state.v === '' ? (
                                            <li key={i} onClick={this.selectItem.bind(this,item.t,event)}>{item.t}</li>
                                        ) : '')
                                    )
                                }
                            </ul>
                        </div>
                    ) : ''
                }
                <input type='hidden' id={this.props.id} value={this.props.a.map((n) => (n.t === this.state.v ? n.v : '')).toString().replace(/\,/g,'')}/>
                <div className='errorTips'>{!this.state.isRight ? this.props.errorTips : ''}</div>
            </div>
        );
    }
}

SearchInput.propTypes = {
    a: PropTypes.array.isRequired
};
SearchInput.defaultProps = {
    className:'',
    placeholder:'',
    maxLength:'',
    v:'',
    a:[],
    errorTips:'',
    id:''
};
module.exports = SearchInput;

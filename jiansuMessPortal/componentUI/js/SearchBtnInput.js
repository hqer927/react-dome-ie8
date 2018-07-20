/**
 * Created by hqer on 2017/4/28.
 */
import React from 'react';
import $ from 'jquery';
import {findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

class SearchBtnInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            v: this.props.v,
            showStatus:false,
            isReturn: false,
            returnType:0,
            isRight:true,
            isBtnAble:false,
            list:this.props.list
        };
        this.selectItem = this.selectItem.bind(this);
        this._listenShowList = this._listenShowList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.checkUI = this.checkUI.bind(this);
        this._isClickBtn = this._isClickBtn.bind(this);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.v != this.state.v || newProps.list != this.state.list) {
            this.setState({v:newProps.v,showStatus:false,list:newProps.list});
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.state.isReturn && !prevState.isReturn && typeof this.props.returnValue === 'function') {
            this.props.returnValue(this);
            this.setState({isReturn:false});
        }
    }
    handleChange (e) {
        const _eT = e.srcElement ? e.srcElement : e.target;
        let _isReturn = false;
        let _returnType = this.state.returnType;
        if (this.state.list.length) {
            _isReturn = true;
            _returnType = 0;
        }
        let _isBtnAble = true;
        if (_eT.value === '') {
            _isBtnAble = false;
        }
        this.setState({v:_eT.value,list:[],isBtnAble:_isBtnAble,isReturn:_isReturn,returnType:_returnType});
    }
    handleFocus () {
        let _showStatus = false;
        if (this.state.list.length) {
            _showStatus = true;
        }
        this.setState({showStatus:_showStatus});
    }
    selectItem (_v,e) {
        this.setState({showStatus:false,v:_v,isReturn:true,isBtnAble:false,returnType:1});
        e.stopPropagation();
    }
    _listenShowList () {
        $(document).off('click').on('click',(event) => {
            const _el = findDOMNode(this);
            if ($(_el).hasClass('showUl')) {
                const _eventTarget = event.srcElement ? event.srcElement : event.target;
                if (_eventTarget !== _el && $(_el).find(_eventTarget).length == 0) {
                    this.setState({showStatus:false});
                }
            }
        });
    }
    _isClickBtn () {
        if (this.state.isBtnAble && typeof this.props.isClickBtn === 'function') {
            this.props.isClickBtn(this);
        }
    }
    checkUI () {
        let isOk = true;
        if (this.state.v === '') {
            isOk = false;
        }
        return isOk;
    }
    componentWillUnmount () {
        $(document).off('click');
    }
    render () {
        return (
            <div className={this.state.showStatus ? 'SearchBtnInput showUl' : 'SearchBtnInput'} onClick={this._listenShowList}>
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
                                    this.state.list.map((item,i) => (
                                        <li key={i} onClick={this.selectItem.bind(this,item,event)}>{item}</li>
                                    )
                                    )
                                }
                            </ul>
                        </div>
                    ) : ''
                }
                <div className={this.state.isBtnAble ? 'SearchBtnUI' : 'SearchBtnUI disable'} onClick={this._isClickBtn}>查询</div>
            </div>
        );
    }
}

SearchBtnInput.propTypes = {
    list: PropTypes.array.isRequired
};
SearchBtnInput.defaultProps = {
    className:'',
    placeholder:'',
    maxLength:'',
    v:'',
    list:[],
    id:''
};
module.exports = SearchBtnInput;

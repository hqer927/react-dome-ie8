/**
 * Created by hqer on 2017/4/28.
 */
import React from 'react';
import {Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

class ItemInputList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data:this.props.data,
            item:[]
        };
        this.addItem = this.addItem.bind(this);
        this._clone = this._clone.bind(this);
        this.checkAll = this.checkAll.bind(this);
    }
    componentWillMount () {
        const newData = this._clone(this.state.data);
        newData.map((listItem) => (
            listItem.map((inputItem) => (
                inputItem.errorTips = ''
            ))
        ));
        const newItem = this._clone(newData[0]);
        newItem.map((inputItem) => {
            /*            inputItem.input = Object.assign({},inputItem.input);*/
            inputItem.input.value = '';
        });
        this.setState({data:newData,item:newItem});
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.data !== this.state.data && typeof this.props.callBackFun === 'function') {
            this.props.callBackFun();
        }
    }
    _clone (oldObj) {
        if (typeof(oldObj) !== 'object' || oldObj === null) {
            return oldObj;
        }
        let newObj = {};
        if (oldObj && oldObj.constructor === Array) {
            newObj = [];
        }
        for (const i in oldObj) {
            newObj[i] = this._clone(oldObj[i]);
        }
        return newObj;
    }
    addItem () {
        if (this.checkAll()) {
            const newData = this._clone(this.state.data);
            const newItem = this._clone(this.state.item);
            newData.push(newItem);
            this.setState({data:newData});
        } else {
            return false;
        }
    }
    cutItem (i) {
        const newData = this._clone(this.state.data);
        newData.splice(i,1);
        this.setState({data:newData});
    }
    handleBlur (i,j) {
        const newData = this._clone(this.state.data);
        if (newData[i][j].input.isCheck === 1 && newData[i][j].input.value === '') {
            newData[i][j].errorTips = `* ${newData[i][j].text.replace('：','')}不能为空。`;
        } else {
            newData[i][j].errorTips = '';
        }
        this.setState({data:newData});
    }
    handleChange (i,j,e) {
        const _eT = e.srcElement ? e.srcElement : e.target;
        const _val = _eT.value;
        const newData = this._clone(this.state.data);
        if (_val) {
            newData[i][j].input.value = _val.replace(/(^\s*)|(\s*$)/g,'');
        } else {
            newData[i][j].input.value = _val;
        }
        this.setState({data:newData});
    }
    checkAll () {
        const newData = this._clone(this.state.data);
        let _isAdd = true;
        newData.map((listItem) => (
            listItem.map((inputItem) => {
                if (inputItem.input.value === '' && inputItem.input.isCheck === 1) {
                    _isAdd = false;
                    inputItem.errorTips = `* ${inputItem.text.replace('：','')}不能为空。`;
                }
            })
        ));
        if (!_isAdd) {
            this.setState({data:newData});
        }
        return _isAdd;
    }
    render () {
        return (
            <div className='itemInputListUI'>
                <ul className='itemsList'>
                    {
                        this.state.data.map((listItem,i) => (
                            <li className='itemList' key={i}>
                                <ul className='inputsList'>
                                    {
                                        listItem.map((inputItem,j) => (
                                            <li className='inputItem' key={j}>
                                                {
                                                    inputItem.text ? (
                                                        <span className='inputItemText'>{inputItem.text}</span>
                                                    ) : ''
                                                }
                                                {
                                                    inputItem.input ? (
                                                        <input
                                                            type='text'
                                                            className='inputBtn'
                                                            value={inputItem.input.value}
                                                            maxLength={inputItem.input.maxLength ? inputItem.input.maxLength : ''}
                                                            onBlur={this.handleBlur.bind(this,i,j)}
                                                            onChange={this.handleChange.bind(this,i,j)}
                                                        />
                                                    ) : ''
                                                }
                                                {
                                                    inputItem.input && inputItem.errorTips ? (
                                                        <div className='errorTips'>{inputItem.errorTips}</div>
                                                    ) : ''
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                                {
                                    i === this.state.data.length - 1 && i < this.props.maxItems - 1 ? (
                                        <Glyphicon glyph='plus' onClick={this.addItem}/>
                                    ) : ''
                                }
                                {
                                    i > 0 ? (
                                        <Glyphicon glyph='minus' onClick={this.cutItem.bind(this,i)}/>
                                    ) : ''
                                }
                            </li>
                        ))
                    }
                </ul>
                {
                    this.props.rN ? (
                        <input type='hidden' name={this.props.rN} value={JSON.stringify(this.state.data)}/>
                    ) : ''
                }
            </div>
        );
    }
}

ItemInputList.propTypes = {
    data: PropTypes.array.isRequired
};
ItemInputList.defaultProps = {
    data:[[{text:'',input:{value:'',maxLength:'',isCheck:0}}]],
    maxItems:100,
    rN:'',
    callBackFun:null
};
module.exports = ItemInputList;

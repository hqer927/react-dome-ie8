/**
 * Created by hqer on 2018/2/5.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination,Button } from 'react-bootstrap';

import InputUI from '../Input';
import DropDownUI from '../DropDown';

class PaginationArea extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            pageNow:this.props.pageNow
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this._setInputVal = this._setInputVal.bind(this);
        this._returnSize = this._returnSize.bind(this);
    }
    componentWillReceiveProps (newProps) {
         if (newProps.pageNow != this.state.pageNow) {
            this.setState({pageNow:newProps.pageNow});
        }
    }
    _setInputVal (_obj) {
        this.setState({pageNow:_obj.state.v});
    }
    handleSelect (i) {
        if (typeof this.props.returnPageInfo === 'function') {
            this.props.returnPageInfo(i,this.state.pageSize);
        }
    }
    handleSearch () {
        if (typeof this.props.returnPageInfo === 'function') {
            this.props.returnPageInfo(this.state.pageNow,this.props.pageSize);
        }
    }
    _returnSize (_v) {
        if (typeof this.props.returnPageInfo === 'function') {
            this.props.returnPageInfo(this.state.pageNow,_v);
        }
    }
    render () {
        return (
            <div className='pagination_UI'>
                {
                    this.props.pageSizeList.length > 0 ? (
                        <div className='pageSizeArea'>
                            <span className='pageText'>每页 </span>
                            <DropDownUI className='dropDown' v={this.props.pageSize} a={this.props.pageSizeList} returnValue={this._returnSize}/>
                            <span className='pageText'>条</span>
                        </div>
                    ) : ''
                }
                <Pagination
                    prev
                    next
                    items={this.props.totalPage}
                    maxButtons={this.props.maxPage}
                    activePage={this.state.pageNow}
                    onSelect={this.handleSelect}
                    className='basicPagination'/>
                <span className='pageText'>共 {this.props.totalPage}页 到第</span>
                <InputUI type='positiveInt' maxValue={this.props.totalPage} className='dropDown' v={this.state.pageNow} onBlur={this._setInputVal}/>
                <span className='pageText'>页</span>
                <Button onClick={this.handleSearch}>确定</Button>
            </div>
        );
    }
}

PaginationArea.propTypes = {
    totalPage: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    pageNow: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageSizeList: PropTypes.array.isRequired
};
PaginationArea.defaultProps = {
    totalPage:1,
    maxPage:1,
    pageNow:1,
    pageSize:10,
    pageSizeList:[{t:10,v:10},{t:30,v:30},{t:50,v:50}]
};
module.exports = PaginationArea;

/**
 * Created by hqer on 2018/2/5.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BaseTableUI from './BaseTable';
import {BasePaginationUI} from '../Pagination/index';

class BaseTablePagination extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.setPageInfo = this.setPageInfo.bind(this);
    }
    setPageInfo (_pageNum,_pageSize) {
        if (typeof this.props.getNewData === 'function') {
            this.props.getNewData(_pageNum,_pageSize);
        }
    }
    render () {
        return (
            <div className={`base_table_pagination_UI ${this.props.className}`}>
                <BaseTableUI
                    tableType={this.props.tableType}
                    key={this.props.key}
                    data={this.props.data}
                    rule={this.props.rule}
                    noDataTips={this.props.noDataTips}
                    loadingTips={this.props.loadingTips}
                    isLoading={this.props.isLoading}
                />
                <BasePaginationUI
                    totalPage={this.props.totalPage}
                    pageNow={this.props.pageNow}
                    pageSize={this.props.pageSize}
                    maxPage={this.props.maxPage}
                    pageSizeList={this.props.pageSizeList}
                    returnPageInfo={this.setPageInfo}
                />
            </div>
        );
    }
}

BaseTablePagination.propTypes = {
    tableType:PropTypes.object.isRequired,
    key:PropTypes.array.isRequired,
    data:PropTypes.array.isRequired,
    className:PropTypes.string.isRequired,
    rule:PropTypes.object.isRequired,
    isLoading:PropTypes.bool.isRequired,
    totalPage: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    pageNow: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageSizeList: PropTypes.array.isRequired
};
BaseTablePagination.defaultProps = {
    tableType:{striped:true,bordered:true,hover:true},
    key:[],
    data:[],
    className:'',
    rule:{},
    noDataTips:'暂无数据',
    loadingTips:'正在加载中，请稍后',
    isLoading:false,
    totalPage:1,
    maxPage:1,
    pageNow:1,
    pageSize:10,
    pageSizeList:[{t:10,v:10},{t:30,v:30},{t:50,v:50}]
};
module.exports = BaseTablePagination;

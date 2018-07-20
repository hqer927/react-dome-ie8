/**
 * Created by hqer on 2018/2/5.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BaseTablePaginationUI from './BaseTablePagination';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import DropDownUI from '../DropDown';

class BaseTableSearchPagination extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            items:this.props.inputs
        };
        this.setPageInfo = this.setPageInfo.bind(this);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.inputs != this.state.items) {
            this.setState({items:newProps.inputs});
        }
    }
    setPageInfo (_pageNum,_pageSize) {
        if (typeof this.props.returnPageInfo === 'function') {
            this.props.returnPageInfo(_pageNum,_pageSize);
        }
    }
    setInputItem (i,e) {
        const _eT = e.srcElement ? e.srcElement : e.target;
        const _newItems = JSON.parse(JSON.stringify(this.state.items));
        _newItems[i].value = _eT.value;
        this.setState({items:_newItems});
    }
    setDropDownItem (i,_v) {
        const _newItems = JSON.parse(JSON.stringify(this.state.items));
        _newItems[i].value = _v;
        this.setState({items:_newItems});
    }
    setDateItems () {
        console.log(111111111);
    }
    search () {
        if (typeof this.props.returnSearchData === 'function') {
            const _data = {};
            this.state.items.map((item) => {
                _data[item.key] = item.value;
            });
            this.props.returnSearchData(_data);
        }
    }
    clear () {
        if (typeof this.props.returnSearchData === 'function') {
            const _data = {};
            this.state.items.map((item) => {
                _data[item.key] = '';
            });
            this.props.returnSearchData(_data);
        }
    }
    render () {
        return (
            <div className={`base_table_search_pagination_UI ${this.props.className}`}>
                <ul className='searchBox'>
                    {
                        this.state.items.map((item,i) => (
                            <li className={`item col${i}`} key={i}>
                                <span className='itemText'>{item.text}</span>
                                {
                                    item.type === 'text' ? (
                                        <input className='itemInput' type='text' value={item.value} onChange={this.setInputItem.bind(this,i,event)}/>
                                    ) : (
                                        item.type === 'dropDown' ? (
                                            <DropDownUI className='itemInput' v={item.value} a={item.list} returnValue={this.setDropDownItem.bind(this,i)}/>
                                        ) : (
                                            item.type === 'date' ? (
                                                <DateRangePicker
                                                    startDate={item.value ? item.value.split(' - ')[0] : moment().format('YYYY-MM-DD')}
                                                    endDate={item.value ? item.value.split(' - ')[1] : moment().format('YYYY-MM-DD')}
                                                    onApply={this.setDateItems.bind(this,i)}
                                                >
                                                    <input className='itemInput' type='text' value={item.value} readOnly/>
                                                </DateRangePicker>
                                            ) : ''
                                        )
                                    )
                                }
                            </li>
                        ))
                    }
                    <li className='btnList' key={this.state.items.length}>
                        <div className='searchBtn' onClick={this.search}>查询</div>
                        {
                            this.props.inputs.findIndex((n) => (n.value !== '')) > -1 ? (
                                <div className='clearBtn' onClick={this.clear}>清除</div>
                            ) : ''
                        }
                    </li>
                </ul>
                <BaseTablePaginationUI
                    tableType={this.props.tableType}
                    key={this.props.key}
                    data={this.props.data}
                    rule={this.props.rule}
                    noDataTips={this.props.noDataTips}
                    loadingTips={this.props.loadingTips}
                    isLoading={this.props.isLoading}
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

BaseTableSearchPagination.propTypes = {
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
    pageSizeList: PropTypes.array.isRequired,
    inputs: PropTypes.array.inputs
};
BaseTableSearchPagination.defaultProps = {
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
    pageSizeList:[{t:10,v:10},{t:30,v:30},{t:50,v:50}],
    inputs:[
        {text:'aaa',type:'text',key:'',value:''},
        {text:'bbb',type:'date',key:'',value:''},
        {text:'ccc',type:'dropDown',key:'',value:'',list:[]}
    ]
};
module.exports = BaseTableSearchPagination;

/**
 * Created by hqer on 2018/2/5.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

class BaseTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.setLoading = this.setLoading.bind(this);
    }
    render () {
        return (
            <div className={`base_table_UI ${this.props.className}`}>
                <Table {...this.props.tableType} className='basic_table'>
                    <thead>
                        <tr>
                            {this.props.key.map((item,i) => (
                                <th key={i}>
                                    <div className={`td${i}`}>{item.title}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.length ? (
                            this.props.data.map((item,i) => (
                                <tr key={i}>
                                    {
                                        this.props.key.map((_key,j) => (
                                            <td key={j}>
                                                <div className={`td${j}`}>
                                                    {
                                                        this.props.rule && this.props.rule[_key.key] ? (
                                                            item[_key.key].map((rItem,z) => (
                                                                typeof this.props.rule[_key.key][rItem.key] === 'function' ? (
                                                                    <span key={z} className='LinkBtn' onClick={this.props.rule[_key.key][rItem.key].bind(this,rItem.params)}>{rItem.text}</span>
                                                                ) : (
                                                                    <span key={z} className='LinkBtn'><a href={rItem.params}>{rItem.text}</a></span>
                                                                )
                                                            ))
                                                        ) : (
                                                            <div className='show' title={item[_key.key]}>{item[_key.key]}</div>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className='no_data' colSpan={this.props.key.length}>{this.props.noDataTips}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                {
                    this.props.isLoading ? (
                        <div className='loading'>
                            <span>{this.props.loadingTips}</span>
                        </div>
                    ) : ''
                }
            </div>
        );
    }
}

BaseTable.propTypes = {
    tableType:PropTypes.object.isRequired,
    key:PropTypes.array.isRequired,
    data:PropTypes.array.isRequired,
    className:PropTypes.string.isRequired,
    rule:PropTypes.object.isRequired,
    isLoading:PropTypes.bool.isRequired
};
BaseTable.defaultProps = {
    tableType:{striped:true,bordered:true,hover:true},
    key:[],
    data:[],
    className:'',
    rule:{},
    noDataTips:'暂无数据',
    loadingTips:'正在加载中，请稍后',
    isLoading:false
};
module.exports = BaseTable;

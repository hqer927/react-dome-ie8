/**
 * Created by hqer on 2016/12/27.
 */
import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SystemTips extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handCancel = this.handCancel.bind(this);
    }
    handleClick () {
        if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit();
        }
    }
    handCancel () {
        if (typeof this.props.onCancel === 'function') {
            this.props.onCancel();
        }
    }
    render () {
        const btns = [];
        if (this.props.btns.length) {
            this.props.btns.map((element,index) => {
                btns.push(<Button key={index} bsStyle={element.type ? 'primary' : 'info'} onClick={element.type ? this.handleClick : this.handCancel}>{element.text}</Button>);
            });
        }
        return (
            <div className='tipsBg'>
                <div className={`tips ${this.props.className}`}>
                    <div className='tipsTitle'>{this.props.title}</div>
                    <div className='tipsContext'>{this.props.text}</div>
                    <div className='tipsBtnArea'>
                        {btns}
                    </div>
                </div>
            </div>
        );
    }
}

SystemTips.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text:PropTypes.string.isRequired,
    btns: PropTypes.array.isRequired
};
SystemTips.defaultProps = {
    className:'',
    title:'提示',
    text:'',
    btns:[{text:'取消',type:0},{text:'确定',type:1}]

};
module.exports = SystemTips;

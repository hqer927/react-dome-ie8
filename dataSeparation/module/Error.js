/**
 * Created by hqer on 2016/12/12.
 */
import React from 'react';

class Error extends React.Component {
    render () {
        return (
            <div className='order devDoc About'>
                <div className='whiteSpace'>
                    <div className='title'>异常错误页</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = Error;

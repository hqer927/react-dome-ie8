/**
 * Created by hqer on 2016/12/12.
 */
import React from 'react';

class notFond extends React.Component {
    render () {
        return (
            <div className='order devDoc About'>
                <div className='whiteSpace'>
                    <div className='title'>404</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = notFond;

/**
 * Created by hqer on 2016/12/12.
 */
import React from 'react';
class App extends React.Component {
    render () {
        const { header, middle ,footer } = this.props;
        return (
            <div className='pageContent'>
                {header}
                {middle}
                {footer}
            </div>
        );
    }
}
module.exports = App;

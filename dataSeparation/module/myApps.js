/**
 * Created by hqer on 2016/12/12.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class MyApps extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect("myApps");
    }
    render () {
        return (
            <div className='myServer'>
                <div className='whiteSpace'>
                    <div className='title'>我的应用</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = MyApps;

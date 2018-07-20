/**
 * Created by hqer on 2016/12/12.
 */

const React = require('react');
const actionHeader = require('../module/actions/header');
const Left = require('../module/Left');

class WorkBench extends React.Component {
    componentDidMount () {
        actionHeader.setNavSelect("workBench");
    }
    render () {
        return (
            <div className='middleBox workBench'>
                <div className='leftMenuBox'>
                    <Left/>
                </div>
                <div className='mainBox'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
module.exports = WorkBench;

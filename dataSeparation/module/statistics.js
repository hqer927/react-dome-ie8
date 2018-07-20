/**
 * Created by hqer on 2017/12/21.
 */
const React = require('react');
const actionLeft = require('../module/actions/left');

class Statistics extends React.Component {
    componentDidMount () {
        actionLeft.setNavSelect('statistics');
    }
    render () {
        return (
            <div className='testPhone'>
                <div className='whiteSpace'>
                    <div className='title'>能力统计</div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = Statistics;

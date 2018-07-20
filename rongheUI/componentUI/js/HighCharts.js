/**
 * Created by hqer on 2017/5/16.
 */
import React from 'react';
import ReactHighcharts from 'react-highcharts';
import PropTypes from 'prop-types';


class HighCharts extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            config:this.props.config
        };
        this.setConfig = this.setConfig.bind(this);
    }
    setConfig (_c) {
        this.setState({config:_c});
    }
    render () {
        return (
            <div className = 'HighChartsUI'>
                <ReactHighcharts config = {this.state.config}></ReactHighcharts>
            </div>
        );
    }
}

HighCharts.propTypes = {
    config: PropTypes.object.isRequired
};
HighCharts.defaultProps = {
    config:{}
};
module.exports = HighCharts;

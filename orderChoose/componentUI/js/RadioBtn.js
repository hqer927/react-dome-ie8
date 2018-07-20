/**
 * Created by hqer on 2017/5/17.
 */
/* import '../less/RadioBtn.less'*/

import React from 'react';
import PropTypes from 'prop-types';
class RadioBtn extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            s: this.props.s
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillReceiveProps (newProps) {
        if (newProps.s != this.state.s) {
            this.setState({s:newProps.s});
        }
    }
    handleClick () {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick();
        } else {
            if (this.state.s) {
                this.setState({s:false});
            } else {
                this.setState({s:true});
            }
        }
    }
    render () {
        const other = Object.assign({},this.props);
        delete other.v;
        delete other.s;
        delete other.style;
        return (
            <div style={this.props.style} className={this.state.s ? 'RadioUI select' : 'RadioUI'}>
                <button
                    {...other}
                    type='button'
                    className={this.props.className}
                    value={this.state.s ? this.props.v : ''}
                    onClick={this.handleClick}>
                </button>
            </div>
        );
    }
}

RadioBtn.propTypes = {
    s:PropTypes.bool.isRequired,
    v:PropTypes.string.isRequired
};
RadioBtn.defaultProps = {
    s:false,
    v:''

};
module.exports = RadioBtn;

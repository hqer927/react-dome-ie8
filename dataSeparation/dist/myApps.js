webpackJsonp([6,10],{

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(229)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(230)['default'];
	
	var _inherits = __webpack_require__(298)['default'];
	
	var React = __webpack_require__(10);
	
	var myApps = function (_React$Component) {
	    _inherits(myApps, _React$Component);
	
	    function myApps() {
	        _classCallCheck(this, myApps);
	
	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }
	
	    myApps.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            { className: 'myServer' },
	            React.createElement(
	                'div',
	                { className: 'whiteSpace' },
	                React.createElement(
	                    'div',
	                    { className: 'title' },
	                    '\u6211\u7684\u5E94\u7528'
	                )
	            ),
	            this.props.children
	        );
	    };
	
	    return myApps;
	}(React.Component); /**
	                     * Created by hqer on 2016/12/12.
	                     */
	
	
	module.exports = myApps;

/***/ })

});
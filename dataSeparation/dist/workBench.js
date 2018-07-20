webpackJsonp([4,10],{

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(229)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(230)['default'];
	
	var _inherits = __webpack_require__(298)['default'];
	
	/**
	 * Created by hqer on 2016/12/12.
	 */
	
	var React = __webpack_require__(10);
	var actionHeader = __webpack_require__(358);
	var Left = __webpack_require__(552);
	
	var WorkBench = function (_React$Component) {
	    _inherits(WorkBench, _React$Component);
	
	    function WorkBench() {
	        _classCallCheck(this, WorkBench);
	
	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }
	
	    WorkBench.prototype.componentWillMount = function componentWillMount() {
	        actionHeader.setNavSelect("workBench");
	    };
	
	    WorkBench.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            { className: 'workBench' },
	            React.createElement(
	                'div',
	                { className: 'whiteSpace' },
	                React.createElement(
	                    'div',
	                    { className: 'title' },
	                    '\u6846\u67B6'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'leftMenuBox' },
	                    React.createElement(Left, null)
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'mainBox' },
	                    this.props.children
	                )
	            )
	        );
	    };
	
	    return WorkBench;
	}(React.Component);
	
	module.exports = WorkBench;

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = __webpack_require__(229)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(230)['default'];
	
	var _inherits = __webpack_require__(298)['default'];
	
	var React = __webpack_require__(10);
	
	var Left = function (_React$Component) {
	    _inherits(Left, _React$Component);
	
	    function Left() {
	        _classCallCheck(this, Left);
	
	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }
	
	    Left.prototype.render = function render() {
	        return React.createElement(
	            'div',
	            { className: 'leftMenu' },
	            React.createElement(
	                'div',
	                { className: 'whiteSpace' },
	                React.createElement(
	                    'div',
	                    { className: 'title' },
	                    '\u5DE6\u4FA7\u5BFC\u822A\u680F'
	                )
	            )
	        );
	    };
	
	    return Left;
	}(React.Component); /**
	                     * Created by hqer on 2016/12/12.
	                     */
	
	
	module.exports = Left;

/***/ })

});
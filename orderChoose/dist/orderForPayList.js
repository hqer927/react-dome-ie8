webpackJsonp([4,6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(431);


/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _JSON$stringify = __webpack_require__(195)['default'];
	
	var _Object$assign = __webpack_require__(3)['default'];
	
	var _classCallCheck = __webpack_require__(231)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(232)['default'];
	
	var _inherits = __webpack_require__(233)['default'];
	
	/**
	 * Created by hqer on 2017/3/28.
	 */
	var React = __webpack_require__(40);
	var ReactDOM = __webpack_require__(192);
	var $ = __webpack_require__(193);
	var UICheckBox = __webpack_require__(427);
	var UIRadioBtn = __webpack_require__(428);
	
	var OrderForPayList = function (_React$Component) {
	    _inherits(OrderForPayList, _React$Component);
	
	    function OrderForPayList(props) {
	        _classCallCheck(this, OrderForPayList);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.state = {
	            data: JSON.parse($('#payListData').val()),
	            payBounty: 0,
	            payMoney: 0,
	            unPayTips: $('#unPayTips').html(),
	            isSubmit: false,
	            isStatistics: false
	        };
	        _this.checkbounty = _this.checkbounty.bind(_this);
	        _this.updata = _this.updata.bind(_this);
	        return _this;
	    }
	
	    OrderForPayList.prototype.updata = function updata(_data) {
	        var newData = _Object$assign({}, _data);
	        var _payMoney = newData.amount;
	        if (newData.usedBounty && newData.usedBounty * 1) {
	            _payMoney = (_payMoney * 1000 - newData.usedBounty * 1000) / 1000;
	        }
	        var _payBounty = 0;
	        if (newData.bounty.check) {
	            if (newData.bounty.amount > _payMoney) {
	                _payBounty = _payMoney;
	            } else {
	                _payBounty = newData.bounty.amount;
	            }
	            _payMoney = _payMoney - _payBounty;
	        }
	        newData.payList.map(function (item) {
	            if ((item.type === 0 || item.type === 2) && item.amount + item.credit < _payMoney) {
	                item.check = -1;
	            } else if (item.type !== 0 && item.type !== 2 && _payMoney === 0) {
	                item.check = -1;
	            } else if (item.check === -1) {
	                item.check = 0;
	            }
	        });
	        var _isSubmit = false;
	        newData.payList.map(function (item) {
	            if (item.check === 1) {
	                _isSubmit = true;
	            }
	        });
	        this.setState({ isSubmit: _isSubmit, data: newData, payBounty: _payBounty, payMoney: _payMoney, isStatistics: false });
	    };
	
	    OrderForPayList.prototype.componentWillMount = function componentWillMount() {
	        this.updata(this.state.data);
	    };
	
	    OrderForPayList.prototype.shouldComponentUpdate = function shouldComponentUpdate(newProps, newState) {
	        if (newState.isStatistics) {
	            this.updata(newState.data);
	            return false;
	        } else {
	            return true;
	        }
	    };
	
	    OrderForPayList.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
	        if (prevState.data != this.state.data) {
	            $('#payListData').val(_JSON$stringify(this.state.data));
	        }
	        if (prevState.isSubmit != this.state.isSubmit) {
	            if (this.state.isSubmit) {
	                $('#submit').removeClass('disabled');
	            } else {
	                $('#submit').addClass('disabled');
	            }
	        }
	    };
	
	    OrderForPayList.prototype.checkbounty = function checkbounty() {
	        var newData = _Object$assign({}, this.state.data);
	        if (newData.bounty.check) {
	            newData.bounty.check = 0;
	        } else {
	            newData.bounty.check = 1;
	        }
	        this.setState({ data: newData, isStatistics: true });
	    };
	
	    OrderForPayList.prototype.checkRadioItem = function checkRadioItem(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        for (var i = 0; i < newData.payList.length; i++) {
	            if (newData.payList[i].accountId === _obj.accountId && newData.payList[i].type === _obj.type) {
	                if (newData.payList[i].check === 1) {
	                    newData.payList[i].check = 0;
	                } else {
	                    newData.payList[i].check = 1;
	                }
	            } else if (newData.payList[i].accountId !== _obj.accountId && newData.payList[i].check === 1) {
	                newData.payList[i].check = 0;
	            }
	        }
	        this.setState({ data: newData, isStatistics: true });
	    };
	
	    OrderForPayList.prototype.render = function render() {
	        var _this2 = this;
	
	        return React.createElement(
	            'div',
	            { className: 'orderForPayArea' },
	            React.createElement(
	                'ul',
	                { className: 'payList' },
	                this.state.data.bounty.isUse ? React.createElement(
	                    'li',
	                    { className: 'payItem bountyCard' },
	                    React.createElement(UICheckBox, { className: 'fl', s: this.state.data.bounty.check ? true : false, v: this.state.data.bounty.amount, onClick: this.checkbounty }),
	                    React.createElement('div', { className: 'icons icon-bountyCard fl' }),
	                    React.createElement(
	                        'div',
	                        { className: 'fl leftText' },
	                        '\u4F7F\u7528\u5956\u52B1\u91D1\u62B5\u6263\uFF0C\u5956\u52B1\u91D1\u4F59\u989D',
	                        React.createElement(
	                            'font',
	                            { color: 'red' },
	                            this.state.data.bounty.amount.toFixed(3)
	                        ),
	                        '\u5143'
	                    ),
	                    this.state.data.bounty.check ? React.createElement(
	                        'div',
	                        { className: 'fr rightText' },
	                        '\u62B5\u6263',
	                        React.createElement(
	                            'font',
	                            { color: 'red' },
	                            this.state.payBounty.toFixed(3)
	                        ),
	                        '\u5143'
	                    ) : ''
	                ) : '',
	                this.state.data.payList.map(function (item, i) {
	                    return React.createElement(
	                        'li',
	                        { key: i + 1, className: item.check === 1 ? 'payItem select' : item.check === -1 ? 'payItem disabled' : 'payItem' },
	                        React.createElement(UIRadioBtn, { className: 'fl', s: item.check === 1 ? true : false, v: item.type, onClick: _this2.checkRadioItem.bind(_this2, item), disabled: item.check === -1 ? true : false }),
	                        React.createElement('div', { className: 'icons icon-payList' + item.type + ' fl' }),
	                        item.type === 0 || item.type === 2 ? React.createElement(
	                            'div',
	                            { className: 'fl leftText' },
	                            item.text,
	                            React.createElement(
	                                'font',
	                                { color: 'red' },
	                                item.amount.toFixed(3)
	                            ),
	                            '\u5143'
	                        ) : React.createElement(
	                            'div',
	                            { className: 'fl leftText' },
	                            item.text
	                        ),
	                        (item.type === 0 || item.type === 2) && item.check === -1 ? React.createElement('div', { className: 'fr rightText', dangerouslySetInnerHTML: { __html: _this2.state.unPayTips } }) : item.check === 1 ? _this2.state.data.usedBounty && _this2.state.data.usedBounty * 1 ? React.createElement(
	                            'div',
	                            { className: 'fr rightText' },
	                            '\u652F\u4ED8',
	                            React.createElement(
	                                'font',
	                                { color: 'red' },
	                                _this2.state.payMoney.toFixed(3)
	                            ),
	                            '\u5143\uFF0C',
	                            React.createElement(
	                                'font',
	                                { color: 'red' },
	                                '\u5956\u52B1\u91D1\u5DF2\u62B5\u6263',
	                                _this2.state.data.usedBounty.toFixed(3),
	                                '\u5143'
	                            )
	                        ) : React.createElement(
	                            'div',
	                            { className: 'fr rightText' },
	                            '\u652F\u4ED8',
	                            React.createElement(
	                                'font',
	                                { color: 'red' },
	                                _this2.state.payMoney.toFixed(3)
	                            ),
	                            '\u5143'
	                        ) : ''
	                    );
	                })
	            )
	        );
	    };
	
	    return OrderForPayList;
	}(React.Component);
	
	ReactDOM.render(React.createElement(OrderForPayList, null), document.getElementById('app'));

/***/ })

});
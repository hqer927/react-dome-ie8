webpackJsonp([3,8],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(431);


/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$assign = __webpack_require__(3)['default'];
	
	var _JSON$stringify = __webpack_require__(195)['default'];
	
	var _classCallCheck = __webpack_require__(231)['default'];
	
	var _possibleConstructorReturn = __webpack_require__(232)['default'];
	
	var _inherits = __webpack_require__(233)['default'];
	
	/**
	 * Created by hqer on 2018/4/20.
	 */
	var React = __webpack_require__(40);
	var ReactDOM = __webpack_require__(192);
	var $ = __webpack_require__(193);
	var Table = __webpack_require__(241).Table;
	var Glyphicon = __webpack_require__(241).Glyphicon;
	
	var UIInput = __webpack_require__(426);
	var UICheckBox = __webpack_require__(428);
	var UIRadioBtn = __webpack_require__(429);
	var UIDropDown = __webpack_require__(422);
	
	var OrderChoose = function (_React$Component) {
	    _inherits(OrderChoose, _React$Component);
	
	    function OrderChoose(props) {
	        _classCallCheck(this, OrderChoose);
	
	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
	
	        _this.state = {
	            data: _this.props.data,
	            isSubmit: false
	        };
	        _this.selectFeeTypes = _this.selectFeeTypes.bind(_this);
	        _this.showSubmitBtn = _this.showSubmitBtn.bind(_this);
	        return _this;
	    }
	
	    OrderChoose.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
	        if (prevState.data != this.state.data) {
	            $('#orderData').val(_JSON$stringify(this.state.data));
	        }
	        if (prevState.isSubmit != this.state.isSubmit) {
	            if (this.state.isSubmit) {
	                $('#submit').removeClass('disabled');
	            } else {
	                $('#submit').addClass('disabled');
	            }
	        }
	    };
	
	    OrderChoose.prototype.selectFeeTypes = function selectFeeTypes(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        if (newData.feeTypes.v !== _obj.state.v) {
	            newData.feeTypes.v = _obj.state.v;
	            newData.totalNum = '--';
	            newData.totalMoney = '--';
	            newData.list.map(function (item) {
	                if (item.check) {
	                    if (item.packageAmount.type === 1) {
	                        item.packageAmount.num = 0;
	                    }
	                    item.check = 0;
	                }
	            });
	            this.setState({ data: newData });
	        }
	    };
	
	    OrderChoose.prototype.addItem = function addItem(_obj, _j) {
	        var newData = _Object$assign({}, this.state.data);
	        var isTotalMoney = false;
	        for (var i = 0; i < newData.list.length; i++) {
	            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName && newData.list[i].packageAmount[_j].num < 99) {
	                newData.list[i].packageAmount[_j].num++;
	                for (var j = 0; j < newData.list[i].price.length; j++) {
	                    if (!newData.list[i].price[j].type) {
	                        isTotalMoney = true;
	                    }
	                }
	                break;
	            }
	        }
	        if (isTotalMoney) {
	            var totalMoney = 0;
	            newData.list.map(function (item) {
	                if (item.check) {
	                    var itemMoney = 0;
	                    item.price.map(function (price, i) {
	                        if (!price.type) {
	                            itemMoney = itemMoney + price.num * 1000 * item.packageAmount[i].num;
	                        }
	                    });
	                    if (item.btnType) {
	                        totalMoney = itemMoney;
	                    } else {
	                        totalMoney = totalMoney + itemMoney;
	                    }
	                }
	            });
	            newData.totalMoney = (totalMoney / 1000).toFixed(3);
	        } else {
	            newData.totalMoney = '--';
	        }
	        this.setState({ data: newData });
	    };
	
	    OrderChoose.prototype.cutItem = function cutItem(_obj, _j) {
	        var newData = _Object$assign({}, this.state.data);
	        var isTotalMoney = false;
	        for (var i = 0; i < newData.list.length; i++) {
	            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName && newData.list[i].packageAmount[_j].num > 1) {
	                newData.list[i].packageAmount[_j].num--;
	                for (var j = 0; j < newData.list[i].price.length; j++) {
	                    if (!newData.list[i].price[j].type) {
	                        isTotalMoney = true;
	                    }
	                }
	                break;
	            }
	        }
	        if (isTotalMoney) {
	            var totalMoney = 0;
	            newData.list.map(function (item) {
	                if (item.check) {
	                    var itemMoney = 0;
	                    item.price.map(function (price, i) {
	                        if (!price.type) {
	                            itemMoney = itemMoney + price.num * 1000 * item.packageAmount[i].num;
	                        }
	                    });
	                    if (item.btnType) {
	                        totalMoney = itemMoney;
	                    } else {
	                        totalMoney = totalMoney + itemMoney;
	                    }
	                }
	            });
	            newData.totalMoney = (totalMoney / 1000).toFixed(3);
	        } else {
	            newData.totalMoney = '--';
	        }
	        this.setState({ data: newData });
	    };
	
	    OrderChoose.prototype.returnValue = function returnValue(_obj, _j, _v) {
	        var newData = _Object$assign({}, this.state.data);
	        var isTotalMoney = false;
	        for (var i = 0; i < newData.list.length; i++) {
	            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName) {
	                newData.list[i].packageAmount[_j].num = _v.state.v;
	                for (var j = 0; j < newData.list[i].price.length; j++) {
	                    if (!newData.list[i].price[j].type) {
	                        isTotalMoney = true;
	                    }
	                }
	                break;
	            }
	        }
	        if (isTotalMoney) {
	            var totalMoney = 0;
	            newData.list.map(function (item) {
	                if (item.check) {
	                    var itemMoney = 0;
	                    item.price.map(function (price, i) {
	                        if (!price.type) {
	                            itemMoney = itemMoney + price.num * 1000 * item.packageAmount[i].num;
	                        }
	                    });
	                    if (item.btnType) {
	                        totalMoney = itemMoney;
	                    } else {
	                        totalMoney = totalMoney + itemMoney;
	                    }
	                }
	            });
	            newData.totalMoney = (totalMoney / 1000).toFixed(3);
	        } else {
	            newData.totalMoney = '--';
	        }
	        this.setState({ data: newData });
	    };
	
	    OrderChoose.prototype.checkRadioItem = function checkRadioItem(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        var isTotalMoney = false;
	        for (var i = 0; i < newData.list.length; i++) {
	            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName) {
	                if (newData.list[i].check) {
	                    newData.list[i].check = 0;
	                } else {
	                    newData.list[i].check = 1;
	                }
	                for (var j = 0; j < newData.list[i].price.length; j++) {
	                    if (!newData.list[i].price[j].type) {
	                        isTotalMoney = true;
	                    }
	                }
	                for (var _j2 = 0; _j2 < newData.list[i].packageAmount.length; _j2++) {
	                    if (newData.list[i].check) {
	                        if (newData.list[i].packageAmount[_j2].type === 1 && !newData.list[i].packageAmount[_j2].num) {
	                            newData.list[i].packageAmount[_j2].num = 1;
	                        }
	                    } else {
	                        if (newData.list[i].packageAmount[_j2].type === 1 && newData.list[i].packageAmount[_j2].num) {
	                            newData.list[i].packageAmount[_j2].num = 0;
	                        }
	                    }
	                }
	            } else if (newData.list[i].check) {
	                newData.list[i].check = 0;
	                for (var _j3 = 0; _j3 < newData.list[i].packageAmount.length; _j3++) {
	                    if (newData.list[i].packageAmount[_j3].type === 1 && newData.list[i].packageAmount[_j3].num) {
	                        newData.list[i].packageAmount[_j3].num = 0;
	                    }
	                }
	            }
	        }
	        if (isTotalMoney) {
	            var totalMoney = 0;
	            newData.list.map(function (item) {
	                if (item.check) {
	                    var itemMoney = 0;
	                    item.price.map(function (price, i) {
	                        if (!price.type) {
	                            itemMoney = itemMoney + price.num * 1000 * item.packageAmount[i].num;
	                        }
	                    });
	                    if (item.btnType) {
	                        totalMoney = itemMoney;
	                    } else {
	                        totalMoney = totalMoney + itemMoney;
	                    }
	                }
	            });
	            newData.totalMoney = (totalMoney / 1000).toFixed(3);
	        } else {
	            newData.totalMoney = '--';
	        }
	        this.setState({ data: newData });
	    };
	
	    OrderChoose.prototype.checkBoxItem = function checkBoxItem(_obj) {
	        var newData = _Object$assign({}, this.state.data);
	        var isTotalMoney = false;
	        for (var i = 0; i < newData.list.length; i++) {
	            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName) {
	                if (newData.list[i].check) {
	                    newData.list[i].check = 0;
	                } else {
	                    newData.list[i].check = 1;
	                }
	                for (var j = 0; j < newData.list[i].price.length; j++) {
	                    if (!newData.list[i].price[j].type) {
	                        isTotalMoney = true;
	                    }
	                    if (newData.list[i].check && newData.list[i].packageAmount[j].type === 1 && !newData.list[i].packageAmount[j].num) {
	                        newData.list[i].packageAmount[j].num = 1;
	                    }
	                }
	                break;
	            }
	        }
	        if (isTotalMoney) {
	            var totalMoney = 0;
	            newData.list.map(function (item) {
	                if (item.check) {
	                    var itemMoney = 0;
	                    item.price.map(function (price, i) {
	                        if (!price.type) {
	                            itemMoney = itemMoney + price.num * 1000 * item.packageAmount[i].num;
	                        }
	                    });
	                    if (item.btnType) {
	                        totalMoney = itemMoney;
	                    } else {
	                        totalMoney = totalMoney + itemMoney;
	                    }
	                }
	            });
	            newData.totalMoney = (totalMoney / 1000).toFixed(3);
	        } else {
	            newData.totalMoney = '--';
	        }
	        this.setState({ data: newData });
	    };
	
	    OrderChoose.prototype.showSubmitBtn = function showSubmitBtn() {
	        if (this.state.isSubmit) {
	            this.setState({ isSubmit: false });
	        } else {
	            this.setState({ isSubmit: true });
	        }
	    };
	
	    OrderChoose.prototype.render = function render() {
	        var _this2 = this;
	
	        var list = [];
	        this.state.data.list.map(function (item) {
	            if (item.isFeeType === _this2.state.data.feeTypes.v) {
	                list.push(item);
	            }
	        });
	        return React.createElement(
	            'div',
	            { className: 'orderChooseArea' },
	            this.state.data.packageExist ? React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'level1' },
	                    React.createElement(
	                        'div',
	                        { className: 'text fl' },
	                        '\u8BA1\u8D39\u7C7B\u578B\uFF1A'
	                    ),
	                    React.createElement(UIDropDown, { className: 'InputUI fl', v: this.state.data.feeTypes.v, a: this.state.data.feeTypes.a, returnValue: this.selectFeeTypes })
	                ),
	                React.createElement(
	                    Table,
	                    { striped: true, hover: true, responsive: true, className: 'basicList fl', style: { borderTop: '1px solid #ddd' } },
	                    React.createElement(
	                        'thead',
	                        null,
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement('div', { className: 'th0' })
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th1' },
	                                    '\u5957\u9910\u540D\u79F0'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th2' },
	                                    '\u5957\u9910\u6709\u6548\u671F'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th3' },
	                                    '\u8BA1\u8D39\u70B9\u540D\u79F0'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th4' },
	                                    '\u8BA1\u8D39\u65B9\u5F0F'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th5' },
	                                    '\u89C4\u683C'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th6' },
	                                    '\u5355\u4EF7'
	                                )
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                React.createElement(
	                                    'div',
	                                    { className: 'th7' },
	                                    '\u6570\u91CF'
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'tbody',
	                        null,
	                        list.map.length ? list.map(function (item, i) {
	                            return React.createElement(
	                                'tr',
	                                { key: i },
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    item.btnType ? React.createElement(UIRadioBtn, { s: item.check ? true : false, v: item.eaPriceId, onClick: _this2.checkRadioItem.bind(_this2, item) }) : React.createElement(UICheckBox, { s: item.check ? true : false, v: item.eaPriceId, onClick: _this2.checkBoxItem.bind(_this2, item) })
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement(
	                                        'div',
	                                        { className: 'th1' },
	                                        item.eaPriceName ? item.eaPriceName : '--'
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    React.createElement(
	                                        'div',
	                                        { className: 'th2' },
	                                        item.validTime ? item.validTime : '--'
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    item.pointTypeName.length ? item.pointTypeName.map(function (e, j) {
	                                        return React.createElement(
	                                            'div',
	                                            { key: j, className: 'th3' },
	                                            e ? e : '--'
	                                        );
	                                    }) : '--'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    item.feeMode.length ? item.feeMode.map(function (e, j) {
	                                        return React.createElement(
	                                            'div',
	                                            { key: j, className: 'th4' },
	                                            e ? e : '--'
	                                        );
	                                    }) : '--'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    item.amount.length ? item.amount.map(function (e, j) {
	                                        return React.createElement(
	                                            'div',
	                                            { key: j, className: 'th5' },
	                                            e ? e : '--'
	                                        );
	                                    }) : '--'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    item.price.length ? item.price.map(function (e, j) {
	                                        return React.createElement(
	                                            'div',
	                                            { key: j, className: 'th6' },
	                                            e.text ? e.text : '--'
	                                        );
	                                    }) : '--'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    item.packageAmount.map(function (e, j) {
	                                        return React.createElement(
	                                            'div',
	                                            { key: j, className: 'th7' },
	                                            e.type === 1 ? item.check ? React.createElement(
	                                                'div',
	                                                { className: 'th7' },
	                                                React.createElement(Glyphicon, { glyph: 'minus', onClick: _this2.cutItem.bind(_this2, item, j) }),
	                                                React.createElement(UIInput, { type: 'positiveInt', className: 'InputUI', maxValue: '99', maxLength: '2', v: e.num, onBlur: _this2.returnValue.bind(_this2, item, j) }),
	                                                React.createElement(Glyphicon, { glyph: 'plus', onClick: _this2.addItem.bind(_this2, item, j) })
	                                            ) : React.createElement(
	                                                'div',
	                                                { className: 'th7' },
	                                                React.createElement(Glyphicon, { glyph: 'minus' }),
	                                                React.createElement(UIInput, { type: 'positiveInt', className: 'InputUI', maxLength: '2', disabled: true }),
	                                                React.createElement(Glyphicon, { glyph: 'plus' })
	                                            ) : e.type === 0 ? React.createElement(
	                                                'div',
	                                                { className: 'th7' },
	                                                e.num
	                                            ) : React.createElement(
	                                                'div',
	                                                { className: 'th7' },
	                                                '--'
	                                            )
	                                        );
	                                    })
	                                )
	                            );
	                        }) : React.createElement(
	                            'tr',
	                            { key: 0 },
	                            React.createElement(
	                                'td',
	                                { colSpan: '8' },
	                                '\u6682\u65E0\u6570\u636E'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'level2' },
	                    this.state.data.agreementShow ? React.createElement(UICheckBox, { className: 'fl', s: this.state.isSubmit, v: this.state.isSubmit, onClick: this.showSubmitBtn }) : '',
	                    React.createElement(
	                        'div',
	                        { className: 'box fr' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u603B\u8BA1\uFF1A'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'red' },
	                            this.state.data.totalMoney
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u5143'
	                        )
	                    )
	                )
	            ) : ''
	        );
	    };
	
	    return OrderChoose;
	}(React.Component);
	
	ReactDOM.render(React.createElement(OrderChoose, { data: JSON.parse($('#orderData').val()) }), document.getElementById('app'));

/***/ })

});
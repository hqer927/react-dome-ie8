/**
 * Created by hqer on 2017/3/28.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Table = require('react-bootstrap').Table;
const Glyphicon = require('react-bootstrap').Glyphicon;

const UIInput = require('./componentUI/js/Input');
const UICheckBox = require('./componentUI/js/CheckBox');
const UIRadioBtn = require('./componentUI/js/RadioBtn');
const UIDropDown = require('./componentUI/js/DropDown');


class OrderChoose extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: JSON.parse($('#orderData').val()),
            isSubmit:false
        };
        this.selectFeeTypes = this.selectFeeTypes.bind(this);
        this.selectFeeModes = this.selectFeeModes.bind(this);
        this.showSubmitBtn = this.showSubmitBtn.bind(this);
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.data != this.state.data) {
            $('#orderData').val(JSON.stringify(this.state.data));
        }
        if (prevState.isSubmit != this.state.isSubmit) {
            if (this.state.isSubmit) {
                $('#submit').removeClass('disabled');
            } else {
                $('#submit').addClass('disabled');
            }
        }
    }
    selectFeeTypes (_obj) {
        const newData = Object.assign({},this.state.data);
        if (newData.feeTypes.v !== _obj.state.v) {
            newData.feeTypes.v = _obj.state.v;
            newData.totalNum = '--';
            newData.totalMoney = '--';
            newData.list.map((item) => {
                if (item.check) {
                    if (item.packageAmount.type === 1) {
                        item.packageAmount.num = 0;
                    }
                    item.check = 0;
                }
            });
            this.setState({data:newData});
        }
    }
    selectFeeModes (_obj) {
        const newData = Object.assign({},this.state.data);
        if ( newData.feeModes.v !== _obj.state.v) {
            newData.feeModes.v = _obj.state.v;
            newData.totalNum = '--';
            newData.totalMoney = '--';
            newData.list.map((item) => {
                if (item.check) {
                    if (item.packageAmount.type === 1) {
                        item.packageAmount.num = 0;
                    }
                    item.check = 0;
                }
            });
            this.setState({data:newData});
        }
    }
    addItem (_obj) {
        const newData = Object.assign({},this.state.data);
        let isTotalNum = false;
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName && newData.list[i].packageAmount.num < 99) {
                newData.list[i].packageAmount.num++;
                if (!newData.list[i].amount.type) {
                    isTotalNum = true;
                }
                if (!newData.list[i].price.type) {
                    isTotalMoney = true;
                }

                break;
            }
        }
        if (isTotalNum || isTotalMoney) {
            let totalNum = 0;
            let totalMoney = 0;
            newData.list.map((item) => {
                if (isTotalNum && item.check && !item.amount.type) {
                    if (item.btnType) {
                        totalNum = item.amount.num * item.packageAmount.num;
                    } else {
                        totalNum = totalNum + item.amount.num * item.packageAmount.num;
                    }
                }
                if (isTotalMoney && item.check && !item.price.type) {
                    if (item.btnType) {
                        totalMoney = item.price.num * 1000 * item.packageAmount.num;
                    } else {
                        totalMoney = totalMoney + item.price.num * 1000 * item.packageAmount.num;
                    }
                }
            });
            if (isTotalNum) {
                newData.totalNum = totalNum;
            } else {
                newData.totalNum = '--';
            }
            if (isTotalMoney) {
                newData.totalMoney = (totalMoney / 1000).toFixed(3);
            } else {
                newData.totalMoney = '--';
            }
        }
        this.setState({data:newData});
    }
    cutItem (_obj) {
        const newData = Object.assign({},this.state.data);
        let isTotalNum = false;
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName && newData.list[i].packageAmount.num > 1) {
                newData.list[i].packageAmount.num--;
                if (!newData.list[i].amount.type) {
                    isTotalNum = true;
                }
                if (!newData.list[i].price.type) {
                    isTotalMoney = true;
                }
                break;
            }
        }
        if (isTotalNum || isTotalMoney) {
            let totalNum = 0;
            let totalMoney = 0;
            newData.list.map((item) => {
                if (isTotalNum && item.check && !item.amount.type) {
                    if (item.btnType) {
                        totalNum = item.amount.num * item.packageAmount.num;
                    } else {
                        totalNum = totalNum + item.amount.num * item.packageAmount.num;
                    }
                }
                if (isTotalMoney && item.check && !item.price.type) {
                    if (item.btnType) {
                        totalMoney = item.price.num * 1000 * item.packageAmount.num;
                    } else {
                        totalMoney = totalMoney + item.price.num * 1000 * item.packageAmount.num;
                    }
                }
            });
            if (isTotalNum) {
                newData.totalNum = totalNum;
            } else {
                newData.totalNum = '--';
            }
            if (isTotalMoney) {
                newData.totalMoney = (totalMoney / 1000).toFixed(3);
            } else {
                newData.totalMoney = '--';
            }
        }
        this.setState({data:newData});
    }
    returnValue (_obj,_v) {
        const newData = Object.assign({},this.state.data);
        let isTotalNum = false;
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName) {
                newData.list[i].packageAmount.num = _v.state.v;
                if (!newData.list[i].amount.type) {
                    isTotalNum = true;
                }
                if (!newData.list[i].price.type) {
                    isTotalMoney = true;
                }
                break;
            }
        }
        if (isTotalNum || isTotalMoney) {
            let totalNum = 0;
            let totalMoney = 0;
            newData.list.map((item) => {
                if (isTotalNum && item.check && !item.amount.type) {
                    if (item.btnType) {
                        totalNum = item.amount.num * item.packageAmount.num;
                    } else {
                        totalNum = totalNum + item.amount.num * item.packageAmount.num;
                    }
                }
                if (isTotalMoney && item.check && !item.price.type) {
                    if (item.btnType) {
                        totalMoney = item.price.num * 1000 * item.packageAmount.num;
                    } else {
                        totalMoney = totalMoney + item.price.num * 1000 * item.packageAmount.num;
                    }
                }
            });
            if (isTotalNum) {
                newData.totalNum = totalNum;
            } else {
                newData.totalNum = '--';
            }
            if (isTotalMoney) {
                newData.totalMoney = (totalMoney / 1000).toFixed(3);
            } else {
                newData.totalMoney = '--';
            }
        }
        this.setState({data:newData});
    }
    checkRadioItem (_obj) {
        const newData = Object.assign({},this.state.data);
        let isTotalNum = false;
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName) {
                if (!newData.list[i].amount.type) {
                    isTotalNum = true;
                }
                if (!newData.list[i].price.type) {
                    isTotalMoney = true;
                }
                if (newData.list[i].check) {
                    newData.list[i].check = 0;
                    if (newData.list[i].packageAmount.type === 1 && newData.list[i].packageAmount.num) {
                        newData.list[i].packageAmount.num = 0;
                    }
                } else {
                    newData.list[i].check = 1;
                    if (newData.list[i].packageAmount.type === 1 && !newData.list[i].packageAmount.num) {
                        newData.list[i].packageAmount.num = 1;
                    }
                }
            } else if (newData.list[i].check) {
                newData.list[i].check = 0;
                if (newData.list[i].packageAmount.type === 1 && newData.list[i].packageAmount.num) {
                    newData.list[i].packageAmount.num = 0;
                }
            }
        }
        if (isTotalNum || isTotalMoney) {
            let totalNum = 0;
            let totalMoney = 0;
            newData.list.map((item) => {
                if (isTotalNum && item.check && !item.amount.type) {
                    totalNum = item.amount.num * item.packageAmount.num;
                }
                if (isTotalMoney && item.check && !item.price.type) {
                    totalMoney = item.price.num * 1000 * item.packageAmount.num;
                }
            });
            if (isTotalNum) {
                newData.totalNum = totalNum;
            } else {
                newData.totalNum = '--';
            }
            if (isTotalMoney) {
                newData.totalMoney = (totalMoney / 1000).toFixed(3);
            } else {
                newData.totalMoney = '--';
            }
        }
        this.setState({data:newData});
    }
    checkBoxItem (_obj) {
        const newData = Object.assign({},this.state.data);
        let isTotalNum = false;
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName) {
                if (!newData.list[i].amount.type) {
                    isTotalNum = true;
                }
                if (!newData.list[i].price.type) {
                    isTotalMoney = true;
                }
                if (newData.list[i].check) {
                    newData.list[i].check = 0;
                } else {
                    newData.list[i].check = 1;
                    if (newData.list[i].packageAmount.type === 1 && !newData.list[i].packageAmount.num) {
                        newData.list[i].packageAmount.num = 1;
                    }
                }
                break;
            }
        }
        if (isTotalNum || isTotalMoney) {
            let totalNum = 0;
            let totalMoney = 0;
            newData.list.map((item) => {
                if (isTotalNum && item.check && !item.amount.type) {
                    totalNum = totalNum + item.amount.num * item.packageAmount.num;
                }
                if (isTotalMoney && item.check && !item.price.type) {
                    totalMoney = totalMoney + item.price.num * 1000 * item.packageAmount.num;
                }
            });
            if (isTotalNum) {
                newData.totalNum = totalNum;
            } else {
                newData.totalNum = '--';
            }
            if (isTotalMoney) {
                newData.totalMoney = (totalMoney / 1000).toFixed(3);
            } else {
                newData.totalMoney = '--';
            }
        }
        this.setState({data:newData});
    }
    showSubmitBtn () {
        if (this.state.isSubmit) {
            this.setState({isSubmit:false});
        } else {
            this.setState({isSubmit:true});
        }
    }
    render () {
        const list = [];
        this.state.data.list.map((item) => {
            if (item.feeType === this.state.data.feeTypes.v && item.feeMode === this.state.data.feeModes.v) {
                list.push(item);
            }
        });
        return (

            <div className='orderChooseArea'>
                {this.state.data.packageExist ? (
                    <div>
                        <div className='level1'>
                            <div className='text fl'>计费类型：</div>
                            <UIDropDown className='InputUI fl' v={this.state.data.feeTypes.v} a={this.state.data.feeTypes.a} returnValue={this.selectFeeTypes}/>
                            <div className='text fl'>计费方式：</div>
                            <UIDropDown className='InputUI fl' v={this.state.data.feeModes.v} a={this.state.data.feeModes.a} returnValue={this.selectFeeModes}/>
                        </div>
                        <Table striped hover responsive className='basicList fl' style={{borderTop:'1px solid #ddd'}}>
                            <thead>
                                <tr>
                                    <th><div className='th0'></div></th>
                                    <th><div className='th1'>套餐名称</div></th>
                                    <th><div className='th2'>套餐规格</div></th>
                                    <th><div className='th3'>套餐有效期</div></th>
                                    <th><div className='th4'>套餐单价</div></th>
                                    <th><div className='th5'>数量</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map.length ? (
                                        list.map((item,i) => (
                                            <tr key={i}>
                                                <td>
                                                    {item.btnType ? (
                                                        <UIRadioBtn s={item.check ? true : false} v={item.eaPriceId} onClick={this.checkRadioItem.bind(this,item)}/>
                                                    ) : (
                                                        <UICheckBox s={item.check ? true : false} v={item.eaPriceId} onClick={this.checkBoxItem.bind(this,item)}/>
                                                    )}
                                                </td>
                                                <td><div className='th1'>{item.eaPriceName}</div></td>
                                                <td>{item.amount.text.map((e,j) => (<div key={j} className='th2'>{e}</div>))}</td>
                                                <td><div className='th3'>{item.validTime}</div></td>
                                                <td>{item.price.text.map((e,j) => (<div key={j} className='th4'>{e}</div>))}</td>
                                                <td>
                                                    {
                                                        item.packageAmount.type === 1 ? (
                                                            item.check ? (
                                                                <div className='th5'>
                                                                    <Glyphicon glyph='minus' onClick={this.cutItem.bind(this,item)}/>
                                                                    <UIInput type='positiveInt' className='InputUI' maxValue='99' maxLength='2' v={item.packageAmount.num} evenKey={item} onBlur={this.returnValue.bind(this,item)}/>
                                                                    <Glyphicon glyph='plus' onClick={this.addItem.bind(this,item)}/>
                                                                </div>
                                                            ) : (
                                                                <div className='th5'>
                                                                    <Glyphicon glyph='minus'/>
                                                                    <UIInput type='positiveInt' className='InputUI' maxLength='2' disabled/>
                                                                    <Glyphicon glyph='plus'/>
                                                                </div>
                                                            )
                                                        ) : (item.packageAmount.type === 0 ? (
                                                            <div className='th5'>{item.packageAmount.num}</div>
                                                        ) : <div className='th5'>--</div>)
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr key={0}>
                                            <td colSpan='6'>暂无数据</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                        <div className='level2'>
                            {this.state.data.agreementShow ? (
                                <UICheckBox className='fl' s={this.state.isSubmit} v={this.state.isSubmit} onClick={this.showSubmitBtn}/>
                            ) : ''}
                            <div className='box fr'>
                                <span>总计：</span>
                                <span className='red'>{this.state.data.totalNum}</span>
                                <span>{list.length ? list[0].amount.unit : this.state.data.feeModes.a.map((n,i) => (n.v === this.state.data.feeModes.v ? n.t : '')).toString().replace(/\,/g,'').replace('按','')}</span>
                                <span className='red'>{this.state.data.totalMoney}</span>
                                <span>元</span>
                            </div>
                        </div>
                    </div>
                ) : ''}
            </div>
        );
    }
}

ReactDOM.render((<OrderChoose/>),document.getElementById('app'));

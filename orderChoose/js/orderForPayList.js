/**
 * Created by hqer on 2017/3/28.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const UICheckBox = require('../componentUI/js/CheckBox');
const UIRadioBtn = require('../componentUI/js/RadioBtn');


class OrderForPayList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: JSON.parse($('#payListData').val()),
            payBounty:0,
            payMoney:0,
            unPayTips:$('#unPayTips').html(),
            isSubmit:false,
            isStatistics:false
        };
        this.checkbounty = this.checkbounty.bind(this);
        this.updata = this.updata.bind(this);
    }
    updata (_data) {
        const newData = Object.assign({},_data);
        let _payMoney = newData.amount;
        if (newData.usedBounty && newData.usedBounty * 1) {
            _payMoney = (_payMoney * 1000 - newData.usedBounty * 1000) / 1000;
        }
        let _payBounty = 0;
        if (newData.bounty.check) {
            if (newData.bounty.amount > _payMoney) {
                _payBounty = _payMoney;
            } else {
                _payBounty = newData.bounty.amount;
            }
            _payMoney = _payMoney - _payBounty;
        }
        newData.payList.map((item) => {
            if ((item.type === 0 || item.type === 2) && item.amount + item.credit < _payMoney) {
                item.check = -1;
            } else if (item.type !== 0 && item.type !== 2 && _payMoney === 0) {
                item.check = -1;
            } else if (item.check === -1) {
                item.check = 0;
            }
        });
        let _isSubmit = false;
        newData.payList.map((item) => {
            if (item.check === 1) {
                _isSubmit = true;
            }
        });
        this.setState({isSubmit:_isSubmit,data:newData,payBounty:_payBounty,payMoney:_payMoney,isStatistics:false});
    }
    componentWillMount () {
        this.updata(this.state.data);
    }
    shouldComponentUpdate (newProps, newState) {
        if (newState.isStatistics) {
            this.updata(newState.data);
            return false;
        } else {
            return true;
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.data != this.state.data) {
            $('#payListData').val(JSON.stringify(this.state.data));
        }
        if (prevState.isSubmit != this.state.isSubmit) {
            if (this.state.isSubmit) {
                $('#submit').removeClass('disabled');
            } else {
                $('#submit').addClass('disabled');
            }
        }
    }
    checkbounty () {
        const newData = Object.assign({},this.state.data);
        if (newData.bounty.check) {
            newData.bounty.check = 0;
        } else {
            newData.bounty.check = 1;
        }
        this.setState({data:newData,isStatistics:true});
    }
    checkRadioItem (_obj) {
        const newData = Object.assign({},this.state.data);
        for (let i = 0;i < newData.payList.length;i++) {
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
        this.setState({data:newData,isStatistics:true});
    }
    render () {
        return (
            <div className='orderForPayArea'>
                <ul className='payList'>
                    {
                        this.state.data.bounty.isUse ? (
                            <li className='payItem bountyCard'>
                                <UICheckBox className='fl' s={this.state.data.bounty.check ? true : false} v={this.state.data.bounty.amount} onClick={this.checkbounty}/>
                                <div className='icons icon-bountyCard fl'></div>
                                <div className='fl leftText'>使用奖励金抵扣，奖励金余额<font color='red'>{this.state.data.bounty.amount.toFixed(3)}</font>元</div>
                                {
                                    this.state.data.bounty.check ? (
                                        <div className='fr rightText'>抵扣<font color='red'>{this.state.payBounty.toFixed(3)}</font>元</div>
                                    ) : ''
                                }
                            </li>
                        ) : ''
                    }
                    {
                        this.state.data.payList.map((item,i) => (
                            <li key={i + 1} className={item.check === 1 ? 'payItem select' : item.check === -1 ? 'payItem disabled' : 'payItem'}>
                                <UIRadioBtn className='fl' s={item.check === 1 ? true : false} v={item.type} onClick={this.checkRadioItem.bind(this,item)} disabled={item.check === -1 ? true : false}/>
                                <div className={`icons icon-payList${item.type} fl`} ></div>
                                {
                                    item.type === 0 || item.type === 2 ? (
                                        <div className='fl leftText'>{item.text}<font color='red'>{item.amount.toFixed(3)}</font>元</div>
                                    ) : (
                                        <div className='fl leftText'>{item.text}</div>
                                    )
                                }
                                {
                                    (item.type === 0 || item.type === 2) && item.check === -1 ? (
                                        <div className='fr rightText' dangerouslySetInnerHTML={{__html:this.state.unPayTips}}></div>
                                    ) : (
                                        item.check === 1 ? (
                                            this.state.data.usedBounty && this.state.data.usedBounty * 1 ? (
                                                <div className='fr rightText'>支付<font color='red'>{this.state.payMoney.toFixed(3)}</font>元，<font color='red'>奖励金已抵扣{this.state.data.usedBounty.toFixed(3)}元</font></div>
                                            ) : (
                                                <div className='fr rightText'>支付<font color='red'>{this.state.payMoney.toFixed(3)}</font>元</div>
                                            )
                                        ) : ''
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

ReactDOM.render((<OrderForPayList/>),document.getElementById('app'));

/**
 * Created by hqer on 2018/4/20.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Table = require('react-bootstrap').Table;
const Glyphicon = require('react-bootstrap').Glyphicon;

const UIInput = require('../componentUI/js/Input');
const UICheckBox = require('../componentUI/js/CheckBox');
const UIRadioBtn = require('../componentUI/js/RadioBtn');
const UIDropDown = require('../componentUI/js/DropDown');


class OrderChoose extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: this.props.data,
            isSubmit:false
        };
        this.selectFeeTypes = this.selectFeeTypes.bind(this);
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
    addItem (_obj,_j) {
        const newData = Object.assign({},this.state.data);
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName && newData.list[i].packageAmount[_j].num < 99) {
                newData.list[i].packageAmount[_j].num++;
                for (let j = 0;j < newData.list[i].price.length;j++) {
                    if (!newData.list[i].price[j].type) {
                        isTotalMoney = true;
                    }
                }
                break;
            }
        }
        if (isTotalMoney) {
            let totalMoney = 0;
            newData.list.map((item) => {
                if (item.check) {
                    let itemMoney = 0;
                    item.price.map((price,i) => {
                        if ( !price.type) {
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
        this.setState({data:newData});
    }
    cutItem (_obj,_j) {
        const newData = Object.assign({},this.state.data);
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName && newData.list[i].packageAmount[_j].num > 1) {
                newData.list[i].packageAmount[_j].num--;
                for (let j = 0;j < newData.list[i].price.length;j++) {
                    if (!newData.list[i].price[j].type) {
                        isTotalMoney = true;
                    }
                }
                break;
            }
        }
        if (isTotalMoney) {
            let totalMoney = 0;
            newData.list.map((item) => {
                if (item.check) {
                    let itemMoney = 0;
                    item.price.map((price,i) => {
                        if ( !price.type) {
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
        this.setState({data:newData});
    }
    returnValue (_obj,_j,_v) {
        const newData = Object.assign({},this.state.data);
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName) {
                newData.list[i].packageAmount[_j].num = _v.state.v;
                for (let j = 0;j < newData.list[i].price.length;j++) {
                    if (!newData.list[i].price[j].type) {
                        isTotalMoney = true;
                    }
                }
                break;
            }
        }
        if (isTotalMoney) {
            let totalMoney = 0;
            newData.list.map((item) => {
                if (item.check) {
                    let itemMoney = 0;
                    item.price.map((price,i) => {
                        if ( !price.type) {
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
        this.setState({data:newData});
    }
    checkRadioItem (_obj) {
        const newData = Object.assign({},this.state.data);
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName) {
                if (newData.list[i].check) {
                    newData.list[i].check = 0;
                } else {
                    newData.list[i].check = 1;
                }
                for (let j = 0;j < newData.list[i].price.length;j++) {
                    if (!newData.list[i].price[j].type) {
                        isTotalMoney = true;
                    }
                }
                for (let j = 0;j < newData.list[i].packageAmount.length;j++) {
                    if (newData.list[i].check) {
                        if (newData.list[i].packageAmount[j].type === 1 && !newData.list[i].packageAmount[j].num) {
                            newData.list[i].packageAmount[j].num = 1;
                        }
                    } else {
                        if (newData.list[i].packageAmount[j].type === 1 && newData.list[i].packageAmount[j].num) {
                            newData.list[i].packageAmount[j].num = 0;
                        }
                    }
                }
            } else if (newData.list[i].check) {
                newData.list[i].check = 0;
                for (let j = 0;j < newData.list[i].packageAmount.length;j++) {
                    if (newData.list[i].packageAmount[j].type === 1 && newData.list[i].packageAmount[j].num) {
                        newData.list[i].packageAmount[j].num = 0;
                    }
                }
            }
        }
        if (isTotalMoney) {
            let totalMoney = 0;
            newData.list.map((item) => {
                if (item.check) {
                    let itemMoney = 0;
                    item.price.map((price,i) => {
                        if ( !price.type) {
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
        this.setState({data:newData});
    }
    checkBoxItem (_obj) {
        const newData = Object.assign({},this.state.data);
        let isTotalMoney = false;
        for (let i = 0;i < newData.list.length;i++) {
            if (newData.list[i].eaPriceId === _obj.eaPriceId && newData.list[i].eaPriceName === _obj.eaPriceName) {
                if (newData.list[i].check) {
                    newData.list[i].check = 0;
                } else {
                    newData.list[i].check = 1;
                }
                for (let j = 0;j < newData.list[i].price.length;j++) {
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
            let totalMoney = 0;
            newData.list.map((item) => {
                if (item.check) {
                    let itemMoney = 0;
                    item.price.map((price,i) => {
                        if ( !price.type) {
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
            if (item.isFeeType === this.state.data.feeTypes.v) {
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
                        </div>
                        <Table striped hover responsive className='basicList fl' style={{borderTop:'1px solid #ddd'}}>
                            <thead>
                                <tr>
                                    <th><div className='th0'></div></th>
                                    <th><div className='th1'>套餐名称</div></th>
                                    <th><div className='th2'>套餐有效期</div></th>
                                    <th><div className='th3'>计费点名称</div></th>
                                    <th><div className='th4'>计费方式</div></th>
                                    <th><div className='th5'>规格</div></th>
                                    <th><div className='th6'>单价</div></th>
                                    <th><div className='th7'>数量</div></th>
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
                                                <td><div className='th1'>{item.eaPriceName ? item.eaPriceName : '--'}</div></td>
                                                <td><div className='th2'>{item.validTime ? item.validTime : '--'}</div></td>
                                                <td>{item.pointTypeName.length ? item.pointTypeName.map((e,j) => (<div key={j} className='th3'>{e ? e : '--'}</div>)) : '--'}</td>
                                                <td>{item.feeMode.length ? item.feeMode.map((e,j) => (<div key={j} className='th4'>{e ? e : '--'}</div>)) : '--'}</td>
                                                <td>{item.amount.length ? item.amount.map((e,j) => (<div key={j} className='th5'>{e ? e : '--'}</div>)) : '--'}</td>
                                                <td>{item.price.length ? item.price.map((e,j) => (<div key={j} className='th6'>{e.text ? e.text : '--'}</div>)) : '--'}</td>
                                                <td>
                                                    {
                                                        item.packageAmount.map((e,j) => (
                                                            <div key={j} className='th7'>{
                                                                e.type === 1 ? (
                                                                    item.check ? (
                                                                        <div className='th7'>
                                                                            <Glyphicon glyph='minus' onClick={this.cutItem.bind(this,item,j)}/>
                                                                            <UIInput type='positiveInt' className='InputUI' maxValue='99' maxLength='2' v={e.num} onBlur={this.returnValue.bind(this,item,j)}/>
                                                                            <Glyphicon glyph='plus' onClick={this.addItem.bind(this,item,j)}/>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='th7'>
                                                                            <Glyphicon glyph='minus'/>
                                                                            <UIInput type='positiveInt' className='InputUI' maxLength='2' disabled/>
                                                                            <Glyphicon glyph='plus'/>
                                                                        </div>
                                                                    )
                                                                ) : (e.type === 0 ? (
                                                                    <div className='th7'>{e.num}</div>
                                                                ) : <div className='th7'>--</div>)
                                                            }</div>
                                                        ))
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr key={0}>
                                            <td colSpan='8'>暂无数据</td>
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
ReactDOM.render((<OrderChoose data={JSON.parse($('#orderData').val())}/>),document.getElementById('app'));

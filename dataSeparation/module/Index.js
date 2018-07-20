/**
 * Created by hqer on 2016/12/12.
 */
const React = require('react');
const actionHeader = require('../module/actions/header');
const {BaseTableSearchPaginationUI} = require('../componentUI/js/TableList');

class Index extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            pageNow:1,
            pageSize:10,
            totalPage:1,
            data:[]
        };
        this.findDetail = this.findDetail.bind(this);
        this.findModify = this.findModify.bind(this);
        this.setPageInfo = this.setPageInfo.bind(this);
        this.setSearchData = this.setSearchData.bind(this);
    }
    componentWillMount () {
        actionHeader.setNavSelect('index');
    }
    findDetail (_obj,_p) {

    }
    findModify (_obj,_p) {

    }
    setPageInfo(_pageNum,_pageSize){

    }
    setSearchData(_data){

    }
    render () {
        return (
            <div className='order devDoc About'>
                <div className='whiteSpace'>
                    <div className='title'>首页</div>
                    <BaseTableSearchPaginationUI
                        tableType = {{striped:true,bordered:true,hover:true}}
                        key = {[{key:'name',title:'名称'},{key:'ip',title:'IP地址'},{key:'date',title:'时间'},{key:'cz',title:'操作'}]}
                        data = {this.state.data}
                        rule ={{cz:{detail:this.findDetail,modify:this.findModify}}}
                        totalPage = {this.state.totalPage}
                        maxPage = {6}
                        pageNow = {this.state.pageNow}
                        pageSize = {this.state.pageSize}
                        pageSizeList={[{t:10,v:10},{t:30,v:30},{t:50,v:50}]}
                        inputs={[
                            {text:'名称',type:'text',key:'name',value:''},
                            {text:'时间段',type:'date',key:'date',value:''},
                            {text:'状态',type:'dropDown',key:'status',value:'01',list:[{t:'状态1',v:'01'},{t:'状态2',v:'02'}]}
                        ]}
                        returnPageInfo = {this.setPageInfo}
                        returnSearchData = {this.setSearchData}
                    />
                </div>
                {this.props.children}
            </div>
        );
    }
}
module.exports = Index;

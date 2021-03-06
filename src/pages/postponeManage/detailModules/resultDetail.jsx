import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Form, Table} from '@alifd/next';

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

export default class LoanApproval extends Component {

  static displayName = 'LoanApproval';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {

  };

  componentDidMount = () => {

  };

  render() {
    const btn = (value, index, record) => {
      return <a href={record.contractUrl} download={record.contractUrl}>下载</a>;
  };
    return (
      <div>
        <IceContainer>
          <div className='contain-con'>
            <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>展期结果</p>
            <Form labelTextAlign={'right'}  {...formItemLayout} style={{marginTop: '30px'}}>
              <Table dataSource={this.props.resultDetailInfo} emptyContent="暂无数据">
                <Table.Column title='展期合同编号' align='center' dataIndex='contractNo' width='200'/>
                <Table.Column title='合同名称' align='center' dataIndex='contractName' width='300'/>
                <Table.Column title='产品名称' align='center' dataIndex='productName' width='300'/>
                <Table.Column title='客户名称' align='center' dataIndex='customerName' width='300'/>
                <Table.Column title='状态' align='center' dataIndex='contractStatusText' width='300'/>
                <Table.Column title='操作' align='center' cell={btn} width='300'/>
              </Table>
            </Form>
          </div>
        </IceContainer>
      </div>
    );
  }
}

/*const styles = {
  formItem: {
    display: 'flex',
  },
  formItemLabel: {},
  formItemError: {
    marginLeft: '10px',
  },
  formCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10,
  },
  formItemInput: {
    width: '120px',
    borderRadius: '4px',
  },
  searchBtn: {
    float: 'right',
    backgroundColor: '#fff',
    color: '#3080fe',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
  formInput: {
    border: 'none',
    // width: '200px'
  },
  formInputBorder: {
    width: '240px',
  },
  formContent: {
    width: '0px',
    border: 'none',
  },
  formTextArea: {
    width: '500px',
  }
};*/

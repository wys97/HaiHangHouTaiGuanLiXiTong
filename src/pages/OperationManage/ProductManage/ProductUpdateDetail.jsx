import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {CascaderSelect, Checkbox, Field, Form, Grid, Input, Message, Radio, Select} from '@alifd/next';
import productManageApi from '../../../api/OperationManage/ProductManage';
import '../OperationManage';

const {Row, Col} = Grid;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const FormItem = Form.Item;
const Option = Select.Option;
let selectAreaNo = [];

export default class ProductUpdateDetail extends Component {

  field = new Field(this);
  static displayName = 'ProductUpdateDetail';
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      selectProductType: [],   //产品类型-下拉框
      selectProductStatus: {}, //产品状态-下拉框
      selectProductAccountingType: {}, //核算类型-下拉框
      selectProductRepayMethod: {},  //支持的还款方式-下拉框
      repayDate: {}, // 不足月首期还款日-下拉框
      calcInterest: {}, // 首期不足月计息方式-下拉框
      selectProductRoundMethod: {},   //产品管理-整数化方法-下拉框
      selectRepaySequence: {},  //扣款顺序-下拉框
      selectPartnerInfo: [],     //产品管理-合作机构
      selectAreaInfo: [],   //产品管理-展业地区数据
      id: props.id, // 产品no
    };
  }

  componentWillMount() {
    this.getproductType();
    this.getproductStatus();
    this.getproductAccoutingType();
    this.getproductRepayMethod();
    this.getfirstRepayDate();
    this.getcalcInterest();
    this.getproductRoundMethod();
    this.getproductRepaySequence();
    this.getproductPartnerInfo();
    this.getproductAreaInfo();
  }

  componentDidMount() {
    this.getproductDetail();
  }

  getproductType = () => {      //产品管理-产品类型-下拉框
    productManageApi.productType()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            selectProductType: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getproductStatus = () => {      //产品管理-产品状态-下拉框
    productManageApi.productStatus()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            selectProductStatus: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };


  getproductAccoutingType = () => {  //产品管理-核算类型-下拉框
    productManageApi.productAccoutingType()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            selectProductAccountingType: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };


  getproductRepayMethod = () => {  //产品管理-支持的还款方式-下拉框
    productManageApi.productRepayMethod()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            selectProductRepayMethod: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getfirstRepayDate = () => { // 产品管理-不足月首期还款日-下拉框
    productManageApi.repayDate().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          repayDate: res.data.data,
        });
      } else {
        Message.error(res.data.message);
      }
    })
  };

  getcalcInterest = () => { // 产品管理-首期不足月计息方式-下拉框
    productManageApi.calcInterest().then((res) => {
      if (res.data.code === '200') {
        this.setState({
          calcInterest: res.data.data,
        });
      } else {
        Message.error(res.data.message);
      }
    })
  };

  getproductRoundMethod = () => { //产品管理-整数化方法-下拉框
    productManageApi.productRoundMethod()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            selectProductRoundMethod: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getproductRepaySequence = () => {     //产品管理-扣款顺序-下拉框
    productManageApi.productRepaySequence()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            selectRepaySequence: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getproductPartnerInfo = () => {      //产品管理-合作机构
    productManageApi.productPartnerInfo()
      .then((res) => {
        if (res.data.code === '200') {
          this.setState({
            selectPartnerInfo: res.data.data,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };


  getproductAreaInfo = () => {   //产品管理-展业地区
    productManageApi.productAreaInfo()
      .then((res) => {
        if (res.data.code === '200') {
          let selectAreaInfo = res.data.data;
          this.setState({
            selectAreaInfo,
          });
        } else {
          Message.error(res.data.message);
        }
      });
  };

  getproductDetail = () => {       //产品管理-详情
    productManageApi.productDetail(this.state.id)
      .then((res) => {
        if (res.data.code === '200') {
          this.field.setValues(res.data.data);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  productUpdate = (v, e) => {
    if (e != null) {
      return;
    }
    v.areaNo = selectAreaNo.length === 0 ? v.areaNo : selectAreaNo;
    productManageApi.productUpdate(v)
      .then((res) => {
        if (res.data.code === '200') {
          this.getproductDetail();
          Message.success(res.data.message);
        } else {
          Message.error(res.data.message);
        }
      });
  };

  selectArea = (value, data, extra) => {
    selectAreaNo = [];
    // 多选时所有被选中的数据
    extra.checkedData.map((item) => {
      selectAreaNo.push(item.value);
    });
    // 多选时半选的数据
    /* extra.indeterminateData.map((item) => {
      selectAreaNo.push(item.value);
    }); */
  };

  render() {
    return (
      <div>
        <IceContainer>
          <Form labelTextAlign={'right'}  {...formItemLayout} field={this.field}>
            <div className='contain-con'>
              <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>基本信息</p>
              <div style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请填写产品编号" label="产品编号:">
                      <p>{this.field.getValue('productNo')}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="产品状态:" required
                              requiredMessage="请选择产品状态">
                      <Select followTrigger name="productStatus" style={styles.formInputBorder}>
                        {
                          Object.keys(this.state.selectProductStatus)
                            .map((key, index) => {
                              return <Option key={index} value={key}>{this.state.selectProductStatus[key]}</Option>;
                            })
                        }
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="请选择合作机构"
                              label="合作机构:">
                      <p>{this.field.getValue('partnerNo')}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required label="合作机构名称:">
                      <p>{this.field.getValue('partnerName')}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} required requiredMessage="请输入产品名称"
                              label="产品名称:">
                      <Input style={styles.formInputBorder} name="productName" placeholder=""/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="产品类型:" required
                              requiredMessage="请选择产品类型">
                      <Select followTrigger style={styles.formInputBorder} name="productType">
                        {
                          Object.keys(this.state.selectProductType)
                            .map((key, index) => {
                              return <Option key={index} value={key}>{this.state.selectProductType[key]}</Option>;
                            })
                        }
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="产品说明:" help="">
                      <Input.TextArea style={styles.formTextArea} placeholder="" name="productDescription"/>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </div>
            <div className='contain-con'>
              <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>筛查规则参数</p>
              <div style={{marginTop: '30px'}}>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请输入金额上限" label="金额上限:">
                      <Input style={styles.formInputBorder} name="loanMaxAmount" placeholder=""/> 元
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请输入金额下限" label="金额下限:">
                      <Input style={styles.formInputBorder} name="loanMinAmount" placeholder=""/> 元
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请输入期限上限" format="number"
                              formatMessage="请输入数字" label="期限上限:">
                      <Input style={styles.formInputBorder} name="loanMaxTerm" placeholder=""/> 月
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请输入期限下限" format="number"
                              formatMessage="请输入数字" label="期限下限:">
                      <Input style={styles.formInputBorder} name="loanMinTerm" placeholder=""/> 月
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} required requiredMessage="请输入利率上限" format="number"
                              formatMessage="请输入数字" label="利率上限(月):">
                      <Input style={styles.formInputBorder} name="maxInterestRate" placeholder=""/> %
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="允许产业地区:" required
                              requiredMessage="请选择展业地区">
                      <CascaderSelect followTrigger multiple name="areaNo" dataSource={this.state.selectAreaInfo}
                                      onChange={this.selectArea}
                                      style={styles.formInputBorder} listStyle={{width: '240px', height: '256px'}}/>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </div>
            <div className='contain-con'>
              <p style={{borderBottom: '1px solid #DDD', paddingBottom: '10px'}}>配置信息</p>
              <div style={{marginTop: '30px'}}>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="核算类型:" required
                              requiredMessage="请选择核算类型">
                      <Radio.Group name="accountingType" itemDirection='ver' style={styles.formInputBorder}>
                        {
                          Object.keys(this.state.selectProductAccountingType)
                            .map((key, index) => {
                              return <Radio key={index}
                                            value={key}>{this.state.selectProductAccountingType[key]}</Radio>;
                            })
                        }
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} required requiredMessage="请输入反悔期" format="number"
                              formatMessage="请输入数字" label="反悔期:">
                      <Input style={styles.formInputBorder} name="backoutDay" placeholder=""/> 天
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem labelTextAlign='right' style={styles.formItem} label="扣款顺序:" required
                              requiredMessage="请输入扣款顺序">
                      <Radio.Group name="repaySequence" style={styles.formInputBorder}>
                        {
                          Object.keys(this.state.selectRepaySequence)
                            .map((key, index) => {
                              return <Radio key={index} value={key}>{this.state.selectRepaySequence[key]}</Radio>;
                            })
                        }
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <FormItem style={styles.formItem} required requiredMessage="请输入损失最大天数" format="number"
                              formatMessage="请输入数字" label="扣失最大天数:">
                      <Input style={styles.formInputBorder} name="debitFailDay" placeholder=""/> 天
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem
                      label="是否首期免息:"
                      required
                      requiredMessage="请选择是否首期免息"
                      style={styles.formItem}
                    >
                      <Radio.Group name="isFirstInterestFree">
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                      </Radio.Group>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建人员:">
                      <p>{this.field.getValue('creatorName')}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="创建时间:">
                      <p>{this.field.getValue('createTime')}</p>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改人员:">
                      <p>{this.field.getValue('modifierName')}</p>
                    </FormItem>
                  </Col>
                  <Col span="12">
                    <FormItem style={styles.formItem} label="修改时间:">
                      <p>{this.field.getValue('modifyTime')}</p>
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </div>
            <Form.Submit type="primary" style={styles.saveButton} validate onClick={this.productUpdate}>保存</Form.Submit>
          </Form>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
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
  formTextArea: {
    width: '500px',
  },
  saveButton: {
    float: 'left',
    borderRadius: '4px',
    marginLeft: '180px',
    width: '80px',
  },
};

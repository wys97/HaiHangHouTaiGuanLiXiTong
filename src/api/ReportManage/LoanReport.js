import axiosService from "../axios";

// 放款走势图 - 柱状图数据
export async function trend(data) {
  let dateBegin = '';
  let dateEnd = '';
  if (data.date && data.date.length > 0) {
    data.date.map((item, index) => {
      if (index) {
        dateEnd = new Date(item).Format('yyyy-MM-dd');
      } else {
        dateBegin = new Date(item).Format('yyyy-MM-dd');
      }
    })
  }
  const params = {
    productNo:data.productNo,
    dateType:data.dateType,
    isInternalEmployee: data.isInternalEmployee,
    dateEnd,
    dateBegin
  }
  return axiosService({
    url: '/admin-api/loan-report/loan-statistics',
    method: 'post',
    data:params
  });
}

// 放款统计图 - 产品下拉菜单
export async function productList() {
  return axiosService({
    url: '/admin-api/repay-report/product-list',
    method: 'post'
  });
}

// 放款期限分布
export async function periodStatistics({productNo, isInternalEmployee}) {
  if (productNo == '') {
    productNo = 'all'
  }
  if (isInternalEmployee == '') {
    isInternalEmployee = 'all'
  }
  return axiosService({
    url: '/admin-api/loan-report/period-statistics/' + productNo + "/" + isInternalEmployee,
    method: 'post'
  });
  
}

//贷款余额分布
export async function loanLeft({ productNo, isInternalEmployee }) {
  if(productNo==''){
    productNo='all'
  }
  if (isInternalEmployee == '') {
    isInternalEmployee = 'all'
  }
  return axiosService({
    url: '/admin-api/loan-report/loan-left/' + productNo + "/" + isInternalEmployee,
    method: 'post'
  });
}

export default {
  trend,
  productList,
  periodStatistics,
  loanLeft
};

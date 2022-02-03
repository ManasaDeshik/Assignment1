export const sidebarCollections = {
  dashboard: {
    title: 'Dashboard',
    routerLink: '/dashboard',
    iconBlack: '../../../../assets/img/dashboard-color.svg',
    iconBw: '../../../../assets/img/dashboard-bw.svg',
    active: false,
  },
  leadmanagement: {
    title: 'Lead Management',
    routerLink: '/lead-management',
    iconBlack: '../../../../assets/img/leads-color.svg',
    iconBw: '../../../../assets/img/leads-bw.svg',
    active: false,
    subtitle: [{
      name: 'Directory',
      active: false,
      val: '',
      value: ['']
    },
    {
      name: 'Unaware',
      active: false,
      val: 1,
      value: [1]
    },
    {
      name: 'Aware',
      active: false,
      val: 2,
      value: [2]
    },
    {
      name: 'Consider',
      active: false,
      val: 3,
      value: [3]
    },
    {
      name: 'To be Corrected',
      active: false,
      val: 4,
      value: [4]
    }]
  },
  ordermanagement: {
    title: 'Order Management ',
    routerLink: '/orders',
    iconBlack: '../../../../assets/img/order-management-color.svg',
    iconBw: '../../../../assets/img/order-managment-bw.svg',
    active: false,
    subtitle: [{
      name: 'Received',
      active: false,
      val: 0,
      value: [0]
    },
    {
      name: 'Assign to TM',
      active: false,
      val: 1,
      value: [1]
    },
    {
      name: 'Ongoing',
      active: false,
      val: 3,
      value: [3]
    },
    {
      name: 'Dispatched',
      active: false,
      val: 6,
      value: [6]
    },
    {
      name: 'Delivered',
      active: false,
      val: '4,9',
      value: [4, 9]
    },
    {
      name: 'RTS',
      active: false,
      val: 11,
      value: [11]
    },
    {
      name: 'Completed',
      active: false,
      val: 5,
      value: [5]
    },
    {
      name: 'Rejected',
      active: false,
      val: '2,7',
      value: [2, 7]
    },
    {
      name: 'Could not deliver',
      active: false,
      val: 8,
      value: [8]
    },
    {
      name: 'Hold',
      active: false,
      val: '10',
      value: [10]
    },
    ]

  },
  usermanagement: {
    title: 'User Management',
    routerLink: '/user-management',
    iconBlack: '../../../../assets/img/user-managment-color.svg',
    iconBw: '../../../../assets/img/user-managment-bw.svg',
    active: true,
  },
  'try&buymanagement': {
    title: 'Try & Buy',
    routerLink: '/try-buy',
    iconBlack: '../../../../assets/img/try-buy-color.svg',
    iconBw: '../../../../assets/img/try-buy-bw.svg',
    active: false,
  },
  productmanagement: {
    title: 'Product Management',
    routerLink: '/product-management',
    iconBlack: '../../../../assets/img/product-color.svg',
    iconBw: '../../../../assets/img/product-bw.svg',
    active: false,
  },
  villageprofile: {
    title: 'Village Profile',
    routerLink: '/branch-management',
    iconBlack: '../../../../assets/img/branch-color.svg',
    iconBw: '../../../../assets/img/branch-bw.svg'
  },
  oldorders: {
    title: 'Old Orders',
    routerLink: '/old-orders',
    iconBlack: '../../../../assets/img/order-management-color.svg',
    iconBw: '../../../../assets/img/order-managment-bw.svg'
    //iconBlack: '../../../../assets/img/order-management-color.svg',
    //iconBw: '../../../../assets/img/order-management-color.svg'
  },
  stockmanagement: {
    title: 'Stocks',
    routerLink: '/stock',
    iconBlack: '../../../../assets/img/stocks-color.svg',
    iconBw: '../../../../assets/img/stocks-bw.svg',
    active: false,
    //     subtitle: [{
    //       name:'Stock Position',
    //       active: false,
    //       value: 0,
    //       routerLink: 'stock/franchise/list-franchise'
    //     },
    //    { name:'Franchise',
    //       active: false,
    //       value: 1,
    //       routerLink: 'stock/franchise/list-franchise'
    //     },
    //     {name:'Manufacturer',
    //       active: false,
    //       value: 2,
    //       routerLink: 'stock/manufacturer/list-manufacturer'
    //     },
    //     {name:'Ongoing Transit',
    //     active: false,
    //     value: 3,
    //     routerLink: 'stock/ongoing-transit'
    //   },
    //   {name:`Ongoing Po's`,
    //   active: false,
    //   value: 4,
    //   routerLink: 'stock/ongoing-orders'
    // }]
  },
  warehousemanagememnt: {
    title: 'Warehouse Management',
    routerLink: '/branch-warehouse',
    iconBlack: '../../../../assets/img/branch-warehouse-color.svg',
    iconBw: '../../../../assets/img/branch-warehouse-bw.svg',
    active: false,
  },
  demomanagement: {
    title: 'Demo Management',
    routerLink: '/demo-management',
    iconBlack: '../../../../assets/img/product-color.svg',
    iconBw: '../../../../assets/img/product-bw.svg',
    active: false,
  },
  // servicemanagement: {
  //   title: 'Service Management',
  //   routerLink: '/service-management',
  //   iconBlack: '../../../../assets/img/order-management-color.svg',
  //   iconBw: '../../../../assets/img/order-managment-bw.svg'
  // },
  customermanagement: {
    title: 'Customer Management',
    routerLink: '/customer-management',
    iconBlack: '../../../../assets/img/order-management-color.svg',
    iconBw: '../../../../assets/img/order-managment-bw.svg',
    active: false,
    subtitle: [{
      name: 'Total Orders',
      active: false,
      val: 0,
      value: [0]
    },
    {
      name: 'New Customer',
      active: false,
      val: 1,
      value: [1]
    },
    {
      name: 'Repeat Customer',
      active: false,
      val: 2,
      value: [2],
    }]
  },
  bannermanagement: {
    title: 'Banner Management',
    routerLink: '/banner-management',
    iconBlack: '../../../../assets/img/order-management-color.svg',
    iconBw: '../../../../assets/img/order-managment-bw.svg',
    active: false,
  },
  survey: {
    title: 'Survey',
    routerLink: '/survey',
    iconBlack: '../../../../assets/img/order-management-color.svg',
    iconBw: '../../../../assets/img/order-managment-bw.svg',
    active: false,
    subtitle: [/*{
      name: 'List',
      active: false,
      val: 0,
      value: [0]
    },
    {
      name: 'Create',
      routerLink:'/survey/create-survey',
      active: false,
      val: 1,
      value: [1]
    },
    {
      name: 'Build',
      routerLink:'/survey/build-survey',
      active: false,
      val: 2,
      value: [2]
    },
    {
      name: 'Home',
      routerLink:'/survey/home-survey',
      active: false,
      val: 2,
      value: [2]
    }*/]
  },
  downloadmanagement: {
    title: 'Download Management',
    routerLink: '/download',
    iconBlack: '../../../../assets/img/download-solid-color.svg',
    iconBw: '../../../../assets/img/download-solid.svg',
    active:false
    //iconBlack: '../../../../assets/img/download-solid-color.svg',
   // iconBw: '../../../../assets/img/'
  },
  // paymentmanagement: {
  //   title: 'Payment Management',
  //   routerLink: '/payment-management',
  //   iconBlack: '../../../../assets/img/order-management-color.svg',
  //   iconBw: '../../../../assets/img/order-managment-bw.svg'
  // }
    help: {
    title: 'Help',
    routerLink: '/help',
    iconBlack: '../../../../assets/img/question-circle-regular.svg',
    iconBw: '../../../../assets/img/question-circle-regular-bw.svg'
  }

};


export class FmpDashboardRevenue {
  chartOptions = {
    chart: {
      type: 'area'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [''],
      crosshair: {
        width: 3,
        color: 'green'
      }
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0,
      minorGridLineWidth: 0,
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      },
      series: {
        animation: {
          duration: 2300
        }
      }
    },
    series: [{
      name: 'Year',
      data: [0, 1, 4, 4, 5, 2, 3, 0, 0, 0, 0, 0],
      color: '#c7e1ff',
      showInLegend: false
    }],
    lang: {
      noData: "No Data"
    },
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030'
      }
    }
  };
};

export class FmpDashboardProfit {
  chartOptions = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'Profits',
      align: 'left',
      x: 0,
      style: {
        color: '#808080'
      }
    },
    xAxis: {
      categories: [''],
      crosshair: {
        width: 3,
        color: 'green'
      }, tickmarkPlacement: 'on',
      startOnTick: true
    },
    yAxis: {
      title: {
        text: null
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      area: {
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      },
      series: {
        animation: {
          duration: 2300
        }
      }
    },
    series: [{
      name: 'Year',
      data: [0, 1, 4, 4, 5, 2, 3, 0, 0, 0, 0, 1],
      color: '#a6e8b1',
      showInLegend: false
    }],
    lang: {
      noData: "No Data"
    },
    noData: {
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030'
      }
    }
  };
}

export class NewVLEPieChart {

  chartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: '0<br>New Sahelis',
      align: 'center',
      verticalAlign: 'middle',
      y: 10,
      x: -195
    },
    credits: {
      enabled: false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    plotOptions: {
      pie: {

        showInLegend: true,
        size: 120
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 10,
      x: -250,
      y: 0,
      color: '#b9b9b9'
    },
    series: [{
      innerSize: '90%',
      showInLegend: true,
      colorByPoint: true,
      data: [{
        name: 'New Saheli’s',
        y: 0,
        color: '#2bcc71'
      }, {
        name: 'Number Of Ace',
        y: 0,
        color: '#5a51de'
      }, {
        name: 'No Of Standard',
        y: 0,
        color: '#e94c3d'
      }, {
        name: 'No Of Rookies',
        y: 0,
        color: '#f39b13'
      }]
    }]
  };
  constructor(data?: any) {
    this.chartOptions.title.text = `${data}<br>New Sahelis`;
  }
}


export class stockPieChart {
  chartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    plotOptions: {
      pie: {
        showInLegend: true,
        size: 50
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      itemMarginTop: 10,
      x: -250,
      y: 0,
      color: '#b9b9b9'
    },
    series: [{
      innerSize: '80%',
      showInLegend: true,
      colorByPoint: true,
      data: [{
        name: 'Total Stock',
        y: 10,
        color: '#94d1d6'
      }, {
        name: 'Solid',
        y: 11.84,
        color: '#005480'
      }]
    }]
  };
}

export class stocksProfit {
  chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: null
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0,
      minorGridLineWidth: 0,
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Month',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      showInLegend: false,
      color: ' #005480 '
    }]
  }
}
export const leadTableHeaderCollections = [
  // { header: 'Lead Name' },
  // { header: 'Lead Date', sortText: 'leadDate' },
  // { header: 'Updated Date' },
  // { header: 'Lead ID' },
  // { header: 'Lead Status' },
  // { header: 'Lead Tag' },
  // { header: 'Interested Product' },
  // { header: 'Other Product' },
  // { header: 'Territory Manager' },
  // { header: 'VLE ID', sortText: 'vleId' },
  // { header: 'VLE Name', sortText: 'vleName' },
  // { header: 'Branch Name', sortText: 'branchName' },
  // { header: 'State' },
  // { header: 'Mobile Number' },
  // { header: 'WhatsApp Number' },
  // { header: 'Village Name' },
  // { header: 'Customer Activity' },
  // { header: 'Customer Stage' },
  // { header: 'Type Of Phone' },
  // { header: 'Mobile Number 2' },
  // { header: 'Mobile Number 3' }
  // for new design
  { header: 'Lead ID' },
  { header: 'Date' },
  //  { header: 'Date', sortText: 'leadDate' },
  { header: 'Name' },
  { header: 'Profile Tag' },
  { header: 'Mobile No' },
  { header: 'Village Name' },
  { header: 'Village Code' },
  { header: 'Branch' },
  // { header: 'Branch', sortText: 'branchName' },
  { header: 'Delivery Day' },
  { header: 'Saheli ID' },
  { header: 'Saheli Name' },
  { header: 'TM Name' },
  { header: 'Updated Date' },
  { header: 'Stage' },
];

export const customerTableHeaderCollections = [
  { header: 'Lead ID' },
  { header: 'Name' },
  { header: 'Mobile Number' },
  { header: 'Village Name' },
  { header: 'Village Code' },
  { header: 'Branch Name', sortText: 'branchName' },
  { header: 'Delivery Day' },
  { header: 'Saheli ID' },
  { header: 'Saheli Name' },
  { header: 'TM Name' },
  { header: 'Completed Date' },
  { header: 'Product Name' },
  { header: 'Quantity' },
  { header: 'Total Value' },
  { header: 'Stage' }
];
export const leadStatusCollections = [
  {
    name: 'Try and Buy',
    value: 1
  },
  {
    name: 'Buy Later',
    value: 2
  },
  {
    name: 'Not interested',
    value: 3
  },
  {
    name: 'Buy now',
    value: 4
  }
];

export const tableLeadStatusCollections = [
  {
    name: 'All',
    value: ''
  },
  {
    name: 'Try and Buy',
    value: 1
  },
  {
    name: 'Buy Later',
    value: 2
  },
  {
    name: 'Not interested',
    value: 3
  },
  {
    name: 'Buy now',
    value: 4
  }
];
export const createEditleadStatusCollections = [
  {
    name: 'Try and Buy',
    value: 1
  },
  {
    name: 'Buy Later',
    value: 2
  },
  {
    name: 'Not interested',
    value: 3
  },
  {
    name: 'Buy now',
    value: 4
  }
];
export const leadTagCollections = [
  {
    name: 'Can become a Saheli',
    value: 1
  },
  {
    name: 'Sarpanch',
    value: 2
  },
  {
    name: 'Doctor',
    value: 3
  },
  {
    name: 'School Teacher/Principle',
    value: 4
  },
  {
    name: 'Govt. Officer',
    value: 5
  },
  {
    name: 'Others',
    value: 6
  },
  {
    name: 'SHG CRP',
    value: 7
  },
  {
    name: 'SHG Book Keeper',
    value: 8
  },
  {
    name: 'SHG leader',
    value: 9
  },
  {
    name: 'Other SHG Member',
    value: 10
  },
  {
    name: 'E-Mitra',
    value: 11
  },
  {
    name: 'Shop owner',
    value: 12
  },
  {
    name: 'Asha Worker',
    value: 13
  },
  {
    name: 'Aanganwadi',
    value: 14
  },
  {
    name: 'Farmer',
    value: 15
  }
];


export const tryBuyCollections = [
  {
    name: 'All',
    value: ''
  },
  {
    name: 'Ongoing',
    value: 0
  },
  {
    name: 'Interested to buy',
    value: 1
  },
  {
    name: 'Will buy later',
    value: 2
  },
  {
    name: 'Not interested',
    value: 3
  }
];
export const editTryBuyCollections = [
  {
    name: 'Ongoing',
    value: 0
  },
  {
    name: 'Interested to buy',
    value: 1
  },
  {
    name: 'Will buy later',
    value: 2
  },
  {
    name: 'Not interested',
    value: 3
  }
];

export const fmUserClassifications = [
  {
    name: 'Standard',
    value: '1'
  },
  {
    name: 'Rookie',
    value: '2'
  },
  {
    name: 'Ace',
    value: '3'
  },
  {
    name: 'New Bie',
    value: '4'
  }
];

export const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const weekListText = ['1st Week', '2nd Week', '3rd Week', '4th Week', '5th Week', '6th Week'];

export const quarterArray = [{
  month: 'Jan Feb Mar',
  quarterInfo: ['Jan', 'Feb', 'Mar'],
  quarter: 'Quarter 1',
  startDate: 1,
  endDate: 31,
  startMonth: 0,
  endMonth: 2
},
{
  month: 'Apr May Jun',
  quarterInfo: ['Apr', 'May', 'Jun'],
  quarter: 'Quarter 2',
  startDate: 1,
  endDate: 30,
  startMonth: 3,
  endMonth: 5
},
{
  month: 'Jul Aug Sep',
  quarterInfo: ['Jul', 'Aug', 'Sep'],
  quarter: 'Quarter 3',
  startDate: 1,
  endDate: 30,
  startMonth: 6,
  endMonth: 8
},
{
  month: 'Oct Nov Dec',
  quarterInfo: ['Oct', 'Nov', 'Dec'],
  quarter: 'Quarter 4',
  startDate: 1,
  endDate: 31,
  startMonth: 9,
  endMonth: 11
}];

export const breadcrumbCollections = {
  'try-buy': {
    labelName: 'Try Buy',
    url: '/try-buy'
  },
  'lead-management': {
    labelName: 'Leads',
    url: '/lead-management'
  },
  'create-lead': {
    labelName: 'Create Lead',
    url: '/lead-management/create-lead'
  },
  'edit-lead': {
    labelName: 'Edit Lead',
    url: '/lead-management/edit-lead/:id'
  },
  dashboard: {
    labelName: 'Dashboard',
    url: '/dashboard'
  },
  users: {
    labelName: 'Users',
    url: '/user-management'
  },
  roles: {
    labelName: 'Roles',
    url: '/user-management/roles/list-roles'
  },
  orders: {
    labelName: 'Orders',
    url: '/orders'
  },
  help: {
    labelName: 'help',
    url: '/help'
  },
  'combo-offer-scan': {
    labelName: 'Combo Offer Scan',
    url: '/orders'
  },
  'edit-try-buy': {
    labelName: 'Edit Try and Buy',
    url: '/edit-try-buy'
  },
  'create-user': {
    labelName: 'Create Users',
    url: ''
  },
  'edit-user': {
    labelName: 'Edit Users',
    url: ''
  },
  'create-role': {
    labelName: 'Create Role',
    url: ''
  },
  'edit-role': {
    labelName: 'Edit Role',
    url: ''
  },
  'leads-branches-info': {
    labelName: 'Leads',
    url: '/dashboard/leads-branches/leads-branches-info/qwert'
  },
  'profit-branches-info': {
    labelName: 'Profit',
    url: '/dashboard/profit-branches/profit-branches-info/qwert'
  },
  'revenue-branches-info': {
    labelName: 'Revenue',
    url: '/dashboard/revenue-branches/revenue-branches-info/qwert'
  },
  'refereal-branches-info': {
    labelName: 'Refereal',
    url: '/dashboard/refereal-branches/refereal-branches-info/qwert'
  },
  'product-branches-info': {
    labelName: 'Product',
    url: '/dashboard/product-branches/product-branches-info/qwert'
  },
  'vle-branches-info': {
    labelName: 'VLE',
    url: '/dashboard/vle-branches/vle-branches-info/qwert'
  },
  'retail-branches-info': {
    labelName: 'Retail',
    url: '/dashboard/retail-branches/retail-info/qwer'
  },
  'leads-branches': {
    labelName: 'Leads (Branches)',
    url: '/dashboard//leads-branches'
  },
  'profit-branches': {
    labelName: 'Profit (Branches)',
    url: '/dashboard/profit-branches'
  },
  'revenue-branches': {
    labelName: 'Revenue (Branches)',
    url: '/dashboard/revenue-branches'
  },
  'refereal-branches': {
    labelName: 'Refereal (Branches)',
    url: '/dashboard/refereal-branches'
  },
  'product-branches': {
    labelName: 'Product (Branches)',
    url: '/dashboard/product-branches'
  },
  'vle-branches': {
    labelName: 'VLE (Branches)',
    url: '/dashboard/vle-branches'
  },
  'retail-branches': {
    labelName: 'Retail (Branches)',
    url: '/dashboard/retail-branches'
  },
  'branch-management': {
    labelName: 'Branches',
    url: '/branch-management/list-branches',
  },
  'create-branch': {
    labelName: 'Create Branch',
    url: '/branch-management/create-branch'
  },
  'edit-branch': {
    labelName: 'Edit Branch',
    url: '/branch-management/edit-branch'
  },
  stock: {
    labelName: 'Stocks',
    url: '/stock/list-stocks'
  },
  manufacturer: {
    labelName: 'Manufacturer',
    url: '/stock/manufacturer/list-manufacturer'
  },
  franchise: {
    labelName: 'Franchise',
    url: '/stock/franchise/list-franchise'
  },
  'create-manufacturer': {
    labelName: 'Create Manufacturer',
    url: '/stock/manufacturer/list-manufacturer'
  },
  'edit-manufacturer': {
    labelName: 'Edit Manufacturer',
    url: '/stock/manufacturer/list-manufacturer'
  },
  'create-franchise': {
    labelName: 'Create Franchise',
    url: '/stock/franchise/create-franchise'
  },
  'edit-franchise': {
    labelName: 'Edit Franchise',
    url: '/stock/franchise/edit-franchise'
  },
  'create-purchase-order': {
    labelName: 'Purchase Order',
    url: '/stock/create-purchase-order'
  },
  'ongoing-transit': {
    labelName: 'Ongoing Transit',
    url: '/stock/ongoing-transit'
  },
  'order-history': {
    labelName: 'Order History',
    url: '/stock/order-history'
  },
  'ongoing-order-transit': {
    labelName: 'Ongoing Transit History',
    url: '/stock/ongoing-order-transit'
  },
  'product-details': {
    labelName: 'Product Details',
    url: '/stock/product-details'
  },
  'ongoing-orders': {
    labelName: 'Ongoing Orders',
    url: '/stock/ongoing-orders'
  },
  'branch-warehouse': {
    labelName: 'Warehouse',
    url: '/branch-warehouse/list-warehouse'
  },
  'create-warehouse': {
    labelName: 'Create Warehouse',
    url: '/branch-warehouse/create-warehouse'
  },
  'edit-warehouse': {
    labelName: 'Edit Warehouse',
    url: '/branch-warehouse/create-warehouse'
  },
  'create-transfer-order': {
    labelName: 'Stock Out',
    url: '/stock/create-transfer-order'
  },
  'banner-management': {
    labelName: 'Banner',
    url: '/banner-management/list-banner'
  },
  /* PRODUCT MANAGEMENT*/

  'product-management': {
    labelName: 'Products',
    url: '/product-management/products'
  },
  'create-product': {
    labelName: 'Create Product',
    url: '/product-management/products/create-product'
  },
  'edit-product': {
    labelName: 'Edit Product',
    url: '/product-management/products/edit-product'
  },

  category: {
    labelName: 'Category',
    url: '/product-management/category/list-category'
  },
  'create-category': {
    labelName: 'Create Category',
    url: '/product-management/category/create-category'
  },
  'edit-category': {
    labelName: 'Edit Category',
    url: '/product-management/category/edit-category'
  },
  'demo-management': {
    labelName: 'Demo Management',
    url: '/demo-management/list-demo-products'
  },
  'service-management': {
    labelName: 'Service',
    url: '/service-management/list-service'
  },
  'add-issue-demo-product': {
    labelName: 'Issue Demo Product',
    url: '/demo-management/add-issue-demo-product'
  },
  'payment-management': {
    labelName: 'Payment Management',
    url: '/payment-management/list-payments'
  },
  //Customer Management
  'customer-management': {
    labelName: 'Customers',
    url: '/customer-management'
  },
  'survey':{
    labelName: 'Survey',
    url:'/survey'
  }
  // 'customer-management': {
  //   labelName: 'Customers',
  //   url: '/customer-management/view-customer-orders'
  // }
};



export const dashboardBranchList = [
  { header: 'Branch' },
  { header: 'State' },
  { header: 'Total VLE’s' },
  { header: 'Total Leads' },
  { header: 'Products Sold' },
  { header: 'Referrals' },
  { header: 'New VLE’s' },
  { header: 'Retail Points' },
  { header: 'Profit' },
  { header: 'Revenue %' }
];


export const branchManagementList = [
  { header: 'Branch' },
  { header: 'Village' },
  { header: 'Village Code' },
  { header: 'Villge Status' },
  { header: 'District' },
  { header: 'State' },
  { header: 'Total Potential Households' },
  { header: 'Total Potential Customer' },
  { header: 'SHG Groups' },
  { header: 'SHG Members' },
  //  { header: 'TM Name'},
  { header: 'Delivery Day' },
  { header: 'Total Sahelis' },
  { header: 'Total Contacts' },
  // { header: 'Total VLE’s' },
  { header: 'Total Leads' }
];
export const orderTableHeadersCollections = [
  // { header: 'Order No',checkBox: true },
  // { header: 'VLE ID' },
  // { header: 'VLE Name' },
  // { header: 'Territory Manager' },
  //   { header: 'Warehouse Name' },
  // { header: 'State' },
  // { header: 'Customer Name' },
  //   { header: 'Customer No' },
  // { header: 'Village Name' },
  // { header: 'Recieved Date' },
  // { header: 'Quantity' },
  // { header: 'Total Price' },
  // { header: 'View Products' },

  { header: 'Lead ID', checkBox: true },
  { header: 'Lead Name' },
  { header: 'Lead Mobile No' },
  { header: 'Lead Village Name' },
  { header: 'Village Code' },
  { header: 'Lead Branch' },
  { header: 'Delivery Day' },
  { header: 'Saheli ID' },
  { header: 'Saheli Name' },
  { header: 'TM Name' },
  { header: 'Order Date' },
  // { header: 'Recieved Date' },
  { header: 'Quantity' },
  // { header: 'Approved Date' },
  // { header: 'Product Name' },
  { header: 'Total Value' },
  { header: 'Order By Name' },
  { header: 'Order By Role' },
  { header: 'View Products' },

  // { header: 'Item Name', sortText: 'productName', checkBox: true },
  // { header: 'VLE ID', sortText: 'vleCode' },
  // { header: 'VLE Name', sortText: 'fmUserName' },
  // { header: 'Territory Manager' },
  // { header: 'Branch Name', sortText: 'branchName' },
  // { header: 'Warehouse Name' },
  // { header: 'State' },
  // { header: 'Customer Name' },
  // { header: 'Customer Mobile No' },
  // { header: 'Customer Village Name' },
  // { header: 'Delivery Day' },
  // { header: 'Date', sortText: 'orderDate' },
  // { header: 'Quantity' },
  // { header: 'Product Name',sortText: 'productName', checkBox: true  },
  // { header: 'Total Value' },

];

export const userTableHeaderCollections = [
  { header: 'FM ID' },
  { header: 'User Name' },
  { header: 'User Mobile #' },
  { header: 'Role' },
  { header: 'Village' },
  { header: 'Branch' },
  { header: 'District' },
  { header: 'Date of Registration' },
  { header: 'Allowed Warehouse/s' },
  { header: 'Territory Manager' },
  // { header: 'FM Mobile 2' },
  // { header: 'FM Mobile 3' },
];

export const moduleNameKeys = {
  branch: 'villageprofile',
  dashboard: 'dashboard',
  franchise: 'franchise',
  lead: 'leadmanagement',
  manufacturer: 'manufacturer',
  order: 'ordermanagement',
  product: 'productmanagement',
  purchaseOrder: 'purchaseorder',
  stocks: 'stockmanagement',
  transportation: 'transportation',
  tryAndBuy: 'try&buymanagement',
  user: 'usermanagement',
  service: 'servicemanagement',
  warehouse: 'warehousemanagememnt',
  role: 'rolemanagement',
  category: 'category',
  demoProduct: 'demomanagement',
  banner: 'bannermanagement',
  survey:'survey',
  payment: 'paymentmanagement',
  customer: 'customermanagement',
  download : 'downloadmanagement',
  help:'help',
  old:'oldorders'
};
export const roleAccessKeys = {
  read: 'read',
  write: 'write',
  edit: 'edit',
  delete: 'delete',
  download: 'download'
};
export const orderAccessReturnRequestKeys = {
  1: 'The customer does not have the money',
  2: 'The customer said he changed his mind',
  3: 'Product is different from what was ordered',
  4: 'Product was damaged/Broken',
  5: 'Others',
  undefined: 'NA'
};
export const orderAccessCouldNotDeliverKeys = {
  1: 'No one at home to receive the order',
  2: `Couldn't deliver due to weather conditions`,
  3: `Couldn't deliver due to vehicle issues`,
  4: 'Late in Delivery',
  5: 'Others',
  undefined: 'NA'
};
export const orderTabCollections = [
  {
    key: 'Received',
    value: [0],
    val: 0,
    name: 'Received',
    downloadReportName: 'received'
  },
  {
    key: 'Assign to TM',
    value: [1],
    val: 1,
    name: 'Assign to TM',
    downloadReportName: 'assign_to_TM'
  },
  // {
  // key: 'Confirmed',
  // value: 1,
  // name: 'Confirmation'
  // },
  // add value 6 later
  {
    key: 'Ongoing',
    value: [3],
    val: 3,
    name: 'Ongoing',
    downloadReportName: 'ongoing'
  },
  {
    key: 'Dispatched',
    val: 6,
    value: [6],
    name: 'Dispatched',
    downloadReportName: 'dispatched'
  },
  {
    key: 'Delivered',
    val: '4,9',
    value: [4, 9],
    name: 'Delivered',
    downloadReportName: 'delivered'
  },
  {
    key: 'RTS',
    value: [11],
    val: 11,
    name: 'RTS',
    downloadReportName: 'rts'
  },
  {
    key: 'Completed',
    value: [5],
    val: 5,
    name: 'Completed',
    downloadReportName: 'completed'
  },

  {
    key: 'Rejected',
    value: [2,7],
    val: ['2','7'],
    name: 'Rejected',
    downloadReportName: 'rejected'
  },
  {
    key: 'Could not deliver',
    value: [8],
    val: 8,
    name: 'Could not deliver',
    downloadReportName: 'Could not deliver'
  },
  {
    key: 'Hold',
    value: [10],
    val: '10',
    name: 'Hold',
    downloadReportName: 'Hold'
  },
];

export const leadTabCollections = [
  {
    key: 'Directory',
    value: [''],
    val: '',
    name: 'Directory',
    downloadReportName: 'directory'
  },
  {
    key: 'Unaware',
    value: [1],
    val: 1,
    name: 'Unaware',
    downloadReportName: 'unaware'
  },
  {
    key: 'Aware',
    value: [2],
    val: 2,
    name: 'Aware',
    downloadReportName: 'aware'
  },

  {
    key: 'Consider',
    value: [3],
    val: 3,
    name: 'Consider',
    downloadReportName: 'consider'
  },
  {
    key: 'To be Corrected',
    value: [4],
    val: 4,
    name: 'To be Corrected',
    downloadReportName: 'To_be_corrected'
  }
];

export const customerTabCollections = [
  {
    key: 'Total Orders',
    val: 0,
    value: [0],
    name: 'Total Orders',
    downloadReportName: 'totalOrders'
  },
  {
    key: 'New Customer',
    val: 1,
    value: [1],
    name: 'New Customer',
    downloadReportName: 'newCustomer'
  },
  {
    key: 'Repeat Customer',
    val: 2,
    value: [2],
    name: 'Repeat Customer',
    downloadReportName: 'repeatCustomer'
  },
];

export const imageURL = {
  name: 'https://saheliproduction.s3.ap-south-1.amazonaws.com'
}
export const fmpBranchCollections = {
    dashboard: {
        title: 'Dashboard',
        routerLink: '/dashboard',
        iconBlack: '../../../../assets/img/dashboardBlack.svg'
    }
};

export const fmUserRoleCollections = [
    {
        name: 'All',
        value: ''
    },
    {
        name: 'Super Admin',
        value: 1
    },
    {
        name: 'Area Business Manager',
        value: 2
    },
    {
        name: 'Branch Operations Manager',
        value: 3
    },
    {
        name: 'Operations Executive',
        value: 4
    },
    {
        name: 'Solar Saheli',
        value: 5
    },
    {
        name: 'Recruiter',
        value: 6
    },
    {
        name: 'Saheli Coordinator',
        value: 7
    },
    {
        name: 'Brand Activator',
        value: 8
    }
];





export const BranchInfoCollections = {
    'leads-branches-info': {
        title: 'Leads',
        tableColumnHeaders: [
            { name: 'Product Name' },
            { name: 'Category' },
            { name: 'Leads Generated' },
            { name: '% Leads Generated' },
            { name: 'VLE s Generated' }
        ],
        tableHeaderText: 'Leads Generated',
        tableSearchText: 'Search Lead',
        branchInfoCardText: 'Leads Generated',
        graphType: 'revenueGraph',
        apiEndPoint: 'lead',
        routerLink: '',
        graphColor: '#a6e8b1',
        graphInfo: '',
        branchInfoData: [],
        graphResponseParam: 'leadCount',
        graphColorBar: 'green',
        currentPage: 1,
        graphXaxisInfo: 'Leads Count',
        totalRecords: 0,
        filterCollections: ['All', 'High to Low - Total Leads', 'Low to High - Total Leads']
    },
    'dashboard-branches-info': {
        title: '',
        tableColumnHeaders: [
            { name: 'Product Name' },
            { name: 'Category' },
            { name: 'Leads Generated' },
            { name: '% Leads Generated' },
            { name: 'VLE s Generated' }
        ],
        tableHeaderText: 'Leads Generated',
        tableSearchText: 'Search Lead',
        branchInfoCardText: 'Leads Generated',
        graphType: 'revenueGraph',
        branchInfoData: [],
        apiEndPoint: '',
        routerLink: '',
        graphInfo: '',
        graphColor: '#fed7c7',
        currentPage: 1,
        graphXaxisInfo: 'Dashboard Count',
        totalRecords: 0,
        graphColorBar: '#fd8353',
        graphResponseParam: ''
    },
    'profit-branches-info': {
        title: 'Profit',
        tableColumnHeaders: [
            { name: 'Product Name' },
            { name: 'Category' },
            { name: 'Total Revenue' },
            { name: 'Total COGS' },
            { name: 'Profit' },
            { name: 'Profit %' }
        ],
        tableHeaderText: 'Products',
        tableSearchText: 'Search Product…',
        branchInfoCardText: 'Total Profit',
        graphType: 'revenueGraph',
        branchInfoData: [],
        graphInfo: '',
        apiEndPoint: '',
        routerLink: '',
        graphColor: '#bed0ee',
        graphColorBar: '#6d95d9',
        graphXaxisInfo: 'Profit Count',
        graphResponseParam: '',
        currentPage: 1,
        totalRecords: 0,
        filterCollections: ['All', 'High to Low - Total Profit', 'Low to High - Total Profit']
    },
    'revenue-branches-info': {
        title: 'Revenue',
        tableColumnHeaders: [
            { name: 'Product Name' },
            { name: 'Category' },
            { name: 'Total Product Sold' },
            { name: 'Revenue' },
            { name: 'Revenue %' },
        ],
        tableHeaderText: 'Products',
        tableSearchText: 'Search Product…',
        branchInfoCardText: 'Total Revenue',
        graphType: 'revenueGraph',
        apiEndPoint: '',
        branchInfoData: [],
        graphInfo: '',
        routerLink: '',
        graphColor: '#fed2d3',
        graphColorBar: '#fd6368',
        graphXaxisInfo: 'Revenue Count',
        graphResponseParam: '',
        currentPage: 1,
        totalRecords: 0,
        filterCollections: ['All', 'High to Low - Total Revenue', 'Low to High - Total Revenue']
    },
    'refereal-branches-info': {
        title: 'Referrals',
        tableColumnHeaders: [
            { name: 'VLE Name' },
            { name: 'VLE Code' },
            { name: 'Classification' },
            { name: 'Referrals Generated' },
            { name: 'Converted Referrals' },
        ],
        tableHeaderText: 'VLE’s',
        tableSearchText: 'Search VLE’s…',
        branchInfoCardText: 'Referrals Generated',
        graphType: 'revenueGraph',
        apiEndPoint: '',
        branchInfoData: [],
        graphInfo: '',
        routerLink: '',
        graphColor: '#fee2b9',
        graphColorBar: '#f09205',
        graphXaxisInfo: 'Refereal Count',
        graphResponseParam: '',
        currentPage: 1,
        totalRecords: 0,
        filterCollections: ['All', 'High to Low - Total Referrals Generated', 'Low to High - Total Referrals Generated',
            'High to Low - Total Referrals Converted to Sales', 'Low to High - Total Referrals Converted to Sales']
    },
    'product-branches-info': {
        title: 'Products Sold',
        tableColumnHeaders: [
            { name: 'Product Name' },
            { name: 'Category' },
            { name: 'Total Product Sold' },
            { name: '% Product Sold' },
            { name: 'No of VLE’s Selling' },
        ],
        tableHeaderText: 'Products',
        tableSearchText: 'Search Product…',
        branchInfoCardText: 'Product Sold (Units)',
        graphType: 'revenueGraph',
        apiEndPoint: 'product',
        branchInfoData: [],
        graphInfo: '',
        routerLink: '',
        currentPage: 1,
        totalRecords: 0,
        graphColor: '#cbe9eb',
        graphResponseParam: 'productCount',
        graphXaxisInfo: 'Product Count',
        graphColorBar: '#76c4cb',
        filterCollections: ['All', 'High to Low - Total Products Sold', 'Low to High - Total Products Sold']
    },
    'vle-branches-info': {
        title: 'VLE’s',
        tableColumnHeaders: [
            { name: 'VLE Name' },
            { name: 'Classification' },
            { name: 'Registration Date' },
            { name: 'Leads Generated' },
            { name: 'Sales' }
        ],
        tableHeaderText: 'VLE’s',
        tableSearchText: 'Search VLE’s…',
        branchInfoCardText: 'Total No Of Saheli’s',
        graphType: 'circularGraph',
        apiEndPoint: 'fmuser',
        branchInfoData: [],
        graphInfo: '',
        graphResponseParam: '',
        routerLink: '',
        currentPage: 1,
        totalRecords: 0,
        graphColor: '#fed7c7',
        graphColorBar: '#fd8353',
        graphXaxisInfo: 'VLE Count',
        filterCollections: ['All', 'Ace', 'Standard', 'Rookies', 'Newbies', 'High to Low - Total Leads Generated',
            'Low to High - Total Leads Generated', 'High to Low - Total Sales', 'Low to High - Total Sales']
    },
    'retail-branches-info': {
        title: 'Retail Points',
        tableColumnHeaders: [
            { name: 'Retail Point Village' },
            { name: 'VLE Code' },
            { name: 'VLE Name' },
            { name: 'Date Of Reg.' },
            { name: 'Total Sales' },
            { name: 'Total Revenue' }
        ],
        tableHeaderText: 'Products',
        tableSearchText: 'Search Retail Points...',
        branchInfoCardText: 'Retail Points',
        graphType: 'revenueGraph',
        branchInfoData: [],
        graphInfo: '',
        apiEndPoint: '',
        routerLink: '',
        graphColor: '#fed7c7',
        currentPage: 1,
        graphResponseParam: '',
        totalRecords: 0,
        graphColorBar: '#fd8353',
        graphXaxisInfo: 'Retail Count',
        filterCollections: ['All', 'High to Low - Total Sales', 'Low to High - Total Sales',
            'High to Low - Total Revenue', 'Low to High - Total Revenue']
    }
};
export const monthIntInfoCollections = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sept',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
};
export const fmpBranchList = [
    { header: 'Branch'},
    { header: 'State' },
    { header: 'Total VLE’s' },
    { header: 'Total Leads' },
    { header: 'Products Sold' },
    { header: 'Referrals' },
    { header: 'New VLE’s'},
    { header: 'Retail Points'},
    { header: 'Profit'},
    { header: 'Revenue %'}
  ];

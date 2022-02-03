import { TableOngoingPurchaseOrderlist } from '../models/stock';


export const stockProductTableTypeCollections = {
  'ongoing-order-transit/Product': {
    pageTitle: 'Ongoing Transit History',
    tableHeaders: [
      { header: 'Item Name' },
      { header: 'Total Units' },
      { header: 'Date' },
      { header: 'Source' },
      { header: 'Source Branch' },
      { header: 'Destination' },
      { header: 'Destination Branch' }
    ],
    apiEndPoint: 'stock/transport',
  },
  'order-history/Product': {
    pageTitle: 'Order History',
    tableHeaders: [
      { header: 'Item Name' },
      { header: 'Total Units' },
      { header: 'Order Date' },
      { header: 'Manufacturer' },
      { header: 'Category' },
      { header: 'Arrival' },
      { header: 'Amount/Item' }
    ],
    apiEndPoint: 'stock/purchase'
  },
  'order-history/Spare': {
    pageTitle: 'Order History',
    tableHeaders: [
      { header: 'SL No' },
      { header: 'Description of Goods' },
      { header: 'Quantity' },
      { header: 'Amount' },
    ],
    apiEndPoint: 'admin/purchaseOrder/spare'
  },
  'ongoing-order-transit/Spare': {
    pageTitle: 'Ongoing Transit History',
    tableHeaders: [
      { header: 'SL No' },
      { header: 'Description of Goods' },
      { header: 'Quantity' },
      { header: 'Source Warehouse' },
      { header: 'Destination Warehouse' },
    ],
    apiEndPoint: 'admin/productSpare/transport'
  },
};


export const branchWarehouseManufacturerFranchise = {
  'branch-warehouse': {
    pageTitle: 'Warehouse',
    tableHeaders: [
      { header: 'Warehouse Name' },
      { header: 'Warehouse Address' },
      // { header: 'Warehouse Code' },
      { header: 'Branch Name' }
    ],
    apiEndPoint: 'users/warehouse',
    detailEndPoint : 'users/getWarehouseDetails',
    placeHolder: 'Search Warehouse',
    createLink: 'branch-warehouse/create-warehouse',
    editLink: 'branch-warehouse/edit-warehouse/',
    parentLink: 'branch-warehouse/list-warehouse',
    moduleName: 'warehouse'
  },
  manufacturer: {
    pageTitle: 'Manufacturer',
    tableHeaders: [
      { header: 'Manufacturer Name' },
      { header: 'Manufacturer Address' },
      { header: 'Manufacturer Code' },
      { header: 'GSTIN Code' },
    ],
    apiEndPoint: 'stock/manufacturer',
    detailEndPoint: 'stock/manufacturer',
    placeHolder: 'Search Manufacturer',
    createLink: 'stock/manufacturer/create-manufacturer',
    parentLink: 'stock/manufacturer/list-manufacturer',
    editLink: 'stock/manufacturer/edit-manufacturer/',
    moduleName: 'manufacturer'
  },
  franchise: {
    pageTitle: 'Franchise',
    tableHeaders: [
      { header: 'Franchise Info' },
      { header: 'Shipment Address' }
    ],
    apiEndPoint: 'users/franchise',
    detailEndPoint : 'users/getFranchise',
    placeHolder: 'Search Franchise',
    createLink: 'stock/franchise/create-franchise',
    editLink: 'stock/franchise/edit-franchise/',
    parentLink: 'stock/franchise/list-franchise',
    moduleName: 'franchise'
  },
};


export const filterPurchaseOrder = [
  {
    name: 'A-Z',
    value: '1'
  },
  {
    name: 'Z-A',
    value: -1
  },
  {
    name: 'High to Low',
    value: -1
  },
  {
    name: 'Low to High',
    value: 1
  }
];



export const filterstockOrder = [
  {
    name: 'A-Z',
    value: '1'
  },
  {
    name: 'Z-A',
    value: -1
  },
  {
    name: 'High to Low Price',
    value: -1
  },
  {
    name: 'Low to High Price',
    value: 1
  },
  {
    name: 'Low to High Stock',
    value: 1
  },
  {
    name: 'High to Low Stock',
    value: -1
  },
  {
    name: 'Disabled',
    value: true
  }

];

export const poFilterFieldList = {
  branch: {
    name: 'branch',
    collections: [],
    apiEndPoint: 'users/branches?search_by_branch_name='
  },
  warehouse: {
    name: 'warehouse',
    collections: [],
    apiEndPoint: 'users/warehouse?search_text='
  },
  manufacture: {
    name: 'manufacture',
    collections: [],
    apiEndPoint: 'stock/manufacturer?search_text='
  },
  category: {
    name: 'category',
    collections: [],
    apiEndPoint: 'product/category?lang=en&search_text='
  },
};




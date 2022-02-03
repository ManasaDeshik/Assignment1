import { TableDateFields } from './shared';

export class StocksTableViewRequestSet {
    public recordsPerPage: number;
    public pageNumber: number;
    public status: number;
    public searchText: string;
    public searchItem: string;
    public role: string;
    constructor(data: any = {}) {
        console.log(data,"DATAA")
        this.recordsPerPage = data.recordsPerPage || 10;
        this.pageNumber = data.pageNumber || 1;
        this.status = data.status || '';
        this.role = data.role || '';
        this.searchText = data.searchText || '';
        this.searchItem = data.searchItem || '';
    }
}



export class CatgeoryTableViewRequestSet {
    public recordsPerPage: number;
    public pageNumber: number;
    public status: number;
    public searchText: string;
    public searchItem: string;
    public role: string;
    constructor(data: any = {}) {
        this.recordsPerPage = data.recordsPerPage || 10;
        this.pageNumber = data.pageNumber || 1;
        this.status = data.status || '';
        this.role = data.role || '';
        this.searchText = data.searchText || '';
        this.searchItem = data.searchItem || '';
    }
}

export class StockProductDetailsByBranch {
    public warehouseName: string;
    public count: number;
    public branch: string;
    public district: string;
    public state: string;
    public warehouseId: string;
    public totalPages: number;
    public totalRecords: number;
    public records = [];
    constructor(data: any) {
        if (data.page_info) {
            this.totalPages = data.page_info.total_pages;
            this.totalRecords = data.page_info.total_pages * 10;
        } else {
            this.totalPages = 1;
            this.totalRecords = 0;
        }

        if (data.records) {
            if (data.records.length > 0) {
                data.records.forEach(element => {
                    //console.log(element)
                   // if(element.item_count > 0)
                    this.records.push((element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
    // this.warehouseName = data.warehouse_name || '';
    // this.count = data.item_count || 0;
    // this.branch = data.branch.name || '';
    // this.district = data.branch.district || '';
    // this.warehouseId = data.warehouse_id || '';
    // this.state = data.branch.state || '';
}

export class StockTableListTypeInfo {
    public pageTitle: string;
    public tableHeaders: Array<any>;
    public apiEndPoint: string;
    constructor(data: any = {}) {
        this.pageTitle = data.pageTitle || '';
        this.tableHeaders = data.tableHeaders || [];
        this.apiEndPoint = data.apiEndPoint || '';
    }
}

export class WarehouseManufacturerFranchise {
    public pageTitle: string;
    public tableHeaders: Array<any>;
    public apiEndPoint: string;
    public placeHolder: string;
    public createLink: string;
    public parentLink: string;
    public editLink: string;
    public detailEndPoint : string;
    public moduleName: string;
    constructor(data: any = {}) {
        this.pageTitle = data.pageTitle || '';
        this.tableHeaders = data.tableHeaders || [];
        this.apiEndPoint = data.apiEndPoint || '';
        this.detailEndPoint = data.detailEndPoint || '';
        this.placeHolder = data.placeHolder || '';
        this.createLink = data.createLink || '';
        this.moduleName = data.moduleName || '';
        this.editLink = data.editLink || '';
        if (data.parentLink) {
            this.parentLink = data.parentLink || '';
        }
    }
}

export class WarehouseManfacturerFranchiseRecords {
    public name: string;
    public name_url: string;
    public address: string;
    public reference_code: string;
    public location: string;
    public id: string;
    public branch: string;
    public franchise_id: string;
    public franchiseId: string;
    public warehouse_id: string;
    public frnachise_id: string;
    public franchisesAddressId: string;
    public gst_code: string;
    constructor(data: any = {}, type?: string) {
        this.name = data.name || '';
        if(data.name_url) {
            this.name_url = data.name_url || '';
        }
        if (data.franchises_addresses) {
            this.address = data.franchises_addresses || '';
        }
        if (data.address) {
            this.address = data.address || '';
        }
        if (data.reference_code) {
            this.reference_code = data.reference_code || '';
        }
        if (data.location) {
            this.location = data.location || '';
        }
        if (data.id) {
            if (type === 'Franchise') {
                this.franchise_id = data.id || '';
            } else if (type === 'Warehouse') {
                this.warehouse_id = data.id;
            } else {
                this.id = data.id;
            }
        }
        if (data.branch) {
            this.branch = data.branch.long_text;
        }
        if (data.gst_code) {
            this.gst_code = data.gst_code;
        }
        if (data.franchiseId) {
            this.franchiseId = data.franchiseId;
        }
        if (data.franchisesAddressId) {
            this.franchisesAddressId = data.franchisesAddressId;
        }
    }
}

export class CreateWarehouseManufacturerFranchise {
    public name: string;
    public name_url: string;
    public address: string;
    public reference_code: string;
    public location: string;
    public _id: string;
    public branchId: string;
    public gst_code: string;
    public frnachise_id: string;
    public franchiseId: string;
    public franchisesAddressId: string;

    constructor(data: any = {}) {
        this.name = data.name || '';
        this.name_url = data.name.toLowerCase() || '';
        if (data.address) {
            this.address = data.address || '';
        }
        if (data.reference_code) {
            this.reference_code = data.reference_code || 'NA';
        }
        if (data.location) {
            this.location = data.location || 'NA';
        }
        if (data._id) {
            this._id = data._id;
        }
        if (data.branch) {
            this.branchId = data.branch || 'NA';
        }
        if (data.gst_code) {
            this.gst_code = data.gst_code || 'NA';
        }
        if (data.frnachise_id) {
            this.franchiseId = data.frnachise_id;
        }
        if (data.franchise_id) {
            this.franchiseId = data.franchise_id;
        }
        if (data.franchisesAddressId) {
            this.franchisesAddressId = data.franchisesAddressId;
        }
    }
}

export class WarehouseManufacturerFranchiseList {
    public totalPages: number;
    public totalRecords: number;
    public records: WarehouseManfacturerFranchiseRecords[] = [];

    constructor(data: any = {}) {
        if (data.page_info) {
            this.totalPages = data.page_info.total_pages;
            this.totalRecords = data.page_info.total_pages * 10;
        } else {
            this.totalPages = 1;
            this.totalRecords = 0;
        }

        if (data.records) {
            if (data.records.length > 0) {
                data.records.filter(element => {
                    this.records.push(new WarehouseManfacturerFranchiseRecords(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}


export class ProductDetail {
    public title: string;
    public category: string;
    public brand: string;
    public images: Array<string> = [];
    public id: string;
    constructor(data: any) {
        console.log(data,data.title);
        this.title = data.title || '';
        if (data.product) {
            this.category = data.product.categories[0].category_translation[0].name || '';
            this.brand = data.product.brand;
        }
        if (data.images) {
            data.images.forEach(element => {
                if(element != '') {
                this.images.push(element);
                }
            });
        }
        if (data.id) {
            this.id = data.id || '';
        }
    }
}

export class BranchWarehouse {
    public name: string;
    public location: string;
    public _id: string;
    constructor(data: any) {
        this.name = data.name || '';
        this._id = data.id || '';
        this.location = data.location || '';
    }
}

export class ManfacturerData {
    public name: string;
    public address: string;
    public id: string;
    constructor(data: any) {
        this.name = data.name || '';
        this.address = data.address || '';
        this.id = data.id || '';
    }
}


export class PurchaseOrder {
    public product_detail_id: string;
    public quantity: any;
    public manufacturer_id: string;
    public estimated_arrival_date: string;
    public ordered_date: string;
    public order_value: string;
    public warehouse_id: string;
    public product_name: string;
    public franchise_id: string;
    public franchise_address_id: string;
    public payment_terms: string;
    constructor(data: any, isChangeTab?: boolean) {
        if (isChangeTab) {
            this.product_detail_id = data.product_detail_id || '';
            this.warehouse_id = data.warehouse_id || '';
            this.manufacturer_id = data.manufacturer_id || '';
        } else {
            this.product_detail_id = data.product_detail_id || '';
            this.quantity = data.quantity || '';
            this.manufacturer_id = data.manufacturer_id || '';
            this.estimated_arrival_date = data.estimated_arrival_date || '';
            this.ordered_date = data.ordered_date || '';
            this.order_value = data.order_value || '';
            this.warehouse_id = data.warehouse_id || '';
            this.product_name = data.product_name || '';
            this.payment_terms = data.payment_terms || '';
            this.franchise_address_id = data.franchise_address_id || undefined;
            this.franchise_id = data.franchiseId || undefined;
        }
    }
}

export class OngoingPurchaseOrder {
    public title: string;
    public quantity: number;
    public orderedDate: any;
    public manufacturerName: string;
    public category: string;
    public arrivalDate: any;
    public totalPrice: number;
    public id: string;
    public image: any;
    public wareHouseId: string;
    public wareHouseName: string;
    constructor(data: any = {}) {
        this.title = data.purchase_items.product_detail.title || '';
        this.quantity = data.purchase_items.quantity || 0;
        this.orderedDate = data.ordered_date || '';
        this.manufacturerName = data.manufacturer.name || '';
        if (data.category && data.category.category_translation) {
            
            var filterCategory = data.category.category_translation[0];
            // .filter(translation=>
            //     translation.language==data.category.category_translation.language);
            //     console.log('334',filterCategory);
            if (data.category.category_translation[0].language == 'en') {
                this.category = data.category.category_translation[0].name;
             }
             else if(data.category.category_translation[1].language == 'en') {
                 this.category = data.category.category_translation[1].name;
             }    
           // this.category =  filterCategory.name || '';

        }
        if (data.category && !data.category.category_translation) {
           this.category = data.category.category_translation.name;
        }
        this.arrivalDate = data.arrived_date || '';
        this.totalPrice = data.total_value || 0;
        this.id = data.id || '';
        this.image = data.images;
        this.wareHouseId = data.warehouse_id || '';
        this.wareHouseName = data.warehouse.name || '';
    }
}

export class TableOngoingPurchaseOrderlist {
    public totalPages: number;
    public totalRecords: number;
    public records: OngoingPurchaseOrder[] = [];

    constructor(data: any = {}) {
        if (data.page_info) {
            this.totalPages = data.page_info.total_pages;
            this.totalRecords = data.page_info.total_pages * 10;
        } else {
            this.totalPages = 1;
            this.totalRecords = 0;
        }

        if (data.records) {
            if (data.records.length > 0) {
                data.records.forEach(element => {
                    this.records.push(new OngoingPurchaseOrder(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}
export class OngoingTransistProduct {
    public itemName: string;
    public itemId: string;
    constructor(data: any = {}) {
        this.itemName = data.title || '';
        this.itemId = data.id || '';
    }
}
export class OngoingTransistDetails {
    public item: OngoingTransistProduct;
    public quantity: number;
    public source: string;
    public sourceBranch: string;
    public sourceId: string;
    public destination: string;
    public destinationId: string;
    public destinationBranch: string;
    public id: string;
    public updated_at:any;
    constructor(data: any = {}) {
        this.item = new OngoingTransistProduct(data.items[0].product_detail) || new OngoingTransistProduct();
        this.quantity = data.items[0].quantity || '';
        this.source = data.source_warehouses.name || '';
        this.sourceBranch = data.source_warehouses.branch.name || '';
        this.sourceId = data.source_warehouses.id || '';
        this.destination = data.destination_warehouses.name || '';
        this.destinationId = data.destination_warehouses.id || '';
        this.destinationBranch = data.destination_warehouses.branch.name || '';
        this.id = data.id || '';
        this.updated_at = data.updatedAt || ''
    }
}



export class TableOngoingTransist {
    public totalPages: number;
    public totalRecords: number;
    public records: OngoingTransistDetails[] = [];

    constructor(data: any = {}) {
        if (data.page_info) {
            this.totalPages = data.page_info.total_pages;
            this.totalRecords = data.page_info.total_pages * 10;
        } else {
            this.totalPages = 1;
            this.totalRecords = 0;
        }

        if (data.records) {
            if (data.records.length > 0) {
                data.records.forEach(element => {
                    this.records.push(new OngoingTransistDetails(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}




export class ProductStockInOutTableDetails {
    public title: string;
    public product_id: string;
    public actualPrice: number;
    public deliveryPrice: number;
    public extraPrice: number;
    public itemCount: string;
    public image: Array<string> = [];
    public type: number;
    public id: string;
    public disabled: boolean;
    public spare_count;
    constructor(data: any = {}) {
        this.title = data.title || '';
        this.product_id = data.product_id || data.productDetailId || '';
        this.actualPrice = data.actual_price || 0;
        this.type = data.type || 0;
        this.deliveryPrice = data.delivery_price || 0;
        this.extraPrice = data.extra_price || 0;
        this.id = data.id || '';
        if (data.images) {
            data.images.forEach(element => {
                if(element != '') {
                this.image.push(element);
                }
            });
        }
        this.itemCount = data.item_count || 0;
        this.disabled = data.is_disabled || false;
        this.spare_count = data.spare_count || 0;
    }
}

export class ProductStockInOutTable {
    public totalPages: number;
    public totalRecords: number;
    public records: ProductStockInOutTableDetails[] = [];
    public totalStocks: number;
    public totalDemoStock: number;
    public soldStocks: number;
    constructor(data: any = {}) {
        if (data.page_info) {
            this.totalPages = data.page_info.total_pages;
            this.totalRecords = data.page_info.total_pages * 12;
        } else {
            this.totalPages = 1;
            this.totalRecords = 0;
        }
        this.totalStocks = data.total_stocks || 0;
        this.totalDemoStock = data.total_demo || 0;
        this.soldStocks = data.sold_quantity || 0;
        this.totalDemoStock = data.total_demo || 0;
        if (data.records) {
            if (data.records.length > 0) {
                data.records.forEach(element => {
                    this.records.push(new ProductStockInOutTableDetails(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}


export class OngoingPruchaseOrderSortFields {
    public itemName: number;
    public orderedDate: number;
    public estimatedArrivalDate: number;
    public status: number;
    public category_id: string;
    public searchAplhablets: string;
    public itemprice: string;
    public warehouse_id: string;
    public sortByPrice: number;
    constructor(data: any = {}) {
        this.itemName = data.itemName || '';
        this.orderedDate = data.orderedDate || '';
        this.estimatedArrivalDate = data.estimatedArrivalDate || '';
        this.status = data.status || '';
        this.category_id = data.category_id || '';
        this.searchAplhablets = data.searchAplhablets || '';
        this.itemprice = data.itemprice || '';
        this.warehouse_id = data.wareHouseId || '';
    }
}

export class ScanBarcode {
    public package_barcode: string;
    public warehouse_id: string;
    public item_barcode: Array<string>;
    public purchase_order_id: string;
    constructor(data: any = {}) {
        this.package_barcode = data.package_barcode || '';
        this.warehouse_id = data.warehouse_id || '';
        this.item_barcode = data.item_barcode || [];
        this.purchase_order_id = data.purchase_order_id || '';
    }
}

export class ScanOngoingTransistBarcode {
    public package_barcode: string;
    public transport_id: string;
    public item_Barcodes: Array<string>;
    constructor(data: any = {}) {
        this.package_barcode = data.package_barcode || '';
        this.transport_id = data.transport_id || '';
        this.item_Barcodes = data.item_Barcodes || [];
    }
}

export class TransportBarcode {
    public transport_id: string;
    public transfer_order_id: string;
    public package_barcode: string;
    public item_Barcodes: Array<string>;

    constructor(data: any = {}) {
        this.item_Barcodes = data.item_Barcodes || [];
        this.transport_id = data.transport_id || '';
        this.transfer_order_id = data.transport_id || '';
        this.package_barcode = data.package_barcode || '';
    }
}


export class TransportProduct {
    public product_detail_id: string;
    public quantity: string;
    public en_name: string;

    constructor(data: any) {
        this.product_detail_id = data.product_detail_id || '';
        this.quantity = data.quantity || '';
        this.en_name = data.en_name || '';
    }
}

export class Transport {
    public items: Array<TransportProduct> = [];
    public source_warehouse: string;
    public destination_warehouse: string;
    constructor(data: any) {
        this.source_warehouse = data.source_warehouse || '';
        this.destination_warehouse = data.destination_warehouse || '';
        this.items.push(new TransportProduct(data));
        // this.items = data.items ? this.items.push(new TransportProduct(data)) : [];
    }
}

export class AddChallan {
    public challan_no: string;
    public id: Array<string>;

    constructor(data: any) {
        this.challan_no = data.challan_no || '';
        this.id = data.barcode || [];
    }
}


export class ReceiveCash {
    public total_amount: number;
    public product_name: any = [];
    public scanBtn = false;
    public barcode: any = [];
    constructor(data: any) {
        if (data) {
            this.total_amount = data.delivered_order_details.total_amount || 0;
            data.returned_order_details.forEach(element => {
                this.barcode.push(element.barcode);
                element.cart.forEach(productList => {
                    this.product_name.push(productList);
                this.scanBtn = true;
                })
            });
        }
    }
}

export class ProductsStocks {
    public warehouse_id: string;
    public search_text: string;
    public filter_disabled_products: string;
    public filter_by_item_type: number;
    public sort_by_name: number;
    public sort_by_price: number;
    public sort_by_stock: number;
    public category_id: string;
    public disabled: any;
    public villageName: string;
    constructor(data: any = {}) {
        this.warehouse_id = data.warehouse_id || '';
        this.search_text = data.search_text || '';
        this.filter_disabled_products = data.filter_disabled_products || '';
        this.filter_by_item_type = data.filter_by_item_type || 1;
        this.sort_by_name = data.sort_by_name || '';
        this.sort_by_price = data.sort_by_price || '';
        this.sort_by_stock = data.sort_by_stock || '';
        this.category_id = data.category_code || '';
        this.disabled = data.disabled || '';
        this.villageName = data.villageName || '';
    }
}

export class OESelection {
    public executive_id: string;
    constructor(data: any) {
        this.executive_id = data.id || '';
    }
}

export class OngoingPruchaseOrderRequest {
    public requestSet: any;
    constructor(tableViewRequestData: StocksTableViewRequestSet, sortField: OngoingPruchaseOrderSortFields) {
        this.requestSet = '?records_per_page=' + tableViewRequestData.recordsPerPage + '&page_number=' +
            tableViewRequestData.pageNumber + '&search_product=' + tableViewRequestData.searchItem
            + '&sort_by_ordered_date=' + sortField.orderedDate + '&sort_by_estimated_arrival_date=' + sortField.estimatedArrivalDate
            + '&status=' + sortField.status + '&sort_by_price=' + sortField.itemprice +
            '&sort_by_product=' + sortField.searchAplhablets;
    }
}



export class ProductStocksInOutRequest {
    public requestSet: any;
    constructor(tableViewRequestData: StocksTableViewRequestSet, sortField: ProductsStocks) {
        this.requestSet = '?records_per_page=' + tableViewRequestData.recordsPerPage + '&page_number=' +
            tableViewRequestData.pageNumber + '&search_text=' + sortField.search_text
            + '&warehouse_id=' + sortField.warehouse_id
            + '&filter_by_item_type=' + sortField.filter_by_item_type + '&category_id=' + sortField.category_id +
            '&sort_by_name=' + sortField.sort_by_name + '&sort_by_price=' + sortField.sort_by_price + '&sort_by_stock='
            + sortField.sort_by_stock + '&filter_disabled_products=' + sortField.disabled;
    }
}


export class CatgeoryRequest {
    public requestSet: any;
    constructor(tableViewRequestData: CatgeoryTableViewRequestSet) {
        this.requestSet = '?records_per_page=' + tableViewRequestData.recordsPerPage + '&page_number=' +
            tableViewRequestData.pageNumber + '&search_text=' + tableViewRequestData.searchItem;
    }
}


export class ApplyFilterFields {
    public name: string;
    public apiEndPoint: string;
    public collections: any = [];
    constructor(data: any = {}) {
        this.name = data.name || '';
        this.apiEndPoint = data.apiEndPoint || '';
        this.collections = data.collections || [];
    }
}

export class InvoiceFilterFields {
    public name: string;
    public collections: Array<any>;
    constructor(data: any = {}) {
        this.name = data.name || '';
        this.collections = data.collections || [];
    }
}
export class POTableViewFilterRequestSet {
    public branch: string;
    public category: string;
    public warehouse: string;
    public manufacture: string;
    constructor(data: any = {}) {
        this.branch = data.branch || '';
        this.category = data.category || '';
        this.warehouse = data.warehouse || '';
        this.manufacture = data.manufacture || '';
    }
}

export class FilterTableDateFields {
    public fromDate: any;
    public toDate: any;
    public minDate: any;
    public maxDate: any;
    constructor(data: any = {}) {
        this.fromDate = data.fromDate || '';
        this.toDate = data.toDate || '';
        this.minDate = data.minDate;
        this.maxDate = data.maxDate;
    }
}
export class RequestFilterDate {
    public orderDateField: TableDateFields;
    public arrivalDateField: TableDateFields;
    constructor(data: any = {}) {
        this.orderDateField = new TableDateFields(data) || new TableDateFields();
        this.arrivalDateField = new TableDateFields(data) || new TableDateFields();
    }
}
export class SparesArray {
    public product_spare_id: string;
    public quantity: number;
    public order_value: string;
    constructor(data: any = {}, spareId) {
        this.product_spare_id = spareId || '';
        this.quantity = data.quantity || 0;
        this.order_value = data.order_value || '';
    }
}
export class SparePurchaseOrderFormat {
    public spares: SparesArray[] = [];
    public estimated_arrival_date: any;
    public manufacturer_id: string;
    public warehouse_id: string;
    public payment_terms: string;
    public franchise_id: string;
    public franchise_address_id: string;
    constructor(data: any = {}) {
        this.estimated_arrival_date = data.estimated_arrival_date || '';
        this.spares = data.spares || [];
        this.warehouse_id = data.warehouse_id || '';
        this.payment_terms = data.payment_terms || '';
        this.manufacturer_id = data.manufacturer_id || '';
        this.franchise_id = data.franchise_id || '';
        this.franchise_address_id = data.franchise_address_id || '';
    }
}
export class CreationSpareList {
    public spare_details: Array<any> = [];
    public total_quantity: number;
    public total_price: number;
    constructor(data: any = {}) {
        this.total_quantity = data.total_quantity || 0;
        this.total_price = data.total_price || 0;
        if (data.spare_details && data.spare_details.length > 0) {
            data.spare_details.map(ele => {
                this.spare_details.push(ele);
            });
        } else {
            this.spare_details = [];
        }
    }
}



export class SparesOngoingList {
    public id: string;
    public product_spare_id: string;
    public quantity: number;
    public warranty: number;
    public spareName: string;
    constructor(data: any = {}) {
        this.id = data._id || '';
        this.product_spare_id = data.product_spare_id || '';
        this.quantity = data.quantity || 0;
        this.spareName = data.details.name;
        this.warranty = data.details.tax_details.warranty || 0;
    }
}
export class SparesTransportList {
    public id: string;
    public product_spare_id: string;
    public quantity: number;
    public spareName: string;
    constructor(data: any = {}) {
        this.id = data._id || '';
        this.product_spare_id = data.product_spare_id || '';
        this.quantity = data.quantity || 0;
        this.spareName = data.product;
    }
}
export class SpareOngoingPORecordList {
    public ordered_date: any;
    public manufacturer_id: string;
    public estimated_arrival_date: any;
    public arrival_date: any;
    public total_value: number;
    public totalQuantity = 0;
    public purchaseOrderId: number;
    public productName = '';
    public spares: SparesOngoingList[] = [];
    constructor(data: any = {}) {
        this.ordered_date = data.ordered_date || '';
        this.manufacturer_id = data.manufacturer_id || '';
        this.estimated_arrival_date = data.estimated_arrival_date || '';
        this.purchaseOrderId = data._id || '';
        this.arrival_date = data.arrival_date || '';
        this.total_value = data.total_value || 0;
        if (data.spares && data.spares.length > 0) {
            data.spares.forEach(element => {
                this.spares.push(new SparesOngoingList(element));
                this.totalQuantity += element.quantity;
                this.productName = element.details.product_details.title || '';
            });
        } else {
            this.spares = [];
            this.totalQuantity = 0;
            this.productName = '';
        }
    }
}
export class SpareOngoingToRecordList {
    public sourceWarehouse: any;
    public destinationWarehouse: string;
    public tranportId: string;
    public totalQuantity = 0;
    public productName: string;
    public items: SparesTransportList[] = [];
    constructor(data: any = {}) {
        this.sourceWarehouse = data.source_warehouse || '';
        this.destinationWarehouse = data.destination_warehouse || '';
        this.tranportId = data._id || '';
        if (data.items && data.items.length > 0) {
            data.items.forEach(element => {
                this.items.push(new SparesTransportList(element));
                this.totalQuantity += element.quantity;
                this.productName = element.product_detail_name;
            });
        } else {
            this.items = [];
            this.totalQuantity = 0;
            this.productName = '';
        }
    }
}

export class TableSparePoOngoingList {
    public totalPages: number;
    public totalRecords: number;
    public records: SpareOngoingPORecordList[] = [];

    constructor(data: any = {}) {
        if (data.page_info) {
            this.totalPages = data.page_info.total_pages;
            this.totalRecords = data.page_info.total_pages * 10;
        } else {
            this.totalPages = 1;
            this.totalRecords = 0;
        }

        if (data.records && data.records.length > 0) {
            data.records.forEach(element => {
                this.records.push(new SpareOngoingPORecordList(element));
            });
        } else {
            this.records = [];
        }
    }
}
export class StoreTransportSpareArray {
    public product_spare_id: string;
    public en_name: string;
    public quantity: number;
    public limitedQuantity: number;
    constructor(data: any = {}) {
        this.product_spare_id = data.product_spare_id || '';
        this.en_name = data.en_name || '';
        this.quantity = data.quantity || '';
        this.limitedQuantity = data.limitedQuantity || null;
    }
}
export class StoreTransportSpare {
    public source_warehouse: string;
    public destination_warehouse: string;
    public items: StoreTransportSpareArray[] = [];
    constructor(data: any = {}) {
        this.source_warehouse = data.source_warehouse || '';
        this.destination_warehouse = data.destination_warehouse || '';
        if (data.items && data.items.length > 0) {
            data.items.forEach(ele => {
                this.items.push(new StoreTransportSpareArray(ele));
            });
        }
    }
}
export class TableSpareToist {
    public totalPages: number;
    public totalRecords: number;
    public records: SpareOngoingToRecordList[] = [];

    constructor(data: any = {}) {
        if (data.page_info) {
            this.totalPages = data.page_info.total_pages;
            this.totalRecords = data.page_info.total_pages * 10;
        } else {
            this.totalPages = 1;
            this.totalRecords = 0;
        }

        if (data.records && data.records.length > 0) {
            data.records.forEach(element => {
                this.records.push(new SpareOngoingToRecordList(element));
            });
        } else {
            this.records = [];
        }
    }
}

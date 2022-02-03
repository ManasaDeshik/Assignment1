export class DemoProductPostOrder {
    public fm_user_id: string;
    public warehouse_id: string;
    public product_detail_id: string;
    public demo_product_assigned_fm_user_id: string;
    public quantity: number;
    public item_barcodes: [];
    constructor(data: any = {}) {
        this.fm_user_id = data.fm_user_id || '';
        this.warehouse_id = data.warehouse_id || '';
        this.product_detail_id = data.product_detail_id || '';
        this.demo_product_assigned_fm_user_id = data.demo_product_assigned_fm_user_id || '';
        this.quantity = data.quantity || null;
        this.item_barcodes = data.item_barcodes || [];
    }
}
export class DemoProductAssignUser {
    public first_name: string;
    public role: string;
    public phone_number: string;
    public village: string;
    constructor(data: any = {}) {
        this.first_name = data.first_name || '';
        this.role = data.role.name || '';
        this.phone_number = data.phone_number || '';
        this.village = data.branch.village || '';
    }
}
export class DemoList {
    public fmUserName: string;
    public warehouseName: string;
    public productName: string;
    public demoProductAssignUser: DemoProductAssignUser;
    public fmUserBranch: string;
    public quantity: number;
    public issuedDate: any;
    public recievedDate: any;
    public orderDate: any;
    public barcode: string;
    public price: string;
    public returned_quantity: number;
    public order_id: string;
    public warehouse_id: string;
    public returnBarCode: string;
    public invoiceNumber: string;
    constructor(data: any = {}) {
        this.fmUserName = data.frontier_marketing_user.first_name || '';
        if (data.frontier_marketing_user.branch ) {
            this.fmUserBranch  = data.frontier_marketing_user.branch.name;
        } else {
            this.fmUserBranch = '';
        }
        this.warehouseName = data.warehouse.name || '';
        this.productName = data.product_details.title || '';
        if (data.demo_product_assigned_fm_user) {
            this.demoProductAssignUser = new DemoProductAssignUser(data.demo_product_assigned_fm_user);
        } else {
            this.demoProductAssignUser = new DemoProductAssignUser();
        }
        this.quantity = data.quantity || null;
        this.issuedDate = data.delivered_date || '';
        this.barcode = data.bar_code || '';
        this.orderDate = data.order_date || '';
        this.price = data.product_details.delivery_price || '';
        this.returned_quantity = (data.quantity-data.remaining_count) || 0;
        this.order_id = data.id;
        this.warehouse_id = data.warehouse_id || '';
        if(data.returned_demo_orders[0]){
            this.returnBarCode = data.returned_demo_orders[0].item_barcode || 'NA' ,
            this.recievedDate = data.returned_demo_orders[0].returned_date || 'NA'
        }else{
            this.recievedDate = data.updatedAt || '';
        }
        this.invoiceNumber = data.order_code || 'NA'
    }
}


export class DemoListProduct {
    public totalPages: number;
    public totalRecords: number;
    public records: DemoList[] = [];
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
                    this.records.push(new DemoList(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}
export class DemoProductTableViewFilterRequestSet {
    public frontierMarketingUser: string;
    public productDetail: string;
    public warehouse: string;
    constructor(data: any = {}) {
        this.productDetail = data.productDetail || '';
        this.frontierMarketingUser = data.frontierMarketingUser || '';
        this.warehouse = data.warehouse || '';
    }
}

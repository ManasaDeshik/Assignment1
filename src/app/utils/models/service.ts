import { CustomerDetails, GetFistName } from './order';


export class SparesList {
    public id: string;
    public product_spare_id: string;
    public spareName: string;
    constructor(data: any = {}) {
        this.id = data._id || '';
        this.product_spare_id = data.product_spare_id || '';
        this.spareName = data.product_spare_name;
    }
}
export class ServiceRecordList {
    public customer: CustomerDetails = new CustomerDetails();
    public assignedOE: GetFistName = new GetFistName();
    public assignedOEId: string;
    public complant: string;
    public serviceId: string;
    public tickeNumber: string;
    public productDetailName: string;
    public productDetailId: string;
    public productId: string;
    public warehouseId: string;
    public estimate: number;
    public oeAssignedDate: any;
    public serviceDate: any;
    public receivedDate; any;
    public status: number;
    public oeStatus: number;
    public rejectedDate: any;
    public otherRemarks: string;
    public remarks: string;
    public spares: SparesList[] = [];
    public fmUserName: string;
    public vleCode: string;
    public totalCost: string;
    public demo: string;
    public inWarranty: string;
    constructor(data: any = {}) {
        this.productDetailName = data.product_detail.title || 'NA';
        this.productDetailId = data.product_detail._id || 'NA';
        this.productId = data.product._id || 'NA';
        this.serviceId = data._id || 'NA';
        this.warehouseId = data.warehouse_id || 'NA';
        this.estimate = data.estimate || 0;
        this.status = data.status || null;
        this.otherRemarks = data.other_remarks || 'NA';
        this.oeStatus = data.oe_status || null;
        this.rejectedDate = data.rejected_date || 'NA';
        this.oeAssignedDate = data.oe_assigned_date || 'NA';
        this.serviceDate = data.service_date || 'NA';
        this.receivedDate = data.received_date || 'NA';
        this.fmUserName = data.fm_user.first_name || 'NA';
        this.vleCode = data.fm_user.vle_code ? data.fm_user.vle_code : 'NA';
        this.totalCost = data.value || 'NA';
        this.demo = data.offline_product ? 'Yes' : 'NA';
        if (data.spares) {
            if (data.spares.length > 0) {
                data.spares.forEach(element => {
                    element.warrenty_details.has_warranty ? (this.inWarranty = 'Yes') : (this.inWarranty = 'NA')
                    return false;
                });
            } else {
                this.inWarranty = 'NA'
            }
        } else {
            this.inWarranty = 'NA'
        }
        // this.inWarranty = data.in_warranty || 'NA'
        if (data.remarks) {
            switch (data.remarks) {
                case 1:
                    this.remarks = 'Resolved on remote';
                    break;
                default:
                    break;
            }
        } else {
            this.remarks = 'NA';
        }
        if (data.customers) {
            this.customer = new CustomerDetails(data.customers);
        } else {
            this.customer = new CustomerDetails();
        }
        this.tickeNumber = data.ticket_number || '';
        this.complant = data.complant ? data.complant : 'NA';
        if (data.spares && data.spares.length > 0) {
            data.spares.forEach(element => {
                this.spares.push(new SparesList(element));
            });
        } else {
            this.spares = [];
        }
        if (data.executive_user) {
            this.assignedOE = new GetFistName(data.executive_user);
            this.assignedOEId = data.executive_user._id ? data.executive_user._id : 'NA';
        } else {
            this.assignedOE = new GetFistName();
            this.assignedOEId = 'NA';
        }
    }
}


export class ServiceList {
    public totalPages: number;
    public totalRecords: number;
    public records: ServiceRecordList[] = [];
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
                    this.records.push(new ServiceRecordList(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}
export class ServiceListStatus {
    public name: string;
    public val: number;
    public subName: string;
    public tableHeaders: Array<any> = [];
    constructor(data: any = {}) {
        this.name = data.name || '';
        this.val = data.val || null;
        this.subName = data.subName || '';
        if (data.tableHeaders && data.tableHeaders.length > 0) {
            this.tableHeaders = data.tableHeaders;
        } else {
            this.tableHeaders = [];
        }
    }
}
export class UpdateServiceAction {
    public service_id: string;
    public status: number;
    public rejection_type: number;
    public resolve_type: number;
    public remarks: number;
    public other_remarks: string;
    public estimate: number;
    public challan_no: string;
    public executive_user_id: string;
    constructor(data: any = {}, identifier?: string) {
        this.service_id = data.serviceId || '';
        this.status = data.status || null;
        if (identifier === 'toResolveService' || identifier === 'toRejectService') {
            this.remarks = data.remarks || null;
            this.other_remarks = data.other_remarks || '';
            if (identifier === 'toResolveService') {
                this.resolve_type = data.type || null;
            } else {
                this.rejection_type = data.type || null;
            }
        } else if (identifier === 'toAssignService' || identifier === 'approveInStation') {
            this.estimate = data.estimate || undefined;
            if (identifier === 'toAssignService') {
                this.executive_user_id = data.executive_user_id || undefined;
            }
        } else if (identifier === 'toCompleteService') {
            this.challan_no = data.challan_no || '';
        }
    }
}

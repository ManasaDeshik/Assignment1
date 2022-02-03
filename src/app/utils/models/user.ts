import { isArray } from 'util';
import { SearchFieldBranch, TableDateFields } from './shared';



export class TableViewRequestSet {
    public recordsPerPage: number;
    public pageNumber: number;
    public status: any;
    public searchText: string;
    public searchVLE: string;
    public searchVLEcode: string;
    public searchdeliveryDay: string;
    public searchsaheliId: string;
    public searchleadName: string;
    public searchProductName: string;
    public searchStage: string;
    public registrationDate: string;
    public registrated_from: any;
    public registrated_to: any;
    public role: string;
    public branchName: string;
    public productName: string;
    public villageName: string;
    public search_fm_user_name: string;
    public coordinator_id: string;
    public stage_selected: any;
    public activities_selected: string;
    public district: string;
    public territory_manager: string;
    public search_territory_user: string;
    public customer_stage: any;
    public branchId: string;
    public roleId: string;
    public deliveryDay: string;
    public villageCode: string;
    public customer_type: string;
    public delivery_day: string;
    public start_date: string;
    public end_date: string;
    public fm_user_search: string;
    constructor(data: any = {}) {
        this.start_date = data.start_date || ''
        this.fm_user_search = data.fm_user_search || ''
        this.end_date = data.end_date || ''
        this.recordsPerPage = data.recordsPerPage || 10;
        this.customer_type = data.customer_type || '';
        this.pageNumber = data.pageNumber || 1;
        this.status = data.status || '';
        this.customer_stage = data.customer_stage || '';
        this.role = data.role || '';
        this.searchText = data.searchText || '';
        // this.searchVLEcode = data.searchVLEcode || '';
        this.searchVLEcode = data.searchVLEcode || '';
        this.searchdeliveryDay = data.searchdeliveryDay || '';
        this.searchsaheliId = data.searchsaheliId || '';
        this.searchleadName = data.searchleadName || '';
        this.searchProductName = data.searchProductName || '';
        this.searchStage = data.searchStage || '';
        this.registrationDate = data.registrationDate || '';
        this.registrated_from = data.registrated_from || '';
        this.registrated_to = data.registrated_to || '';
        this.searchVLE = data.searchVLE || '';
        this.branchName = data.branchName || '';
        this.productName = data.productName || '';
        this.villageName = data.village || '';
        this.search_fm_user_name = data.search_fm_user_name || '';
        this.coordinator_id = data.coordinator_id || '';
        this.stage_selected = data.stage_selected || '5,6';
        this.activities_selected = data.activities_selected || '';
        this.district = data.district || '';
        this.territory_manager = data.territory_manager || '';
        this.search_territory_user = data.search_territory_user || '';
        this.branchId = data.branchId || '';
        this.roleId = data.roleId || '';
        this.deliveryDay = data.deliveryDay || '';
        this.villageCode = data.villageCode || '';
        this.delivery_day = (data.delivery_day != 'Delivery Day') ? (data.delivery_day || '') : '' || '';
    }
}
export class UserRecordList {
    public vleCode: number;
    public vleName: string;
    public vleVillage: string;
    public vleMobile: number;
    public vleBranchName: string;
    public phone_number: string;
    public vleState: string;
    public branch: string;
    public vleDateOfRegistration: Date;
    public id: string;
    public roleName: string;
    public warehouseName: string;
    public phone_number_2: string;
    public phone_number_3: string;
    public district: string;
    public territory_manager: string;
    public allowedWarehouse: any;
    public warehouses : any;
    public wareHouse: any = [];
    public deletedAt:any;
    constructor(data: any = {}) {
        this.allowedWarehouse = data.allowed_warehouses || [];
        this.vleCode = data.vle_code || 0;
        this.vleName = data.first_name || '';
        if(data.branch) {
        this.vleVillage = data.branch.village || '';
        }
        this.vleMobile = data.phone_number || 0;
        this.vleBranchName = data.branch.name || '';
        this.vleState = data.branch.state || '';
        this.vleDateOfRegistration = data.createdAt || '';
        this.phone_number = data.phone_number || '';
        this.phone_number_2 = data.phone_number_2 || '';
        this.phone_number_3 = data.phone_number_3 || '';
        this.id = data.id || '';
        this.deletedAt = data.deletedAt;
        this.branch = data.branch || '';
        if (data.role) {
            this.roleName = data.role.name;
        } else {
            this.roleName = '';
        }
        this.warehouses = data.warehouses
        //this.wareHouse = data.warehouses
        this.warehouseName = data.warehouse_name || '';
        this.district = data.branch.district || '';
        if(data.coordinator){
        this.territory_manager =  data.coordinator.first_name;
        }
        else {
            this.territory_manager = 'NA';
        }
        //(data.c) ?
        // (data.role.name == 'Territory Manager') ? data.first_name :
    }
}



export class LeadStatus {
    name: string;
    value: number;
    constructor(data: any = {}, type?: string) {
        this.name = type || '';
        this.value = data || 0;
    }
}
export class LeadTag {
    name: string;
    value: number;
    constructor(data: any = {}, type?: string) {
        this.name = type || '';
        this.value = data || 0;
    }
}
export class LeadRecordList {
    public leadName: string;
    public leadDate: any;
    public phoneNo: number;
    public vleId: string;
    public vleName: string;
    public branchName: string;
    public state: string;
    public status: LeadStatus = new LeadStatus();
    public tag: LeadTag = new LeadTag();
    // public tag: any;
    public villageName: string;
    public id: string;
    public otherProducts: Array<string> = [];
    public interestedProducts: Array<string> = [];
    public customer_code: string;
    public updatedLeadDate: any;
    public socialLoginNumber: string;
    public territoryManager: string;
    public customer_activity;
    public type_of_phone;
    public customer_stage;
    public ivr_result;
    public sjs_input;
    public tm_input;
    public sms_result;
    public frontier_user;
    public branch: any;
    public warehouse_id: string;
    public user_id: string;
    public villageCode: string;
    // public phone_number_3: string;
    constructor(data: any = {}) {
        // this.phone_number_2 = data.phone_number_2 || '';
        // this.phone_number_3 = data.phone_number_3 || '';
        this.warehouse_id = data.warehouse_id || '';
        this.leadDate = data.customer_created_at || '';
        this.updatedLeadDate = data.customer_updated_at || '';
        this.branchName = data.branch.name || '';
        this.branch = data.branch || '';
        // this.ivr_result = data.ivr_result || '';
        switch (data.ivr_result) {
            case 1:
                this.ivr_result = 'Pressed 1'
                break;
            case 2:
                this.ivr_result = 'Pressed 2'
                break;
            case 3:
                this.ivr_result = 'Options Not Pressed'
                break;
            case 4:
                this.ivr_result = 'Wrongly Pressed'
                break;
            case 5:
                this.ivr_result = 'DND'
                break;
            case 6:
                this.ivr_result = 'Not able to call or network issue'
                break;
            case 7:
                this.ivr_result = 'Not picked'
                break;
            case 8:
                this.ivr_result = 'Others'
                break;
            default:
                this.ivr_result = 'NA'
                break;
        }
        switch (data.sjs_input) {
            case 1:
                this.sjs_input = 'Wants to order'
                break;
            case 2:
                this.sjs_input = 'Not interested'
            case 3:
                this.sjs_input = 'Not able to meet'
                break;
            case 4:
                this.sjs_input = 'Wants e-catalog'
                break;
            default:
                this.sjs_input = 'NA'
                break;
        }
        switch (data.tm_input) {
            case 1:
                this.tm_input = 'Wants to order'
                break;
            case 2:
                this.tm_input = 'Not interested'
                break;
            case 3:
                this.tm_input = 'Not able to meet'
                break;
            case 4:
                this.tm_input = 'Wants e-catalog'
                break;
            default:
                this.tm_input = 'NA'
                break;
        }
        switch (data.sms_result) {
            case 1:
                this.sms_result = 'Delivered'
                break;
            case 2:
                this.sms_result = 'Not delivered'
                break;
            case 3:
                this.sms_result = 'DND'
                break;
            default:
                this.sms_result = 'NA'
                break;
        }
        switch (data.customer_stage) {
            case 1:
                this.customer_stage = 'Unaware'
                break;
            case 2:
                this.customer_stage = 'Aware'
                break;
            case 3:
                this.customer_stage = 'Consider'
                break;
            case 4:
                this.customer_stage = 'To be corrected'
                break;
            case 5:
                this.customer_stage = 'Delivery'
                break;
            case 6:
                this.customer_stage = 'Loyalty'
                break;
            default:
                this.customer_stage = 'NA'
                break;
        }
        // switch (data.customer_type) {
        //     case 1:
        //         this.customerStatus = 'Delivery'
        //         break;
        //     case 2:
        //         this.customerStatus = 'Loyalty'
        //         break;
        //     default:
        //         this.customerStatus = 'NA'
        //         break;
        // }



        // this.updatedLeadDate = data.updated_at || '';
        this.state = data.frontier_marketing_user.branch.state || '';
        this.vleId = data.frontier_marketing_user.vle_code || '';
        this.user_id = data.frontier_marketing_user.fm_user_id || '';
        this.socialLoginNumber = data.social_login_phone_number || 'NA'
        if (data.customer_activity) {
            if ((data.customer_activity.length > 0) && (typeof data.customer_activity !== 'string')) {
                this.customer_activity = data.customer_activity;
            } else {
                this.customer_activity = [];
            }
        }
        if (data.type_of_phone) {
            if ((data.type_of_phone.length > 0) && (typeof data.type_of_phone !== 'string')) {
                this.type_of_phone = data.type_of_phone[0];
            } else {
                this.type_of_phone = '';
            }
        }
        // if (data.customer_stage) {
        //     if ((data.customer_stage.length > 0) && (typeof data.customer_stage !== 'string')) {
        //         this.customer_stage = data.customer_stage[0];
        //     } else {
        //         this.customer_stage = '';
        //     }
        // }
        if (data.frontier_marketing_user.first_name) {
            this.vleName = data.frontier_marketing_user.last_name ? data.frontier_marketing_user.first_name + ' ' + data.frontier_marketing_user.last_name : data.frontier_marketing_user.first_name;
        } else {
            this.vleName = '';
        }
        if (data.first_name) {
            this.leadName = data.last_name ? data.first_name + ' ' + data.last_name : data.first_name;
        } else {
            this.leadName = '';
        }
        if (data.saheli_coordinator) {
            this.territoryManager = data.saheli_coordinator.first_name ? data.saheli_coordinator.first_name : 'NA'
        } else {
            this.territoryManager = 'NA'
        }
        this.phoneNo = data.phone_number || 0;
        this.id = data.customer_id || '';
        switch (data.status) {
            case 1:
                this.status = new LeadStatus(data.status, 'Try and Buy');
                break;
            case 2:
                this.status = new LeadStatus(data.status, 'Buy later');
                break;
            case 3:
                this.status = new LeadStatus(data.status, 'Not interested');
                break;
            case 4:
                this.status = new LeadStatus(data.status, 'Buy now');
                break;
            default:
                break;
        }
        switch (data.tag) {
            case '1':
                this.tag = new LeadStatus(data.tag, 'Can become a Saheli');
                // this.tag = 'Potential Saheli';
                break;
            case '2':
                this.tag = new LeadStatus(data.tag, 'Sarpanch');
                // this.tag = 'Sarpanch';
                break;
            case '3':
                this.tag = new LeadStatus(data.tag, 'Doctor');
                // this.tag = 'Doctor';
                break;
            case '4':
                this.tag = new LeadStatus(data.tag, 'School Teacher/Principle');
                // this.tag = 'Teacher or Principle';
                break;
            case '5':
                this.tag = new LeadStatus(data.tag, 'Govt. Officer');
                // this.tag = 'Govt Official';
                break;
            case '6':
                this.tag = new LeadStatus(data.tag, 'Others');
                // this.tag = 'Others';
                break;
            case '7':
                this.tag = new LeadStatus(data.tag, 'SHG CRP');
                // this.tag = 'Others';
                break;
            case '8':
                this.tag = new LeadStatus(data.tag, 'SHG Book Keeper');
                // this.tag = 'Others';
                break;
            case '9':
                this.tag = new LeadStatus(data.tag, 'SHG leader');
                // this.tag = 'Others';
                break;
            case '10':
                this.tag = new LeadStatus(data.tag, 'Other SHG Member');
                // this.tag = 'Others';
                break;
            case '11':
                this.tag = new LeadStatus(data.tag, 'E-Mitra');
                // this.tag = 'Others';
                break;
            case '12':
                this.tag = new LeadStatus(data.tag, 'Shop owner');
                // this.tag = 'Others';
                break;
            case '13':
                this.tag = new LeadStatus(data.tag, 'Asha Worker');
                // this.tag = 'Others';
                break;
            case '14':
                this.tag = new LeadStatus(data.tag, 'Aanganwadi');
                // this.tag = 'Others';
                break;
            case '15':
                this.tag = new LeadStatus(data.tag, 'Farmer');
                // this.tag = 'Others';
                break;
            default:
                break;
        }
        this.villageName = data.branch.village || '';
        this.villageCode = data.branch.village_code || '';
        if (data.intreasted_productIds && data.intreasted_productIds.length > 0) {
            data.intreasted_productIds.forEach(ele => {
                this.interestedProducts.push(ele);
            });
        } else {
            this.interestedProducts = [];
        }
        if (data.other_products) {
            if (data.other_products.length > 0) {
                data.other_products.forEach(ele => {
                    this.otherProducts.push(ele);
                });
            } else {
                this.otherProducts = [];
            }
        } else {
            this.otherProducts = [];
        }
        this.customer_code = data.customer_code || 0;
        this.frontier_user = data.frontier_marketing_user || '';
    }
}
export class TableListUser {
    public totalPages: number;
    public totalRecords: number;
    public records: UserRecordList[] = [];

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
                    this.records.push(new UserRecordList(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}

export class TableListLeadUser {
    public totalPages: number;
    public totalRecords: number;
    public records: LeadRecordList[] = [];

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
                    this.records.push(new LeadRecordList(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}

export class LeadSortFields {
    public leadDate: number;
    public vleId: number;
    public vleName: number;
    public branchName: number;
    public updatedDate: number;
    constructor(data: any = {}) {
        this.leadDate = data.leadDate || '';
        this.vleId = data.vleId || '';
        this.vleName = data.vleName || '';
        this.branchName = data.branchName || '';
        this.updatedDate = data.updatedDate || -1;
    }
}

export class CustomerSortFields {
    public leadDate: number;
    public vleId: number;
    public vleName: number;
    public branchName: number;
    public updatedDate: number;
    public village: number;
    public state: number;
    public registrationDate: number;
    constructor(data: any = {}) {
        this.leadDate = data.leadDate || '';
        this.vleId = data.vleId || '';
        this.vleName = data.vleName || '';
        this.branchName = data.branchName || '';
        this.updatedDate = data.updatedDate || -1;
        this.village = data.village || '';
        this.state = data.state || '';
        this.registrationDate = -1;
    }
}
export class TryAndBuySortFields {
    public productName: number;
    public vleId: number;
    public vleName: number;
    public branchName: number;
    public updatedDate: number;
    public stateName: number;
    public customerName: number;
    public customerPhoneNo: number;
    public registrationDate: number;
    public startDate: number;
    public endDate: number;
    public status: number;
    constructor(data: any = {}) {
        this.productName = data.productName || '';
        this.vleId = data.vleId || '';
        this.vleName = data.vleName || '';
        this.branchName = data.branchName || '';
        this.stateName = data.stateName || '';
        this.customerName = data.customerName || '';
        this.customerPhoneNo = data.customerPhoneNo || '';
        this.registrationDate = data.registrationDate || '';
        this.startDate = data.startDate || '';
        this.endDate = data.endDate || '';
        this.status = data.status || '';
        this.updatedDate = data.updatedDate || -1;
    }
}

export class LeadListRequestSet {
    public requestSet: any;
    constructor(tableViewRequestData: TableViewRequestSet, sortField: LeadSortFields, warehouseId: string) {
        let search_fm_user = (tableViewRequestData.search_fm_user_name != '') ? tableViewRequestData.search_fm_user_name : tableViewRequestData.searchText
        this.requestSet = '?records_per_page=' + tableViewRequestData.recordsPerPage + '&page_number=' +
            tableViewRequestData.pageNumber + '&search_text=' + search_fm_user +
            '&coordinator_id=' + tableViewRequestData.coordinator_id +
            '&customer_activity=' + tableViewRequestData.activities_selected +
            '&customer_stage=' + tableViewRequestData.customer_stage +
            '&delivery_day=' + tableViewRequestData.delivery_day +
            '&search_fm_user=' + tableViewRequestData.searchVLE +
            '&branch_name=' + tableViewRequestData.branchName
            + '&village_name=' + tableViewRequestData.villageName + '&sort_by_customer_date=' + sortField.leadDate +
            '&sort_by_fm_user_name=' + sortField.vleName + '&sort_by_fm_user_vle_code=' +
            sortField.vleId + '&sort_by_branch_name=' + sortField.branchName + '&sort_updated_date=' + sortField.updatedDate
            + '&fm_warehouse_id=' + warehouseId + '&registrated_from=' + tableViewRequestData.registrated_from + '&registrated_to=' + tableViewRequestData.registrated_to;
    }
}

export class CustomerListRequestSet {
    public requestSet: any;
    constructor(tableViewRequestData: TableViewRequestSet, sortField: CustomerSortFields, warehouseId: string) {
        let search_fm_user = (tableViewRequestData.search_fm_user_name != '') ? tableViewRequestData.search_fm_user_name : tableViewRequestData.searchText
        this.requestSet = '?records_per_page=' + tableViewRequestData.recordsPerPage + '&page_number=' +
            tableViewRequestData.pageNumber + '&search_text=' + search_fm_user + '&fm_warehouse_id=' + warehouseId +
            '&customer_stage=' + tableViewRequestData.stage_selected +
            // '&customer_stage=' + tableViewRequestData.stage_selected +
            '&vle_code=' + tableViewRequestData.searchsaheliId +
            '&branch_name=' + tableViewRequestData.villageName +
            '&coordinator_id=' + tableViewRequestData.coordinator_id +
            // '&role_id='+tableViewRequestData.roleId +
            // '&branch_name=' + tableViewRequestData.branchName +
            '&delivery_day=' + tableViewRequestData.deliveryDay +
            //  '&sort_vle_code=' +
            // sortField.vleId + '&sort_fm_user_name=' + sortField.vleName + '&sort_fm_user_village=' + sortField.village
            //  + '&sort_fm_user_branch_name=' + sortField.branchName +  '&sort_fm_user_state=' + sortField.state + 
            //  '&sort_registration_date=' + sortField.registrationDate
            '&registrated_from=' + tableViewRequestData.registrated_from + '&registrated_to=' + tableViewRequestData.registrated_to;

    }
    // '&sort_updated_date=' + sortField.updatedDate +
}

export class CreateUserForm {
    public phone_number: string;
    public first_name: string;
    public vle_code: string;
    public password: string;
    public branch: string;
    public branchId : string;
    public classification: any;
    public created_at: any;
    public createdAt : any;
    public role_id: string;
    public roleId : string;
    public role_name : string;
    public coordinator_id: string;
    public warehouse_id: string;
    public assignedWarehouseFK : string;
    public allowed_warehouses: Array<[string]>;
    public phone_number_2: string;
    public phone_number_3: string;
    public eko_user_code: string;
    public origin : string;
    constructor(data: any = {}) {
        console.log(data)
        this.phone_number = data.phone_number || '';
        if(data.phone_number_2 != "null") {
        this.phone_number_2 = data.phone_number_2 || '';
        }
        if(data.phone_number_3 != "null") {
        this.phone_number_3 = data.phone_number_3 || '';
        }
        this.coordinator_id = data.coordinator_id || null;
        this.first_name = data.first_name || '';
        this.vle_code = data.vle_code || '';
        this.origin = 'Web'
        if (data.allowed_warehouses && data.allowed_warehouses.length > 0) {
            this.allowed_warehouses = data.allowed_warehouses;
        } else {
            this.allowed_warehouses = [];
        }
        this.password = data.password || null;
        if (data.branch) {
            this.branch = data.branch.id;
            this.branchId = data.branch.id;
        } else {
            this.branch = '';
        }
        if(data.role) {
            this.role_name = data.role.name;
        }
        this.role_id = data.role_id || '';
        this.roleId = data.role_id || '';
       // this.role_name = data.role.name || '';
        this.classification = data.classification || '3';
        this.created_at = data.created_at || '';
        this.createdAt = data.createdAt || '';
        this.warehouse_id = data.assignedWarehouseFK || null;
        this.assignedWarehouseFK = data.assignedWarehouseFK || null;
        this.eko_user_code = data.eko_user_code || '';
    }
}

export class IntrestedProdcts {
    public id: string;
    public _id: string;
    constructor(data: any) {
        this.id = data._id;
        this._id = data._id;
    }
}

export class CreateLeadForm {
    public phone_number: string;
    public first_name: string;
    public tag: number;
    public status: number;
    public branch: string;
    public other_products = [];
    public type: number;
    public intreasted_productIds: IntrestedProdcts[] = [];
    public frontier_user_ref: string;
    public frontier_marketing_user: any;
    public address: string;
    public customer_activity;
    public type_of_phone;
    public customer_stage: any;
    public ivr_result: number;
    public sjs_input: number;
    public tm_input: number;
    public sms_result: number;
    public social_login_phone_number: string;
    // public warehouse_id: string;
    // public phone_number_3 : string;
    constructor(data: any = {}) {
        // this.warehouse_id = data.warehouse_id || '';
        this.phone_number = data.phone_number || '';
        this.social_login_phone_number = data.social_login_phone_number || '';
        // this.phone_number_3 = data.phone_number_3 || '';
        this.first_name = data.first_name || '';
        this.tag = data.tag || null;
        this.status = data.status || null;
        this.branch = data.branch || '';
        this.address = data.address || '';
        this.frontier_user_ref = data.frontier_user_ref || '';
        console.log(data.other_products)
        if (data.other_products) {
            
           if(typeof data.other_products !== 'string'){
            console.log('ddsfsfd',typeof data.other_products)
            if (data.other_products.length > 0) {
                console.log('ddsfsfd',typeof data.other_products)
                data.other_products.forEach(element => {
                    this.other_products.push(element);
                });
            } else {
                this.other_products = [];
            }
        }
        else{
            this.other_products = [data.other_products];
        }
        } else {
            this.other_products = [];
        }
        if (data.branch) {
            this.branch = data.branch.id;
        } else {
            this.branch = '';
        }
        this.type = data.type || 1;
        // this.intreasted_productIds = data.intreasted_productIds || '';
        if (data.intreasted_productIds) {
            if (data.intreasted_productIds.length > 0) {
                data.intreasted_productIds.forEach(element => {
                    this.intreasted_productIds.push((element));
                });
            } else {
                this.intreasted_productIds = [];
            }
            if (data.branch) {
                this.branch = data.branch.id;
            } else {
                this.branch = '';
            }
        }
        console.log(data)
        if (data.frontier_marketing_user) {
            this.frontier_marketing_user = data.frontier_marketing_user || '';
            this.frontier_user_ref = data.frontier_marketing_user.id || '';
        }
        
        if (data.customer_activity) {
            if ((data.customer_activity.length > 0) && (typeof data.customer_activity !== 'string')) {
                this.customer_activity = data.customer_activity;
            } else {
                this.customer_activity = [];
            }
        } else {
            this.customer_activity = [];
        }
        if (data.type_of_phone) {
            if ((data.type_of_phone.length > 0)) {
                if ((typeof data.type_of_phone !== 'string')) {
                    this.type_of_phone = data.type_of_phone[0];
                } else {
                    this.type_of_phone = data.type_of_phone;
                }

            } else {
                this.type_of_phone = '';
            }
        } else {
            this.type_of_phone = '';
        }
        // if (data.customer_stage) {
        //     if ((data.customer_stage.length > 0)) {
        //         if ((typeof data.customer_stage !== 'string')) {
        //             this.customer_stage = data.customer_stage[0];
        //         } else {
        //             this.customer_stage = data.customer_stage;
        //         }
        //     } else {
        //         this.customer_stage = '';
        //     }
        // } else {
        //     this.customer_stage = '';
        // }

        // this.customer_activity = data.customer_activity || '';
        this.customer_stage=data.customer_stage;
        this.ivr_result = data.ivr_result || null;
        this.sjs_input = data.sjs_input || null;
        this.tm_input = data.tm_input || null;
        this.sms_result = data.sms_result || null;

    }
}

export class EditUserForm {
    public phone_number: string;
    public first_name: string;
    public password: string;
    public branch: string;
    public role_id: string;
    public role_name: string;
    public _id: string;
    public classification: any;
    public created_at: any;
    public roleId : string;
    public branchId : string;
    public assignedWarehouseFK : string;
    public allowed_warehouses: Array<[string]>;
    public warehouse_id: string;
    public coordinator_id: string;
    // public social_login_phone_number: string;
    public phone_number_3: string;
    public id : string;
    public phone_number_2: string;
    public eko_user_code: string;
    constructor(data: any = {}, id?: string) {
        console.log(data)
        this.phone_number = data.phone_number || '';
        // this.social_login_phone_number = data.social_login_phone_number || '';
        this.phone_number_2 = data.phone_number_2 || '';
        this.phone_number_3 = data.phone_number_3 || '';
        this.first_name = data.first_name || '';
        this.password = data.password || null;
        this.branch = data.branch._id || '';
        this.branchId = data.branch.id || '';
        this.role_id = data.role_id || '';
        this.roleId = data.role_id || '';
        this.role_name = data.role_name;
        this.assignedWarehouseFK = data.assignedWarehouseFK || '';
        this._id = id || '';
        this.id = id || '';
        const distinctArray = data.allowed_warehouses.filter((n, i) => data.allowed_warehouses.indexOf(n) === i);
        this.allowed_warehouses = distinctArray || [];
        this.classification = data.classification || '';
        this.created_at = data.created_at || '';
        this.warehouse_id = data.warehouse_id || null;
        this.coordinator_id = data.coordinator_id || null;

        this.eko_user_code = data.eko_user_code || '';
    }
}

export class EditLeadForm {
    public phone_number: string;
    public first_name: string;
    public tag: number;
    public status: number;
    public branch: string;
    public other_products = [];
    public type: number;
    public intreasted_productIds: IntrestedProdcts[] = [];
    public customer_id: string;
    public frontier_user_ref: string;
    public address: string;
    public customer_activity;
    public type_of_phone;
    public customer_stage: number;
    public ivr_result: any;
    public sjs_input: any;
    public tm_input: any;
    public sms_result: any;
    public social_login_phone_number: string;
    // public warehouse_id: string;
    // public phone_number_3 : string;
    constructor(data: any = {}, id?: string) {
        // this.warehouse_id = data.warehouse_id || '';
        // console.log(data);
        this.phone_number = data.phone_number || '';
        this.social_login_phone_number = data.social_login_phone_number || '';
        // this.phone_number_3 = data.phone_number_3 || '';
        this.first_name = data.first_name || '';
        this.tag = data.tag || null;
        this.status = data.status || null;
        this.branch = data.branch || '';
        this.customer_id = id || '';
        this.frontier_user_ref = data.frontier_user_ref || '';
        this.address = data.address || '';
        if (data.other_products) {
            if (data.other_products.length > 0) {
                data.other_products.forEach(element => {
                    this.other_products.push(element);
                });
            } else {
                this.other_products = [];
            }
        }
        if (data.branch) {
            this.branch = data.branch.id;
        } else {
            this.branch = '';
        }
        this.type = data.type || 1;
        // this.intreasted_productIds = data.intreasted_productIds || '';
        if (data.intreasted_productIds) {
            if (data.intreasted_productIds.length > 0) {
                data.intreasted_productIds.forEach(element => {
                    this.intreasted_productIds.push((element ? element : element._id));
                });
            } else {
                this.intreasted_productIds = [];
            }
            if (data.branch) {
                this.branch = data.branch.id;
            } else {
                this.branch = '';
            }
        }
        if (data.customer_stage ? data.customer_stage.length == 0 : false) {
            this.customer_stage = null;
        } else {
            this.customer_stage = data.customer_stage || '';
        }

        this.customer_activity = data.customer_activity || [];
        this.type_of_phone = data.type_of_phone || '';
        this.ivr_result = data.ivr_result || null;
        this.sjs_input = data.sjs_input || null;
        this.tm_input = data.tm_input || null;
        this.sms_result = data.sms_result || null;
    }
}


export class BranchData {
    public name: string;
    public collections = [];
    public searchRequest: string;
    public long_text: string;
    constructor(data: any = {}, isEdit?: string) {
        if (isEdit) {
            this.name = data || '';
            this.searchRequest=data || '';
        } else {
            this.name = data.name || '';
            this.searchRequest=data.name || '';
        }
        if (data.long_text) {
            this.long_text = data.long_text;
        }
        if (data.collections) {
            if (data.collections.length > 0) {
                data.collections.forEach(ele => {
                    this.collections.push(ele);
                });
            } else {
                this.collections = [];
            }
        } else {
            this.collections = [];
        }
        if(data.searchRequest)
        this.searchRequest = data.searchRequest || '';
    }
}
export class BranchDetails {
    public state: BranchData = new BranchData();
    public branch: BranchData = new BranchData();
    public district: BranchData = new BranchData();
    public village: BranchData = new BranchData();
    public block: BranchData = new BranchData();
    public panchayat: BranchData = new BranchData();

    constructor(data: any = {}, isEdit?: string) {
        this.state = new BranchData(data.state, isEdit) || new BranchData();
        this.branch = new BranchData(data.name, isEdit) || new BranchData();
        this.district = new BranchData(data.district, isEdit) || new BranchData();
        this.village = new BranchData(data.village, isEdit) || new BranchData();
        this.block = new BranchData(data.block, isEdit) || new BranchData();
        this.panchayat = new BranchData(data.panchayat, isEdit) || new BranchData();
    }
}
export class ListBranchRequestSet {
    public searchDistrict: string;
    public searchState: string;
    public searchBranchName: string;
    public searchVillageName: string;
    constructor(data: any = {}) {
        this.searchState = data.searchState || '';
        this.searchBranchName = data.searchBranchName || '';
        this.searchDistrict = data.searchDistrict || '';
        this.searchVillageName = data.searchVillageName || '';
    }
}


export class TryBuyUser {
    public start_date: any;
    public end_date: any;
    public leadName: string;
    public branchName: string;
    public vleId: string;
    public vleName: string;
    public phoneNo: number;
    public villageName: string;
    public status: LeadStatus = new LeadStatus();
    public state: string;
    public id: string;
    public delivery_price: number;
    public productTitle: string;
    public product_detail_id: string;
    public buyingDate: any;
    public registeredDate: any;
    public reviews: Array<string> = [];
    public territoryManager: string;
    public buying_date: any;
    public warehouseList = [];
    constructor(data: any = {}) {
        this.start_date = data.start_date || '';
        this.end_date = data.end_date || '';
        this.buying_date = data.buying_date || '';
        this.delivery_price = data.product_details.delivery_price || 0;
        this.productTitle = data.product_details.title || 0;
        this.branchName = data.frontier_marketing_user.branch.name || '';
        this.state = data.frontier_marketing_user.branch.state || '';
        this.vleId = data.frontier_marketing_user.vle_code || '';
       // this.villageName = data.customers.user.branch.village || '';
        this.phoneNo = data.customers.phone_number || 0;
        this.id = data.id || '';
        this.buyingDate = data.buying_date || '';
        this.product_detail_id = data.product_details.id;
        this.registeredDate = data.createdAt || '';
        if(data.frontier_marketing_user){
            this.warehouseList = data.frontier_marketing_user.warehouses;
            this.villageName = data.frontier_marketing_user.branch.village || '';
        }
        if (data.customers.first_name) {
            this.leadName = data.customers.last_name ? data.customers.first_name + ' ' + data.customers.last_name : data.customers.first_name;
        } else {
            this.leadName = '';
        }
        if (data.frontier_marketing_user.first_name) {
            this.vleName = data.frontier_marketing_user.last_name ? data.frontier_marketing_user.first_name + ' ' + data.frontier_marketing_user.last_name : data.frontier_marketing_user.first_name;
        } else {
            this.vleName = '';
        }
        switch (data.status) {
            case 0:
                this.status = new LeadStatus(data.status, 'Ongoing');
                break;
            case 1:
                this.status = new LeadStatus(data.status, 'Interested to buy');
                break;
            case 2:
                this.status = new LeadStatus(data.status, 'Will buy later');
                break;
            case 3:
                this.status = new LeadStatus(data.status, 'Not interested');
                break;
            default:
                break;
        }
        if (data.reviews) {
            if (data.reviews.length > 0) {
                data.reviews.forEach(ele => {
                    this.reviews.push(ele.description);
                });
            } else {
                this.reviews = [];
            }
        } else {
            this.reviews = [];
        }
        if (data.frontier_marketing_user.coordinator) {
            this.territoryManager = data.frontier_marketing_user.coordinator.first_name ? data.frontier_marketing_user.coordinator.first_name : 'NA';
        } else {
            this.territoryManager = 'NA';
        }
    }
}

export class TableListTryBuy {
    public totalPages: number;
    public totalRecords: number;
    public records: TryBuyUser[] = [];

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
                    this.records.push(new TryBuyUser(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}

export class EditTryBuy {
    public id: string;
    public start_date: any;
    public end_date: any;
    public product_detail_id: string;
    public status: string;
    public buying_date: any;
   // public reviews: any;

    constructor(data: any = {}) {
        this.id = data.id || '';
        this.start_date = data.start_date || '';
        this.end_date = data.end_date || '';
        this.product_detail_id = data.product_detail_id;
        this.status = (data.status.value).toString() || '';
        this.buying_date = data.buying_date || '';
       // this.reviews = (data.reviews).toString() || '';
    }
}

export class DownloadSubcribeData {
    public searchText: string;
    public searchFmUser: string;
    public status: number;
    public searchLeadUser: string;
    public registerFromDate: any;
    public registerToDate: any;
    public langSelected: string;
    public registrationDate: any;
    public searchProduct: string;
    public category: string;
    public warehouse: string;
    public branch: string;
    public manufacture: string;
    public selectedOrder: string;
    public role: any;
    public orderDateField: TableDateFields;
    public orderTabStatus: string;
    public warehouseId: string;
    public productDetail: string;
    public frontierMarketingUser: string;
    public arrivalDateField: TableDateFields;
    public searchVillage: string;
    public search_fm_user_name: string;
    public stage_selected: any;
    public activities_selected: string;
    public searchBranch: string;
    public searchDistrict: string;
    public search_territory_user: string;
    public coordinator_id: string;
    public branchName: string;
    public villageName: string;
    public fm_user_search: string;
    public role_id: string;
    public productName: string;
    public customer_stage: any;
    public selectedSaheliId: string;
    public delivery_day: string;
    public start_date: string;
    public end_date: string;
    constructor(data: any = {}, type?: string) {
        this.searchText = data.searchText || '';
        this.searchFmUser = data.searchFmUser || '';
        this.searchLeadUser = data.searchLeadUser || '';
        this.registrationDate = data.registrationDate || '';
        this.role = data.role || '';
        this.searchProduct = data.searchProduct || '';
        this.searchVillage = data.village || '';
        this.searchBranch = data.branch || '';
        this.searchDistrict = data.district || '';
        this.search_territory_user = data.search_territory_user || '';
        this.coordinator_id = data.coordinator_id || '';
        this.branchName = data.branchName || '';
        this.villageName = data.villageName || '';
        this.fm_user_search = data.fm_user_search || '';
        this.role_id = data.role_id || '';
        this.productName = data.productName || '';
        this.selectedSaheliId = data.selectedSaheliId || '';
        this.delivery_day = data.delivery_day || '';
        if (type === 'service') {
            this.status = data.status || 0;
            // this.orderTabStatus = data.orderTabStatus || 'Received';
            // this.selectedOrder = data.selectedOrder || 'received';
            // this.warehouseId = data.warehouseId || '';
        } else {
            this.status = data.status || '';
        }
        if (type === 'order') {
            this.status = data.status || 0;
            this.orderTabStatus = data.orderTabStatus || 'Received';
            this.selectedOrder = data.selectedOrder || 'received';
            this.warehouseId = data.warehouseId || '';
            this.start_date = data.start_date || '';
            this.end_date = data.end_date || '';
        } else {
            this.status = data.status || '';
        }
        if (type === 'lead') {
            this.registerFromDate = data.registerFromDate || '';
            this.registerToDate = data.registerToDate || '';
            this.search_fm_user_name = data.search_fm_user_name || '';
            this.activities_selected = data.activities_selected || '';
            this.stage_selected = data.stage_selected || '';
            this.customer_stage = data.customer_stage || '';
        }
        if (type === 'ongoingPO') {
            this.branch = data.branch || '';
            this.warehouse = data.warehouse || '';
            this.manufacture = data.manufacture || '';
            this.orderDateField = new TableDateFields(data) || new TableDateFields();
            this.arrivalDateField = new TableDateFields(data) || new TableDateFields();
        }
        if (type === 'ongoingPO' || type === 'products') {
            this.category = data.category || '';
        }
        if (type === 'products' || type === 'category') {
            this.langSelected = data.langSelected || 'en';
        }
        if (type === 'demoProduct') {
            this.productDetail = data.productDetail || '';
            this.warehouse = data.warehouse || '';
            this.frontierMarketingUser = data.frontierMarketingUser || '';
            this.status = data.status || 4;
        }
        if (type === 'service') {

        }
    }
}

export class DownloadSubscribeParams {
    public order: DownloadSubcribeData;
    public lead: DownloadSubcribeData;
    public tryBuy: DownloadSubcribeData;
    public fmUser: DownloadSubcribeData;
    public branch: SearchFieldBranch;
    public manufacture: DownloadSubcribeData;
    public warehouse: DownloadSubcribeData;
    public ongoingPO: DownloadSubcribeData;
    public franchise: DownloadSubcribeData;
    public products: DownloadSubcribeData;
    public category: DownloadSubcribeData;
    public demoProduct: DownloadSubcribeData;
    public service: DownloadSubcribeData;
    public customer: DownloadSubcribeData;

    constructor(data: any = {}) {
        this.order = new DownloadSubcribeData(data, 'order') || new DownloadSubcribeData();
        this.lead = new DownloadSubcribeData(data, 'lead') || new DownloadSubcribeData();
        this.customer = new DownloadSubcribeData(data, 'customer') || new DownloadSubcribeData();
        this.tryBuy = new DownloadSubcribeData(data, 'trybuy') || new DownloadSubcribeData();
        this.fmUser = new DownloadSubcribeData(data, 'fmUser') || new DownloadSubcribeData();
        this.manufacture = new DownloadSubcribeData(data, 'manufacture') || new DownloadSubcribeData();
        this.warehouse = new DownloadSubcribeData(data, 'warehouse') || new DownloadSubcribeData();
        this.franchise = new DownloadSubcribeData(data, 'franchise') || new DownloadSubcribeData();
        this.products = new DownloadSubcribeData(data, 'products') || new DownloadSubcribeData();
        this.category = new DownloadSubcribeData(data, 'category') || new DownloadSubcribeData();
        this.demoProduct = new DownloadSubcribeData(data, 'demoProduct') || new DownloadSubcribeData();
        this.branch = new SearchFieldBranch(data) || new SearchFieldBranch();
        this.ongoingPO = new DownloadSubcribeData(data, 'ongoingPO') || new DownloadSubcribeData();
        this.service = new DownloadSubcribeData(data, 'service') || new DownloadSubcribeData();
    }
}



export class BranchRecordList {
    public name: string;
    public village: string;
    public villageCode: string;
    public district: string;
    public state: string;
    public totalVLE: number;
    public totalLeads: number;
    public id: string;
    public productSold: number;
    public referrals: number;
    public newVle: number;
    public retailPoints: number;
    public profit: number;
    public revenue: number;
    public household_count: number;
    public population_count: number;
    public shg_group_count: number;
    public shg_member_count: number;
    public village_status: string;
    public delivery_day: string;
    public saheli_count: string;
    public total_contacts: string;
    public TMName: string;
    constructor(data: any = {}) {
        this.name = data.name || 'NA';
        this.village = data.village || 'NA';
        this.villageCode = data.village_code || 'NA';
        this.district = data.district || 'NA';
        this.state = data.state || 'NA';
        this.totalVLE = data.frontier_marketing_users_count || 0;
        this.productSold = data.productSold || 'NA';
        this.referrals = data.referrals || 'NA';
        this.newVle = data.newVle || 'NA';
        this.retailPoints = data.retailPoints || 'NA';
        this.profit = data.profit || 'NA';
        this.id = data.id;
        this.revenue = data.revenue || 'NA';
        this.household_count = data.household_count || 0;
        this.population_count = data.population_count || 0;
        this.shg_group_count = data.shg_group_count || 0;
        this.shg_member_count = data.shg_member_count || 0;
        this.village_status = data.village_status || 'NA';
        this.delivery_day = data.delivery_day || 'NA';
        this.saheli_count = data.frontier_marketing_users_count || 0;
        this.total_contacts = data.contacts_count || 0;
        this.totalLeads = data.customer_count || 0;
    }
}

export class TableListBranches {
    public totalPages: number;
    public totalRecords: number;
    public records: BranchRecordList[] = [];

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
                    this.records.push(new BranchRecordList(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}

export class BranchRecordCodes {
    public stateRecors: boolean;
    public districtRecords: boolean;
    public branchRecords: boolean;
    public blockrecords: boolean;
    constructor(data: any, type?) {
        this.stateRecors = true;
        this.districtRecords = true;
        this.branchRecords = true;
        this.blockrecords = true;
    }
}


export class CreateBranch {
    public name: string;
    public code: number;
    // public location: string;
    public district: string;
    public district_code: number;
    public state: string;
    public state_code: number;
    public block: string;
    public block_code: number;
    public panchayat: string;
    public village: string;
    public branch_id: string;
    public distirctRecords: any;
    public household_count: number;
    public population_count: number;
    public shg_group_count: number;
    public shg_member_count: number;
    public village_status: string;
    public delivery_day: string;
    public village_code: string;
    constructor(data: any = {}, type?) {
        this.name = data.name || '';
        this.code = data.code || '';
        this.village_status = data.village_status || '';
        this.delivery_day = data.delivery_day || '';
        this.village_code = data.village_code || '';
        this.district = data.district || '';
        this.district_code = data.district_code || '';
        this.state = data.state || '';
        this.state_code = data.state_code || '';
        this.block = data.block || '';
        this.block_code = data.block_code || '';
        this.panchayat = data.panchayat || '';
        this.village = data.village || '';
        this.household_count = data.household_count || 0;
        this.population_count = data.population_count || 0;
        this.shg_group_count = data.shg_group_count || 0;
        this.shg_member_count = data.shg_member_count || 0;
        // if (data.location) {
        //     this.location = data.location;
        // } else {
        //     this.location = '';
        // }

        if (data._id) {
            this.branch_id = data._id;
        }
    }
}


export class EditBranch {
    public name: string;
    public code: number;
    public location: string;
    public district: string;
    public district_code: number;
    public state: string;
    public state_code: number;
    public block: string;
    public block_code: number;
    public panchayat: string;
    public village: string;
    public branch_id: string;
    constructor(data: any = {}, type?) {
        this.name = data.name || '';
        this.code = data.code || '';
        this.location = data.location || '';
        this.district = data.district || '';
        this.district_code = data.district_code || '';
        this.state = data.state || '';
        this.state_code = data.state_code || '';
        this.block = data.block || '';
        this.block_code = data.block_code || '';
        this.panchayat = data.panchayat || '';
        this.village = data.village || '';
        if (data.location) {
            this.location = data.location;
        } else {
            this.location = '';
        }

        if (data._id) {
            this.branch_id = data._id;
        }
    }
}
export class FMUserSortFields {
    public sortFmCode: number;
    public sortFmUserName: number;
    public sortFmVillage: number;
    public sortFmState: number;
    public sortRegistration: number;
    constructor(data: any = {}) {
        this.sortFmState = data.sortFmState || '';
        this.sortFmCode = data.sortFmCode || '';
        this.sortFmUserName = data.sortFmUserName || '';
        this.sortFmVillage = data.sortFmVillage || '';
        this.sortRegistration = data.sortRegistration || '';
    }
}

export class TableListCustomers {
    public totalPages: number;
    public totalRecords: number;
    public records: CustomerRecordList[] = [];

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
                    if (element.parent_orders ? element.parent_orders.length > 0 : false) {
                        element.parent_orders.forEach((product,i) => {
                            product.cart.map((v,j)=>{
                                v.updated_at=product.updatedAt;
                            // product.view = element.has_more_order_records;
                                v.viewcart=false;
                                v.view=false
                            if (i >= 2) {
                                v.view = true;
                            }
                            if (j > 0) {
                                v.view = true;
                            }
                            if (i == 0) {
                                (element.village_code == undefined) ? (element.village_code = 'NA') : true;
                                (element.delivery_day == undefined) ? (element.delivery_day = 'NA') : true;
                            }
                            if(i<=2 && j == 0)
                            this.records.push(new CustomerRecordList(((i == 0) ? element : {order_counts :element.order_counts}), v, element.id, element.customer_stage));
                        })
                        })
                    } else {
                        this.records.push(new CustomerRecordList(element, [], element.id, element.customer_stage));
                    }

                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}

export class CustomerRecordList {
    public leadId: string;
    public leadName: string;
    public leadDate: any;
    public phoneNo: string;
    public villageName: string;
    public villageCode: string;
    public branchName: string;
    public deliveryDay: string;
    public saheliId: string;
    public saheliName: string;
    public territoryManager: string;
    public completedDate: string;
    public productName: string;
    public quantity: string;
    public value: string;
    public customer_branch: any;
    public saheli_details: any;
    public customer_stage;
    public customer_id: string;
    public view: string;
    public customer_type: string;
    public cartList:any;

    constructor(data: any = {}, product, id, customer_stage) {
        this.customer_id = id;
        this.customer_type = (data.customer_stage && data.customer_stage == '6') ? 'Loyalty' :  'Delivery';
        this.phoneNo = data.phone_number || '';
        this.leadId = data.lead_id || '';
        this.villageName = data.village ? data.village : '';
        this.villageCode = data.village_code ? data.village_code : '';
        this.deliveryDay = data.delivery_day ? data.delivery_day : '';
        this.saheliId = data.vle_code ? data.vle_code : ''
        this.saheliName = data.saheli_name ? data.saheli_name : '';
       // this.cartList=data.parent_orders[0].cart?data.parent_orders[0].cart:[];
       this.cartList= (data.parent_orders && data.parent_orders[0] && data.parent_orders[0].cart)?data.parent_orders[0].cart:[];
       console.log('1535',this.cartList)
        // this.view = data.has_more_order_records;
        if (product) {
            this.productName = product.product_detail ? product.product_detail.title : 'NA' || 'NA';
            this.completedDate = product.updated_at || 'NA';
            this.quantity = product.quantity || 'NA';
            this.value = product.value || 'NA';
            this.view = product.view;
        } else {
            this.productName = 'NA';
            this.completedDate = 'NA';
            this.quantity = 'NA'
            this.value = 'NA'
        }
        this.leadDate = data.customer_created_at || '';
        this.branchName = data.branch_name ? data.branch_name : '';
        if (data.customer_stage) {
            if ((data.customer_stage.length > 0) && (typeof data.customer_stage !== 'string')) {
                this.customer_stage = data.customer_stage[0];
            } else {
                this.customer_stage = '';
            }
        }
        if (this.customer_type == '' || this.customer_type == undefined) {
            this.customer_type = (customer_stage == '5') ? 'Delivery' : (customer_stage == '6') ? 'Loyalty' : 'NA';
        }

        if (data.first_name) {
            this.leadName = data.last_name ? data.first_name + ' ' + data.last_name : data.first_name;
        } else {
            this.leadName = '';
        }
    
            this.territoryManager = data.tm_name? data.tm_name : ''
       

    }
}



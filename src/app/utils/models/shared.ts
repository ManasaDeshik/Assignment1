
import { breadcrumbCollections } from '../enums/shared-const';
import { BranchDetails } from './user';


export class SnackBarErrorMessage {
    public title?: string;
    public body?: string;
    constructor(data: any = {}) {
        this.title = data.type || 'OK';
        this.body = data.body || 'Something went wrong';
    }
}

export class SnackBarSuccessMessage {
    public title?: string;
    public body?: string;
    constructor(data: any = {}) {
        this.title = data.type || 'OK';
        this.body = data.body || 'Success';
    }
}

export class SideBarProperties {
    public routerLink: string;
    public title: string;
    public iconBlack: string;
    public iconBw: string;
    public subtitle: string;
    public active: boolean;
    constructor(data: any = {}) {
        this.routerLink = data.routerLink || '';
        this.title = data.title || '';
        this.iconBlack = data.iconBlack || '';
        this.iconBw = data.iconBw || '';
        this.subtitle = data.subtitle || '';
    }
}





export class UserInfo {
    public userName: string;
    public role: number;
    public userId: string;
    public warehouse_id: string;
    public branch_name : string;
    constructor(data: any = {}) {
        this.userName = data.first_name || '';
        this.role = data.role || '';
        this.warehouse_id = data.warehouse_id || '';
        this.userId = data.id || '';
        this.branch_name = data.branch.name || '';
    }
}

export class BreadCrumb {
    public url: string;
    public label: string;
    constructor(urlSegmentKey: string) {
        const accessKey = breadcrumbCollections[urlSegmentKey];
        this.url = accessKey ? accessKey.url : '';
        this.label = accessKey ? accessKey.labelName : '';
    }
}
export class BranchApiRequestSet {
    public requestSet: any;
    constructor(branchData: BranchDetails) {
        this.requestSet = '?search_by_state=' + branchData.state.searchRequest + '&search_by_district='
            + branchData.district.searchRequest + '&search_by_branch_name=' + branchData.branch.searchRequest + '&search_by_village=' +
            branchData.village.searchRequest 
            + '&search_by_panchayat=' + branchData.panchayat.searchRequest + '&records_per_page=5&page_number=1';
    }
}
export class BranchApiRequestSetFinal{
    public requestSet: any;
    constructor(branchData: BranchDetails) {
        this.requestSet = '?search_by_state=' + branchData.state.searchRequest + '&search_by_district='
            + branchData.district.searchRequest + '&search_by_branch_name=' + branchData.branch.searchRequest + '&search_by_village=' +
            branchData.village.searchRequest 
            + '&search_by_panchayat=' + branchData.panchayat.searchRequest;
    }
}
export class SurveyZoneAPIRequestFinal{
    public requestSet: any;
    constructor(branchData: any) {
        this.requestSet = '?state=' + branchData.state + '&district='
            + branchData.district + '&branch=' + branchData.branch + '&village=' +
            branchData.village ;
    }
}
export class TableDateFields {
    public fromDate: any;
    public toDate: any;
    public maxDate: any;
    public minDate: any;
    constructor(data: any = {}) {
        this.fromDate = data.fromDate || '';
        this.toDate = data.toDate || '';
        this.maxDate = new Date();
    }
}
export class SearchFieldBranch {
    public searchState: string;
    public searchDistrict: string;
    public searchVillage: string;
    public searchBranch: string;
    public delivery_day: string;
    public saheliNameMobile: string;
    public TMNameMobile: string;
    constructor(data: any = {}) {
        this.searchState = data.searchState || '';
        this.searchDistrict = data.searchDistrict || '';
        this.searchVillage = data.searchVillage || '';
        this.searchBranch = data.searchBranch || '';
        this.delivery_day = data.delivery_day || '';
        this.saheliNameMobile = data.saheliNameMobile || '';
        this.TMNameMobile = data.TMNameMobile || '';
    }
}
export class BranchSortFields {
    public searchState: number;
    public searchDistrict: number;
    public searchVillage: number;
    public searchBranch: number;
    public totalLeads: number;
    public totalVle: number;
    constructor(data: any = {}) {
        this.totalVle = data.totalVle || '';
        this.totalLeads = data.totalLeads || '';
        this.searchState = data.searchState || '';
        this.searchDistrict = data.searchDistrict || '';
        this.searchVillage = data.searchVillage || '';
        this.searchBranch = data.searchBranch || '';
    }
}





export class BranchInfoSet {
    public title: string;
    public tableColumnHeaders: Array<string>;
    public tableHeaderText: string;
    public tableSearchText: string;
    public branchInfoCardText: string;
    public graphType: string;
    public apiEndPoint: string;
    public routerLink: string;
    public graphColor: string;
    public graphColorBar: string;
    public filterCollections: Array<string>;
    public branchInfoData: Array<any>;
    public currentPage: number;
    public graphInfo: any;
    public graphXaxisInfo: string;
    public graphResponseParam: string;
    public totalRecords: number;
    constructor(data: any = {}) {
        this.title = data.title || '';
        this.tableColumnHeaders = data.tableColumnHeaders || '';
        this.tableHeaderText = data.tableHeaderText || '';
        this.tableSearchText = data.tableSearchText || '';
        this.branchInfoCardText = data.branchInfoCardText || '';
        this.graphType = data.graphType || '';
        this.apiEndPoint = data.apiEndPoint || '';
        this.routerLink = data.routerLink || '';
        this.graphColor = data.graphColor || '';
        this.graphColorBar = data.graphColorBar || '';
        this.filterCollections = data.filterCollections || '';
        this.branchInfoData = data.branchInfoData || [];
        this.graphXaxisInfo = data.graphXaxisInfo || '';
        this.graphResponseParam = data.graphResponseParam || '';
        this.currentPage = 1;
        this.totalRecords = 0;
        this.graphInfo = data.graphInfo || '';
    }
}

export class TotalCollections {
    public new_VLEs: number;
    public total_VLEs: number;
    public total_leads: number;
    public retal_points: number;
    public product_sold: number;
    public refereal_generated: number;
    public total_revenue: number;
    constructor(data: any = {}) {
        this.new_VLEs = data.new_VLEs || 0;
        this.total_VLEs = 2500 || 0;
        this.total_leads = data.total_leads || 0;
        this.retal_points = 2500 | 0;
        this.product_sold = data.product_sold || 0;
        this.refereal_generated = data.refereal_generated || 0;
        this.total_revenue = data.total_revenue || 0;
    }
}

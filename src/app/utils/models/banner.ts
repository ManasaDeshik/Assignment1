export class TableViewRequestSetBanner {
    public recordsPerPage: number;
    public pageNumber: number;
    constructor(data: any = {}) {
        this.recordsPerPage = data.recordsPerPage || 10;
        this.pageNumber = data.pageNumber || 1;
    }
}


export class BannerList {
    public id: string;
    public url: string;

    constructor(d: any = {}) {
        this.id = d.id || '';
        this.url = d.url || '';
    }
}

export class TableListBanner {
    public totalPages: number;
    public totalRecords: number;
    public records: BannerList[] = [];

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
                    this.records.push(new BannerList(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}
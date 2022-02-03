

export class Login {
    public phone_number: string;
    public password: string;
    constructor(data: any = {}) {
        this.phone_number = data.phone_number.toString() || '';
        this.password = data.password || '';
    }
}



export class DownloadApiReference {
    public apiEndPoint: string;
    public reportName: string;
    public requestSet: string;
    constructor(apiEndPoint?: string, reportName?: string , requestSet?:string) {
        this.apiEndPoint = apiEndPoint || '';
        this.reportName = reportName || '';
        if (requestSet) {
            this.requestSet = requestSet;
        } else {
            this.requestSet = '';
        }
    }
}


export class UploadExcelReference {
    public apiEndPoint: string;
    public requestSet: string;
    constructor(apiEndPoint: string , requsetSet?: string) {
        this.apiEndPoint = apiEndPoint;
        this.requestSet = requsetSet || '';
    }
}

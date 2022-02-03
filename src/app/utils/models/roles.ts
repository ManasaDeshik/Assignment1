
export class RolePermissionVal {
    public read: boolean;
    public write: boolean;
    public edit: boolean;
    public delete: boolean;
    public download: boolean;
    constructor(data: any = {}) {
        this.read = data.read || false;
        this.write = data.write || false;
        this.edit = data.edit || false;
        this.delete = data.delete || false;
        this.download = data.download || false;
    }
}
export class ListModule {
    public name: string;
    public permission: RolePermissionVal;
    public sub_module:any;
    constructor(data: any = {}) {
        this.name = data.name || '';
        this.permission = new RolePermissionVal(data.permission) || new RolePermissionVal();
        this.sub_module = data.sub_module;
    }
}


export class RoleRecordList {
    public name: string;
    public description: string;
    public id: string;
    public roles: ListModule[] = [];
    constructor(data: any = {}, isLogin?: boolean) {
        if (isLogin) {
            this.name = data.name.replace(/\s+/g, '').toLowerCase() || '';
        } else {
            this.name = data.name || '';
        }
        this.description = data.description || '';
        if (data.id) {
            this.id = data.id || '';
        }
        data.role_permission = (data.role_permission)?data.role_permission : data.roles
        if (data.role_permission) {
            if(typeof(data.role_permission)!='object') data.role_permission = JSON.parse(data.role_permission)
            if (data.role_permission.length > 0) {
                data.role_permission.forEach(element => {
                    this.roles.push(new ListModule(element));
                });
            } else {
                this.roles = [];
            }
        } else {
            this.roles = [];
        }
    }
}
export class TableListRole {
    public totalPages: number;
    public totalRecords: number;
    public records: RoleRecordList[] = [];

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
                    this.records.push(new RoleRecordList(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}

export class TableViewRoleRequestSet {
    public recordsPerPage: number;
    public pageNumber: number;
    public searchText: string;
    constructor(data: any = {}) {
        this.recordsPerPage = data.recordsPerPage || 10;
        this.pageNumber = data.pageNumber || 1;
        this.searchText = data.searchText || '';
    }
}
export class CreateUpdateRole {
    public name: string;
    public description: string;
    public role_id: string;
    public is_admin_login_enabled: boolean;
    public is_saheli_login_enabled: boolean;
    public is_OE_login_enabled: boolean;
    public is_saheli_coordinator_login_enabled: boolean;
    public roles: ListModule[] = [];
    constructor(role: any, module: ListModule[], userLoggedInCheck: Array<any>) {
        this.name = role.name || '';
        this.is_admin_login_enabled = userLoggedInCheck[0].value || false;
        this.is_saheli_login_enabled = userLoggedInCheck[1].value || false;
        this.is_OE_login_enabled = userLoggedInCheck[2].value || false;
        this.is_saheli_coordinator_login_enabled = userLoggedInCheck[3].value || false;
        this.description = role.description || '';
        if (role.id) {
            this.role_id = role.id;
        }
        if (module) {
            if (module.length > 0) {
                module.forEach(element => {
                    this.roles.push(new ListModule(element));
                });
            } else {
                this.roles = [];
            }
        } else {
            this.roles = [];
        }
    }
}

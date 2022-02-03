import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  moduleNameKeys,
  RolePermissionVal,
  SharedService,
  TableViewRoleRequestSet,
  CommonService,
  LoaderService
} from "src/app/utils";
@Component({
  selector: "app-download-table",
  templateUrl: "./download-table.component.html",
  styleUrls: ["./download-table.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DownloadTableComponent implements OnInit {
  public permissionSets: RolePermissionVal = new RolePermissionVal();

  @Input() tableHeaders;
  @Input() listDownloads;
  @Output() pagination = new EventEmitter<string>();

  maxValue: any;
  public fromDate:string;
  public toDate:string;
  public filter:any;
  public tableViewRequestData: TableViewRoleRequestSet =
    new TableViewRoleRequestSet();

  constructor(
    private sharedService: SharedService,
    private commonService: CommonService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.modulePermissionSets();
    console.log(this.tableHeaders);
    this.maxValue = Math.floor(Math.random() * 100) + 1 + "%";
  }

  /**
   * @method  modulePermissionSets()
   * @description - the following modulePermissionSets() method is used set crud operations for module.
   * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
   *  module passing module name  as a params.
   * @author amitha.shetty
   */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(
      moduleNameKeys.role
    );
  }

  getPage(event) {
    if (event > 0 && event <= this.listDownloads.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.pagination.emit(event);
    }
  }

  Download(item){
    this.commonService.getdevNew(`download/list/${item.id}`).subscribe((response)=>{
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.href = response.data.path
      a.download = item.filename;
      a.click();
      document.body.removeChild(a);
    })
  }

  getFilter(params) {
    this.loaderService.show('hide');
    let query = "?";
    Object.keys(params).map((val) => {
      query += `${val}=${params[val]}&`;
    });
    this.fromDate=params.start_date;
    this.toDate=params.end_date;
    this.commonService
      .getDataNew("download/filter" + query)
      .subscribe((response) => {
        if (response.success) {
          let data = response.payload;
         this.filter=Object.values(data.records);
        }
      });
  }
}

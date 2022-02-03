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
} from "src/app/utils";
@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.scss']
})
export class ListSurveyComponent implements OnInit {
  @Input() tableHeaders;
  @Input() listDownloads1;
  @Output() pagination = new EventEmitter<string>();
  public tableViewRequestData: TableViewRoleRequestSet =
  new TableViewRoleRequestSet();
  constructor() { }

  ngOnInit(): void {
  }
  getPage(event) {
    if (event > 0 && event <= this.listDownloads1.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.pagination.emit(event);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { TableViewRequestSet, CommonService, LoaderService, SharedService, serviceListStatus, ServiceRecordList, serviceResolveType, serviceRejectionType, assignSubTabStatus, serviceTrackStatus, pickUpSubTabStatus, DownloadSubscribeParams, FetchUserTabDetailsService } from 'src/app/utils';
import { ServiceList, ServiceListStatus } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { ServiceActionDialogComponent } from 'src/app/utils/components/service-action-dialog/service-action-dialog.component';




@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  public serviceStatus = serviceListStatus;
  public serviceTrack = serviceTrackStatus;
  public assaignedSubTab = assignSubTabStatus;
  public pickUpSubTab = pickUpSubTabStatus;
  public selectedBtnVal = new ServiceListStatus(this.serviceStatus[0]);
  public oeStatus: any = '';
  public activeBtn = 'Received';
  public serviceRequestList: ServiceList = new ServiceList();
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public warehouse = {
    name: '',
    id: '',
    items: []
  };
  public searchVleText = '';
  public productName: string = '';
  public serviceID: string = '';
  public ticketNumber: string = '';
  public villageName: string = '';
  public subscribeData: DownloadSubscribeParams = new DownloadSubscribeParams();
  showComplaint: Boolean = true;
  showOEName: Boolean = true;
  showEstimate: Boolean = true;
  showAssgDate: Boolean = true;
  showRejectDate: Boolean = true;
  showServiceDate: Boolean = true;
  showRemarks: Boolean = true;
  showOtherRemarks: Boolean = true;
  showTotalCost: Boolean = false;
  constructor(private commonService: CommonService, private loaderService: LoaderService, private sharedService: SharedService,
    public dialog: MatDialog, private datashare: FetchUserTabDetailsService,) { }

  ngOnInit() {
    this.getServiceList();
    this.activeTab()
    this.arrageTab(this.activeBtn)
  }
  getServiceList(): void {
    //m this.loaderService.show('show');
    const requestSet = '?records_per_page=' + this.tableViewRequestData.recordsPerPage + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&status=' + this.selectedBtnVal.val + '&oe_status=' + this.oeStatus +
      '&search_product_name=' + this.productName + '&search_customer_name=' + this.searchVleText +
      '&_id=' + this.serviceID + '&ticket_number=' + this.ticketNumber + '&customer_village=' + this.villageName;
    this.commonService.getData('admin/service' + requestSet).subscribe(response => {
      if (response.success) {
        this.serviceRequestList = new ServiceList(response.payload);
        // console.log(this.serviceRequestList);
        //m this.loaderService.show('hide');
        let data = {
          status: this.selectedBtnVal.val,
          oe_status: this.oeStatus,
          _id: this.serviceID,
          ticket_number: this.ticketNumber,
          search_customer_name: this.searchVleText,
          search_product_name: this.productName,
        }
        this.datashare.shareServiceData(data);
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
      //m this.loaderService.show('hide');
    });
  }
  activeTab() {
    this.showComplaint = true
    this.showOEName = true
    this.showEstimate = true
    this.showAssgDate = true
    this.showRejectDate = true
    this.showServiceDate = true
    this.showRemarks = true
    this.showOtherRemarks = true
    this.showTotalCost = false;
  }
  arrageTab(selectedTabName) {
    if (this.selectedBtnVal.tableHeaders.length > 0) {
      this.selectedBtnVal.tableHeaders.forEach((tabName, i) => {
        if (selectedTabName === 'Received') {
          this.showComplaint = true;
          this.showOEName = false;
          this.showEstimate = false;
          this.showAssgDate = false;
          this.showRejectDate = false;
          this.showServiceDate = false;
          this.showRemarks = false;
          this.showOtherRemarks = false;
          // if (this.selectedBtnVal.tableHeaders[i].name === 'Complaint Actions') {
          //   this.selectedBtnVal.tableHeaders.splice(i, 1);
          // }
          if (this.selectedBtnVal.tableHeaders[i].name === 'Assigned OE') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
          if (this.selectedBtnVal.tableHeaders[i].name === 'Estimate') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
          if (this.selectedBtnVal.tableHeaders[i].name === 'OE Assigned Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
          if (this.selectedBtnVal.tableHeaders[i].name === 'Rejected Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
          if (this.selectedBtnVal.tableHeaders[i].name === 'Service Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
          // if (this.selectedBtnVal.tableHeaders[i].name === 'Remarks') {
          //   this.selectedBtnVal.tableHeaders.splice(i, 1);
          // }
          if (this.selectedBtnVal.tableHeaders[i].name === 'Other Remarks') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
        }
        if (selectedTabName === 'Request Assigned') {
          if (this.assaignedSubTab[0] ? this.assaignedSubTab[0].tableHeaders ? true : false : false) {
            this.assaignedSubTab[0].tableHeaders.forEach((tabName, i) => {
              // this.showComplaint = false;
              this.showRejectDate = false;
              this.showServiceDate = false;
              this.showRemarks = false;
              this.showOtherRemarks = false;
              // if (this.assaignedSubTab[0].tableHeaders[i].name === 'Complaint Actions') {
              //   this.assaignedSubTab[0].tableHeaders.splice(i, 1);
              // }
              if (this.assaignedSubTab[0].tableHeaders[i].name === 'Rejected Date') {
                this.assaignedSubTab[0].tableHeaders.splice(i, 1);
              }
              if (this.assaignedSubTab[0].tableHeaders[i].name === 'Service Date') {
                this.assaignedSubTab[0].tableHeaders.splice(i, 1);
              }
              if (this.assaignedSubTab[0].tableHeaders[i].name === 'Other Remarks') {
                this.assaignedSubTab[0].tableHeaders.splice(i, 1);
              }
              if (this.assaignedSubTab[0].tableHeaders[i].name === 'Remarks') {
                this.assaignedSubTab[0].tableHeaders.splice(i, 1);
              }
            })
          } if (this.assaignedSubTab[1] ? this.assaignedSubTab[1].tableHeaders ? true : false : false) {
            this.assaignedSubTab[1].tableHeaders.forEach((tabName, i) => {
              // this.showComplaint = false;
              this.showRejectDate = false;
              this.showServiceDate = false;
              this.showRemarks = false;
              this.showOtherRemarks = false;
              // if (this.assaignedSubTab[1].tableHeaders[i].name === 'Complaint Actions') {
              //   this.assaignedSubTab[1].tableHeaders.splice(i, 1);
              // }
              if (this.assaignedSubTab[1].tableHeaders[i].name === 'Rejected Date') {
                this.assaignedSubTab[1].tableHeaders.splice(i, 1);
              }
              if (this.assaignedSubTab[1].tableHeaders[i].name === 'Service Date') {
                this.assaignedSubTab[1].tableHeaders.splice(i, 1);
              }
              if (this.assaignedSubTab[1].tableHeaders[i].name === 'Other Remarks') {
                this.assaignedSubTab[1].tableHeaders.splice(i, 1);
              }
              if (this.assaignedSubTab[1].tableHeaders[i].name === 'Remarks') {
                this.assaignedSubTab[1].tableHeaders.splice(i, 1);
              }
            })
          }

          // this.showComplaint = false;
          // if (this.selectedBtnVal.tableHeaders[i].name === 'Complaint Actions') {
          //   // this.selectedBtnVal.tableHeaders.splice(i, 1);
          // }
          // if (this.selectedBtnVal.tableHeaders[i].name === 'Rejected Date') {
          //   this.selectedBtnVal.tableHeaders.splice(i, 1);
          //   this.showRejectDate = false;
          // }
          // if (this.selectedBtnVal.tableHeaders[i].name === 'Service Date') {
          //   this.selectedBtnVal.tableHeaders.splice(i, 1);
          //   this.showServiceDate = false;
          // }
        }
        if (selectedTabName === 'Pick Up') {
          //console.log(this.pickUpSubTab)
          if (this.pickUpSubTab[0] ? this.pickUpSubTab[0].tableHeaders ? true : false : false) {
            this.pickUpSubTab[0].tableHeaders.forEach((tabName, i) => {
              this.showComplaint = true;
              this.showRejectDate = false;
              this.showServiceDate = false;
              // this.showRemarks = false;
              // this.showOtherRemarks = false;
              // if (this.pickUpSubTab[0].tableHeaders[i].name === 'Complaint Actions') {
              //   this.pickUpSubTab[0].tableHeaders.splice(i, 1);
              // }
              if (this.pickUpSubTab[0].tableHeaders[i].name === 'Rejected Date') {
                this.pickUpSubTab[0].tableHeaders.splice(i, 1);
              }
              if (this.pickUpSubTab[0].tableHeaders[i].name === 'Service Date') {
                this.pickUpSubTab[0].tableHeaders.splice(i, 1);
              }
              // if (this.pickUpSubTab[0].tableHeaders[i].name === 'Other Remarks') {
              //   this.pickUpSubTab[0].tableHeaders.splice(i, 1);
              // }
              // if (this.pickUpSubTab[0].tableHeaders[i].name === 'Remarks') {
              //   this.pickUpSubTab[0].tableHeaders.splice(i, 1);
              // }
            })
          } if (this.pickUpSubTab[1] ? this.pickUpSubTab[1].tableHeaders ? true : false : false) {
            this.pickUpSubTab[1].tableHeaders.forEach((tabName, i) => {
              // this.showComplaint = false;
              this.showRejectDate = false;
              this.showServiceDate = false;
              // this.showRemarks = false;
              // this.showOtherRemarks = false;
              // if (this.pickUpSubTab[1].tableHeaders[i].name === 'Complaint Actions') {
              //   this.pickUpSubTab[1].tableHeaders.splice(i, 1);
              // }
              if (this.pickUpSubTab[1].tableHeaders[i].name === 'Rejected Date') {
                this.pickUpSubTab[1].tableHeaders.splice(i, 1);
              }
              if (this.pickUpSubTab[1].tableHeaders[i].name === 'Service Date') {
                this.pickUpSubTab[1].tableHeaders.splice(i, 1);
              }
              // if (this.pickUpSubTab[1].tableHeaders[i].name === 'Other Remarks') {
              //   this.pickUpSubTab[1].tableHeaders.splice(i, 1);
              // }
              // if (this.pickUpSubTab[1].tableHeaders[i].name === 'Remarks') {
              //   this.pickUpSubTab[1].tableHeaders.splice(i, 1);
              // }
            })
          }
          // this.showRejectDate = false;
          // if (this.selectedBtnVal.tableHeaders[i].name === 'Rejected Date') {
          //   this.selectedBtnVal.tableHeaders.splice(i, 1);
          // }
        }
        if (selectedTabName === 'In Service Station') {
          this.showRejectDate = false;
          if (this.selectedBtnVal.tableHeaders[i].name === 'Rejected Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
        }
        if (selectedTabName === 'Out For  Delivery') {
          this.showRejectDate = false;
          if (this.selectedBtnVal.tableHeaders[i].name === 'Rejected Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
        }
        if (selectedTabName === 'Resolved') {
          this.showRejectDate = false;
          this.showTotalCost = true;
          if (this.selectedBtnVal.tableHeaders[i].name === 'Rejected Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
        }
        if (selectedTabName === 'Completed') {
          this.showRejectDate = false;
          this.showTotalCost = true;
          if (this.selectedBtnVal.tableHeaders[i].name === 'Rejected Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
        }
        if (selectedTabName === 'Resolved on Phone') {
          // this.showComplaint = false;
          this.showOEName = false;
          this.showEstimate = false;
          this.showAssgDate = false;
          this.showRejectDate = false;
          this.showServiceDate = false;
          // if (this.selectedBtnVal.tableHeaders[i].name === 'Complaint Actions') {
          //   this.selectedBtnVal.tableHeaders.splice(i, 1);
          // }
          if (this.selectedBtnVal.tableHeaders[i].name === 'Assigned OE') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
          if (this.selectedBtnVal.tableHeaders[i].name === 'Estimate') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
          if (this.selectedBtnVal.tableHeaders[i].name === 'OE Assigned Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
          if (this.selectedBtnVal.tableHeaders[i].name === 'Rejected Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
          if (this.selectedBtnVal.tableHeaders[i].name === 'Service Date') {
            this.selectedBtnVal.tableHeaders.splice(i, 1);
          }
        }
        if (selectedTabName === 'Rejected') {
          // this.selectedBtnVal.tableHeaders.splice(1, 1)
        }
      })
    }

  }
  makeActive(item: ServiceListStatus): void {
    this.oeStatus = '';
    this.activeBtn = item.name;
    this.serviceRequestList = new ServiceList();
    if (item.name === 'Pick Up') {
      this.selectedBtnVal = new ServiceListStatus(this.pickUpSubTab[0]);
    } else {
      this.selectedBtnVal = new ServiceListStatus(item);
    }
    this.tableViewRequestData = new TableViewRequestSet();
    if (item.val === serviceTrackStatus.assigned) {
      this.oeStatus = this.serviceTrack.oeAssigned;
      this.selectedBtnVal.tableHeaders = this.assaignedSubTab[0].tableHeaders;
    }
    this.activeTab()
    this.arrageTab(this.activeBtn)
    this.getServiceList();
    this.datashare.shareServiceData(this.subscribeData);
  }

  makeSubActive(item: ServiceListStatus): void {
    if (this.selectedBtnVal.val === serviceTrackStatus.assigned) {
      this.oeStatus = item.val;
      this.selectedBtnVal.tableHeaders = item.tableHeaders;
    } else {                          // pick up sub tab
      this.selectedBtnVal = new ServiceListStatus(item);
    }
    this.tableViewRequestData = new TableViewRequestSet();
    this.getServiceList();
    this.selectedBtnVal.val
  }



  /**
  * @method getPage()
  * @description - the following getPage() method is used get the selected page for pagination
  * @param event - contains the selected page number
  * @author amitha.shetty
  */
  getPage(event: number): void {
    if (event > 0 && event <= this.serviceRequestList.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getServiceList();
    }
  }
  resolveRejectAssign(item: ServiceRecordList, statusVal: number): void {
    // console.log(item,statusVal,this.serviceTrack.reject)
    let actionStatus = {
      identifier: 'toResolveService',
      method: 'Resolve',
      finalStatusCall: 'Resolved',
      type: this.selectedBtnVal.val === this.serviceTrack.received ? serviceResolveType.resolvedOnRemote : serviceResolveType.notResolved
    };
    if (statusVal === this.serviceTrack.reject) {
      actionStatus = {
        identifier: 'toRejectService',
        method: 'Reject',
        finalStatusCall: 'Rejected',
        type: serviceRejectionType.rejectOnCash
      };
    } else if (statusVal === this.serviceTrack.assigned) {
      actionStatus = {
        identifier: 'toAssignService',
        finalStatusCall: 'Assigned',
        method: 'Assign',
        type: null
      };
    }
    const dialogRef = this.dialog.open(ServiceActionDialogComponent, {
      panelClass: 'service-action-style',
      data: {
        name: `${actionStatus.method} ${item.productDetailName}`,
        identifier: `${actionStatus.identifier}`,
        finalStatusCall: actionStatus.finalStatusCall,
        type: actionStatus.type,
        status: statusVal,
        serviceId: item.serviceId,
        warehouseId: item.warehouseId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableViewRequestData = new TableViewRequestSet();
        this.getServiceList();
      }
    });
  }

  toRouteInStation(item): void {
    const dialogRef = this.dialog.open(ServiceActionDialogComponent, {
      panelClass: 'service-action-single-ipt-style',
      data: {
        name: `${item.productDetailName}`,
        identifier: `approveInStation`,
        status: this.serviceTrack.serviceInStation,
        finalStatusCall: 'Approved In Station',
        serviceId: item.serviceId,
        warehouseId: item.warehouseId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableViewRequestData = new TableViewRequestSet();
        this.getServiceList();
      }
    });
  }
  directResolvedByOe(item): void {
    const dialogRef = this.dialog.open(ServiceActionDialogComponent, {
      panelClass: 'service-approve-in-station-style',
      data: {
        name: `${item.productDetailName}`,
        identifier: 'directDeliverByOe',
        finalStatusCall: 'Delivered Successfully',
        status: this.serviceTrack.delivered,
        warehouseId: item.warehouseId,
        executive: {
          name: item.assignedOE.firstName,
          id: item.assignedOEId
        },
        serviceId: item.serviceId,
        productDetailId: item.productDetailId,
        productId: item.productId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableViewRequestData = new TableViewRequestSet();
        this.getServiceList();
      }
    });
  }
  updateServiceItemDeliver(item, type): void {
    const dialogRef = this.dialog.open(ServiceActionDialogComponent, {
      panelClass: 'service-approve-in-station-style',
      data: {
        name: `${item.productDetailName}`,
        identifier: 'toOutOfDeliveryfromAdmin',
        status: this.serviceTrack.outForDelivery,
        finalStatusCall: 'Out of delivery',
        warehouseId: item.warehouseId,
        serviceId: item.serviceId,
        actionType: type,
        productDetailId: item.productDetailId,
        productId: item.productId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableViewRequestData = new TableViewRequestSet();
        this.getServiceList();
      }
    });
  }
  completeService(item): void {
    const dialogRef = this.dialog.open(ServiceActionDialogComponent, {
      panelClass: 'service-action-single-ipt-style',
      data: {
        name: `${item.productDetailName}`,
        identifier: `toCompleteService`,
        finalStatusCall: 'Completed',
        status: this.serviceTrack.completed,
        serviceId: item.serviceId,
        warehouseId: item.warehouseId,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableViewRequestData = new TableViewRequestSet();
        this.getServiceList();
      }
    });
  }
  /**
* @method searchVleNames()
* @description - the following searchVleNames() method is used search vle names from the order list
* @param event - contains the search term
* @author Arul
*/
  searchVleNames(event: any) {
    this.tableViewRequestData = new TableViewRequestSet();
    if (event.key === "Enter"){
      this.tableViewRequestData.searchVLE = this.searchVleText;
      this.tableViewRequestData.status = this.selectedBtnVal;
      this.getServiceList();
    }
  }
  searchProductName(event: any) {
    this.tableViewRequestData = new TableViewRequestSet();
    if (event.key === "Enter"){
    this.tableViewRequestData.productName = this.productName;
    // this.searchVleText = event.target.value;productName
    this.getServiceList();
    }
  }
  // searchServiceID(event: any) {
  //   this.tableViewRequestData = new TableViewRequestSet();
  //   this.tableViewRequestData.status = this.selectedBtnVal;
  // }
  searchTicketNumber(event: any) {
    this.tableViewRequestData = new TableViewRequestSet();
    if (event.key === "Enter"){
    this.tableViewRequestData.status = this.selectedBtnVal;
    this.getServiceList();
    }
  }
  searchVillageName(event: any) {
    this.tableViewRequestData = new TableViewRequestSet();
    if (event.key === "Enter"){
    this.tableViewRequestData.status = this.selectedBtnVal;
    this.getServiceList();
    }
  }
  searchFilter(){
    this.getServiceList();
  }
}

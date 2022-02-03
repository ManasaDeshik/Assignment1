import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ApplyFilterFields, POTableViewFilterRequestSet, TableDateFields,
  RequestFilterDate, UserInfo, TransportBarcode, ComboProductList,
  InvoiceFilterFields, DemoProductTableViewFilterRequestSet,
  RolePermissionVal
} from '../../models';
import { poFilterFieldList, moduleNameKeys } from '../../enums';
import { CommonService, SharedService, LoaderService } from '../../services';
import { SessionStorage } from 'ngx-webstorage';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  public poCollections = ['branch', 'category', 'warehouse', 'manufacture'];
  public demoFilterCollections = ['productDetail', 'frontierMarketingUser', 'warehouse'];
  public selectedBarcodeSearchText = '';
  public tableHeaders = ['Barcode'];
  public email = '';
  public poFilter: any = { branch:{collections: []}, category:{collections:[]}, warehouse:{collections:[]}, manufacture:{collections:[]} };
  public demoFilter: any = {productDetail:{collections:[]}, frontierMarketingUser:{collections:[]}, warehouse:{collections:[]}};
  public invoiceFilter: any = {
  };
  public invoiceCollections = [{
    name: 'Warehouse',
    key: 'warehouse',
    bindLabel: 'name',
    bindVal: 'id'
  }, {
    name: 'Status',
    key: 'status',
    bindLabel: 'key',
    bindVal: 'value'
  },
    // {
    //   name: 'Customer',
    //   key: 'customer',
    //   bindLabel: 'first_name',
    //   bindVal: '_id'
    // },
    // {
    //   name: 'Saheli',
    //   key: 'frontierMarketingUser',
    //   bindLabel: 'first_name',
    //   bindVal: '_id'
    // }];
  ];
  public barcodeCollections = [];
  public uploadedEmail = []
  public transportBarcodeCollections = [];
  public barcodeTotalRecords = 0;
  public barcodeCurrentPage = 1;
  public transportBarcodeItemCollections = [];
  public bindBarcode = [];
  public bindReturnCashBarcode: any = [];
  public todayDate = new Date();
  public barcodeList = [];
  public activeFinalizeBtn = false;
  public selectedtransportItemName=[];
  public selectedtransportbarcodeName='';
  @SessionStorage('userName') public userData: UserInfo;
  @SessionStorage('moduleDetails') public moduleDetails;
  @SessionStorage('allowedWarehouse') public allowedWarehouse: any;
  @ViewChild('csvFileInput')
  public comboProductList = new ComboProductList();
  public createTransportBarcode = new TransportBarcode('');
  public poResponseData = new POTableViewFilterRequestSet();
  public demoResponseData = new DemoProductTableViewFilterRequestSet();
  public filterDateFields = new RequestFilterDate();
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>,
    private commonService: CommonService,
    private sharedService: SharedService,
    private dialog: MatDialog, private loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    public arrivalDateField: TableDateFields = new TableDateFields();
    public invoiceDateField: TableDateFields = new TableDateFields(); 
    public orderDateField: TableDateFields = new TableDateFields();  
    public downloadDate: TableDateFields = new TableDateFields();
  ngOnInit() {
    this.modulePermissionSets();
    if(this.poResponseData){
      this.poResponseData.branch = null;
      this.poResponseData.category = null;
      this.poResponseData.warehouse=null;
      this.poResponseData.manufacture = null;
    }
     console.log(this.permissionSets,"PERM")
     if(this.data.uploadedEmail) this.uploadedEmail = this.data.uploadedEmail
    this.poFilter = {
      branch: { collections: [] }, category: { collections: [] }, warehouse: { collections: [] }, manufacture: { collections: [] }
    };
     console.log('87',this.poFilter);
    if (this.data.filterName === 'Apply Demo Product Filter') {
      this.demoFilterCollections.map(ele => {
        this.demoFilter[ele] = new ApplyFilterFields();
        this.demoResponseData[ele] = undefined;
      });
      if (this.data.demoResponse) {
        console.log('94',this.data.demoResponse);
        this.demoResponseData = this.data.demoResponse;
        console.log('96',this.demoResponseData);
      }
    }
    this.invoiceCollections.map(ele => {
      this.invoiceFilter[ele.key] = new InvoiceFilterFields();
    });
    if (this.data.poResponse) {
      console.log('101',this.data.poResponseData);
      this.poResponseData = this.data.poResponse;
      console.log('103',this.poResponseData);
    }
    if (this.data.dateResponse) {
      console.log('date response',this.data.dateResponse);
      this.orderDateField = this.data.dateResponse.orderDateField;
      this.arrivalDateField = this.data.dateResponse.arrivalDateField;
    }
    /*if (this.moduleDetails.name !== 'superadmin' && this.data.filterName != 'Apply Demo Product Filter' ) {
      this.commonService.getData('admin/warehouse?_id=' + this.userData.warehouse_id).subscribe(res => {
        this.poResponseData.warehouse = res.payload;
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
      
    }*/
    if (this.data.filterName === 'Returned Items') {
      this.getReturnItems();
    }
    if (this.data.filterName === 'Select Combo Product Barcode') {
      this.getComboProductDetail(this.data.orderId);
    }
    if (this.data.filterName === 'View Barcode') {
      this.getProductBarcodeList();
      this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.stocks);
      console.log(this.permissionSets,"permission sets")
    }
    if(this.data.transportId) {
    this.getTransportBarcode();
    this.getTransportItemBarcode();
  }
  console.log(this.orderDateField);
}
  closeDialog() {
    this.dialogRef.close();
  }

  getTransportBarcode()
  {
    let requestSet = '';
    if (this.data.type === 'stockOut') {
      requestSet = `&destination_warehouse=${this.data.destinationWarehouse}`;
    } else if (this.data.type === 'stockIn') {
      requestSet = `&source_warehouse=${this.data.sourceWarehouse}`;
    }
    this.commonService.getDataNew(`stock/transport/package/barcode?transfer_order_id=${this.data.transportId}` + requestSet).subscribe(res => {
      if (res.success) {
        var dataarray=res.data.rows;
        this.transportBarcodeCollections=dataarray;
        //dataarray.map((val)=>{
          this.selectedtransportbarcodeName= dataarray[0].barcode;
        this.createTransportBarcode.package_barcode = dataarray[0].barcode;
        //this.transportBarcodeCollections = res.data.rows;
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  /**
   * @method  modulePermissionSets()
   * @description - the following modulePermissionSets() method is used set crud operations for module.
   * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
   *  module passing module name  as a params.
   * @author amitha.shetty
   */
   modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.role);
  }

  getTransportItemBarcode()
  {
    let requestItemSet = '';
    if (this.data.type === 'stockOut') {
      requestItemSet = `stock/item?warehouse_id=${this.data.warehouseId}&product_detail_id=${this.data.productDetailId}&count=${this.data.quantity}`;
    } else if (this.data.type === 'stockIn') {
      requestItemSet = `stock/item?transfer_order_id=${this.data.transportId}&warehouse_id=${this.data.warehouseId}&count=${this.data.quantity}`;
    }
    this.commonService.getDataNew(requestItemSet).subscribe(res => {
      if (res.success) {
        var dataarray=res.data;
        this.transportBarcodeItemCollections=dataarray;
        
        //this.transportBarcodeItemCollections =  res.data.rows;
dataarray.map((val)=>{
  this.bindBarcode=val;
        this.createTransportBarcode.item_Barcodes.push(val.barcode);
      })
      this.selectedtransportItemName= this.createTransportBarcode.item_Barcodes;
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  searchFieldKey(event, type, item?: any) {
    this.barcodeCollections = [];
    if (event.term) {
      switch (type) {
        case 'barcode':
          this.commonService.getDataNew(`demoOrder/barcode/all?warehouse_id=${this.data.warehouseId}&search_text=${event.term}&product_detail_id=${this.data.productDetailId}`).subscribe(res => {
            //this.commonService.getDataNew(`demoOrder/barcode?demo_order_id=08d5cc95-0d69-4759-b047-dd75490ad1f2&search_text=${event.term}`).subscribe(res => {
            if (res.success) {
              this.barcodeCollections = res.payload.records;
            }
          }, err => {
            this.sharedService.displayErrorMessage('');
          });
          break;
        case 'comboBarcode':
          this.commonService.getData(`admin/stock/item?search_text=${event.term}&warehouse_id=${this.data.warehouseId}&product_detail_id=${item.product_detail_id}`).subscribe(res => {
            if (res.success) {
              item.barcodeCollections = res.payload.records;
            }
          }, err => {
            this.sharedService.displayErrorMessage('');
          });
          break;
        case 'transportBarcode':
          let requestSet = '';
          if (this.data.type === 'stockOut') {
            requestSet = `&destination_warehouse=${this.data.destinationWarehouse}`;
          } else if (this.data.type === 'stockIn') {
            requestSet = `&source_warehouse=${this.data.sourceWarehouse}`;
          }
          this.commonService.getDataNew(`stock/transport/package/barcode?search_text=${event.term}&transfer_order_id=${this.data.transportId}` + requestSet).subscribe(res => {
            if (res.success) {
              this.transportBarcodeCollections = res.payload.records;
            }
          }, err => {
            this.sharedService.displayErrorMessage('');
          });
          break;
        case 'transportItemBarcode':
          let requestItemSet = '';
          if (this.data.type === 'stockOut') {
            requestItemSet = `stock/item?search_text=${event.term}&warehouse_id=${this.data.warehouseId}&product_detail_id=${this.data.productDetailId}`;
          } else if (this.data.type === 'stockIn') {
            requestItemSet = `stock/item?search_text=${event.term}&transport_id=${this.data.transportId}&warehouse_id=${this.data.warehouseId}`;
          }
          this.commonService.getData(requestItemSet).subscribe(res => {
            if (res.success) {
              this.transportBarcodeItemCollections = res.payload.records;
            }
          }, err => {
            this.sharedService.displayErrorMessage('');
          });
          break;
        case 'barcodeDemo':
          this.commonService.getDataNew(`demoOrder/barcode?demo_order_id=${this.data.productDetailId}&search_text=${event.term}`).subscribe(res => {
            if (res.success) {
              this.barcodeCollections = res.data.rows;
            }
          }, err => {
            this.sharedService.displayErrorMessage('');
          });
          break;
        default:
          this.poFilter[type] = new ApplyFilterFields(poFilterFieldList[type]);
          if (this.moduleDetails.name === 'superadmin') {
            this.commonService.getDataNew(this.poFilter[type].apiEndPoint + event.term).subscribe(res => {
              this.poFilter[type].collections = res.payload.records;
            }, err => {
              this.sharedService.displayErrorMessage('');
            });
          } else {
            this.poFilter[type].collections = this.allowedWarehouse;
          }
          break;
      }
    }
  }
  searchDemoFieldKey(event, type) {
    this.demoFilter[type] = new ApplyFilterFields();
    if (this.moduleDetails.name !== 'superadmin' && type === 'warehouse') {
      const warehouse = this.allowedWarehouse.filter(ele => {
        return ele.name !== 'All';
      });
      this.demoFilter[type].collections = warehouse.reduce((unique, o) => {
        if (!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      }, []);
    } else {
      if(type == 'productDetail') {
      this.commonService.getDataNew(`product/web${type}s?search_text=${event.term}`).subscribe(res => {
        if (res.payload && res.payload.records.length > 0) {
          this.demoFilter[type].collections = res.payload.records;
        }
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }
    if(type == 'warehouse') {
      this.commonService.getDataNew(`users/${type}?search_text=${event.term}`).subscribe(res => {
        if (res.payload && res.payload.records.length > 0) {
          this.demoFilter[type].collections = res.payload.records;
        }
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }
    if(type == 'frontierMarketingUser') {
      console.log(this.poResponseData);
      let warehouse:any;
      if(this.poResponseData.warehouse)
       warehouse=this.poResponseData.warehouse;
      this.commonService.getDataNew(`users?page_number=1&records_per_page=25&search_text=${event.term}&warehouse_id=${(warehouse&&warehouse.id)?warehouse.id:''}`).subscribe(res => {
        if (res.payload && res.payload.records.length > 0) {
          this.demoFilter[type].collections = res.payload.records;
        }
      }, err => {
        this.sharedService.displayErrorMessage('');
      });
    }
  }
  }

  selectedFieldKey(event, type) {
    if (event) {
      switch (type) {
        case 'transportBarcode':
          this.createTransportBarcode.package_barcode = event.barcode;
          break;
        case 'transportItemBarcode':
          this.createTransportBarcode.item_Barcodes = [];
          if (event.length > 0) {
            event.map(ele => {
              this.createTransportBarcode.item_Barcodes.push(ele.barcode);
            });
          }
          break;
        case 'comboBarcode':
          this.isComboScanCompletd();
          break;
        default:
          this.poResponseData[type] = event;
          console.log(this.poResponseData[type],"type")
          break;
      }
    }
  }
  applyFilter(): void {
    let filterResult = {};
    switch (this.data.filterName) {
      case 'Date Filter':
        if((this.orderDateField.fromDate !== "" && this.orderDateField.toDate == "") || 
        (this.orderDateField.fromDate == "" && this.orderDateField.toDate !== "")){
          this.sharedService.displayErrorMessage("Please enter both order from date and to date");
          return;
        }
        else if((this.arrivalDateField.fromDate !== "" && this.arrivalDateField.toDate == "") || 
        (this.arrivalDateField.fromDate == "" && this.arrivalDateField.toDate !== "")){
          this.sharedService.displayErrorMessage("Please enter both arrival from date and to date");
          return;
        }
        if (this.orderDateField.fromDate && this.orderDateField.toDate) {
          this.filterDateFields.orderDateField = this.orderDateField;
        }
        if (this.arrivalDateField.fromDate && this.arrivalDateField.toDate) {
          this.filterDateFields.arrivalDateField = this.arrivalDateField;
        }
        filterResult = {
          responseData: this.filterDateFields,
          type: this.data.filterName
        };
        break;
        case 'Date':
        if((this.orderDateField.fromDate !== "" && this.orderDateField.toDate == "") || 
        (this.orderDateField.fromDate == "" && this.orderDateField.toDate !== "")){
          this.sharedService.displayErrorMessage("Please enter both order from date and to date");
          return;
        }
        if (this.orderDateField.fromDate && this.orderDateField.toDate) {
          this.filterDateFields.orderDateField = this.orderDateField;
        }
        filterResult = {
          responseData: this.filterDateFields,
          type: this.data.filterName
        };
        break;
      case 'Apply Filter':
        console.log('270',this.poResponseData);
        filterResult = {
          responseData: this.poResponseData,
          type: this.data.filterName
        };
        break;
      case 'Select Barcode':
        filterResult = {
          responseData: this.bindBarcode,
        };
        break;
      case 'Select Barcode for Demo':
        filterResult = {
          demo_order_id: this.data.productDetailId,
          item_barcodes: this.bindBarcode
        };
        break;
      case 'Place Transport Barcode':
        this.createTransportBarcode.transfer_order_id = this.data.transportId;
        filterResult = {
          responseData: this.createTransportBarcode,
        };
        break;
      case 'Returned Items':
        filterResult = {
          order_barcodes: this.bindReturnCashBarcode
        };
        break;
      case 'Select Combo Product Barcode':
        filterResult = {
          responseData: this.comboNewArray()
        };
        break;
      case 'Apply Demo Product Filter':
        filterResult = {
          responseData: this.demoResponseData
        };
    }
    this.dialogRef.close(filterResult);
  }
  comboNewArray() {
    const newArray = [];
    this.comboProductList.product_details.map(ele => {
      ele.bindBarcode.map(scanList => {
        newArray.push(scanList);
      });
    });
    return newArray;
  }
  getScheduledTime(event, type, inputField, dateMaxMin): void {
    this[inputField][type] = event;
    const date = new Date(this[inputField][type]);
    const requiredDate = date.setDate(date.getDate());
    this[inputField][dateMaxMin] = new Date(requiredDate);
   // console.log(this[inputField][dateMaxMin]);
  }

  getReturnItems(): void {
    const barcode = this.data.quantity.barcode;
    // this.data.quantity.map(ele => {
    //   barcode.push(ele.barcode);
    // });
    let newArray = barcode.filter((n, i) => barcode.indexOf(n) === i);
    console.log(newArray);
    this.bindReturnCashBarcode = newArray;
  }
  getComboProductDetail(orderId): void {
    this.commonService.getData(`admin/order/product/count/${orderId}`).subscribe(res => {
      this.comboProductList = new ComboProductList(res.payload);
      console.log(this.comboProductList);
      this.isComboScanCompletd();
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  isComboScanCompletd() {
    if (this.comboProductList.product_details && this.comboProductList.product_details.length > 0) {
      // console.log(this.comboProductList.product_details);
      let totalQuantity = 0;
      let totalBarcode = 0;
      this.comboProductList.product_details.forEach(element => {
        totalQuantity = totalQuantity + element.quantity;
        if (element.bindBarcode.length > 0) {
          totalBarcode = totalBarcode + element.bindBarcode.length
        }
      });
      if (((totalQuantity > 0) && (totalBarcode > 0)) && totalQuantity == totalBarcode) {
        this.activeFinalizeBtn = true;
      } else {
        this.activeFinalizeBtn = false;
      }
    }
  }
  searchInvoiceEvent(event, type): void {
    if (type === 'status') {
      this.invoiceFilter[type].collections = [{
        key: 'Ongoing',
        value: [3],
        name: 'Ongoing',
        downloadReportName: 'ongoing'
      },
      {
        key: 'Dispatched',
        value: [6],
        name: 'Dispatched',
        downloadReportName: 'dispatched'
      },
      {
        key: 'Delivered',
        value: [4, 9],
        name: 'Delivered',
        downloadReportName: 'delivered'
      },
      {
        key: 'RTS',
        value: [11],
        name: 'RTS',
        downloadReportName: 'rts'
      },
      {
        key: 'Completed',
        value: [5],
        name: 'Completed',
        downloadReportName: 'completed'
      },
      {
        key: 'Rejected',
        value: [2, 7, 12],
        name: 'Rejected',
        downloadReportName: 'rejected'
      },
      {
        key: 'Returned',
        value: [8],
        name: 'Returned',
        downloadReportName: 'returned'
      }];
    } else {
      this.commonService.getDataNew(`users/${type}?search_text=${event.term}`).subscribe(res => {
        this.invoiceFilter[type].collections = res.payload.records;
      }, err => {
        this.sharedService.displayErrorMessage(err.statusText);
      });
    }
  }
  changeInvoiceEvent(event, type): void {
    if(event){
      this.invoiceFilter[type.key].name = event[type.bindVal];
    }
  }
  applyDownload(): void {
    if (this.invoiceDateField.fromDate && this.invoiceDateField.toDate && this.invoiceFilter['warehouse'].name && this.invoiceFilter['status'].name) {
      const dateRequestSet = `?start_date=${this.sharedService.formateDate(this.invoiceDateField.fromDate)}&end_date=${this.sharedService.formateDate(this.invoiceDateField.toDate)}`;
      const requestSet = `&warehouse_id=${this.invoiceFilter['warehouse'].name}&status=${this.invoiceFilter['status'].name}`;
      this.commonService.fileDownloadNew('order/invoice' + dateRequestSet + requestSet).subscribe(response => {
        if (response) {
          const blob = new Blob([response], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.setAttribute('href', window.URL.createObjectURL(blob));
          link.setAttribute('download', 'invoice.zip');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.closeDialog();
        }
      }, err => {
        this.sharedService.displayErrorMessage('Data Not Avalible');
      });
    } else {
      this.sharedService.displayErrorMessage('Please Fill All The Fields');
    }
  }
  getProductBarcodeList(): void {
    this.commonService.getDataNew(`stock/item/barcode?product_detail_id=${this.data.product.id}&warehouse_id=${this.data.warehouse.id}&records_per_page=10&page_number=${this.barcodeCurrentPage}&search_text=${this.selectedBarcodeSearchText}`).subscribe(res => {
      if (res.success) {
        this.barcodeList = res.data.rows;
        this.barcodeTotalRecords = res.data.count;
      }
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  openBarcodeDeleteDialog(id, name): void {
    const dialogRef = this.sharedService.openDialog(name);
    console.log("insdie")
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.deleteDataNew(`stock/item/barcode?itemId=${id}`).subscribe(response => {
          if (response.status = 200) {
            this.barcodeList = [];
            this.barcodeCurrentPage = 1;
            this.sharedService.displaySuccessMessage('Deleted Successfully');
            this.getProductBarcodeList();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
  viewBarcodeCompleted(): void {
    this.dialogRef.close(true);
  }
  getPage(event: number): void {
    if (event > 0 && event <= this.barcodeTotalRecords) {
      this.barcodeCurrentPage = event;
      this.getProductBarcodeList();
    }
  }
  searchBarcode(event): void {
    this.selectedBarcodeSearchText = event.target.value;
    this.barcodeCurrentPage = 1;
    this.getProductBarcodeList();
  }
  Download() {
    if (this.downloadDate.fromDate && this.downloadDate.toDate) {
      //m this.loaderService.show('show');
     
      let date = 'start_date=' + this.sharedService.formateIndianDate(this.downloadDate.fromDate) + '&end_date=' + this.sharedService.formateIndianDate(this.downloadDate.toDate) + '&email=' + this.email;
      let requestSet = this.data.req ? this.data.req + '&' + date : '?' + date
      this.commonService.getDataNew(`download/getlist${requestSet}`).subscribe(response => {
        if (response) {
          this.sharedService.displayErrorMessage(response.data);
        //   const blob = new Blob([response], { type: 'application/octet-stream' });
        //   const link = document.createElement('a');
        //   link.setAttribute('href', window.URL.createObjectURL(blob));
        //   link.setAttribute('download', this.data.name);
        //   document.body.appendChild(link);
        //   link.click();
          // document.body.removeChild(link);
         this.loaderService.show('hide');
          this.closeDialog();
        }
      }, err => {
        this.sharedService.displayErrorMessage('Service Not Found');
      //m this.loaderService.show('hide');
      });
    } else {
      this.sharedService.displayErrorMessage('Please Fill All The Fields');
    //m this.loaderService.show('hide');
    }
  }
  uploadExcel(event, isAdd) {
    console.log(isAdd)
    if (event.target.files[0].name) {
      let data = {
        file: event.target.files[0],
        isAdd: isAdd,
        email : this.email
      }
      this.dialogRef.close(data);
    }
  }

  setEmail(email){
    console.log(email)
    this.email = email
  }
}

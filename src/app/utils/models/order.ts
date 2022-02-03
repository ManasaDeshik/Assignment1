import { orderAccessCouldNotDeliverKeys } from "../enums/shared-const";


export class VleDetails {
  public vleId: string;
  public vleName: string;
  public vleVillage: string;
  public vleGramPanchayat: string;
  public vleBlock: string;
  public vleDistrict: string;
  public vleStateName: string;
  public vleBranchName: string;
  public vleVillageCode: string;
  public delivery_day: string;

  constructor(data: any = {}) {
    if (data.first_name) {
      this.vleName = data.last_name ? data.first_name + ' ' +
        data.last_name : data.first_name;
    } else {
      this.vleName = '';
    }
    this.vleId = data.vle_code || 0;
    if (data.branch) {
      this.delivery_day = data.branch.delivery_day || 'NA'
      this.vleVillageCode = data.branch.village_code || 'NA'
      this.vleVillage = data.branch.village || '';
      this.vleGramPanchayat = data.branch.panchayat || '';
      this.vleBlock = data.branch.block || '';
      this.vleDistrict = data.branch.district || '';
      this.vleStateName = data.branch.state || '';
      this.vleBranchName = data.branch.name || '';
    }
  }
}
export class CustomerDetails {
  public customerName: string;
  public customerId: string;
  public customerPhNo: number;
  public customerVillageName: string;
  public customerGramPanchayat: string;
  public customerBlock: string;
  public customerBranch: string;
  public customerDistrict: string;
  public customerStateName: string;
  public customerState: string;
  public delivery_day: string;
  public customerVillageCode: string;
  constructor(data: any = {}) {
    if (data) {
      if (data.first_name) {
        this.customerName = data.last_name ? data.first_name + ' ' + data.last_name : data.first_name;
      } else {
        this.customerName = '';
      }
      this.customerId = data.lead_id || '';
      this.customerPhNo = data.phone_number || 0;
      if (data.branch) {
        this.customerVillageName = data.Branch.village || '';
        this.customerVillageCode = data.Branch.village_code || 'NA';
        this.customerGramPanchayat = data.Branch.panchayat || '';
        this.customerBlock = data.Branch.block || '';
        this.customerDistrict = data.Branch.district || '';
        this.customerStateName = data.Branch.state || '';
        this.customerBranch = data.Branch.name || '';
        this.delivery_day = data.Branch.delivery_day || 'NA';
      }
    }

  }
}
export class GetFistName {
  public firstName: string;
  public vleCode: string;
  constructor(data: any = {}) {
    this.firstName = data.first_name || 'NA';
    this.vleCode = data.vle_code || 'NA';

  }
}

export class RecordList {
  public productName: string;
  public updatedDate: any;
  public orderDate: any;
  public dispatchedDate: any;
  public executive_assign_date: any;
  public delivered_date: any;
  public confirmed_date: any;
  public onhold_date: any;
  public rejected_date: any;

  public orderId: string;
  public vle: VleDetails = new VleDetails();
  public customer: CustomerDetails = new CustomerDetails();
  public operational_excecutive: GetFistName = new GetFistName();
  public quantity: number;
  public totalPrice: number;
  public branchId: string;
  public id: string;
  public cart:any;
  public itemValue: boolean;
  public value: number;
  public warehouseId: string;
  public rtsDate: string;
  public completedDate: string;
  public type: number;
  public warehouseName: string;
  public productId: string;
  public saheliCoordinator: GetFistName = new GetFistName();
  public fmCoordinator: GetFistName = new GetFistName();
  public remarks: string;
  public delivered: string;
  public saheli: GetFistName = new GetFistName();
  public invoiceNo: string;
  public state: string;
  public barcode: string;
  public order_by_name: string;
  public order_by_role: string;
  public product_details: any;
  public other_remarks: string;
  public invoice: string;
  public tid: string;
  public payment: any;
  public payment_method: string;
  public reject_by_user: any;
  constructor(data: any = {}) {
    if (data.status == 2) {
      this.reject_by_user = data.rejected ? data.rejected : '' || ''
    }
    else {
      this.reject_by_user = data.returnedBy ? data.returnedBy : '' || ''
    }
    this.payment_method = data.payment_method
    this.payment = data.payment ? data.payment : null;
    this.tid = data.payment ? data.payment.ref_obj ? data.payment.ref_obj.final_response ? data.payment.ref_obj.final_response.data.tid ? data.payment.ref_obj.final_response.data.tid : 'NA' : 'NA' : 'NA' : 'NA';
    this.invoice = data.invoice || '';
    if(data.cart) {
    for(var i=0;i<data.cart.length;i++){
      console.log("length",data.cart.length)
      this.product_details =(data.cart)? data.cart[i].product_detail:''
    }
  } else if (data.carts) {
    for(var i=0;i<data.carts.length;i++){
      console.log("length",data.carts.length)
      this.product_details =(data.carts)? data.carts[i].product_detail:''
    }
  }
   
    this.order_by_name = data.order_by ? data.order_by.first_name : 'NA' || 'NA';
    this.order_by_role = data.order_by ? data.order_by.role?.name ? data.order_by.role?.name : 'NA' : 'NA' || 'NA';
    this.invoiceNo = data.order_code || data.barcode || 'NA';
    this.barcode = data.barcode || data.order_id || 'NA'
    this.state = data.state || 'NA';
    // this.updatedDate = data.updated_at || '';
    // this.productId = data.product_details._id || '';
    this.rtsDate = data.rts_date || 'NA';
    this.updatedDate = data.updated_at || data.rts_date || '';
    this.completedDate = data.completed_date || '';
    this.orderDate = data.order_date || data.executive_assign_date || '';
    if(data.status == 2) {
      this.rejected_date = data.rejected_date || '';
    }
    else if(data.status == 7) {
      this.rejected_date = data.returned_date || '';
    }
    else {
      this.rejected_date = data.could_not_deliver_date || '';
    }
    this.confirmed_date = data.confirmed_date || '';
    this.delivered_date = data.delivered_date || data.updated_at || '';
    this.executive_assign_date = data.executive_assign_date || 'NA';
    this.dispatchedDate = data.dispatched_date || data.updated_at || '';
    this.onhold_date = data.onhold_date || data.updated_at || '';
    this.quantity = data.quanity || '';
    this.value = data.amount || '';
    this.totalPrice = data.amount || '';

    this.orderId = data.id || '';
    if (data.customers || data.customer) {
      let customer = data.customers ? data.customers : data.customer
      this.customer = new CustomerDetails(customer);
    } else {
      this.customer = new CustomerDetails();
    }
    if (data.frontier_marketing_user) {
      this.vle = new VleDetails(data.frontier_marketing_user);
    } else {
      this.vle = new VleDetails('');
    }
    if (data.frontier_marketing_user && data.frontier_marketing_user.coordinator) {
      this.fmCoordinator = new GetFistName(data.frontier_marketing_user.coordinator);
    }
    else{
      this.fmCoordinator = new GetFistName();
    }
    if (data.saheli_coordinator) {
      this.saheliCoordinator = new GetFistName(data.saheli_coordinator);
    } else {
      this.saheliCoordinator = new GetFistName();
    }
    if (data.operational_excecutive) {
      this.operational_excecutive = new GetFistName(data.operational_excecutive);
    } else {
      this.operational_excecutive = new GetFistName();
    }
    if (data.frontier_marketing_user) {
      this.saheli = new GetFistName(data.frontier_marketing_user);
    } else {
      this.saheli = new GetFistName();
    }
if(data.carts)
{
  this.quantity=0;
  this.totalPrice=0;
  this.value=0;
  data.carts.map(x=>{

    this.quantity +=parseInt(x.quantity); 
    this.totalPrice +=parseInt(x.value);
    this.value   +=parseInt(x.value);
  })
}
if(data.cart)
{
  this.quantity=0;
  this.totalPrice=0;
  this.value=0;
  data.cart.map(x=>{

    this.quantity +=parseInt(x.quantity); 
    this.totalPrice +=parseInt(x.value);
    this.value   +=parseInt(x.value);
  })
  
}
   
    // this.branchId = data.customers.branch._id;
    // this.type = data.product_details.type;
    this.warehouseId = data.warehouse_id || '';
    this.warehouseName = data.warehouse ? data.warehouse.name : '' || '';
    // console.log(data.remarks)
    this.remarks=(data.reason)?data.reason.name: ''
    // console.log(this.remarks)
    this.other_remarks = data.other_remarks || '';
    this.id = data.id || '';
    this.itemValue = false;
   
  }
}


export class OrderList {
  public totalPages: number;
  public totalRecords: number;
  public records: RecordList[] = [];

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
          //console.log(element.status,[5,2,7,8].indexOf(parseInt(element.status)),'dsfffffffffffff')
          if([5,2,7,8].indexOf(parseInt(element.status))!== -1){
            element.cart.map((val)=>{
              console.log(val)
              let arraydata=element
              arraydata.cart=[val]
            this.records.push(new RecordList(arraydata));
          })
          }
          else{
          this.records.push(new RecordList(element));
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


export class PrintInvoiceOE {
  public order_id: string;
  public item_barcode: Array<string>;
  public warehouse_id: string;
  public executive_id: string;
  public type: number;
  constructor(data: any = {}) {
    this.order_id = data.order_id || '';
    this.item_barcode = data.item_barcode || [];
    this.warehouse_id = data.warehouse_id || '';
    this.executive_id = data.executive_id;
    if (data.type) {
      this.type = data.type || '';
    }
  }
}



export class UpdateStatus {
  public status: number;
  public id: string;
  public order_id: string;
  public challan_no: string;
  public warehouse_id: string;
  public type: number;
  public barcode: string;
  public remarks: string;
  constructor(orderId, status, warehouseId, type: number) {
    this.order_id = orderId || '';
    this.id = orderId || '';
    this.status = status || null;
    if (status === 5) {
      this.challan_no = '2444444';
    }
    this.type = type;
    this.warehouse_id = warehouseId || '';
    this.barcode = orderId;
    this.remarks = '';
  }
}
export class OrderSortFields {
  public productName: number;
  public branchName: number;
  public vleCode: number;
  public fmUserName: number;
  public orderDate: number;
  public action: number;
  constructor(data: any = {}) {
    this.productName = data.productName || '';
    this.branchName = data.branchName || '';
    this.vleCode = data.vleCode || '';
    this.fmUserName = data.fmUserName || '';
    this.orderDate = data.orderDate || -1;
    this.action = data.action || '';
  }
}
export class SetOrderDownload {
  public SlNo: number;
  public OrderID: string;
  public OrderDate: any;
  public Name_of_the_vle: string;
  public VLE_Code: string;
  public VLE_Village: string;
  public VLE_Gram_Panchayat: string;
  public VLE_Block: string;
  public VLE_Branch: string;
  public VLE_District: string;
  public VLE_State: string;
  public Name_of_the_Customer: string;
  public Customer_Mobile_Number: string;
  public customer_Village: string;
  public Customer_Gram_Panchayat: string;
  public Customer_District: string;
  public Products_Bought: number;
  public Quantity_Bought: number;
  public Total_Price: number;
  constructor(data: any = {}, index?: number) {
    this.SlNo = index + 1 || 0;
    this.OrderID = data.orderId || '';
    if (data.orderDate) {
      const convertDate = new Date(data.orderDate);
      this.OrderDate = convertDate.getMonth() + 1 + '/' + convertDate.getDate() + '/' + convertDate.getFullYear();
    } else {
      this.OrderDate = '';
    }
    this.Name_of_the_vle = data.vle.vleName || '';
    this.VLE_Code = data.vle.vleId || '';
    this.VLE_Village = data.vle.vleVillage || '';
    this.VLE_Gram_Panchayat = data.vle.vleGramPanchayat || '';
    this.VLE_Block = data.vle.vleBlock || '';
    this.VLE_Branch = data.vle.vleBranchName || '';
    this.VLE_District = data.vle.vleDistrict || '';
    this.VLE_State = data.vle.vleStateName || '';
    this.Name_of_the_Customer = data.customer.customerName || '';
    this.Customer_Mobile_Number = data.customer.customerPhNo || '';
    this.customer_Village = data.customer.customerVillageName || '';
    this.Customer_Gram_Panchayat = data.customer.customerGramPanchayat || '';
    this.Customer_District = data.customer.customerDistrict || '';
    this.Products_Bought = data.productName || 0;
    this.Quantity_Bought = data.quantity || 0;
    this.Total_Price = data.totalPrice || 0;
  }
}
export class ComboProductDetail {
  public product_detail_id: string;
  public title: string;
  public scannedItems: Array<any>;
  public bindBarcode: Array<any>;
  public barcodeCollections: Array<any>;
  public count: number;
  public quantity: number;
  constructor(data: any = {}) {
    this.product_detail_id = data.product_detail_id || '';
    this.title = data.title || '';
    this.bindBarcode = data.scannedItems || [];
    this.barcodeCollections = data.barcodeCollections || [];
    this.scannedItems = data.scannedItems || [];
    this.count = data.count || 0;
    this.quantity = data.quantity ? data.quantity : 0
  }
}
export class ComboProductList {
  public id: string;
  public quantity: number;
  public product_detail_id: string;
  public product_details: ComboProductDetail[] = [];
  constructor(data: any = {}) {
    this.id = data._id || '';
    this.quantity = data.quantity || '';
    this.product_detail_id = data.product_detail_id || '';
    if (data.product_details && data.product_details.length > 0) {
      data.product_details.forEach(ele => {
        this.product_details.push(new ComboProductDetail(ele));
      });
    } else {
      this.product_details = [];
    }
  }
}

export class ComboItemScan {
  public order_id: string;
  public item_barcode: string;
  public product_detail_id: string;
  public warehouse_id: string;
  public executiveId: string;
  constructor(data: any = {}) {
    this.order_id = data.order_id || '';
    this.item_barcode = data.item_barcode || '';
    this.product_detail_id = data.product_detail_id || '';
    this.warehouse_id = data.warehouse_id || '';
    if (data.executive_id) {
      this.executiveId = data.executive_id || '';
    }
  }
}

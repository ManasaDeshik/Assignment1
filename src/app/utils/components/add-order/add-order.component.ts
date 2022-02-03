import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CommonService, SharedService } from '../../services';
import { UserInfo } from '../../models/shared';
import { SessionStorage } from 'ngx-webstorage';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  oneDisable = false;
  twoDisable = true;
  threeDisable = true;
  oneView = true;
  twoView = false;
  threeView = false;
  deliverTo;
  deliver = [
    'Deliver to lead',
    'Deliver to Saheli'
  ];
  details;
  products: any = [];
  tableHeaders = [
    { header: 'Product Name' }, { header: 'Quantity' }, { header: 'Price' }, { header: 'Amount' }, { header: 'Activity' }
  ]
  productsFrom = [
    {
      title: '',
      quantity: 1
    }];
  selectedProducts = '';
  totalAmount = 0;
  delivery = ['Advance', 'Cash on delivery', 'Cash Withdrawal', 'Online Payment', 'EMI'];
  delivery_option = 1;
  deliveryOption;
  payment_method = 1;


  @SessionStorage('userName') public userData: UserInfo;
  constructor(public dialogRef: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
    private commonService: CommonService, private sharedService: SharedService,
    public dialog: MatDialog,) { }

  ngOnInit() {
    this.details = this.data.item;
     console.log(this.details, this.userData);
  }
  closeDialog() {
    this.dialogRef.close();
  }
  oneClick() {
    this.oneDisable = false;
    this.twoDisable = true;
    this.threeDisable = true;
    this.oneView = true;
    this.twoView = false;
    this.threeView = false;
    if (this.deliverTo) {
      this.twoDisable = false
    }
    if (this.products.length > 0) {
      // this.threeView = true;
    }
  }
  twoClick() {
    this.oneDisable = false;
    this.twoDisable = false;
    this.threeDisable = true;
    this.oneView = false;
    this.twoView = true;
    this.threeView = false;
  }
  threeClick() {
    this.oneDisable = false;
    this.twoDisable = false;
    this.threeDisable = false;
    this.oneView = false;
    this.twoView = false;
    this.threeView = true;
  }
  updateCheck(event) {
    //console.log(event)
  }
  deliverChange(event) {
    if (this.deliverTo) {
      this.twoDisable = false
    }
    if (this.deliverTo === 'Deliver to lead') {
      this.delivery_option = 1
    } else if (this.deliverTo === 'Deliver to Saheli') {
      this.delivery_option = 2
    }
  }
  selectedProduct(event) {
    //console.log(event)
    var index = this.products.findIndex(x => x.title==event.title);
    if(index===-1){
    this.products.push({
      quantity: 1,
      title: event.title,
      product_detail_id: event.id,
      value: event.delivery_price || 10,
      image: event.images[0] || '',
      //image:'',
    })
  }else{
    this.products[index]['quantity']=this.products[index]['quantity']+1
  }
    //console.log(this.products);
    this.totalAmountCalculate()
  }
  searchProduct(event) {
    // console.log(event.term);

    let warehouse_id = this.details.warehouse_id
    let search_text = event.term
    this.sharedService.show('show');
    this.commonService.getdevNew('demoOrder/productDetails/?records_per_page=' + 50
      + '&page_number' + 1 + "&search_text=" + search_text +
      "&warehouse_id=" + warehouse_id+"&is_disabled_product_needed=" +'false'+'&saheli_id='+this.details.frontier_user_ref).subscribe(resProduct => {
        if (resProduct) {
          this.sharedService.show('hide');
          this.productsFrom = resProduct.payload.records;
        }
      }, (err) => {
        this.sharedService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      })
  }
  quantityChange(item, action, index) {
    // console.log(item, action, index);
    if (this.products[index].quantity > 0) {
      if (action == 'minus' && this.products[index].quantity >= 2) {
        this.products[index].quantity = Number(this.products[index].quantity - 1);
        this.totalAmountCalculate()
      } else if (action == 'plus') {
        this.products[index].quantity = Number(this.products[index].quantity + 1);
        this.totalAmountCalculate()
      }
    }
  }
  totalAmountCalculate() {
    this.totalAmount = 0;
    let temp;
    this.products.forEach(element => {
      temp = element.value * element.quantity;
      this.totalAmount = this.totalAmount + temp;
    })
  }
  removeBarcode(item, i) {
    //console.log(item, i);
    this.products.splice(i, 1);
    if (this.products.length == 0) {
      this.productsFrom = []
    }
    this.totalAmountCalculate()
  }
  removeAll() {
    this.products = []
    this.productsFrom = []
    this.totalAmountCalculate()
  }

  confirm() {
    this.sharedService.show('show');
    let test = true;
    let count = 0;
    if (this.products.length > 0) {
      this.products.forEach(async (element, i) => {
        console.log(element)
        this.commonService.getDataNew('stock/warehouse/stock' +
          "?warehouse_id=" + this.details.warehouse_id + "&product_detail_id=" + element.product_detail_id + '&quantity='+ element.quantity+'&saheli_id='+this.details.frontier_user_ref).subscribe(resProduct => {
            if (resProduct.payload) {
              this.details.warehouse_id=resProduct.payload.records.warehouseId;
              if ((this.products[i].quantity >= (resProduct.payload.records.stock_count)||(resProduct.payload.records.is_out_of_stock=='false'&&resProduct.payload.records.combo=='true'))) {
                // return false;
                test = false;
                count = count + 1;
              } else {
                count = count + 1;
              }
              console.log(test, count);
              if (test && (count == this.products.length)) {
                //console.log("finished loop")
                this.threeDisable = false;
                this.threeView = true;
                this.oneView = false;
                this.twoView = false;
                this.sharedService.show('hide');
              } else if ((count == this.products.length)) {
                this.sharedService.displayErrorMessage('stock is not available.');
                this.sharedService.show('hide');
                const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                  width: '250px',
                  height: '150px',
                  data: { message: 'You Want to add to wishlist' },
                  panelClass: 'confirmation-dialog'
                });
                // console.log(item, 263)
                dialogRef.afterClosed().subscribe(result => {
                  // console.log(result);
                  if (result) {
                    this.sharedService.show('show');
                    if(this.details.user_id == ""){
                      this.commonService.getData('admin/getCustomer'+'?_id='+this.details.id).subscribe(resCustomer => {
                        if (resCustomer) {
                          this.details.user_id = resCustomer.payload.frontier_marketing_user.id;
                          let obj = {
                            carts: [
                            ],
                            fm_user_id: this.details.frontier_user_ref,
                            oe_user_id:this.details.coordinator_id,
                            customer_id: this.details.id,
                            delivery_option: this.delivery_option,
                            payment_method: this.payment_method,
                            warehouse_id: this.details.warehouse_id
                          }
                          if (this.products.length > 0) {
                            this.products.forEach(element => {
                              obj.carts.push({
                                quantity: element.quantity,
                                product_detail_id: element.product_detail_id,
                                price:element.value,
                                value:(element.value*element.quantity)
                              })
                            })
                          }
                          this.commonService.postDataNew('order/wishlist', obj).subscribe(resProduct => {
                            if (resProduct) {
                              //console.log(resProduct)
                              this.removeAll();
                              this.sharedService.show('hide');
                              this.sharedService.displaySuccessMessage('Products are added to wish list.');
                              // this.dialogRef.close();
                            }
                          }, (err) => {
                            this.sharedService.show('hide');
                            this.sharedService.displayErrorMessage(err.statusText);
                          });
                        }else{
                          this.sharedService.show('hide');
                          this.sharedService.displayErrorMessage('Date issue.');
                        }
                      }, (err) => {
                        this.sharedService.show('hide');
                        this.sharedService.displayErrorMessage(err.statusText);
                      });
                    }else{
                      
                      let obj = {
                        carts: [
                        ],
                        fm_user_id: this.details.frontier_user_ref,
                        oe_user_id:this.details.coordinator_id,
                        customer_id: this.details.id,
                        delivery_option: this.delivery_option,
                        payment_method: this.payment_method,
                        warehouse_id: this.details.warehouse_id
                      }
                      if (this.products.length > 0) {
                        this.products.forEach(element => {
                          obj.carts.push({
                            quantity: element.quantity,
                            product_detail_id: element.product_detail_id,
                            price:element.value,
                            value:(element.value*element.quantity)
                          })
                        })
                      }
                      this.commonService.postDataNew('order/wishlist', obj).subscribe(resProduct => {
                        if (resProduct) {
                          //console.log(resProduct)
                          this.removeAll();
                          this.sharedService.show('hide');
                          this.sharedService.displaySuccessMessage('Products are added to wish list.');
                          // this.dialogRef.close();
                        }
                      }, (err) => {
                        this.sharedService.show('hide');
                        this.sharedService.displayErrorMessage(err.statusText);
                      });
                    }
                  } else {
                    this.removeAll();
                    this.sharedService.show('hide');
                  }
                })

              } else {
                this.sharedService.show('hide');
              }
            }
          }, (err) => {
            this.sharedService.show('hide');
            this.sharedService.displayErrorMessage(err.statusText);
          })
      })
    } else {
      this.sharedService.show('hide');
      this.sharedService.displayErrorMessage('Please select product.')
    }
  }
  deliveryChange(event) {
    //console.log(event, this.deliver, this.deliveryOption)
    if (this.deliveryOption == 'Advance') {
      this.payment_method = 1;
    } else if (this.deliveryOption == 'Cash on delivery') {
      this.payment_method = 2;
    } else if (this.deliveryOption == 'Cash Withdrawal') {
      this.payment_method = 4;
    } else if (this.deliveryOption == 'Online Payment') {
      this.payment_method = 5;
    } else if (this.deliveryOption == 'EMI') {
      this.payment_method = 3;
    }
  }
  placeOrder() {
    console.log(this.details);
    let obj = {
      carts: [
      ],
      fm_user_id: this.details.frontier_user_ref,
      oe_user_id:this.details.coordinator_id,
      customer_id: this.details.id,
      delivery_option: this.delivery_option,
      payment_method: this.payment_method,
      warehouse_id: this.details.warehouse_id
    }
    if (this.products.length > 0) {
      this.products.forEach(element => {
        obj.carts.push({
          quantity: element.quantity,
          product_detail_id: element.product_detail_id,
          price:element.value,
          value:(element.value*element.quantity)
        })
      })
      this.sharedService.show('show');
      this.commonService.postDataNew('order', obj).subscribe(resProduct => {
        if (resProduct) {
          //console.log(resProduct)
          this.sharedService.show('hide');
          this.sharedService.displaySuccessMessage('Order places successfully.');
          this.dialogRef.close();
        }
      }, (err) => {
        this.sharedService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      })
    } else {
      this.sharedService.displayErrorMessage('Please select product.');
    }
  }
}

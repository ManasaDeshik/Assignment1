import { Component, OnInit } from '@angular/core';
import { SessionStorageService, SessionStorage } from 'ngx-webstorage';
import { AvailableLang, SharedService, TableViewRequestProductSet, TableViewRequestProduct, TableListProduct, LoaderService, RolePermissionVal, moduleNameKeys, DownloadSubscribeParams, FetchUserTabDetailsService } from 'src/app/utils';
import { Router } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';



import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SequenceDialogComponent } from 'src/app/utils/components/sequence-dialog/sequence-dialog.component';
import { CommonService } from 'src/app/utils/services/common-service/common.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  public tableHeaders = [
    { header: 'Product Name', sortText: 'sortByName' },
    { header: 'Brand' },
    { header: 'Category' },
    { header: 'View' }
  ];
  // public tableHeaders = [
  //   { header: 'Product Name',sortText:'sortByName' },
  //   { header: 'Brand' ,sortText:'sortByBrand'},
  //   { header: 'Category'  ,sortText:'sortByCategory'},
  //   { header: 'View' }
  // ];
  public tableBranchHeaders = [
    { header: 'Product Name', sortText: 'sortByName' },
    { header: 'Brand' },
    { header: 'Sequence No' }
  ];
  // public tableBranchHeaders = [
  //   { header: 'Product Name',sortText:'sortByName' },
  //   { header: 'Brand'  ,sortText:'sortByBrand'},
  //   { header: 'Activity' }
  // ];
  public branch = [{ name: 'branch1' }, { name: 'branch2' }, { name: 'branch3' }];
  public availableLang: AvailableLang[] = [];
  public categoryList = [];
  public selectedCategory: any;
  public selectedSearchText: string;
  public tableViewRequestData: TableViewRequestProduct = new TableViewRequestProduct();
  public listProducts = new TableListProduct('');
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public permissionSetsCategory: RolePermissionVal = new RolePermissionVal();
  public subscribeData = new DownloadSubscribeParams();
  public selectedLang = 'en';
  selectedWareHouseID = '';
  selectedBranchProducts: any = {
    records: []
  };
  public branchProduct: any;
  @SessionStorage('productId') public productId: string;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  filteredOptions: Observable<string[]>;
  branchData = [];
  selectedBranch;
  selectCheck: any;
  isMoveDisable = true;
  isRemoveProduct = true;
  isSaveProduct = true;
  selectCheckBranch: any;
  sortField = {
    sortByName: '',
    sortByBrand: '',
    sortByCategory: ''
  }
  sortFieldBranch = {
    sortByName: '',
    sortByBrand: '',
    sortByCategory: ''
  }
  
  constructor(private storage: SessionStorageService, private commonService: CommonService,
    private sharedService: SharedService, private router: Router, private loaderService: LoaderService, 
    private setDownload: FetchUserTabDetailsService,public dialog: MatDialog) { }

  ngOnInit() {
    this.storage.clear('productId');
    this.modulePermissionSets();
    
    this.getProductDetails();
    
   
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  /**
  * @method  modulePermissionSets()
  * @description - the following modulePermissionSets() method is used set crud operations for module.
  * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
  *  module passing module name  as a params.
  * @author amitha.shetty
  */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.product);
    this.permissionSetsCategory = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.category);
    // console.log(this.permissionSets,this.permissionSetsCategory)
  }
  getLangList() {
    this.availableLang = [];
    this.sharedService.getListLang()
      .then((data: any) => {
        this.availableLang = data.map(lang => new AvailableLang(lang));
      });
  }
  onScrollDown(){
       this.tableViewRequestData.pageNumber = this.tableViewRequestData.pageNumber + 1
        this.getProductDetails()
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedBranchProducts.records, event.previousIndex, event.currentIndex);
    this.isSaveProduct = false;
  }
  /** filter datas */
  getCategoryList(event): void {
    // console.log(event,this.selectedLang)
    this.categoryList = [];
    if (event.term) {
     
        this.commonService.getDataNew('product/category?lang='+this.selectedLang+'&search_text='+ event.term).subscribe(response => {
          if (response) {
            this.categoryList = response.payload.records;
            this.categoryList.push({
              name: 'All',
              _id: ''
            });
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      
    }
  }
  selectedFieldKey() {
    this.tableViewRequestData = new TableViewRequestProductSet();
    this.setFilterData()
      .then((result: any) => {
        this.filteredData(result);
      });
  }

  searchText(event, isSearch) {
    if ((event.key === "Enter" || isSearch)) {
      this.tableViewRequestData = new TableViewRequestProductSet();
      this.setFilterData()
        .then((result: any) => {
          this.filteredData(result);
        });
    }
  }

  setFilterData() {
    return new Promise((resolve, reject) => {
      const retObj = {
        searchTxt: '',
        category: ''
      };
      if (this.selectedCategory) {
        retObj.category = this.selectedCategory.category_code;
      }
      if (this.selectedSearchText) {
        const productSearchText = this.selectedSearchText.trim();
        // if (this.selectedLang !== 'en') {
        //   this.setLangDatas(productSearchText, this.selectedLang)
        //     .then((result: any) => {
        //       if (result) {
        //         // retObj.searchTxt = result.payload[1][0][1];
        //         // resolve(retObj);
                
        //       }
        //     });
        // } else {
          retObj.searchTxt = productSearchText;
          resolve(retObj);
        //}
      } else {
        resolve(retObj);
      }
    });
  }
  filteredData(response) {
    const { searchTxt = '', category } = response;
    this.tableViewRequestData.category = category;
    this.tableViewRequestData.searchText = searchTxt;
    if (this.selectedLang === 'en') {
      this.subscribeData.products.searchText = searchTxt;
      this.subscribeData.products.category = category;
      this.setDownload.setProductsSubscribeStatus(this.subscribeData);
    }
    this.listProducts.records = [];
    this.tableViewRequestData.pageNumber = 1;
    this.getProductDetails();
    this.selectBranch(false)
    //this.selectBranch(false);
  }
  setLangDatas(text, langSelect) {
    return new Promise((resolve, reject) => {
      const requestSet = '?records_per_page=' + 400 + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_text=' + text +
      '&category=' + this.tableViewRequestData.category+'&lang='+this.selectedLang;
      this.commonService.getDataNew('product/listproduct' + requestSet).subscribe(response => {
        resolve(response);
        console.log('208',response);
      }, err => {
        reject(err);
      });
    });
  }
  /**
   * @method - langSelected()
   * @description - the following langSelected() method is used to set the lang selected and to get the list of product details 
   * for the selected language
   * @author amitha.shetty
   */
  langSelected(data: any): void {
    if (data.identity !== this.selectedLang) {
      this.listProducts.records = [];
      this.tableViewRequestData.pageNumber = 1;
      this.selectedLang = data.identity;
      this.getProductDetails();
      //this.tableViewRequestData.pageNumber = 1;
      this.tableViewRequestData = new TableViewRequestProductSet();
      this.categoryList = [];
      this.subscribeData = new DownloadSubscribeParams();
      this.subscribeData.products.langSelected = data.identity;
      this.setDownload.setProductsSubscribeStatus(this.subscribeData);
      if (this.selectedCategory) {
        this.tableViewRequestData.category = '';
        this.selectedCategory = null;//this.selectedCategory.id;
        /*if (this.selectedLang === 'en') {
          this.commonService.getData(`admin/category?_id=${this.selectedCategory.id}`).subscribe(response => {
            if (response) {
              this.selectedCategory = response.payload;
            }
          }, err => {
            this.sharedService.displayErrorMessage(err.statusText);
          });
        } else {
          this.sharedService.setJsonResponse('category', this.selectedLang).then((result: any) => {
            if (result) {
              this.selectedCategory = result.find(x => x._id === this.selectedCategory.id);
            }
          });
        }*/
      }
      //this.selectedSearchText = '';
      
      /*if (this.selectedWareHouseID != '') {
        this.selectBranch(false);
    }*/

    }
  }
  

  getProductDetails(): void {
  //m this.loaderService.show('show');;
  console.log("this.selected",this.selectedLang);
    const requestSet = '?records_per_page=' + 300 + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_text=' + this.tableViewRequestData.searchText +
      '&category=' + this.tableViewRequestData.category+'&lang='+this.selectedLang+'&is_disabled=true';
    const sort = '&sort_by_title' + this.sortField.sortByName;
    let brandDetailsResult = [];
    this.commonService.getDataNew('product/webproductDetails'+requestSet).subscribe(res => {
      if (res.success) {
        const products = new TableListProduct(res.payload,this.selectedLang);
        this.categoryList = [];
        let temp = this.listProducts.records
        products.records = temp.concat(products.records)
          this.listProducts = products;
          this.listProducts.records.forEach((element, i) => {
            this.listProducts.records[i]['isPresent'] = false;
            this.listProducts.records[i]['checked'] = false;
          })
          if(this.selectedWareHouseID !== ''){
            this.selectBranch(false)
          }
          //this.selectBranch(false);
        
      }
    //m this.loaderService.show('hide');
    if(this.availableLang.length == 0){
      this.getLangList();
    this.getCategoryList({ term: ' ' })
    this.searchFieldKey('');
    }
    
    }, (err) => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  getPage(event): void {
    console.log(event,"EVENT");
    if (event > 0 && event <= this.listProducts.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getProductDetails();
      this.selectBranch(false);
    }
  }
  editProductDetail(data: any, i) {
    let id
    this.sharedService.show('show');
    this.router.navigate([`product-management/products/edit-product/${this.selectedLang}/${data._id}`]);
    return;
    this.commonService.getDataNew('product/getsingleproduct/'+data._id).subscribe(resProduct => {
      this.router.navigate([`product-management/products/edit-product/${this.selectedLang}/${id}`]);
      // resProduct.payload.records.forEach((element, i) => {
        if (resProduct.payload.product_details.length >0) {
          id = resProduct.payload.product_details[0]._id;
          this.sharedService.show('hide');
          // console.log(resProduct);
          this.router.navigate([`product-management/products/edit-product/${this.selectedLang}/${id}`]);
        }else{
          this.sharedService.show('hide');
          this.sharedService.displayErrorMessage('Product details does not exist');
          // console.log(resProduct);
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    // })
  }
  viewProductDetail(data: any) {
    console.log
    let id
    this.sharedService.show('show');
    this.router.navigate([`product-management/products/view-product/${this.selectedLang}/${data._id}`]);
    return;
    this.commonService.getData('admin/product/?_id='+data._id).subscribe(resProduct => {
      // resProduct.payload.records.forEach((element, i) => {
        if (resProduct.payload.product_details.length >0) {
          id = resProduct.payload.product_details[0]._id;
          this.sharedService.show('hide');
          this.router.navigate([`product-management/products/view-product/${this.selectedLang}/${id}`]);
        }else{
          this.sharedService.show('hide');
          this.sharedService.displayErrorMessage('Product details does not exist');
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    // })

  }

  getBranchList() {
    this.commonService.getDataModified('users/warehouse').subscribe(res => {
      this.branchData = res.payload.records;
      this.branchData.push({
        name: 'All',
        _id: ''
      });
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  searchFieldKey(event) {
    let text = event ? event.term : '';
    this.commonService.getDataModified('users/warehouse' + '?search_text=' + text).subscribe(res => {
      this.branchData = res.payload.records;
      this.branchData.push({
        name: 'All',
        _id: ''
      });
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  selectBranch(event) {
     console.log(event);
    if (event === undefined) {
      this.selectedBranchProducts.records = [];
      this.isMoveDisable = true;
      this.isRemoveProduct = true;
      this.isSaveProduct = true;
      this.selectedWareHouseID = '';
      this.selectCheck = false;
    //m this.loaderService.show('hide');
      this.getProductDetails();
    } else if (this.selectedWareHouseID != '' || event.id) {
      //this.getProductDetails();
      this.isMoveDisable = true
    //m this.loaderService.show('show');
      this.selectedWareHouseID = event ? event.id ? event.id : this.selectedWareHouseID : this.selectedWareHouseID
      //this.getAllBranchProducts();
     /* let request = '?records_per_page=' + 400 +
        '&page_number=' + 1 + '&search_text=' + this.tableViewRequestData.searchText +
        '&category=' + this.tableViewRequestData.category +
        '&sort_by_alphabet=' + this.sortFieldBranch.sortByName + '&warehouse_id=' + this.selectedWareHouseID+'&lang='+this.selectedLang */
      //console.log("zzzz",this.selectedLang)
        let request = '?records_per_page=' + 500 +
        '&page_number=' + 1 + 
        '&sort_by_alphabet=' + this.sortFieldBranch.sortByName + '&userwarehouse=' + this.selectedWareHouseID+'&lang='+this.selectedLang+'&is_disabled=false'
      this.commonService.getDataNew('product/webproductDetails' + request).subscribe(res => {
      //m this.loaderService.show('hide');
   
      this.branchProduct=  res.payload.records;
      //console.log(this.branchProduct)
        // console.log(res)
        this.selectedBranchProducts.records = [];
        //console.log(this.listProducts,"RECO")
        this.listProducts.records.forEach((element, i) => {
          this.listProducts.records[i]['isPresent'] = false;
          this.listProducts.records[i]['checked'] = false;
        })
        this.selectedBranchProducts.records = res.payload.records;
        
        this.selectedBranchProducts['page_info'] = res.payload.page_info;
        this.listProducts.records.forEach((element, i) => {
          this.selectedBranchProducts.records.forEach((branchElement, j) => {
            this.selectedBranchProducts.records[j]['checked'] = false;
            // console.log(element.productId === branchElement._id)
          //  console.log(branchElement,element);
            if (element.productId === branchElement.id) {
              this.listProducts.records[i]['isPresent'] = true;
              this.listProducts.records[i]['checked'] = true;
            }
            if (element.is_disabled) {
              this.listProducts.records[i]['isPresent'] = true;
              // console.log(element,"disabled")
            }
          })
        })
        // console.log(this.selectedBranchProducts.records)
        this.checkToDelete();

        // if (this.selectedBranchProducts.records.length == 0 && (this.selectedWareHouseID != '')) {
        //   this.selectAll({ checked: true });
        //   this.moveToBranch();

        // }
        // console.log(this.selectedBranchProducts.records.length, 'products')
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    }
  }
  selectAll(event) {
    this.selectCheck = event.checked;
    for (let i = 0; i < this.listProducts.records.length; i++) {
      if (!this.listProducts.records[i].isPresent)
        this.listProducts.records[i].checked = this.selectCheck;
    }
    this.checkToMove();
  }
  updateCheck(event, index) {
    this.listProducts.records[index].checked = event.checked;
    this.checkIfAllSelected();
    this.checkToMove();
  }
  checkIfAllSelected() {
    this.selectCheck = this.listProducts.records.every(function (item: any) {
      return item.checked == true;
    })
  }
  moveToBranch() {
    //m this.loaderService.show('show');;
    this.selectCheck = false;
    if (this.selectedWareHouseID != '' || this.selectedWareHouseID) {
      // console.log(this.listProducts.records);
      // console.log(this.selectedBranchProducts.records);
      // return
      let newProducts = [];
      // let request = '?records_per_page=' + 400 +
      //   '&page_number=' + 1 + '&warehouse_id=' + this.selectedWareHouseID
      // this.commonService.getData('admin/product' + request).subscribe(res => {
      //   if (res) {
      let allRecords: any = [];
      this.branchProduct.forEach((element, i) => {
        allRecords.push(element.id)
      })
      if (this.listProducts.records.length > 0) {
        this.listProducts.records.forEach((element, i) => {
          if (element.checked && !element.isPresent) {
            // allRecords.unshift(element.productId);
            newProducts.unshift(element)
            console.log(newProducts)
            // allRecords.splice(0,0,element.productId)
          }
        })
      }
      // console.log(res.payload);
      // oldProduct = res.payload.records;

       console.log(allRecords);
      // let unique = allRecords.filter((v, i, a) => a.indexOf(v) === i);
      let dataPusheToBranch = {
        warehouse_id: this.selectedWareHouseID,
        product_sequance: allRecords,
        newProducts:newProducts
      }
      // console.log(allRecords);
      // return;
      const dialogRef = this.dialog.open(SequenceDialogComponent, {
        data: {
          name:'Sequence Product',
          item: dataPusheToBranch,
          type: 'sequencing',
        },
        // minHeight: '100%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.selectBranch(false);
        }else{

        }
      });
      //m this.loaderService.show('hide');
      return;
      this.commonService.putData('admin/warehouse', dataPusheToBranch).subscribe(res => {
        if (res.success) {
        //m this.loaderService.show('hide');
          this.selectBranch(false);
          this.sharedService.displaySuccessMessage('Branch and product updated successfully.')
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
      //   }
      // })
    } else {
      this.sharedService.displayErrorMessage('Please select warehouse');
    //m this.loaderService.show('hide');
    }


  }
  saveProduct() {
    // console.log(this.selectedBranchProducts.records)
    //m this.loaderService.show('show');;
    if (this.tableViewRequestData.searchText == '' && this.tableViewRequestData.category == '') {
      let dataPusheToBranch = {
        warehouse_id: this.selectedWareHouseID,
        product_sequance: []
      }
      this.selectedBranchProducts.records.forEach((element, i) => {
        // console.log(element.title, element._id);
        dataPusheToBranch.product_sequance.push(element.id)
      })
      // console.log(this.selectedBranchProducts.records);
      // console.log(dataPusheToBranch);
    //m this.loaderService.show('show');
      this.commonService.putDataNew('product/warehouseProduct', dataPusheToBranch).subscribe(res => {
        if (res.success) {
        //m this.loaderService.show('hide');
          this.selectBranch(false);
          this.sharedService.displaySuccessMessage('Branch and product updated successfully.')
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
      this.isSaveProduct = true;
    } else {
      this.sharedService.displayErrorMessage('Please remove filters to make change in sequence.');
    }

  }
  checkToMove() {
    let onePresent = false;
    this.listProducts.records.forEach((element, i) => {
      if (element.checked && !element.isPresent) {
        onePresent = true;
      }
    });
    onePresent ? (this.isMoveDisable = false) : (this.isMoveDisable = true)
  }
  selectAllBranch(event) {
    this.selectCheckBranch = event.checked;
    for (let i = 0; i < this.selectedBranchProducts.records.length; i++) {
      if (!this.selectedBranchProducts.records[i].isPresent)
        this.selectedBranchProducts.records[i].checked = this.selectCheckBranch;
    }
    this.checkToDelete();
  }
  updateCheckBranch(event, index) {
    // console.log(this.selectedBranchProducts.records[index])
    this.selectedBranchProducts.records[index].checked = event.checked;
    this.checkIfAllSelectedBranch();
    this.checkToDelete();
  }
  checkIfAllSelectedBranch() {
    this.selectCheckBranch = this.selectedBranchProducts.records.every(function (item: any) {
      return item.checked == true;
    })
  }
  checkToDelete() {
    let onePresent = false;
    this.selectedBranchProducts.records.forEach((element, i) => {
      if (element.checked) {
        onePresent = true;
      }
    });
    onePresent ? (this.isRemoveProduct = false) : (this.isRemoveProduct = true)
  }
  removeProduct() {
    this.selectCheckBranch = false;
    let oldProduct = [];
    if (this.selectedWareHouseID != '' || this.selectedWareHouseID) {
      let request = '?records_per_page=' + 400 +
        '&page_number=' + 1 + '&userwarehouse=' + this.selectedWareHouseID
      this.commonService.getDataNew('product/webproductDetails' + request).subscribe(res => {
        if (res) {
          let productIDs = [];
          let removedProducts = [];
          oldProduct = res.payload.records;
          let dataPusheToBranch = {
            warehouse_id: this.selectedWareHouseID,
            product_sequance: []
          }
          // console.log(this.selectedBranchProducts.records);
          oldProduct.forEach((ele, j) => {
            productIDs[j] = ele.id;
            this.selectedBranchProducts.records.forEach((element, i) => {
              if (!element.checked && (ele.id == element.id)) {
                removedProducts.push(productIDs.splice(j, 1).toString());
              }
            })
          })
          removedProducts.forEach(data => {
            dataPusheToBranch.product_sequance.push(data);
          })
          // console.log(dataPusheToBranch);
          // return;
        //m this.loaderService.show('show');;
          this.commonService.putDataNew('product/warehouseProductDetails', dataPusheToBranch).subscribe(result => {
            if (result.success) {
            //m this.loaderService.show('hide');
              this.selectBranch(false);
              this.sharedService.displaySuccessMessage('Removed product from branch.')
            }
          }, err => {
          //m this.loaderService.show('hide');
            this.sharedService.displayErrorMessage('');
          });
        }
      }, (err) => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      })
    } else {
      this.sharedService.displayErrorMessage('Please remove filters to make change in sequence.');
    }
  }
  moveTopDown(index, move) {
    // console.log(this.selectedBranchProducts.records);
    if ((index == 0) && (move == -1)) {
      // console.log('no move')
    } else if (((this.selectedBranchProducts.records.length - 1) == index) && (move == 1)) {
      // console.log('no move end');
    } else {
      this.isSaveProduct = false;
      [this.selectedBranchProducts.records[index], this.selectedBranchProducts.records[index + move]] = [this.selectedBranchProducts.records[index + move], this.selectedBranchProducts.records[index]]
    }
  }
  sorting(sortText: string, sortValue) {
    switch (sortText) {
      case 'sortByName':
        this.sortField.sortByName = sortValue;
        this.getProductDetails();
        break;
      case 'sortByBrand':
        this.sortField.sortByBrand = sortValue;
        this.getProductDetails();
        break;
      case 'sortByCategory':
        this.sortField.sortByCategory = sortValue;
        this.getProductDetails();
        break;
      default:
        break;
    }
  }
  sortingBranch(sortText: string, sortValue) {
    switch (sortText) {
      case 'sortByName':
        this.sortFieldBranch.sortByName = sortValue;
        this.selectBranch(false);
        break;
      case 'sortByBrand':
        this.sortFieldBranch.sortByBrand = sortValue;
        this.selectBranch(false);
        break;
      default:
        break;
    }
  }
  getAllBranchProducts() {
    // console.log('came')
    if (this.selectedWareHouseID) {
      let request = '?records_per_page=' + 400 +
        '&page_number=' + 1 +
        '&sort_by_alphabet=' + this.sortFieldBranch.sortByName + '&warehouse_id=' + this.selectedWareHouseID
      this.commonService.getDataNew('product/getWarehouseProduct' + request).subscribe(res => {
        this.branchProduct = res.payload.records;
        // console.log(this.branchProduct);
      }, (err) => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      })
    }
  }

}

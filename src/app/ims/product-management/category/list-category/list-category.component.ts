import { Component, OnInit } from '@angular/core';
import { SharedService, TableListCatgeory, TableViewRequestSet, AvailableLang, LoaderService, moduleNameKeys, RolePermissionVal, DownloadSubscribeParams, FetchUserTabDetailsService } from 'src/app/utils';
import { Router } from '@angular/router';
import { SequenceDialogComponent } from 'src/app/utils/components/sequence-dialog/sequence-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/utils/services/common-service/common.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  public branchTableHeaders: any = [
    { header: 'Category Name' },
    { header: 'Category Description' }
  ];
  public tableHeaders: any = [
    { header: 'Category Name' },
    { header : 'Product Count'},
    { header: 'Category Description' }
  ];
  
  public selectedLang = 'en';
  public selectedSearchText = '';

  public categoryList = [];
  public availableLang: AvailableLang[] = [];
  public permissionSets: RolePermissionVal = new RolePermissionVal();
  public subscribeData = new DownloadSubscribeParams();
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public listCategories = new TableListCatgeory('');
  public listCategoriesByBranch = new TableListCatgeory('');
  isSaveProduct = true;
  branchData = [];
  selectedBranchCategories: any;
  isMoveDisable = true;
  isRemoveProduct = true;
  selectedWareHouseID = '';
  selectCheck: any;
  selectCheckBranch: any;
  public branchCategory: any;
  selectedBranch;
  
  constructor(private sharedService: SharedService, private commonService: CommonService,public dialog: MatDialog,
    private router: Router, private loaderService: LoaderService, private setDownload: FetchUserTabDetailsService) { }

  ngOnInit() {
    this.modulePermissionSets();
    this.getLangList();
    this.getCategoryList();
    this.getBranchList();
  }
  /**
 * @method  modulePermissionSets()
 * @description - the following modulePermissionSets() method is used set crud operations for module.
 * @uses toCheckAllPermissionRights() - the function toCheckAllPermissionRights returns right permissions for the
 *  module passing module name  as a params.
 * @author amitha.shetty
 */
  modulePermissionSets(): void {
    this.permissionSets = this.sharedService.toCheckAllPermissionRights(moduleNameKeys.category);
    // console.log(this.permissionSets)
  }

  //Category Infinite Scroll
  onScrollDown(){
    this.tableViewRequestData.pageNumber = this.tableViewRequestData.pageNumber + 1
    this.getCategoryList()
  }

  drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.listCategoriesByBranch.records, event.previousIndex, event.currentIndex);
        this.isSaveProduct = false;
  }
  getLangList() {
    this.availableLang = [];
    this.sharedService.getListLang()
      .then((data: any) => {
        this.availableLang = data.map(lang => new AvailableLang(lang));
      });
  }

  getCategoryList() {
   //m this.loaderService.show('show');;
    //this.listCategories.records = [];
    const requestSet = '?records_per_page='+'100'+'&page_number=' +
      this.tableViewRequestData.pageNumber + '&sort_updated_date=' + -1 + '&search_text=' + this.selectedSearchText+'&lang='+this.selectedLang;
    this.commonService.getDataNew('product/category' + requestSet).subscribe(res => {
      let categoryData = new TableListCatgeory(res.payload);
      console.log(categoryData,"CATGORY")
      if (this.selectedLang !== 'en' && this.selectedLang !== 'hi') {
        this.sharedService.setJsonResponse('category', this.selectedLang).then((result: any) => {
          let categoryList = [];
          if (result) {
            categoryList = res.payload.records.map(enData => {
              const resp = result.find(findEle => findEle._id === enData._id);
              enData.id = resp
                ? resp._id
                : null;
              enData.name = resp ? resp.name : undefined;
              enData.description = resp ? resp.description : undefined;
              return enData;
            });

            categoryData.records = categoryList.filter(ele => {
              return ele.id;
            });
            console.log(this.listCategories,"INSIDE LIST CATEGORIES",this.listCategoriesByBranch);
            if (this.selectedWareHouseID != '') {
              this.listCategories.records.forEach((element, i) => {
                this.listCategories.records[i]['isPresent'] = false;
                this.listCategories.records[i]['checked'] = false;
              })
              console.log(this.listCategories.records,"CATGORY",this.listCategoriesByBranch.records )
              this.listCategories.records.forEach((element, i) => {
                this.listCategoriesByBranch.records.forEach((branchElement, j) => {
                  this.listCategoriesByBranch.records[j]['checked'] = false;
                  if (element.id === branchElement.id) {
                    console.log("insides")
                    this.listCategories.records[i]['isPresent'] = true;
                    this.listCategories.records[i]['checked'] = true;
                  }
                })
              })
            }
          }
        });

      } else {
        let previousRecord = this.listCategories.records
        categoryData.records = previousRecord.concat(categoryData.records)
        this.listCategories = categoryData;
        console.log(this.listCategories, "INSIDE", this.listCategoriesByBranch);
        this.listCategories.records.forEach((element, i) => {
          this.listCategories.records[i]['isPresent'] = false;
          this.listCategories.records[i]['checked'] = false;
        })
        this.listCategories.records.forEach((element, i) => {
          this.listCategoriesByBranch.records.forEach((branchElement, j) => {
            this.listCategoriesByBranch.records[j]['checked'] = false;
            if (element.id === branchElement.category_code) {
              console.log(element.id,branchElement.category_code)
              this.listCategories.records[i]['isPresent'] = true;
              this.listCategories.records[i]['checked'] = true;
            }
          })
        })
      }
    
      //m this.loaderService.show('hide');
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    //m this.loaderService.show('hide');
    });
  }

  getPage(event): void {
    if (event > 0 && event <= this.listCategories.totalRecords) {
      this.tableViewRequestData.pageNumber = event;
      this.getCategoryList();
    }
  }

  editCategory(data: any) {
    console.log(data);
    this.router.navigate([`product-management/category/edit-category/${this.selectedLang}/${data.category_code}`]);
  }
  /* On lang btn click */
  /**
   * @method - langSelected()
   * @description - the following langSelected() method is used to set the lang selected and to get the list of category details
   * for the selected language
   * @author amitha.shetty
   */
  langSelected(data: any): void {
    if (this.selectedLang !== data.identity) {
      this.listCategories.records = [];
      this.tableViewRequestData.pageNumber = 1;
      this.selectedLang = data.identity;
      //this.selectedSearchText = '';
      this.subscribeData = new DownloadSubscribeParams();
      this.subscribeData.category.langSelected = data.identity;
      this.setDownload.setCategorySubscribeStatus(this.subscribeData);
      this.getCategoryList();
      this.selectBranch(true);
    }
  }
  searchCategory(event): void {
    if (event.key === "Enter") {
      if (this.selectedLang !== 'en' && event.target.value) {
        this.listCategories.records = []
        this.tableViewRequestData.pageNumber = 1
        this.getCategoryList();
        this.selectBranch(true);
      } else {
        this.selectedSearchText = event.target.value;
        this.subscribeData.category.searchText = this.selectedSearchText;
        this.setDownload.setCategorySubscribeStatus(this.subscribeData);
        this.listCategories.records = []
        this.tableViewRequestData.pageNumber = 1
        this.getCategoryList();
        this.selectBranch(true);
      }
    }
  }
  moveTopDown(index, move) {
    if ((index == 0) && (move == -1)) {
    } else if (((this.listCategoriesByBranch.records.length - 1) == index) && (move == 1)) {
    } else {
      this.isSaveProduct = false;
      [this.listCategoriesByBranch.records[index], this.listCategoriesByBranch.records[index + move]] = [this.listCategoriesByBranch.records[index + move], this.listCategoriesByBranch.records[index]]
    }
  }
  saveCategory() {
    if (this.selectedSearchText == '') {
      let dataPusheToBranch = { category_sequance: [], warehouse_id: this.selectedWareHouseID, };
      this.listCategoriesByBranch.records.forEach((element, i) => {
        dataPusheToBranch.category_sequance.push(element.category_code)
      })
      console.log(dataPusheToBranch);
      //m this.loaderService.show('show');
      this.commonService.putDataNew('product/warehouseCategory', dataPusheToBranch).subscribe(res => {
        if (res.success) {
        //m this.loaderService.show('hide');
          this.getCategoryList();
          this.sharedService.displaySuccessMessage('Category updated successfully.')
        }
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
      this.isSaveProduct = true;
    } else {
      this.sharedService.displayErrorMessage('Please remove filter to make change in sequence.');
    }
  }
  getBranchList() {
    this.branchData = [];
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
    this.branchData = [];
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
      this.listCategoriesByBranch.records = [];
      this.isMoveDisable = true;
      this.isRemoveProduct = true;
      this.isSaveProduct = true;
      this.selectedWareHouseID = '';
      this.selectCheck = false;
    //m this.loaderService.show('hide');
    this.listCategories.records.forEach((element, i) => {
      this.listCategories.records[i]['isPresent'] = false;
      this.listCategories.records[i]['checked'] = false;
    })
    } else if (this.selectedWareHouseID != '' || event.id) {
      this.isMoveDisable = true
      //m this.loaderService.show('show');
      this.selectedWareHouseID = event ? event.id ? event.id : this.selectedWareHouseID : this.selectedWareHouseID
     // this.getAllBranchProducts();
      const requestSet = '?records_per_page=' + 200 + '&page_number=' + this.tableViewRequestData.pageNumber + '&warehouse_id=' + this.selectedWareHouseID
        + '&sort_updated_date=' + -1 +'&lang='+this.selectedLang;
      this.commonService.getDataNew('product/getWarehouseCategory' + requestSet).subscribe(res => {
        const categoryData = new TableListCatgeory(res.payload);
        this.branchCategory = res.payload.records;
        //m this.loaderService.show('hide');
          this.listCategoriesByBranch = categoryData;
        
        this.listCategoriesByBranch.records = [];
        this.listCategories.records.forEach((element, i) => {
          this.listCategories.records[i]['isPresent'] = false;
          this.listCategories.records[i]['checked'] = false;
        })
        this.listCategoriesByBranch = new TableListCatgeory(res.payload);
        console.log(this.listCategoriesByBranch,"INS")
        this.listCategoriesByBranch['page_info'] = res.payload.page_info;
        this.listCategories.records.forEach((element, i) => {
          this.listCategoriesByBranch.records.forEach((branchElement, j) => {
            this.listCategoriesByBranch.records[j]['checked'] = false;
             console.log(element,branchElement.category_code)
            if (element.id === branchElement.category_code) {
              console.log("ins equality")
              this.listCategories.records[i]['isPresent'] = true;
              this.listCategories.records[i]['checked'] = true;
            }
            else if(element.id === branchElement.id){
              this.listCategories.records[i]['isPresent'] = true;
              this.listCategories.records[i]['checked'] = true;
            }
          })
        })
        // console.log('came here',this.listCategories.records)
        this.checkToDelete();
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    }
  }
  selectAll(event) {
    this.selectCheck = event.checked;
    for (let i = 0; i < this.listCategories.records.length; i++) {
      if (!this.listCategories.records[i].isPresent)
        this.listCategories.records[i].checked = this.selectCheck;
    }
    this.checkToMove();
  }
  moveToBranch() {
    //m this.loaderService.show('show');;
    this.selectCheck = false;
    if (this.selectedWareHouseID != '' || this.selectedWareHouseID) {
      let newProducts = [];
      let allRecords: any = [];
      this.branchCategory.forEach((element, i) => {
        allRecords.push(element.category_code)
      })
      console.log(this.listCategories);
      if (this.listCategories.records.length > 0) {
        this.listCategories.records.forEach((element, i) => {
          if (element.checked && !element.isPresent) {
            // allRecords.unshift(element.productId);
            if(element.category?.products.length > 0)
            newProducts.unshift(element)
            // allRecords.splice(0,0,element.productId)
          }
        })
      }
      let dataPusheToBranch = {
        warehouse_id: this.selectedWareHouseID,
        category_sequance: allRecords,
        newProducts: newProducts
      }
      const dialogRef = this.dialog.open(SequenceDialogComponent, {
        data: {
          name: 'Sequence Category',
          item: dataPusheToBranch,
          type: 'sequencing',
        },
        // minHeight: '100%',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectBranch(false);
        } else {

        }
      });
      //m this.loaderService.show('hide');
      console.log('fdssdd');
  return;
      this.commonService.putDataNew('admin/warehouse', dataPusheToBranch).subscribe(res => {
        if (res.success) {
        //m this.loaderService.show('hide');
          this.selectBranch(false);
          this.sharedService.displaySuccessMessage('Branch and Category updated successfully.')
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
  updateCheck(event, index) {
    this.listCategories.records[index].checked = event.checked;
    this.checkIfAllSelected();
    this.checkToMove();
  }
  checkIfAllSelected() {
    this.selectCheck = this.listCategories.records.every(function (item: any) {
      return item.checked == true;
    })
  }
  checkToMove() {
    let onePresent = false;
    this.listCategories.records.forEach((element, i) => {
      if (element.checked && !element.isPresent) {
        onePresent = true;
      }
    });
    onePresent ? (this.isMoveDisable = false) : (this.isMoveDisable = true)
  }
  getAllBranchProducts() {
    // console.log('came')
    if (this.selectedWareHouseID) {
      let request = '?records_per_page=' + 400 +
        '&page_number=' + 1 + '&warehouse_id=' + this.selectedWareHouseID
      this.commonService.getDataNew('product/getWarehouseCategory' + request).subscribe(res => {
        this.branchCategory = res.payload.records;
      }, (err) => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      })
    }
  }
  selectAllBranch(event) {
    this.selectCheckBranch = event.checked;
    for (let i = 0; i < this.listCategoriesByBranch.records.length; i++) {
      if (!this.listCategoriesByBranch.records[i].isPresent)
        this.listCategoriesByBranch.records[i].checked = this.selectCheckBranch;
    }
    this.checkToDelete();
  }
  checkToDelete() {
    let onePresent = false;
    this.listCategoriesByBranch.records.forEach((element, i) => {
      if (element.checked) {
        onePresent = true;
      }
    });
    onePresent ? (this.isRemoveProduct = false) : (this.isRemoveProduct = true)
  }
  updateCheckBranch(event, index) {
    this.listCategoriesByBranch.records[index].checked = event.checked;
    this.checkIfAllSelectedBranch();
    this.checkToDelete();
  }
  checkIfAllSelectedBranch() {
    this.selectCheckBranch = this.listCategoriesByBranch.records.every(function (item: any) {
      return item.checked == true;
    })
  }
  removeProduct() {
    this.selectCheckBranch = false;
    let oldProduct = [];
    if (this.selectedWareHouseID != '' || this.selectedWareHouseID) {
      let request = '?records_per_page=' + 400 +
        '&page_number=' + 1 + '&warehouse_id=' + this.selectedWareHouseID+'&lang='+this.selectedLang
      this.commonService.getDataNew('product/getWarehouseCategory' + request).subscribe(res => {
        if (res) {
          let productIDs = [];
          oldProduct = res.payload.records;
          let dataPusheToBranch = {
            warehouse_id: this.selectedWareHouseID,
            category_sequance: []
          }
          oldProduct.forEach((ele, j) => {
            productIDs[j] = ele.category_code;
            this.listCategoriesByBranch.records.forEach((element, i) => {
              if (element.checked && (ele.category_code == element.category_code)) {
                productIDs.splice(j, 1);
              }
            })
          })
          productIDs.forEach(data => {
            dataPusheToBranch.category_sequance.push(data);
          })
          this.commonService.putDataNew('product/warehouseCategory', dataPusheToBranch).subscribe(res => {
            if (res.success) {
            //m this.loaderService.show('hide');
              this.selectBranch(false);
              this.sharedService.displaySuccessMessage('Removed category from branch.')
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
}

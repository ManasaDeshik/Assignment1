import { Component, OnInit } from '@angular/core';
import {
  CommonService, SharedService, LoaderService, WarehouseManufacturerFranchise, branchWarehouseManufacturerFranchise, WarehouseManfacturerFranchiseRecords,
  BranchDetails, TableViewRequestSet, CreateWarehouseManufacturerFranchise
} from 'src/app/utils';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-warehouse-manufacturer-franchise',
  templateUrl: './create-warehouse-manufacturer-franchise.component.html',
  styleUrls: ['./create-warehouse-manufacturer-franchise.component.scss']
})
export class CreateWarehouseManufacturerFranchiseComponent implements OnInit {
  public formData: WarehouseManfacturerFranchiseRecords = new WarehouseManfacturerFranchiseRecords();
  public tableTypeData: WarehouseManufacturerFranchise = new WarehouseManufacturerFranchise();
  public isEditMode = false;
  public routeSegmentId: string;
  public branchData: BranchDetails = new BranchDetails();
  public franchiseNameCollections = [];
  public franchiseAddressCollections = [];
  public tableViewRequestData: TableViewRequestSet = new TableViewRequestSet();
  public franchiseReactiveForm: FormGroup;
  public franchiseAddress: string;
  public franchiseName: string;

  constructor(private commonService: CommonService,
    public sharedService: SharedService,
    private loaderService: LoaderService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.franchiseReactiveForm = this.createFranchiseForm();
    this.fetchUrl();
  }

  createFranchiseForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^\S/)]],
      gst_code: ['', [Validators.required]],
      franchiseAddressArray: this.formBuilder.array([this.createFranchise()]),
    });
  }
  get validationControl() { return this.franchiseReactiveForm.controls; }
  get franchiseValidationControl(): FormArray { return this.validationControl.franchiseAddressArray as FormArray; }
  /**
   * @method fetchUrl()
   * @description: fetch url from the route and decide which module/component is
   * @author karan
   */
  fetchUrl(): void {
    const urlSegment = this.sharedService.urlSegmentKeys();
    this.routeSegmentId = urlSegment[urlSegment.length - 1].path;
    if (!this.routeSegmentId.includes('create')) {
      this.tableTypeData = new WarehouseManufacturerFranchise(branchWarehouseManufacturerFranchise[urlSegment[urlSegment.length - 3].path]);
      this.getEditData();
      this.isEditMode = true;
    } else {
      this.tableTypeData = new WarehouseManufacturerFranchise(branchWarehouseManufacturerFranchise[urlSegment[urlSegment.length - 2].path]);
    }
  }
  createFranchise() {
    return this.formBuilder.group({
      description: ['', [Validators.required]],
      _id: ['']
    });
  }
  // , Validators.pattern('\d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.')
  /**
  * @method searchFieldKey()
  * @description: to get branch details collections from the searched text
  * @param event: contains selected  text
  * @author amitha.shetty and karan
  */
  searchFieldKey(event: any) {
    if (event.term) {
      this.branchData.branch.searchRequest = event.term;
      this.getBranchList();
    }
  }

  /**
  * @method selectedFieldKey()
  * @description: to get branch id from collections from the selected text
  * @param event: contains selected  text
  * @author amitha.shetty and karan
  */
  selectedFieldKey(event: any) {
    if (event !== undefined) {
      this.formData.branch = event.id;
    }
  }

  getBranchList() {
    const requestSet = '?records_per_page=' + 10 + '&page_number=' +
      this.tableViewRequestData.pageNumber + '&search_by_branch_name=' + this.branchData.branch.searchRequest;
    this.commonService.getDataNew('users/branches' + requestSet).subscribe(res => {
      this.branchData.branch.collections = res.payload.records;
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  getEditData() {
    //m this.loaderService.show('show');
    console.log(this.tableTypeData)
    this.commonService.getDataNew(this.tableTypeData.detailEndPoint + '/' + this.routeSegmentId).subscribe(res => {
      if (this.tableTypeData.pageTitle === 'Franchise') {
        this.franchiseReactiveForm.patchValue(res.payload);
        this.franchiseReactiveForm.setControl('franchiseAddressArray', this.formBuilder.array([]));
        res.payload.franchises_addresses.forEach(opt => {
          if(opt.deletedAt == null)
          this.franchiseValidationControl.push(this.formBuilder.group(opt));
        });
      } else {
        this.formData = new WarehouseManfacturerFranchiseRecords(res.payload, this.tableTypeData.pageTitle);
        if (this.tableTypeData.pageTitle === 'Warehouse' && res.payload.franchise) {
          this.commonService.getDataNew(`users/getFranchise/${res.payload.franchiseId}`).subscribe(res => {
          //m this.loaderService.show('hide');
            this.franchiseAddressCollections = res.payload.franchises_addresses;
          }, err => {
           //m this.loaderService.show('hide');
            this.sharedService.displayErrorMessage('');
          });
          if (this.formData.branch) {
            this.branchData.branch.long_text = this.formData.branch;
          }
          this.franchiseName = res.payload.franchise.name;
          const { description = '' } = res.payload.franchise.franchises_addresses.find(ele => ele.id === res.payload.franchisesAddressId);
          this.franchiseAddress = description;
        }
      }
    //m this.loaderService.show('hide');

    }, err => {
      this.sharedService.displayErrorMessage('');
//m this.loaderService.show('hide');
    });
  }


  /**
  * @method CreateWarehouseManufacturerFranchise()
  * @description: creating warehouse/manufacturer/franchise if success then navigate back to list warehouse/manufacturer/franchise
  * @author karan
  */
  createWarehouseManufacturerFranchise() {
    //m this.loaderService.show('show');
    let data: any = {};
    if (this.tableTypeData.pageTitle === 'Franchise') {
      data = {
        name: this.franchiseReactiveForm.value.name.trim(),
        gst_code: this.franchiseReactiveForm.value.gst_code,
        address: this.franchiseReactiveForm.value.franchiseAddressArray.map(ele => ele.description)
      }
      if (data.name.trim() === '' || data.gst_code.trim() === '') {
        this.sharedService.displayErrorMessage('Please enter valid details.');
      //m this.loaderService.show('hide');
        return;
      }
      let noValid = false;
      // console.log(data);
      //m this.loaderService.show('hide');
      // return;

      data.address.forEach((element, i) => {
        // console.log(element)
        if (element.trim() == '') {
          noValid = true;
        }
        data.address[i] = element.trim();
      })
      // console.log(noValid);
      if (noValid) {
        this.sharedService.displayErrorMessage('Please enter valid address.');
       //m this.loaderService.show('hide');
        // break;
        return false;
      }
      data.name = data.name.trim();
      data.gst_code = data.gst_code.trim();
      // console.log(data)
    } else if (this.tableTypeData.pageTitle === 'Warehouse') {
      data = new CreateWarehouseManufacturerFranchise(this.formData);
      // console.log(data)
      if (data.name.trim() === '' || data.location.trim() === '') {
        this.sharedService.displayErrorMessage('Please enter valid details.');
      //m this.loaderService.show('hide');
        return;
      }
      data.name.trim();
      data.location.trim();
      data.name_url = data.name.toLowerCase();
    } else {
      data = new CreateWarehouseManufacturerFranchise(this.formData);
      // console.log(data)
      if (data.name.trim() === '' || data.address.trim() === '' || data.gst_code.trim() === '' || data.reference_code.trim() === '') {
        this.sharedService.displayErrorMessage('Please enter valid details.');
      //m this.loaderService.show('hide');
        return;
      }
      data.name.trim();
      data.address.trim();
      data.gst_code.trim();
      data.reference_code.trim();
    }
    this.commonService.postDataNew(this.tableTypeData.apiEndPoint, data).subscribe(res => {
      this.sharedService.displaySuccessMessage(this.tableTypeData.pageTitle + ' Created Successfully');
      this.routeToParentLink();
      console.log(res)
    //m this.loaderService.show('hide');
    }, err => {
      console.log(err)
      if(err && err.error && err.error.message && err.error.message.name)
      this.sharedService.displayErrorMessage(err.error.message.name);
    //m this.loaderService.show('hide');
    });
  }


  /**
  * @method updateWarehouseManufacturerFranchise()
  * @description: editing  warehouse/manufacturer/franchise if success then navigate back to list warehouse/manufacturer/franchise
  * @author karan
  */
  updateWarehouseManufacturerFranchise() {
    //m this.loaderService.show('show');
    let data: any = {};
    if (this.tableTypeData.pageTitle === 'Franchise') {
      data = {
        franchise_id: this.routeSegmentId,
        name: this.franchiseReactiveForm.value.name,
        gst_code: this.franchiseReactiveForm.value.gst_code,
        address: this.franchiseReactiveForm.value.franchiseAddressArray
      };
      if (data.name.trim() === '' || data.gst_code.trim() === '') {
        this.sharedService.displayErrorMessage('Please enter valid details.');
      //m this.loaderService.show('hide');
        return;
      }
      let noValid = false;
      data.address.forEach((element, i) => {
        // console.log(element)
        if (element.description.trim() == '') {
          noValid = true;
        }
        data.address[i].description = element.description.trim();
      })
      // console.log(noValid);
      if (noValid) {
        this.sharedService.displayErrorMessage('Please enter valid address.');
      //m this.loaderService.show('hide');
        // break;
        return false;
      }
      data.name = data.name.trim();
      data.gst_code = data.gst_code.trim();
      // console.log(data)
    } else if (this.tableTypeData.pageTitle === 'Warehouse') {
      data = this.formData;
      data.franchiseId=data.frnachise_id
      delete this.formData['branch'];
      if (data.name.trim() === '' || data.location.trim() === '') {
        this.sharedService.displayErrorMessage('Please enter valid details.');
      //m this.loaderService.show('hide');
        return;
      }
      data.name.trim();
      data.location.trim();
    } else {
      data = this.formData;
      if (data.name.trim() === '' || data.address.trim() === '' || data.gst_code.trim() === '' || data.gst_code.trim() === '') {
        this.sharedService.displayErrorMessage('Please enter valid details.');
      //m this.loaderService.show('hide');
        return;
      }
      data.name.trim();
      data.address.trim();
      data.gst_code.trim();
      data.reference_code.trim();
    }
    this.commonService.putDataNew(this.tableTypeData.apiEndPoint, data).subscribe(res => {
      this.sharedService.displaySuccessMessage(this.tableTypeData.pageTitle + ' Updated Successfully');
      this.routeToParentLink();
    //m this.loaderService.show('hide');
    }, err => {
      if(err && err.error && err.error.message && err.error.message.name)
      this.sharedService.displayErrorMessage(err.error.message.name);
    //m this.loaderService.show('hide');
    });
  }
  routeToParentLink(): void {
    this.router.navigate([this.tableTypeData.parentLink]);
  }

  generateFranchise() {
    this.franchiseValidationControl.push(this.createFranchise());
  }
  deleteInputData(index) {
    this.franchiseValidationControl.removeAt(index);
  }
  searchFranchiseFieldKey(event): void {
    this.commonService.getDataNew(`users/franchise?search_text=${event.term}`).subscribe(res => {
      this.franchiseNameCollections = res.payload.records;
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage('');
    });
  }
  selectedFranchiseFieldKey(event): void {
    this.formData.franchisesAddressId = '',
      this.franchiseAddress = undefined;
    this.franchiseAddressCollections = [];
    if (event) {
      this.commonService.getDataNew(`users/getFranchise/${event.id}`).subscribe(res => {
        this.franchiseAddressCollections = res.payload.franchises_addresses;
        this.formData.frnachise_id = event.id,
          this.franchiseName = event.name;
      }, err => {
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('');
      });
    }
  }
  selectedFranchiseAddressFieldKey(event): void {
    if (event) {
      this.formData.franchisesAddressId = event.id,
        this.franchiseAddress = event.description;
    } else {
      this.formData.franchisesAddressId = '',
        this.franchiseAddress = '';
    }
  }
}

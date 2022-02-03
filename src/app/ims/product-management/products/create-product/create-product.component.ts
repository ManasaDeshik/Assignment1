import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {
  CommonService, SharedService, AvailableLang,
  ProductCollections, ProductInfo, VarientsCollections, RequestProductCollections, RequestProductDetailCollections, ProductDetailsAction, productDetailsActionCollections, VarientDetailsAction, EditVarientDetails, LoaderService, AddSpareComponent, ViewVarientsInfo, ViewSpareParts, GeTSpareList
} from 'src/app/utils';
import { SessionStorage } from 'ngx-webstorage';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatTabChangeEvent} from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  public productForm: FormGroup;
  public productDetailForm: FormGroup; // product and varients form
  public productPriceDetailForm: FormGroup;
  public productTaxDetailForm: FormGroup;
  public productDetailComboForm: FormGroup;
  public productAgingForm: FormGroup;
  public matTabIndex = 0;
  public sparePageInfo = {
    currentPage: 1,
    recordsPerPage: 10
  };
  public productAction: ProductDetailsAction = new ProductDetailsAction(); // form actions
  public varientAction: VarientDetailsAction = new VarientDetailsAction();
  public storeProductData = {};
  public productRequestObj = new RequestProductCollections();  // api request format
  public productDetailRequestObj = new RequestProductDetailCollections();
  public varientActionDisplay = new ViewVarientsInfo();
  public productDetailType =
    [{
      name: 'Single',
      val: 0

    }, {
      name: 'Combo',
      val: 1
    }];
  public isLangSelected = true;
  public availableLang: AvailableLang[] = []; // available lang language
  public selectedLang = 'en'; // default language english
  public categoryList = []; // to get caregory list of items
  public producReferencetList: any = [];
  public fearturesList = [];  // to get feature list of items
  public displayImages = ['','','','',''];  // file related operations
  public storeImages = [];
  public viewCreatedVarients: Array<any> = []; // Varients list
  public isExistingVarient = true;
  public selectedVarient: string; // display selected varient in list
  public selectedCategory = [];
  public selectedFeature = [];
  public selectedComboProduct = [];
  public selectedFeatureOpt = [];
  public categoryLang=[];
  public deletedFeatures = [];
  public radioBtnSelected = 0;
  public isVarientChecked = false;
  public isproductDetailTouched = false;
  public isProductTouched = false;
  public isValueCheck = true;
  public searchTextSpare = '';
  public viewSpareParts: GeTSpareList = new GeTSpareList();
  public range = [0, 1, 2, 3, 4];
  public productCode = '';
  public variantCode='';
  public isEdit = false;
  public brand='';
  public title='';
  public isVariant = false;
  public product_stock_count=0;
  public generateSpecificationControl=[]
  public generateSpecificationControlValue:any=[]
  public categoryView
  @SessionStorage('productId') public productId: string;

  @ViewChild('testForm') test: any;
  public isView = false;
  selectedProduct: any = [];
  warehouseList: any = [];
  selectWarehouseForProductDetails  = [];
  selectedWarehouse  = [];
  titleset: any = [];
  comboObject: any = [];
  quantity: any = []
  specdel: any = []
  delspec: any = []
  specdata: any = {'en':[],'hi':[]}
  specdatalength: any = {'en':0,'hi':0}
  radioActive = false;

  constructor(private commonService: CommonService,
    private sharedService: SharedService, private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router,
    private loaderService: LoaderService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getBranchList()
    this.getLangList();
    this.productForm = this.createProductForm();
    this.productDetailForm = this.createProductDetailForm();
    this.productPriceDetailForm = this.createProductPriceDetailForm();
    this.productTaxDetailForm = this.createProductTaxDetailForm();
    this.productDetailComboForm = this.createProductComboForm();
    this.productAgingForm = this.createProductAgingForm();
    this.availableLang.filter(ele => {
      if (!this.storeProductData[ele.identity]) {
        this.storeProductData[ele.identity] = {};
      }
    });
    this.setProductAction();
    this.selectedLang = 'hi';
    this.setRecentSelectedFormData();
    this.selectedLang = 'en';
    this.setRecentSelectedFormData();
  }
  /**
   * @method - validationControl()
   * @description - the following validationControl() method is used return  user credentials so it make easy to
   * access the form controls on the HTML form.
   * @author amitha.shetty
   */
  /* Reactive form validation with creation*/
  get validationControl() { return this.productForm.controls; }
  get productDetailsValidationControl() { return this.productDetailForm.controls; }
  get productPriceDetailValidationControl() { return this.productPriceDetailForm.controls; }
  get specificationValidationControl(): FormArray { return this.productDetailsValidationControl.specificationDataArray as FormArray; }
  get featureValidationControl(): FormArray { return this.productDetailsValidationControl.featuresDataArray as FormArray; }
  get taxValidationControl(): FormArray { return this.productTaxDetailForm.controls.taxDataArray as FormArray; }
  get productComboFormValidationControl() { return this.productDetailComboForm.controls; }
  get productAgingValidationControl() { return this.productAgingForm.controls; }
  createProductForm() {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/^\S/)]],
      category: ['', Validators.required],
      brand: ['', [Validators.required, Validators.pattern(/^\S/)]],
      //product_code: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!?]*$')]],
      categoryView:['']
    });
  }
  createProductDetailForm() {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/^\S/)]],
      variant_code:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!?]*$')]],
      warehouse: ['', []],
      description: ['', [Validators.required, Validators.pattern(/^\S/)]],
      specificationDataArray: this.formBuilder.array([this.createSpecification()]),
      featuresDataArray: this.formBuilder.array([this.createFeatures()]),
    });
  }
  // createProductAgingForm() {
  //   return this.formBuilder.group({
  //     year: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
  //     month: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
  //     day: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
  //   });
  // }
  createProductAgingForm() {
    return this.formBuilder.group({
      year: ['', [ Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      month: ['', [ Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      day: ['', [ Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    });
  }
  createProductPriceDetailForm() {
    return this.formBuilder.group({
      actualPrice: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      extraPrice: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      deliveryPrice: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      discountPrice: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      mrp: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    });
  }
  createProductTaxDetailForm() {
    return this.formBuilder.group({
      taxDataArray: this.formBuilder.array([this.createTaxDetails()])
    });
  }
  createProductComboForm() {
    return this.formBuilder.group({
      productReference: ['', [Validators.required]],
      comboPrice: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
    });
  }
  createSpecification() {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/^\S/)]],
      description: ['', [Validators.required, Validators.pattern(/^\S/)]],
    });
  }
  createFeatures() {
    return this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern(/^\S/)]],
      feature_option: ['', [Validators.required, Validators.pattern(/^\S/)]],
      feature_id:[],
      _id: []
    });
  }
  createTaxDetails() {
    return this.formBuilder.group({
      name: ['',[Validators.required,  Validators.pattern(/^\S/)]],
      percent: ['', [Validators.required, Validators.pattern(/^\S/)]],
    });
  }
  // load initial specification
  generateSpecification() {

    this.specificationValidationControl.push(this.createSpecification());
    this.generateSpecificationControl.push(this.createSpecification())
  }
  getBranchList(searchKey="") {
    this.commonService.getDataModified(`users/warehouse?search=${searchKey}`).subscribe(res => {
      this.warehouseList = res.payload.records
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }

  serachWarehouse($event){
    this.getBranchList($event.term)
  }
  selectWarehouse(event,type){
    this.selectWarehouseForProductDetails = [];
    event.map(ele => {
      this.selectWarehouseForProductDetails.push(ele.id);
    });
  }
  // load initial features
  generateFeatures() {
    this.featureValidationControl.push(this.createFeatures());
  }
  generateTaxDetails() {
    this.taxValidationControl.push(this.createTaxDetails());
  }

  // delete Input row
  deleteInputDataSpec(index: number, identifier: string) {
    this.commonService.deleteDataNew(`product/specification`,{sort:index,productDetaiId:this.selectedVarient}).subscribe(res => {
      this.specificationValidationControl.removeAt(index);
      this.specdel.push(index)
      // this.warehouseList = res.payload.records
    }, err => {
      this.sharedService.displayErrorMessage('');
    });
  }
  deleteInputData(index: number, identifier: string) {
    if (identifier === 'specification') {
      this.specificationValidationControl.removeAt(index);
      this.specdel.push(index)
    } else if (identifier === 'feature') {
      if (this.varientAction.key === 'Update') {
        this.deletedFeatures.push(this.featureValidationControl.value[index]._id);
      }
      this.featureValidationControl.removeAt(index);
      this.selectedFeature = [];
      this.selectedFeatureOpt = [];
      this.featureValidationControl.value.map((ele, featureIndex) => {
        this.selectedFeature[featureIndex] = ele.name;
        this.selectedFeatureOpt[featureIndex] = ele.feature_option;
      });
    } else if (identifier === 'taxDetail') {
      this.taxValidationControl.removeAt(index);
    }
  }
  /* get list details */
  getLangList() {
    this.availableLang = [];
    this.sharedService.getListLang()
      .then((data: any) => {
        this.availableLang = data.map(x => new AvailableLang(x));
      });
  }
  setProductAction(): void {

    const urlSegmet = this.sharedService.urlSegmentKeys();
    this.productAction = new ProductDetailsAction(productDetailsActionCollections[urlSegmet[2].path]);
    if (this.productAction.key === 'Create') {
      this.varientAction.name = "Add Product";
      if (this.productId) {
        this.updateViewVarientsForm();
      }
    } else if (this.productAction.key === 'Update') {
      this.radioActive = true;
      this.varientAction.name = "Edit Product";
      this.varientAction.key = "Update";
      this.productId = urlSegmet[urlSegmet.length - 1].path;
      this.selectedLang = urlSegmet[urlSegmet.length - 2].path;
      this.onEditVarientDetail(urlSegmet[urlSegmet.length - 1].path, 'edit');
      this.isEdit = true;
    } else if (this.productAction.key === 'View') {
      this.radioActive = true;
      this.isView = true;
      this.varientAction.name = "View Product";
      this.productId = urlSegmet[urlSegmet.length - 1].path;
      this.selectedLang = urlSegmet[urlSegmet.length - 2].path;
      this.onEditVarientDetail(urlSegmet[urlSegmet.length - 1].path, 'edit');
    }
  }

  clearVarients(): void {
    // reset whole form back to initial state;
    this.productDetailForm.reset();
    this.productDetailForm = this.createProductDetailForm();
    this.productTaxDetailForm = this.createProductTaxDetailForm();
    this.productPriceDetailForm.reset();
    this.productTaxDetailForm.reset();
    this.productDetailComboForm.reset();
    this.storeImages = [];
    this.displayImages = [];
    this.isproductDetailTouched = false;
    this.selectedComboProduct = [];
    this.isProductTouched = false;
    this.varientActionDisplay = new ViewVarientsInfo();
  }
  getEditProduct(): void {
    this.commonService.getDataNew('product/getsingleproduct/' + this.productId+'?lang='+this.selectedLang).subscribe(response => {
      if (response.success) {
        this.availableLang.filter(ele => {
          if (!this.storeProductData[ele.identity]) {
            this.storeProductData[ele.identity] = {};
          }
        });
            this.productRequestObj.is_disabled = response.payload.is_disabled;
            this.storeProductData['en'].product = response.payload;
              let data=response.payload;
              data.translation.map(val=>{
                this.storeProductData[val.language].product = val;
              })
              if(data.categories && data.categories[0] && data.categories[0].category_translation)
              data.category=data.categories[0].category_translation;
              
              this.productForm.patchValue(new ProductCollections(data)); // default product form on load
              this.selectedCategory = this.productForm.value.category;
              this.productForm.get('categoryView').setValue(this.selectedCategory[0].name)
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
    this.fetchVarientDetails();
  }

  getCategoryList(event): void {
    this.categoryList = [];
    if (event.term) {
      this.commonService.getDataNew('product/category?lang='+this.selectedLang+'&search_text=' + event.term).subscribe(response => {
        if (response) {
          this.categoryList = response.payload.records;
        }
      }, err => {
        this.sharedService.displayErrorMessage(err.statusText);
      });
      return;
      if (this.selectedLang === 'en') {
        
      } else {
        this.sharedService.setJsonResponse('category', this.selectedLang).then((result: any) => {
          if (result) {
            this.categoryList = result;
          }
        });
      }
    }
  }
  getSelectedCategoryField() {
    if (this.selectedCategory.length > 0) {
   
        const categoryEnData = [];
        this.selectedCategory.map(ele => {
          this.commonService.getDataNew(`product/category/${ele.category_code}`).subscribe(response => {
            if (response) {
           
             this.categoryLang[ele.category_code]=response.payload;
             
             categoryEnData.push(this.categoryLang[ele.category_code].find(y=>y.language==this.selectedLang))
              this.productForm.patchValue({
                category: categoryEnData
              });
              this.productForm.patchValue({
                categoryView: categoryEnData[0].name
              });

            }
          }, err => {
            this.sharedService.displayErrorMessage(err.statusText);
          });
        });
      
    } else {
      this.productForm.patchValue({
        category: []
      });
    }
  }

  changeCategoryProduct(event) {
    this.selectedCategory = [];
    event.map(element => {
      console.log(element);
      this.selectedCategory.push(element);
    });
  }
  changeProductReferenceList(event) {
    if (event) {
      if (typeof (event[0]) != 'string') {
        this.comboObject = event;
        this.selectedProduct = [];
        this.selectedComboProduct = [];
        this.selectedProduct = event;
        event.map(element => {
          this.selectedComboProduct.push(element.id ? element.id : element.product_detail_id);
        });
      } else {
        if (this.comboObject.length > 0) {
          let event1 = []
          this.comboObject.forEach((element, i) => {
            event.forEach((elem, eli) => {
              if (element.title == elem) {
                event1.push(element)
              }
            })
          })
          if (event1.length > 0) {
            this.changeProductReferenceList(event1);
          }
        }
      }

    }
  }
  changeQantity(event, index) {
    this.selectedProduct[index].quantity = event.target.value;
  }

  /** feature list actions */

  getFeaturesList(term: string): void {
      this.commonService.getDataNew('product/feature?language='+ this.selectedLang + '&search_text=' + term).subscribe(response => {
        if (response.success) {
          this.fearturesList = response.payload.records;
        }
      }, err => {
        this.sharedService.displayErrorMessage(err.statusText);
      });
  }
  // feature field actions
  changeSelectedFeature(event, index): void {
    //alert(index)
    if (event) {
      console.log(event,event.id,index);
      if(event.id){
        this.featureValidationControl.value[index]._id = event.id;
        this.featureValidationControl.at(index).get("_id").setValue(event.id)
      }
      else{
        this.featureValidationControl.value[index]._id = null;
        this.featureValidationControl.at(index).get("_id").setValue(null)
      }
      if(event.feature_id){
        this.featureValidationControl.at(index).get("feature_id").setValue(event.feature_id)
      }
      else{
        this.featureValidationControl.at(index).get("feature_id").setValue(null)
      }
      
      this.featureValidationControl.value[index].name = event.name;
      this.featureValidationControl.at(index).get("name").setValue(event.name)
      
      
      this.selectedFeature[index] = this.featureValidationControl.value[index].name;
    }
   
    console.log(this.featureValidationControl.value[index],this.featureValidationControl);
    this.fearturesList = [];
  }
  searchFeatureField(event, index): void {
    this.fearturesList = [];
    if (event.term) {
      this.getFeaturesList(event.term);
      this.featureValidationControl.value[index].name = event.term;
      console.log(event.term,"inside")
      this.selectedFeature[index] = this.featureValidationControl.value[index].name;
    }
  }

  getSelectedFeatureField(data) {
console.log(this.storeProductData)
    const featuresDataArray = this.storeProductData[this.selectedLang].varients.featuresDataArray;
    console.log(featuresDataArray);
    this.fetchFeatureFields(featuresDataArray, data);
  }
  fetchFeatureFields(featuresDataArray, data) {
    console.log(featuresDataArray,'dsaaaaaaaaaaa')
    if (featuresDataArray) {
     // this.availableLang.map(ele => {
        //if (ele.identity !== 'en') {
          this.commonService.getDataNew(`product/feature?language=${data.identity}`).subscribe(response => {
            if (response) {
              return false
                featuresDataArray.map((featureOpt, index) => {
                  if (featureOpt.name) {
                   let records= response.payload.records;
                   if(records){
                     records.map(val=>{
                       if(val.feature_id == featureOpt.feature_id)
                       {
                      // console.log(val,featureOpt,val.name,featureOpt.name,index)
                        this.featureValidationControl.at(index).get("name").setValue(val.name)
      this.featureValidationControl.at(index).get("_id").setValue(val.id)
      this.featureValidationControl.at(index).get("feature_id").setValue(val.feature_id)
                        this.selectedFeature[index] = val.name;
                       }
                     })
                   
                  }
                }
                });
              }
          }, err => {
            this.sharedService.displayErrorMessage(err.statusText);
          });
    }
  }

  // file related operations
  addFile(index: number,event) {
    for (const file of event.srcElement.files) {
      if ((window['restrictImageMinSize'] < (event.target.files[0].size / 1000)) && ((event.target.files[0].size / 1000) < window['restrictImageMaxSize'])) {
        if (!this.storeImages.some(val => val.name === file.name)) {
          const formData: FormData = new FormData();
    if (file) {
      formData.append('image', file);
      formData.append('type', 'products');
    }
          this.commonService.fileupload('product/imageupload', formData).subscribe(response => {
            if(response)
            this.displayImages[index] = response.payload;
           // this.displayImages.splice(index,1, response.payload);
            console.log('541',this.displayImages);
          });
        } else {
          this.sharedService.displayErrorMessage('Image has been already uploaded');
        }
      } else {
        this.sharedService.displayErrorMessage(`File size should be in between ${window['restrictImageMinSize']} Kilo bytes to ${window['restrictImageMaxSize']}  Kilo bytes`);
      }
    }
  }
  getUpdatedImages(file?: any): void {
    const formData: FormData = new FormData();
    if (file) {
      formData.append('images', JSON.stringify(this.displayImages));
    }
    formData.append('product_detail_id', this.selectedVarient);
    formData.append('product_id', this.productId);
    formData.append('update_images', JSON.stringify(this.storeImages));
    this.commonService.updateImage('admin/productDetail', formData).subscribe(response => {
      if (response.status = 200) {
        this.storeImages = response.payload.images;
      }
    }, err => {
      this.sharedService.displayErrorMessage('Something went wrong');
    });
  }

  removeFile(index: number): void {
    this.displayImages.splice(index, 1);
  }

  /* add related validation*/
  // create product and product details
  addNewVarient(): void {
    this.isVariant = true;
    this.selectedLang = "en";
    this.varientAction = new ProductDetailsAction(productDetailsActionCollections['create-product']);
    this.selectWarehouseForProductDetails = null;
    this.variantCode = '';
    this.selectedVarient = '';
    this.productDetailForm.controls['warehouse'].setValue('');
    this.productDetailForm.controls['title'].setValue('');
    this.productDetailForm.controls['description'].setValue('');
    this.featureValidationControl.value.map((element, featureIndex) => {
      this.selectedFeature[featureIndex] = null;
      this.selectedFeatureOpt[featureIndex] = '';
    });

    this.taxValidationControl.push(this.formBuilder.group({ name: ['', [Validators.required, Validators.pattern(/^\S/)]], 
    percent: ['',[Validators.required, Validators.pattern(/^\S/)]] }));
    
      this.productTaxDetailForm.value.taxDataArray = [];
      this.productTaxDetailForm = this.createProductTaxDetailForm();
    this.clearVarients();
    this.availableLang.filter(ele => {
      if (!this.storeProductData[ele.identity]) {
        this.storeProductData[ele.identity] = {};
      }
      this.storeProductData[ele.identity].varients.title = '';
      this.storeProductData[ele.identity].varients.description = '';
      this.storeProductData[ele.identity].product.brand = '';

    });
    //this.productDetailForm = null;
    this.selectedLang = 'hi';
    this.setRecentSelectedFormData();
    
    this.selectedLang = 'en';
    this.setRecentSelectedFormData();
    
    /*this.availableLang = this.availableLang.filter((ele, index) => {
      this.storeProductData[ele.identity].varients = undefined;
      ele.isCompleted = false;
      return this.availableLang;
    });*/
    //this.setProductAction();
    
    // this.viewCreatedVarients = [];
    this.selectedProduct = [];
  }
  addVarients(): void {
    if(this.isLangSelected == true){
      this.sharedService.displayErrorMessage("Please enter both English and Hindi data");
      return;
    }
    // debugger;
    this.isproductDetailTouched = true;
    this.isProductTouched = true;
    this.productDetailForm.controls.warehouse.setValue(this.selectWarehouseForProductDetails)
    this.productDetailForm.controls.variant_code.setValue(this.variantCode)
    this.toCheckFormValidAndCompleted();
    this.setRecentSelectedFormData();
    const checkFormCompletion = this.availableLang.filter(ele => {
      return !ele.isCompleted;
    });
     console.log(checkFormCompletion)
    if (checkFormCompletion.length > 0) {
      this.sharedService.displayErrorMessage('Please fill the form details');
      this.markAsTouched();
      this.markAsProductTypeTouched();
    } else {
      if (this.displayImages.length > 0) {
        if (!this.productId) {
          this.createProduct();
        } else {
          this.createUpdateProductDetails();
        }
      } else {
        this.sharedService.displayErrorMessage('Please Upload atleast one image');
      }
    }
  }

  /**Product create update */
  createProduct(): void {
    this.productFormRequestFormat();
    if (this.radioBtnSelected !== 0) {
      // this.selectedComboProduct = [];
      // this.selectedProduct.forEach((element, index) => {
      //   this.selectedComboProduct.push({
      //     product_detail_id: element._id,
      //     quantity: element.quantity ? element.quantity : '1'
      //   })
      // })
    }
   //m this.loaderService.show('show');;

    this.commonService.postDataNew('product/createproduct', this.productRequestObj).subscribe(response => {
      //m this.loaderService.show('hide');
      // return false;
      if (response) {
        this.productId = response.data.id;
        this.createUpdateProductDetails();
      //m this.loaderService.show('hide');
      }
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  updateProduct(): void {

    console.log('update');

    this.setRecentSelectedFormData();
    this.productFormRequestFormat();
    this.productRequestObj.product_id = this.productId;
    this.productRequestObj.variant_code = this.variantCode;
    //this.productDetailRequestObj.variant_code = this.variantCode;
    // console.log(this.productCode)
    // console.log(this.productRequestObj, '_____________');

    if (this.radioBtnSelected !== 0) {
      // this.selectedComboProduct = [];
      // this.selectedProduct.forEach((element, index) => {
      //   this.selectedComboProduct.push({
      //     product_detail_id: element._id,
      //     quantity: element.quantity ? element.quantity : '1'
      //   })
      // })
    }
  //m this.loaderService.show('show');;
  console.log(this.productRequestObj,"request")
    this.commonService.putDataNew('product/updateProduct', this.productRequestObj).subscribe(response => {
      if (response) {
        this.sharedService.displaySuccessMessage('Product updated successfully');
        //m this.loaderService.show('hide');
        this.router.navigate(['product-management/products/list-products'])
      }
    }, err => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  productFormRequestFormat(): void {
    this.availableLang.forEach((element) => {
      // console.log(element);

      this.checkAndFetchProductVal('title', element);
      this.checkAndFetchProductVal('brand', element);
      // this.checkAndFetchProductVal('product_code', element);
      // this.productRequestObj[currentFieldVal][element.identity];
    // this.productRequestObj.product_code = this.productCode;

    });
    this.productRequestObj.variant_code = this.variantCode;
    if (this.selectedCategory.length > 0) {
      this.selectedCategory.forEach(ele => {
        this.productRequestObj['category'].push(ele.category_code);
      });
    }
  }
  // Varient create and update
  createUpdateProductDetails(): void {
    var objectdata:any={};
  //m this.loaderService.show('show');;
    const formData: FormData = new FormData();
    formData.append('product_id', this.productId);
    formData.append('actual_price', this.productPriceDetailForm.value.actualPrice);
    formData.append('extra_price', this.productPriceDetailForm.value.extraPrice);
    formData.append('discount_price', this.productPriceDetailForm.value.discountPrice);
    formData.append('mrp', this.productPriceDetailForm.value.mrp);
    formData.append('delivery_price', this.productPriceDetailForm.value.deliveryPrice);
    formData.append('type', JSON.stringify(this.radioBtnSelected));
    objectdata.product_id=this.productId;
    console.log(this.variantCode, "variant code")
    objectdata.product_code = Date.now();
    objectdata.variant_code = this.variantCode;
    objectdata.warehouse = this.selectWarehouseForProductDetails;
    //this.productDetailForm.controls.warehouse.setValue(this.selectWarehouseForProductDetails)
    objectdata.actual_price=this.productPriceDetailForm.value.actualPrice;
    objectdata.extra_price=this.productPriceDetailForm.value.extraPrice;
    objectdata.discount_price=this.productPriceDetailForm.value.discountPrice;
    objectdata.mrp=this.productPriceDetailForm.value.mrp;
    objectdata.delivery_price=this.productPriceDetailForm.value.deliveryPrice;
    objectdata.type=this.radioBtnSelected;

    let check = true;
    if (this.radioBtnSelected !== 0) {
      if (this.selectedProduct.length >= 1) {
        this.selectedComboProduct = [];
        this.selectedProduct.forEach((element, index) => {
          if (this.selectedProduct.length == 1) {
            element.quantity >= 2 ? true : check = false;;
          }
          this.selectedComboProduct.push({
            product_detail_id: element.id ? element.id : element.product_detail_id,
            quantity: element.quantity ? element.quantity : '1'
          })
        })
      } else {
        this.sharedService.displayErrorMessage('Select minimum 2 product for Combo Product');
      //m this.loaderService.show('hide');
        return
      }
      if (!check) {
        // console.log("not checked");
        this.sharedService.displayErrorMessage('Minimum 2 number of Products');
      //m this.loaderService.show('hide');
        return;
      }
      // console.log('after return..')
      // console.log(this.selectedComboProduct);
      // console.log(this.selectedProduct);
      formData.append('product_reference', JSON.stringify(this.selectedComboProduct));
      formData.append('combo_price', this.productDetailComboForm.value.comboPrice);
      objectdata.product_reference=this.selectedComboProduct;
      objectdata.combo_price=this.productDetailComboForm.value.comboPrice;
    }
    // if(this.productAgingForm.value){
    //   let newYear = new Date().getFullYear();
    //   let newMonth = new Date().getMonth();
    //   let newDay = new Date().getDate();
    //   if((Number(this.productAgingForm.value.year) < newYear) || (Number(this.productAgingForm.value.year) > 9999)){
    //     //m this.loaderService.show('hide');
    //     this.sharedService.displayErrorMessage('Please enter valid year');
    //     return;
    //   }
    //    if(Number(this.productAgingForm.value.month) > 12){
    //     //m this.loaderService.show('hide');
    //     this.sharedService.displayErrorMessage('Please enter valid month');
    //     return;
    //   }else if(Number(this.productAgingForm.value.day) > 31){
    //     //m this.loaderService.show('hide');
    //     this.sharedService.displayErrorMessage('Please enter valid date');
    //     return;
    //   }
    // }
    formData.append('tax_details', JSON.stringify(this.productTaxDetailForm.value.taxDataArray));
    objectdata.tax_details=this.productTaxDetailForm.value.taxDataArray;
    this.availableLang.forEach((element) => {
      this.checkAndFetchProductDetailVal('title', element);
      this.checkAndFetchProductDetailVal('description', element);
      this.checkAndFetchProductDetailVal('featuresDataArray', element);
      this.checkAndFetchProductDetailVal('specificationDataArray', element);
    });
    
    formData.append('product_ageing', JSON.stringify(this.productAgingForm.value));
    formData.append('description', JSON.stringify(this.productDetailRequestObj['description']));
    formData.append('title', JSON.stringify(this.productDetailRequestObj['title']));
    formData.append('features', JSON.stringify(this.productDetailRequestObj['featuresDataArray']));
    formData.append('specifications', JSON.stringify(this.productDetailRequestObj['specificationDataArray']));

    objectdata.product_ageing=this.productAgingForm.value
    objectdata.description=this.productDetailRequestObj['description'];
    objectdata.title=this.productDetailRequestObj['title'];
    objectdata.features=this.productDetailRequestObj['featuresDataArray'];
    objectdata.specifications=this.productDetailRequestObj['specificationDataArray'];
   
    if (this.varientAction.key === 'Create') {
      // if (this.storeImages.length) {
      //   this.storeImages.forEach((element) => {
      //     formData.append('images', element);
      //   });
      
      // }
      formData.append('images', JSON.stringify(this.displayImages));

      objectdata.images=this.displayImages;
      this.productDetailRequestObj = new RequestProductDetailCollections();
      const json = {}
      objectdata['warehouse_details'] = this.selectWarehouseForProductDetails
     // objectdata['product_detail_id'] = this.selectedVarient
      if (this.viewCreatedVarients.length < 1) {
        objectdata.is_default = true;
      }
      this.commonService.uploadImageNew('product/productDetails', objectdata).subscribe(response => {
        if (response.status = 200) {
          this.sharedService.displaySuccessMessage('Product details created successfully');
          
          this.clearVarients();
          this.updateViewVarientsForm();
          
        //m this.loaderService.show('hide');
          this.router.navigate(['product-management/products/list-products'])
        }
      }, err => {
        //m this.loaderService.show('hide');
        if(err.error.error === "Image is required"){
          this.sharedService.displayErrorMessage("Please upload image");
        }
        else if(err.error.message[0] === "variant_code must be unique"){
          this.sharedService.displayErrorMessage("Variant code should not be duplicate");
        }
        else{
          this.sharedService.displayErrorMessage("Something went wrong");
        }
      });
    } else if (this.varientAction.key === 'Update') {
      formData.append('images', JSON.stringify(this.displayImages));
      objectdata['images'] = this.displayImages
      formData.append('product_detail_id', this.selectedVarient);
      if (this.deletedFeatures.length > 0) {
        this.deletedFeatures.map(ele => {
          formData.append('deleted_features', JSON.stringify([ele]));
        });
      } else {
        formData.append('deleted_features', JSON.stringify([]));
      }
      objectdata['product_detail_id'] = this.selectedVarient
      objectdata['warehouse_details'] = this.selectWarehouseForProductDetails
      this.commonService.putDataNew('product/productDetails', objectdata).subscribe(res => {
        if (res.status = 200) {
          this.fetchVarientDetails();
          this.sharedService.displaySuccessMessage('Varient Details Updated Successfully');
        //m this.loaderService.show('hide');
          this.router.navigate(['product-management/products/list-products'])
        }
      }, err => {
      console.log(err)
      //m this.loaderService.show('hide');
        this.sharedService.displayErrorMessage('Something went wrong');
      });
    }
  }

  /** check product and product detail validation */
  checkAndFetchProductVal(currentFieldVal: string, element: any): void {

    if (this.productRequestObj[currentFieldVal]) {
      this.productRequestObj[currentFieldVal][element.identity] = this.storeProductData[element.identity].product[currentFieldVal];
    } else {
      this.productRequestObj[currentFieldVal] = {};
      this.productRequestObj[currentFieldVal][element.identity] = this.storeProductData[element.identity].product[currentFieldVal];
    }
  }
  
  checkAndFetchProductDetailVal(currentFieldVal: string, element: any): void {
    if (this.productDetailRequestObj[currentFieldVal]) {
      this.updateVarientFeatureName(currentFieldVal, element);
      this.productDetailRequestObj[currentFieldVal][element.identity] = this.storeProductData[element.identity].varients[currentFieldVal];
    } else {
      this.productDetailRequestObj[currentFieldVal] = {};
      this.updateVarientFeatureName(currentFieldVal, element);
      this.productDetailRequestObj[currentFieldVal][element.identity] = this.storeProductData[element.identity].varients[currentFieldVal];
    }
  }
  updateVarientFeatureName(currentFieldVal: string, element) {
    console.log('842',element);
    if (currentFieldVal === 'featuresDataArray') {
      this.storeProductData[element.identity].varients[currentFieldVal].map(ele => {
        console.log('844',ele);
        const name = ele.name ? ele.name.toLowerCase() : ''
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
      ele.name = name;
      return ele;
      });
    }
  }
  /* Product view form */
  updateViewVarientsForm(): void {
    this.selectedLang = 'en';
    this.storeProductData = {};
    this.availableLang = this.availableLang.filter((ele, index) => {
      ele.isCompleted = false;
      return this.availableLang;
    });
    this.productAction = new ProductDetailsAction(productDetailsActionCollections['edit-product']);
    this.radioActive = true;
    this.getEditProduct();
  }

  /* On lang btn click */
  langSelected(data: any): void {
    this.selectedFeatureOpt=[]
    this.selectedFeature=[]
    this.isLangSelected = false;
    this.specdatalength[this.selectedLang]=this.specificationValidationControl.controls.length
    this.specdata[this.selectedLang]=[]
    this.specificationValidationControl.controls.map((val)=>{
this.specdata[this.selectedLang].push(val.value)
    })
  
    // debugger;
    //this.generateSpecificationControlValue=this.specificationValidationControl
            
    if(this.isVariant){
      
      this.toCheckFormValidAndCompleted();
      this.setRecentSelectedFormData();
      this.retrieveProductData(data);
      this.selectedLang = data.identity;
      //this.fetchVarientDetails();
      //this.getSelectedCategoryField();
      console.log(this.selectWarehouseForProductDetails,"inside isVariant")
      //this.productForm.controls['brand'].setValue('');
      this.productDetailForm.controls['warehouse'].setValue(this.selectWarehouseForProductDetails)
      this.productDetailForm.controls['variant_code'].setValue(this.variantCode)
     
      /* if(this.storeProductData['hi'].product.brand !== ''){// || this.storeProductData['hi'].product.product_code !== ''){
       this.productForm.controls['brand'].setValue(this.storeProductData['hi'].product.brand);
       //this.productForm.controls['product_code'].setValue(this.storeProductData['hi'].product.product_code);
     }
     
     else{
       this.productForm.controls['brand'].setValue(this.storeProductData['en'].product.brand);
     //this.productForm.controls['product_code'].setValue(this.storeProductData['en'].product.product_code);
     }*/
     
      return;
    }
    
    this.toCheckFormValidAndCompleted();
    this.setRecentSelectedFormData();
   this.retrieveProductData(data); //retrieve product details back
    //console.log(this.selectWarehouseForProductDetails)
    //console.log(this.variantCode)
   
    this.categoryList = [];
    this.producReferencetList = [];
    this.selectedLang = data.identity;
    if(this.productAction.key ==='Create'){
      this.specificationValidationControl.clear()
      var mylang=this.selectedLang=='en'?'hi':'en';
      //console.log(this.specdatalength,mylang)
                for(let s=0;s<this.specdatalength[mylang];s++){
                  var t= (this.specdata[this.selectedLang][s]&&this.specdata[this.selectedLang][s]['title'])?this.specdata[this.selectedLang][s]['title'] : '';
                  var description= (this.specdata[this.selectedLang][s]&&this.specdata[this.selectedLang][s]['description'])?this.specdata[this.selectedLang][s]['description'] : '';
                // console.log(mylang,this.selectedLang,t,description)
                  this.specificationValidationControl.push(this.formBuilder.group({ title: [t,[Validators.required, Validators.pattern(/^\S/)]],description: [description,[Validators.required, Validators.pattern(/^\S/)]] })); 
                }
              }
    this.fetchVarientDetails();
    this.getSelectedFeatureField(data);
    this.getSelectedCategoryField();
    this.markAsTouched();
    this.markAsProductTypeTouched();
    console.log(this.storeProductData,'dfsdfsdsfsfd1')
    //this.setActionProductType();
    //this.productDetailForm.controls['warehouse'].setValue(null);
     this.productDetailForm.controls['warehouse'].setValue(this.selectWarehouseForProductDetails)
     this.productDetailForm.controls['variant_code'].setValue(this.variantCode)
    /*if(this.storeProductData['hi'].product.brand !== ''){// || this.storeProductData['hi'].product.product_code !== ''){
      this.productForm.controls['brand'].setValue(this.storeProductData['hi'].product.brand);
      //this.productForm.controls['product_code'].setValue(this.storeProductData['hi'].product.product_code);
    }
    else{
      this.productForm.controls['brand'].setValue(this.storeProductData['en'].product.brand);
    //this.productForm.controls['product_code'].setValue(this.storeProductData['en'].product.product_code);
    }*/
  }
  /*brandChanged(){
    if(this.storeProductData['en'].product.brand !== '' && this.storeProductData['en'].product.brand !== this.productForm.controls['brand'].value){
      this.storeProductData['hi'].product.brand=this.productForm.controls['brand'].value;
    }
  }*/
  /*productCodeChanged(){
    if(this.storeProductData['en'].product.product_code !== '' && this.storeProductData['en'].product.product_code !== this.productForm.controls['brand'].value){
      this.storeProductData['hi'].product.product_code=this.productForm.controls['product_code'].value;
    }
  }*/
  variantCodeChanged(){
   /* if(this.storeProductData['en'].productDetail.variant_code !== '' && this.storeProductData['en'].product.product_code !== this.productForm.controls['brand'].value){
      this.storeProductData['hi'].product.product_code=this.productForm.controls['product_code'].value;
    }*/
  }
  markAsTouched(): void {
    if (this.isproductDetailTouched) {
      Object.keys(this.productPriceDetailValidationControl).forEach(controlName => {
        this.productPriceDetailValidationControl[controlName].markAsTouched(),
          this.productPriceDetailValidationControl[controlName].markAsDirty();
      });
      Object.keys(this.productDetailsValidationControl).forEach(controlName => {
        this.productDetailsValidationControl[controlName].markAsTouched(),
          this.productDetailsValidationControl[controlName].markAsDirty();
      });
      (<FormArray>this.productDetailForm.get('specificationDataArray')).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
          control.markAsTouched();
          control.markAsDirty();
        });
      });
      (<FormArray>this.productDetailForm.get('featuresDataArray')).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
          control.markAsTouched();
          control.markAsDirty();
        });
      });
      (<FormArray>this.productTaxDetailForm.get('taxDataArray')).controls.forEach((group: FormGroup) => {
        (<any>Object).values(group.controls).forEach((control: FormControl) => {
          control.markAsTouched();
          control.markAsDirty();
        });
      });
      if (this.isProductTouched) {
        Object.keys(this.validationControl).forEach(controlName => {
          this.validationControl[controlName].markAsTouched(),
            this.validationControl[controlName].markAsDirty();
        });
      }
    }
  }
  markAsProductTypeTouched(): void {
    if (this.isproductDetailTouched && this.radioBtnSelected !== 0) {
      Object.keys(this.productComboFormValidationControl).forEach(controlName => {
        this.productComboFormValidationControl[controlName].markAsTouched(),
          this.productComboFormValidationControl[controlName].markAsDirty();
      });
    }
  }
  fetchVarientDetails(): void {
    if (this.productId) {
      
     //m this.loaderService.show('show');
      this.commonService.getDataNew('product/getsingleproductdetail/' + this.productId + '?lang=' + this.selectedLang+'&isVarient=false').subscribe(response => {
        //m this.loaderService.show('hide');
       
        if (response.success && response.payload.records && response.payload.records[0]) {
           this.displayVarientData(response.payload.records);
           var respdata;
           for(var x of response.payload.records){
             if(x['product_id'] === this.productId)
              respdata = x;
           }
         // =response.payload.records[index];
          var myarray=[];
          //this.selectWarehouseForProductDetails = null;
         // this.productDetailForm.controls.warehouse.setValue([])
          /*respdata.warehouse_details.forEach((opt, index) => {
              
            myarray.push(opt.warehouse_id)
        });
       
        //this.selectWarehouseForProductDetails=myarray;
        //this.productDetailForm.controls['variant_code'].setValue(respdata.variantCode)
        //this.productDetailForm.controls.warehouse.setValue(this.selectWarehouseForProductDetails)*/
        //this.productDetailForm.setControl('featuresDataArray', this.formBuilder.array([]));
           var i=0;
               respdata.features.sort(function(a, b){return b.updatedAt - a.updatedAt}).forEach((opt, index) => {
                 if(this.selectedLang == opt.language) {

          //      // this.featureValidationControl.push(this.formBuilder.group({ name: opt.name, feature_option: opt.product_feature.feature_option, _id: opt.id,feature_id:opt.feature_id }));
                 this.selectedFeature[i] = opt.name;
                 this.selectedFeatureOpt[i] = opt.product_feature.feature_option;
                 i++;
               }
             });
            
              this.productDetailForm.setControl('specificationDataArray', this.formBuilder.array([]));
              var i=0;
              
              if(this.specdata[this.selectedLang].length ==0){
              respdata.specifications.forEach((opt,index) => {
                if(this.selectedLang == opt.language) {
                if(!this.specdel.includes(index)){
                  console.log("LOGGER",opt.description)
                 this.specificationValidationControl.push(this.formBuilder.group({ title: [opt.title,[Validators.required, Validators.pattern(/^\S/)]], 
                                                                                  description: [opt.description,[Validators.required, Validators.pattern(/^\S/)]] }));
               this.storeProductData[opt.language].varients = new EditVarientDetails(respdata); 
               i++;
                 }
              }});
             
            }
            //console.log(this.specdata,'fsdfsdfdsfdsfdsfds',i)
           // console.log(this.specificationValidationControl.controls)
             var mylang=this.selectedLang=='en'?'hi':'en';
              for(let s=i;s<this.specdatalength[mylang];s++){
                var t= (this.specdata[this.selectedLang][s]&&this.specdata[this.selectedLang][s]['title'])?this.specdata[this.selectedLang][s]['title'] : '';
                var description= (this.specdata[this.selectedLang][s]&&this.specdata[this.selectedLang][s]['description'])?this.specdata[this.selectedLang][s]['description'] : '';
               // console.log(s,t)
                this.specificationValidationControl.push(this.formBuilder.group({ title: [t,[Validators.required, Validators.pattern(/^\S/)]],description: [description,[Validators.required, Validators.pattern(/^\S/)]] })); 
              }
              this.specdel.map((i)=>{
                //this.specdata[mylang][i]['title']=''
                 //this.specdata[mylang][i]['description']=''
                 this.specificationValidationControl.removeAt(i);
               })
               this.delspec=this.specdel;
               this.specdel=[]
               
             
              console.log(this.specificationValidationControl)
              this.productDetailComboForm.get('productReference').patchValue(this.selectedProduct);
              if(respdata.product_detail_translations && respdata.product_detail_translations.length >0) {
                respdata.product_detail_translations.map(val=>{
                this.storeProductData[val.language].varients = new EditVarientDetails(respdata);
                 this.productDetailForm.patchValue(this.storeProductData[val.language].varients)
                 this.productDetailForm.controls['title'].patchValue(val.title);
                 this.productDetailForm.controls['description'].patchValue(val.description);
              })
              }
              
              
        //m this.loaderService.show('hide');
        }
      }, err => {
        this.sharedService.displayErrorMessage(err.statusText);
      });
    }
  }
  displayVarientData(productDetail): void {
    this.viewCreatedVarients = productDetail;
  }
  toCheckFormValidAndCompleted(): void {
    let isValidForm = false;
    const isValidProductForm = this.productForm.valid && this.productDetailForm.valid && this.productPriceDetailForm.valid && this.productTaxDetailForm.valid;
    if (this.radioBtnSelected === 0) {
      isValidForm = isValidProductForm;
    } else {
      isValidForm = isValidProductForm && this.productDetailComboForm.valid;
    }
    this.availableLang.filter(ele => {
      if (ele.identity === this.selectedLang) {
        if (isValidForm) {
          return ele.isCompleted = true;
        } else {
          return ele.isCompleted = false;
        }
      }
    });
  }
  setRecentSelectedFormData(): void {
    this.storeProductData[this.selectedLang] = new ProductInfo(this.productForm.value, this.productDetailForm.value, this.selectedLang);
    console.log("1043",this.storeProductData[this.selectedLang])
  }

  checkProduct(data) {
    // console.log(this.storeProductData,this.productCode,this.productAction.key,this.isEdit);
    if(this.productAction.key == 'View'){
      //this.productRequestObj.product_code = this.storeProductData['en'].product.product_code;
      //this.productForm.get('product_code').setValue(this.storeProductData['en'].product.product_code);
    }
    if (this.isEdit) {
      if (data.identity == 'en' && this.storeProductData['hi']) {
        // console.log(this.storeProductData[data.identity], this.storeProductData['hi'])
        //this.storeProductData[data.identity].product['product_code'] = this.storeProductData['hi'].product.product_code;
        //this.productForm.get('product_code').setValue(this.storeProductData['hi'].product.product_code)
      } else if (data.identity == 'hi' && this.storeProductData['en']) {
        //this.storeProductData[data.identity].product['product_code'] = this.storeProductData['en'].product.product_code;
        //this.productForm.get('product_code').setValue(this.storeProductData['en'].product.product_code)
      }
    }
    else if (this.storeProductData['hi'] && this.storeProductData['en']) {
      // console.log("came")
      this.isEdit = true;
    }

  }
  retrieveProductData(data): void {
    console.log(this.selectWarehouseForProductDetails)
    //this.productForm.reset();
    //this.productDetailForm.reset();
    if (this.storeProductData[data.identity]) {   
      console.log(this.storeProductData[data.identity],"IDENTITY")
      this.productForm.patchValue(new ProductCollections(this.storeProductData[data.identity].product));
      if (this.storeProductData[data.identity].varients) {
        // this.storeProductData[data.identity].varients.warehouse = this.warehouseList.filter((e)=>((this.storeProductData[data.identity].varients['warehouse']).indexOf(e.id)!=-1))
        console.log(this.storeProductData[data.identity].varients);
        let varientDetails = new VarientsCollections(this.storeProductData[data.identity].varients)
        console.log("VARIENT DETAILS",varientDetails)
        this.productDetailForm.patchValue(varientDetails);
        // this.productDetailForm.controls.warehouse.setValue(this.selectWarehouseForProductDetails)
      }
    }
    this.checkProduct(data);
    // this.productForm.get('product_code').setValue(this.productCode);
    // Object.keys(this.validationControl).forEach(controlName => { this.validationControl[controlName].markAsTouched(), this.validationControl[controlName].markAsDirty() });
    // Object.keys(this.productPriceDetailValidationControl).forEach(controlName => {
    //   this.productPriceDetailValidationControl[controlName].markAsTouched(),
    //     this.productPriceDetailValidationControl[controlName].markAsDirty();
    // });
  }
  /* Edit Product Form Details */
  onEditVarientDetail(id, isEdit?: string,isVarient=false): void {
    this.isExistingVarient = true;
    this.setVarientKey(this.isExistingVarient);
  // //m this.loaderService.show('show');;
    // console.log(this.varientAction)
    this.clearVarients();
    // this.getProductReferenceList({term:''});
    // this.varientAction = new ProductDetailsAction(productDetailsActionCollections['edit-product']);
    this.selectedVarient = id;
    console.log(id,"id",this.productId);
    //this.commonService.getDataNew('product/getsingleproductdetail/'+ id + '?lang=' + this.selectedLang + '&isVarient='+isVarient).subscribe(response => {
      this.commonService.getDataNew('product/getsingleproductdetail/'+ id + '?lang=' + this.selectedLang).subscribe(response => {  
      if (response.status = 200) {
        if(response.payload && response.payload.records && response.payload.records[0]){
          if(!isVarient){
            console.log(response.payload.records)
            let product_detail_count=response.payload.records;
            product_detail_count.map((val)=>{
                if(val.product_stocks_counts && val.product_stocks_counts[0])
                {
                  this.product_stock_count=val.product_stocks_counts[0].max_stock_count;
                }
            })
            
            this.displayVarientData(response.payload.records);

          }
          const respdata=response.payload.records[0];
          var myarray=[];
          respdata.warehouse_details.forEach((opt, index) => {
              
            myarray.push(opt.warehouse_id)
        });
       
        this.selectWarehouseForProductDetails=myarray;
          this.productDetailForm.setControl('featuresDataArray', this.formBuilder.array([]));
        var i=0;
            respdata.features.forEach((opt, index) => {
            console.log(opt.language,"LANGUAGE", this.selectedLang)
              if(this.selectedLang == opt.language) {

              this.featureValidationControl.push(this.formBuilder.group({ name: opt.name, feature_option: opt.product_feature.feature_option, _id: opt.id,feature_id:opt.feature_id }));
              this.selectedFeature[i] = opt.name;
              this.selectedFeatureOpt[i] = opt.product_feature.feature_option;
              i++;
            }
          });
        this.deletedFeatures = [];
        this.productId = respdata.product_id;
        this.selectedVarient = respdata.id
        respdata.warehouse_details = (respdata.warehouse_details).map((e)=>(e.warehouse_id))
        console.log(respdata);
        this.varientActionDisplay = new ViewVarientsInfo(respdata);
        console.log(this.varientActionDisplay)
        this.productDetailForm.controls['warehouse'].setValue(this.varientActionDisplay.warehouse)
        this.productDetailForm.controls['variant_code'].setValue(this.varientActionDisplay.variantCode)
        this.displayImages = respdata.images;
        this.storeImages = respdata.images;
        this.productTaxDetailForm.setControl('taxDataArray', this.formBuilder.array([]));
        respdata.tax_details.forEach(opt => {
          this.taxValidationControl.push(this.formBuilder.group({ name: [opt.name, [Validators.required, Validators.pattern(/^\S/)]], 
                                                                  percent: [opt.percent,[Validators.required, Validators.pattern(/^\S/)]] }));
          //this.taxValidationControl.push(this.formBuilder.group({ name: opt.name, percent: opt.percent }));
        });
        this.productPriceDetailForm.patchValue({
          actualPrice: respdata.actual_price,
          deliveryPrice: respdata.delivery_price,
          extraPrice: respdata.extra_price,
          mrp: respdata.mrp,
          discountPrice: respdata.discount_price
        })
        this.productAgingForm.patchValue({
          year: response.payload.product_ageing ? response.payload.product_ageing.year : "",
          month: response.payload.product_ageing ? response.payload.product_ageing.month : "",
          day: response.payload.product_ageing ? response.payload.product_ageing.day : "",
        });
        this.radioBtnSelected = respdata.type;
        if (respdata.type !== 0) {
          this.productDetailComboForm.patchValue({
            comboPrice: respdata.combo_price
          });
        }
        if (response.payload.product_ageing) {
          this.productAgingForm.patchValue({
            year: response.payload.product_ageing.year,
            month: response.payload.product_ageing.month,
            day:response.payload.product_ageing.day,
          });
        }
        if (respdata.comboDetail && respdata.comboDetail.length > 0) {
          // response.payload.product_reference.forEach(opt => {
          //   this.selectedComboProduct.push(opt._id);
          // });
          this.selectedProduct = [];
          respdata.comboDetail.forEach((opt, i) => {
            let testObj: any = []
            this.producReferencetList.forEach(item => {
              // console.log(item._id, opt.productReference._id)
              if (opt.product_reference.id == item.id) {
                testObj.push(item);
              }
            })
            // console.log(testObj);
            // this.changeProductReferenceList(testObj);
            if (opt.product_reference) {
              this.titleset.push(opt.product_reference.title);
            }
            this.selectedComboProduct.push(opt.id);
            this.selectedProduct.push({
              title: opt.referenceProduct ? opt.referenceProduct.title : '',
              product_detail_id: opt.referenceProduct ? opt.referenceProduct.id : '',
              quantity: opt.quantity ? opt.quantity : '1'
            })
            this.changeProductReferenceList(this.selectedProduct);
            // this.changeQantity({ target: { value: opt.quantity } }, i)
            // console.log(this.selectedProduct, 'combo product')
          });
        }
        this.availableLang.filter(ele => {
          ele.isCompleted = true;
          if (!this.storeProductData[ele.identity]) {
            this.storeProductData[ele.identity] = {};
          }
        });
        
            this.storeProductData['en'].varients = new EditVarientDetails(respdata);
            
            this.productDetailForm.patchValue(new EditVarientDetails(respdata));
              if(respdata.product_detail_translations && respdata.product_detail_translations.length >0) {
                respdata.product_detail_translations.map(val=>{
                this.storeProductData[val.language].varients = new EditVarientDetails(val);
              })
              }
              //this.productDetailForm.patchValue(new EditVarientDetails(respdata.product_detail_translations[0]));
              /*this.productDetailForm.setControl('featuresDataArray', this.formBuilder.array([]));
              respdata.features.forEach((opt, index) => {
                console.log('oneonedata','ffff',respdata.features);
                if(this.selectedLang == opt.language) {
                  this.featureValidationControl.push(this.formBuilder.group({ name: [opt.name,[Validators.required,Validators.pattern(/^\S/)]],
                                                                             feature_option: [opt.product_feature.feature_option,[Validators.required, Validators.pattern(/^\S/)]],
                                                                             _id: opt.id, feature_id : opt.feature_id }));
                  //this.featureValidationControl.push(this.formBuilder.group({ name: opt.name, feature_option: opt.product_feature.feature_option, _id: opt.id, feature_id : opt.feature_id }));
                this.selectedFeature[index] = opt.name;
                this.selectedFeatureOpt[index] = opt.product_feature.feature_option;
              }});
              this.productDetailForm.setControl('specificationDataArray', this.formBuilder.array([]));
              var i=0;
              respdata.specifications.forEach(opt => {
                if(this.selectedLang == opt.language) {
                 // console.log("LOGGER",opt.description)
                  this.specificationValidationControl.push(this.formBuilder.group({ title: [opt.title,[Validators.required, Validators.pattern(/^\S/)]], 
                                                                                   description: [opt.description,[Validators.required, Validators.pattern(/^\S/)]] }));
                //this.specificationValidationControl.push(this.formBuilder.group({ title: opt.title, description: opt.description }));
                //this.productDetailForm.controls['specificationDataArray'].get('title').setValue(opt.title);
               // i++;
              }});*/
              this.productDetailComboForm.get('productReference').patchValue(this.selectedProduct);
      
        if (isEdit) {
          this.getEditProduct();
        }
      }
    //m this.loaderService.show('hide');
      }
    }, (err) => {
    //m this.loaderService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }


  /**
   * @method  updateDefaultDialogBox()
   * @description - the following updateDefaultDialogBox() method is used to open dialog box  for default confirmation.
   * @author amitha.shetty
   */
  updateDefaultDialogBox(event: MouseEvent): void {
    if (this.productAction.key === 'View') {
      event.preventDefault();
      return;
    }
    const checkFormCompletion = this.availableLang.filter(ele => {
      return !ele.isCompleted;
    });
     console.log(checkFormCompletion)
    if (checkFormCompletion.length > 0) {
       event.preventDefault();
       return; 
    }
    if (!this.varientActionDisplay.is_disabled) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: { message: `Are you Sure to make to make ${this.varientActionDisplay.title} as default product` },
        panelClass: 'confirmation-dialog',
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.updateVarientDetail('defaultVarient', this.varientActionDisplay);
        } else {
          this.varientActionDisplay.is_default = false;
        }
      });
    } else {
      this.cdRef.detectChanges();
      this.varientActionDisplay.is_default = false;
      this.sharedService.displayErrorMessage(`Can't default the disable product`);
    }
  }
  disableProduct(event: MouseEvent, data: string): void {
    event.preventDefault();
    let type = 'disable';
    if (this.productRequestObj.is_disabled) {
      type = 'enable';
    }
    if (this.productAction.key === 'Create') {
        return;
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: `Are You Sure You Want to ${type}`, userName: data },
      panelClass: 'confirmation-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let updateObj = {
          "product_id": this.productId,
          is_disabled: !this.productRequestObj.is_disabled
        }
        this.productRequestObj.is_disabled = !this.productRequestObj.is_disabled;
        this.commonService.putDataNew('product/changeStatus', updateObj).subscribe(response => {
          if (response.success) {
            this.sharedService.displaySuccessMessage('Updated successfully');
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
        this.router.navigate(['product-management/products']);
      }

    });
  }
  disableVarient(event: MouseEvent): void {
    if (this.productAction.key === 'View') {
      event.preventDefault();
      return;
    }
    const checkFormCompletion = this.availableLang.filter(ele => {
      return !ele.isCompleted;
    });
     console.log(checkFormCompletion)
    if (checkFormCompletion.length > 0) {
       event.preventDefault();
         return; 
    }
    event.preventDefault();
    if (this.viewCreatedVarients.length === 1) {
      this.sharedService.displayErrorMessage(`Can't disable with only one varient, Instead disable product itself`);
    } else {
      if (!this.varientActionDisplay.is_default) {
        let type = 'disable';
        if (this.varientActionDisplay.is_disabled) {
          type = 'enable';
        }
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '250px',
          data: { message: `Are You Sure You Want to ${type} Varient`, userName: this.varientActionDisplay.title },
          panelClass: 'confirmation-dialog',
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.varientActionDisplay.is_disabled = !this.varientActionDisplay.is_disabled;
            this.updateVarientDetail('disableVarient', this.varientActionDisplay);
          }
        });
      } else {
        this.sharedService.displayErrorMessage(`Can't disable the default product`);
      }
    }
  }
  deleteVarient(): void {
    if (this.productAction.key === 'View' || this.productAction.key === 'Create') {
      return;
    }
   
    if (this.viewCreatedVarients.length === 1) {
      this.sharedService.displayErrorMessage(`Can't delete with only one varient, Instead delete product itself`);
    } else {
      if (!this.varientActionDisplay.is_default) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '250px',
          data: { message: `Are You Sure You Want to delete Varient`, userName: this.varientActionDisplay.title },
          panelClass: 'confirmation-dialog',
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.commonService.deleteDataNew(`product/changeProductdetail?product_detail_id=${this.varientActionDisplay._id}`).subscribe(response => {
              if (response.status = 200) {
                this.sharedService.displaySuccessMessage('Deleted Successfully');
                //this.fetchVarientDetails();
                const urlSegmet = this.sharedService.urlSegmentKeys();
                 this.onEditVarientDetail(urlSegmet[urlSegmet.length - 1].path, 'edit');
              }
            }, err => {
              this.sharedService.displayErrorMessage(err.statusText);
            });
          }
        });
      } else {
        this.sharedService.displayErrorMessage(`Can't delete the default product`);
      }
    }
  }
  deleteProduct(data): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: `Are You Sure You Want to delete`, userName: data },
      panelClass: 'confirmation-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.deleteDataNew(`product/deleteproduct/${this.productId}`).subscribe(response => {
          if (response.status = 200) {
            this.sharedService.displaySuccessMessage('Product Deleted Successfully');
            this.router.navigate(['product-management/products']);
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
  updateVarientDetail(type: string, data: any): void {
    const formData: FormData = new FormData();
   
    formData.append('product_id', data.product_id);
    formData.append('product_detail_id', data._id);
    formData.append('update_images', JSON.stringify(data.images));
    formData.append('type', JSON.stringify(data.type));
    let spread={};
    if (type === 'defaultVarient') {
       spread={is_default:true}
      
    } else if (type === 'disableVarient') {
      spread={is_disabled:data.is_disabled}
      
    }
    const object={product_id:data.product_id,product_detail_id:data._id,type:JSON.stringify(data.type),...spread}
    this.commonService.updateImageNew('product/changeProductdetail', object).subscribe(res => {
      if (res.status = 200) {
        this.sharedService.displaySuccessMessage(`Updated Successfully`);
        this.fetchVarientDetails();
        this.router.navigate(['product-management/products/list-products'])
      }
    }, err => {
      this.sharedService.displayErrorMessage('Something went wrong');
    });
  }
  // type
  radioChange(event) {
    this.radioBtnSelected = event.value;
    this.toCheckFormValidAndCompleted();
    this.markAsProductTypeTouched();
  }
  getProductReferenceList(event) {
    this.producReferencetList = [];
    if (event.term) {
      if (this.selectedLang === 'en') {
        this.commonService.getDataNew(`product/webproductDetails?search_text=${event.term}&type=0&is_disabled=false`).subscribe(response => {
          if (response.status = 200) {
            this.producReferencetList=[];
            response.payload.records.forEach(ele=>{
              if(!ele.is_disabled){
                this.producReferencetList.push(ele)
              }
            })
            this.producReferencetList = response.payload.records;
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      } else {
        this.commonService.getDataNew(`product/webproductDetails?search_text=${event.term}&type=0&is_disabled=false&lang=hi`).subscribe(response => {
           if (response.status = 200) {
              this.producReferencetList=[];
                 response.payload.records.forEach(ele=>{
                    if(!ele.is_disabled){
                        this.producReferencetList.push(ele)
                    }
                 })
               this.producReferencetList = response.payload.records;
            }
          }, err => {
              this.sharedService.displayErrorMessage(err.statusText);
          });
      }
    }
  }
  setActionProductType() {
    if (this.radioBtnSelected !== 0 && this.selectedComboProduct.length > 0) {
      if (this.selectedLang === 'en') {
        const productReferenceEnData = [];
        this.selectedComboProduct.map(ele => {
          this.commonService.getDataNew(`product/getsingleproductdetail/${ele}`).subscribe(response => {
            if (response) {
              productReferenceEnData.push(response.payload.records[0]);
              this.productDetailComboForm.patchValue({
                productReference: productReferenceEnData
              });
            }
          }, err => {
            if (err === 'Cannot read property type of undefined') {
              this.sharedService.displayErrorMessage(`Product Detail with this name in hindi doesn't exist in english`);
            }
          });
        });
      } else {
        const productReferenceEnData = [];
        this.selectedComboProduct.map(ele => {
          this.commonService.getDataNew(`product/getsingleproductdetail/${ele}`).subscribe(response => {
            if (response) {
              productReferenceEnData.push(response.payload.records[0].product_detail_translations[0]);
              this.productDetailComboForm.patchValue({
                productReference: productReferenceEnData
              });
            }
          }, err => {
            if (err === 'Cannot read property type of undefined') {
              this.sharedService.displayErrorMessage(`Product Detail with this name in hindi doesn't exist in english`);
            }
          });
        });
      }
    } else {
      this.productDetailComboForm.patchValue({
        productReference: []
      });
    }
  }
  addEditSpare(data?: any) {
    const dialogRef = this.dialog.open(AddSpareComponent, {
      panelClass: 'add-spare-style',
      data: {
        productId: this.varientActionDisplay.product_id,
        productDetailId: this.varientActionDisplay._id,
        spareId: data ? data.spareId : ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getSpareParts();
      }
    });
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.matTabIndex = tabChangeEvent.index;
    if (this.matTabIndex === 1) {
      this.getSpareParts();
    }
  }
  getSpareParts(isSearch?: boolean): void {
    if (!isSearch) {
      this.searchTextSpare = '';
    }
    const requestSet = `?records_per_page=${this.sparePageInfo.recordsPerPage}&page_number=${this.sparePageInfo.currentPage}&product_id=${this.varientActionDisplay.product_id}&product_detail_id=${this.varientActionDisplay._id}&search_text=${this.searchTextSpare}`;
    this.commonService.getData('admin/productSpare' + requestSet).subscribe(response => {
      if (response.success) {
        this.viewSpareParts = new GeTSpareList(response.payload);
      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  /**
   * @method  getPage()
   * @description - the following getPage() method is used get the selected page for pagination
   * @param event - contains the selected page number
   * @author karan
   */
  getPage(event: number): void {
    if (event > 0 && event <= this.viewSpareParts.totalRecords) {
      this.sparePageInfo.currentPage = event;
      this.getSpareParts(true);
    }
  }
  searchSpare() {
    this.sparePageInfo.currentPage = 1;
    this.getSpareParts(true);
  }
  deleteSpareProduct(data): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: `Are You Sure You Want to delete`, userName: data.name },
      panelClass: 'confirmation-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.deleteData(`admin/productSpare?product_spare_id=${data.spareId}`).subscribe(response => {
          if (response.status = 200) {
            this.sharedService.displaySuccessMessage('Spare Deleted Successfully');
            this.getSpareParts();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }

  setVarientKey(existingvalue)
  {
    if(existingvalue == true)
    {
      this.varientAction.key = 'Update';
    }
    else
    {
      this.varientAction.key = 'Create';
    }
  }

  cancel()
  {
   this.setProductAction();
  }

  ngOnDestroy() {
    this.cdRef.detach();
  }
}



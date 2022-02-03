import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/utils';
import { SharedService } from 'src/app/utils';
import { LoaderService } from 'src/app/utils';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateProductComponent } from './create-product.component';
import { of } from 'rxjs/internal/observable/of';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let records: {test
  }

  beforeEach(() => {
    const changeDetectorRefStub = () => ({
      detectChanges: () => ({}),
      detach: () => ({})
    });
    const formBuilderStub = () => ({
      group: object => ({}),
      array: array => ({})
    });
    const commonServiceStub = () => ({
      getDataModified: arg => ({ subscribe: f => f({}) }),
      getDataNew: arg => ({ subscribe: f => f({}) }),
      fileupload: (string, formData) => ({ subscribe: f => f({}) }),
      updateImage: (string, formData) => ({ subscribe: f => f({}) }),
      postDataNew: (string, productRequestObj) => ({ subscribe: f => f({}) }),
      putDataNew: (string, productRequestObj) => ({ subscribe: f => f({}) }),
      uploadImageNew: (string, objectdata) => ({ subscribe: f => f({}) }),
      deleteDataNew: arg => ({ subscribe: f => f({}) }),
      updateImageNew: (string, object) => ({ subscribe: f => f({}) }),
      getData: arg => ({ subscribe: f => f({}) }),
      deleteData: arg => ({ subscribe: f => f({}) })
    });
    const sharedServiceStub = () => ({
      displayErrorMessage: string => ({}),
      getListLang: () => ({ then: () => ({}) }),
      urlSegmentKeys: () => ({ path: {}, length: {} }),
      setJsonResponse: (string, selectedLang) => ({ then: () => ({}) }),
      displaySuccessMessage: string => ({})
    });
    const loaderServiceStub = () => ({});
    const matDialogStub = () => ({
      open: (confirmationDialogComponent, object) => ({
        afterClosed: () => ({ subscribe: f => f({}) })
      })
    });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule,
        ReactiveFormsModule ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateProductComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: CommonService, useFactory: commonServiceStub, useValue: {records, getDataModified : ()=> of({})  } },
        { provide: SharedService, useFactory: sharedServiceStub },
        { provide: LoaderService, useFactory: loaderServiceStub },
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`matTabIndex has default value`, () => {
    expect(component.matTabIndex).toEqual(0);
  });

  it(`availableLang has default value`, () => {
    expect(component.availableLang).toEqual([]);
  });

  it(`selectedLang has default value`, () => {
    expect(component.selectedLang).toEqual(`en`);
  });

  it(`categoryList has default value`, () => {
    expect(component.categoryList).toEqual([]);
  });

  it(`producReferencetList has default value`, () => {
    expect(component.producReferencetList).toEqual([]);
  });

  it(`fearturesList has default value`, () => {
    expect(component.fearturesList).toEqual([]);
  });

  it(`displayImages has default value`, () => {
    expect(component.displayImages).toEqual([``, ``, ``, ``, ``]);
  });

  it(`storeImages has default value`, () => {
    expect(component.storeImages).toEqual([]);
  });

  it(`viewCreatedVarients has default value`, () => {
    expect(component.viewCreatedVarients).toEqual([]);
  });

  it(`isExistingVarient has default value`, () => {
    expect(component.isExistingVarient).toEqual(true);
  });

  it(`selectedCategory has default value`, () => {
    expect(component.selectedCategory).toEqual([]);
  });

  it(`selectedFeature has default value`, () => {
    expect(component.selectedFeature).toEqual([]);
  });

  it(`selectedComboProduct has default value`, () => {
    expect(component.selectedComboProduct).toEqual([]);
  });

  it(`selectedFeatureOpt has default value`, () => {
    expect(component.selectedFeatureOpt).toEqual([]);
  });

  it(`categoryLang has default value`, () => {
    expect(component.categoryLang).toEqual([]);
  });

  it(`deletedFeatures has default value`, () => {
    expect(component.deletedFeatures).toEqual([]);
  });

  it(`radioBtnSelected has default value`, () => {
    expect(component.radioBtnSelected).toEqual(0);
  });

  it(`isVarientChecked has default value`, () => {
    expect(component.isVarientChecked).toEqual(false);
  });

  it(`isproductDetailTouched has default value`, () => {
    expect(component.isproductDetailTouched).toEqual(false);
  });

  it(`isProductTouched has default value`, () => {
    expect(component.isProductTouched).toEqual(false);
  });

  it(`isValueCheck has default value`, () => {
    expect(component.isValueCheck).toEqual(true);
  });

  it(`range has default value`, () => {
    expect(component.range).toEqual([0, 1, 2, 3, 4]);
  });

  it(`isEdit has default value`, () => {
    expect(component.isEdit).toEqual(false);
  });

  it(`isView has default value`, () => {
    expect(component.isView).toEqual(false);
  });

  it(`selectedProduct has default value`, () => {
    expect(component.selectedProduct).toEqual([]);
  });

  it(`warehouseList has default value`, () => {
    expect(component.warehouseList).toEqual([]);
  });

  it(`selectWarehouseForProductDetails has default value`, () => {
    expect(component.selectWarehouseForProductDetails).toEqual([]);
  });

  it(`selectedWarehouse has default value`, () => {
    expect(component.selectedWarehouse).toEqual([]);
  });

  it(`titleset has default value`, () => {
    expect(component.titleset).toEqual([]);
  });

  it(`comboObject has default value`, () => {
    expect(component.comboObject).toEqual([]);
  });

  it(`quantity has default value`, () => {
    expect(component.quantity).toEqual([]);
  });

  it(`radioActive has default value`, () => {
    expect(component.radioActive).toEqual(false);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getBranchList').and.callThrough();
  //     spyOn(component, 'getLangList').and.callThrough();
  //     spyOn(component, 'createProductForm').and.callThrough();
  //     spyOn(component, 'createProductDetailForm').and.callThrough();
  //     spyOn(component, 'createProductPriceDetailForm').and.callThrough();
  //     spyOn(component, 'createProductTaxDetailForm').and.callThrough();
  //     spyOn(component, 'createProductComboForm').and.callThrough();
  //     spyOn(component, 'createProductAgingForm').and.callThrough();
  //     spyOn(component, 'setProductAction').and.callThrough();
  //     spyOn(component, 'setRecentSelectedFormData').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.getBranchList).toHaveBeenCalled();
  //     expect(component.getLangList).toHaveBeenCalled();
  //     expect(component.createProductForm).toHaveBeenCalled();
  //     expect(component.createProductDetailForm).toHaveBeenCalled();
  //     expect(component.createProductPriceDetailForm).toHaveBeenCalled();
  //     expect(component.createProductTaxDetailForm).toHaveBeenCalled();
  //     expect(component.createProductComboForm).toHaveBeenCalled();
  //     expect(component.createProductAgingForm).toHaveBeenCalled();
  //     expect(component.setProductAction).toHaveBeenCalled();
  //     expect(component.setRecentSelectedFormData).toHaveBeenCalled();
  //   });
  // });

  describe('createProductForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createProductForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('createProductDetailForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(component, 'createSpecification').and.callThrough();
      spyOn(component, 'createFeatures').and.callThrough();
      spyOn(formBuilderStub, 'group').and.callThrough();
      spyOn(formBuilderStub, 'array').and.callThrough();
      component.createProductDetailForm();
      expect(component.createSpecification).toHaveBeenCalled();
      expect(component.createFeatures).toHaveBeenCalled();
      expect(formBuilderStub.group).toHaveBeenCalled();
      expect(formBuilderStub.array).toHaveBeenCalled();
    });
  });

  describe('createProductAgingForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createProductAgingForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('createProductPriceDetailForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createProductPriceDetailForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('createProductTaxDetailForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(component, 'createTaxDetails').and.callThrough();
      spyOn(formBuilderStub, 'group').and.callThrough();
      spyOn(formBuilderStub, 'array').and.callThrough();
      component.createProductTaxDetailForm();
      expect(component.createTaxDetails).toHaveBeenCalled();
      expect(formBuilderStub.group).toHaveBeenCalled();
      expect(formBuilderStub.array).toHaveBeenCalled();
    });
  });

  describe('createProductComboForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createProductComboForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('createSpecification', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createSpecification();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('createFeatures', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createFeatures();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('createTaxDetails', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.createTaxDetails();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('getLangList', () => {
    it('makes expected calls', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      spyOn(sharedServiceStub, 'getListLang').and.callThrough();
      component.getLangList();
      expect(sharedServiceStub.getListLang).toHaveBeenCalled();
    });
  });

  // describe('setProductAction', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'updateViewVarientsForm').and.callThrough();
  //     spyOn(component, 'onEditVarientDetail').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     component.setProductAction();
  //     expect(component.updateViewVarientsForm).toHaveBeenCalled();
  //     expect(component.onEditVarientDetail).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //   });
  // }); 

  // describe('clearVarients', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'createProductDetailForm').and.callThrough();
  //     component.clearVarients();
  //     expect(component.createProductDetailForm).toHaveBeenCalled();
  //   });
  // });

  // describe('getEditProduct', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'fetchVarientDetails').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(component, 'getEditProduct').and.callThrough();
  //     component.getEditProduct();
  //     expect(component.fetchVarientDetails).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('addNewVarient', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'clearVarients').and.callThrough();
  //     spyOn(component, 'createProductDetailForm').and.callThrough();
  //     spyOn(component, 'createProductPriceDetailForm').and.callThrough();
  //     spyOn(component, 'createProductTaxDetailForm').and.callThrough();
  //     spyOn(component, 'createProductComboForm').and.callThrough();
  //     spyOn(component, 'createProductAgingForm').and.callThrough();
  //     spyOn(component, 'setRecentSelectedFormData').and.callThrough();
  //     component.addNewVarient();
  //     expect(component.clearVarients).toHaveBeenCalled();
  //     expect(component.createProductDetailForm).toHaveBeenCalled();
  //     expect(component.createProductPriceDetailForm).toHaveBeenCalled();
  //     expect(component.createProductTaxDetailForm).toHaveBeenCalled();
  //     expect(component.createProductComboForm).toHaveBeenCalled();
  //     expect(component.createProductAgingForm).toHaveBeenCalled();
  //     expect(component.setRecentSelectedFormData).toHaveBeenCalled();
  //   });
  // });

  // describe('addVarients', () => {
  //   it('makes expected calls', () => {
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'toCheckFormValidAndCompleted').and.callThrough();
  //     spyOn(component, 'setRecentSelectedFormData').and.callThrough();
  //     spyOn(component, 'markAsTouched').and.callThrough();
  //     spyOn(component, 'markAsProductTypeTouched').and.callThrough();
  //     spyOn(component, 'createProduct').and.callThrough();
  //     spyOn(component, 'createUpdateProductDetails').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.addVarients();
  //     expect(component.toCheckFormValidAndCompleted).toHaveBeenCalled();
  //     expect(component.setRecentSelectedFormData).toHaveBeenCalled();
  //     expect(component.markAsTouched).toHaveBeenCalled();
  //     expect(component.markAsProductTypeTouched).toHaveBeenCalled();
  //     expect(component.createProduct).toHaveBeenCalled();
  //     expect(component.createUpdateProductDetails).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('createProduct', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'productFormRequestFormat').and.callThrough();
  //     spyOn(component, 'createUpdateProductDetails').and.callThrough();
  //     spyOn(commonServiceStub, 'postDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.createProduct();
  //     expect(component.productFormRequestFormat).toHaveBeenCalled();
  //     expect(component.createUpdateProductDetails).toHaveBeenCalled();
  //     expect(commonServiceStub.postDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('updateProduct', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'setRecentSelectedFormData').and.callThrough();
  //     spyOn(component, 'productFormRequestFormat').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.updateProduct();
  //     expect(component.setRecentSelectedFormData).toHaveBeenCalled();
  //     expect(component.productFormRequestFormat).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('productFormRequestFormat', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'checkAndFetchProductVal').and.callThrough();
  //     component.productFormRequestFormat();
  //     expect(component.checkAndFetchProductVal).toHaveBeenCalled();
  //   });
  // });

  // describe('createUpdateProductDetails', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(component, 'checkAndFetchProductDetailVal').and.callThrough();
  //     spyOn(component, 'clearVarients').and.callThrough();
  //     spyOn(component, 'updateViewVarientsForm').and.callThrough();
  //     spyOn(component, 'fetchVarientDetails').and.callThrough();
  //     spyOn(commonServiceStub, 'uploadImageNew').and.callThrough();
  //     spyOn(commonServiceStub, 'putDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.createUpdateProductDetails();
  //     expect(component.checkAndFetchProductDetailVal).toHaveBeenCalled();
  //     expect(component.clearVarients).toHaveBeenCalled();
  //     expect(component.updateViewVarientsForm).toHaveBeenCalled();
  //     expect(component.fetchVarientDetails).toHaveBeenCalled();
  //     expect(commonServiceStub.uploadImageNew).toHaveBeenCalled();
  //     expect(commonServiceStub.putDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });

  // describe('updateViewVarientsForm', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getEditProduct').and.callThrough();
  //     component.updateViewVarientsForm();
  //     expect(component.getEditProduct).toHaveBeenCalled();
  //   });
  // });

  // describe('fetchVarientDetails', () => {
  //   it('makes expected calls', () => {
  //     const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
  //       FormBuilder
  //     );
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(component, 'displayVarientData').and.callThrough();
  //     spyOn(formBuilderStub, 'array').and.callThrough();
  //     spyOn(formBuilderStub, 'group').and.callThrough();
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.fetchVarientDetails();
  //     expect(component.displayVarientData).toHaveBeenCalled();
  //     expect(formBuilderStub.array).toHaveBeenCalled();
  //     expect(formBuilderStub.group).toHaveBeenCalled();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('deleteVarient', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     const matDialogStub: MatDialog = fixture.debugElement.injector.get(
  //       MatDialog
  //     );
  //     spyOn(component, 'onEditVarientDetail').and.callThrough();
  //     spyOn(commonServiceStub, 'deleteDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'displaySuccessMessage').and.callThrough();
  //     spyOn(sharedServiceStub, 'urlSegmentKeys').and.callThrough();
  //     spyOn(matDialogStub, 'open').and.callThrough();
  //     component.deleteVarient();
  //     expect(component.onEditVarientDetail).toHaveBeenCalled();
  //     expect(commonServiceStub.deleteDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.displaySuccessMessage).toHaveBeenCalled();
  //     expect(sharedServiceStub.urlSegmentKeys).toHaveBeenCalled();
  //     expect(matDialogStub.open).toHaveBeenCalled();
  //   });
  // });

  // describe('setActionProductType', () => {
  //   it('makes expected calls', () => {
  //     const commonServiceStub: CommonService = fixture.debugElement.injector.get(
  //       CommonService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(commonServiceStub, 'getDataNew').and.callThrough();
  //     spyOn(sharedServiceStub, 'displayErrorMessage').and.callThrough();
  //     component.setActionProductType();
  //     expect(commonServiceStub.getDataNew).toHaveBeenCalled();
  //     expect(sharedServiceStub.displayErrorMessage).toHaveBeenCalled();
  //   });
  // });

  // describe('searchSpare', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getSpareParts').and.callThrough();
  //     component.searchSpare();
  //     expect(component.getSpareParts).toHaveBeenCalled();
  //   });
  // });

  // describe('cancel', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'setProductAction').and.callThrough();
  //     component.cancel();
  //     expect(component.setProductAction).toHaveBeenCalled();
  //   });
  // });

  // describe('ngOnDestroy', () => {
  //   it('makes expected calls', () => {
  //     const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
  //       ChangeDetectorRef
  //     );
  //     spyOn(changeDetectorRefStub, 'detach').and.callThrough();
  //     component.ngOnDestroy();
  //     expect(changeDetectorRefStub.detach).toHaveBeenCalled();
  //   });
  // });
});
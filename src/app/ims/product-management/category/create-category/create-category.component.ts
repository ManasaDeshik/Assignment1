import { Component, OnInit } from "@angular/core";
import {
  SharedService,
  AddCategoryForm,
  CommonService,
  AvailableLang,
  RequestCategoryCollections,
  CategoryDetailsAction,
  categoryDetailsActionCollections,
} from "src/app/utils";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.scss"],
})
export class CreateCategoryComponent implements OnInit {
  public routeSegmentId: string;
  public fileName: any;
  public selectedLang = "en";
  public uploadImageInfo: any;
  public categoryForm: FormGroup;
  public categoryAction: CategoryDetailsAction = new CategoryDetailsAction();
  public image: any;
  public storeCategoryData = {};
  public categoryRequestObj = new RequestCategoryCollections();
  public availableLang: AvailableLang[] = [];
  constructor(
    private sharedService: SharedService,
    private commonService: CommonService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchUrl();
    this.categoryForm = this.createCategoryForm();
  }
  /**
   * @method - validationControl()
   * @description - the following validationControl() method is used return  user credentials so it make easy to
   * access the form controls on the HTML form.
   * @author amitha.shetty
   */
  /* Reactive form validation with creation*/
  get validationControl() {
    return this.categoryForm.controls;
  }
  createCategoryForm() {
    return this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
  fetchUrl(): void {
    this.getLangList().then((availableLang: Array<any>) => {
      this.availableLang = availableLang;
      const urlSegment = this.sharedService.urlSegmentKeys();
      this.routeSegmentId = urlSegment[urlSegment.length - 1].path;
      this.categoryAction = new CategoryDetailsAction(
        categoryDetailsActionCollections[urlSegment[2].path]
      );
      if (this.categoryAction.key === "Update") {
        this.availableLang.filter((ele) => {
          return (ele.isCompleted = true);
        });
        this.selectedLang = urlSegment[3].path;
        this.getEditData(availableLang);
      }
    });
  }

  getLangList() {
    return this.sharedService.getListLang().then((data: Array<any>) => {
      return data.map((x) => new AvailableLang(x));
    });
  }
  getEditData(langAvailable) {
    const dataRequestSet = this.routeSegmentId;
    this.commonService
      .getDataNew("product/category/" + dataRequestSet)
      .subscribe(
        (res) => {
          if (res.success) {
            res.payload.map((val) => (this.storeCategoryData[val.language] = val));
            this.fileName = this.storeCategoryData[this.selectedLang].image;
            console.log(this.storeCategoryData);
            this.categoryForm.setValue(
              new AddCategoryForm(this.storeCategoryData[this.selectedLang])
            );

            return false;
            this.fileName = res.payload.image;
            langAvailable.filter((ele) => {
              this.categoryForm.setValue(
                new AddCategoryForm(this.storeCategoryData[ele.identity])
              );
              
              if (ele.identity === "en") {
                this.storeCategoryData[ele.identity] = new AddCategoryForm(
                  res.payload
                );
                this.categoryForm.setValue(
                  new AddCategoryForm(this.storeCategoryData["en"])
                );
              } else {
                this.sharedService
                  .setJsonResponse("category", ele.identity)
                  .then((result: any) => {
                    if (result) {
                      this.storeCategoryData[ele.identity] =
                        new AddCategoryForm(
                          result.find(
                            (categoryId) => categoryId._id === res.payload._id
                          )
                        );
                      if (this.selectedLang === ele.identity) {
                        this.categoryForm.setValue(
                          new AddCategoryForm(
                            this.storeCategoryData[this.selectedLang]
                          )
                        );
                      }
                    }
                  });
              }
            });
          }
        },
        (err) => {
          this.sharedService.show("hide");
          this.sharedService.displayErrorMessage(err.statusText);
        }
      );
  }

  /* On lang btn click */
  langSelected(data: any): void {
    this.toCheckFormValidAndCompleted();
    this.setRecentSelectedFormData();
    this.retrieveCategoryData(data); // retrieve product details back
    this.selectedLang = data.identity;
  }
  createUpdateCategory() {
    this.toCheckFormValidAndCompleted();
    this.setRecentSelectedFormData();
    const checkFormCompletion = this.availableLang.filter((ele) => {
      return !ele.isCompleted;
    });
    if (checkFormCompletion.length > 0) {
      this.sharedService.displayErrorMessage("Please fill the form details");
    } else {
      if (this.fileName) {
        const formData: FormData = new FormData();
        if (this.uploadImageInfo) {
          formData.append("image", this.uploadImageInfo);
        }
        this.availableLang.forEach((element) => {
          this.checkAndFetchCategoryVal("name", element);
          this.checkAndFetchCategoryVal("description", element);
        });
        // console.log(this.categoryRequestObj)
        if (
          this.categoryRequestObj.description.en.trim() === "" ||
          this.categoryRequestObj.description.hi.trim() === "" ||
          this.categoryRequestObj.name.en.trim() === "" ||
          this.categoryRequestObj.name.hi.trim() === ""
        ) {
          this.sharedService.displayErrorMessage(
            "Please fill the form details"
          );
          return;
        }
        formData.append(
          "description",
          JSON.stringify(this.categoryRequestObj["description"])
        );
        formData.append(
          "name",
          JSON.stringify(this.categoryRequestObj["name"])
        );
        if (this.categoryAction.key === "Create") {
          this.commonService
            .uploadImageNew("product/category", formData)
            .subscribe(
              (res) => {
                if (res.success) {
                  this.router.navigate([
                    "product-management/category/list-category",
                  ]);
                  this.sharedService.displaySuccessMessage(
                    "Category Created Successfully"
                  );
                }
              },
              (err) => {
                this.sharedService.displayErrorMessage(err.statusText);
              }
            );
        } else if (this.categoryAction.key === "Update") {
          formData.append("category_id", this.routeSegmentId);
          this.commonService
            .updateImageNew("product/category", formData)
            .subscribe(
              (res) => {
                if (res.success) {
                  this.router.navigate([
                    "product-management/category/list-category",
                  ]);
                  this.sharedService.displaySuccessMessage(
                    "Category Updated Successfully"
                  );
                }
              },
              (err) => {
                this.sharedService.displayErrorMessage(err.statusText);
              }
            );
        }
      } else {
        this.sharedService.displayErrorMessage(
          "Please Upload atleast one image"
        );
      }
    }
  }

  toCheckFormValidAndCompleted(): void {
    this.availableLang.filter((ele) => {
      if (ele.identity === this.selectedLang) {
        if (this.categoryForm.valid) {
          return (ele.isCompleted = true);
        } else {
          return (ele.isCompleted = false);
        }
      }
    });
  }

  setRecentSelectedFormData(): void {
    this.storeCategoryData[this.selectedLang] = new AddCategoryForm(
      this.categoryForm.value
    );
  }

  retrieveCategoryData(data): void {
    this.categoryForm.reset();
    if (this.storeCategoryData[data.identity]) {
      this.categoryForm.setValue(
        new AddCategoryForm(this.storeCategoryData[data.identity])
      );
    }
  }

  checkAndFetchCategoryVal(currentFieldVal: string, element: any) {
    if (this.categoryRequestObj[currentFieldVal]) {
      this.categoryRequestObj[currentFieldVal][element.identity] =
        this.storeCategoryData[element.identity][currentFieldVal];
    } else {
      this.categoryRequestObj[currentFieldVal] = {};
      this.categoryRequestObj[currentFieldVal][element.identity] =
        this.storeCategoryData[element.identity][currentFieldVal];
    }
  }
  uploadImage(event) {
    if (event.target.files[0].name) {
      // console.log((event.target.files[0].size / 1000))
      if (
        window["restrictImageMinSize"] < event.target.files[0].size / 1000 &&
        event.target.files[0].size / 1000 < 1025
      ) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.fileName = reader.result;
        };
        this.uploadImageInfo = event.target.files[0];
        this.image = "";
      } else {
        this.sharedService.displayErrorMessage(
          `File size should be in between ${window["restrictImageMinSize"]} Kilo bytes to 1 Mega bytes`
        );
      }
    } else {
      this.fileName = "";
    }
  }
}

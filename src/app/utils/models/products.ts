// import { stringify } from '@angular/core/src/util';




export class CategoryList {
    public name: string;
    public category: any;
    public description: string;
    public id: string;
    public checked: boolean;
    public isPresent: boolean;
    public category_code:string;
    //public products: number;
    // public is_disabled: boolean;
    constructor(data: any = {}) {
        this.checked = false;
        this.isPresent = false;
        // this.is_disabled = data.is_disabled;
        this.name = data.name || '';
        this.category = data.category || {};
        this.description = data.description || 'NA';
       // this.products = data.category.products.length || 0;
        if (data.id) {
            // console.log(data)
            this.id = data.id;
        }
        if(data.category){
            this.id = data.category.id
        }
        if(data.category_code)
        this.category_code=data.category_code;

    }
}

export class ProductForm {
    public title: string;
    public brand: string;
    public _id: string;
    public productId: string;
    public checked: boolean;
    public isPresent: boolean;
    public is_disabled: boolean;
    public category: CategoryList[] = [];
    constructor(data: any = {}) {
        this.isPresent = false;
        this.checked = false;
        this.title = data.title || '';
        this.brand = data.product.brand || '';
        this._id = data.id || '';
        this.productId = data.id || '';
        this.is_disabled = data.is_disabled;
        if (data.product.categories) {
            if (data.product.categories.length > 0) {
                data.product.categories.forEach(ele => {
                    this.category.push(new CategoryList(ele.category_translation[0]));
                });
            } else {
                this.category = [];
            }
        } else {
            this.category = [];
        }
    }
}
export class ProductTranslationForm {
    public title: string;
    public brand: string;
    public _id: string;
    public productId: string;
    public checked: boolean;
    public isPresent: boolean;
    public is_disabled: boolean;
    public category: CategoryList[] = [];
    constructor(data: any = {}) {
        this.isPresent = false;
        this.checked = false;
        console.log(data.id)
        this.title = (data.product.translation[0])?data.product.translation[0].title : '';
        this.brand = (data.product.translation[0])?data.product.translation[0].brand : '';
        this._id = data.id || '';
        this.productId = data.id || '';
        this.is_disabled = data.is_disabled || false;
        console.log(data.id)
        if (data.product.categories) {
            if (data.product.categories.length > 0) {
                data.product.categories.forEach((ele) => {
                    this.category.push(new CategoryList(ele.category_translation[0]));
                });
            } else {
                this.category = [];
            }
        } else {
            this.category = [];
        }
        console.log(data.id)
    }
}
export class TableListProduct {
    public totalPages: number;
    public totalRecords: number;
    public records: ProductForm[] = [];
    constructor(data: any = {},lang:string='en') {
        if (data.page_info) {
            this.totalPages = data.page_info.total_pages;
            this.totalRecords = Number(data.page_info.total_pages * 10);
        } else {
            this.totalPages = 1;
            this.totalRecords = 0;
        }

        if (data.records) {
            if (data.records.length > 0) {
                data.records.filter(element => {
                   if(lang == 'en')
                    this.records.push(new ProductForm(element));
                    else
                    this.records.push(new ProductTranslationForm(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}
export class ProductFeatures {
    public feature_name: string;
    public option: string;
    constructor(data: any = {}) {
        this.feature_name = data.feature_name;
        this.option = data.option || '';
    }
}
export class ProductSpecifications {
    public title: string;
    public description: string;
    constructor(data: any = {}) {
        this.title = data.title || '';
        this.description = data.description || '';
    }
}
export class ProductDetailsForm {
    public title: string;
    public description: string;
    public inventory_id: string;
    public is_default: boolean;
    public displayImages: Array<any> = [];
    public _id: string;
    public feature_options: ProductFeatures[] = [];
    public specifications: ProductSpecifications[] = [];
    public images: Array<any> = [];
    public removedImages: Array<any> = [];
    public storeResponseImages: Array<any> = [];
    constructor(data: any = {}) {
        this.title = data.title || '';
        this.description = data.description || '';
        this.inventory_id = data.inventory_id || '';
        this.is_default = data.is_default;
        this._id = data._id;

        if (data.feature_options) {
            if (data.feature_options.length > 0) {
                data.feature_options.forEach(ele => {
                    this.feature_options.push(new ProductFeatures(ele));
                });
            } else {
                this.feature_options = [];
            }
        } else {
            this.feature_options = [];
        }
        if (data.specifications) {
            if (data.specifications.length > 0) {
                data.specifications.forEach(ele => {
                    this.specifications.push(new ProductSpecifications(ele));
                });
            } else {
                this.specifications = [];
            }
        } else {
            this.specifications = [];
        }
        if (data.images) {
            if (data.images.length > 0) {
                data.images.forEach(element => {
                    const image = element;
                    this.displayImages.push(image);
                    this.storeResponseImages.push(element);
                });
            } else {
                this.displayImages = [];
                this.storeResponseImages = [];
            }
        } else {
            this.displayImages = [];
            this.storeResponseImages = [];
        }
        this.images = data.images || [];
        this.removedImages = data.removedImages || [];
    }
}

export class ProductDetailsAction {
    public name: string;
    public key: string;
    constructor(data: any = {}) {
        // this.name = data.name || 'Add product';
        this.key = data.key || 'Create';
    }
}
export class VarientDetailsAction {
    public name: string;
    public key: string;
    constructor(data: any = {}) {
        // this.name = data.name || 'Add product';
        this.key = data.key || 'Create';
    }
}
export class CategoryDetailsAction {
    public name: string;
    public key: string;
    constructor(data: any = {}) {
        this.name = data.name || 'Create Category';
        this.key = data.key || 'Create';
    }
}

export class TableListCatgeory {
    public totalPages: number;
    public totalRecords: number;
    public records: CategoryList[] = [];

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
                    this.records.push(new CategoryList(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}

export class AddCategoryForm {
    public name: string;
    public description: string;
    constructor(data: any = {}) {
        this.name = data.name || '';
        this.description = data.description || '';
    }
}


export class TableViewRequestProductSet {
    public recordsPerPage: number;
    public pageNumber: number;
    public searchText: string;
    public category: string;
    public sort_by_alphabet: string;
    constructor(data: any = {}) {
        this.recordsPerPage = data.recordsPerPage || 10;
        this.pageNumber = data.pageNumber || 1;
        this.searchText = data.searchText || '';
        this.category = data.category || '';
        this.sort_by_alphabet = data.sort_by_alphabet || '';
    }
}

export class TableViewRequestProduct {
    public recordsPerPage: number;
    public pageNumber: number;
    public searchText: string;
    public category: string;
    public sort_by_alphabet: string;
    constructor(data: any = {}) {
        this.recordsPerPage = data.recordsPerPage || 10;
        this.pageNumber = data.pageNumber || 1;
        this.searchText = data.searchText || '';
        this.category = data.category || '';
        this.sort_by_alphabet = data.sort_by_alphabet || '';
    }
}


export class ProductManagementSubscribeParams {
    public searchText: string;
    public category: string;
    constructor(data: any = {}) {
        this.searchText = data.searchText || '';
        this.category = data.category || '';
    }
}

export class AvailableLang {
    public name: string;
    public value: string;
    public identity: string;
    public selectedBtn: boolean;
    public isCompleted: boolean;
    constructor(data: any = {}) {
        this.name = data.name || 'English';
        this.identity = data.value || 'en';
        this.selectedBtn = data.selectedBtn || false;
        this.isCompleted = data.isCompleted || false;
    }
}

export class VarientsCollections {
    public title: string;
    public description: string;
    public is_default: boolean;
    public gst: string;
    public featuresDataArray: CreateFeatureOption[] = [];
    public specificationDataArray: CreateSpecification[] = [];
    public product_aging: any;
    public warehouse : any;
    public variantCode: any;
    constructor(data: any = {}) {
        console.log('323',data);
        this.title = data.title || '';
        this.warehouse = data.warehouse || []
        this.gst = data.gst || '';
        this.description = data.description || null;
        this.is_default = data.is_default || false;
        this.featuresDataArray = data.featuresDataArray || new CreateFeatureOption();

        this.specificationDataArray = data.specificationDataArray || new CreateSpecification();
        console.log('328',this.specificationDataArray);
        this.product_aging = data.product_aging || '';
        this.variantCode = data.variant_code || '';
    }
}
export class ProductCollections {
    public title: string;
    public brand: string;
    public product_code: string;
    public category: Array<any> = [];
    public is_disabled: boolean;
    public categoryView: string;
    constructor(data: any = {}) {
        this.title = data.title || '';
        this.brand = data.brand || '';
        this.product_code = data.product_code || '';
        this.category = data.category || [];
        if (this.is_disabled) {
            this.is_disabled = data.is_disabled;
        }
        if(data.category){
            this.categoryView = data.category.length > 0 ? data.category[0].name : ''
        }
    }
}
export class RequestProductCollections {
    public title: any;
    public brand: any;
    public product_id: string;
    public category: Array<any> = [];
    public is_disabled: boolean;
    public variant_code: string;
    public product_code: string;
    constructor(data: any = {}) {
        this.title = data.title || {};
        this.brand = data.brand || {};
        this.variant_code = data.variant_code || '';
        this.product_code = Date.now().toString() || '';
        if (this.product_id) {
            this.product_id = data.product_id;
        }
        this.category = data.category || [];
        if (this.is_disabled) {
            this.is_disabled = data.is_disabled;
        }
    }
}
export class RequestCategoryCollections {
    public name: any;
    public description: any;
    constructor(data: any = {}) {
        this.name = data.name || {};
        this.description = data.description || {};
    }
}
export class RequestProductDetailCollections {
    public title: any;
    public description: any;
    public specificationDataArray: any;
    public featuresDataArray: any;
    public is_disabled: boolean;
    public variant_code : any;
    constructor(data: any = {}) {
        this.title = data.title || {};
        this.variant_code = data.variant_code || '';
        this.description = data.description || {};
        this.specificationDataArray = data.specificationDataArray || {};
        this.featuresDataArray = data.featuresDataArray || {};
        if (this.is_disabled) {
            this.is_disabled = data.is_disabled;
        }

    }
}

export class CreateSpecification {
    public title: string;
    public description: string;
    constructor(data: any = {}) {
        this.title = data.title || '';
        this.description = data.description || '';
    }
}
export class CreateFeatureOption {
    public name: string;
    public feature_option: string;
    public _id: string;
    public feature_id:string;
    constructor(data: any = {}) {
        console.log(data,'fdsdfdsfd')
        this.name = data.name || undefined;
        this.feature_option = data.feature_option || '';

        if (data.id) {
            this._id = data.id;
        }
        if(data.feature_id)
        this.feature_id=data.feature_id;
    }
}

export class ViewVarientsInfo {
    public title: string;
    public description: string;
    public type: number;
    public images: Array<any>;
    public _id: string;
    public id: string;
    public product_id: string;
    public is_disabled: boolean;
    public is_default: boolean;
    public warehouse
    public variantCode
    public product_stocks_counts:number=0;
    constructor(data: any = {}) {
        console.log(data)
        this.title = data.title || '';
        this.description = data.description || '';
        this.warehouse = data.warehouse_details || [];
        this.variantCode = data.variant_code || '';
        this.type = data.type;
        this._id = data.id || '';
        this.id = data.id || '';
        if(data.product_stocks_counts && data.product_stocks_counts[0])
        {
            this.product_stocks_counts=data.product_stocks_counts[0].max_stock_count
        }
        if (data.product) {
            this.product_id = data.product.id || '';
        } else {
            this.product_id = '';
        }
        if (data.is_disabled) {
            this.is_disabled = data.is_disabled;
        } else {
            this.is_disabled = false;
        }
        if (data.is_default) {
            this.is_default = data.is_default;
        } else {
            this.is_default = false;
        }
        if (data.images && data.images.length > 0) {
            this.images = data.images;
        } else {
            this.images = [];
        }
    }
}

export class ProductInfo {
    public product: ProductCollections = new ProductCollections();
    public varients: VarientsCollections = new VarientsCollections();
    public langIdentity: string;
    constructor(productData: any = {}, varientData: any = {}, type?: string) {
        this.product = new ProductCollections(productData) || new ProductCollections();
        this.varients = new VarientsCollections(varientData) || new VarientsCollections();
        this.langIdentity = type || '';
    }
}
export class EditVarientDetails {
    public title: string;
    public description: string;
    public specificationDataArray: CreateSpecification[] = [];
    public featuresDataArray: CreateFeatureOption[] = [];
    constructor(data: any = {}) {
        console.log('473',data);
        this.title = data.title || '';
        this.description = data.description || null;
        if (data.features) {
            if (data.features.length > 0) {
                data.features.forEach(ele => {
                    this.featuresDataArray.push({
                        name: ele.name,
                        feature_option: ele.product_feature.feature_option,
                        _id: ele.id,
                        feature_id:ele.feature_id
                    });
                    //console.log('486',ele);
                });
            } else {
                this.featuresDataArray = [];
            }
        } else {
            this.featuresDataArray = [];
        }
        this.specificationDataArray = data.specifications || [new CreateSpecification()];
    }
}
export class ViewSpareParts {
    public name: string;
    public warranty: any;
    public finalPrice: any;
    public productId: string;
    public productDetailId: string;
    public spareId: string;
    public items: number;
    constructor(data: any = {}) {
        this.name = data.name || '';
        if (data.warranty) {
            if (data.warranty === 1) {
                this.warranty = `${data.warranty} month`;
            } else {
                this.warranty = `${data.warranty} months`;
            }
        } else {
            this.warranty = 0;
        }
        if (data.final_price) {
            this.finalPrice = `Rs ${data.final_price}`;
        } else {
            this.finalPrice = 0;
        }
        this.productId = data.product_id || '';
        this.productDetailId = data.product_detail_id || '';
        this.spareId = data._id || '';
        this.items = data.items || 0;
    }

}
export class GeTSpareList {
    public totalPages: number;
    public totalRecords: number;
    public records: ViewSpareParts[] = [];
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
                    this.records.push(new ViewSpareParts(element));
                });
            } else {
                this.records = [];
            }
        } else {
            this.records = [];
        }
    }
}

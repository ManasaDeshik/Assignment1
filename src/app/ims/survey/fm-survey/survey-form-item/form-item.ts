import { EventEmitter } from '@angular/core';

export interface FormItemError {
    type?: string;
    message?: string;
}

export interface FormItemValidationRules {
    minLength?: number;
    optionKeyValues?: boolean;
}

export interface FormItemValidation {
    rules: FormItemValidationRules[];
}
export interface Language{
    en?:string;
    hi?:string;
}
export interface LanguageForPlaceholder{
    en?:string;
    hi?:string;
}

export class FormItem {
    type!: string;
    answer:any;
    answer_radio:any;
    answer_image:any = [];
   // selected_answer!:{answer:''};
    radioAnswers:any[];//[[{id:'',answer:'',language:'',answer_group_id:'',imageUrl:'',image:''}]];
    answer_id:string;
    name: string='name';
    label!: Language[];
    input_id_type?:any;
    answers:any;
    placeholder!: Language;
    style!: string;
    hint!: string;
    value!: string | number | string[] | boolean | FormItemOptionItem[];
    errors!: FormItemError[];
    fieldValidations!: FormItemValidation;
    fieldValidation!: FormItemValidationRules;
    hasOptions!: boolean;
    justAdded!:  boolean;
    required!:  boolean;
    readOnly!:  boolean;
    multiple!:  boolean;
    actionUpdatesTableValue!: boolean;
    actionUpdatesSectionValue!: boolean;
    visibilityValuesInTable!: string[];
    visibilityValuesInSection!: string[];
    items?: FormItemOptionItem[];
    segments?: FormItemOptionItem[];
    isSectionValueItem?: boolean;
    id?: string | number;
    choice?: number;
    currency?:string;
    max?:number;
    min?:number;
    matrixtype?:string;
    choices?:{'en':any,'hi':any};
    images: any;
    videos: any;
    actions?:FormItemAction[];
    checked?:boolean;
    units?:string;
    row:string[];
    col:string[];
    rowdata:{'en':any,'hi':any};
    coldata:{'en':any,'hi':any};
    optionvalue:{'en':{0:[]},'hi':{0:[]}}
    properties?:Properties[];
    radioChoices?:LangChoice[];
    checkboxChoices?:LangChoice[];
    matrix_columns:[];
    matrix_rows:[];
    //rowData?:string[];
    imageChoices?:{'en':any,'hi':any};
}
export interface Properties {
    firstName?:boolean;
    middleName?:boolean;
    lastName?:boolean;
    addressLineOne?:boolean;
    addressLineTwo?:boolean;
    addressLineThree?:boolean;
    city?:boolean;
    pincode?:boolean;
    state?:boolean;
    country?:boolean;
    matrixrow?:number;
    matrixcol?:number;
}
export interface FormItemAction {
    options:string;
    selected:string;
    action:string;
}
export interface FormItemChoice {
    title1?:string;
    title2?:string;
    title3?:string;
    imageUploaded?:string;
    answer?:string;
    id?:string;
    answer_id?:string;
    type?:string;
    value?:string;
    en?:FormItemRadioChoice[];
    hi?:FormItemRadioChoice[];
    images?:any;

}

export interface FormItemRadioChoice {
    id?: string;
    answer?: string;
    type?:string;
    value?:string;
    answer_id?:string;
}

export interface LangChoice {
    en?:any;
    hi?:any;
    
}
export interface FormItemOptionItem {
    optionValue: string;
    label: string;
    showExplanation?: boolean;
    explanationLabel?: string;
    selected?: boolean;
}


export interface FormItemWidget {
    item: FormItem;
    editable: boolean;
    isMobile?: boolean;
    changes: EventEmitter<FormItem>;
}

export interface FormSection {
    name?: string;
    title?: string;
    subtitle?: string;
    sectionStyle?: string;
    items?: FormItem[];
    isEditable?: boolean;
    hasError?: boolean;
    firstErrorText?: string;
   
}

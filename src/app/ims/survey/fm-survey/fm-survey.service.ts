import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { DialogFieldEditComponent } from './dialog-field-edit/dialog-field-edit.component';

@Injectable({
  providedIn: 'root'
})
export class FmSurveyService {
    private subscription!:Subscription;
    
  constructor() { }
  public initForm(form:any, formValues:any) {
    //console.log(form, formValues);
    form.forEach((section:any)=>{
        if (section.name) {
            const groupedItems = _.groupBy(_.filter(section.items, item=>!item.name), item=>item.type);

            _.each(groupedItems, (items, type)=>{
                if (type) {
                    section.items[_.indexOf(section.items, _.first(items))] = {
                        type: type,
                        items: items,
                        name: section.name,
                        isSectionValueItem: true,
                    };
                    _.each(items, (item)=>{
                        section.items = _.without(section.items, item);
                    });
                }
            });
        }
    });


    const visibilityValuesInTableConvert = (item:any)=>{
        if (item.visibilityValuesInTable) {
            const tableItem = _.first(_.map(form, (section)=>{
                return _.find(section.items, (item)=>{
                    if (!item.items) {
                        return item.actionUpdatesTableValue;
                    } else {
                        return _.find(item.items, item=>item.actionUpdatesTableValue);
                    }
                });
            }));
            const newValues = <any[]>[];
            if (tableItem) {
                _.each(item.visibilityValuesInTable, (val)=>{
                    let valItem = _.find(tableItem.items, item=>item.title===val);
                    newValues.push(valItem && valItem.optionValue ? valItem.optionValue : val);
                });
            }
            item.visibilityValuesInTable = newValues;
        }
    };

    _.each(form, (section)=>{
        visibilityValuesInTableConvert(section);
        _.each(section.items, (item)=>{
            visibilityValuesInTableConvert(item);
            if (item.type === 'radio' && section.allowsMultipleSelection) {
                item.multiple = true;
                if (_.isString(item.value)) {
                    item.value = JSON.parse(item.value);
                }
            }
            if (formValues[item.name] !== undefined) {
                item.value = formValues[item.name];
                if (item.type === 'date' && !_.isString(item.value)) {
                    //item.value = this.getDateStr(formValues[item.name]);
                }
                //item.readOnly = item.readOnly || _.contains(this.readOnlyFields, item.name);
                if (item.multiple && _.isString(item.value)) {
                    item.value = JSON.parse(item.value);
                }
                if (item.type === 'numericRating' && _.isString(item.value)) {
                    item.value = parseInt(item.value);
                }
            }
            if (item.isSectionValueItem && section.sectionValidation && !item.fieldValidation) {
                item.fieldValidation = section.sectionValidation;
            }
        });
        if (section.subtitle) {
            section.subtitle = section.subtitle.replace(new RegExp('\n', 'g'), '<br />');
        }
    });
    //console.log(form);
    return form;
}
}

import { Component, OnInit } from '@angular/core';
import { CommonService, CreateUpdateRole, SharedService, } from 'src/app/utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';


@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
  public moduleData = [];
  public roleForm: FormGroup;
  public userLoggedInCheck = [
    {
      name: 'is_admin_login_enabled',
      label: 'Admin Login',
      value: false
    }, {
      name: 'is_saheli_login_enabled',
      label: 'Saheli Login',
      value: false
    },
    {
      name: 'is_OE_login_enabled',
      label: 'OE Login',
      value: false
    },
    {
      name: 'is_saheli_coordinator_login_enabled',
      label: 'TM Login',
      value: false
    }];
  @SessionStorage('moduleDetails') public moduleDetails;


  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private sharedService: SharedService, private router: Router) {
  }

  ngOnInit() {
    this.roleForm = this.createRoleForm();
    this.getModuleDetails();
  }
  /**
   * @method - validationControl()
   * @description - the following validationControl() method is used return  user credentials so it make easy to
   * access the form controls on the HTML form.
   * @author amitha.shetty
   */
  /* Reactive form validation with creation*/
  get validationControl() { return this.roleForm.controls; }
  createRoleForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^\S/)]],
      description: ['', [Validators.required, Validators.pattern(/^\S/)]],
      id: [undefined]
    });
  }
  getModuleDetails(): void {
    // this.commonService.getData('admin/modules').subscribe(response => {
    //   if (response.success) {
    // sub_module: {
    //   add: {
    //     read: true,
    //       write: true,
    //         update: true,
    //           delete: true
    //   }
    // } 
    let response = [
      { name: 'Dashboard', sub_module: [] },
      { name: 'User Management', sub_module: [] },
      { name: "Role Management", sub_module: [] },
      { name: "Warehouse Managememnt", sub_module: [] },
      { name: "Village Profile", sub_module: [] },
      { name: "Product Management", sub_module: [] },
      { name: "Category", sub_module: [] },
      { name: "Banner Management", sub_module: [] },
      { name: "Catalogue Management", sub_module: [] },
      { name: "Stock Management", sub_module: [] },
      { name: "Franchise", sub_module: [] },
      { name: "Manufacturer", sub_module: [] },
      { name: "Purchase Order", sub_module: [] },
      { name: "Transportation", sub_module: [] },
      { name: "Demo Management", sub_module: [] },
      {
        name: "Lead Management",
        sub_module: [
          { name: 'Directory' },
          { name: 'Unaware' },
          { name: 'Aware' },
          { name: 'Consider' },
          { name: 'To be Corrected' },
        ]
      },
      { name: "Try & Buy Management", sub_module: [] },
      {
        name: "Order Management",
        sub_module: [
          { name: 'Received' },
          { name: 'Assign to TM' },
          { name: 'Ongoing' },
          { name: 'Dispatched' },
          { name: 'Delivered' },
          { name: 'RTS' },
          { name: 'Completed' },
          { name: 'Rejected' },
          { name: 'Could not deliver' },
          { name: 'Hold' },

        ]
      },
      { name: "Old Orders", sub_module: [] },
      // { name: "Service Management", sub_module: [] },
      {
        name: "Customer Management",
        sub_module: [
          { name: 'Total Orders' },
          { name: 'New Customer' },
          { name: 'Repeat Customer' }
        ]
      },
     
      { name: "Download Management", sub_module: [] },
      { name: "Survey", sub_module: [] },
      { name: "Help", sub_module: [] },
      
    ]
    response.map((ele: any) => {
      let obj = {
        name: ele.name,
        label: ele.name,
        value: false,
        permissions: [
          {
            name: 'read' + ele.name,
            label: 'Read',
            value: false
          },
          {
            name: 'write' + ele.name,
            label: 'Create',
            value: false
          },
          {
            name: 'edit' + ele.name,
            label: 'Update',
            value: false
          },
          {
            name: 'delete' + ele.name,
            label: 'Delete',
            value: false
          },
          {
            name: 'download' + ele.name,
            label: 'Download',
            value: false
          }
        ],
        sub_module: []
      };
      ele.sub_module.map((elem: any, i) => {
        // console.log(elem);
        obj.sub_module[i] = {
          name: elem.name,
          label: elem.name,
          value: false,
          permissions: [
            {
              name: 'read' + elem.name,
              label: 'Read',
              value: false
            },
            {
              name: 'write' + elem.name,
              label: 'Create',
              value: false
            },
            {
              name: 'edit' + elem.name,
              label: 'Update',
              value: false
            },
            {
              name: 'delete' + elem.name,
              label: 'Delete',
              value: false
            },
            {
              name: 'download' + elem.name,
              label: 'Download',
              value: false
            }
          ],
        }
      })
      this.moduleData.push(obj);
    });
    // console.log(this.moduleData)
    this.moduleData.map(ele => {
      const eleIdentifier = ele.name.replace(/\s+/g, '').toLowerCase();
      if (eleIdentifier === 'dashboard' || eleIdentifier === 'rolemanagement' || eleIdentifier === 'transportation') {
        ele.isDownload = false;
      } else {
        ele.isDownload = true;
      }
    });
    this.getRouteSegment();
  }
  // }, err => {
  //   this.sharedService.displayErrorMessage(err.error.message);
  // });
  // }
  getRouteSegment(): void {
    const segment = this.sharedService.urlSegmentKeys();
    if (segment[2].path === 'edit-role') {
      this.getEditRoleData(segment[3].path);
    }
  }
  getEditRoleData(roleId): void {
    this.commonService.getDataNew(`users/getRoleDetails/${roleId}`).subscribe(response => {
      if (response.success) {
        if (response.payload) {
          if (response.payload.is_admin_login_enabled && (response.payload.is_OE_login_enabled || response.payload.is_saheli_coordinator_login_enabled || response.payload.is_saheli_login_enabled)) {
            console.log("update role.")
          }
        }
        // console.log(122, response.payload);
        this.roleForm.patchValue(response.payload);
        this.setModuleInfo(response.payload);

      }
    }, err => {
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }
  setModuleInfo(resModuleData): void {
    const accessVal = ['read', 'write', 'edit', 'delete', 'download'];
    // console.log(resModuleData);
    resModuleData.role_permission.map(moduleEle => {
      this.moduleData.filter((data, index) => {
        if (data.name === moduleEle.name) {
          this.moduleData[index].value = true;
          accessVal.map((ele, accessIndex) => {
            this.moduleData[index].permissions[accessIndex].value = moduleEle.permission[ele];
          });
        }
        if (data.sub_module && moduleEle.sub_module) {
          moduleEle.sub_module.map(moduleEle1 => {
            data.sub_module.filter((data1, index1) => {
              if (data1.name === moduleEle1.name) {
                data.sub_module[index1].value = true;
                accessVal.map((ele, accessIndex) => {
                  data.sub_module[index1].permissions[accessIndex].value = moduleEle1.permission[ele];
                });
              }
            })
          })
        }
      });
    });
    this.userLoggedInCheck.map(userLoggedele => {
      userLoggedele.value = resModuleData[userLoggedele.name];
    });
  }
  saveModule(): void {
    let obj
    const requestObj = this.moduleData.map(ele => {
      if (ele.value) {
        obj = {
          name: ele.name,
          permission: {
            read: ele.permissions[0].value,
            write: ele.permissions[1].value,
            edit: ele.permissions[2].value,
            delete: ele.permissions[3].value,
            download: ele.permissions[4].value
          },
          sub_module: []
        };
        let a = 0;
        ele.sub_module.map((ele1, i) => {
          // console.log(ele1)
          if (ele1.value) {
            obj.sub_module[a] = {
              name: ele1.name,
              permission: {
                read: ele1.permissions[0].value,
                write: ele1.permissions[1].value,
                edit: ele1.permissions[2].value,
                delete: ele1.permissions[3].value,
                download: ele1.permissions[4].value
              }
            }
            a = a + 1;
          }
        })
        return obj;
      }
    }).filter(ele => ele !== undefined);
    // console.log(this.roleForm.value, requestObj)
    const createUpdateRole = new CreateUpdateRole(this.roleForm.value, requestObj, this.userLoggedInCheck);
    if (!createUpdateRole.is_admin_login_enabled && !createUpdateRole.is_saheli_login_enabled &&
      !createUpdateRole.is_OE_login_enabled && !createUpdateRole.is_saheli_coordinator_login_enabled) {
      this.sharedService.displayErrorMessage('Please select any one role');
      return;
    }
    if (createUpdateRole.roles.length <= 0 && !createUpdateRole.is_saheli_login_enabled &&
      !createUpdateRole.is_OE_login_enabled && !createUpdateRole.is_saheli_coordinator_login_enabled) {
      this.sharedService.displayErrorMessage('Please select minimum one module.');
      return;
    }
    if (!this.roleForm.value.id) {
      this.commonService.postDataNew('users/roles', createUpdateRole).subscribe(response => {
        if (response.success) {
          this.sharedService.displaySuccessMessage('Role created successfully');
          this.router.navigate(['user-management/roles/list-roles']);
        }
      }, err => {
        console.log(err)
        this.sharedService.displayErrorMessage('Role already exists');
      });
    } else if (this.roleForm.value.id) {
      this.commonService.putDataNew('users/roles', createUpdateRole).subscribe(response => {
        if (response.success) {
          this.sharedService.displaySuccessMessage('Role Updated successfully');
          this.router.navigate(['user-management/roles/list-roles']);
        }
      }, err => {
        this.sharedService.displayErrorMessage('Role already exists');
        //this.sharedService.displayErrorMessage(err.statusText);
      });
    }
  }
  selectOneByOne(permissionData,name): void {
    if(permissionData.name == 'Lead Management'){
      if (permissionData.sub_module ? permissionData.sub_module.length > 0 : false) {
        permissionData.sub_module.forEach((element, i) => {
          if (element) {
            permissionData.sub_module[i].value = permissionData.value;
            //  console.log(roleData.sub_module[i].permissions)
            permissionData.sub_module[i].permissions.forEach((element1,x) => {
               if(permissionData.sub_module[i].permissions[x].label == name){
                permissionData.sub_module[i].permissions[x].value = permissionData.permissions[x].value;
               }
            });
          }
        })
      }
    }
    let falseVal = 0;
    permissionData.permissions.map(ele => {
      if (ele.value) {
        permissionData.value = true;
      } else {
        falseVal++;
      }
    });
    if (falseVal === 5) {
      permissionData.value = false;
      falseVal = 0;
    }
  }
  selectAll(roleData): void {
    console.log(roleData)
    roleData.permissions.map(ele => {
      ele.value = roleData.value;
    });
    if (roleData.sub_module ? roleData.sub_module.length > 0 : false) {
      roleData.sub_module.forEach((element, i) => {
        if (element) {
          roleData.sub_module[i].value = roleData.value;
          //  console.log(roleData.sub_module[i].permissions)
          roleData.sub_module[i].permissions[0].value = roleData.value;
          roleData.sub_module[i].permissions[1].value = roleData.value;
          roleData.sub_module[i].permissions[2].value = roleData.value;
          roleData.sub_module[i].permissions[3].value = roleData.value;
          roleData.sub_module[i].permissions[4].value = roleData.value;
          // permission: {
          //   read: ele1.permissions[0].value,
          //   write: ele1.permissions[1].value,
          //   edit: ele1.permissions[2].value,
          //   delete: ele1.permissions[3].value,
          //   download: ele1.permissions[4].value
          // }
        }
      })
    }
  }
  loginCheck(data) {
    this.moduleData.forEach((ele,i)=>{
      for(var x in ele.permissions){
        ele.permissions[x].value = false;
      }
      ele.value = false;
    });
    if (data.name === 'is_admin_login_enabled' && data.value) {
      this.userLoggedInCheck.forEach((dataCheck, index) => {
        if (dataCheck.name === 'is_saheli_login_enabled' && dataCheck.value) {
          this.userLoggedInCheck[index].value = false;
        } else if (dataCheck.name === 'is_OE_login_enabled' && dataCheck.value) {
          this.userLoggedInCheck[index].value = false;
        } else if (dataCheck.name === 'is_saheli_coordinator_login_enabled' && dataCheck.value) {
          this.userLoggedInCheck[index].value = false;
        }
      })
    } else if (data.name === 'is_saheli_login_enabled' && data.value) {
      this.userLoggedInCheck.forEach((dataCheck, index) => {
        if (dataCheck.name === 'is_admin_login_enabled' && dataCheck.value) {
          this.userLoggedInCheck[index].value = false;
        }
      })
    } else if (data.name === 'is_OE_login_enabled' && data.value) {
      this.userLoggedInCheck.forEach((dataCheck, index) => {
        if (dataCheck.name === 'is_admin_login_enabled' && dataCheck.value) {
          this.userLoggedInCheck[index].value = false;
        }
      })
    } else if (data.name === 'is_saheli_coordinator_login_enabled' && data.value) {
      this.userLoggedInCheck.forEach((dataCheck, index) => {
        if (dataCheck.name === 'is_admin_login_enabled' && dataCheck.value) {
          this.userLoggedInCheck[index].value = false;
        }
      })
    }
  }
}

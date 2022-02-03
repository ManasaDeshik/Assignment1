import { Component, OnInit } from '@angular/core';
import { SessionStorage } from 'ngx-webstorage';
import { AvailableLang } from 'src/app/utils/models/products';
import { CommonService } from 'src/app/utils/services/common-service/common.service';
import { SharedService } from 'src/app/utils/services/shared-service/shared.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  listHelpVideos : any[];
  isView = false;
  videoAdd = {
    url: '',
    id: '',
    title: {
      en: '',
      hi: ''
    }
  }
  isAddHelp = false;
  isSave = [];
  isSaveProduct = true;
  allDisp=true;
  newAdd = false;
  @SessionStorage('moduleDetails') public moduleDetails;
  permission;
  isEng = true;
  public availableLang: AvailableLang[] = []; // available lang language
  public selectedLang = 'en';
  public tableHeaders = [
    { header: 'Sequence number'},
    { header: 'Video Title' },
    { header: 'URL' },
    { header: 'Actions' }
  ];


  constructor(private commonService: CommonService, private sharedService: SharedService) { }

  ngOnInit() {
    this.getHelp();
    this.getLangList();
    this.sharedService.show('show');
    this.sharedService.show('hide');
    this.moduleDetails.roles.forEach(sub => {
      if (sub.name == 'Help') {
        this.permission = sub;
      }
    });
  }
  /* get list details */
  getLangList() {
    this.availableLang = [];
    this.sharedService.getListLang()
      .then((data: any) => {
        this.availableLang = data.map(x => new AvailableLang(x));
      });
  }
  langSelected(data: any): void {
    this.selectedLang = data.identity;
  }

  getHelp() {
    this.sharedService.show('show');
    this.newAdd = false;
    this.commonService.getDataNew('users/help').subscribe(res => {
      if (res.status = 200) {
        this.sharedService.show('hide');
        console.log(res.payload.records);
        this.listHelpVideos = res.payload.records;
        console.log('75', this.listHelpVideos);
        for(var i in this.listHelpVideos){
        //  this.listHelpVideos[i].title = JSON.parse(this.listHelpVideos[i].title);
          this.listHelpVideos['isEdit'] = false;
        }
      }
    }, err => {
      //console.log(err)
      this.sharedService.show('hide');
    });
  }

  getHelpForSequencing() {
        this.sharedService.show('show');
        this.commonService.getDataNew('users/sequencehelp').subscribe(res => {
          if (res.status = 200) {
            this.sharedService.show('hide');
            console.log(res.payload.records);
            this.listHelpVideos = res.payload.records;
            for(var i in this.listHelpVideos){
              this.listHelpVideos['isEdit'] = false;
            }
          }
        }, err => {
          this.sharedService.show('hide');
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
  addHelp(index) {
   // var currentElement = this.listHelpVideos[0]; 
   this.videoAdd = {
    url: '',
    id: '',
    title: {
      en: '',
      hi: ''
    }
  } 
    this.newAdd = true;
    this.isSave[index] = false;
    this.allDisp= true;
    
  }
  cancel(i) {
    this.isAddHelp = false;
    this.isSave[i] = false;
    this.videoAdd.url = '';
    this.getHelp();
  }
  saveHelp(item,i) {
    this.isSave[i] = false;
    if(!this.newAdd) {
    this.videoAdd.url = item.url
    this.videoAdd.title.en = item.title.en;
    this.videoAdd.title.hi = item.title.hi;
    this.videoAdd.id = item.id ;
    }
    if (this.videoAdd.url == '' || this.videoAdd.url.trim() == '') {
      this.sharedService.displayErrorMessage('Please enter valid URL');
      this.isSave[i] = true;
      return;
    }
    
    if (this.videoAdd.title.en.trim() == '' || this.videoAdd.title.hi.trim() == '') {
          this.sharedService.displayErrorMessage('Please enter valid title');
          this.isSave[i] = true;
          return;
        }
    if (!this.newAdd) {
      let postData = {
        sequenceNum: 1,
        id: this.videoAdd.id,
        url: this.videoAdd.url.trim(),
        title: {en: this.videoAdd.title.en.trim(), hi: this.videoAdd.title.hi.trim()}
      }
      this.sharedService.show('show');
      this.sharedService.show('hide');
      console.log(postData)
      this.commonService.putDataNew('users/help', postData).subscribe(res => {
        if (res.status = 200) {
          this.isAddHelp = false;
          this.videoAdd.url = '';
          this.getHelp();
          this.sharedService.show('hide');
          this.sharedService.displaySuccessMessage('Help video added successfully');
        }
        this.sharedService.show('hide');
      }, err => {
        this.sharedService.displayErrorMessage(err.error.message[0]);
        this.isSave[i] = true;
      });
  }
  if (this.newAdd) {
    let postData = {
      sequenceNum: 1,
      url: this.videoAdd.url.trim(),
      title: {en: this.videoAdd.title.en.trim(), hi: this.videoAdd.title.hi.trim()}
    }
    // return
    this.sharedService.show('show');
    this.sharedService.show('hide');
    console.log(postData)
    this.commonService.postDataNew('users/help', postData).subscribe(res => {
      if (res.status = 200) {
        this.isAddHelp = false;
        this.videoAdd.url = '';
        this.getHelp();
        this.sharedService.show('hide');
        this.sharedService.displaySuccessMessage('Help video added successfully');
      }
    }, err => {
      this.sharedService.show('hide');
      this.sharedService.displayErrorMessage(err.error.message[0]);
      this.isSave[i] = true;
    });
}
}
  editUser(item, i) {
    this.listHelpVideos[i]['isEdit'] = true;
    this.isSave[i] = true;
    this.allDisp=false
    this.newAdd = false;
    console.log('198', this.listHelpVideos);
  }
  
  moveTopDown(index, move) {
    if ((index == 0) && (move == -1)) {
      console.log('no move')
    } else if (((this.listHelpVideos.length - 1) == index) && (move == 1)) {
      console.log('no move end');
    } else {
      this.isSaveProduct = false;
      [this.listHelpVideos[index], this.listHelpVideos[index + move]] = [this.listHelpVideos[index + move], this.listHelpVideos[index]]
    }
  }
  openDialog(item): void {
    const dialogRef = this.sharedService.openDialog(item.url);
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        id: item.id
      };
      if (result) {
        this.commonService.deleteDataNew('users/help', data).subscribe(response => {
          if (response.status = 200) {
            this.sharedService.displaySuccessMessage('Help video removed.');
            this.getHelp();
          }
        }, err => {
          this.sharedService.displayErrorMessage(err.statusText);
        });
      }
    });
  }
  updateHelp() {
    var dataHelpDetails = {records:[]};
    this.listHelpVideos.forEach(element => {
        dataHelpDetails.records.push(element);
    })
    this.sharedService.show('show');
    this.commonService.putDataNew('users/sortHelp', dataHelpDetails).subscribe(res => {
      console.log(res);
      if (res.status = 200) {
        this.isAddHelp = false;
        this.getHelp();
        this.allDisp=true
        this.sharedService.show('hide');
        this.sharedService.displaySuccessMessage('Help sequence updated.');
      }
    }, err => {
      this.sharedService.show('hide');
      this.sharedService.displayErrorMessage(err.statusText);
    });
  }

  saveUpdate(item) {
    if (item.url != '') {
      if (item.url.trim() == '') {
        this.sharedService.displayErrorMessage('Please enter valid URL');
        return;
      }
        if (item.title.en != '' || item.title.hi != '') {
          if (item.title.en.trim() == '' || item.title.hi.trim() == '') {
            this.sharedService.displayErrorMessage('Please enter valid title');
            return;
          }
      let postData = {
        id: item.id,
        title: item.title,
        url: item.url.trim()
      }
     this.sharedService.show('show');
     this.sharedService.show('hide');
      this.commonService.putDataNew('users/help', postData).subscribe(res => {
        this.sharedService.show('hide');
        if (res.status = 200) {
          this.isAddHelp = false;
          this.allDisp=true
          this.getHelp();
          this.sharedService.show('hide');
          this.sharedService.displaySuccessMessage('Help video updated successfully');
        }
      }, err => {
        this.sharedService.show('hide');
        this.sharedService.displayErrorMessage(err.statusText);
      });
    } else {
      this.sharedService.displayErrorMessage('Please enter valid URL');
    }
  
  }
}
}

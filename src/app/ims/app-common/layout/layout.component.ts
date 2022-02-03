import { Component, OnInit } from '@angular/core';
import { SideNavService, onMainContentChange } from 'src/app/utils';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [onMainContentChange]
})
export class LayoutComponent implements OnInit {
  public onSideNavChange: boolean;
  public hasBackdrop = {
    value: false
  }
  public mode = {
    value: 'push'
  }
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  constructor(private sidenavService: SideNavService) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
  }

  ngOnInit() {
  }

}

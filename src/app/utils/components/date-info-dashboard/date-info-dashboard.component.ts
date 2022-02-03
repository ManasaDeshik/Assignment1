import { Component, OnInit } from '@angular/core';

import { SharedService, FetchDateInfoService } from '../../services';
import { BranchInfoSet } from '../../models';
import { monthArray, weekDays, weekListText, quarterArray } from '../../enums'
import { SessionStorage } from 'ngx-webstorage';
@Component({
  selector: 'app-date-info-dashboard',
  templateUrl: './date-info-dashboard.component.html',
  styleUrls: ['./date-info-dashboard.component.scss']
})
export class DateInfoDashboardComponent implements OnInit {
  public showCalendar = false;
  public showMonthCalendar = false;
  public showMonthInfo = false;
  public showYearInfo = false;
  public showYearCalendar = false;
  public showQuarterCalendar = false;
  public initialGraph = true;
  public updatedGraph = false;
  public date = new Date();
  public selectedMonth: any;
  public year = [];
  public xAxis = [];
  public selectedYear: any;
  public Month;
  public quarterInfo: any;
  public showWeeks = false;
  public weeks = [];
  public fromData: any;
  public toData: any;
  public rangeType: string = 'year';
  public fmpBranchInfo: BranchInfoSet = new BranchInfoSet();
  public monthArray = monthArray;
  public daysArray = weekDays;
  public weekListText = weekListText;
  public quarterArray = quarterArray;
  public array = [];
  public active: any = 10;
  constructor(private fetchDate: FetchDateInfoService, private sharedService: SharedService) { }
  @SessionStorage('dateInfo') public dateInfo: any;
  ngOnInit() {
    this.fetchParticularBranchInfo();
    this.storeYear();
  }

  /**
   * @method fetchParticularBranchInfo()
   * @description: to display the name of the particular branch when we are in view page
   * @author karan
   */
  fetchParticularBranchInfo(): void {
    const routeSegment = this.sharedService.urlSegmentKeys();
    if (routeSegment.length > 2) {
      this.fmpBranchInfo = this.sharedService.getBranchData(routeSegment[2].path);
    }
  }

  /**
   * @method storeYear()
   * @description startingYear(started from 2017 as of now), currentYear(restricted till today), displaying year graph intially and storing in
   * fromData and toData, storing 2017-19 in year array to display in UI.
   * @author karan
   */
  storeYear() {
    const currentYear = new Date();
    let startingYear = new Date(2018, 3, 2);
    let startOfTheYear = new Date(currentYear.getFullYear(), 3, 1);

    this.fromData = startOfTheYear.getDate() + ' ' + this.monthArray[3] + ' ' + currentYear.getFullYear();

    let endDateOfTheYear = new Date(currentYear.getFullYear(), 8, 1);

    this.toData = 31 + ' ' + this.monthArray[2] + ' '
      + new Date(endDateOfTheYear.setFullYear(endDateOfTheYear.getFullYear() + 1)).getFullYear();

    while (currentYear.getFullYear() >= startingYear.getFullYear()) {
      this.year.push(startingYear.getFullYear());
      const setYear = startingYear.setFullYear(startingYear.getFullYear() + 1);
      startingYear = new Date(setYear);
    }

    this.active = this.year.indexOf(currentYear.getFullYear());
    this.selectedYear = this.year[this.year.length - 1];
    this.selectedMonth = this.date;
    this.Month = this.monthArray[currentYear.getMonth()];
    this.sendIntialDate(startOfTheYear, endDateOfTheYear);
  }

  /**
   * @method range()
   * @param type (week,year,quarter,month) calling particular function for computations
   * @author karan
   */
  range(type: string) {
    this.rangeType = type;
    const todayDate = new Date(this.selectedMonth);
    if (this.rangeType === 'week') {
      let lastWeek = this.getWeeksInMonth(todayDate.getMonth(), todayDate.getFullYear());
      this.sendDate(lastWeek[lastWeek.length - 1]);
    } else if (this.rangeType === 'month') {
      this.active = todayDate.getMonth();
      this.currentMonth(todayDate.getMonth());
    } else if (this.rangeType === 'quarter') {
      let currentMonth = this.monthArray[todayDate.getMonth()];
      this.quarterArray.forEach((element, index) => {
        let indexMonth = element.quarterInfo.indexOf(currentMonth);

        if (indexMonth >= 0) {
          this.active = indexMonth;
          this.sendDate(element, index);
        }
      });
    } else if (this.rangeType === 'year') {
      this.active = this.year.indexOf(todayDate.getFullYear());
      this.sendDate(todayDate.getFullYear());
    }
  }

  /**
   * @method openCalendar()
   * @description: when user click on calendar div, opens an popup where he can select range like which month,year,quarter or month
   * based on that hiding div and displaying div
   * @author karan
   */
  openCalendar() {
    if (this.showCalendar) {
      this.showCalendar = false;
    } else {
      this.showCalendar = true;
      if (this.rangeType === 'week') {
        this.showMonthInfo = true;
        this.showYearCalendar = false;
        this.showQuarterCalendar = false;
        this.showWeeks = false;
        this.showYearInfo = true;
        this.showMonthCalendar = false;
        this.selectMonth(this.selectedMonth.getMonth());
      } else if (this.rangeType === 'month') {
        this.showMonthInfo = false;
        this.showYearCalendar = false;
        this.showQuarterCalendar = false;
        this.showWeeks = false;
        this.showYearInfo = true;
        this.showMonthCalendar = true;
      } else if (this.rangeType === 'year') {
        this.showMonthInfo = false;
        this.showYearCalendar = true;
        this.showWeeks = false;
        this.showQuarterCalendar = false;
        this.showYearInfo = false;
        this.showMonthCalendar = false;
      } else if (this.rangeType === 'quarter') {
        this.showYearCalendar = false;
        this.showMonthInfo = false;
        this.showWeeks = false;
        this.showQuarterCalendar = true;
        this.showYearInfo = true;
        this.showMonthCalendar = false;
      }
    }
  }

  /**
   * @method displayCalendar()
   * @param type (month,year)
   * @description: if type is year then will show only year and vice versa for month
   * @author karan
   */
  displayCalendar(type) {
    this.showWeeks = false;
    if (type === 'month') {
      this.showYearCalendar = false;
      this.showMonthCalendar = true;
      this.active = this.monthArray.indexOf(this.Month);
    }
  }

  /**
   * @method currentMonth()
   * @param monthIndex (index of the selected month in UI)
   * @description: when the user select month then this func helps to compute for that particular month for example(Jan 1st to Jan 31st 2019).
   * @author karan
   */
  currentMonth(monthIndex) {
    const firstDate = new Date(this.selectedYear, monthIndex, 1);
    const lastDate = new Date(this.selectedYear, firstDate.getMonth() + 1, 0);
    const obj = {
      start: firstDate.getDate(),
      end: lastDate.getDate(),
      year: this.selectedYear,
      month: monthIndex
    }
    this.sendDate(obj);
  }

  /**
   * @method selectYears()
   * @param index (will get year index from year array)
   * @description: when the user click on year, doing the computations based on selected year but when the user is on week tab and select year 
   * then it should reflect the same weeks on that selected year
   * @author karan
   */
  selectYears(index) {
    this.active = index;
    let todayDate = new Date(this.selectedMonth);
    this.selectedYear = this.year[index];
    if (this.rangeType === 'year') {
      this.sendDate(this.selectedYear);
    } else if (this.rangeType === 'week' || this.rangeType === 'month') {
      this.selectMonth(this.selectedMonth.getMonth());
    } else if (this.rangeType === 'quarter') {

      let currentMonth = this.monthArray[todayDate.getMonth()];
      this.quarterArray.forEach(element => {
        let index = element.quarterInfo.indexOf(currentMonth);
        if (index >= 0) {
          this.sendDate(element);
        }
      });
    }
  }

  /**
   * @method selectMonth()
   * @param index (will get month index from monthArray)
   * @description: when the user click on monht, doing the computations based on selected month but when the user is on week tab and select month 
   * then it should reflect the same weeks on that selected year, month
   * @author karan
   */
  selectMonth(index) {
    this.selectedMonth = new Date(this.selectedYear, index, 1);
    this.Month = this.monthArray[index];
    let firstDate = new Date(this.selectedYear, index, 1);
    let lastDate = new Date(this.selectedYear, firstDate.getMonth() + 1, 0);
    if (this.rangeType === 'week') {
      if (this.showMonthCalendar) {
        this.active = this.monthArray[index];
      }
      this.showMonthCalendar = false; this.showYearCalendar = false;
      this.weeks = this.getWeeksInMonth(index, this.selectedYear);
    } else {
      const obj = {
        start: firstDate.getDate(),
        end: lastDate.getDate(),
        year: this.selectedYear,
        month: index
      };
      this.active = index;
      this.sendDate(obj);
    }

  }


  /**
   * @method getWeeksInMonth()
   * @param month : index of the selected month
   * @param year : year (ex: 2019) of the selected year
   * @description: to get how many weeks are there in a month and if the starting date of the month starts from wednesday then 1st week will be
   * wed,thurs,fri,sat,sun and pushing into weeks array and returning
   * @author karan
   */
  getWeeksInMonth(month, year) {
    this.weeks = [];
    let firstDate = new Date(year, month, 1);
    let lastDate = new Date(year, firstDate.getMonth() + 1, 0);
    let numDays = lastDate.getDate();
    let currentDate = new Date();
    if (currentDate.getMonth() === lastDate.getMonth() && currentDate.getFullYear() === lastDate.getFullYear()) {
      if (currentDate.getDate() <= lastDate.getDate()) {
        numDays = currentDate.getDate();
      }
    }

    let start = 1;
    let week = 0;
    let end = 8 - firstDate.getDay();
    while (start <= numDays) {
      this.weeks.push({ start: start, end: end, week: this.weekListText[week], year: firstDate.getFullYear(), month: firstDate.getMonth() });
      start = end + 1;
      end = end + 7;
      week = week + 1;
      if (end > numDays)
        end = numDays;
    }
    this.showWeeks = true;
    return this.weeks;
  }


  /**
   * @method decreaseYear()
   * @description: when the user click on descreaseYear btn then using the selectedYear we are decremnting the year array and reassinging to selected
   * year and calling range function for further compuations
   * @author karan
   */
  decreaseYear() {
    let x = this.year.indexOf(this.selectedYear);
    if (x > 0) {
      this.selectedYear = this.year[--x];
      this.range(this.rangeType);
    }
  }
  /**
 * @method decreaseMonth()
 * @description: when the user click on decreaseMonth btn then using the selectedMonth we are decremnting themonthArray and reassinging to 
 * selectedMonth and calling selectMonth function for further compuations
 * @author karan
 */
  decreaseMonth() {
    let x = this.selectedMonth.getMonth();
    if (x >= 0) {
      this.Month = this.monthArray[--x];
      this.selectMonth(x);
    }
  }
  /**
 * @method increaseYear()
 * @description: when the user click on increaseYear btn then using the selectedYear we are decremnting the year array and reassinging to 
 * selectedYear and calling range function for further compuations
 * @author karan
 */
  increaseYear() {

    let x = this.year.indexOf(this.selectedYear);
    if (x < this.year.length - 1) {
      this.selectedYear = this.year[++x];
      this.range(this.rangeType)
    }
  }
  /**
  * @method increaseMonth()
  * @description: when the user click on increaseMonth btn then using the selectedMonth we are decremnting the monthArray and reassinging to 
  * selectedMonth and calling selectMonth function for further compuations
  * @author karan
  */
  increaseMonth() {
    let x = this.selectedMonth.getMonth();
    if (x < this.monthArray.length - 1) {
      this.Month = this.monthArray[++x];
      this.selectMonth(x);
    }
  }

  /**
   * @method sendDate()
   * @param date (obj which contains month, date, startDate, endDate)
   * @description: this is where actual computation takes place and also to display from - to date in UI,
   * update graph in x axis as well based on how many weeks are there and dates in an month
   * and call sendIntialDate fn
   * @author karan
   */
  sendDate(date, index?) {
    this.xAxis = [];
    let fromDate;
    let toDate;
    if (this.rangeType === 'week' || this.rangeType === 'month') {
      fromDate = new Date(date.year, date.month, date.start);
      toDate = new Date(date.year, date.month, date.end);
    } else if (this.rangeType === 'year') {
      fromDate = new Date(this.selectedYear, 3, 1);
      toDate = new Date(this.selectedYear + 1, 2, 31);
    } else if (this.rangeType === 'quarter') {
      this.quarterInfo = date;
      fromDate = new Date(this.selectedYear, date.startMonth, date.startDate);
      this.active = index;
      toDate = new Date(this.selectedYear, date.endMonth, date.endDate);
      this.selectedMonth = toDate;
    }

    this.fromData = fromDate.getDate() + ' ' + this.monthArray[fromDate.getMonth()] + ' ' + fromDate.getFullYear();
    this.toData = toDate.getDate() + ' ' + this.monthArray[toDate.getMonth()] + ' ' + toDate.getFullYear();
    this.showCalendar = false;
    if (this.initialGraph) {
      this.updatedGraph = true;
      this.initialGraph = false;
    } else {
      this.updatedGraph = false;
      this.initialGraph = true;
    }
    let x = fromDate.getDate();
    let countDate = fromDate.getDate();
    let y = toDate.getDate();

    if (this.rangeType === 'week') {
      while (x <= y) {
        this.xAxis.push(countDate + ' ' + this.monthArray[fromDate.getMonth()]);
        countDate++;
        x++;
      }
      this.active = index;
    } else if (this.rangeType === 'month') {
      let from = fromDate.getDate();
      const to = toDate.getDate();
      while (from <= to) {
        this.xAxis.push(from + ' ' + this.monthArray[fromDate.getMonth()]);
        from++;
      }
    }
    this.sendIntialDate(fromDate, toDate);
  }

  /**
   * @method sendIntialDate()
   * @param fromDate (from Date)
   * @param toDate (to Date)
   * @description: putting all the things in an array and using subscribe sending to parent component
   * @author karan
   */
  sendIntialDate(fromDate, toDate) {
    this.array = [fromDate, toDate, this.updatedGraph, this.initialGraph, this.rangeType, this.quarterInfo, this.xAxis];
    this.dateInfo = this.array;
    this.fetchDate.dateInfoAdded.next(this.array);
  }

}

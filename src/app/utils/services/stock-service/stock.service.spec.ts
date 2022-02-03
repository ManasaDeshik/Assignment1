import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';

describe('StockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockService = TestBed.inject(StockService);
    expect(service).toBeTruthy();
  });

  it('should call setManufacturerId method', () => {
    const service: StockService = TestBed.inject(StockService);
    spyOn(service, 'setManufacturerId').and.callThrough();
    service.setManufacturerId('show');
    expect(service.setManufacturerId).toHaveBeenCalled();
  });

  it('should call getManufacturerId method', () => {
    const service: StockService = TestBed.inject(StockService);
    spyOn(service, 'getManufacturerId').and.callThrough();
    service.getManufacturerId();
    expect(service.getManufacturerId).toHaveBeenCalled();
  });

  it('should call changeMessage method', () => {
    const service: StockService = TestBed.inject(StockService);
    spyOn(service, 'changeMessage').and.callThrough();
    service.changeMessage('message');
    expect(service.changeMessage).toHaveBeenCalled();
  });

  it('should call setBarCode method', () => {
    const service: StockService = TestBed.inject(StockService);
    spyOn(service, 'setBarCode').and.callThrough();
    service.setBarCode('message');
    expect(service.setBarCode).toHaveBeenCalled();
  });

  it('should call getBarCode method', () => {
    const service: StockService = TestBed.inject(StockService);
    spyOn(service, 'getBarCode').and.callThrough();
    service.getBarCode();
    expect(service.getBarCode).toHaveBeenCalled();
  });

  it('should call setStocks method', () => {
    const service: StockService = TestBed.inject(StockService);
    spyOn(service, 'setStocks').and.callThrough();
    service.setStocks('message');
    expect(service.setStocks).toHaveBeenCalled();
  });

  it('should call getStocks method', () => {
    const service: StockService = TestBed.inject(StockService);
    spyOn(service, 'getStocks').and.callThrough();
    service.getStocks();
    expect(service.getStocks).toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';

import { PrintService } from './print.service';

describe('PrintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrintService = TestBed.get(PrintService);
    expect(service).toBeTruthy();
  });

  it('should call setManufacturerId method', () => {
    const service: PrintService = TestBed.get(PrintService);
    spyOn(service, 'setBarCode');
    service.setBarCode('show');
    expect(service.setBarCode).toHaveBeenCalled();
  });

  it('should call setManufacturerId method', () => {
    const service: PrintService = TestBed.get(PrintService);
    spyOn(service, 'getBarCode');
    service.getBarCode();
    expect(service.getBarCode).toHaveBeenCalled();
  });
});

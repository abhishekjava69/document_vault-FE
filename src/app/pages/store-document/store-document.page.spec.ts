import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { StoreDocumentPage } from './store-document.page';

describe('StoreDocumentPage', () => {
  let component: StoreDocumentPage;
  let fixture: ComponentFixture<StoreDocumentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDocumentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

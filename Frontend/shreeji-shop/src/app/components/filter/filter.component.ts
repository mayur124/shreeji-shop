import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Brand } from '../../models/brand.model';
import { forkJoin, Observable } from 'rxjs';
import { PriceRange } from 'src/app/models/priceRange.model';
import { CommonService } from 'src/app/services/common/common.service';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  searchClicked: boolean = false;
  moreBrandsClicked: boolean = false;
  brandsMap: { [letter: string]: Brand[] } = {};
  brandsMapCopy: { [letter: string]: Brand[] } = {};
  totalBrands: number = 0;
  brandInput: string = '';
  showClearAll: boolean = false;
  priceRange: PriceRange;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  @ViewChild('moreBrandsContainer') moreBrandsContainer: ElementRef;
  @ViewChild('allBrands') allBrands: ElementRef;
  @ViewChildren('brandLetter') brandLetter: QueryList<ElementRef>
  @ViewChildren('brandCb') brandCb: QueryList<ElementRef>

  @Input() clearAll: Observable<boolean>;
  @Output() selectedBrands: EventEmitter<string> = new EventEmitter();
  @Output() hideClearAll: EventEmitter<boolean> = new EventEmitter();
  @Output() priceRangeChange: EventEmitter<PriceRange> = new EventEmitter();

  constructor(
    private http: HttpService,
    private renderer2: Renderer2,
    private common: CommonService,
  ) {
    this.renderer2.listen('document', 'mousedown', (event: MouseEvent) => {
      if (!this.moreBrandsContainer?.nativeElement.contains(event.target)) {
        this.hideMoreBrandsContainer();
      }
    });
  }

  ngOnInit(): void {
    this.setBrands();
  }

  setBrands() {
    forkJoin([this.http.getAllBrands(), this.http.getPriceRange()]).subscribe(
      ((resp: any[]) => {
        const brandResponse = resp[0] as { brands: Brand[] };
        this.totalBrands = brandResponse.brands.length;
        this.brandsMap = this.getBrandsMap(brandResponse.brands);
        this.brandsMapCopy = this.getBrandsMap(brandResponse.brands);

        this.priceRange = JSON.parse(JSON.stringify(resp[1] as PriceRange));
        const inrAmount = this._getCurrentINRValue();
        this.priceRange.minPrice = this.priceRange.minPrice * inrAmount;
        this.priceRange.maxPrice = this.priceRange.maxPrice * inrAmount;
        this.selectedMinPrice = JSON.parse(JSON.stringify(this.priceRange.minPrice));
        this.selectedMaxPrice = JSON.parse(JSON.stringify(this.priceRange.maxPrice));
        this.options.floor = JSON.parse(JSON.stringify(this.priceRange.minPrice));
        this.options.ceil = JSON.parse(JSON.stringify(this.priceRange.maxPrice));
        this.priceRangeChange.emit(resp[1] as PriceRange);
      }),
      error => {
        console.log("Error in forkJoin > ", error);
      }
    );
  }

  fetchModels() {
    const brands = this.getSelectedBrands();
    const brandIds = brands.map(b => b.id).join(",");
    if (brandIds.length > 0) {
      this.showClearAll = true;
    } else {
      this.showClearAll = false;
    }
    this.selectedBrands.emit(brandIds);
  }

  private getSelectedBrands(): Brand[] {
    let selectedBrandsFromMap = new Array();
    for (const key in this.brandsMapCopy) {
      let checkedBrands = this.brandsMapCopy[key].filter(bm => bm.checked);
      if (checkedBrands.length > 0) {
        checkedBrands.forEach(cb => selectedBrandsFromMap.push(cb));
      }
    }
    return selectedBrandsFromMap;
  }

  getBrandsMap(brands: Brand[]) {
    return brands.reduce(
      (acc, brand) => ({
        ...acc,
        [brand.name.charAt(0).toUpperCase()]:
          acc[brand.name.charAt(0).toUpperCase()]
            ? acc[brand.name.charAt(0).toUpperCase()]
            : this.getModelList(brands, brand.name.charAt(0)),
      }),
      {}
    );
  }

  getModelList(brands: Brand[], firstChar: string) {
    return brands.filter(
      (brand) => brand.name.charAt(0).toUpperCase() == firstChar.toUpperCase()
    );
  }

  showMoreBrands() {
    this.moreBrandsClicked = true;
  }

  filterBrands() {
    this.brandsMapCopy = {};
    for (const i in this.brandsMap) {
      for (let j = 0; j < this.brandsMap[i].length; j++) {
        let filteredBrands = this.brandsMap[i].filter(b =>
          b.name.toLowerCase().indexOf(this.brandInput.toLowerCase()) > -1
        );
        if (filteredBrands.length > 0) {
          this.brandsMapCopy[i] = filteredBrands;
        }
      }
    }
  }

  handleInputText() {
    this.searchClicked = !this.searchClicked;
    this.brandInput = '';
    this.filterBrands();
  }

  scrollTo(index: number) {
    const el = this.brandLetter.find(bl => bl.nativeElement.id == 'brandId-' + index);
    const containerCoordinates = (this.allBrands.nativeElement as HTMLElement).getBoundingClientRect();
    const x = (el.nativeElement as HTMLElement).getBoundingClientRect().x;
    const scrollX = x - containerCoordinates.x - 20;
    (this.allBrands.nativeElement as HTMLElement).scrollBy({ left: scrollX });
  }

  reduceOpacity(index: number, key: string) {
    this.brandLetter.forEach(bl => {
      if (bl.nativeElement.id != 'brandId-' + index) {
        (bl.nativeElement as HTMLElement).style.opacity = '50%';
      }
    });
    this.brandCb.forEach(bCb => {
      if (bCb.nativeElement.id != 'brandCb-' + key) {
        (bCb.nativeElement as HTMLElement).style.opacity = '50%';
      }
    });
  }

  resetOpacity() {
    this.brandLetter.forEach(bl => {
      (bl.nativeElement as HTMLElement).style.opacity = '100%';
    });
    this.brandCb.forEach(bCb => {
      (bCb.nativeElement as HTMLElement).style.opacity = '100%';
    });
  }

  resetBrands() {
    this.hideMoreBrandsContainer();
    for (const i in this.brandsMapCopy) {
      this.brandsMapCopy[i].forEach(bm => bm.checked = false);
      this.brandsMap[i].forEach(bm => bm.checked = false);
    }
    this.selectedMinPrice = this.priceRange.minPrice;
    this.selectedMaxPrice = this.priceRange.maxPrice;
    this._emitPriceChange();
    this.showClearAll = false;
    this.fetchModels();
  }

  hideMoreBrandsContainer() {
    this.moreBrandsClicked = false;
  }

  private _debounce = (callback: Function, delay: number) => {
    let timeout: any
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(this, ...args), delay);
    };
  }

  onUserChange = this._debounce(() => {
    this.showClearAll = true;
    this._emitPriceChange();
  }, 500);

  private _emitPriceChange() {
    const priceRange = new PriceRange();
    const inrAmount = this._getCurrentINRValue();
    priceRange.minPrice = Math.round(this.selectedMinPrice / inrAmount);
    priceRange.maxPrice = Math.round(this.selectedMaxPrice / inrAmount);
    this.priceRangeChange.emit(priceRange);
  }

  private _getCurrentINRValue() {
    return this.common.getCurrentINRValue();
  }

}

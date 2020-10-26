import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Brand } from '../../models/brand.model';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.scss'],
})
export class BrandFilterComponent implements OnInit {
  searchClicked: boolean = false;
  moreBrandsClicked: boolean = false;
  brandsMap: { [letter: string]: Brand[] } = {};
  brandsMapCopy: { [letter: string]: Brand[] } = {};
  totalBrands: number = 0;
  brandInput: string = '';

  @ViewChild('moreBrandsContainer') moreBrandsContainer: ElementRef;
  @ViewChild('allBrands') allBrands: ElementRef;
  @ViewChildren('brandLetter') brandLetter: QueryList<ElementRef>
  @ViewChildren('brandCb') brandCb: QueryList<ElementRef>

  @Output()
  selectedBrands: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpService,
    private renderer2: Renderer2,
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
    this.http.getAllBrands().subscribe(
      (response: { brands: Brand[] }) => {
        this.totalBrands = response.brands.length;
        this.brandsMap = this.getBrandsMap(response.brands);
        this.brandsMapCopy = this.getBrandsMap(response.brands);
      },
      (error) => {
        console.log('Error while getting all brands > ', error);
      }
    );
  }

  fetchModels() {
    const selectedBrands = this.getSelectedBrands();
    const brandIds = selectedBrands.map(b => b.id).join(",");
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
    const y = (el.nativeElement as HTMLElement).getBoundingClientRect().y;
    const scrollX = x - containerCoordinates.x - 20;
    const scrollY = y - containerCoordinates.y;
    (this.allBrands.nativeElement as HTMLElement).scrollBy(scrollX, scrollY);
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
    this.brandsMapCopy = JSON.parse(JSON.stringify(this.brandsMap));
  }

  hideMoreBrandsContainer() {
    this.moreBrandsClicked = false;
  }
}

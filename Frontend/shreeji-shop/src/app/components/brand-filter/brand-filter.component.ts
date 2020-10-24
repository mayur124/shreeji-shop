import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Brand } from './brand.model';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.scss'],
})
export class BrandFilterComponent implements OnInit {
  brands: Brand[] = new Array();
  brandsCopy: Brand[] = new Array();
  searchClicked: boolean = false;
  moreBrandsClicked: boolean = false;
  brandsMap: { [letter: string]: Brand[] } = {};
  brandsMapCopy: { [letter: string]: Brand[] } = {};
  selectedBrands: number[];

  @ViewChild('moreBrandsContainer') moreBrandsContainer: ElementRef;
  @ViewChildren('brandLetter') brandLetter: QueryList<ElementRef>
  @ViewChildren('brandCb') brandCb: QueryList<ElementRef>

  constructor(
    private http: HttpService,
    private renderer2: Renderer2,
  ) {
    this.renderer2.listen('document', 'mousedown', (event: MouseEvent) => {
      if (!this.moreBrandsContainer?.nativeElement.contains(event.target)) {
        this.resetBrands();
      }
    });
  }

  ngOnInit(): void {
    this.setBrands();
  }

  setBrands() {
    this.http.getAllBrands().subscribe(
      (response: { brands: Brand[] }) => {
        this.brands = response.brands;
        this.brandsCopy = response.brands;
        this.brandsMap = this.getBrandsMap(response.brands);
        this.brandsMapCopy = this.getBrandsMap(response.brands);
      },
      (error) => {
        console.log('Error while getting all brands > ', error);
      }
    );
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

  filterBrands(event: any) {
    this.brandsCopy = this.brands.filter(
      (brand) =>
        brand.name
          .toLowerCase()
          .indexOf((event.target as HTMLInputElement).value.toLowerCase()) > -1
    );
  }

  filterMoreBrands(event: KeyboardEvent) {
    this.brandsMapCopy = {};
    for (const i in this.brandsMap) {
      for (let j = 0; j < this.brandsMap[i].length; j++) {
        let filteredBrands = this.brandsMap[i].filter(b =>
          b.name.toLowerCase().indexOf((event.target as HTMLInputElement).value.toLowerCase()) > -1
        );
        if (filteredBrands.length > 0) {
          this.brandsMapCopy[i] = filteredBrands;
        }
      }
    }
  }

  scrollTo(index: number) {
    const el = this.brandLetter.find(bl => bl.nativeElement.id == 'brandId-' + index);
    const containerCoordinates = (this.moreBrandsContainer.nativeElement as HTMLElement).getBoundingClientRect();
    const x = (el.nativeElement as HTMLElement).getBoundingClientRect().x;
    const y = (el.nativeElement as HTMLElement).getBoundingClientRect().y;
    const scrollX = x - containerCoordinates.x - 50;
    const scrollY = y - containerCoordinates.y;
    (this.moreBrandsContainer.nativeElement as HTMLElement).scrollBy(scrollX, scrollY);
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
    this.moreBrandsClicked = false;
    this.brandsCopy = [...this.brands];
  }
}

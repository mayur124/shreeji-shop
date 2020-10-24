import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  brandsMap: { [letter: string]: string[] } = {};
  selectedBrands: number[];

  @ViewChild('moreBrandsContainer') moreBrandsContainer: ElementRef;

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

  resetBrands() {
    this.moreBrandsClicked = false;
    this.brandsCopy = [...this.brands];
  }
}

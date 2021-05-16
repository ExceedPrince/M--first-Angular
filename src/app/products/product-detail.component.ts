import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service'

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product!: IProduct;
  allproducts!: IProduct[];
  errorMessage!: string;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProducts().subscribe({
			next: products => {
        this.allproducts = products;
        this.product = this.allproducts.filter((item: IProduct, index: number)=> item.productId === id)[0];
			},
			error : err => this.errorMessage = err
		});

    this.pageTitle += `: ${id}`;
  }

  onBack (): void {
    this.router.navigate(['/products']);
  }
}

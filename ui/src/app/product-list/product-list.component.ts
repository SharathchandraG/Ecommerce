import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.cartForm = this.fb.group({
      productId: [''],
      quantity: [1]
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('http://localhost:8080/api/products').subscribe(data => {
      this.products = data;
    });
  }

  addToCart(productId: number): void {
    this.cartForm.patchValue({ productId });
    this.http.post('http://localhost:8080/api/cart/add', this.cartForm.value).subscribe(() => {
      alert('Product added to cart!');
    }, error => {
      console.error("Error adding to cart", error);
      alert('Failed to add product to cart.');
    });
  }
}
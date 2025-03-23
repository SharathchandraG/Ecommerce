import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  products: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCartAndProducts();
  }

  fetchCartAndProducts(): void {
    this.http.get<CartItem[]>('http://localhost:8080/api/cart').subscribe(cartData => {
      this.cartItems = cartData;
      this.fetchProducts();
    });
  }

  fetchProducts(): void {
    this.http.get<any>('http://localhost:8080/api/products').subscribe(productData => {
      productData.forEach((product: any) => {
        this.products[product.id] = product;
      });
    });
  }

  getTotalCost(item: CartItem): number {
    return this.products[item.productId]?.price * item.quantity;
  }
}
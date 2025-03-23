package com.spendkey.ecommerce.controller;

import com.spendkey.ecommerce.model.CartItem;
import com.spendkey.ecommerce.model.Product;
import com.spendkey.ecommerce.repository.CartItemRepository;
import com.spendkey.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // Enable CORS for Angular
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @GetMapping("/products")
    public List<Product> getProducts() {
        if(productRepository.count() == 0) {
            productRepository.save(new Product("Laptop", 25000.00));
            productRepository.save(new Product("Mouse", 250.00));
            productRepository.save(new Product("Keyboard", 500.00));
            productRepository.save(new Product("Monitor", 8000.00));
            productRepository.save(new Product("Headphones", 1000.00));
        }
        return productRepository.findAll();
    }
}

package com.spendkey.ecommerce.controller;

import com.spendkey.ecommerce.model.CartItem;
import com.spendkey.ecommerce.repository.CartItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
class CartItemController {

    private final CartItemRepository cartItemRepository;

    public CartItemController(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @PostMapping("/cart/add")
    public void addToCart(@RequestBody CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }

    @GetMapping("/cart")
    public List<CartItem> getCartItems() {
        return cartItemRepository.findAll();
    }
}

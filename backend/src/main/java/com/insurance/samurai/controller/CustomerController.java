package com.insurance.samurai.controller;

import com.insurance.samurai.model.Customer;
import com.insurance.samurai.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "https://insurance-agent-samurai.onrender.com"
    }
)
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Get all customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // Get customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    // Search customers by name
    @GetMapping("/search/name")
    public ResponseEntity<List<Customer>> searchByName(
            @RequestParam String name) {
        return ResponseEntity.ok(customerService.searchByName(name));
    }

    // Search customers by phone
    @GetMapping("/search/phone")
    public ResponseEntity<List<Customer>> searchByPhone(
            @RequestParam String phone) {
        return ResponseEntity.ok(customerService.searchByPhone(phone));
    }

    // Search customers by email
    @GetMapping("/search/email")
    public ResponseEntity<List<Customer>> searchByEmail(
            @RequestParam String email) {
        return ResponseEntity.ok(customerService.searchByEmail(email));
    }

    // Create customer
    @PostMapping
    public ResponseEntity<Customer> createCustomer(
            @Valid @RequestBody Customer customer) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(customerService.createCustomer(customer));
    }

    // Update customer
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody Customer customer) {

        return ResponseEntity.ok(
                customerService.updateCustomer(id, customer)
        );
    }

    // Delete customer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
}
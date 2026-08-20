package com.insurance.samurai.service;

import com.insurance.samurai.model.Customer;
import com.insurance.samurai.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found with id: " + id));
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        Customer existingCustomer = getCustomerById(id);

        existingCustomer.setFullName(updatedCustomer.getFullName());
        existingCustomer.setDateOfBirth(updatedCustomer.getDateOfBirth());
        existingCustomer.setGender(updatedCustomer.getGender());
        existingCustomer.setPhone(updatedCustomer.getPhone());
        existingCustomer.setEmail(updatedCustomer.getEmail());
        existingCustomer.setAddress(updatedCustomer.getAddress());
        existingCustomer.setOccupation(updatedCustomer.getOccupation());
        existingCustomer.setAnnualIncome(updatedCustomer.getAnnualIncome());

        return customerRepository.save(existingCustomer);
    }

    public void deleteCustomer(Long id) {
        Customer customer = getCustomerById(id);
        customerRepository.delete(customer);
    }

    public List<Customer> searchByName(String name) {
        return customerRepository.findByFullNameContainingIgnoreCase(name);
    }

    public List<Customer> searchByPhone(String phone) {
        return customerRepository.findByPhone(phone);
    }

    public List<Customer> searchByEmail(String email) {
        return customerRepository.findByEmailIgnoreCase(email);
    }
}
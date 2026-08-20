package com.insurance.samurai.repository;

import com.insurance.samurai.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByFullNameContainingIgnoreCase(String fullName);

    List<Customer> findByPhone(String phone);

    List<Customer> findByEmailIgnoreCase(String email);
}
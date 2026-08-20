package com.insurance.samurai.repository;

import com.insurance.samurai.model.InsurancePolicy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InsurancePolicyRepository
        extends JpaRepository<InsurancePolicy, Long> {

    List<InsurancePolicy> findByPolicyNameContainingIgnoreCase(String policyName);

    List<InsurancePolicy> findByPolicyTypeIgnoreCase(String policyType);

    List<InsurancePolicy> findByActiveTrue();
}
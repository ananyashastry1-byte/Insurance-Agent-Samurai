package com.insurance.samurai.service;

import com.insurance.samurai.model.InsurancePolicy;
import com.insurance.samurai.repository.InsurancePolicyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {

    private final InsurancePolicyRepository policyRepository;

    public PolicyService(InsurancePolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    public List<InsurancePolicy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public List<InsurancePolicy> getActivePolicies() {
        return policyRepository.findByActiveTrue();
    }

    public InsurancePolicy getPolicyById(Long id) {
        return policyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Insurance policy not found with id: " + id));
    }

    public InsurancePolicy createPolicy(InsurancePolicy policy) {
        return policyRepository.save(policy);
    }

    public InsurancePolicy updatePolicy(Long id, InsurancePolicy updatedPolicy) {
        InsurancePolicy existingPolicy = getPolicyById(id);

        existingPolicy.setPolicyName(updatedPolicy.getPolicyName());
        existingPolicy.setPolicyType(updatedPolicy.getPolicyType());
        existingPolicy.setDescription(updatedPolicy.getDescription());
        existingPolicy.setBasePremium(updatedPolicy.getBasePremium());
        existingPolicy.setMinimumCoverage(updatedPolicy.getMinimumCoverage());
        existingPolicy.setMinimumAge(updatedPolicy.getMinimumAge());
        existingPolicy.setMaximumAge(updatedPolicy.getMaximumAge());
        existingPolicy.setActive(updatedPolicy.isActive());

        return policyRepository.save(existingPolicy);
    }

    public void deletePolicy(Long id) {
        InsurancePolicy policy = getPolicyById(id);
        policyRepository.delete(policy);
    }

    public List<InsurancePolicy> searchByName(String name) {
        return policyRepository.findByPolicyNameContainingIgnoreCase(name);
    }

    public List<InsurancePolicy> searchByType(String type) {
        return policyRepository.findByPolicyTypeIgnoreCase(type);
    }
}
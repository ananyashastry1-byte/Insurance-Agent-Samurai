package com.insurance.samurai.controller;

import com.insurance.samurai.model.InsurancePolicy;
import com.insurance.samurai.service.PolicyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "https://insurance-agent-samurai.onrender.com"
    }
)
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    // Get all policies
    @GetMapping
    public ResponseEntity<List<InsurancePolicy>> getAllPolicies() {
        return ResponseEntity.ok(policyService.getAllPolicies());
    }

    // Get active policies
    @GetMapping("/active")
    public ResponseEntity<List<InsurancePolicy>> getActivePolicies() {
        return ResponseEntity.ok(policyService.getActivePolicies());
    }

    // Get policy by ID
    @GetMapping("/{id}")
    public ResponseEntity<InsurancePolicy> getPolicyById(@PathVariable Long id) {
        return ResponseEntity.ok(policyService.getPolicyById(id));
    }

    // Search policies by name
    @GetMapping("/search/name")
    public ResponseEntity<List<InsurancePolicy>> searchByName(
            @RequestParam String name) {
        return ResponseEntity.ok(policyService.searchByName(name));
    }

    // Search policies by type
    @GetMapping("/search/type")
    public ResponseEntity<List<InsurancePolicy>> searchByType(
            @RequestParam String type) {
        return ResponseEntity.ok(policyService.searchByType(type));
    }

    // Create policy
    @PostMapping
    public ResponseEntity<InsurancePolicy> createPolicy(
            @Valid @RequestBody InsurancePolicy policy) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(policyService.createPolicy(policy));
    }

    // Update policy
    @PutMapping("/{id}")
    public ResponseEntity<InsurancePolicy> updatePolicy(
            @PathVariable Long id,
            @Valid @RequestBody InsurancePolicy policy) {
        return ResponseEntity.ok(
                policyService.updatePolicy(id, policy)
        );
    }

    // Delete policy
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePolicy(@PathVariable Long id) {
        policyService.deletePolicy(id);
        return ResponseEntity.noContent().build();
    }
}
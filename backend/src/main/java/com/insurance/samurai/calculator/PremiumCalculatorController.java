package com.insurance.samurai.calculator;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/premium")
@CrossOrigin(origins = "http://localhost:5173")
public class PremiumCalculatorController {

    private final PremiumCalculatorService calculatorService;

    public PremiumCalculatorController(
            PremiumCalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculatePremium(
            @Valid @RequestBody PremiumRequest request) {

        BigDecimal premium =
                calculatorService.calculatePremium(request);

        return ResponseEntity.ok(
                Map.of(
                        "insuranceType", request.getInsuranceType(),
                        "age", request.getAge(),
                        "coverageAmount", request.getCoverageAmount(),
                        "policyTerm", request.getPolicyTerm(),
                        "estimatedMonthlyPremium", premium,
                        "note", "This is an illustrative estimate for the Insurance Agent Samurai project."
                )
        );
    }
}
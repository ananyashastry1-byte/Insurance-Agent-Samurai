package com.insurance.samurai.calculator;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class PremiumCalculatorService {

    public BigDecimal calculatePremium(PremiumRequest request) {

        BigDecimal coverage = request.getCoverageAmount();

        BigDecimal baseRate;

        switch (request.getInsuranceType().toLowerCase()) {
            case "life":
                baseRate = new BigDecimal("0.02");
                break;

            case "health":
                baseRate = new BigDecimal("0.025");
                break;

            case "vehicle":
                baseRate = new BigDecimal("0.03");
                break;

            case "home":
                baseRate = new BigDecimal("0.015");
                break;

            default:
                baseRate = new BigDecimal("0.02");
        }

        // Age adjustment
        BigDecimal ageFactor;

        if (request.getAge() <= 30) {
            ageFactor = new BigDecimal("1.00");
        } else if (request.getAge() <= 50) {
            ageFactor = new BigDecimal("1.20");
        } else {
            ageFactor = new BigDecimal("1.50");
        }

        // Term adjustment
        BigDecimal termFactor;

        if (request.getPolicyTerm() <= 10) {
            termFactor = new BigDecimal("1.00");
        } else if (request.getPolicyTerm() <= 20) {
            termFactor = new BigDecimal("1.10");
        } else {
            termFactor = new BigDecimal("1.20");
        }

        BigDecimal premium = coverage
                .multiply(baseRate)
                .multiply(ageFactor)
                .multiply(termFactor)
                .divide(BigDecimal.valueOf(12), 2, RoundingMode.HALF_UP);

        return premium.setScale(2, RoundingMode.HALF_UP);
    }
}
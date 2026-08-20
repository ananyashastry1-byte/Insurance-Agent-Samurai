package com.insurance.samurai.calculator;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class PremiumRequest {

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 80, message = "Age cannot exceed 80")
    private Integer age;

    @NotBlank(message = "Insurance type is required")
    private String insuranceType;

    @NotNull(message = "Coverage amount is required")
    @DecimalMin(value = "10000.0", message = "Coverage must be at least 10,000")
    private BigDecimal coverageAmount;

    @NotNull(message = "Policy term is required")
    @Min(value = 1, message = "Policy term must be at least 1 year")
    @Max(value = 50, message = "Policy term cannot exceed 50 years")
    private Integer policyTerm;

    public PremiumRequest() {
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getInsuranceType() {
        return insuranceType;
    }

    public void setInsuranceType(String insuranceType) {
        this.insuranceType = insuranceType;
    }

    public BigDecimal getCoverageAmount() {
        return coverageAmount;
    }

    public void setCoverageAmount(BigDecimal coverageAmount) {
        this.coverageAmount = coverageAmount;
    }

    public Integer getPolicyTerm() {
        return policyTerm;
    }

    public void setPolicyTerm(Integer policyTerm) {
        this.policyTerm = policyTerm;
    }
}
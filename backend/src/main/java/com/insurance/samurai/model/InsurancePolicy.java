package com.insurance.samurai.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "insurance_policies")
public class InsurancePolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String policyName;

    @NotBlank
    private String policyType;

    @NotBlank
    @Column(length = 1000)
    private String description;

    @NotNull
    @DecimalMin(value = "0.0")
    private BigDecimal basePremium;

    @NotNull
    @DecimalMin(value = "0.0")
    private BigDecimal minimumCoverage;

    private Integer minimumAge;
    private Integer maximumAge;

    private boolean active = true;

    public InsurancePolicy() {
    }

    public Long getId() {
        return id;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getBasePremium() {
        return basePremium;
    }

    public void setBasePremium(BigDecimal basePremium) {
        this.basePremium = basePremium;
    }

    public BigDecimal getMinimumCoverage() {
        return minimumCoverage;
    }

    public void setMinimumCoverage(BigDecimal minimumCoverage) {
        this.minimumCoverage = minimumCoverage;
    }

    public Integer getMinimumAge() {
        return minimumAge;
    }

    public void setMinimumAge(Integer minimumAge) {
        this.minimumAge = minimumAge;
    }

    public Integer getMaximumAge() {
        return maximumAge;
    }

    public void setMaximumAge(Integer maximumAge) {
        this.maximumAge = maximumAge;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
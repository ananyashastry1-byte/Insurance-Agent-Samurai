package com.insurance.samurai.repository;

import com.insurance.samurai.model.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgentRepository extends JpaRepository<Agent, Long> {

    Optional<Agent> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);
}
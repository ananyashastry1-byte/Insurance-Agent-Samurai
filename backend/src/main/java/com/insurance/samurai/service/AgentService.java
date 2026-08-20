package com.insurance.samurai.service;

import com.insurance.samurai.model.Agent;
import com.insurance.samurai.repository.AgentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AgentService {

    private final AgentRepository agentRepository;
    private final PasswordEncoder passwordEncoder;

    public AgentService(
            AgentRepository agentRepository,
            PasswordEncoder passwordEncoder) {

        this.agentRepository = agentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Agent registerAgent(Agent agent) {

        if (agentRepository.existsByEmailIgnoreCase(agent.getEmail())) {
            throw new RuntimeException(
                    "An agent with this email already exists"
            );
        }

        agent.setPassword(
                passwordEncoder.encode(agent.getPassword())
        );

        return agentRepository.save(agent);
    }

    public Agent findByEmail(String email) {

        return agentRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Agent not found with email: " + email
                        ));
    }

    public boolean authenticate(String email, String password) {

        Agent agent = findByEmail(email);

        return passwordEncoder.matches(
                password,
                agent.getPassword()
        );
    }
}
package com.insurance.samurai.controller;

import com.insurance.samurai.model.Agent;
import com.insurance.samurai.service.AgentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/agents")
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "https://insurance-agent-samurai.onrender.com"
    }
)
public class AgentController {

    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody Agent agent) {

        try {
            Agent registeredAgent =
                    agentService.registerAgent(agent);

            registeredAgent.setPassword(null);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(registeredAgent);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> loginRequest) {

        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        try {
            boolean authenticated =
                    agentService.authenticate(email, password);

            if (authenticated) {
                Agent agent = agentService.findByEmail(email);
                agent.setPassword(null);

                return ResponseEntity.ok(
                        Map.of(
                                "message", "Login successful",
                                "agent", agent
                        )
                );
            }

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }
    }
}
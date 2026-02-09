package com.jspider.OnlineBookStore.controller;

import com.jspider.OnlineBookStore.dto.*;
import com.jspider.OnlineBookStore.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

	private final AuthService service;

	public AuthController(AuthService service) {
		this.service = service;
	}

	@PostMapping("/register")
	public UserResponseDTO register(@RequestBody RegisterRequestDTO dto) {
		return service.register(dto);
	}

	@PostMapping("/login")
	public UserResponseDTO login(@RequestBody LoginRequestDTO dto) {
		return service.login(dto);
	}
}

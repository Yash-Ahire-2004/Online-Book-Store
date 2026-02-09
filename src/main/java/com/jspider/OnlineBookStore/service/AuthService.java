package com.jspider.OnlineBookStore.service;

import com.jspider.OnlineBookStore.dto.*;
import com.jspider.OnlineBookStore.exception.InvalidRequestException;
import com.jspider.OnlineBookStore.model.User;
import com.jspider.OnlineBookStore.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final UserRepository repo;

	private final BCryptPasswordEncoder encoder;

	public AuthService(UserRepository repo, BCryptPasswordEncoder encoder) {
		this.repo = repo;
		this.encoder = encoder;
	}

	// REGISTER
	public UserResponseDTO register(RegisterRequestDTO dto) {

		if (repo.findByEmail(dto.getEmail()).isPresent()) {
			throw new InvalidRequestException("Email already exists");
		}

		if (repo.findByUsername(dto.getUsername()).isPresent()) {
			throw new InvalidRequestException("Username already exists");
		}

		User user = new User();
		user.setUsername(dto.getUsername());
		user.setEmail(dto.getEmail());
		user.setPassword(encoder.encode(dto.getPassword()));

		User saved = repo.save(user);

		return new UserResponseDTO(saved.getId(), saved.getUsername(), saved.getEmail());
	}

	// LOGIN
	public UserResponseDTO login(LoginRequestDTO dto) {

		User user = repo.findByEmail(dto.getEmail()).orElseThrow(() -> new InvalidRequestException("Invalid email"));

		if (!encoder.matches(dto.getPassword(), user.getPassword())) {
			throw new InvalidRequestException("Invalid password");
		}

		return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
	}

}

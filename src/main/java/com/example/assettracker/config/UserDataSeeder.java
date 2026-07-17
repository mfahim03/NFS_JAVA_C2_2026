package com.example.assettracker.config;

import com.example.assettracker.model.AppUser;
import com.example.assettracker.repository.AppUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(UserDataSeeder.class);
    private static final String ADMIN_EMAIL = "admin@example.com";

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDataSeeder(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (appUserRepository.existsByEmailIgnoreCase(ADMIN_EMAIL)) {
            logger.info("Skipping admin seed. User already exists: {}", ADMIN_EMAIL);
            return;
        }

        AppUser admin = new AppUser(
                "Admin User",
                ADMIN_EMAIL,
                passwordEncoder.encode("Admin@12345"),
                "ADMIN"
        );

        appUserRepository.save(admin);
        logger.info("Seeded admin user: {}", ADMIN_EMAIL);
    }
}

package com.even.controller;

import com.even.entity.Settings;
import com.even.entity.user;
import com.even.repository.SettingsRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {


private final SettingsRepository settingsRepository;

public SettingsController(
        SettingsRepository settingsRepository) {

    this.settingsRepository =
            settingsRepository;
}

@GetMapping
public ResponseEntity<Settings> getSettings(
        Authentication authentication) {

    user user =
            (user) authentication.getPrincipal();

    Settings settings =
            settingsRepository
                    .findByUserId(user.getId())
                    .orElseGet(() -> {

                        Settings newSettings =
                                new Settings();

                        newSettings.setUserId(
                                user.getId());

                        return settingsRepository
                                .save(newSettings);
                    });

    return ResponseEntity.ok(settings);
}

@PutMapping
public ResponseEntity<Settings> updateSettings(
        @RequestBody Settings request,
        Authentication authentication) {

    user user =
            (user) authentication.getPrincipal();

    Settings settings =
            settingsRepository
                    .findByUserId(user.getId())
                    .orElseGet(() -> {

                        Settings newSettings =
                                new Settings();

                        newSettings.setUserId(
                                user.getId());

                        return newSettings;
                    });

    if (request.getCurrency() != null) {
        settings.setCurrency(
                request.getCurrency());
    }

    settings.setEmailNotifications(
            request.isEmailNotifications());

    settings.setExpenseNotifications(
            request.isExpenseNotifications());

    if (request.getTheme() != null) {
        settings.setTheme(
                request.getTheme());
    }

    settings.setUserId(user.getId());

    return ResponseEntity.ok(
            settingsRepository.save(settings));
}


}

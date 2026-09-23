package com.even.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_settings")
public class Settings {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nullable = false, unique = true)
private Long userId;

@Column(nullable = false)
private String currency = "INR";

@Column(nullable = false)
private boolean emailNotifications = true;

@Column(nullable = false)
private boolean expenseNotifications = true;

@Column(nullable = false)
private String theme = "light";

public Settings() {
}

public Settings(
        Long userId,
        String currency,
        boolean emailNotifications,
        boolean expenseNotifications,
        String theme) {

    this.userId = userId;
    this.currency = currency;
    this.emailNotifications = emailNotifications;
    this.expenseNotifications = expenseNotifications;
    this.theme = theme;
}

public Long getId() {
    return id;
}

public Long getUserId() {
    return userId;
}

public void setUserId(Long userId) {
    this.userId = userId;
}

public String getCurrency() {
    return currency;
}

public void setCurrency(String currency) {
    this.currency = currency;
}

public boolean isEmailNotifications() {
    return emailNotifications;
}

public void setEmailNotifications(
        boolean emailNotifications) {

    this.emailNotifications = emailNotifications;
}

public boolean isExpenseNotifications() {
    return expenseNotifications;
}

public void setExpenseNotifications(
        boolean expenseNotifications) {

    this.expenseNotifications =
            expenseNotifications;
}

public String getTheme() {
    return theme;
}

public void setTheme(String theme) {
    this.theme = theme;
}


}

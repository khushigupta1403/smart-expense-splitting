package com.even.controller;

import com.even.entity.Expense;
import com.even.entity.ExpenseSplit;
import com.even.entity.user;
import com.even.service.ExpenseService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ExpenseController {


private final ExpenseService expenseService;

public ExpenseController(ExpenseService expenseService) {
    this.expenseService = expenseService;
}

@PostMapping("/groups/{groupId}/expenses")
public ResponseEntity<?> createExpense(
        @PathVariable Long groupId,
        @RequestBody Map<String, Object> request,
        Authentication authentication) {

    try {

        user user =
                (user) authentication.getPrincipal();

        String title =
                (String) request.get("title");

        String description =
                (String) request.get("description");

        BigDecimal amount =
                new BigDecimal(
                        request.get("amount").toString()
                );

        String splitType =
                (String) request.get("splitType");

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> splits =
                (List<Map<String, Object>>)
                        request.get("splits");

        Expense expense =
                expenseService.createExpense(
                        groupId,
                        user.getId(),
                        title,
                        description,
                        amount,
                        splitType,
                        splits
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(expense);

    } catch (RuntimeException e) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                e.getMessage()
        );

        return ResponseEntity
                .badRequest()
                .body(response);
    }
}

@GetMapping("/groups/{groupId}/expenses")
public ResponseEntity<?> getGroupExpenses(
        @PathVariable Long groupId) {

    List<Expense> expenses =
            expenseService.getGroupExpenses(groupId);

    return ResponseEntity.ok(expenses);
}

@GetMapping("/expenses/{id}")
public ResponseEntity<?> getExpense(
        @PathVariable Long id) {

    try {

        return ResponseEntity.ok(
                expenseService.getExpense(id)
        );

    } catch (RuntimeException e) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}

@GetMapping("/expenses/{id}/splits")
public ResponseEntity<?> getExpenseSplits(
        @PathVariable Long id) {

    try {

        List<ExpenseSplit> splits =
                expenseService.getExpenseSplits(id);

        return ResponseEntity.ok(splits);

    } catch (RuntimeException e) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}

@PutMapping("/expenses/{id}")
public ResponseEntity<?> updateExpense(
        @PathVariable Long id,
        @RequestBody Map<String, Object> request) {

    try {

        String title =
                (String) request.get("title");

        String description =
                (String) request.get("description");

        BigDecimal amount = null;

        if (request.get("amount") != null) {

            amount = new BigDecimal(
                    request.get("amount").toString()
            );
        }

        String splitType =
                (String) request.get("splitType");

        Expense expense =
                expenseService.updateExpense(
                        id,
                        title,
                        description,
                        amount,
                        splitType
                );

        return ResponseEntity.ok(expense);

    } catch (RuntimeException e) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                e.getMessage()
        );

        return ResponseEntity
                .badRequest()
                .body(response);
    }
}

@DeleteMapping("/expenses/{id}")
public ResponseEntity<?> deleteExpense(
        @PathVariable Long id) {

    try {

        expenseService.deleteExpense(id);

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Expense deleted successfully"
        );

        return ResponseEntity.ok(response);

    } catch (RuntimeException e) {

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                e.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}

}

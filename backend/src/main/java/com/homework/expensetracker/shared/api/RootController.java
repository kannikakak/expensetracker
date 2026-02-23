package com.homework.expensetracker.shared.api;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

  @GetMapping("/")
  public Map<String, String> root() {
    return Map.of(
      "status", "ok",
      "message", "Expense backend is running. Use /api/expenses and /api/expenses/health"
    );
  }
}

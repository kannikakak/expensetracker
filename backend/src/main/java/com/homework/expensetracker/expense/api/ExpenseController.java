package com.homework.expensetracker.expense.api;

import com.homework.expensetracker.expense.model.Expense;
import com.homework.expensetracker.expense.repository.ExpenseRepository;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

  private final ExpenseRepository expenseRepository;

  public ExpenseController(ExpenseRepository expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  @GetMapping
  public List<ExpenseResponse> listExpenses() {
    return expenseRepository.findAllByOrderByDateDescIdDesc().stream()
      .map(this::toResponse)
      .toList();
  }

  @PostMapping
  public ResponseEntity<ExpenseResponse> createExpense(@Valid @RequestBody ExpenseRequest request) {
    Expense expense = new Expense();
    expense.setTitle(request.title().trim());
    expense.setAmount(request.amount());
    expense.setCategory(request.category());
    expense.setDate(request.date());

    Expense saved = expenseRepository.save(expense);
    return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(saved));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
    UUID expenseId;
    try {
      expenseId = UUID.fromString(id);
    } catch (IllegalArgumentException exception) {
      return ResponseEntity.notFound().build();
    }

    if (!expenseRepository.existsById(expenseId)) {
      return ResponseEntity.notFound().build();
    }

    expenseRepository.deleteById(expenseId);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/health")
  public Map<String, String> health() {
    return Map.of("status", "ok");
  }

  private ExpenseResponse toResponse(Expense expense) {
    return new ExpenseResponse(
      expense.getId().toString(),
      expense.getTitle(),
      expense.getAmount(),
      expense.getCategory(),
      expense.getDate()
    );
  }
}

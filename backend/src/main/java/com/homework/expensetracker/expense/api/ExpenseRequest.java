package com.homework.expensetracker.expense.api;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest(
  @NotBlank @Size(max = 60) String title,
  @NotNull @DecimalMin("0.01") @Digits(integer = 10, fraction = 2) BigDecimal amount,
  @NotBlank @Pattern(regexp = "Food|Transport|Rent|Utilities|Entertainment|Other") String category,
  @NotNull LocalDate date
) {
}

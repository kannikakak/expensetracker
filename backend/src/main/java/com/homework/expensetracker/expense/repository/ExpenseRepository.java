package com.homework.expensetracker.expense.repository;

import com.homework.expensetracker.expense.model.Expense;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, UUID> {

  List<Expense> findAllByOrderByDateDescIdDesc();
}

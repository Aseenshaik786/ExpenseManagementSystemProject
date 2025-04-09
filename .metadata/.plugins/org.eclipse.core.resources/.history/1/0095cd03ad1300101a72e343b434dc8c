package com.infosys.expenseManagementApplication.dao;

import java.util.List;

import com.infosys.expenseManagementApplication.bean.Expense;

public interface ExpenseDao {

public void save(Expense expense);
public List<Expense> getAllExpenses();
public Expense getExpenseById(String id); 
public void deleteExpenseById(String id);
public List<Expense> getExpensesByCategory (Long categoryId);
public List<Expense> getExpensesByCustomer (String customerId);
public String generateExpenseId();
}
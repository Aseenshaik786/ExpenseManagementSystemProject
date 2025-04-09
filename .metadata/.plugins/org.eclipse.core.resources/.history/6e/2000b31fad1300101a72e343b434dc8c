package com.infosys.expenseManagementApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.Expense;
@Service
@Repository
public class ExpenseDaoImpl implements ExpenseDao{
	@Autowired
	private ExpenseRepository repository;

	@Override
	public void save(Expense expense) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Expense> getAllExpenses() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Expense getExpenseById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteExpenseById(String id) {
		// TODO Auto-generated method stub
		
		
	}

	@Override
	public List<Expense> getExpensesByCategory(Long categoryId) {
		// TODO Auto-generated method stub
		return repository.getExpensesByCategory(categoryId);
	}

	@Override
	public List<Expense> getExpensesByCustomer(String customerId) {
		// TODO Auto-generated method stub
		return repository.getExpensesByCustomer(customerId);
	}

	@Override
	public String generateExpenseId() {
		
		Long id=0L;
		String val=repository.getMaxId();
		if(val==null)
			id=100001L;
		else {
			id=Long.parseLong(val.substring(2));
			id++;
		}
		String newId="Ex"+id;
		return newId;
		
	}

}
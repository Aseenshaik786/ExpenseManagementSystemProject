package com.infosys.expenseManagementApplication.service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.CustomerExpense;
import com.infosys.expenseManagementApplication.bean.Expense;
import com.infosys.expenseManagementApplication.dao.ExpenseDao;

@Service
public class CustomerExpenseService {
	@Autowired
	private ExpenseDao expenseDao;
	
	public List<CustomerExpense> getCategorywiseCustomerExpense(String customerId){
		List<Expense> expenseList=expenseDao.getExpensesByCustomer(customerId);
		HashMap<Long,Double> expenseMap=new HashMap<>();
		for(Expense expense:expenseList) {
			Long id=expense.getCategoryId();
			Double amount=expense.getAmount();
			if(expenseMap.containsKey(id)) {
				Double temp=expenseMap.get(id);
				amount=amount+temp;
				expenseMap.put(id, amount);
			}
			else {
				expenseMap.put(id, amount);
			}
		}
			List<CustomerExpense> custExpList=new ArrayList<>();
			Set<Long> categorySet=expenseMap.keySet();
			for(Long cid:categorySet) {
				CustomerExpense custExp=new CustomerExpense(cid,expenseMap.get(cid));
				custExpList.add(custExp);
			}
			return custExpList;
			
		
		
	}
}
package com.infosys.expenseManagementApplication.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.infosys.expenseManagementApplication.bean.Customer;
public interface CustomerRepository extends JpaRepository<Customer, String>{
	@Query("select max(customerId) from Customer")
	public String getMaxCustomerId();
	
	@Query("select a from Customer a where a.status='true'")
	public List<Customer> getCurrentCustomers();
	
	@Query("select status from Customer where username=?1")
	public String getCustomerStatusByUsername(String username);
	
	@Query("select a from Customer a where username=?1")
	public Customer getCustomerByUsername(String username);
	
	
}

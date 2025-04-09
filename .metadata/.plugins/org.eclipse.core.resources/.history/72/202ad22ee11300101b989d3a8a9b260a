package com.infosys.expenseManagementApplication.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.Customer;
import com.infosys.expenseManagementApplication.dao.CustomerDao;

import com.infosys.expenseManagementApplication.dao.CustomerRepository;
import java.util.List;
import java.util.Optional;

@Service
@Repository  
public class CustomerDaoImpl implements CustomerDao {

    @Autowired
    private CustomerRepository customerRepository;
    

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(String id) {
        
        return customerRepository.findById(id).get();
    }

   

    
	@Override
	public Customer save(Customer customer) {

		return customerRepository.save(customer);
		
	}

	@Override
	public String generateCustomerId() {

		Long id=0L;
		String val=customerRepository.getMaxCustomerId();
		if(val==null)
			id=100001L;
		else {
			id=Long.parseLong(val.substring(1));
			id++;
		}
		String newId="C"+id;
		return newId;
		
	}

	@Override
	public List<Customer> getCurrentCustomers() {

		return customerRepository.getCurrentCustomers();
	}

	@Override
	public String getCustomerStatusByUsername(String username) {
		
		return customerRepository.getCustomerStatusByUsername(username);
	}

	@Override
	public Customer getCustomerByUsername(String username) {
		
		return customerRepository.getCustomerByUsername(username);
	}

	
}

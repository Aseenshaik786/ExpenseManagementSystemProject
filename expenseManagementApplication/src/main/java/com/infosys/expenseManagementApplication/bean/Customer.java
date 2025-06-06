package com.infosys.expenseManagementApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Customer {
    @Id
    private String customerId;
    private String username;
    private String customerName;
    private String email;
    private String address;
    private Long mobile;
    private String occupation;
    private String status;

    public Customer() {
        super();
    }

   

    public Customer(String customerId, String username, String customerName, String email, String address, Long mobile,
			String occupation, String status) {
		super();
		this.customerId = customerId;
		this.username = username;
		this.customerName = customerName;
		this.email = email;
		this.address = address;
		this.mobile = mobile;
		this.occupation = occupation;
		this.status = status;
	}



	public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    

    public String getCustomerName() {
		return customerName;
	}



	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}



	public String getAddress() {
		return address;
	}



	public void setAddress(String address) {
		this.address = address;
	}



	public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getMobile() {
        return mobile;
    }

    public void setMobile(Long mobile) {
        this.mobile = mobile;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    
}
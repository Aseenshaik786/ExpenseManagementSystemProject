package com.infosys.expenseManagementApplication.bean;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import  java.util.*;

import  jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ExpenseUser extends User{
	@Id
	private String username;
	private String password;
	private String category;
	private String email;
	public ExpenseUser() {
		super("abc","pqr",new ArrayList<>());
		}
	public ExpenseUser(String username, String password, Collection<? extends GrantedAuthority> authorities,
			String username2, String email2, String password2, String category2) {
		super(username, password, authorities);
		this.username = username2;
		this.password = password2;
		this.category = category2;
		this.email = email2;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "ExpenseUser [username=" + username + ", password=" + password + ", category=" + category + ", email="
				+ email + "]";
	}

	
	
	
	}
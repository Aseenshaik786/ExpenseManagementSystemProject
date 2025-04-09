package com.infosys.expenseManagementApplication.dao;

import java.util.List;
import java.util.Locale.Category;

public interface CategoryDao {
	
	public void save(Category category);
	public com.infosys.expenseManagementApplication.bean.Category getCategoryById(Long id);
	public void deleteCategoryById(Long id);
	public List<com.infosys.expenseManagementApplication.bean.Category> getAllCategories();
	public com.infosys.expenseManagementApplication.bean.Category getCategoryByName(String categoryName);
	void save(com.infosys.expenseManagementApplication.bean.Category category);
	
	public long generateCategoryId();

}
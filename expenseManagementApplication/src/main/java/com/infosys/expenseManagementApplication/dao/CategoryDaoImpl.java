package com.infosys.expenseManagementApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.expenseManagementApplication.bean.Category;
@Service
@Repository

public class CategoryDaoImpl implements CategoryDao {
	@Autowired
	private CategoryRepository repository;
	

	@Override
	public void save(Category category) {
		repository.save(category);
	}

	@Override
	public Category getCategoryById(Long id) {
		return repository.findById(id).get();
	}

	@Override
	public void deleteCategoryById(Long id) {
		repository.deleteById(id);
	}

	@Override
	public List<Category> getAllCategories() {
		return repository.findAll();
	}

	@Override
	public long generateCategoryId() {
		Long id=repository.getMaxCategory();
		if(id==null) {
			id=1001L;
		}
		else {
			id++;
		}
		return id;
	}

	@Override
	public void save(java.util.Locale.Category category) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Category getCategoryByName(String categoryName) {
		// TODO Auto-generated method stub
		return null;
	}


	


}
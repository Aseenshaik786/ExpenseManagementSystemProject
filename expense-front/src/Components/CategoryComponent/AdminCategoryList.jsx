import React,{useState,useEffect} from "react"
 
import { useNavigate,Link} from 'react-router-dom';
import '../../LoginView.css';
import {displayAllCategories,deleteCategoryById } from '../../Services/CategoryService';


const AdminCategoryList=()=>{
    const [categories,setCategories]=useState([]);
    let navigate=useNavigate();


    const setCategoryData=()=>{
        displayAllCategories().then((response)=>{
                setCategories(response.data);
            });
        }

useEffect(() => {
    setCategoryData()
}, []);

const returnBack=()=>{
    navigate('/AdminMenu');
}


const removeCategory=(id)=>{
    deleteCategoryById(id).then( res => {
        let remainCategory=categories.filter((category) => (category.categoryId !== id));
     setCategories(remainCategory);
   });
  navigate('/admin-category-list');
}

return (
    <div
      style={{
        backgroundImage:
          "url('https://www.streebo.com/wp-content/themes/streebo/images/LangingPage/Expense-Management-Cloud-DXA/Expense-Management-Cloud-DXA-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "40px",
      }}
    >
      <div
        className="card"
        style={{
          width: "90%",
          maxWidth: "1100px",
          backgroundColor: "rgba(30, 42, 62, 0.8)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          color: "#f1f1f1",
        }}
      >
        <h2
          style={{
            color: "#f7dc6f",
            fontSize: "32px",
            textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          <u>Admin Category List</u>
        </h2>
        <hr
          style={{
            border: "none",
            height: "4px",
            backgroundColor: "#e67e22",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        />
        <div style={{ overflowX: "auto" }}>
          <table className="table table-bordered table-hover text-center">
            <thead style={{ backgroundColor: "#06dacf" }}>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.categoryId} style={{ backgroundColor: "#8af0f2" }}>
                  <td>{category.categoryId}</td>
                  <td>{category.categoryName}</td>
                  <td>{category.description}</td>
                  <td>
                    <Link to={`/update-category/${category.categoryId}`}>
                      <button className="btn btn-warning btn-sm" style={{ width: "80px" }}>
                        Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCategory(category.categoryId)}
                      style={{ width: "80px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <button
          className="btn"
          onClick={returnBack}
          style={{
            backgroundColor: "#27ae60",
            color: "#fff",
            width: "160px",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        >
          Return
        </button>
      </div>
    </div>
  );
  

}

export default AdminCategoryList;
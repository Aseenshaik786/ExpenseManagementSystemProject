import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import CustomerMenu from "./Components/LoginComponent/CustomerMenu";
import CategoryAddition from "./Components/CategoryComponent/CategoryAddition";
import AdminCategoryList from "./Components/CategoryComponent/AdminCategoryList";
import CategoryUpdate from "./Components/CategoryComponent/CategoryUpdate";
import CustomerCategoryList from "./Components/CategoryComponent/CustomerCategoryList";
import CustomerAddition from "./Components/CustomerComponent/CustomerAddition";
import CustomerList from "./Components/CustomerComponent/CustomerList";
import CustomerUpdate from "./Components/CustomerComponent/CustomerUpdate";
import CustomerDetails from "./Components/CustomerComponent/CustomerDetails";
import CustomerCurrent from "./Components/CustomerComponent/CustomerCurrent";
import ExpenseEntry from "./Components/ExpenseComponent/ExpenseEntry";
import ExpenseListCustomer from "./Components/ExpenseComponent/ExpenseList";
import ExpenseUpdate from "./Components/ExpenseComponent/ExpenseUpdate";
import CustomerExpenses from "./Components/ExpenseComponent/CustomerExpenses";

import AdminExpenseReport from "./Components/ExpenseComponent/AdminExpenseReport";
import ExpenseBarChart from "./Components/ExpenseComponent/ExpenseBarChart";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Default Login Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Registration */}
          <Route path="/Register" element={<RegisterUser />} />

          {/* Admin Routes */}
          <Route path="/AdminMenu" element={<AdminMenu />} />

          {/* Customer Routes */}
          <Route path="/CustomerMenu" element={<CustomerMenu />} />
          <Route path="/customer-add" element={<CustomerAddition />} />
          <Route path="/customer-list" element={<CustomerList />} />
          <Route path="/customer-update/:customerId" element={<CustomerUpdate />} />
          <Route path="/current-customer" element={<CustomerCurrent />} />

          {/* Ensure Customer Details Route has a Dynamic ID */}
          <Route path="/customer-details/:customerId" element={<CustomerDetails />} />

          {/* Category Routes */}
          <Route path="/category-add" element={<CategoryAddition />} />
          <Route path="/admin-category-list" element={<AdminCategoryList />} />
          <Route path="/customer-category-list" element={<CustomerCategoryList />} />
          <Route path="/update-category/:categoryId" element={<CategoryUpdate />} />

          {/* Expense Routes (Placeholder Pages) */}
          <Route Path="/Expense-entry/:categoryid" element={<ExpenseEntry />} />
          <Route path="/Expense-entry" element={<ExpenseEntry />} />
          <Route path="/expenseListCust" element={<ExpenseListCustomer />} />
         <Route path="/update-expense/:id" element={<ExpenseUpdate />} />

          <Route path="/CustExpenses/:customerId" element={<CustomerExpenses />} />
          <Route path="/Expense-entry/:categoryId" element={<ExpenseEntry />} />
          <Route path="/Expense-bar-chart" element={<ExpenseBarChart />} />
          <Route path="/admin-report" element={<AdminExpenseReport />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
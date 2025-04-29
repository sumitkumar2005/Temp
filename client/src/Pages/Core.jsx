import React, { useState, useEffect } from "react";
import "./Core.css";
import Card from "../Components/Card";
import PopupForm from "../Components/PopupForm";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Wallet, TrendingUp, TrendingDown, Calendar, BarChart2, AlertCircle } from "lucide-react";

function Core() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [viewingCategory, setViewingCategory] = useState(null);
  const [isExpenseViewOpen, setIsExpenseViewOpen] = useState(false);
  const [isIncomeViewOpen, setIsIncomeViewOpen] = useState(false);

  // Sample data
  useEffect(() => {
    // Instead of fetching from API, we'll use sample data
    const sampleTransactions = [
      { id: 1, Transaction: "Salary", TransactionType: "Income", Catagory: "Salary", Amount: 50000, Date: "2025-04-15" },
      { id: 2, Transaction: "Freelance Work", TransactionType: "Income", Catagory: "Business", Amount: 15000, Date: "2025-04-20" },
      { id: 3, Transaction: "Rental Income", TransactionType: "Income", Catagory: "Passive", Amount: 12000, Date: "2025-04-01" },
      { id: 4, Transaction: "Grocery Shopping", TransactionType: "Expense", Catagory: "Food", Amount: 3500, Date: "2025-04-02" },
      { id: 5, Transaction: "Electricity Bill", TransactionType: "Expense", Catagory: "Utilities", Amount: 2200, Date: "2025-04-05" },
      { id: 6, Transaction: "Internet Bill", TransactionType: "Expense", Catagory: "Utilities", Amount: 1500, Date: "2025-04-06" },
      { id: 7, Transaction: "Movie Night", TransactionType: "Expense", Catagory: "Entertainment", Amount: 1200, Date: "2025-04-10" },
      { id: 8, Transaction: "Restaurant Dinner", TransactionType: "Expense", Catagory: "Food", Amount: 2500, Date: "2025-04-12" },
      { id: 9, Transaction: "Fuel", TransactionType: "Expense", Catagory: "Transport", Amount: 3000, Date: "2025-04-14" },
      { id: 10, Transaction: "Mobile Recharge", TransactionType: "Expense", Catagory: "Utilities", Amount: 500, Date: "2025-04-18" },
      { id: 11, Transaction: "Book Purchase", TransactionType: "Expense", Catagory: "Education", Amount: 850, Date: "2025-04-21" },
      { id: 12, Transaction: "Health Insurance", TransactionType: "Expense", Catagory: "Insurance", Amount: 4000, Date: "2025-04-25" },
      { id: 13, Transaction: "Netflix Subscription", TransactionType: "Expense", Catagory: "Entertainment", Amount: 800, Date: "2025-04-26" }
    ];
    
    setTransactions(sampleTransactions);
  }, []);

  const handleFormSubmit = (transaction, transactionType, category, amount, date) => {
    // Convert amount to number if it's not already
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    // In a real app, this would be an API call
    const newTransaction = {
      id: transactions.length + 1,
      Transaction: transaction,
      TransactionType: transactionType,
      Catagory: category,
      Amount: numericAmount,
      Date: date || new Date().toISOString().slice(0, 10)
    };
    
    setTransactions([...transactions, newTransaction]);
    setIsPopupOpen(false);
  };

  // Filter expenses
  const expenses = transactions.filter(
    (transaction) => transaction.TransactionType === "Expense"
  );

  // Filter incomes
  const incomes = transactions.filter(
    (transaction) => transaction.TransactionType === "Income"
  );

  // Calculate expenses by category
  const expensesByCategory = transactions.reduce((acc, transaction) => {
    if (transaction.TransactionType === "Expense") {
      if (!acc[transaction.Catagory]) {
        acc[transaction.Catagory] = 0;
      }
      acc[transaction.Catagory] += transaction.Amount;
    }
    return acc;
  }, {});

  // Calculate sum of expenses
  const sumOfExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.TransactionType === "Expense") {
      acc += transaction.Amount;
    }
    return acc;
  }, 0);

  // Calculate sum of incomes
  const sumOfIncomes = transactions.reduce((acc, transaction) => {
    if (transaction.TransactionType === "Income") {
      acc += transaction.Amount;
    }
    return acc;
  }, 0);

  // Calculate total balance
  const total = sumOfIncomes - sumOfExpenses;

  // Define colors for different categories
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a480cf', '#FF6B6B', '#4ECDC4', '#1A535C'];

  // Format data for pie chart
  const pieChartData = Object.entries(expensesByCategory).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length]
  }));

  // Financial tips
  const financialTips = [
    "Save at least 20% of your monthly income for emergencies and future goals.",
    "Track every expense to identify areas where you can cut back.",
    "Plan major purchases weeks in advance to avoid impulse buying.",
    "Consider automating your savings to ensure consistency.",
    "Review and adjust your budget regularly to stay on track."
  ];

  // Random tip
  const randomTip = financialTips[Math.floor(Math.random() * financialTips.length)];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  // Toggle views
  const toggleExpenseView = () => {
    setIsExpenseViewOpen(!isExpenseViewOpen);
    if (isIncomeViewOpen) setIsIncomeViewOpen(false);
  };

  const toggleIncomeView = () => {
    setIsIncomeViewOpen(!isIncomeViewOpen);
    if (isExpenseViewOpen) setIsExpenseViewOpen(false);
  };

  return (
    <>
      <PopupForm
        onSubmit={handleFormSubmit}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      
      <div className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <p className="date-display">As of {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
      
      <div className="div-grid">
        <div className="card card1">
          <Card className="greenGradient h-100 wallet-card">
            <div className="wallet-header">
              <Wallet size={32} />
              <span>Total Balance</span>
            </div>
            <p className="wallet-amount">Rs. {total.toLocaleString()}</p>
            <div className="wallet-footer">
              <div className="wallet-stat">
                <TrendingUp size={16} color="#00C49F" />
                <span>Income: Rs. {sumOfIncomes.toLocaleString()}</span>
              </div>
              <div className="wallet-stat">
                <TrendingDown size={16} color="#FF6B6B" />
                <span>Expense: Rs. {sumOfExpenses.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="card three-child-card card2">
          <Card className="grayGradient h-100">
            <div className="summary-card">
              <div className="summary-icon expense-icon">
                <TrendingDown size={24} />
              </div>
              <div className="summary-content">
                <p className="summary-label">Total Spending</p>
                <p className="summary-amount">Rs. {sumOfExpenses.toLocaleString()}</p>
                <p className="summary-count">{expenses.length} transactions</p>
              </div>
            </div>
          </Card>
          
          <Card className="grayGradient h-100">
            <div className="summary-card">
              <div className="summary-icon income-icon">
                <TrendingUp size={24} />
              </div>
              <div className="summary-content">
                <p className="summary-label">Total Income</p>
                <p className="summary-amount">Rs. {sumOfIncomes.toLocaleString()}</p>
                <p className="summary-count">{incomes.length} transactions</p>
              </div>
            </div>
          </Card>
          
          <button onClick={() => setIsPopupOpen(true)} className="add-button">
            <span>+</span> Add Transaction
          </button>
        </div>
        
        <div className="card card3 spending-by-category">
          <Card className="grayGradient h-100">
            <div className="card-header">
              <h2>Spending by Category</h2>
              <BarChart2 size={20} />
            </div>
            
            <div className="category-chart">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `Rs. ${value.toLocaleString()}`} />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="category-list">
              {Object.entries(expensesByCategory).map(([category, amount], index) => (
                <div 
                  key={category} 
                  className="category-item"
                  onClick={() => setViewingCategory(viewingCategory === category ? null : category)}
                >
                  <div className="category-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <div className="category-name">{category}</div>
                  <div className="category-amount">Rs. {amount.toLocaleString()}</div>
                  <div className="category-percent">
                    {Math.round((amount / sumOfExpenses) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="card card4 expense-list">
          <Card className="grayGradient h-100">
            <div className="card-header">
              <h2>{viewingCategory ? `${viewingCategory} Expenses` : "Recent Expenses"}</h2>
              {viewingCategory && (
                <button className="view-all-btn" onClick={() => setViewingCategory(null)}>
                  View All
                </button>
              )}
            </div>
            
            <div className="transaction-list">
              {(viewingCategory 
                ? expenses.filter(exp => exp.Catagory === viewingCategory)
                : expenses.slice(0, 5)
              ).map((expense) => (
                <div key={expense.id} className="transaction-item">
                  <div className="transaction-icon" style={{ 
                    backgroundColor: pieChartData.find(item => item.name === expense.Catagory)?.color || '#ccc' 
                  }}>
                    {expense.Catagory.charAt(0)}
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-title">{expense.Transaction}</div>
                    <div className="transaction-category">{expense.Catagory}</div>
                  </div>
                  <div className="transaction-right">
                    <div className="transaction-amount expense-amount">
                      Rs. {expense.Amount.toLocaleString()}
                    </div>
                    <div className="transaction-date">
                      <Calendar size={12} />
                      {formatDate(expense.Date)}
                    </div>
                  </div>
                </div>
              ))}
              
              {expenses.length > 5 && !viewingCategory && (
                <div className="view-more">
                  <button className="view-more-btn" onClick={toggleExpenseView}>
                    View all {expenses.length} expenses
                  </button>
                </div>
              )}
              
              {expenses.length === 0 && (
                <div className="no-transactions">
                  <p>No expenses recorded yet</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div className="card card5">
          <Card className="grayGradient h-100">
            <div className="card-header">
              <h2>Daily Tip</h2>
              <AlertCircle size={20} />
            </div>
            <div className="tip-content">
              <p>{randomTip}</p>
            </div>
          </Card>
        </div>
        
        <div className="card card6">
          <button onClick={toggleExpenseView} className="action-button expense-button">
            <TrendingDown size={16} />
            View All Spending
          </button>
        </div>
        
        <div className="card card7">
          <button onClick={toggleIncomeView} className="action-button income-button">
            <TrendingUp size={16} />
            View All Incomes
          </button>
        </div>
      </div>
      
      {/* Full Expense View */}
      {isExpenseViewOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>All Expenses</h2>
              <button className="close-modal" onClick={toggleExpenseView}>×</button>
            </div>
            <div className="modal-body">
              <div className="transaction-list full-list">
                {expenses.map((expense) => (
                  <div key={expense.id} className="transaction-item">
                    <div className="transaction-icon" style={{ 
                      backgroundColor: pieChartData.find(item => item.name === expense.Catagory)?.color || '#ccc' 
                    }}>
                      {expense.Catagory.charAt(0)}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-title">{expense.Transaction}</div>
                      <div className="transaction-category">{expense.Catagory}</div>
                    </div>
                    <div className="transaction-right">
                      <div className="transaction-amount expense-amount">
                        Rs. {expense.Amount.toLocaleString()}
                      </div>
                      <div className="transaction-date">
                        <Calendar size={12} />
                        {formatDate(expense.Date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Income View */}
      {isIncomeViewOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>All Incomes</h2>
              <button className="close-modal" onClick={toggleIncomeView}>×</button>
            </div>
            <div className="modal-body">
              <div className="transaction-list full-list">
                {incomes.map((income) => (
                  <div key={income.id} className="transaction-item">
                    <div className="transaction-icon income-icon-bg">
                      {income.Catagory.charAt(0)}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-title">{income.Transaction}</div>
                      <div className="transaction-category">{income.Catagory}</div>
                    </div>
                    <div className="transaction-right">
                      <div className="transaction-amount income-amount">
                        Rs. {income.Amount.toLocaleString()}
                      </div>
                      <div className="transaction-date">
                        <Calendar size={12} />
                        {formatDate(income.Date)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Core;
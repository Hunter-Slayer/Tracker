import { useState } from "react"
import ExpenseItem from "./ExpenseItem"

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({
        name: '',
        amount: '',
        category: '',
    });

    const handleAddExpense = () => {
        if (newExpense.name.trim() && newExpense.amount.trim() && newExpense.category.trim()) {
          setExpenses([...expenses, { id: Date.now(), ...newExpense }]);
          setNewExpense({ name: '', amount: '', category: '' });
        }
      };
    
      const handleEditExpense = (id) => {
        const editedExpense = expenses.find(expense => expense.id === id);
        setNewExpense(editedExpense);
        setExpenses(expenses.filter(expense => expense.id !== id));
      };
    
      const handleDeleteExpense = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
      };


      const getTotalExpenses = () => {
        return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
      };
      
      const getCategoryTotals = () => {
        return expenses.reduce((totals, expense) => {
          if (!totals[expense.category]) {
            totals[expense.category] = 0;
          }
          totals[expense.category] += parseFloat(expense.amount);
          return totals;
        }, {});
      };

  return (
    <div className="bg-white shadow-md mx-auto mt-10 p-6 rounded-lg max-w-lg">
      <h1 className="mb-6 font-bold text-2xl">Expense Tracker</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newExpense.name}
          onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
          placeholder="Expense name"
        />
        <input
          type="text"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
          placeholder="Amount"
        />
        <input
          type="text"
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          className="mb-2 p-2 border rounded w-full"
          placeholder="Category"
        />
        <button
          onClick={handleAddExpense}
          className="bg-blue-500 p-2 rounded w-full text-white"
        >
          Add Expense
        </button>
      </div>
      <div>
        {expenses.map(expense => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        ))}
      </div>

      <div className="mt-6">
    <h2 className="font-bold text-xl">Expense Report</h2>
    <p>Total Expenses: ${getTotalExpenses()}</p>
    <div>
      {Object.entries(getCategoryTotals()).map(([category, total]) => (
        <p key={category}>{category}: ${total}</p>
      ))}
    </div>
  </div>
    </div>
  
    
  )
}

export default ExpenseList
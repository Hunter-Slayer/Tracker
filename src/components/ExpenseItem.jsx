
const ExpenseItem = ({expense, onEdit, onDelete}) => {
  return (
    <div className="flex justify-center items-between border-gray-300 bg-gray-100 p-4 border-b">
        <div className="flex flex-col">
            <span className="font-semibold">{expense.name}</span>
            <span className="text-gray-600 text-sm">{expense.category}</span>
        </div>
        <div className="flex items-center">
        <span className="mr-4">${expense.amount}</span>
        <button onClick={() => onEdit(expense.id)} className="mr-2 text-blue-500">Edit</button>
        <button onClick={() => onDelete(expense.id)} className="text-red-500">Delete</button>
      </div>
    </div>
  )
}

export default ExpenseItem
import React from "react";
import TodoItem from "./TodoItem";
import { useTodos } from "../hooks/useTodos";

const TodoApp = () => {
    const {
        filteredTodos,
        filter,
        setFilter,
        newTodo,
        setNewTodo,
        handleAdd,
        handleEdit,
        handleUpdate,
        handleToggle,
        editingId,
        editText,
        setEditText,
    } = useTodos();

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">📋 Todo List</h2>

            {/* Input and Add Button */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter new todo..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add
                </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-3 mb-6">
                {["all", "pending", "completed"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1 rounded-full border text-sm ${filter === f
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                    >
                        {f[0].toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Todo List */}
            <ul className="space-y-4">
                {filteredTodos.length === 0 ? (
                    <p className="text-center text-gray-500">No todos found.</p>
                ) : (
                    filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggle}
                            onEdit={handleEdit}
                            onSave={handleUpdate}
                            onChangeEdit={setEditText}
                            isEditing={editingId === todo.id}
                            editText={editingId === todo.id ? editText : ""}
                        />
                    ))
                )}
            </ul>
        </div>
    );
};

export default TodoApp;

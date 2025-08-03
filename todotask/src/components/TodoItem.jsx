import React from "react";

const TodoItem = React.memo(
    ({ todo, onToggle, onEdit, onSave, onChangeEdit, isEditing, editText }) => {
        return (
            <li className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md shadow-sm">
                <div className="flex items-center gap-3 w-full">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                        className="w-4 h-4 text-blue-600"
                    />

                    {isEditing ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => onChangeEdit(e.target.value)}
                            className="flex-1 px-2 py-1 border rounded-md"
                        />
                    ) : (
                        <span
                            className={`flex-1 text-gray-800 ${todo.completed ? "line-through text-gray-500" : ""
                                }`}
                        >
                            {todo.title}
                        </span>
                    )}
                </div>

                {isEditing ? (
                    <button
                        onClick={() => onSave(todo.id)}
                        className="ml-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => onEdit(todo.id, todo.title)}
                        className="ml-2 px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                )}
            </li>
        );
    }
);

export default TodoItem;

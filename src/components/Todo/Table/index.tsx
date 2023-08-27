import { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import DeleteIcon from "../../../assets/icons/deleteIcon";
import { Todo } from "../../../store/todos/types";
import { User } from "../../../store/users/types";
import "./index.scss";

type PropTypes = {
  onTodoChange: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  todos: Todo[];
  users: User[];
};

const TodoTable = (props: PropTypes) => {
  const { onTodoChange, deleteTodo } = props;
  const { todos, users } = props;

  const [editingRow, setEditingRow] = useState<string | null>(null);

  const usersOptions = users.map((user) => ({
    value: user.url,
    label: user.name,
  }));

  const statusOptions = [
    { value: "todo", label: "Todo" },
    { value: "in_progress", label: "In progress" },
    { value: "done", label: "Done" },
  ];

  return (
    <table className="todo-table table w-100 table-hover">
      <thead>
        <tr>
          <th style={{ width: "100px" }}>#</th>
          <th>Title</th>
          <th style={{ width: "200px" }}>Status</th>
          <th style={{ width: "200px" }}>User</th>
          <th className="text-center" style={{ width: "100px" }}>
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={todo.id}>
            <th scope="row">{index + 1}</th>

            <td onClick={() => todo.id && setEditingRow(todo.id)}>
              {editingRow === todo.id ? (
                <Form.Control
                  type="text"
                  value={todo.text}
                  className="shadow-none editable__input"
                  onChange={(e: any) =>
                    e.target.value &&
                    onTodoChange({ ...todo, text: e.target.value })
                  }
                  onBlur={() => setEditingRow(null)}
                  autoFocus
                />
              ) : (
                todo.text
              )}
            </td>
            <td>
              <Select
                options={statusOptions}
                value={
                  statusOptions.find(
                    (option) => option.value === todo?.status
                  ) || statusOptions[0]
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    boxShadow: "none",
                  }),
                }}
                onChange={(e) =>
                  onTodoChange({ ...todo, status: e?.value as Todo["status"] })
                }
                className="user__select"
              />
            </td>
            <td>
              <Select
                options={usersOptions}
                value={
                  usersOptions.find((option) => option.value === todo?.user) ||
                  null
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    boxShadow: "none",
                  }),
                }}
                onChange={(e) => onTodoChange({ ...todo, user: e?.value })}
                className="user__select"
                placeholder="Attach user"
              />
            </td>
            <td className="text-center">
              <DeleteIcon
                className="trash-icon"
                onClick={() => todo.id && deleteTodo && deleteTodo(todo.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;

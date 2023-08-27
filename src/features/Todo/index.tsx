import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import TodoHeader from "../../components/Todo/Header";
import { TodoSidebar } from "../../components/Todo/Sidebar";
import TodoTable from "../../components/Todo/Table";
import { addTodo, deleteTodo, editTodo } from "../../store/todos/actions";
import { Todo as TodoType } from "../../store/todos/types";
import { getUsersRequest } from "../../store/users/actions";
import { User } from "../../store/users/types";

type PropTypes = {
  users: User[];
  todos: TodoType[];
  getUsers: () => void;
  createNewTodo: (todo: TodoType) => void;
  editTodo: (todo: TodoType) => void;
  deleteTodoById: (id: string) => void;
};

const initialNewTodo = {
  text: "",
  user: "",
};

const Todo = (props: PropTypes) => {
  const { getUsers, createNewTodo, editTodo, deleteTodoById } = props;
  const { users, todos } = props;
  const [newTodo, setNewTodo] = useState<TodoType>(initialNewTodo);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | TodoType["status"]
  >("all");

  const filteredTodos = useMemo(() => {
    const todoSort = (a: TodoType, b: TodoType) =>
      a.createdAt && b.createdAt
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : 0;

    if (selectedFilter === "all") return todos.sort(todoSort);
    return todos
      .filter((todo) => todo.status === selectedFilter)
      .sort(todoSort);
  }, [todos, selectedFilter]);

  const onAddClick = () => {
    if (!newTodo.text) return;
    createNewTodo(newTodo);
    setNewTodo(initialNewTodo);
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <Row className="h-100 w-100 m-0">
        <Col lg={2} className="h-100 m-0 p-0">
          <TodoSidebar
            selectedFilter={selectedFilter}
            onSelect={setSelectedFilter}
          />
        </Col>
        <Col lg={10} className="d-flex flex-column gap-2 align-items-center">
          <Row className="p-lg-5 p-2 w-100 mt-4 mt-2 mt-lg-0">
            <Col lg={12}>
              <TodoHeader
                onAddClick={onAddClick}
                users={users}
                newTodo={newTodo}
                onChange={(newTodo) => {
                  setNewTodo(newTodo);
                }}
              />
            </Col>
            <Col lg={12} className="mt-4">
              <TodoTable
                todos={filteredTodos}
                onTodoChange={editTodo}
                deleteTodo={deleteTodoById}
                users={users}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  users: state.users.list,
  todos: state.todos.list,
});

const mapDispatchToProps = (dispatch: any) => ({
  getUsers: () => dispatch(getUsersRequest()),
  createNewTodo: (todo: TodoType) => dispatch(addTodo(todo)),
  editTodo: (todo: TodoType) => dispatch(editTodo(todo)),
  deleteTodoById: (id: string) => dispatch(deleteTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);

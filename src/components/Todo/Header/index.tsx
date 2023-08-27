import "./style.scss";

import { Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { User } from "../../../store/users/types";
import { Todo } from "../../../store/todos/types";

type PropTypes = {
  onAddClick: () => void;
  onChange: (newTodo: Todo) => void;
  newTodo: Todo;
  users: User[];
};

const TodoHeader = (props: PropTypes) => {
  const { newTodo, users } = props;
  const { onAddClick, onChange } = props;

  const options = users.map((user) => ({
    value: user.url,
    label: user.name,
  }));

  return (
    <Row className="d-flex justify-content-between align-items-center">
      <Col xl={4}>
        <h3>Todo List</h3>
      </Col>
      <Col
        xl={8}
        className="d-flex gap-3 justify-content-end m-0 align-items-center"
      >
        <Select
          options={options}
          value={
            options.find((option) => option.value === newTodo?.user) || null
          }
          styles={{
            control: (base) => ({
              ...base,
              boxShadow: "none",
            }),
          }}
          onChange={(e) => onChange({ ...newTodo, user: e?.value })}
          className="user__select"
          placeholder="Attach user"
        />
        <Form.Control
          type="text"
          placeholder="Todo title"
          className="add__input shadow-none"
          value={newTodo?.text || ""}
          onChange={(e) => onChange({ ...newTodo, text: e.target.value })}
        />

        <Button
          onClick={onAddClick}
          className="add__button shadow-none"
          disabled={!newTodo.text}
        >
          Add item
        </Button>
      </Col>
    </Row>
  );
};

export default TodoHeader;

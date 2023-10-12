import css from "./Task.module.css";
import { useDispatch } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { deleteTask, toggleFinished } from "redux/tasksSlice";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));
  const handleToggle = () => dispatch(toggleFinished(task.id));

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <Card.Title>{task.title}</Card.Title>
          <Button
            variant="danger"
            size="sm"
            onClick={(e) => {
              handleDelete();
              e.stopPropagation();
            }}
          >
            &times;
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{task.description}</Card.Text>
        <Form.Check
          type="checkbox"
          label="Finished"
          checked={task.finished}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
        />
      </Card.Body>
    </Card>
  );
};

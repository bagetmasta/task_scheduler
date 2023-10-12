import { ListGroup, Alert } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Task } from "components/Task/Task";
import { getTasks, getStatusFilter } from "redux/selectors";
import { statusFilters } from "redux/constants";
import { Modal } from "components/Modal/Modal";

const getVisibleTasks = (tasks, statusFilter) => {
  const sortedTasks = [...tasks].sort((a, b) =>
    a.finished === b.finished ? 0 : a.finished ? 1 : -1
  );

  switch (statusFilter) {
    case statusFilters.inProgress:
      return sortedTasks.filter((task) => !task.finished);
    case statusFilters.finished:
      return sortedTasks.filter((task) => task.finished);
    default:
      return sortedTasks;
  }
};

export const TaskList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const tasks = useSelector(getTasks);
  const statusFilter = useSelector(getStatusFilter);
  const visibleTasks = getVisibleTasks(tasks, statusFilter);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          editingTask={editingTask}
        />
      )}
      {visibleTasks.length === 0 ? (
        <Alert variant="info">No tasks available yet.</Alert>
      ) : (
        <ListGroup>
          {visibleTasks.map((task) => (
            <ListGroup.Item
              key={task.id}
              onClick={() => handleEditTask(task)}
              role="button"
              tabIndex={0}
              className="list-group-item-action"
            >
              <Task task={task} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

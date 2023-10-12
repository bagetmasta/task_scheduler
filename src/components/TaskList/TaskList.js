import { useState } from "react";
import { useSelector } from "react-redux";
import { Task } from "components/Task/Task";
import { getTasks, getStatusFilter } from "redux/selectors";
import { statusFilters } from "redux/constants";
import { Modal } from "components/Modal/Modal";
import css from "./TaskList.module.css";

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
        <p className={css.emptyMessage}>No tasks available yet.</p>
      ) : (
        <ul className={css.list}>
          {visibleTasks.map((task) => (
            <li
              className={css.listItem}
              key={task.id}
              onClick={() => handleEditTask(task)}
            >
              <Task task={task} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

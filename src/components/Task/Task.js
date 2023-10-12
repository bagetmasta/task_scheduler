import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import css from "./Task.module.css";
import { deleteTask, toggleFinished } from "redux/tasksSlice";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));
  const handleToggle = () => dispatch(toggleFinished(task.id));

  return (
    <div className={css.card}>
      <div className={css.cardHeader}>
        <h3 className={css.title}>{task.title}</h3>
        <button
          className={css.btn}
          onClick={(e) => {
            handleDelete();
            e.stopPropagation();
          }}
        >
          <MdClose size={24} />
        </button>
      </div>
      <p className={css.description}>{task.description}</p>
      <input
        type="checkbox"
        className={css.checkbox}
        checked={task.finished}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

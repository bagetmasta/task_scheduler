import { useSelector } from "react-redux";
import { getTasks } from "redux/selectors";
import css from "./TaskCounter.module.css";

export const TaskCounter = () => {
  const tasks = useSelector(getTasks);

  const count = tasks.reduce(
    (acc, task) => {
      if (task.finished) {
        acc.finished += 1;
      } else {
        acc.inProgress += 1;
      }
      return acc;
    },
    { inProgress: 0, finished: 0 }
  );

  return (
    <div>
      <p className={css.text}>In Progress: {count.inProgress}</p>
      <p className={css.text}>Finished: {count.finished}</p>
    </div>
  );
};

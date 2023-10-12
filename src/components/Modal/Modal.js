import css from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addTask, updateTask } from "redux/tasksSlice";

export const Modal = ({ onClose, isModalOpen, editingTask }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.elements.text.value.trim();
    const description = event.target.elements.description.value;
    const finished =
      Array.from(event.target.elements.status).find((radio) => radio.checked)
        ?.value === "Finished";

    if (!title) {
      alert("Title cannot be empty!");
      return;
    }

    if (editingTask) {
      dispatch(
        updateTask({ id: editingTask.id, title, description, finished })
      );
    } else {
      dispatch(addTask({ title, description, finished }));
    }

    onClose();
  };

  return (
    <>
      <div
        className={`${css.backdrop} ${isModalOpen ? css.backdrop_visible : ""}`}
        onClick={onClose}
      />
      <div className={`${css.modal} ${isModalOpen ? css.modal_entered : ""}`}>
        <form className={css.formContainer} onSubmit={handleSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Title"
            className={css.textInput}
            defaultValue={editingTask ? editingTask.title : ""}
          />
          <textarea
            name="description"
            placeholder="Description"
            className={`${css.textInput} ${css.descriptionArea}`}
            defaultValue={editingTask ? editingTask.description : ""}
          ></textarea>
          <div className={css.flexContainer}>
            <label className={css.labelContainer}>
              <input
                type="radio"
                name="status"
                value="In Progress"
                defaultChecked={editingTask && !editingTask.finished}
              />
              In Progress
            </label>
            <label className={css.labelContainer}>
              <input
                type="radio"
                name="status"
                value="Finished"
                defaultChecked={editingTask && editingTask.finished}
              />
              Finished
            </label>
          </div>
          <button type="submit" className={css.button}>
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`${css.button} ${css.closeButton}`}
          >
            Close
          </button>
        </form>
      </div>
    </>
  );
};

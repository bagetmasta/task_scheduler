import { StatusFilter } from "components/StatusFilter/StatusFilter";
import { TaskCounter } from "components/TaskCounter/TaskCounter";
import { useState } from "react";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import css from "./AppBar.module.css";

export const AppBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  return (
    <header className={css.header_wrapper}>
      <div className={css.section_wrapper}>
        <section className={css.section}>
          <h2 className={css.title}>Tasks</h2>
          <TaskCounter />
        </section>
        <section className={css.section}>
          <h2 className={css.title}>Filter by status</h2>
          <StatusFilter />
        </section>
      </div>
      <Button type="button" onClick={toggleModal}>
        Add task
      </Button>
      {isModalOpen && <Modal onClose={toggleModal} isModalOpen={isModalOpen} />}
    </header>
  );
};

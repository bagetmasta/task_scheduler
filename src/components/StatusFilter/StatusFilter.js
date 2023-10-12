import { useSelector, useDispatch } from "react-redux";
import { Button } from "components/Button/Button";
import { statusFilters } from "redux/constants";
import { getStatusFilter } from "redux/selectors";
import { setStatusFilter } from "redux/filtersSlice";
import css from "./StatusFilter.module.css";

export const StatusFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getStatusFilter);

  const handleFilterChange = (filter) => dispatch(setStatusFilter(filter));

  return (
    <div className={css.wrapper}>
      <Button
        selected={filter === statusFilters.all}
        onClick={() => handleFilterChange(statusFilters.all)}
      >
        All
      </Button>
      <Button
        selected={filter === statusFilters.inProgress}
        onClick={() => handleFilterChange(statusFilters.inProgress)}
      >
        In progress
      </Button>
      <Button
        selected={filter === statusFilters.finished}
        onClick={() => handleFilterChange(statusFilters.finished)}
      >
        Finished
      </Button>
    </div>
  );
};

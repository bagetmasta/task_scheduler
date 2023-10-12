import { Layout } from "components/Layout/Layout";
import { AppBar } from "components/AppBar/AppBar";
import { TaskList } from "components/TaskList/TaskList";

export const App = () => {
  return (
    <Layout>
      <AppBar />
      <TaskList />
    </Layout>
  );
};

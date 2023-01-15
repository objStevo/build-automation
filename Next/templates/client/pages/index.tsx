import { Provider } from "react-redux";
import { store } from "../store";

const HomePage: any = () => {
  return (
    <Provider store={store}>
      <h1>Welcome</h1>
    </Provider>
  );
};

export default HomePage;

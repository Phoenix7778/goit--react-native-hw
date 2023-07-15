import CreateAuthNav from "./components/CreateAuthNav";
import CreateTabNav from "./components/CreateTabNav";

const useRoute = (isAuth) => {
  if (!isAuth) {
    return <CreateAuthNav />;
  }
  return <CreateTabNav />;
};

export default useRoute;

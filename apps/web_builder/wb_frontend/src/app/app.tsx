import { Suspense } from "react";
import { Loading } from "../components";
import { AppRouter } from "../app_router";
import { DefaultFcProps, HasClasses } from "../react_utils";

export const App: React.FC<Partial<DefaultFcProps & HasClasses>> = ({
  classes = {}
}) => {
  return (
    <div className={classes.appContainer}>
      <Suspense fallback={<Loading />}>
        <AppRouter />
      </Suspense>
    </div>
  )
};

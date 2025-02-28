import { ProjectList } from "../../components";
import { DefaultFcProps, HasClasses } from "../../react_utils";

export const ListProjectsPage: React.FC<DefaultFcProps & HasClasses> = ({
  classes
}) => {
  return (
    <div className={classes.pageWrapper}>
      <ProjectList />
    </div>
  );
};

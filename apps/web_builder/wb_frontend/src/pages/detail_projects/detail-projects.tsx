import { ProjectsDetail } from "../../components/project_detail";
import { DefaultFcProps, HasClasses } from "../../react_utils";

export const DetailProjectsPage: React.FC<DefaultFcProps & HasClasses> = ({
  classes
}) => {
  return (
    <div className={classes.pageWrapper}>
      <ProjectsDetail/>
    </div>
  );
};

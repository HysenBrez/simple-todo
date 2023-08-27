import { Todo } from "../../../store/todos/types";
import "./index.scss";

type PropTypes = {
  selectedFilter: "all" | Todo["status"];
  onSelect: (selected: "all" | Todo["status"]) => void;
};

export const TodoSidebar = (props: PropTypes) => {
  const { onSelect } = props;
  const { selectedFilter } = props;

  const tabs = [
    { value: "all", label: "All" },
    { value: "todo", label: "To Do" },
    { value: "in_progress", label: "In Progress" },
    { value: "done", label: "Completed" },
  ];

  return (
    <div className="sidebar py-5 w-100 h-100 flex-column">
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={`sidebar-item ${
            selectedFilter === tab.value ? "active" : ""
          }`}
          onClick={() => onSelect(tab.value as Todo["status"])}
        >
          <p className="sidebar-item__title">{tab.label}</p>
        </div>
      ))}
    </div>
  );
};

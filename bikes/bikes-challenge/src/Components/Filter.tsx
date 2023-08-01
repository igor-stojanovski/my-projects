import { Bike } from "./Types";

type FilterProps = {
  title: string;
  filter: (bikes: Bike[]) => void;
  allBikes: Bike[];
  filterType: string;
  isActive: boolean;
  setActiveFilter: (filterType: string) => void;
};

export default function Filter({
  title,
  allBikes,
  filter,
  filterType,
  isActive,
  setActiveFilter,
}: FilterProps) {
  let filtered: Bike[] = [];

  if (filterType === "Show All") {
    filtered = allBikes.map((bike) => bike);
  } else if (filterType === "MALE" || filterType === "FEMALE") {
    filtered = allBikes.filter((bike) => bike.gender === title);
  } else {
    filtered = allBikes.filter((bike) => bike.brand === title);
  }

  return (
    <div
      onClick={() => {
        filter(filtered);
        setActiveFilter(title);
      }}
      className={`d-flex justify-content-between filter-btn ${
        isActive ? "active" : ""
      }`}
    >
      <p className="mb-0 mt-2 fw-bold text-uppercase">{title}</p>
      <span className="badge">{filtered.length}</span>
    </div>
  );
}

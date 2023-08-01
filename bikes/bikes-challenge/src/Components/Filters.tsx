import { useState } from "react";
import Filter from "./Filter";
import { Bike } from "./Types";

type FiltersProps = {
  filter: (bikes: Bike[]) => void;
  allBikes: Bike[];
};

export default function Filters({ filter, allBikes }: FiltersProps) {
  const AllFilters = [
    {
      allBikes,
      filter,
      title: "Show All",
      filterType: "Show All",
    },
    {
      allBikes,
      filter,
      title: "MALE",
      filterType: "MALE",
    },
    {
      allBikes,
      filter,
      title: "FEMALE",
      filterType: "FEMALE",
    },
    {
      allBikes,
      filter,
      title: "LE GRAND BIKES",
      filterType: "BRAND",
    },
    {
      allBikes,
      filter,
      title: "KROSS",
      filterType: "BRAND",
    },
    {
      allBikes,
      filter,
      title: "EXPLORER",
      filterType: "BRAND",
    },
    {
      allBikes,
      filter,
      title: "VISITOR",
      filterType: "BRAND",
    },
    {
      allBikes,
      filter,
      title: "PONY",
      filterType: "BRAND",
    },
    {
      allBikes,
      filter,
      title: "FORCE",
      filterType: "BRAND",
    },
    {
      allBikes,
      filter,
      title: "E-BIKES",
      filterType: "BRAND",
    },
    {
      allBikes,
      filter,
      title: "IDEAL",
      filterType: "BRAND",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("Show All");

  return (
    <div key={new Date().valueOf()} className="filters p-3">
      <h2>Bikes</h2>
      <h3 className="h4 mt-4">Filter by:</h3>
      {AllFilters.map((filterObj) => {
        if (filterObj.title === "MALE") {
          return (
            <>
              <hr className="mt-4" />
              <h3 className="h4 mt-4">Gender</h3>
              <Filter
                allBikes={filterObj.allBikes}
                filter={filterObj.filter}
                title={filterObj.title}
                filterType={filterObj.filterType}
                isActive={activeFilter === filterObj.title}
                setActiveFilter={setActiveFilter}
              />
            </>
          );
        } else if (filterObj.title === "LE GRAND BIKES") {
          return (
            <>
              <hr className="mt-4" />
              <h3 className="h4 mt-4">Brands</h3>
              <Filter
                allBikes={filterObj.allBikes}
                filter={filterObj.filter}
                title={filterObj.title}
                filterType={filterObj.filterType}
                isActive={activeFilter === filterObj.title}
                setActiveFilter={setActiveFilter}
              />
            </>
          );
        } else {
          return (
            <Filter
              allBikes={filterObj.allBikes}
              filter={filterObj.filter}
              title={filterObj.title}
              filterType={filterObj.filterType}
              isActive={activeFilter === filterObj.title}
              setActiveFilter={setActiveFilter}
            />
          );
        }
      })}
    </div>
  );
}

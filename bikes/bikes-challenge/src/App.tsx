import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import Filters from "./Components/Filters";
import { Bike } from "./Components/Types";
import Card from "./Components/Card";
import Footer from "./Components/Footer";

function App() {
  const [bikesData, setBikesData] = useState<Bike[]>([]);
  const [filteredBikes, setFilteredBikes] = useState<Bike[]>([]);

  useEffect(() => {
    fetch("https://challenges.brainster.tech/ajax_data/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.products);
        setBikesData(data.products);
        setFilteredBikes(data.products);
      });
  }, []);

  function filterData(currentBikes: Bike[]) {
    setFilteredBikes(currentBikes);
  }

  return (
    <>
      <Header />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-3">
            <Filters allBikes={bikesData} filter={filterData} />
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-12">
                <div className="card-container d-flex justify-content-between flex-wrap">
                  {filteredBikes.map((bike, i) => (
                    <Card key={i} bike={bike} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

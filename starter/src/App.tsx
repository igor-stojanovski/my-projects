import "./css/main.scss";
import Banner from "./react-components/Banner";
import DetailsBlock from "./react-components/DetailsBlock";
import Footer from "./react-components/Footer";
import PlacesContainer from "./react-components/PlacesContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Banner
        pretitle="Summer vacation"
        title="Nomad Nation"
        btnText="read more"
      />
      <DetailsBlock
        pretitle="About"
        title="Stories of Adventures"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. In reiciendis quisquam cum illum veniam, ab ullam minima assumenda possimus temporibus hic excepturi porro aut qui error suscipit at! Earum, cumque."
        img="https://picsum.photos/id/255/300/300"
      />
      <PlacesContainer />
      <DetailsBlock
        pretitle="About"
        title="Popular Adventures"
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. In reiciendis quisquam cum illum veniam, ab ullam minima assumenda possimus temporibus hic excepturi porro aut qui error suscipit at! Earum, cumque."
        img="https://picsum.photos/id/257/300/300"
      />
      <Footer />
    </div>
  );
};

export default App;

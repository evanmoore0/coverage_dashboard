import "./App.css";
import { useState } from "react";

import { ThreeDots } from "react-loader-spinner";

import { constants } from "./constants";

function App() {
  // Loading states
  const [openingsLoading, setOpeningsLoading] = useState(true);
  const [glassDoorLoading, setGlassDoorLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  // Click states
  const [clickedOpenings, setClickedOpenings] = useState(false);
  const [clickedGlassdoor, setClickedGlassdoor] = useState(false);
  const [clickedNews, setClickedNews] = useState(false);

  // Data states
  const [glassdoorData, setGlassdoorData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [newsData, setNewsData] = useState(null);

  // Get the Ratings data
  async function getRatings() {
    let final = [];

    for (let i = 0; i < constants.glassDoor.length; i++) {
      const response = await fetch("/ratings")
        .then(async function (res) {
          return await res.json();
        })
        .catch((err) => alert(err.message));

      console.log("Response Express");
      console.log(response.express);
      final.push(response.express);
    }
    console.log("Final");
    console.log(final);
    return final;
  }

  // Get openings data
  async function getOpenings() {
    const response = await fetch("/api/openings");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  // Get news data
  async function getNews() {
    const response = await fetch("/news");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  // Handle clicks
  const handleGlassdoorClick = async () => {
    setClickedGlassdoor(true);
    await getRatings()
      .then((data) => {
        setGlassdoorData(data);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setGlassDoorLoading(false);
      });
  };

  const handleOpeningsClick = () => {
    setClickedOpenings(true);
    getOpenings()
      .then((data) => {
        setJobData(data.express);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setOpeningsLoading(false);
      });
  };

  const handleNewsClick = () => {
    setClickedNews(true);
    getNews()
      .then((data) => {
        setNewsData(data.express);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setNewsLoading(false);
      });
  };

  const CompanyList = ({data}) => {
    return (
      <>
        {glassDoorLoading ? (
          <></>
        ) : (
          <div className="List-Container">
            {data?.map((comp, key) => (
              <div className="List" key={key}>
                <h3 className="Company-Name">{comp.name}</h3>
                <h3 className="Company-Name">{comp.other}</h3>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const TitleButton = ({clickLoading, loading, onSecClick}) => {  
    return (
      <>
        {clickLoading ? (
          loading ? (
            <div className="Loader">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          ) : (
            <></>
          )
        ) : (
          <button className="Button" onClick={onSecClick}>
            {"Load Data"}
          </button>
        )}
      </>
    );
  };

  const MainCont = () => {
    return(
      <div className="Main-Content-Container">
      <div className="Main-Content">
        <h2 className="Subtitle">{"Glassdoor Ratings"}</h2>
      </div>

      <TitleButton
      clickLoading = {clickedGlassdoor}
      loading = {glassDoorLoading}
      onSecClick = {handleGlassdoorClick}
      
      />

      <CompanyList data={glassdoorData} />
    </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={"./jmp_image.png"} className="App-logo" alt="logo" />

        <h1 className="Header-text">
          {"Communications Equipment & IT Infrastructure"}
        </h1>

        <div className="Placeholder"></div>
      </header>

      <main className="Main">

        <MainCont/>
        {/* <div className="Main-Content-Container">
          <div className="Main-Content">
            <h2 className="Subtitle">{"Glassdoor Ratings"}</h2>
          </div>

          <TitleButton
          clickLoading = {clickedGlassdoor}
          loading = {glassDoorLoading}
          onSecClick = {handleGlassdoorClick}
          
          />

          <CompanyList data={glassdoorData} />
        </div> */}

        {/* <div className = "Main-Content-Container">
          <div className="Main-Content">
            <h2 className="Subtitle">{"Glassdoor Ratings"}</h2>
          </div>
        </div> */}

        {/* <div className="Main-Content">
          <h2 className="Subtitle">{"Glassdoor Ratings"}</h2>

          {clickedGlassdoor ? (
            glassDoorLoading ? (
              <div className="Loader">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <></>
            )
          ) : (
            <button className="Button" onClick={handleGlassdoorClick}>
              {"Load Data"}
            </button>
          )}

          {glassDoorLoading ? (
            <></>
          ) : (
            glassdoorData?.map((comp, key) => (
              <div className="List" key={key}>
                <h3 className="Company-Name">{comp["Company"]}</h3>
                <h3 className="Company-Name">{comp["Rating"]}</h3>
              </div>
            ))
          )}
        </div>

        <div className="Main-Content">
          <h2 className="Subtitle">{"Job Openings"}</h2>

          {clickedOpenings ? (
            openingsLoading ? (
              <div className="Loader">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <></>
            )
          ) : (
            <button className="Button" onClick={handleOpeningsClick}>
              {"Load Data"}
            </button>
          )}

          {openingsLoading ? (
            <></>
          ) : (
            jobData?.map((comp, key) => (
              <div className="List" key={key}>
                <h3 className="Company-Name">{comp["Company"]}</h3>
                <h3 className="Company-Name">{comp["Openings"]}</h3>
              </div>
            ))
          )}
        </div> */}
      </main>
      {/* 
      <section className="bottom-container">
            <div className = "Main-Content">
            <h2 className="Subtitle">{"ShotSpotter News"}</h2>
      {clickedNews ? (
            newsLoading ? (
              <div className="Loader">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <></>
            )
          ) : (
            <button className="Button" onClick={handleNewsClick}>
              {"Load Data"}
            </button>
          )}
            </div>

      <div className="news-container">
         

          {newsLoading ? (
            <></>
          ) : (
            newsData?.map((comp, key) => (
              <div className="new-container" key={key}>
                <h1 className="news-pub">{comp["publisher"]}</h1>
                <h2 className="news-headline">{comp["headline"]}</h2>
                <h3 className="news-description">{comp["description"]}</h3>
                <h4 className="news-date">{comp["date"]}</h4>
              </div>
            ))
          )}
        </div>
      </section> */}
    </div>
  );
}

export default App;

import "./App.css";
import { useEffect, useState } from "react";

import { ThreeDots } from "react-loader-spinner";

function App() {
  const [openingsLoading, setOpeningsLoading] = useState(true);
  const [glassDoorLoading, setGlassDoorLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  const [clickedOpenings, setClickedOpenings] = useState(false);
  const [clickedGlassdoor, setClickedGlassdoor] = useState(false);
  const [clickedNews, setClickedNews] = useState(false);

  const [glassdoorData, setGlassdoorData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [newsData, setNewsData] = useState(null);

  async function test() {
    const response = await fetch("/api/test")
      .then(res => res.json())
      .then(data => {console.log(data)})
      .catch(err => {console.log(err)});
    // const body = await response.json().catch((err) => {
    //   console.log("error in body")
    //   console.log(err.message)
    //   console.log(err.code)
    // })

    // console.log("body")
    // console.log(body)
    console.log("response");
    console.log(response);
  }

  async function getRatings() {
    const response = await fetch("/api/ratings").catch((err) => {
      console.log("error in fetch");
      console.log(err.message);
      console.log(err.code);
    });

    // Add try catch to line below

    const body = await response.json().catch((err) => {
      console.log("error in body");
      console.log(err.message);
      console.log(err.code);
    });
    console.log("body");
    console.log(body);

    // if (response.status !== 200) {
    //   throw Error(body.message);
    // }
    return body;
  }

  useEffect(() => {
    test();
  }, []);

  async function getOpenings() {
    const response = await fetch("/openings");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  async function getNews() {
    const response = await fetch("/news");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  const handleGlassdoorClick = () => {
    setClickedGlassdoor(true);
    getRatings()
      .then((data) => {
        console.log("Glassdoor done");
        setGlassdoorData(data.express);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        console.log("Loading done");
        setGlassDoorLoading(false);
      });
  };

  const handleOpeningsClick = () => {
    setClickedOpenings(true);
    getOpenings()
      .then((data) => {
        console.log("Jobs done");
        setJobData(data.express);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        console.log("Loading done");
        setOpeningsLoading(false);
      });
  };

  const handleNewsClick = () => {
    setClickedNews(true);
    getNews()
      .then((data) => {
        console.log("News done");
        setNewsData(data.express);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        console.log("Loading done");
        setNewsLoading(false);
      });
  };

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
        <div className="Main-Content">
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
            glassdoorData?.map((comp) => (
              <div className="List">
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
            jobData?.map((comp) => (
              <div className="List">
                <h3 className="Company-Name">{comp["Company"]}</h3>
                <h3 className="Company-Name">{comp["Openings"]}</h3>
              </div>
            ))
          )}
        </div>
        <div className="Main-Content">
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

          {newsLoading ? (
            <></>
          ) : (
            newsData?.map((comp) => (
              <div className="List">
                <h3 className="Company-Name">{"HI"}</h3>
                <h3 className="Company-Name">{"BY"}</h3>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

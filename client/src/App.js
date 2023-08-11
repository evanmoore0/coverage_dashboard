import "./App.css";
import { useEffect, useState } from "react";

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

  const [clickedCreateList, setClickedCreateList] = useState(false);

  // Data states
  const [glassdoorData, setGlassdoorData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [listInputVal, setListInputVal] = useState("");
  const [newTickerList, setNewTickerList] = useState([]);

  const [newsSearch, setNewsSearch] = useState("");

  const [tickerLists, setTickerLists] = useState(null);

  const [listName, setListName] = useState("");

  const [displayListInfo, setDisplayListInfo] = useState(false);

  async function Test() {
    await fetch("/test");
  }

  async function GetLists() {
    await fetch("/get-lists")
      .then(async function (res) {
        return await res.json();
      })
      .then((data) => {
        setTickerLists(data.lists);
        console.log("Set ticker lists")
        console.log(tickerLists)
            });
  }

  useEffect(() => {
    (async () => {
      await GetLists();
    })();
  }, []);

  // Get the Ratings data
  async function getRatings() {
    let final = [];

    for (let i = 0; i < constants.glassDoor.length; i++) {
      const response = await fetch("/ratings?iter=" + i.toString())
        .then(async function (res) {
          return await res.json();
        })
        .catch((err) => alert(err.message));
      final.push(response.express);
    }
    return final;
  }
  // Get openings data
  async function getOpenings() {
    let final = [];
    for (let i = 0; i < constants.openings.length; i++) {
      const response = await fetch("/jobs?iter=" + i.toString())
        .then(async function (res) {
          return await res.json();
        })
        .catch((err) => alert(err.message));
      final.push(response.express);
    }
    return final;
  }

  // Get news data
  async function getNews(search) {
    const response = await fetch("/news?search=" + search);
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

  const handleOpeningsClick = async () => {
    setClickedOpenings(true);

    await getOpenings()
      .then((data) => {
        setJobData(data);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setOpeningsLoading(false);
      });
  };

  const handleNewsClick = async () => {
    setClickedNews(true);
    await getNews(newsSearch)
      .then((data) => {
        setNewsData(data.express);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        setNewsLoading(false);
        setClickedNews(false);
      });
  };

  const handleAllNewsClick = async (tickerList) => {
    setClickedNews(true);

    let final = [];

    for (let company of tickerList) {
      await fetch("/allnews?search=" + company)
        .then(async function (res) {
          return await res.json();
        })
        .then((data) => {
          final.push(data.express);
        })
        .catch((err) => alert(err.message));
    }
    final = final.flat(1);
    final = final.sort((a, b) => b.comp - a.comp);

    setNewsData(final);

    setNewsLoading(false);
    setClickedNews(false);
  };

  const handleListVal = () => {
    if (listInputVal.trim().length > 0) {
      setNewTickerList((prevState) => [...prevState, listInputVal]);
      setListInputVal("");
    }
  };

  const handleClickUpload = async () => {


    if (newTickerList.length == 0) {
      alert("Add stocks to the list");
    } else if (listName.length == 0) {
      alert("Add a name");
    } else {
      setClickedCreateList(false);

      await fetch("/upload-list?tickers=" + [listName, newTickerList])

      setNewTickerList([]);
      setListName("");
    }
  };

  const handleDelete = async (list) => {
    await fetch("/delete-list?id=" + list).finally(async () => {
      await GetLists();
    });
  };

  const CompanyList = ({ data, loading }) => {
    return (
      <>
        {loading ? (
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

  const TitleButton = ({ clickLoading, loading, onSecClick }) => {
    return (
      <>
        {clickLoading ? (
          loading ? (
            <div className="Loader">
              <ThreeDots
                height="20"
                width="20"
                radius="9"
                color="black"
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

  const MainCont = ({ title, clickLoading, loading, onSecClick, data }) => {
    return (
      <div className="Main-Content-Container">
        <div className="Main-Content">
          <h2 className="Subtitle">{title}</h2>
        </div>

        <TitleButton
          clickLoading={clickLoading}
          loading={loading}
          onSecClick={onSecClick}
        />

        <CompanyList data={data} loading={loading} />
      </div>
    );
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
        <MainCont
          clickLoading={clickedGlassdoor}
          loading={glassDoorLoading}
          onSecClick={handleGlassdoorClick}
          data={glassdoorData}
          title="Glassdoor Ratings"
        />
        <MainCont
          clickLoading={clickedOpenings}
          loading={openingsLoading}
          onSecClick={handleOpeningsClick}
          data={jobData}
          title={"Job Openings"}
        />
      </main>

      <section className="bottom-container">
        <div className="Main-Content">
          <h2 className="Subtitle">{"News"}</h2>

          <button
            className={"News-Submit"}
            onClick={() => setClickedCreateList(true)}
            disabled={clickedCreateList}
          >
            Create
          </button>

          <button
            className="News-Submit"
            onClick={() =>
              displayListInfo
                ? setDisplayListInfo(false)
                : setDisplayListInfo(true)
            }
          >
            View Lists
          </button>
        </div>

        {clickedCreateList ? (
          <div className={"Stock-List-Container"}>
            <input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Name"
              className="Name"
            />

            <div className={"Input-Container"}>
              <input
                className={"News-Input"}
                value={listInputVal}
                onChange={(e) => setListInputVal(e.target.value)}
                placeholder="..."
              />
              <input
                className={"News-Submit"}
                type="submit"
                onClick={handleListVal}
                value="Add"
              />
            </div>

            <div className={"Ticker-List-Container"}>
              {newTickerList?.map((comp, key) => (
                <div className={"Single-Ticker"} key = {key}>
                  <h1 className={"Ticker-List-Text"}>{comp}</h1>
                </div>
              ))}
            </div>

            <div className={"List-Upload-Clear-Container"}>
              <button
                className="Clear-Button"
                onClick={() => {
                  setNewTickerList([]);
                  setListName("");
                  setListInputVal("");
                }}
              >
                Clear
              </button>

              <button className="Button" onClick={handleClickUpload}>
                Upload
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="Lists-Cont">

          {tickerLists?.map((list, key) => (
            <div className="Ticker" key={key}>
              <button
                className="Ticker-Button"
                onClick = {() => handleAllNewsClick(list.data.tickers)}
              >
                {list.name}
              </button>

              {displayListInfo ? (

                
                <div className="Rand-Container">
                  {list?.data?.tickers?.map((ticker, key) => (
                    <h1 className="Tick-Text" key = {key}>{ticker}</h1>
                  ))}

                  <button
                    className="Clear-Button"
                    onClick={() => {
                      handleDelete(list.name);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>

        <div className={"Input-Container"}>
          {clickedNews ? (
            <div className="Loader">
              <ThreeDots
                height="20"
                width="20"
                radius="9"
                color="black"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          ) : (
            <>
              <input
                type="text"
                value={newsSearch}
                onChange={(e) => setNewsSearch(e.target.value)}
                className={"News-Input"}
                placeholder="search..."
              />
              <input
                className={"News-Submit"}
                type="submit"
                value={clickedNews ? "loading" : "search"}
                onClick={handleNewsClick}
                disabled={clickedNews}
              />
            </>
          )}
        </div>

        <div className={"News-Container"}>
          {newsLoading ? (
            <></>
          ) : (
            <>
              {newsData?.map((comp, key) => (
                <a
                  className="new-container"
                  key={key}
                  href={comp.link}
                  target="_blank"
                >
                  <div className="news-header">
                    <h1 className="news-pub">{comp["publisher"]}</h1>
                    <h1 className="news-ticker">{comp["company"]}</h1>
                  </div>
                  <h2 className="news-headline">{comp["headline"]}</h2>
                  <h3 className="news-description">{comp["description"]}</h3>
                  <h4 className="news-date">{comp["date"]}</h4>
                </a>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;

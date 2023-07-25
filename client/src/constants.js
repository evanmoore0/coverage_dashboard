export const constants = {
  news_comps: [
    "Arista Networks",
    "Aviat Networks",
    "Axon Enterprise",
    "Backblaze",
    "Box.com Software",
    "Cambium Networks",
    "Cisco Systems",
    "Dynatrace",
    "New Relic",
    "Nutanix",
    "Ooma",
    "Ribbon Communications",
    "SolarWinds",
    "SoundThinking",
    "Varonis Systems"
  ],
  glassDoor: [
    {
      company: "ANET",
      link: "https://www.glassdoor.com/Reviews/Arista-Networks-Reviews-E295128.htm",
    },
    {
      company: "AVNW",
      link: "https://www.glassdoor.com/Reviews/Aviat-Networks-Reviews-E304176.htm",
    },
    {
      company: "AXON",
      link: "https://www.glassdoor.com/Reviews/Axon-Reviews-E1597674.htm",
    },
    {
      company: "BLZE",
      link: "https://www.glassdoor.com/Reviews/Backblaze-Reviews-E1197085.htm",
    },
    {
      company: "BOX",
      link: "https://www.glassdoor.com/Reviews/Box-Reviews-E254092.htm",
    },
    {
      company: "CMBM",
      link: "https://www.glassdoor.com/Reviews/Cambium-Networks-Reviews-E466115.htm",
    },
    {
      company: "CSCO",
      link: "https://www.glassdoor.com/Reviews/Cisco-Systems-Reviews-E1425.htm",
    },
    {
      company: "DT",
      link: "https://www.glassdoor.com/Reviews/Dynatrace-Reviews-E309684.htm",
    },
    {
      company: "NEWR",
      link: "https://www.glassdoor.com/Reviews/New-Relic-Reviews-E461657.htm",
    },
    {
      company: "NTNX",
      link: "https://www.glassdoor.com/Reviews/Nutanix-Reviews-E429159.htm",
    },
    {
      company: "OOMA",
      link: "https://www.glassdoor.com/Reviews/ooma-Reviews-E273768.htm",
    },
    {
      company: "RBBN",
      link: "https://www.glassdoor.com/Reviews/Ribbon-Communications-Reviews-E2590888.htm",
    },
    {
      company: "SWI",
      link: "https://www.glassdoor.com/Reviews/SolarWinds-Reviews-E100286.htm",
    },
    {
      company: "SSTI",
      link: "https://www.glassdoor.com/Reviews/SoundThinking-Reviews-E366121.htm",
    },
    {
      company: "VRNS",
      link: "https://www.glassdoor.com/Reviews/Varonis-Systems-Reviews-E300225.htm",
    },
  ],
  openings: [
    // {
    //   ticker: "ANET", // Not done
    //   link: "",
    //   xpath: "",
    //   ready: false,
    // },
    // {
    //   ticker: "AVNW", // Good, Last
    //   link: "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=0ec0c5a4-f3ba-4be4-be2b-5d725d77f8ed&ccId=19000101_000001&type=MP&lang=en_US",
    //   xpath: "//*[@id='tileCurrentOpenings']",
    //   ready: false,
    // },
    {
      ticker: "AXON", // Good, First
      link: "https://www.axon.com/careers/board",
      xpath:
        "//*[@id='__next']/main/div[1]/div[5]/div[2]/div[2]/div/div[1]/div",
      ready: true,
    },
    {
      ticker: "BLZE", // Not done
      link: "https://backblaze.hrmdirect.com/employment/job-openings.php?search=true&dept=-1",
      xpath: "",
      ready: false,
    },
      {
        ticker: "BOX", // Good, First
        link: "https://box.eightfold.ai/careers?location=United%20States&domain=box.com",
        xpath: "//*[@id='pcs-body-container']/div[2]/div[1]/div/span/span/strong",
        ready: true,
      },
      {
        ticker: "CMBM", // Not done
        link: "https://www.cambiumnetworks.com/about-cambium/careers/",
        xpath: "",
        ready: false,
      },
    //   {
    //     ticker: "CSCO", // Good, Last
    //     link: "https://jobs.cisco.com/jobs/SearchJobs/?listFilterMode=1",
    //     xpath: "//*[@id='content']/div/div[2]/div[1]/div/span",
    //     ready: true,
    //   },
    //   {
    //     ticker: "DT", // Good, Last,
    //     link: "https://careers.dynatrace.com/jobs/",
    //     xpath:
    //       "//*[@id='content']/section[1]/div[3]/section/form/div[3]/aside/div[2]/div[2]/p/span",
    //     ready: true,
    //   },
    //   {
    //     ticker: "NEWR", // Good, Last
    //     link: "https://newrelic.careers/en_US/careers",
    //     xpath: "//*[@id='main']/div/div/section/div[3]/div[1]/div[1]/div[1]",
    //     ready: true,
    //   },
    //   {
    //     ticker: "NTNX", // Not done
    //     link: "https://nutanix.eightfold.ai/careers?&domain=nutanix.com",
    //     xpath: "//*[@id='target_anchor_']/div/span/div/div/span/div/div/strong",
    //     ready: false,
    //   },
    //   {
    //     ticker: "OOMA", // Not done
    //     link: "https://boards.greenhouse.io/ooma",
    //     xpath: "",
    //     ready: false,
    //   },
    //   {
    //     ticker: "RBBN", // Good, first
    //     link: "https://vhr-genband.wd1.myworkdayjobs.com/ribboncareers",
    //     xpath: "//*[@id='mainContent']/div/div[2]/section/p",
    //     ready: true,
    //   },
    //   {
    //     ticker: "SWI", // Good, Last,
    //     link: "https://jobs.solarwinds.com/jobs/",
    //     xpath: "/html/body/div[7]/div[2]/div/div/p",
    //     ready: true,
    //   },
    //   {
    //     ticker: "SSTI", // Not done
    //     link: "https://www.soundthinking.com/careers/",
    //     xpath: "",
    //     ready: false,
    //   },
    //   {
    //     ticker: "VRNS", // Not done
    //     link: "https://careers.varonis.com/",
    //     xpath: "",
    //     ready: false,
    //   },
  ],

  news: [
    "https://www.google.com/search?q=shot+spotter&tbm=nws&ei=nH6xZMHiDp34kPIPkr-RkAs&start=0&sa=N&ved=2ahUKEwjBoK7R1Y6AAxUdPEQIHZJfBLI4ChDy0wN6BAgEEAQ&biw=1102&bih=642&dpr=2.2",
    "https://www.google.com/search?q=shot+spotter&tbm=nws&ei=Xqa2ZIiGOIz4kPIPpeq38AM&start=10&sa=N&ved=2ahUKEwiIrfegwJiAAxUMPEQIHSX1DT4Q8tMDegQIBBAE&biw=1200&bih=656&dpr=2",
  ],
};

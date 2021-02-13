const cherrio = require("cheerio");
const request = require("request-promise");

const getData = async () => {
  const response = await request({
    uri: "https://www.arrivia.com/careers/job-openings/",
    transform: (body) => cherrio.load(body),
  });

  let information = [];
  let titles = [];
  let citys = [];
  let urls = [];

  // titulos
  response(".job-search-result div.col-xs-12 h3").each((i, el) => {
    titles[i] = response(el).html();
  });

  // ciudad
  response(".job-search-result div.col-xs-12 p").each((i, el) => {
    citys[i] = response(el).html();
  });

  // url
  response(".job-search-result div.col-xs-12 a").each((i, el) => {
    urls[i] = response(el).attr("href");
    information[i] = { title: titles[i], city: citys[i], url: urls[i] };
  });

  console.log(information);
};

getData();

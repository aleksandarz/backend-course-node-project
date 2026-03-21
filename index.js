import * as fs from "fs";
import * as http from "http";
import * as url from "url";
import * as path from "path";
import * as slugify from "slugify";
import { replaceTemplate } from "./modules/replaceTemplate.js";

// ****************************************************************
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// // console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// // Non-blocking, synchronous way
// fs.readFile("./txt/startt.txt", "utf-8", (err, data1) => {
//     if (err) return console.log("ERROR!");
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(data2);
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//             console.log(data3);
//             fs.writeFile(
//                 "./txt/final.txt",
//                 `${data2}\n${data3}`,
//                 "utf-8",
//                 (err) => {
//                     if (err) throw Error;
//                     console.log("Final file writen.");
//                 },
//             );
//         });
//     });
// });
// console.log("Will read file");

// ****************************************************************
// SERVER

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = myUrl.pathname;
  const query = Object.fromEntries(myUrl.searchParams);

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  }
  // product page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }
  // 404 - Not Found page
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page not found</h1>");
  }
});

server.listen(PORT, () => console.log("Server is running on http://localhost:8080"));

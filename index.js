import * as fs from "fs";
import * as http from "http";

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

const PORT = 8080;

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === "/" || pathName === "/overview") {
        res.end("This is the overview page.");
    } else if (pathName === "/product") {
        res.end("This is the product page");
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page not found</h1>");
    }
});

server.listen(PORT, () =>
    console.log("Server is running on http://localhost:8080"),
);

const cheerio = require("cheerio")
const axios = require("axios")
const fs = require("fs")
const path = require("path")

const BASE_URL = "https://www.cbn.gov.ng/documents"
const array = [...JSON.parse(fs.readFileSync("./data", "utf8"))];


async function getObj() {
    console.log("Loading......")
    const response = await axios({
        url: `${BASE_URL}/policycirculars.asp`,
        headers: { "Accept": "text/html" }
    })

    const $ = cheerio.load(response.data)
    const paginationLinks = $("#ContentTextinner > a[target=_self]")

    for (let i = array[array.length - 1]?.pageNumber || 0; i < paginationLinks.length; i++) {
        const paginationLink = paginationLinks.eq(i).attr("href")
        const pageinationNumber = paginationLinks.eq(i).text()

        let response, $, docs;

        while (true) {
            try {
                response = await axios({
                    url: `${BASE_URL}/${paginationLink}`,
                    headers: { "Accept": "text/html" }
                })

                $ = cheerio.load(response.data)
                docs = $(".dbasetable[valign='top']")

                if (docs.length !== 0) break;

            } catch (error) {
                continue;
            }
        }

        for (let i = 0; i < docs.length; i++) {
            const doc = docs.eq(i)

            array.push({
                pageNumber: pageinationNumber,
                reference: doc.find('td:first-child').text(),
                document: `${BASE_URL}/${doc.find("td a").attr("href")}`,
                title: doc.find("td a").text(),
                timestamp: doc.find("td:nth-child(2) #publishedDt").text().split(" ")[2]
            })


            fs.writeFileSync(path.join("data"), JSON.stringify(array))
        }

        console.log(array)
    }

}

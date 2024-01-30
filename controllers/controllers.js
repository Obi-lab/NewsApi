const axios=require("axios");
const cheerio = require('cheerio');

const fetchAll= async(req,res)=>{
    try {
        const articles = [];
        const newspaper = {  
            name: 'nytimes',
            address: 'https://www.nytimes.com/section/technology'
        };
        const response = await axios.get(newspaper.address);
        const html = response.data;
        const $ = cheerio.load(html);

        $('.css-10wtrbd').each(function() {
            const title = $(this).find('h3.css-miszbp.e1hr934v2 a').text();
            const url = 'https://www.nytimes.com' + $(this).find('h3.css-miszbp.e1hr934v2 a').attr('href');

            articles.push({
                title,
                url,
            });
        });

        res.json(articles);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
    fetchAll
}
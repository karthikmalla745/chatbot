import type {NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios';
import cheerio from 'cheerio';

type Data = {
    name: string
  }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

  const { websiteUrl } = req.query;

  try {
    const response = await axios.get(websiteUrl);
    console.log("response.................................................................",response)
    const html = response.data;
    const $ = cheerio.load(html);
    const links = [];

    // Extract href attributes from <a> tags
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      console.log(href)
      if (href) {
        links.push(href);
      }
    });

    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while crawling the website' });
  }
}
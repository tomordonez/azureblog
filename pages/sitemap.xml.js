import { getSortedPostsData } from '../lib/posts';

const BASE_URL = 'https://azureblog.tomordonez.com/posts';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://azureblog.tomordonez.com</loc>
       <changefreq>daily</changefreq>
       <priority>1</priority>
     </url>
     ${posts
      .map(({ id }) => {
        return `
       <url>
           <loc>${`${BASE_URL}/${id}`}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We generate the XML sitemap with the posts data
  const allPostsData = getSortedPostsData();
  const sitemap = generateSiteMap(allPostsData);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
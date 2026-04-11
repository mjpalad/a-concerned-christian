const fs = require('fs');
const path = require('path');
const https = require('https');
const { XMLParser } = require('fast-xml-parser');

const RSS_FILE = path.join(process.cwd(), 'public', 'podcast-feed.xml');
const TRANSCRIPT_DIR = path.join(process.cwd(), 'public', 'transcripts');

async function download(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  if (!fs.existsSync(RSS_FILE)) {
    console.error('RSS file not found');
    process.exit(1);
  }

  if (!fs.existsSync(TRANSCRIPT_DIR)) {
    fs.mkdirSync(TRANSCRIPT_DIR, { recursive: true });
  }

  const xmlData = fs.readFileSync(RSS_FILE, 'utf-8');
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ""
  });
  
  const jsonObj = parser.parse(xmlData);
  let items = jsonObj.rss.channel.item;

  // Handle case where there's only one item (parser might not make it an array)
  if (items && !Array.isArray(items)) {
    items = [items];
  }

  if (!items) {
    console.log('No items found in RSS feed');
    return;
  }

  console.log(`Found ${items.length} episodes. Checking for transcripts...`);

  for (const item of items) {
    const guid = item.guid?.['#text'] || item.guid || item.link;
    const transcriptElement = item['podcast:transcript'];
    const transcriptUrl = Array.isArray(transcriptElement) 
      ? transcriptElement[0]?.url 
      : transcriptElement?.url;

    if (transcriptUrl && guid) {
      // Clean guid for filename
      const safeId = guid.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filePath = path.join(TRANSCRIPT_DIR, `${safeId}.txt`);
      
      console.log(`Downloading transcript for: ${item.title}`);
      try {
        await download(transcriptUrl, filePath);
        console.log(`Saved to ${filePath}`);
      } catch (err) {
        console.error(`Failed to download transcript for ${item.title}:`, err.message);
      }
    }
  }
}

main();

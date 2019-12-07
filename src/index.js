import Twitter from 'twitter';

import config from './AuthKeys';
import { TrendMeme, ReplyMeme, Mentions, getTrends, checkReply } from './Utils';

const client = new Twitter(config);

let lastReply = '';

setInterval(() => {
  getTrends(client)
    .then(trends => {
      const { name } = trends[0].trends[0];
      console.log('\n###');
      console.log(`Tweetando no trend: ${name}`);
      console.log('###');
      TrendMeme(client, name);
    })
    .catch(err => {
      throw err;
    });
}, 1000 * 60 * 60);

setInterval(() => {
  console.log('Checking mentions again...');

  Mentions(client)
    .then(mentions => {
      if (mentions.length !== 0) {
        const mustReply = checkReply(mentions[0], lastReply);
        if (mustReply) {
          console.log('\n###');
          console.log('Replying');
          console.log('###');
          lastReply = String(mentions[0].id);
          ReplyMeme(client, mentions[0].user.screen_name, mentions[0].id_str);
        }
      }
      console.log('No new mentions...');
    })
    .catch(err => {
      throw err;
    });
}, 600000);

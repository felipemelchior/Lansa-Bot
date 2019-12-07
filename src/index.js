import Twitter from 'twitter';

import config from './AuthKeys';
import { TweetMeme, Mentions, checkReply } from './Utils';

const client = new Twitter(config);

let lastReply = '';

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
          TweetMeme(client, mentions[0].user.screen_name, mentions[0].id_str);
        }
      }
      console.log('No new mentions...');
    })
    .catch(err => {
      throw err;
    });
}, 5000);

import 'dotenv/config';
import lansaMeme from '../Image';

export function TweetMeme(client, user, in_reply_to_status_id) {
  return new Promise((resolve, reject) => {
    client.post('media/upload', { media: lansaMeme }, function(error, media) {
      if (!error) {
        const status = {
          status: `@${user}`,
          media_ids: media.media_id_string,
          auto_populate_reply_metadata: true,
          in_reply_to_status_id,
        };

        client.post('statuses/update', status, function(err, tweet) {
          if (!err) {
            resolve(tweet);
          } else {
            reject(err);
          }
        });
      } else {
        reject(error);
      }
    });
  });
}

export function Mentions(client) {
  return new Promise((resolve, reject) => {
    client.get('statuses/mentions_timeline', (error, mentions) => {
      if (!error) {
        resolve(mentions);
      } else {
        reject(error);
      }
    });
  });
}

export function checkReply(reply, lastReply) {
  if (String(reply.id) === lastReply) {
    return false;
  }
  console.log('Must Reply!');
  return true;
}

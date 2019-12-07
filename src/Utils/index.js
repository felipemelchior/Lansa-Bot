import lansaMeme from '../Image';

export function TweetMeme(client) {
  client.post('media/upload', {media: lansaMeme}, function(error, media, response) {
    if (!error) {
      console.log(media);
      var status = {
        status: 'Lansou',
        media_ids: media.media_id_string 
      }
  
      client.post('statuses/update', status, function(error, tweet, response) {
        if (!error) {
          console.log(tweet);
        }
      });
    }
  });
}


export function Replies(client) {
  client.get('statuses/mentions_timeline', (error, replies, response) => {
    if(!error){
      return replies;
    }
  });
}

import Twitter from 'twitter';

import config from './AuthKeys';
import { TweetMeme, Replies } from './Utils';

const client = new Twitter(config);

TweetMeme(client)


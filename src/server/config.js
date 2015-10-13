export default {
  askstories: `https://hacker-news.firebaseio.com/v0/askstories.json`,
  jobstories: `https://hacker-news.firebaseio.com/v0/jobstories.json`,
  newstories: `https://hacker-news.firebaseio.com/v0/newstories.json`,
  showstories: `https://hacker-news.firebaseio.com/v0/showstories.json`,
  topstories: `https://hacker-news.firebaseio.com/v0/topstories.json`,
  item: id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  updates: `https://hacker-news.firebaseio.com/v0/updates.json`,
  user: id => `https://hacker-news.firebaseio.com/v0/user/${id}.json`
};

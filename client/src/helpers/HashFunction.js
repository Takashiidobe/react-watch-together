const HashFunction = () => {
  let base62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  base62 = base62.split("");
  let answer = [];
  (function findEight() {
    for (let i = 0; i < 8; i++) {
      answer.push(Math.floor(Math.random() * 62));
    }
    return answer;
  })();
  let url = [];
  for (let i in answer) {
    url.push(base62[answer[i]]);
  }
  url = url.join("");
  return url;
};

export default HashFunction;

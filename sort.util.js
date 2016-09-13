export function sortByLikes(a, b) {
  if(a.likes > b.likes) {
    return 1;
  } else if(a.likes < b.likes) {
    return -1
  } else {
    return 0;
  }
}

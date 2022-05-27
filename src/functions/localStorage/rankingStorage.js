const saveRanking = (rankingArray) => {
  localStorage.setItem('ranking', JSON.stringify(rankingArray));
};

export default saveRanking;

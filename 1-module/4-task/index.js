function checkSpam(str) {
  const spamList = ['1xBet', 'XXX'];
  for (const spam of spamList) {
    if (str.toLowerCase().includes(spam.toLowerCase())) {
      return true;
    }
  }
  return false;
}

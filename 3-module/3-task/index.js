function camelize(str) {
  if (str && str.length > 0) {
    let words = str.split('-')
    for (let word = 1; word < words.length; word++) {
      words[word] = toUpperCase(words[word])
    }
    return words.join('')
  }
  return str
}

function toUpperCase(word) {
  if (word === '') {
    return word
  } else if (word.length === 1) {
    return word.toUpperCase()
  } else {
    return word.slice(0, 1).toUpperCase() + word.slice(1)
  }
}

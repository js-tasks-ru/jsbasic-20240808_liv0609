function hideSelf() {
  const hiddenButton = document.querySelector('.hide-self-button');
  if (hiddenButton) {
    hiddenButton.addEventListener('click', () => {
      hiddenButton.hidden = true;
    });
  }
}

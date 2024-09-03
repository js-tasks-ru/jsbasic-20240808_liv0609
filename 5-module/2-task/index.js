function toggleText() {
  const toggleButton = document.querySelector('.toggle-text-button');
  const text = document.getElementById('text');

  if (!toggleButton || !text) {
    return;
  }

  toggleButton.addEventListener('click', () => {
    if (text.getAttribute('hidden')) {
      text.removeAttribute('hidden');
    } else {
      text.setAttribute('hidden', 'true');
    }
  });
}

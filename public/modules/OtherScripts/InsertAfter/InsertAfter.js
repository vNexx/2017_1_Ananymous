const insertAfter = ((element, previousElement) => {
  return previousElement.parentNode.insertBefore(element, previousElement.nextSibling);
});

export default insertAfter;

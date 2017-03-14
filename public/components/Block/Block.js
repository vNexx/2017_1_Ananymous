export default class Block {
  constructor(name = 'div', attributes = {}) {
    this._name = name;
    this._element = this._createDocumentElement(this._getNameElement());
    delete attributes.block;
    this.setAttributes(attributes);
  }

  setAttributeBlock(name, value) {
    this._getElement().setAttribute(name, value);
  }

  setAttributes(attributes) {
    this._setText(attributes);
    this._getKeys(attributes).forEach(name => {
      this._setAttribute(name, attributes[name]);
    });
  }

  setText(text) {
    this._getElement().textContent = text;
  }

  append(child) {
    this._getElement().appendChild(child);
  }

  render() {
    return this._getElement();
  }

  renderTo(element) {
    element.appendChild(this.render());
  }

  // remove() {
  //   document.querySelector(this._getNameElement()).remove();
  // }

  search(block) {
    return this._getElement().querySelector(block);
  }

  _createDocumentElement(name) {
    return document.createElement(name);
  }

  _createBlock(name, options = {}) {
    return new Block(name, options);
  }

  _setAttribute(name, value) {
    return typeof value === 'boolean' ? this.setAttributeBlock(name, name) : this.setAttributeBlock(name, value);
  }

  _getNameElement() {
    return this._name;
  }

  _setText(attributes) {
    if (this._checkText(attributes)) {
      this.setText(attributes.text);
      delete attributes.text;
    }
  }

  _checkText(attributes) {
    return attributes.text !== undefined;
  }

  _getElement() {
    return this._element;
  }

  _getKeys(data) {
    return Object.keys(data);
  }

  _find(tag) {
    return this._getElement().querySelector(tag);
  }

  init(options = {}) {

  }

  pause() {
    this.hide();
  }

  resume() {
    this.show();
  }

  show() {
    this._getElement().style.display = 'block';
  }

  hide() {
    this._getElement().style.display = 'none';
  }

  appendTo(element) {
    element.appendChild(this._getElement());
  }

  remove() {
    this._getElement() && this._getElement().remove();
  }

  setElement(el) {
    this._getElement() && this._getElement().remove();
    this._element = el;
  }

  setRouter(router) {
    this._router = router;
  }

  getRouter() {
    return this._router;
  }

  toString() {
    return this._getElement().outerHTML;
  }
}

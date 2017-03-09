'use strict';

// Получаем ссылки на элементы страницы
const indexPage = document.getElementById('indexPage');
const menu1Page = document.getElementById('menu1Page');
const loginPage = document.getElementById('loginPage');
const registerPage = document.getElementById('registerPage');
const menu2Page = document.getElementById('menu2Page');
const gameMenuPage = document.getElementById('gameMenuPage');
const settingsPage = document.getElementById('settingsPage');
const ratingPage = document.getElementById('ratingPage');
const quitPage = document.getElementById('quitPage');

var currentPage = indexPage;

//скрываем остальные страницы
menu1Page.hidden = true;
loginPage.hidden = true;
registerPage.hidden = true;
menu2Page.hidden = true;
gameMenuPage.hidden = true;
settingsPage.hidden = true;
ratingPage.hidden = true;
quitPage.hidden = true;

function showPage(page) {
  currentPage.hidden = true;
  page.hidden = false;
  currentPage = page;
}

//indexPage elements
const index__hintButton = document.getElementById('hint');

//menu1Page elments
const menu1__toLoginButton = document.getElementById('menu1__to-login-button');
const menu1__toRegisterButton = document.getElementById('menu1__to-register-button');

//loginPage elements
const login__submitButton = document.getElementById('login__submit-button');
const login__toRegisterButton = document.getElementById('login__to-register-button');
const login__backButton = document.getElementById('login__back-button');

//registerPage elements
const register__submitButton = document.getElementById('register__submit-button');
const register__backButton = document.getElementById('register__back-button');

//menu2Page elements
const menu2__gameMenuButton = document.getElementById('menu2__game-menu-button');
const menu2__settingsButton = document.getElementById('menu2__settings-button');
const menu2__ratingButton = document.getElementById('menu2__rating-button');
const menu2__quitButton = document.getElementById('menu2__quit-button');

//gameMenuPage elements
const gameMenu__backButton = document.getElementById('game-menu__back-button');

//settingsPage elements
const settings__backButton = document.getElementById('settings__back-button');

//ratingPage elements
const rating__backButton = document.getElementById('rating__back-button');

//quitPage elements
const quit__yesButton = document.getElementById('quit__yes-button');
const quit__noButton = document.getElementById('quit__no-button');


index__hintButton.addEventListener('click', function (event) {
	showPage(menu1Page);
});

menu1__toLoginButton.addEventListener('click', function (event) {
	showPage(loginPage);
});

menu1__toRegisterButton.addEventListener('click', function (event) {
	showPage(registerPage);
});

login__submitButton.addEventListener('click', function (event) {
	showPage(menu2Page);
});

login__toRegisterButton.addEventListener('click', function (event) {
	showPage(registerPage);
});

login__backButton.addEventListener('click', function (event) {
	showPage(menu1Page);
});

register__submitButton.addEventListener('click', function (event) {
	showPage(menu2Page);
});

register__backButton.addEventListener('click', function (event) {
	showPage(menu1Page);
});

menu2__gameMenuButton.addEventListener('click', function (event) {
	showPage(gameMenuPage);
});

menu2__settingsButton.addEventListener('click', function (event) {
	showPage(settingsPage);
});

menu2__ratingButton.addEventListener('click', function (event) {
	showPage(ratingPage);
});

menu2__quitButton.addEventListener('click', function (event) {
	showPage(quitPage);
});

gameMenu__backButton.addEventListener('click', function (event) {
  showPage(menu2Page);
});

settings__backButton.addEventListener('click', function (event) {
  showPage(menu2Page);
});

rating__backButton.addEventListener('click', function (event) {
  showPage(menu2Page);
});

quit__yesButton.addEventListener('click', function (event) {
  showPage(menu1Page);
});

quit__noButton.addEventListener('click', function (event) {
  showPage(menu2Page);
});

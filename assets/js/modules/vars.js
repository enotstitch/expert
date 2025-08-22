export const root = document.documentElement;
export const mobileWidth = getComputedStyle(root).getPropertyValue('--mobile-width').trim();
export const body = document.querySelector('body');
export const header = document.querySelector('.header');
export const menuBody = document.querySelector('.menu__body');
export const menuList = document.querySelector('.menu__list');
export const menuLinks = document.querySelectorAll('a[data-goto]');
export const burgerMenuBtn = document.querySelector('.burger');

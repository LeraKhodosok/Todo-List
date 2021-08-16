let date = new Date();
const d = document.querySelector('.day');
const m = document.querySelector('.month');
const y = document.querySelector('.year');
const w = document.querySelector('.week');

const text = document.querySelector('span');

const add = document.querySelector('.add_btn');
const popup = document.querySelector('.popup');
const main = document.querySelector('.main');

const cancel = document.querySelector('.cancel');
const add_by_input = document.querySelector('.add');

let month = ["Jan","Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let week = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

d.innerHTML = date.getDate().toString();
m.innerHTML = month[date.getMonth().toString()]
y.innerHTML = date.getFullYear().toString();
w.innerHTML = week[date.getDay().toString()];

document.addEventListener("DOMContentLoaded",function(){
    this.forms[0].addEventListener("click",() => {
        text.classList.toggle('active');
    });
});

add.addEventListener('click', () => {
    popup.classList.toggle('active');
    main.classList.toggle('active');
    popup.classList.remove('hide');
})

cancel.addEventListener('click', () => {
    main.classList.remove('active');
    popup.classList.toggle('hide');
    popup.classList.remove('active');
})





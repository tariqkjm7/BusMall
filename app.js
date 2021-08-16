'use strict'
let attemptsEl = document.getElementById('attempts');
let contanier = document.getElementById('contanier');
let leftImg = document.getElementById('leftImg');
let centerImg = document.getElementById('centerImg');
let rightImg = document.getElementById('rightImg');
let results = document.getElementById('results');


let productImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg',
    'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg',
    'cthulhu.jpg', 'dog-duck.jpg', 'pen.jpg', 'pet-sweep.jpg',
    'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'water-can.jpg',
    'wine-glass.jpg', 'unicorn.jpg']

let productImages = ['bag.jpg','banana.jpg','bathroom.jpg',
'boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg',
'cthulhu.jpg','dog-duck.jpg','pen.jpg','pet-sweep.jpg',
'scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','water-can.jpg',
'wine-glass.jpg','unicorn.jpg']

let maxAttempts = 25;
let attempts = 1;
// pre att //// include 
let product = [];
let prName = [];
let nVotes = [];
let nViews = [];



function Images(productName) {
    this.pName = productName.split('.')[0];

    this.pImg = `images/${productName}`

    this.votes = 0;
    this.views = 0;

    product.push(this);



}

for (let i = 0; i < productImages.length; i++) {

    new Images(productImages[i])
}

console.log(product);


function randomImage() {
    return Math.floor(Math.random() * product.length)

}

let leftIndex;
let centerIndex;
let rightIndex;


let arr = [];

function renderImg() {
        leftIndex = randomImage();
    centerIndex = randomImage();
    rightIndex = randomImage();

    while (leftIndex === centerIndex ||
        centerIndex === rightIndex ||
        leftIndex === rightIndex ||arr.includes(leftIndex) ||
          arr.includes(centerIndex) ||
           arr.includes(rightIndex) ) {


        leftIndex = randomImage();
        centerIndex = randomImage();
        rightIndex = randomImage();

    }

    arr[0] = (leftIndex);
    arr[1] = (centerIndex);
    arr[2] = (rightIndex);


    // while (arr.includes(leftIndex) ||
    //     arr.includes(centerIndex) ||
    //     arr.includes(rightIndex)) {

    //     leftIndex = randomImage();
    //     centerIndex = randomImage();
    //     rightIndex = randomImage();

    //     arr.push(leftIndex);
    //     arr.push(centerIndex);
    //     arr.push(rightIndex);
    // }


    console.log(arr);


    leftImg.setAttribute('src', product[leftIndex].pImg)
    centerImg.setAttribute('src', product[centerIndex].pImg)
    rightImg.setAttribute('src', product[rightIndex].pImg)

    product[leftIndex].views++;
    product[centerIndex].views++;
    product[rightIndex].views++;

}
renderImg()
leftImg.addEventListener('click', clickHandler);
centerImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (attempts <= maxAttempts) {
        let clickedImg = event.target.id;
        if (clickedImg === 'leftImg') {
            product[leftIndex].votes++;
        } else if (clickedImg === 'centerImg') {
            product[centerIndex].votes++;

        } else if (clickedImg === 'rightImg') {
            product[rightIndex].votes++;
        }
        renderImg();
        attempts++;
    }
}

let btn = document.getElementById('button');

btn.addEventListener('click', showResult);

function showResult() {

    for (let i = 0; i < product.length; i++) {

        let liEl = document.createElement('li');
        results.appendChild(liEl);
        liEl.textContent = `${product[i].pName} product
        has ${product[i].votes} votes  and
        ${product[i].views} views `
        nVotes.push(product[i].votes);
        nViews.push(product[i].views);
        prName.push(product[i].pName)
    }
    chartRender();
}



//////////////CHART///////////////////////////////

function chartRender() {


    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: prName,
            datasets: [{
                label: '# number of Votes',
                data: nVotes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1
            }, {
                label: '# number of Viwes',
                data: nViews,
                backgroundColor: [

                    'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [

                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

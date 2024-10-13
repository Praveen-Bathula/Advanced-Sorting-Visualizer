const arrayContainer = document.getElementById('array-container');
const sortButton = document.getElementById('sort-button');
const arrayInput = document.getElementById('array-input');
const sortAlgorithm = document.getElementById('sort-algorithm');
const sortedNumbersElement = document.getElementById('sorted-numbers');
let array = [];
let delay = 500;

function generateBars(inputArray) {
    arrayContainer.innerHTML = '';
    array = inputArray.map(Number);
    array.forEach((value) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        arrayContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = '#ffeb3b';
            bars[j + 1].style.backgroundColor = '#ffeb3b';

            if (array[j] > array[j + 1]) {
                await swap(bars[j], bars[j + 1], j, j + 1);
            }

            bars[j].style.backgroundColor = '#03a9f4';
            bars[j + 1].style.backgroundColor = '#03a9f4';
        }
        bars[array.length - i - 1].style.backgroundColor = '#00e676';
    }
    bars[0].style.backgroundColor = '#00e676';
    sortedNumbersElement.textContent = array.join(', ');
}

async function swap(bar1, bar2, idx1, idx2) {
    await sleep(delay);
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;

    bar1.style.height = `${array[idx1] * 3}px`;
    bar2.style.height = `${array[idx2] * 3}px`;
}

async function selectionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = '#ffeb3b';
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = '#ffeb3b';
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            bars[j].style.backgroundColor = '#03a9f4';
        }
        if (minIndex !== i) {
            await swap(bars[i], bars[minIndex], i, minIndex);
        }
        bars[i].style.backgroundColor = '#00e676';
    }
    sortedNumbersElement.textContent = array.join(', ');
}

async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = '#ffeb3b';
        while (j >= 0 && array[j] > key) {
            await sleep(delay);
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j] * 3}px`;
            bars[j].style.backgroundColor = '#ffeb3b';
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[i].style.backgroundColor = '#00e676';
    }
    sortedNumbersElement.textContent = array.join(', ');
}

sortButton.addEventListener('click', () => {
    const input = arrayInput.value;
    if (!input) return;
    
    const inputArray = input.split(',').map((num) => parseInt(num.trim(), 10));
    generateBars(inputArray);

    const algorithm = sortAlgorithm.value;
    if (algorithm === 'bubble') {
        bubbleSort();
    } else if (algorithm === 'selection') {
        selectionSort();
    } else if (algorithm === 'insertion') {
        insertionSort();
    }
});

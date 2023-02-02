// Binary Search for a value "target" in a sorted array
// Time Complexity: O(log N)

function linear(arr, target) {
  let leftBound = 0;
  let rightBound = arr.length - 1;
  let mid = Math.floor(rightBound / 2);

  while (leftBound <= rightBound) {
    if (target === arr[mid])
      return console.log(mid);
    if (target < arr[mid]) {
      rightBound = mid-1;
    }
    else leftBound = mid+1;
    mid = Math.floor((leftBound + rightBound) / 2);
  }
  return console.log("Target value not found");
}

// linear([1, 2, 3, 6, 7, 12, 23, 33], 112);



// COUNT ZEROES
// Time Complexity: O(log N)

//Given an array of 1s and 0s which has all 1s first
//followed by all 0s, count all 0s

function countZeroes(arr) {
  let leftBound = 0;
  let rightBound = arr.length - 1;
  let mid = Math.floor(rightBound / 2);

  if (mid === 0 && arr[0] === 0) return 1;

  while (leftBound <= rightBound) {
    if (arr[mid] !== 0) {
      leftBound = mid + 1;
      if (arr[leftBound] === 0)
        return arr.length - leftBound;
    }
    else {
      rightBound = mid - 1;
      if (arr[rightBound] === 1)
        return arr.length - mid;
    }
    mid = Math.floor((leftBound + rightBound) / 2);
  }
  return console.log("No zeroes found");
}

// console.log(countZeroes([1, 1, 1, 1, 1, 1, 1, 0]));
// countZeroes([0]);



//SORTED FREQUENCY
// Given a sorted array and a number, 
// print the occurrences of the number in the array
// Time Complexity: O(log N)

function sortedFrequency(arr, target) {
  let leftBound = 0;
  let rightBound = arr.length - 1;
  let mid = Math.floor(rightBound / 2);
  let freq = [];
  
  // search for left limit and save in freq[0]

  while (leftBound <= rightBound) {
// searching right of target
    if (target <= arr[mid]) {
      rightBound = mid - 1;
      if (arr[leftBound] === target) {
        freq[0] = leftBound;
        break;
      }
    }
// searching left or target
    if (target > arr[mid]) {
      leftBound = mid + 1;
      if (arr[leftBound] === target) {
        freq[0] = leftBound;
        break;
      }
    }
    mid = Math.floor((leftBound + rightBound) / 2);
  }

  // reset search for right limit
  
  leftBound = 0;
  rightBound = arr.length - 1;
  mid = Math.floor(rightBound / 2);

  // search for right limit and save in freq[1]

  while (leftBound <= rightBound) {
// searching left or target
    if (target >= arr[mid]) {
      leftBound = mid + 1;
      if (arr[rightBound] === target) {
        freq[1] = rightBound;
        break;
      }
    }
// searching right of target
    if (target < arr[mid]) {
      rightBound = mid - 1;
      if (arr[rightBound] === target) {
        freq[1] = rightBound;
        break;
      }
    }
    mid = Math.floor((leftBound + rightBound) / 2);
  }
// res = differrence betwwen right limit and left limit +1
  const res = (freq[0] === undefined) ? -1 : freq[1] - freq[0] + 1;
  return console.log(res);
}

// sortedFrequency([1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3], 1);



/**
 * FIND FLOOR
 * 
  Function accepts a sorted array and a value x
  and returns the floor of x in the array which is
  the largest element in the array which is smaller than or equal to x.
  If the floor does not exist, return -1.

Time Complexity: O(log N)
 */


function findFloor(arr, target, start = 0, end = arr.length - 1) {
  if (start > end) return -1;
  if (target >= arr[end]) return arr[end];

  let mid = Math.floor((start + end) / 2)

  if (arr[mid] === target) return arr[mid];

  if (mid > 0 && arr[mid - 1] <= target && target < arr[mid]) {
    return arr[mid - 1];
  }

  if (target < arr[mid]) {
    return findFloor(arr, target, start, mid - 1);
  }

  return findFloor(arr, target, mid + 1, end)
}

// console.log(findFloor([1, 2,, 3, 4, 5, 6, 7, 8, 10, 10, 12, 19], 11));



// FIND ROTATION COUNT
/**
 * Function accepts an array of distinct numbers sorted in increasing order.
 * The array has been rotated counter-clockwise n number of times.
 * Given such an array, find the value of n.

Time Complexity: O(log N)
 */

function findRotationCount(arr, start = 0, end = arr.length - 1) {
  if (end < start) return 0;
  if (end === start) return start;
  let mid = Math.floor((start + end) / 2)

  // Is arr[mid+1] the minimum?
  if (mid < end && arr[mid + 1] < arr[mid])
    return mid + 1;

  // Is arr[mid] the minimum?
  if (mid > start && arr[mid] < arr[mid - 1]) {
    return mid;
  }

  if (arr[end] > arr[mid]) {
    return findRotationCount(arr, start, mid - 1);
  }

  return findRotationCount(arr, mid + 1, end);
}

 
//console.log(findRotationCount([7, 1, 2, 3, 5, 6]));

/**
 * Find Rotated Index
  The function accepts a rotated array of sorted numbers
  and an integer. The function should return the index of num
  in the array. If the value is not found, return -1.

  Time Complexity: O(log N)
 */
function findRotatedIndex(array, num) {
  var pivot = findPivot(array)
  if (pivot > 0 && num >= array[0] && num <= array[pivot - 1]) {
    return binarySearch(array, num, 0, pivot - 1);
  } else {
    return binarySearch(array, num, pivot, array.length - 1);
  }
}

function binarySearch(array, num, start, end) {
  if (array.length === 0) return -1;
  if (num < array[start] || num > array[end]) return -1;

  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    if (array[mid] === num) {
      return mid;
    } else if (num < array[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}

function findPivot(arr) {
  if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;
  var start = 0
  var end = arr.length - 1;
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    if (arr[mid] > arr[mid + 1]) return mid + 1
    else if (arr[start] <= arr[mid]) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
}

// findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
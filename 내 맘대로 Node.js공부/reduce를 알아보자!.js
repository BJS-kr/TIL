// reduce는 map과 더불어 아주 강력한 활용도를 지니므로, 각종 구현을 위해 꼭 숙달해야한다.

// 1. reduce의 acc는 return 할 때마다 대체 된다.
// 예를 들어, 아래와 같이 초기값을 빈 오브젝트로 출발시킨다고 해도 acc+cur는 에러없이 출력된다.
a = {1:'a', 2:'a', 3:'a', 4:'a', 5:'a', 6:'b', 7:'b'};

const d = Object.values(a).reduce((acc,cur,i) => {
    if (i === 0) {
        return cur;
    }else{
        return acc+cur;
    } 
},{})

console.log(d);

// 1-2. 위 개념에서 출발하면 아래 코드가 왜 return때마다 굳이 굳이 객체(return {})로 반환되어야 하는지가 이해된다. 현재까지 쌓인 acc객체에 cur를 통한 조작이 추가된 상태로 반환되어야 하기 때문이다.
// 예를 들어 acc가 빈 어레이로 출발해서 acc.push(값); return acc와는 상황이 다른 것 이다.
a = {1:'a', 2:'a', 3:'a', 4:'a', 5:'a', 6:'b', 7:'b'};

const b = Object.values(a).reduce((acc,cur,i) => {
    console.log(acc);
    return {
        ...acc,
        [cur]: acc[cur] ? acc[cur] + 1 : 1
    }
},{});

console.log(b);


// 2. 초기 값을 지정하지 않는다면 객체의 첫번째 값이 acc가 된다.
a = [1,2,3,4,5]

console.log(a.reduce((acc,curr,i) => {
        console.log(curr);
    },[])
);
// 1 2 3 4 5 undefined

console.log(a.reduce((acc,curr,i) => {
    console.log(curr);
})
);
// 2 3 4 5 undefined

// 3. reduce는 사용하기 나름이다. 예컨대, 아래와 같이 promise를 구현할 수도 있다.
const promiseFactory = (time) => {
  return new Promise((resolve, reject) => {
    console.log(time); 
    setTimeout(resolve, time);
  });
};

[1000, 2000, 3000, 4000].reduce((acc, cur) => {
  return acc.then(() => promiseFactory(cur));
}, Promise.resolve());


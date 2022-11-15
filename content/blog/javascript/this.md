---
date: "2022-11-15"
title: this
category: "javascript"
---

## this 란?

this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

> **this 바인딩**
> 바인딩이란 식별자와 값을 연결하는 과정을 의미한다.
> ex) 변수 선언은 변수 이름과 확보된 메모리 공간의 주소를 바인딩하는 것이다.
> this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다)와 this가 가리킬 객체를 바인딩하는 것이다.

> **렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.**
>
> - 렉시컬 함수 : 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다.
> - this 바인딩 : 함수 호출 시점에 결정된다.

## 함수를 호출하는 방식

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. apply/call/bind 메서드에 의한 간접 호출

### 1. 일반 함수 호출

기본적으로 this에는 전역 객체가 바인딩된다.

```js
function foo() {
  console.log("foo's this: ", this) // window
  function bar() {
    console.log("bar's this: ", this) // window
  }
  bar()
}
foo()
```

일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩딘다.

```js
var value = 1

const obj = {
  value: 100,
  foo() {
    setTimeout(() => console.log(this.value), 100) // 100
  },
}
obj.foo()
```

화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.

### 2. 메서드 호출

메서드 내부의 this에는 메서드를 호출한 객체, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표(.) 연산자 앞에 기술한 객체가 바인딩된다.

주의할 것은 메서드 내부의 this는 메서드를 소유한 객체가 아닌 **메서드를 호출한 객체에 바인딩된다는 것이다.**

```js
const person = {
  name: "Ji",
  getName() {
    return this.name
  },
}
console.log(person.getName()) // Ji
```

### 3. 생성자 함수 호출

생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다.

```js
function Circle(radius) {
  this.radius = radius
  this.getDiameter = function () {
    return 2 * this.radius
  }
}

const circle1 = new Circle(5)
const circle2 = new Circle(10)

console.log(circle1.getDiameter()) // 10
console.log(circle2.getDiameter()) // 20
```

### 4. apply/call/bind 메서드에 의한 간접 호출

```js
function getThisBinding() {
  console.log(arguments) // [Arguments] { '0': 1, '1': 2, '2': 3 }
  return this
}

const thisArg = { a: 1 }

console.log(getThisBinding()) // window

console.log(getThisBinding.apply(thisArg, [1, 2, 3])) // {a:1}
console.log(getThisBinding.call(thisArg, 1, 2, 3)) // {a:1}
console.log(getThisBinding.bind(thisArg)(1, 2, 3)) // {a:1}
```

apply 와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다. 함수를 호출하면 첫번째 인수로 전달한 특정 객체를 호출한 함수의 this에 바인딩한다.

apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.

call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.

```js
var name = "Lee"

const person = {
  name: "Ji",
  foo(callback) {
    setTimeout(callback.bind(this), 100)
  },
}

person.foo(function () {
  console.log(`Hi! my name is ${this.name}.`) // Hi! my name is Ji.
})
```

bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

```js
person.foo(() => {
  console.log(`Hi! my name is ${this.name}.`)
  // Hi! my name is Lee.
})
```

만약 화살표함수를 사용한다면 bind 메서드를 사용할 수 없다.

메서드로 정의한 화살표 함수 내부의 this는 메소드를 소유한 객체, 즉 메소드를 호출한 객체를 가리키지 않고 상위 컨텍스트인 전역 객체 window를 가리킨다. 따라서 화살표 함수로 메소드를 정의하는 것은 바람직하지 않다.

## 참고

- https://poiemaweb.com/js-this
- https://ko.javascript.info/call-apply-decorators

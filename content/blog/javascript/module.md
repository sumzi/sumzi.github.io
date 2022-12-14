---
date: "2022-10-23"
title: 모듈
category: "javascript"
---

- 여러 기능들에 관한 코드가 모여있는 하나의 파일
- 시스템을 이루는 논리적인 일부분
- 장점
  - 유지보수성
  - 네임스페이스화
  - 재사용성

## 모듈이 없다면?

- 전역 스코프 오염
- 예측하기 어렵고 오류를 만든다.
- 변수 충돌, 로딩 순서 취약

## IIFE 방식의 모듈

- 위의 문제를 예방하기 위해 스코프를 사용한다.
- 함수 스코프를 만들어 외부에서 안으로 접근하지 못하도록 공간을 격리한다.
- 스코프 외부로부터 독립적인 스코프를 만들어 사용하여 전역변수 오염을 방지한다.

```
var math = math || {} // math 네임스페이스

(function () {
  function sum(a, b) {
    return a + b
  }
  math.sum = sum // 네임스페이스에 추가
})()
```

## 다양한 모듈 스펙

### CommonJs

- 자바스크립트를 사용하는 모든 환경에서 모듈을 하는 것이 목표
- ` module.exports` 키워드로 모듈을 만들고 `require()` 함수로 불러 들이는 방식
- 모든 파일이 로컬에 존재하여 바로 불러올 수 있음을 전제로 하며, 동기적으로 동작한다.
- 대표적으로 서버 사이트 플랫폼인 `Node.js`에서 이를 사용한다.

### AMD

- Asynchronous Module Definition
- CommonJS 그룹에서 의견이 맞지 않아 나온 사람들이 만든 그룹으로 비동기 모듈에 대한 표준안을 다루는 그룹이다.
- 브라우저 내의 실행에 중점을 두고, 비동기로 로딩되는 환경에서 모듈을 사용하는 것이 목표다.
- `define`, `require` 함수를 이용한다.
- 구현한 유명한 스크립트가 `RequireJS`가 있다.

### UMD

- Universal Module Definition
- AMD기반으로 CommonJS 방식까지 지원하는 통합 형태다.

## ESM(ECMAScript Module)

- 자바스크립트에서 모듈 사용 가능하다.
- `export` 구문으로 모듈을 만들고 `import` 구문으로 가져올 수 있다.
- `<script>`태그로 로딩할 때 `type="module"`을 사용한다.
- 독자적인 모듈 스코프를 갖는다.
- 모든 파일을 네트워크 통신을 통해 가져와야한다.
  - 파일을 하나하나 가져옴
  - js뿐만 아니라 css, 이미지, font 파일도 있음
- 모듈 번들러가 필요하다...

## Module Bundler

- 웹 애플리케이션을 구성하는 자원(HTML, CSS, JS, Image 등)을 모두 각각의 모듈로 보고, 이를 조합해서 병합된 하나의 결과물을 만드는 도구다.

## Webpack

- 프론트엔드 프레임워크에서 많이 사용되는 모듈 번들러이다.
- 의존 관계를 가지고 있는 javascript, css, image 등의 리소스드를 하나의 파일로 번들링하게 도와준다.

### webpack이 해결하려는 문제

1. 자바스크립트 스코프

   - 여러개의 자바스크립트에서 파일에서 선언된 변수와 함수들이 전역적으로 설정되면 그만큼 충돌이나 로딩 순서 등에 취약하다.
   - 이를 모듈이라는 단위로 관리할 수 있게 도와준다.

2. 브라우저별 HTTP 요청 숫자의 제약

   - 브라우저에서 한번에 서버로 보낼 수 있는 HTTP 요청 숫자는 제약되어 있다.
   - 웹팩을 통해 번들링하면 요청해야하는 파일의 수가 적어지므로 더 빠른 성능 개선이 가능하다.

3. Dynamic Loading & Lazy Loading

   - SPA의 단점으로 초기에 필요하지 않은 페이지에 대한 스크립트들도 불러온다.
   - 웹팩을 통해 모듈 번들링을 이용하면 동적으로, 필요한 페이지에 따른 스크립트 모듈을 동적으로 불러오는 것도 가능하다.

4. 웹 개발 작업 자동화

   - HTML, CSS, JS 압축
   - 이미지 압축
   - CSS 전처리기 변환

### entry/output

- `--mode`, `--entry`, `--output` 세 개 옵션만 사용하면 코드를 묶을 수 있다.
- `--mode`: 웹팩 실행 모드를 의미, development, production, null이 있음
- `--entry`: 시작점 경로를 지정하는 옵션
- `--output`: 번들링 결과물을 위치할 경로

### Loader

- 웹팩이 자바스크립트 파일이 아닌 웹자원(HTML, CSS, image, font)을 변환할 수 있도록 도와준다.
- `css-loader` : css 파일을 모듈로서 가져올 수 있다.
- `style-loader` : css를 html에 넣어 브라우저 렌더링 시 적용될 수 있게 해준다.
- `file-loader` : 이미지를 모듈로 가져올 수 있다.

### Plugin

- 로더가 해석하고 변환한 결과물의 형태를 바꾼다. 즉, 후처리하는 역할
- 난독화, 특정 문자열 치환 등을 할 수 있다.
- `defineplugin` : 환경 의존적인 정보를 관리

## Babel

- 서로 다른 브라우저 스펙으로 인해 하나의 프로젝트 코드로 모든 브라우저를 커버하지 못하게 되는 크로스 브라우징 문제를 해결해준다.
- 최신 스펙을 사용해서 코드를 작성해도 브라우저마다 동일하게 동작하도록 도와준다.
- 코드 변환 3단계
  1. 토큰 분해
  2. ES5 스펙으로 변환
  3. 코드 출력

## 참고

- https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html
- https://medium.com/@chullino/%EC%9B%B9%ED%8C%A9-3-4-js%EB%AA%A8%EB%93%88%ED%99%94-%EC%97%AD%EC%82%AC-%EB%8F%8C%EC%95%84%EB%B3%B4%EA%B8%B0-1-9df997f82002
- https://poiemaweb.com/es6-module

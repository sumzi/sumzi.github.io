---
title: 브라우저 렌더링 과정
date: "2022-11-06"
category: "web"
---

> 브라우저는 유저가 선택한 장원을 서버로부터 받아와서 유저에게 보여준다. 자원은 페이지 외에도 이미지, 비디오 등의 컨텐츠들도 포함된다. 받아온 자원들을 렌더링 과정을 통해 유저에게 보여주게 된다.

## 브라우저 렌더링 동작 과정

1. `HTML`파일과 `CSS`파일을 파싱해서 각각 DOM Tree와 CSSOM Tree를 만든다. (Parsing)
2. 두 tree를 결합하여 Render Tree를 만든다. (Style)
3. Render Tree에서 각 노드의 위치와 크기를 계산한다.(Layout)
4. 계산된 값을 이용해 각 노드를 화면상의 실제 픽셀로 변환하고, 레이어를 만든다. (Paint)
5. 레이어를 합성하여 실제 화면에 나타낸다. (Composite)

### Parsing

브라우저가 페이지를 렌더링하려면 가장 먼저 받아온 HTML파일을 해석해야한다. Parsing 단계는 HTML파일을 해석하여 DOM(Document Object Model) Tree를 구성하는 단계이다.

파싱 중 HTML에 CSS가 포함되어 있다면 CSSOM(CSS Object Model) Tree 구성 작업도 함께 진행한다.

### Style

Parsing 단계에서 생성된 `DOM Tree`와 `CSSOM Tree`를 매칭시켜서 `Render Tree`를 구성한다. 실제로 화면에 그려질 트리이다.

렌더 트리를 구성할 때 `visibility: hidden` 요소가 공간을 차지하지만 보이지 않기 때문에 렌더 트리에 포함이되지만 `display: none`의 경우 공간을 차지하지 않기 때문에 렌더 트리에서 제외된다.

### Layout

Layout 단계에서는 렌더 트리를 화면에 어떻게 배치해야 할 것인지 노드의 정확한 위치와 크기를 계산한다.

루트 노드부터 순회하면서 노드의 정확한 크기와 위치를 계산하고 렌더 트리에 반영한다. 만약 크기 값을 %로 지정하였다면, Layout 단계에서 %값을 계산해서 픽셀 단위로 변환한다.

### Paint

Paint 단계에서는 Layout 단계에서 계산된 값을 이용해 렌더 트리의 각 노드를 화면상의 실제 픽셀로 변환한다. 이때 픽셀로 변환된 결과는 하나의 레이어가 아니라 여러개의 레이어로 관리된다.

스타일이 복잡할수록 Paint 시간도 늘어난다. 예를 들어 단색 배경의 경우 시간과 작업이 적게 필요하지만, 그림자 효과는 시간과 작업이 더 많이 필요하다.

### Composite

Paint 단계에서 생성된 레이어를 합성하여 실제 화면에 나타낸다. 우리는 화면에서 웹페이지를 볼 수 있다.

## 참고

- [https://developer.mozilla.org/ko/docs/Glossary/Browser](https://developer.mozilla.org/ko/docs/Glossary/Browser)
- [https://d2.naver.com/helloworld/59361](https://d2.naver.com/helloworld/59361)

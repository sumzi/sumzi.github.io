---
title: Github Actions로 자동 배포하기
date: "2022-10-11"
category: "git"
---

## GitHub Actions란?

- GitHub Actions는 GitHub에서 제공하는 CI(Continuous Integration)와 CD(Continuous Deployment)를 위한 서비스
- 자동으로 코드 저장소에서 어떤 이벤트가 발생했을 때 특정 작업이 일어나게 하거나 주기적으로 어떤 작업들을 반복해서 실행시킬 수 있다.

## 핵심 개념

### Workflows

- GitHub Actions에서 가장 상위 개념인 워크플로우는 자동화 해높은 작업 과정
- 코드 저장소 내에서 `.github/workflows` 폴더 아래에 위치한 YAML 파일로 설정하며, 하나의 코드 저장소에 여러개의 워크플로우 YAML 파일 생성 가능하다.
- 크게 2가지를 정의해야함
  - `on` : 해당 워크플로우가 언제 실행되는지 정의
  - `jobs` : 해당 워크플로우가 구체적으로 어떤 일을 해야하는지 명시해야함

```
on:
  push:
    branches:
      - main

jobs:
  # ...(생략)...
```

코드 저장소의 `main` 브랜치에 `push` 이벤트가 발생할 때마다 작업을 실행함

### Jobs

- 작업이란 독립된 가상머신 또는 컨테이너에서 돌아가는 하나의 처리 단위를 의미
- 작업의 세부 내용으로 필수로 들어가야하는 `runs-on` 속성을 통해 해당 리눅스나 윈도우즈와 같은 실행 환경을 지정해야함

```
# ...(생략)...

jobs:
  job1:  // 여러 작업을 수행 가능
    runs-on: ubuntu-latest
    steps:
      # ...(생략)...
```

### Steps

- 각 작업이 하나 이상의 단계로 모델링
- 커맨드나 스크립트를 실행할 때는 `run`속성을 사용하며, 액션을 사용할 때는 `uses`속성을 사용함

```
# ...(생략)...

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm test
```

- 워크플로우 파일 내에서 작업 단계를 명시해 줄 때는 각 단계 앞에 반드시 `-`를 붙여야함

### Actions

- 액션은 GitHub Actions에서 빈번하게 필요한 반복 단계를 재사용하기 용이하도록 제공되는 일종의 작업 공유 메커니즘
- 하나의 코드 저장소 범위 내에서 여러 워크플로우 간에서 공유, 공개 코드 저장소를 통해 액션을 공유하면 GitHub상의 모든 코드 저장소에서 사용가능

## GiHub Actions로 gh-pages 자동 배포하기

> 정적 파일을 master branch에 push하면 자동으로 빌드되고 그 결과물을 gh-pages branch에 올려서 배포해보자

1. `.github/workflows` 폴더에 `.yml` 파일을 추가, 위크플로우 생성
2. 해당 브랜치에 `push`할 때 실행되는 `jobs`을 작성

   ```
    name: Deploy to GitHub Pages

    on:
      push:
        branches:
          - master

    jobs:
      deploy:
        runs-on: ubuntu-latest

        steps:
          - uses: actions/checkout@v2
          - uses: actions/setup-node@v3
            with:
              node-version: 18
              cache: npm

          - name: Install dependencies
            run: npm install --frozen-lockfile

          - name: Build website
            run: npm run build

          - name: Deploy to GitHub Pages
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }}
              publish_dir: ./build

   ```

3. Personal access tokens 생성하기

   - Settings > Developer settings > Personal access tokens
   - New personal access token 생성
   - Select scopes 에서 repo 체크

4. token을 Secrets Actions에 추가하기

   - 해당 repository에서 Settings > Secrets > Action
   - Repository secrets에 키와 값을 입력한다.

## 참고

- https://www.daleseo.com/github-actions-basics/
- https://velog.io/@kdeun1/Github-Actions%EB%A1%9C-gh-pages-%EC%9E%90%EB%8F%99-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0

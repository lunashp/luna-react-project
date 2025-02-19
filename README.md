# 🛠 React + Redux + Firebase 인증 프로젝트

## 📖 프로젝트 소개

이 프로젝트는 **React + Redux Toolkit**을 사용하여 Firebase 인증 기능을 구현한 애플리케이션입니다.  
이메일/비밀번호 로그인, 회원가입 및 Google 로그인 기능이 포함되어 있으며, Redux를 통해 전역 상태를 관리합니다.

## 🚀 주요 기능

✅ **이메일/비밀번호 회원가입 및 로그인**  
✅ **Google 로그인 지원**  
✅ **Redux Toolkit을 활용한 상태 관리**  
✅ **react-router-dom을 활용한 페이지 이동**

## 📂 폴더 구조

```plaintext
📦 프로젝트 루트
├── 📂 src
│   ├── 📂 components          # 공통 UI 컴포넌트
│   ├── 📂 config
│   │   ├── FirebaseConfig.ts  # Firebase 설정 파일
│   ├── 📂 hooks               # Custom Hook 폴더
│   ├── 📂 pages               # 페이지 컴포넌트
│   ├── 📂 stores              # Redux Store 설정
│   │   ├── 📂 features        # Redux Slice
│   ├── 📂 theme               # 테마 관련 폴더
│   ├── App.tsx                # 라우팅 설정
│   ├── index.tsx              # React 엔트리 포인트
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
├── yarn.lock
```

## 💁🏻‍♀️ 프로젝트 실행 가이드

### **Node.js 설치 (없다면 필수!)**

먼저, Node.js가 설치되어 있는지 확인하세요

#### **Node.js 버전 확인**

- v20.10.0 이상 권장

```sh
node -v
```

### **Yarn 설치 (없다면 필수!)**

이 프로젝트는 yarn을 사용합니다
설치되지 않았다면 아래 명령어로 설치하세요

```sh
npm install -g yarn
```

### **Yarn 버전 확인**

```sh
yarn -v
```

버전이 표시되면 정상적으로 설치된 것입니다.

### **프로젝트 클론 & 패키지 설치**

프로젝트 다운로드

```sh
git clone https://github.com/lunashp/luna-react-project.git
cd your-project
```

패키지 설치

```sh
yarn install
```

### **Firebase 설정**

Firebase를 사용하려면, `.env` 파일에 인증 관련 내용을 추가하세요

- `firebaseConfig.ts` 파일을 참고하여 작성
- firebaseConfig는 Firebase 콘솔에서 프로젝트를 생성한 후, 설정 정보를 가져와 입력하세요.

```
REACT_APP_FIREBASE_KEY = ""
REACT_APP_FIREBASE_AUTHDOMAIN = ""
REACT_APP_FIREBASE_PROJECTID = ""
REACT_APP_FIREBASE_STORAGEBUCKET = ""
REACT_APP_FIREBASE_MESSAGINGSENDERID = ""
REACT_APP_FIREBASE_APPID = ""
```

### **개발 서버 실행**

```sh
yarn start
```

실행 후 http://localhost:3000 에서 확인할 수 있습니다.

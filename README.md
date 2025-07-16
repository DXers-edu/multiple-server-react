# AWS를 이용한 시스템 설계 및 구축과 배포

## 🏁 다중 서버
**소스코드**: Reactjs 소스코드

---

## 📖 프로젝트 소개
이 저장소에는 Vite와 React를 활용한 기본 프론트엔드 애플리케이션 샘플 소스코드를 포함하고 있습니다.  
강의를 통해 AWS 환경에 시스템을 설계, 구축, 배포하는 과정을 다중 서버에서의 실행 방식을 체험할 수 있습니다.

---

## 🛠️ 사용 기술
- Node.js (v16 이상 권장)
- npm 또는 Yarn
- Vite
- React 19
- React Router 7
- React Cookie
- Axios
- TypeScript
- ESLint

---

## 🚀 설치 및 실행
1. 저장소 클론  
   ```bash
   git clone https://github.com/DXers-edu/multiple-server-react.git
   cd multiple-server-react
   ```

2. 의존성 설치  
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. 개발 서버 실행  
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

4. 프로덕션 빌드  
   ```bash
   npm run build
   # 또는
   yarn build
   ```

5. 빌드 결과 미리보기  
   ```bash
   npm run preview
   # 또는
   yarn preview
   ```

6. 코드 린트 및 포맷 검사  
   ```bash
   npm run lint
   # 또는
   yarn lint
   ```

---

## ⚙️ 설정 변경 (중요!)

`.env` 파일

```env
VITE_API_BASE_URL=주소
```

`ecosystem.config.js` 파일

```javascript
module.exports = {
   apps : [{
      name: 'multiple-server-react',
      script: 'serve -s ./dist -l 3000',
      watch: './dist'
   }]
};
```

---

## 📜 라이선스
MIT License  

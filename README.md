# 諶昱維 Victor Chen

生成式 AI × 財務金融。這是我的個人履歷網站，整理求學經歷、工作經驗、專案作品、競賽經歷與專業領域。

網站：https://victor-900603.github.io/

## 關於我

- 學歷：國立陽明交通大學 資訊管理與財務金融學系碩士班（就讀中）；國立臺北科技大學 資訊與財金管理系 學士。
- 程式專長：生成式 AI、資料工程、全端開發、雲端架構。
- 財金能力：財報分析、投資組合、衍生性商品。
- 定位：GenAI Engineer / Data Scientist / ML Engineer。

## 網站內容

網站為單頁式，以錨點分成下列區塊，可透過左側導覽或頂端選單前往：

- 關於
- 教育背景
- 工作經驗
- 專案作品
- 競賽經歷
- 證照資格
- 技能專長
- 專業領域
- 聯絡資訊

網站支援深淺色主題切換、中英文切換，以及正式與日常兩種照片檢視。

## 專業領域

- 生成式 AI 應用（Agent / RAG）
- 全端系統開發與 API 架構
- 雲端基礎架構、資料庫與 DevOps
- 分散式資料工程與反爬蟲
- 財務分析

## 聯絡我

- GitHub：https://github.com/victor-900603
- LinkedIn：https://www.linkedin.com/in/昱維-諶-1b6100380/
- Email：victor.aimhigh0603@gmail.com
- 網站：https://victor-900603.github.io/

## 技術說明

網站以 Vite 建置的單頁 React 應用程式實作：

- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion（動畫）
- react-i18next（多語系）
- lucide-react、react-icons（圖示）
- Vitest + React Testing Library（測試）
- oxlint、Prettier（檢查與格式化）

本機開發：

```bash
npm install
npm run dev
npm run build
npm test
```

推送至 `main` 分支後，`.github/workflows/deploy.yml` 會執行檢查、型別檢查、測試與建置，並將 `dist/` 發布至 GitHub Pages。

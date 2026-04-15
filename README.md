# Komaba-navi

東大キャンパスマップ。

## 環境構築

```sh
git clone git@github.com:ut-code/komabanavi.git
cd komabanavi
npm install
```

.env.local に Convex の URL 貼る

## 開発環境

```sh
npm run dev # http://localhost:8080 でプレビュー

# 別ターミナルで
npx convex dev

# フォーマット
npm run format

# ビルド
npm run build
```

### デバッグ: 現在地を固定する

環境変数 `VITE_DEBUG_POSITION` を設定すると、GPSの代わりに指定した座標に現在地マーカーを表示できます。

```sh
VITE_DEBUG_POSITION=1400,2000 npm run dev
```

座標は `[y, x]` の画像ピクセル座標です。マップの範囲内であれば任意の位置を指定できます。

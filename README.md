# Komaba-navi

東大キャンパスマップ。

## 環境構築

```sh
git clone git@github.com:ut-code/komabanavi.git
cd komabanavi
npm install
```

## 開発環境

```sh
npm run dev # http://localhost:8080 でプレビュー

# フォーマット
npm run format

# ビルド
npm run build
```

### ブランチ戦略

- main（または master）: 安定版

- develop : 開発用

- 各機能の作業用ブランチ: feature/◯◯ や fix/◯◯

### コミットメッセージのルール

- 例: feat: ログイン機能を追加, fix: ボタンのバグ修正

### コードレビューのやり方

- プルリクエストを出して、少なくとも1人レビューしてからマージ

- 直接 main に push はしない（できなくしてある）

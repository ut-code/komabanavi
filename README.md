# Komaba-navi

東大キャンパスマップ。

## 環境構築

```sh
git clone git@github.com:ut-code/komabanavi.git
cd komabanavi
npm install
```

## 開発環境
- `npm run format` でフォーマット
- `npm run dev` を実行してから http://127.0.0.1:8080 を開いてプレビュー

### ブランチ戦略

- main（または master）: 安定版

- develop : 開発用

- 各機能の作業用ブランチ: feature/◯◯ や fix/◯◯

### コミットメッセージのルール

- 例: feat: ログイン機能を追加, fix: ボタンのバグ修正

### コードレビューのやり方

- プルリクエストを出して、少なくとも1人レビューしてからマージ

- 直接 main に push はしない（できなくしてある）


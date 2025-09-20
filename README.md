# Komaba-navi

東大キャンパスマップ。

## 開発環境について

```sh
git clone git@github.com:ut-code/komabanavi.git
cd komabanavi
npm install
```

- `npm run format` フォーマット
- `npm run dev` http://127.0.0.1:8080 でプレビュー

3. 開発ルールを決める

ブランチ戦略

main（または master）: 安定版

develop : 開発用

各自の作業用ブランチ: feature/◯◯ や fix/◯◯

コミットメッセージのルール

例: feat: ログイン機能を追加, fix: ボタンのバグ修正

コードレビューのやり方

プルリクエストを出して、少なくとも1人レビューしてからマージ

直接 main に push はしない

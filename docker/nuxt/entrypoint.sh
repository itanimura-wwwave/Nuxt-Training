#!/bin/sh
# このファイルはコンテナの/usr/local/bin/entrypoint.shに配置されて使用されます

set -e

GREEN='\e[32m'
YELLOW='\e[33m'
RED='\e[31m'
RESET='\e[0m'

# チェック対象のディレクトリを変数に格納
NODE_MODULES_DIR="/front_app/node_modules"

if [ ! -d "$NODE_MODULES_DIR" ]; then
  printf "${RED}エラー: 作業ディレクトリ内に 'node_modules' ディレクトリが見つかりません。${RESET}\n" >&2
  printf "${RED}ボリュームのマウント設定が正しいか、またはディレクトリが作成されているか確認してください。${RESET}\n" >&2
  exit 1
fi

if [ "$(ls -A "$NODE_MODULES_DIR" | wc -l)" -eq 1 ] && [ -f "$NODE_MODULES_DIR/.keep" ]; then
  printf "$YELLOW INFO: 'node_modules'内にファイルが見つからなかったため、'yarn install' を実行します $RESET \n"
  yarn install
else
  printf "$GREEN INFO: 'node_modules'内に既にファイルが存在するので、'yarn install' はスキップされました $RESET \n"
fi

printf "$GREEN INFO: フロントエンドアプリを起動します $RESET \n"

exec "$@"

import { Link } from "react-router-dom";

export function UsagePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 mb-8 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          マップに戻る
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">使い方</h1>
            <p className="text-gray-500 mt-2">駒場キャンパスナビの操作方法</p>
          </div>

          <div className="p-8 space-y-8">
            {/* セクション: マップ操作 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                マップの操作
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg">🖱️</span>
                  <div>
                    <p className="font-medium">ドラッグで移動</p>
                    <p className="text-sm text-gray-500">
                      マウスまたは指でマップをドラッグして表示位置を移動できます
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg">🔍</span>
                  <div>
                    <p className="font-medium">スクロールで拡大・縮小</p>
                    <p className="text-sm text-gray-500">
                      マウスホイールやピンチ操作でマップのズームを切り替えられます
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* セクション: 建物 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V7l8-4v18" />
                  <path d="M19 21V11l-6-4" />
                  <path d="M9 9h1" />
                  <path d="M9 13h1" />
                  <path d="M9 17h1" />
                </svg>
                建物の詳細
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="font-medium">建物をクリック</p>
                    <p className="text-sm text-gray-500">
                      マップ上の建物をクリックするとポップアップが表示されます
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg">📋</span>
                  <div>
                    <p className="font-medium">「詳細」ボタン</p>
                    <p className="text-sm text-gray-500">
                      ポップアップの「詳細」ボタンで建物の階層図を確認できます
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* セクション: 検索 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                検索
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg">🔎</span>
                  <div>
                    <p className="font-medium">サイドバーで検索</p>
                    <p className="text-sm text-gray-500">
                      サイドバーの検索窓に建物名や施設名を入力すると、候補が一覧表示されます
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg">📌</span>
                  <div>
                    <p className="font-medium">結果をクリックして移動</p>
                    <p className="text-sm text-gray-500">
                      検索結果をクリックすると、マップがその場所に移動します
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* セクション: 施設 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-orange-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                ウォーターサーバー・自動販売機
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg">💧</span>
                  <div>
                    <p className="font-medium">ウォーターサーバー</p>
                    <p className="text-sm text-gray-500">
                      サイドバーのボタンでウォーターサーバーの表示・非表示を切り替えられます
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg">🥤</span>
                  <div>
                    <p className="font-medium">自動販売機</p>
                    <p className="text-sm text-gray-500">
                      サイドバーのボタンで自動販売機の表示・非表示を切り替えられます
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

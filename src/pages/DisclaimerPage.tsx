import { Link } from "react-router-dom";

export function DisclaimerPage() {
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
          <div className="p-8 border-b border-gray-200 bg-amber-50">
            <div className="flex items-center gap-3">
              <svg
                className="w-8 h-8 text-amber-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <h1 className="text-3xl font-bold text-amber-900">免責事項</h1>
                <p className="text-amber-700 mt-1">
                  駒場キャンパスナビのご利用について
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                情報の正確性について
              </h2>
              <p className="text-gray-700 leading-relaxed">
                本サイトに表示される情報（建物の位置、施設の名前、設備の設置場所など）は、実際の状況と異なる場合があります。情報の正確性について保証するものではありません。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                免責について
              </h2>
              <p className="text-gray-700 leading-relaxed">
                本サイトを利用したことにより生じたいかなる損害についても、その責任を負いかねます。ご了承ください。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                最新情報の確認
              </h2>
              <p className="text-gray-700 leading-relaxed">
                最新の施設情報については、東京大学駒場キャンパスの公式ウェブサイトをご確認ください。
              </p>
            </section>

            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                情報の更新について
              </h2>
              <p className="text-gray-700 leading-relaxed">
                本サイトの情報は予告なく変更・削除される場合があります。あらかじめご了承ください。
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

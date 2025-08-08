interface RulesModalProps {
  isOpen: boolean
  onClose: () => void
}

export const RulesModal = ({ isOpen, onClose }: RulesModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">遊戲規則</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">基本規則：</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  • 輪到你那一隊時，選擇一位玩家擔任「描述者」（每個人都要輪到）
                </li>
                <li>• 點擊開始，你們那隊的回合正式開始！</li>
                <li>• 倒數一分鐘內，嘗試描述詞語卡上該號碼的詞彙</li>
                <li>• 怎麼講都行，但就是不可以講到答案上的文字！</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">遊戲進行：</h3>
              <ul className="space-y-2 text-sm">
                <li>• 隊員們可以不斷搶答，直到答對或是選擇略過</li>
                <li>• 向右滑動表示答對，向左滑動表示跳過</li>
                <li>• 時間到即結算該回合的成果</li>
                <li>• 答對一題得一分</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">勝利條件：</h3>
              <p className="text-sm">最先達到 30 分的隊伍就獲勝！</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              知道了
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

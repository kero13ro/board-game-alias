// 共享題庫 - 具挑戰性的題目
export const questions = [
  { id: '1', text: '巴黎鐵塔' },
  { id: '2', text: '沈魚落雁' },
  { id: '3', text: '自由' },
  { id: '4', text: '考試' },
  { id: '5', text: '洗衣機' },
  { id: '6', text: 'Zara' },
  { id: '7', text: '都市更新' },
  { id: '8', text: '葡萄牙' },
  { id: '9', text: '自由女神像' },
  { id: '10', text: '畫蛇添足' },
  { id: '11', text: '愛情' },
  { id: '12', text: '購物車' },
  { id: '13', text: 'Netflix' },
  { id: '14', text: '氣候變遷' },
  { id: '15', text: '冰島' },
  { id: '16', text: '萬里長城' },
  { id: '17', text: '守株待兔' },
  { id: '18', text: '正義' },
  { id: '19', text: 'Tesla' },
  { id: '20', text: '人工智慧' },
  { id: '21', text: '不丹' },
  { id: '22', text: '金字塔' },
  { id: '23', text: '杯弓蛇影' },
  { id: '24', text: '時間' },
  { id: '25', text: '遙控器' },
  { id: '26', text: 'Starbucks' },
  { id: '27', text: '食安問題' },
  { id: '28', text: '香港' },
  { id: '29', text: '民主' },
  { id: '30', text: '機器人' }
]

export type Question = {
  id: string
  text: string
}

// 獲取當前題目
export const getCurrentQuestion = (index: number): Question => {
  return questions[index % questions.length]
}

// 獲取題目總數
export const getTotalQuestions = (): number => {
  return questions.length
}
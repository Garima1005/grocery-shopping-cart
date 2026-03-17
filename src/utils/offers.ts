export const calculateSavings = (items: Items[]): Map<number, number> => {
  const savingsMap = new Map<number, number>()

  items.forEach(item => {
    let saving = 0

    if (item.name === 'Cheese') {
      const freeCheese = Math.floor(item.quantity / 2)
      saving = freeCheese * item.price
    }

    const soupItem = items.find(i => i.name === 'Soup')
    if (item.name === 'Bread' && soupItem && soupItem.quantity > 0) {
      const discountedBreads = Math.min(soupItem.quantity, item.quantity)
      saving = discountedBreads * (item.price / 2)
    }
    
    if (item.name === 'Butter') {
      saving = item.quantity * (item.price / 3)
    }

    if (saving > 0) savingsMap.set(item.id, saving)
  })

  return savingsMap
}

interface Items {
  id: number
  name: string
  price: number
  quantity: number
}
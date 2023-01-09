export const getRandomColor = () => {
  let colorCode = "#"
  for (let i = 0; i < 3; i++) {
    const random = Math.floor(Math.random() * 256).toString(16)
    colorCode +=
      random < 10 ? `0${random}` : Math.floor(Math.random() * 256).toString(16)
  }
  return colorCode
}

export const formatPrice = (price) =>
  Intl.NumberFormat("zh-HK", {
    style: "currency",
    currency: "HKD",
  }).format(price / 100)

export const calcDiscounted = (price, originalPrice) => {
  return `(${100 - Math.round((price / originalPrice) * 100)}% off)`
}

export const getUniqueValues = (data, type, start = "all") => {
  let unique = data.map((data) => data[type])
  if (type === "colors") unique = unique.flat()
  return [start, ...new Set(unique)]
}

const categoriesOrder = {
  "t-shirt": 1,
  dress: 2,
  jacket: 3,
  shorts: 4,
  pants: 5,
  shoes: 6,
}

export const getCategoriesInOrder = (array) =>
  array.sort((a, b) => {
    return array.includes("t-shirt")
      ? categoriesOrder[a] - categoriesOrder[b]
      : a.localeCompare(b)
  })

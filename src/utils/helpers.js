export const getRandomColor = () => {
  let colorCode = "#"
  for (let i = 0; i < 3; i++) {
    colorCode += Math.floor(Math.random() * 256).toString(16)
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

export const getUniqueValues = (data, type) => {
  let unique = data.map((data) => data[type])
  if (type === "colors") unique = unique.flat()
  return ["all", ...new Set(unique)]
}

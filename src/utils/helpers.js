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
  if (!data || !data.length) return [start]

  let unique = data?.map((data) => data.fields[type])
  if (type === "colors") unique = unique?.flat()
  return [start, ...new Set(unique)]
}

const categoriesOrder = {
  "t-shiFt": 1,
  dress: 2,
  jacket: 3,
  shorts: 4,
  pants: 5,
  shoes: 6,
}

export const getCategoriesInOrder = (array) => {
  return array.sort((a, b) => {
    return array.includes("t-shirt")
      ? categoriesOrder[a] - categoriesOrder[b]
      : a.localeCompare(b)
  })
}

export const getTrendingProducts = (products, user) => {
  let filteredProducts

  if (user && user === "mr.") {
    filteredProducts = products.filter((product) =>
      product.sex === "men" && product.fields.stars >= 4
    )
  }

  if (user && user !== "mr.") {
    filteredProducts = products.filter((product) =>
      product.sex === "women" && product.fields.stars >= 4
    )
  }

  filteredProducts = products.filter((product) => product.fields.stars >= 4)

  return filteredProducts
}
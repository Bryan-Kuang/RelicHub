// 演示模式的模拟数据
// Demo data for demonstration mode

export const demoCategories = [
  {
    id: "demo-cat-1",
    name: "手串配饰",
    description: "精选天然材质制作的手串，包括檀香、沉香、菩提等",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-cat-2",
    name: "香品香具",
    description: "天然线香、盘香及各类香炉香具，营造宁静氛围",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-cat-3",
    name: "木艺雕刻",
    description: "精工雕刻的木质摆件，展现传统木艺之美",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-cat-4",
    name: "茶具茶器",
    description: "紫砂壶、茶杯等传统茶具，品茶修身之选",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-cat-5",
    name: "文房用品",
    description: "笔墨纸砚等传统文房四宝，传承书香文化",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const demoProducts = [
  {
    id: "demo-prod-1",
    name: "小叶紫檀手串",
    description:
      "精选印度小叶紫檀制作，珠子圆润饱满，油性充足。经过精心打磨，手感温润如玉。直径约2.0cm，共108颗，适合日常佩戴和盘玩。",
    price: 688.0,
    imageUrl:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
    amazonUrl: "https://amazon.com/sandalwood-prayer-beads",
    ebayUrl: "https://ebay.com/rosewood-bracelet",
    categoryId: "demo-cat-1",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-2",
    name: "天然沉香线香",
    description:
      "选用越南芽庄沉香粉制作，香味清雅持久，燃烧时烟雾缭绕，香气怡人。每支燃烧时间约45分钟，适合冥想、读书或休闲时光。",
    price: 288.0,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    amazonUrl: "https://amazon.com/natural-incense-sticks",
    ebayUrl: null,
    categoryId: "demo-cat-2",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-3",
    name: "黄花梨木雕摆件",
    description:
      "精选海南黄花梨制作的木雕摆件，纹理清晰美观，雕工精细。造型为传统的如意图案，寓意吉祥如意。尺寸约20x8x5cm，适合案头摆放。",
    price: 1888.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: null,
    ebayUrl: "https://ebay.com/wooden-carving-ornament",
    categoryId: "demo-cat-3",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-4",
    name: "紫砂壶套装",
    description:
      "宜兴紫砂制作的茶壶套装，包含一壶四杯。壶身造型古朴，泥料纯正，透气性好。适合冲泡乌龙茶、普洱茶等，是茶友的理想选择。",
    price: 1288.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: "https://amazon.com/purple-clay-tea-set",
    ebayUrl: "https://ebay.com/yixing-teapot-set",
    categoryId: "demo-cat-4",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-5",
    name: "端砚文房套装",
    description:
      "精选广东端州石制作的砚台，配以毛笔、墨条、宣纸。砚台石质细腻，发墨效果佳。整套文房用品装在精美的木盒中，是书法爱好者的理想选择。",
    price: 888.0,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    amazonUrl: "https://amazon.com/chinese-calligraphy-set",
    ebayUrl: null,
    categoryId: "demo-cat-5",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-6",
    name: "菩提子手串",
    description:
      "精选天然星月菩提制作，每颗菩提子都有天然的星月图案。经过精心打磨，表面光滑温润。共108颗，适合念佛修行或日常佩戴。",
    price: 188.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: null,
    ebayUrl: "https://ebay.com/bodhi-seed-bracelet",
    categoryId: "demo-cat-1",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-7",
    name: "檀香盘香套装",
    description:
      "印度老山檀香制作的盘香，香味醇厚持久。配有精美的香炉和香灰。每盘燃烧时间约2小时，适合冥想、瑜伽或营造宁静氛围。",
    price: 388.0,
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500",
    amazonUrl: "https://amazon.com/sandalwood-coil-incense",
    ebayUrl: "https://ebay.com/sandalwood-incense-set",
    categoryId: "demo-cat-2",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-8",
    name: "红木笔筒摆件",
    description:
      "精选红酸枝制作的笔筒，木质坚硬，纹理美观。表面雕刻有传统的竹节图案，寓意节节高升。既实用又美观，是文房的理想装饰。",
    price: 588.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: "https://amazon.com/wooden-pen-holder",
    ebayUrl: null,
    categoryId: "demo-cat-3",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-9",
    name: "建盏茶杯套装",
    description:
      "福建建窑烧制的建盏茶杯，釉面呈现天然的兔毫纹理。保温效果佳，适合品茶。一套四只，每只容量约50ml，是茶道爱好者的珍品。",
    price: 888.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: null,
    ebayUrl: "https://ebay.com/jianzhan-tea-cups",
    categoryId: "demo-cat-4",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-10",
    name: "湖笔书法套装",
    description:
      "浙江湖州传统工艺制作的毛笔，笔锋尖锐，弹性适中。套装包含大中小三支毛笔，配以精美的笔架和笔洗，是书法练习的上佳选择。",
    price: 388.0,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    amazonUrl: "https://amazon.com/chinese-brush-set",
    ebayUrl: "https://ebay.com/calligraphy-brush-set",
    categoryId: "demo-cat-5",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const demoUsers = [
  {
    id: "demo-admin-1",
    name: "管理员",
    email: "admin@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    isAdmin: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-user-1",
    name: "测试用户",
    email: "user@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    isAdmin: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

// 添加分类关联到产品
export const demoProductsWithCategories = demoProducts.map((product) => ({
  ...product,
  category: demoCategories.find((cat) => cat.id === product.categoryId)!,
}));

// 统计数据
export const demoStats = {
  productsCount: demoProducts.length,
  categoriesCount: demoCategories.length,
  featuredProductsCount: demoProducts.filter((p) => p.featured).length,
};

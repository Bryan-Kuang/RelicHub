// 演示模式的模拟数据
// Demo data for demonstration mode

export const demoCategories = [
  {
    id: "demo-cat-1",
    name: "瓷器",
    description: "精美的中国传统瓷器，包括青花瓷、粉彩瓷器等",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-cat-2",
    name: "书画",
    description: "中国传统书法和绘画作品，展现深厚的文化底蕴",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-cat-3",
    name: "玉器",
    description: "精雕细琢的玉石工艺品，寓意吉祥如意",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-cat-4",
    name: "铜器",
    description: "古代青铜器具，见证历史的厚重感",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-cat-5",
    name: "古典家具",
    description: "传统中式家具，体现古典美学",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export const demoProducts = [
  {
    id: "demo-prod-1",
    name: "青花瓷花瓶",
    description:
      "明代风格青花瓷花瓶，釉色纯正，绘工精细。瓶身绘有传统的牡丹花卉图案，寓意富贵吉祥。高约30cm，是家居装饰的绝佳选择。",
    price: 1288.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: "https://amazon.com/chinese-porcelain-vase",
    ebayUrl: "https://ebay.com/chinese-blue-white-vase",
    categoryId: "demo-cat-1",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-2",
    name: "山水画轴",
    description:
      "著名画家手绘山水画，水墨淋漓，意境深远。画面描绘了江南水乡的优美景色，配以精美的绫子装裱，尺寸68x45cm。",
    price: 3588.0,
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500",
    amazonUrl: "https://amazon.com/chinese-landscape-painting",
    ebayUrl: null,
    categoryId: "demo-cat-2",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-3",
    name: "白玉观音像",
    description:
      "精雕细琢的白玉观音菩萨像，玉质温润，雕工精美。观音慈眉善目，神态安详，寓意平安吉祥。高度约15cm。",
    price: 5888.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: null,
    ebayUrl: "https://ebay.com/jade-guanyin-statue",
    categoryId: "demo-cat-3",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-4",
    name: "青铜鼎",
    description:
      "仿古青铜鼎，工艺精良，造型古朴典雅。鼎身装饰有传统的饕餮纹样，三足稳定，寓意权力与尊贵。",
    price: 2888.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: "https://amazon.com/bronze-ding-vessel",
    ebayUrl: "https://ebay.com/bronze-ding-ancient",
    categoryId: "demo-cat-4",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-5",
    name: "紫檀木茶桌",
    description:
      "精选印度小叶紫檀制作的茶桌，木质坚硬，纹理优美。桌面光滑如镜，边角圆润，是品茶会友的理想选择。",
    price: 8888.0,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    amazonUrl: "https://amazon.com/rosewood-tea-table",
    ebayUrl: null,
    categoryId: "demo-cat-5",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-6",
    name: "粉彩花鸟盘",
    description:
      "清代风格粉彩瓷盘，盘面绘有精美的花鸟图案，色彩艳丽，构图生动。直径约25cm，可作装饰或实用。",
    price: 888.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: null,
    ebayUrl: "https://ebay.com/chinese-porcelain-plate",
    categoryId: "demo-cat-1",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-7",
    name: "书法作品《兰亭序》",
    description:
      "著名书法家临摹王羲之《兰亭序》，笔法流畅，神韵十足。宣纸材质，配以传统装裱，尺寸135x35cm。",
    price: 2588.0,
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500",
    amazonUrl: "https://amazon.com/lanting-calligraphy",
    ebayUrl: "https://ebay.com/chinese-calligraphy-lanting",
    categoryId: "demo-cat-2",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-8",
    name: "翡翠手镯",
    description:
      "缅甸翡翠手镯，种水上佳，颜色鲜艳。内径约58mm，适合女性佩戴，既美观又有收藏价值。",
    price: 12888.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: "https://amazon.com/jade-bracelet",
    ebayUrl: null,
    categoryId: "demo-cat-3",
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-9",
    name: "青铜酒樽",
    description:
      "春秋时期风格青铜酒樽，造型威严，纹饰精美。器身饰有云雷纹和兽面纹，展现古代青铜工艺的高超水平。",
    price: 4588.0,
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
    amazonUrl: null,
    ebayUrl: "https://ebay.com/bronze-wine-vessel",
    categoryId: "demo-cat-4",
    featured: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-prod-10",
    name: "黄花梨圈椅",
    description:
      "海南黄花梨圈椅，明式家具经典款式。线条简洁流畅，工艺精湛，木纹清晰美观，是中式家具的典型代表。",
    price: 38888.0,
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    amazonUrl: "https://amazon.com/huanghuali-chair",
    ebayUrl: "https://ebay.com/chinese-antique-chair",
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

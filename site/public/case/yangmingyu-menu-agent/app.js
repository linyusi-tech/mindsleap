const sampleMenu = `黄焖系列, 非遗黄焖鸡, 28, 招牌, 5
黄焖系列, 黄焖排骨土豆, 32, 热销, 4
黄焖系列, 黄焖牛腩萝卜, 36, 推荐, 4
黄焖系列, 黄焖豆腐, 26, 轻食, 3
小炒系列, 辣椒炒肉, 38, 热销, 5
小炒系列, 一碗香, 29, 推荐, 4
小炒系列, 番茄炒蛋, 18, 家常, 3
当季新品, 鲜椒嫩鸡煲, 33, 限定, 5
配菜, 煎鸡蛋, 2, 加菜, 3
配菜, 豆腐皮, 3, 加菜, 3
配菜, 金针菇, 3, 加菜, 3
配菜, 海带卷, 3, 加菜, 2
配菜, 香菇, 5, 加菜, 2`;

const themeCopy = {
  lunch: {
    kicker: "午餐高峰",
    title: "今日招牌菜单",
    subtitle: "热销组合自动优先展示，门店只需要确认价格和库存。"
  },
  breakfast: {
    kicker: "早餐时段",
    title: "早安能量补给",
    subtitle: "把高频早餐、咖啡饮品和加购小食聚合成一屏。"
  },
  dinner: {
    kicker: "晚餐主推",
    title: "下班后的满足感",
    subtitle: "突出高毛利套餐和适合多人分享的晚餐组合。"
  },
  summer: {
    kicker: "夏季新品",
    title: "清爽新品上市",
    subtitle: "新品、冰饮和限定甜品自动获得更高曝光。"
  }
};

const foodPalettes = [
  ["#7a2e20", "#f0c36a", "#2f8f62"],
  ["#b8472e", "#ffd166", "#215c45"],
  ["#6a352c", "#f4a261", "#2a9d8f"],
  ["#c4652d", "#fff1b8", "#4f772d"],
  ["#8d3128", "#f7d9a1", "#4d908e"],
  ["#d9480f", "#ffe8a3", "#23744d"],
  ["#a1442f", "#f6bd60", "#277da1"],
  ["#59291f", "#e9c46a", "#588157"]
];

const dishLibrary = [
  { name: "非遗黄焖鸡", category: "黄焖系列", status: "真实菜品图", palette: ["#c56a23", "#f7c453", "#2f8f62"], accent: "#d9232e", src: "./assets/菜品/1 黄焖系列/1 非遗黄焖鸡.png" },
  { name: "黄焖藤椒酥肉", category: "黄焖系列", status: "真实菜品图", palette: ["#7a2e20", "#f0c36a", "#2f8f62"], accent: "#d9480f", src: "./assets/菜品/1 黄焖系列/2 黄焖藤椒酥肉.png" },
  { name: "黄焖小酥肉", category: "黄焖系列", status: "真实菜品图", palette: ["#7a2e20", "#f0c36a", "#2f8f62"], accent: "#d9480f", src: "./assets/菜品/1 黄焖系列/3 黄焖小酥肉.png" },
  { name: "黄焖茄子", category: "黄焖系列", status: "真实菜品图", palette: ["#b8472e", "#ffd166", "#215c45"], accent: "#2f8f62", src: "./assets/菜品/1 黄焖系列/4 黄焖茄子.png" },
  { name: "黄焖肥肠鸡", category: "黄焖系列", status: "真实菜品图", palette: ["#9d2f21", "#f7b267", "#588157"], accent: "#d9232e", src: "./assets/菜品/1 黄焖系列/5 黄焖肥肠鸡.png" },
  { name: "黄焖豆腐", category: "黄焖系列", status: "真实菜品图", palette: ["#b8472e", "#ffd166", "#215c45"], accent: "#2f8f62", src: "./assets/菜品/1 黄焖系列/6 黄焖豆腐.png" },
  { name: "黄焖排骨土豆", category: "黄焖系列", status: "真实菜品图", palette: ["#7a2e20", "#f0c36a", "#2f8f62"], accent: "#d9480f", src: "./assets/菜品/1 黄焖系列/7 黄焖排骨土豆.png" },
  { name: "黄焖牛腩萝卜", category: "黄焖系列", status: "真实菜品图", palette: ["#6a352c", "#f4a261", "#2a9d8f"], accent: "#277da1", src: "./assets/菜品/1 黄焖系列/8 黄焖牛腩萝卜.png" },
  { name: "鹿茸菇五花肉", category: "黄焖系列", status: "真实菜品图", palette: ["#59291f", "#e9c46a", "#588157"], accent: "#7a2e20", src: "./assets/菜品/1 黄焖系列/9 鹿茸菇五花肉.png" },
  { name: "藤椒黄焖鸡", category: "黄焖系列", status: "真实菜品图", palette: ["#8d3128", "#f7d9a1", "#4d908e"], accent: "#d9480f", src: "./assets/菜品/1 黄焖系列/10 藤椒黄焖鸡.png" },
  { name: "鲜蔬香鸡锅", category: "黄焖系列", status: "真实菜品图", palette: ["#5b8f3a", "#b7e4c7", "#2a9d8f"], accent: "#1f8a70", src: "./assets/菜品/1 黄焖系列/11 鲜蔬香鸡锅.png" },
  { name: "辣椒炒肉", category: "小炒系列", status: "真实菜品图", palette: ["#8d3128", "#f7d9a1", "#4d908e"], accent: "#d9480f", src: "./assets/菜品/3 小炒系列/1 辣椒炒肉.png" },
  { name: "番茄炒蛋", category: "小炒系列", status: "真实菜品图", palette: ["#d9480f", "#ffe8a3", "#23744d"], accent: "#1f8a70", src: "./assets/菜品/3 小炒系列/2 番茄炒蛋.png" },
  { name: "一碗香", category: "小炒系列", status: "真实菜品图", palette: ["#d9480f", "#ffe8a3", "#23744d"], accent: "#1f8a70", src: "./assets/菜品/3 小炒系列/3 一碗香.png" },
  { name: "爆炒猪肝", category: "小炒系列", status: "真实菜品图", palette: ["#8d3128", "#f7d9a1", "#4d908e"], accent: "#d9480f", src: "./assets/菜品/3 小炒系列/4 爆炒猪肝.png" },
  { name: "尖椒鸡丁", category: "小炒系列", status: "真实菜品图", palette: ["#c4652d", "#fff1b8", "#4f772d"], accent: "#d9480f", src: "./assets/菜品/3 小炒系列/5 尖椒鸡丁.png" },
  { name: "泡椒鸡胗", category: "小炒系列", status: "真实菜品图", palette: ["#9d2f21", "#f7b267", "#588157"], accent: "#d9232e", src: "./assets/菜品/3 小炒系列/6 泡椒鸡胗.png" },
  { name: "土豆丝", category: "小炒系列", status: "真实菜品图", palette: ["#d08c3a", "#ffd166", "#a1442f"], accent: "#b8472e", src: "./assets/菜品/3 小炒系列/7 土豆丝.png" },
  { name: "鲜椒嫩鸡煲", category: "当季新品", status: "真实新品图", palette: ["#c4652d", "#fff1b8", "#4f772d"], accent: "#d9232e", src: "./assets/菜品/当季新品/当季新品 1.png" },
  { name: "煎鸡蛋", category: "配菜", status: "真实菜品图", palette: ["#f6bd60", "#fff1b8", "#ff8fab"], accent: "#f4a261", src: "./assets/菜品/4 小菜/2 煎鸡蛋.png" },
  { name: "豆腐皮", category: "配菜", status: "真实菜品图", palette: ["#f6bd60", "#fff1b8", "#ff8fab"], accent: "#f4a261", src: "./assets/菜品/4 小菜/7 豆腐皮.png" },
  { name: "金针菇", category: "配菜", status: "真实菜品图", palette: ["#f2d49b", "#fff1b8", "#588157"], accent: "#f7b731", src: "./assets/菜品/4 小菜/8 金针菇.png" },
  { name: "时令蔬菜", category: "配菜", status: "真实菜品图", palette: ["#5b8f3a", "#b7e4c7", "#2a9d8f"], accent: "#1f8a70", src: "./assets/菜品/4 小菜/3 时令蔬菜.png" },
  { name: "香菇", category: "配菜", status: "真实菜品图", palette: ["#59291f", "#e9c46a", "#588157"], accent: "#7a2e20", src: "./assets/菜品/4 小菜/14 香菇.png" },
  { name: "海带卷", category: "配菜", status: "真实菜品图", palette: ["#5b8f3a", "#b7e4c7", "#2a9d8f"], accent: "#1f8a70", src: "./assets/菜品/4 小菜/9 海带卷.png" },
  { name: "煎豆腐", category: "配菜", status: "真实菜品图", palette: ["#d08c3a", "#ffd166", "#a1442f"], accent: "#b8472e", src: "./assets/菜品/4 小菜/1 煎豆腐.png" },
  { name: "土豆", category: "配菜", status: "真实菜品图", palette: ["#d08c3a", "#ffd166", "#a1442f"], accent: "#b8472e", src: "./assets/菜品/4 小菜/11 土豆.png" },
  { name: "酸辣海带丝", category: "配菜", status: "真实菜品图", palette: ["#5b8f3a", "#b7e4c7", "#2a9d8f"], accent: "#1f8a70", src: "./assets/菜品/4 小菜/10 酸辣海带丝.png" },
  { name: "招牌牛肉饭", category: "主食", status: "已抠底", palette: ["#7a2e20", "#f0c36a", "#2f8f62"], accent: "#d9480f" },
  { name: "藤椒鸡腿饭", category: "主食", status: "已调色", palette: ["#b8472e", "#ffd166", "#215c45"], accent: "#2f8f62" },
  { name: "双拼能量套餐", category: "套餐", status: "可投屏", palette: ["#6a352c", "#f4a261", "#2a9d8f"], accent: "#277da1" },
  { name: "香酥鸡块", category: "小食", status: "已质检", palette: ["#c4652d", "#fff1b8", "#4f772d"], accent: "#d9480f" },
  { name: "手打柠檬茶", category: "饮品", status: "透明底", palette: ["#f7d774", "#b7e4c7", "#2a9d8f"], accent: "#1f8a70" },
  { name: "芒果椰奶冻", category: "甜品", status: "已调色", palette: ["#f6bd60", "#fff1b8", "#ff8fab"], accent: "#f4a261" },
  { name: "火腿蛋可颂", category: "早餐", status: "可投屏", palette: ["#d08c3a", "#ffd166", "#a1442f"], accent: "#b8472e" },
  { name: "番茄牛腩汤", category: "汤品", status: "已质检", palette: ["#9d2f21", "#f7b267", "#588157"], accent: "#d9232e" }
].map((asset, index) => ({
  ...asset,
  id: `dish-${index + 1}`,
  src: asset.src || buildDishSvg(asset, index)
}));

const companyAssetKit = {
  brandName: "YMY Kitchen",
  logo: {
    text: "YMY",
    subText: "KITCHEN",
    minHeight: "56px",
    clearSpace: "1x",
    rules: ["禁止拉伸", "禁止换色", "禁止加阴影"]
  },
  colors: [
    { name: "Brand Red", value: "#d9232e", usage: "主行动 / 热销" },
    { name: "Warm Yellow", value: "#f7b731", usage: "价格 / 促销" },
    { name: "Fresh Green", value: "#1f8a70", usage: "标签 / 质检" },
    { name: "Ink", value: "#202124", usage: "正文 / 控件" },
    { name: "Cream", value: "#fffaf0", usage: "菜单文字" }
  ],
  fonts: [
    { role: "标题", family: "HarmonyOS Sans SC Bold", size: "56-96px" },
    { role: "价格", family: "HarmonyOS Sans SC Bold", size: "40-72px" },
    { role: "正文", family: "HarmonyOS Sans SC Bold", size: "18-28px" }
  ]
};

const state = {
  template: "hero",
  seed: 0,
  items: []
};

const els = {
  menuInput: document.querySelector("#menuInput"),
  screenRatio: document.querySelector("#screenRatio"),
  daypart: document.querySelector("#daypart"),
  primaryColor: document.querySelector("#primaryColor"),
  accentColor: document.querySelector("#accentColor"),
  autoPriority: document.querySelector("#autoPriority"),
  qualityCheck: document.querySelector("#qualityCheck"),
  generateBtn: document.querySelector("#generateBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  randomizeBtn: document.querySelector("#randomizeBtn"),
  loadSampleBtn: document.querySelector("#loadSampleBtn"),
  logoTile: document.querySelector("#logoTile"),
  logoRules: document.querySelector("#logoRules"),
  brandName: document.querySelector("#brandName"),
  brandScore: document.querySelector("#brandScore"),
  colorLibrary: document.querySelector("#colorLibrary"),
  fontLibrary: document.querySelector("#fontLibrary"),
  imageLibrary: document.querySelector("#imageLibrary"),
  libraryCount: document.querySelector("#libraryCount"),
  menuScreen: document.querySelector("#menuScreen"),
  menuLayout: document.querySelector("#menuLayout"),
  braisedItems: document.querySelector("#braisedItems"),
  stirItems: document.querySelector("#stirItems"),
  seasonalItems: document.querySelector("#seasonalItems"),
  sideItems: document.querySelector("#sideItems"),
  screenKicker: document.querySelector("#screenKicker"),
  screenTitle: document.querySelector("#screenTitle"),
  screenSubtitle: document.querySelector("#screenSubtitle"),
  itemCount: document.querySelector("#itemCount"),
  screenLabel: document.querySelector("#screenLabel"),
  qaLabel: document.querySelector("#qaLabel"),
  qaList: document.querySelector("#qaList"),
  exportPanel: document.querySelector("#exportPanel"),
  exportStatus: document.querySelector("#exportStatus"),
  exportFilePath: document.querySelector("#exportFilePath"),
  exportPreview: document.querySelector("#exportPreview"),
  exportOpenLink: document.querySelector("#exportOpenLink")
};

function buildDishSvg(asset, index) {
  const [a, b, c] = asset.palette;
  const rotation = (index % 4) * 8 - 12;
  const garnish = index % 2 === 0 ? c : asset.accent;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="14" flood-color="#000" flood-opacity=".25"/>
        </filter>
        <linearGradient id="plate" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#fffaf0"/>
          <stop offset="1" stop-color="#e4d3b5"/>
        </linearGradient>
      </defs>
      <g filter="url(#shadow)" transform="rotate(${rotation} 160 166)">
        <ellipse cx="160" cy="178" rx="122" ry="86" fill="#d6c2a0"/>
        <ellipse cx="160" cy="166" rx="118" ry="82" fill="url(#plate)"/>
        <ellipse cx="160" cy="166" rx="90" ry="58" fill="#fff3d4"/>
        <path d="M74 167c18-42 55-65 98-61 46 4 73 31 81 68-45 22-115 28-179-7z" fill="${a}"/>
        <path d="M86 154c39 18 91 21 145 3 12 15 16 30 12 46-44 20-110 23-160 0-4-17-3-33 3-49z" fill="${b}" opacity=".92"/>
        <circle cx="123" cy="136" r="18" fill="${asset.accent}"/>
        <circle cx="192" cy="139" r="15" fill="${garnish}"/>
        <path d="M109 194c28 13 70 15 103 1" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round"/>
        <g fill="#ffffff" opacity=".74">
          <circle cx="113" cy="170" r="5"/>
          <circle cx="147" cy="151" r="4"/>
          <circle cx="206" cy="174" r="5"/>
        </g>
      </g>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function findLibraryAsset(item) {
  const exact = dishLibrary.find((asset) => asset.name === item.name);
  if (exact) return exact;
  return dishLibrary.find((asset) => asset.category === item.category) || dishLibrary[0];
}

function normalizeSection(category) {
  if (category.includes("黄焖")) return "braised";
  if (category.includes("小炒")) return "stir";
  if (category.includes("新品") || category.includes("当季")) return "seasonal";
  if (category.includes("配菜") || category.includes("加菜")) return "side";
  return "braised";
}

function parseMenu(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [category = "未分类", name = `菜品 ${index + 1}`, price = "", tag = "", priority = "1"] = line
        .split(",")
        .map((part) => part.trim());

      const item = {
        id: `${name}-${index}`,
        category,
        name,
        price: Number.parseFloat(price.replace(/[^\d.]/g, "")),
        tag,
        priority: Number.parseInt(priority, 10) || 1,
        section: normalizeSection(category),
        palette: foodPalettes[index % foodPalettes.length]
      };
      const asset = findLibraryAsset(item);
      item.asset = asset;
      item.palette = asset.palette;
      return item;
    });
}

function sortItems(items) {
  if (!els.autoPriority.checked) return [...items];
  return [...items].sort((a, b) => b.priority - a.priority || Number(Boolean(b.tag)) - Number(Boolean(a.tag)));
}

function createDishCard(item, index) {
  const card = document.createElement("article");
  card.className = "dish-card";
  if (index === 0 && state.template === "hero") card.classList.add("featured");
  if (index === 0 && state.template === "combo" && item.priority >= 5) card.classList.add("featured");

  card.style.setProperty("--food-a", item.palette[0]);
  card.style.setProperty("--food-b", item.palette[1]);
  card.style.setProperty("--food-c", item.palette[2]);

  const price = Number.isFinite(item.price) ? `<small>￥</small>${item.price}` : "待定";
  card.innerHTML = `
    <div class="dish-art">
      <img src="${item.asset.src}" alt="${item.name} 标准菜品图" />
    </div>
    <div class="dish-copy">
      <div class="dish-topline">
        <span class="dish-category">${item.category}</span>
        ${item.tag ? `<span class="dish-tag">${item.tag}</span>` : ""}
      </div>
      <h4 class="dish-name">${item.name}</h4>
      <p class="dish-meta">总部数据同步 · 门店可售</p>
      <div class="dish-price">${price}</div>
    </div>
  `;
  return card;
}

function createTemplateDish(item, section, index) {
  const card = document.createElement("article");
  card.className = `template-dish ${section}-dish`;
  card.dataset.dishName = item.name;

  const price = formatMenuPrice(item.price);
  card.innerHTML = `
    <div class="template-dish-image">
      <img src="${item.asset.src}" alt="${item.name} 标准菜品图" />
    </div>
    <div class="template-dish-info">
      <strong>${item.name}</strong>
      <span>${price}</span>
    </div>
  `;
  return card;
}

function formatMenuPrice(price) {
  if (!Number.isFinite(price)) return "时价";
  return `${Number.isInteger(price) ? price : price.toFixed(1)}元/份`;
}

function groupItemsBySection(items) {
  return items.reduce(
    (groups, item) => {
      groups[item.section].push(item);
      return groups;
    },
    { braised: [], stir: [], seasonal: [], side: [] }
  );
}

function renderTemplateZones(items) {
  const groups = groupItemsBySection(sortItems(items));
  const limits = { braised: 4, stir: 3, seasonal: 2, side: 6 };
  const targets = {
    braised: els.braisedItems,
    stir: els.stirItems,
    seasonal: els.seasonalItems,
    side: els.sideItems
  };

  Object.entries(targets).forEach(([section, target]) => {
    target.innerHTML = "";
    const visibleItems = state.template === "combo" && section === "seasonal" ? [] : groups[section].slice(0, limits[section]);
    if (section === "seasonal" && visibleItems.length === 0) {
      target.innerHTML = `<div class="empty-seasonal">本门店暂无当季新品</div>`;
      return;
    }
    target.dataset.count = String(visibleItems.length);
    visibleItems.forEach((item, index) => target.appendChild(createTemplateDish(item, section, index)));
  });
}

function applyScreenMode() {
  const ratio = els.screenRatio.value;
  els.menuScreen.classList.remove("landscape", "portrait", "triple");
  els.menuScreen.classList.add(ratio);

  const labels = {
    landscape: "4000 x 2251",
    portrait: "4000 x 2251",
    triple: "4000 x 2251"
  };
  els.screenLabel.textContent = labels[ratio];
}

function applyTheme() {
  document.documentElement.style.setProperty("--primary", els.primaryColor.value);
  document.documentElement.style.setProperty("--accent", els.accentColor.value);

  const copy = themeCopy[els.daypart.value];
  if (els.screenKicker) els.screenKicker.textContent = copy.kicker;
  if (els.screenTitle) els.screenTitle.textContent = copy.title;
  if (els.screenSubtitle) els.screenSubtitle.textContent = copy.subtitle;

  const themeBackgrounds = {
    lunch: `radial-gradient(circle at 18% 22%, ${hexToRgba(els.accentColor.value, 0.34)}, transparent 24%), linear-gradient(135deg, #171717 0%, #2b1712 38%, #111 100%)`,
    breakfast: `radial-gradient(circle at 16% 18%, ${hexToRgba(els.accentColor.value, 0.4)}, transparent 24%), linear-gradient(135deg, #263238 0%, #795548 48%, #111 100%)`,
    dinner: `radial-gradient(circle at 78% 18%, ${hexToRgba(els.primaryColor.value, 0.38)}, transparent 25%), linear-gradient(135deg, #111 0%, #2e1d38 45%, #141414 100%)`,
    summer: `radial-gradient(circle at 16% 20%, ${hexToRgba("#1f8a70", 0.42)}, transparent 24%), linear-gradient(135deg, #10251f 0%, #263f34 44%, #151515 100%)`
  };
  els.menuScreen.style.background = "transparent";
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function runQualityChecks(items) {
  const results = [];
  const missingPrice = items.filter((item) => !Number.isFinite(item.price)).length;
  const hasHero = items.some((item) => item.priority >= 5 || item.tag.includes("热销") || item.tag.includes("推荐"));
  const maxItems = 16;
  const libraryMatched = items.filter((item) => dishLibrary.some((asset) => asset.name === item.name)).length;
  const colorsLocked = els.primaryColor.value.toLowerCase() === companyAssetKit.colors[0].value && els.accentColor.value.toLowerCase() === companyAssetKit.colors[1].value;
  const groups = groupItemsBySection(items);

  results.push({ text: `已识别 ${items.length} 个菜品`, warn: items.length === 0 });
  results.push({
    text: groups.braised.length > 4 ? `黄焖 4/4（隐藏${groups.braised.length - 4}个）` : `黄焖 ${groups.braised.length}/4`,
    warn: groups.braised.length < 4
  });
  results.push({ text: `小炒 ${groups.stir.length}/3`, warn: groups.stir.length < 1 || groups.stir.length > 3 });
  results.push({ text: groups.seasonal.length ? `新品 ${groups.seasonal.length}` : "新品可为空", warn: false });
  results.push({ text: `配菜 ${groups.side.length}/6`, warn: groups.side.length < 3 || groups.side.length > 6 });
  results.push({ text: "Logo 规范已应用", warn: false });
  results.push({ text: colorsLocked ? "品牌色符合规范" : "品牌色已被改动", warn: !colorsLocked });
  results.push({ text: `图库匹配 ${libraryMatched}/${items.length}`, warn: items.length > 0 && libraryMatched < items.length });
  results.push({ text: missingPrice ? `${missingPrice} 个价格待补` : "价格字段完整", warn: missingPrice > 0 });
  results.push({ text: hasHero ? "主推菜已标记" : "建议设置主推菜", warn: !hasHero });
  results.push({ text: items.length > maxItems ? "当前屏幕偏拥挤" : "版面密度合适", warn: items.length > maxItems });
  results.push({ text: "品牌色已应用", warn: false });

  els.qaList.innerHTML = "";
  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result.text;
    if (result.warn) li.classList.add("warn");
    els.qaList.appendChild(li);
  });

  const warnings = results.filter((result) => result.warn).length;
  els.qaLabel.textContent = warnings ? `${warnings} 项提醒` : "质检通过";
}

function renderUiAssets() {
  els.brandName.textContent = companyAssetKit.brandName;
  els.brandScore.textContent = "已锁定";
  els.logoTile.innerHTML = `
    <div class="logo-lockup">
      <strong>${companyAssetKit.logo.text}</strong>
      <span>${companyAssetKit.logo.subText}</span>
    </div>
  `;
  els.logoRules.innerHTML = [
    `安全区 ${companyAssetKit.logo.clearSpace}`,
    `最小高 ${companyAssetKit.logo.minHeight}`,
    companyAssetKit.logo.rules[0]
  ].map((rule) => `<span>${rule}</span>`).join("");

  els.colorLibrary.innerHTML = "";
  companyAssetKit.colors.forEach((token) => {
    const card = document.createElement("article");
    card.className = "color-token";
    card.innerHTML = `
      <div class="color-chip" style="background:${token.value}"></div>
      <strong title="${token.name}">${token.name}</strong>
      <small>${token.value}</small>
    `;
    card.title = token.usage;
    els.colorLibrary.appendChild(card);
  });

  els.fontLibrary.innerHTML = "";
  companyAssetKit.fonts.forEach((token) => {
    const card = document.createElement("article");
    card.className = "font-token";
    card.innerHTML = `
      <div>
        <strong>${token.role}</strong>
        <small>${token.family} · ${token.size}</small>
      </div>
      <b>Aa</b>
    `;
    els.fontLibrary.appendChild(card);
  });
}

function renderImageLibrary() {
  els.libraryCount.textContent = `${dishLibrary.length} 张`;
  els.imageLibrary.innerHTML = "";
  dishLibrary.forEach((asset) => {
    const card = document.createElement("article");
    card.className = "library-card";
    card.innerHTML = `
      <div class="library-thumb">
        <img src="${asset.src}" alt="${asset.name} 标准菜品图" />
      </div>
      <strong title="${asset.name}">${asset.name}</strong>
      <small>${asset.status}</small>
    `;
    els.imageLibrary.appendChild(card);
  });
}

function render() {
  state.items = parseMenu(els.menuInput.value);

  applyScreenMode();
  applyTheme();
  renderTemplateZones(state.items);
  els.itemCount.textContent = `${state.items.length} 个菜品`;

  if (els.qualityCheck.checked) {
    runQualityChecks(state.items);
  } else {
    els.qaList.innerHTML = "<li class=\"warn\">质检未启用</li>";
    els.qaLabel.textContent = "质检关闭";
  }
}

function setTemplate(template) {
  state.template = template;
  document.querySelectorAll(".segment").forEach((button) => {
    button.classList.toggle("active", button.dataset.template === template);
  });
  render();
}

function drawRoundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawDishArt(ctx, x, y, size, palette) {
  const cx = x + size / 2;
  const cy = y + size / 2;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,.28)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 16;
  ctx.fillStyle = "#d7c4a1";
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.47, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#fff2dc";
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.4, 0, Math.PI * 2);
  ctx.fill();
  [palette[0], palette[1], palette[2]].forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx + (index - 1) * size * 0.13, cy + (index % 2) * size * 0.08, size * (0.13 + index * 0.03), 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawExportCard(ctx, item, box, featured) {
  const { x, y, w, h } = box;
  ctx.save();
  ctx.fillStyle = featured ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.1)";
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  drawRoundRect(ctx, x, y, w, h, 18);
  ctx.fill();
  ctx.stroke();

  const artSize = featured ? Math.min(w * 0.56, h * 0.5) : Math.min(w * 0.32, h * 0.58);
  const artX = featured ? x + w * 0.22 : x + 26;
  const artY = featured ? y + 24 : y + (h - artSize) / 2;
  drawDishArt(ctx, artX, artY, artSize, item.palette);

  const textX = featured ? x + 34 : x + artSize + 54;
  const textY = featured ? y + h * 0.57 : y + 34;
  ctx.fillStyle = "#fffaf0";
  ctx.font = `900 ${featured ? 52 : 30}px "HarmonyOS Sans SC Local", "PingFang SC", sans-serif`;
  wrapText(ctx, item.name, textX, textY + 54, featured ? w - 70 : w - artSize - 76, featured ? 56 : 34);
  ctx.fillStyle = "#f7b731";
  ctx.font = `900 ${featured ? 58 : 38}px "HarmonyOS Sans SC Local", "PingFang SC", sans-serif`;
  ctx.fillText(Number.isFinite(item.price) ? `￥${item.price}` : "待定", textX, y + h - 32);

  ctx.fillStyle = "rgba(255,255,255,.88)";
  ctx.font = '900 18px "HarmonyOS Sans SC Local", "PingFang SC", sans-serif';
  ctx.fillText(item.category, textX, textY);
  if (item.tag) {
    ctx.fillStyle = "#1f8a70";
    drawRoundRect(ctx, textX + 76, textY - 21, 76, 28, 14);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = '900 16px "HarmonyOS Sans SC Local", "PingFang SC", sans-serif';
    ctx.fillText(item.tag, textX + 94, textY);
  }
  ctx.restore();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let line = "";
  const chars = [...text];
  for (let i = 0; i < chars.length; i += 1) {
    const testLine = line + chars[i];
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = chars[i];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function loadCanvasImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function ensureExportFonts() {
  if (!document.fonts) return;
  await document.fonts.load('900 78px "HarmonyOS Sans SC Local"');
  await document.fonts.ready;
}

function drawContainedImage(ctx, image, x, y, width, height) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawW = image.naturalWidth * scale;
  const drawH = image.naturalHeight * scale;
  ctx.drawImage(image, x + (width - drawW) / 2, y + (height - drawH) / 2, drawW, drawH);
}

function drawSeasonalImage(ctx, image, x, y, width, height) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  drawContainedImage(ctx, image, x - width * 0.008, y - height * 0.008, width * 1.016, height * 1.016);
  ctx.restore();
}

function drawTemplateExportDish(ctx, item, x, y, width, height, image, compact = false, section = "") {
  if (section === "seasonal") {
    drawSeasonalImage(ctx, image, x, y, width, height);
    return;
  }

  const baseImageSize = Math.min(width * 0.9, height * 0.72);
  const braisedImageScale = section === "braised" && item.name.includes("酥肉") ? 0.84 : 1;
  const imageSize = baseImageSize * braisedImageScale;
  const compactImageScale = compact && item.name === "海带卷" ? 0.77 : 0.86;
  const imageX = compact ? x + (width * (1 - compactImageScale)) / 2 : x + (width - imageSize) / 2;
  const imageY = compact ? y + height * 0.02 : y + (baseImageSize - imageSize) / 2;
  const imageW = compact ? width * compactImageScale : imageSize;
  const imageH = compact ? height * 0.56 : imageSize;
  ctx.save();
  ctx.shadowColor = compact ? "transparent" : "rgba(70, 35, 10, .22)";
  ctx.shadowBlur = compact ? 0 : 34;
  ctx.shadowOffsetY = compact ? 0 : 18;
  drawContainedImage(ctx, image, imageX, imageY, imageW, imageH);
  ctx.restore();

  const textX = x + width / 2;
  const textY = compact ? y + height * 0.77 : y + baseImageSize * 0.9;
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.miterLimit = 2;
  const nameFontSize = compact ? 52 : 78;
  const priceFontSize = compact ? 48 : 68;
  ctx.strokeStyle = "#4d2d16";
  ctx.lineWidth = nameFontSize * 0.2;
  ctx.fillStyle = "#fffaf0";
  ctx.font = `900 ${nameFontSize}px "HarmonyOS Sans SC Local", "PingFang SC", sans-serif`;
  ctx.strokeText(item.name, textX, textY, width);
  ctx.fillText(item.name, textX, textY, width);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = priceFontSize * 0.2;
  ctx.fillStyle = "#c82319";
  ctx.font = `900 ${priceFontSize}px "HarmonyOS Sans SC Local", "PingFang SC", sans-serif`;
  const price = formatMenuPrice(item.price);
  ctx.strokeText(price, textX, textY + (compact ? 54 : 78), width);
  ctx.fillText(price, textX, textY + (compact ? 54 : 78), width);
}

function waitForScreenImages(root) {
  const images = Array.from(root.querySelectorAll("img"));
  return Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) return Promise.resolve();
      return new Promise((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`图片加载失败：${image.getAttribute("src") || ""}`));
      });
    })
  );
}

async function renderDomExportCanvas() {
  if (!window.html2canvas) {
    throw new Error("缺少 DOM 导出组件 html2canvas");
  }

  await waitForScreenImages(els.menuScreen);
  const clone = els.menuScreen.cloneNode(true);
  clone.classList.add("export-clone");
  document.body.appendChild(clone);

  try {
    await waitForScreenImages(clone);
    return await window.html2canvas(clone, {
      allowTaint: false,
      backgroundColor: "#f7eee6",
      foreignObjectRendering: false,
      height: 2251,
      logging: false,
      scale: 1,
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
      width: 4000,
      windowHeight: 2251,
      windowWidth: 4000
    });
  } finally {
    clone.remove();
  }
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("PNG 生成失败"));
      }
    }, "image/png");
  });
}

async function saveExportBlob(blob) {
  const response = await fetch("/api/export", {
    method: "POST",
    headers: {
      "Content-Type": "image/png"
    },
    body: blob
  });

  if (!response.ok) {
    throw new Error(`本地保存失败（HTTP ${response.status}）`);
  }
  return response.json();
}

async function exportPng() {
  const previousLabel = els.exportBtn.textContent;
  els.exportBtn.disabled = true;
  els.exportBtn.textContent = "生成中...";
  if (els.exportPanel) els.exportPanel.hidden = true;
  if (els.exportFilePath) els.exportFilePath.textContent = "";

  try {
    await ensureExportFonts();
    const canvas = await renderDomExportCanvas();

    const blob = await canvasToBlob(canvas);
    const url = URL.createObjectURL(blob);
    if (els.exportOpenLink.href && els.exportOpenLink.href.startsWith("blob:")) {
      URL.revokeObjectURL(els.exportOpenLink.href);
    }
    els.exportOpenLink.href = url;
    els.exportPreview.src = url;
    els.exportPanel.hidden = false;
    els.exportStatus.textContent = "PNG 已生成，可下载或打开预览";
    if (els.exportFilePath) {
      els.exportFilePath.textContent = "官网 case 页面使用浏览器下载，不保存到服务器目录。";
    }

    try {
      const link = document.createElement("a");
      link.download = "yangmingyu-menu-screen.png";
      link.href = url;
      link.click();
    } catch (downloadError) {
      console.warn("PNG 已生成，但当前浏览器拦截了自动下载。请使用打开 PNG 链接。", downloadError);
    }
    els.exportBtn.textContent = "已生成";
  } catch (error) {
    console.error(error);
    if (els.exportPanel) {
      els.exportPanel.hidden = false;
      els.exportStatus.textContent = `导出失败：${error.message || "请查看控制台"}`;
    }
    els.exportBtn.textContent = "导出失败";
  } finally {
    setTimeout(() => {
      els.exportBtn.disabled = false;
      els.exportBtn.textContent = previousLabel;
    }, 1200);
  }
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => setTemplate(button.dataset.template));
});

[
  els.screenRatio,
  els.daypart,
  els.primaryColor,
  els.accentColor,
  els.autoPriority,
  els.qualityCheck
].forEach((control) => control.addEventListener("input", render));

els.generateBtn.addEventListener("click", render);
els.randomizeBtn.addEventListener("click", () => {
  state.seed += 1;
  state.items.reverse();
  els.menuInput.value = sortItems(parseMenu(els.menuInput.value))
    .map((item, index) => `${item.category}, ${item.name}, ${item.price || ""}, ${item.tag}, ${Math.max(1, 5 - ((index + state.seed) % 5))}`)
    .join("\n");
  render();
});
els.loadSampleBtn.addEventListener("click", () => {
  els.menuInput.value = sampleMenu;
  render();
});
els.exportBtn.addEventListener("click", exportPng);

els.menuInput.value = sampleMenu;
renderUiAssets();
renderImageLibrary();
render();

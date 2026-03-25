# 寶可夢喜好資料 — 不重複值與英文 Mapping

## Flavor（口味）

共 5 種有效值（排除 `待更新`、`–`）

| 英文 key | 中文原文 |
|----------|----------|
| sweet | 甜甜的(桃桃果、豆子) |
| sour | 酸酸的(番茄、利木果) |
| spicy | 辣辣的(成熟的紅蘿蔔) |
| bitter | 苦苦的(馬鈴薯、莓莓果、海藻) |
| astringent | 澀澀的(小麥、零餘果) |

## Environment（環境偏好）

共 6 種有效值（排除 `–`；`溫款` 為 `溫暖` 的 typo）

| 英文 key | 中文原文 |
|----------|----------|
| bright | 明亮 |
| warm | 溫暖 |
| moist | 滋潤 |
| dry | 乾燥 |
| dim | 昏暗 |
| cool | 涼爽 |

## Things（喜歡的東西）

以 `、` 拆分後共 42 種有效值（排除 `–`；已將縮寫正規化為完整形式）

### 縮寫正規化對照

| 原始縮寫 | 正規化為 |
|----------|----------|
| 海 | 能感受海的 |
| 大家用 / 大家 | 大家一起用的 |
| 食物 | 像食物的 |
| 色彩 / 多彩 | 色彩繽紛的 |
| 遊樂 | 遊戲區 |
| 觀賞用的用的 | 觀賞用的（typo） |

### 完整 Mapping

| 英文 key | 中文原文 |
|----------|----------|
| nature | 能感受大自然的 |
| soft | 柔軟的 |
| cute | 可愛的 |
| water | 能感受水的 |
| communal | 大家一起用的 |
| floral | 花朵綻放的 |
| colorful | 色彩繽紛的 |
| luxurious | 豪華的 |
| fire | 能感受火的 |
| wooden | 木製的 |
| hard | 堅硬的 |
| training | 訓練用的 |
| vehicle | 交通工具 |
| wind | 能感受風的 |
| tidy | 整潔的 |
| healing | 能治癒傷口的 |
| metallic | 金屬的 |
| shiny | 閃亮亮的 |
| gathered | 集聚在一起的 |
| arcane | 艱深難懂的 |
| text | 有文字的 |
| stone | 石製的 |
| slender | 細長的 |
| earth | 能感受土的 |
| ornamental | 觀賞用的 |
| foodlike | 像食物的 |
| mysterious | 奇妙的 |
| noisy | 會發出聲響的 |
| playground | 遊戲區 |
| round | 圓滾滾的 |
| fabric | 布製的 |
| electric | 以電力驅動的 |
| trash | 垃圾 |
| wobbly | 會搖晃的 |
| spinning | 會旋轉的 |
| ocean | 能感受海的 |
| square | 方方的 |
| container | 容器 |
| eerie | 詭異的 |
| pointy | 尖尖的 |
| glass | 有玻璃的 |
| construction | 建設 |
| symbolic | 象徵 |

## 資料品質備註

- `溫款` 出現 1 次，應為 `溫暖` 的 typo
- `待更新` 和 `–` 視為無資料，轉為 `null`
- favorite.json 約 933 筆，pokopia.json 311 筆，以 `name_zh` ↔ `name` 配對
- 部分名稱全形/半形括號不一致（如 `海兔獸（東海）` vs `海兔獸(東海)`），配對時需正規化

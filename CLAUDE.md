<!-- SPECTRA:START v1.0.1 -->

# Spectra Instructions

This project uses Spectra for Spec-Driven Development(SDD). Specs live in `openspec/specs/`, change proposals in `openspec/changes/`.

## Use `/spectra:*` skills when:

- A discussion needs structure before coding → `/spectra:discuss`
- User wants to plan, propose, or design a change → `/spectra:propose`
- Tasks are ready to implement → `/spectra:apply`
- There's an in-progress change to continue → `/spectra:ingest`
- User asks about specs or how something works → `/spectra:ask`
- Implementation is done → `/spectra:archive`

## Workflow

discuss? → propose → apply ⇄ ingest → archive

- `discuss` is optional — skip if requirements are clear
- Requirements change mid-work? Plan mode → `ingest` → resume `apply`

## Parked Changes

Changes can be parked（暫存）— temporarily moved out of `openspec/changes/`. Parked changes won't appear in `spectra list` but can be found with `spectra list --parked`. To restore: `spectra unpark <name>`. The `/spectra:apply` and `/spectra:ingest` skills handle parked changes automatically.

<!-- SPECTRA:END -->

## Design Context

See `.impeccable.md` for full details.

- **Brand**: 溫暖、親切、探索感 — 像手繪野外圖鑑，帶冒險溫度
- **Users**: Pokopia 玩家，混合情境（邊玩邊查 / 事前規劃 / 瀏覽探索）
- **Palette**: OKLCH 色彩空間，Pokédex 紅 (hue 27) + 自然綠 (hue 145)，僅 light mode
- **Typography**: DM Sans (body) + Outfit (display)
- **Anti-patterns**: 禁用紫色漸層、glassmorphism、深色發光、Inter/Roboto

### Design Principles
1. **Information density over decoration** — 每個像素都有用途
2. **Warmth through color, not noise** — 品牌溫度來自配色，非裝飾
3. **Progressive disclosure** — 漸進呈現複雜度
4. **Touch-friendly, scan-friendly** — 適合觸控和快速掃視
5. **Brand coherence over novelty** — 強化品牌感，非追趨勢

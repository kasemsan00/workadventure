# 🗺️ WorkAdventure Map Redesign Guide
## คู่มือการออกแบบแผนที่ WorkAdventure แบบครบวงจร

---

## 📊 สารบัญ (Table of Contents)

1. [วิเคราะห์ปัญหา Map ปัจจุบัน](#1-วิเคราะห์ปัญหา-map-ปัจจุบัน)
2. [แผนผัง Layout ใหม่](#2-แผนผัง-layout-ใหม่)
3. [Zone Specifications](#3-zone-specifications)
4. [Tileset Recommendations](#4-tileset-recommendations)
5. [Events & Interactions](#5-events--interactions)
6. [Performance Optimization](#6-performance-optimization)
7. [Thematic World Ideas](#7-thematic-world-ideas)
8. [Implementation Steps](#8-implementation-steps)
9. [Export Plan](#9-export-plan)

---

## 1. วิเคราะห์ปัญหา Map ปัจจุบัน

### Current Map Issues (ปัญหาของ Map เดิม)

| ปัญหา | รายละเอียด | ผลกระทบ |
|-------|-----------|---------|
| **ขนาดเล็กเกินไป** | 31×21 tiles (992×672 px) | รองรับได้แค่ ~20 คน |
| **Spawn Point แคบ** | 2 tiles เท่านั้น | คอขวดตอน login |
| **ทางเดินแคบ** | 2-3 tiles | ผู้เล่นชนกัน |
| **Meeting Room น้อย** | 2 ห้อง | ไม่เพียงพอ |
| **ไม่มี Outdoor Zone** | - | ขาดความหลากหลาย |

### Recommended Improvements

```
Before (เดิม):           After (ใหม่):
┌─────────┐              ┌───────────────────────┐
│  31×21  │     →        │       80×60           │
│ ~20 ppl │              │    ~300 ppl           │
└─────────┘              └───────────────────────┘
```

---

## 2. แผนผัง Layout ใหม่

### Map Size: 80×60 tiles (2560×1920 pixels)

```ascii
╔══════════════════════════════════════════════════════════════════════════════╗
║                                    NORTH                                      ║
║  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────────┐║
║  │   🌳 OUTDOOR    │  │   🌳 GARDEN     │  │       🏢 ROOFTOP LOUNGE         │║
║  │    TERRACE      │  │    AREA         │  │    (Jitsi: RooftopChat)         │║
║  │  (Silent Zone)  │  │  (Bubble Audio) │  │                                 │║
║  │   14×8 tiles    │  │   14×8 tiles    │  │        24×8 tiles               │║
║  └────────┬────────┘  └────────┬────────┘  └────────────────┬────────────────┘║
║           │                    │                            │                 ║
║  ┌────────┴────────────────────┴────────────────────────────┴────────────────┐║
║  │                        🚶 MAIN CORRIDOR (Wide: 6 tiles)                   │║
║  └────────┬────────────────────┬────────────────────────────┬────────────────┘║
║           │                    │                            │                 ║
║  ┌────────┴────────┐  ┌────────┴────────┐  ┌────────────────┴────────────────┐║
║  │  🚪 MEETING     │  │  🚪 MEETING     │  │        💼 COLLABORATION         │║
║  │   ROOM A        │  │   ROOM B        │  │           SPACE                 │║
║  │ (Jitsi: RoomA)  │  │ (Jitsi: RoomB)  │  │    (Tables + Whiteboards)       │║
║  │   10×8 tiles    │  │   10×8 tiles    │  │        20×10 tiles              │║
║  └─────────────────┘  └─────────────────┘  └─────────────────────────────────┘║
║                                                                               ║
║  ┌───────────────────────────────────────────────────────────────────────────┐║
║  │                        🚶 CENTRAL PLAZA (Wide: 8 tiles)                   │║
║  │                              ⭐ SPAWN AREA                                │║
║  │                         (Multiple Spawn Points)                           │║
║  │                            20×8 tiles                                     │║
║  └────────┬────────────────────┬────────────────────────────┬────────────────┘║
║           │                    │                            │                 ║
║W ┌────────┴────────┐  ┌────────┴────────┐  ┌────────────────┴────────────────┐E║
║E │  🎪 MAIN LOBBY  │  │  📺 STAGE       │  │        🛋️ HANGOUT ZONE          │A║
║S │  (Info Desk)    │  │  (Presentation) │  │    (Sofas + Coffee Area)        │S║
║T │  NPC: Welcome   │  │  Jitsi Stream   │  │      Bubble Audio Zones         │T║
║  │   16×12 tiles   │  │   12×10 tiles   │  │        16×10 tiles              │║
║  └─────────────────┘  └─────────────────┘  └─────────────────────────────────┘║
║                                                                               ║
║  ┌────────────────────────────────────────────────────────────────────────────┐║
║  │                        🚶 SOUTH CORRIDOR (Wide: 5 tiles)                  │║
║  └────────┬────────────────────┬────────────────────────────┬────────────────┘║
║           │                    │                            │                 ║
║  ┌────────┴────────┐  ┌────────┴────────┐  ┌────────────────┴────────────────┐║
║  │  🚪 MEETING     │  │  🚪 MEETING     │  │        🎮 GAME / BREAKOUT       │║
║  │   ROOM C        │  │   ROOM D        │  │           AREA                  │║
║  │ (Jitsi: RoomC)  │  │ (Jitsi: RoomD)  │  │    (Mini Games + Arcade)        │║
║  │   8×6 tiles     │  │   8×6 tiles     │  │        16×8 tiles               │║
║  └─────────────────┘  └─────────────────┘  └─────────────────────────────────┘║
║                                                                               ║
║  ┌────────────────────────────────────────────────────────────────────────────┐║
║  │  🌐 PORTAL ZONE: → Conference Hall | → Training Room | → External World   │║
║  └────────────────────────────────────────────────────────────────────────────┘║
║                                    SOUTH                                      ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 3. Zone Specifications

### Capacity Calculator

```
Formula: Zone Capacity = (Width × Height) / 4
(Assuming 2×2 tiles per person for comfortable movement)
```

| Zone | Size (tiles) | Capacity | Jitsi Room | Features |
|------|-------------|----------|------------|----------|
| **Main Lobby** | 16×12 | 48 users | - | Info desk, Welcome NPC, Signs |
| **Central Plaza** | 20×8 | 40 users | - | Multiple spawn points (10+) |
| **Meeting Room A** | 10×8 | 20 users | `MeetingRoomA` | Focusable, Tables, Whiteboard |
| **Meeting Room B** | 10×8 | 20 users | `MeetingRoomB` | Focusable, Tables, Screen |
| **Meeting Room C** | 8×6 | 12 users | `MeetingRoomC` | Small meetings |
| **Meeting Room D** | 8×6 | 12 users | `MeetingRoomD` | Small meetings |
| **Collaboration Space** | 20×10 | 50 users | `CollaborationHub` | Whiteboards, Group tables |
| **Hangout Zone** | 16×10 | 40 users | `HangoutLounge` | Sofas, Coffee, Bubble zones |
| **Stage/Presentation** | 12×10 | 30 users | `MainStage` | Screen, Streaming |
| **Outdoor Terrace** | 14×8 | 28 users | - | **Silent zone**, Plants |
| **Garden Area** | 14×8 | 28 users | `GardenChat` | Bubble audio, Nature |
| **Rooftop Lounge** | 24×8 | 48 users | `RooftopLounge` | Open chat area |
| **Game/Breakout** | 16×8 | 32 users | `GameRoom` | Interactive elements |
| **Corridors** | Various | ∞ | - | 5-8 tiles wide |

**🎯 Total Comfortable Capacity: ~250-300 concurrent users**

---

## 4. Tileset Recommendations

### Available Tilesets (มีอยู่แล้ว)

| Tileset | File | ใช้สำหรับ |
|---------|------|----------|
| Special Zones | `WA_Special_Zones.png` | Start, Collision, Exit |
| Room Builder | `WA_Room_Builder.png` | Floors, Walls, Doors |
| Seats | `WA_Seats.png` | Chairs, Sofas, Benches |
| Tables | `WA_Tables.png` | Meeting tables, Desks |
| Decoration | `WA_Decoration.png` | Plants, Art, Props |
| Exterior | `WA_Exterior.png` | Outdoor, Garden, Trees |
| Other Furniture | `WA_Other_Furniture.png` | Shelves, Cabinets |
| Miscellaneous | `WA_Miscellaneous.png` | Various props |
| User Interface | `WA_User_Interface.png` | Signs, Arrows, Icons |
| Logo | `WA_Logo_Long.png` | Branding |

### Recommended Additional Tilesets

```
📦 Free Tileset Resources:
├── OpenGameArt.org
│   ├── LPC Terrain (outdoor/nature)
│   ├── Modern Interior Pack
│   └── Office Furniture Set
├── Itch.io
│   ├── Pixel Art Office Pack
│   ├── Cozy Interior Tileset
│   └── Tech/Futuristic Pack
└── Custom
    ├── Company Logo Tiles
    ├── Branded Color Floors
    └── Custom Signs/Banners
```

### Tileset Best Practices

1. **Keep tile size consistent**: 32×32 pixels
2. **Optimize PNG files**: Use TinyPNG or similar
3. **Group related tiles**: Easier to find in Tiled
4. **Document tile IDs**: For scripting reference

---

## 5. Events & Interactions

### 5.1 Portal System

```json
{
  "name": "portalToConference",
  "type": "area",
  "properties": [
    {
      "name": "exitUrl",
      "type": "string",
      "value": "conference.tmj#from-office"
    }
  ]
}
```

### 5.2 Jitsi Meeting Rooms

```json
{
  "name": "jitsiMeetingRoomA",
  "type": "area",
  "properties": [
    { "name": "jitsiRoom", "type": "string", "value": "MeetingRoomA" },
    { "name": "jitsiTrigger", "type": "string", "value": "onaction" },
    { "name": "focusable", "type": "bool", "value": true },
    { "name": "zoom_margin", "type": "float", "value": 1.5 }
  ]
}
```

### 5.3 Silent Zones

```json
{
  "name": "silentOutdoorTerrace",
  "type": "area",
  "properties": [
    { "name": "silent", "type": "bool", "value": true }
  ]
}
```

### 5.4 Bubble Audio Zones

```json
{
  "name": "coffeeCorner",
  "type": "area",
  "properties": [
    { "name": "jitsiRoom", "type": "string", "value": "CoffeeCorner" },
    { "name": "jitsiTrigger", "type": "string", "value": "onaction" }
  ]
}
```

### 5.5 NPC / Interactive Objects

```json
{
  "name": "welcomeNPC",
  "type": "area",
  "properties": [
    { "name": "openWebsite", "type": "string", "value": "https://..." },
    { "name": "openWebsiteTrigger", "type": "string", "value": "onaction" },
    { "name": "openWebsiteTriggerMessage", "type": "string", "value": "Press SPACE to talk" }
  ]
}
```

### 5.6 Popup Information

```typescript
// In main.ts
WA.room.area.onEnter('infoBoard').subscribe(() => {
    WA.ui.openPopup("infoBoardPopup", "Welcome message...", [
        { label: "OK", callback: () => popup.close() }
    ]);
});
```

---

## 6. Performance Optimization

### 🚀 สำหรับ 50-300 Concurrent Users

#### 6.1 Map Design Optimizations

| Optimization | Description | Impact |
|-------------|-------------|--------|
| **Wide Corridors** | 5-8 tiles minimum | ลด collision calculations |
| **Multiple Spawn Points** | 10+ spawn areas | กระจาย load |
| **Zone Separation** | Clear boundaries | ลด render load |
| **Minimal Animations** | ใช้เท่าที่จำเป็น | ลด CPU usage |

#### 6.2 Layer Optimization

```
✅ DO:
- Group related layers
- Use tile layers for static content
- Minimize object layers

❌ DON'T:
- Too many overlapping layers
- Large animated areas
- Complex collision shapes
```

#### 6.3 Tileset Optimization

```bash
# Optimize PNG files
# Use tools like TinyPNG, ImageOptim, or:
optipng -o7 tilesets/*.png
pngquant --quality=65-80 tilesets/*.png
```

#### 6.4 Script Optimization

```typescript
// ✅ Good: Debounce frequent events
let debounceTimer: ReturnType<typeof setTimeout>;
const debouncedAction = (callback: () => void) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, 100);
};

// ✅ Good: Cleanup subscriptions
const subscription = WA.room.area.onEnter('zone').subscribe(() => {});
// Later: subscription.unsubscribe();

// ❌ Bad: No cleanup, memory leaks
WA.room.area.onEnter('zone').subscribe(() => {
    // Creates new subscription each time
});
```

#### 6.5 Server-Side Considerations

```yaml
# WorkAdventure Server Config Recommendations
max_users_per_room: 300
sprite_quality: medium
video_quality: 720p
audio_quality: 128kbps
```

#### 6.6 Network Optimization

| Setting | Recommended | Notes |
|---------|-------------|-------|
| **Jitsi Quality** | 720p max | ลด bandwidth |
| **Update Rate** | 10-15 fps | ลด network traffic |
| **Sprite Size** | 32×48 px | Standard size |

---

## 7. Thematic World Ideas

### 🏢 Theme 1: Modern Corporate Office

```
Color Palette:
- Primary: #2C3E50 (Dark Blue-Gray)
- Secondary: #3498DB (Blue)
- Accent: #E74C3C (Red)
- Background: #ECF0F1 (Light Gray)

Features:
- Glass walls
- Minimalist furniture
- Digital screens
- Green plants
```

### 🌆 Theme 2: Digital City / Metaverse

```
Color Palette:
- Primary: #9B59B6 (Purple)
- Secondary: #00D4FF (Cyan)
- Accent: #FF6B6B (Coral)
- Background: #1A1A2E (Dark)

Features:
- Neon lights
- Holographic displays
- Floating platforms
- Cyberpunk aesthetic
```

### 🏛️ Theme 3: Luxury / Premium

```
Color Palette:
- Primary: #2C2C2C (Charcoal)
- Secondary: #D4AF37 (Gold)
- Accent: #8B0000 (Dark Red)
- Background: #F5F5DC (Beige)

Features:
- Marble floors
- Gold accents
- Chandeliers
- Velvet furniture
```

### 🌿 Theme 4: Nature / Eco-Friendly

```
Color Palette:
- Primary: #27AE60 (Green)
- Secondary: #8B4513 (Brown)
- Accent: #F39C12 (Orange)
- Background: #F5F5DC (Cream)

Features:
- Living walls
- Natural wood
- Water features
- Outdoor spaces
```

### 🎮 Theme 5: Gaming / Arcade

```
Color Palette:
- Primary: #FF00FF (Magenta)
- Secondary: #00FF00 (Lime)
- Accent: #FFFF00 (Yellow)
- Background: #000000 (Black)

Features:
- Arcade machines
- LED strips
- Gaming chairs
- Trophy displays
```

---

## 8. Implementation Steps

### Phase 1: Planning (Week 1)
- [ ] Finalize zone layout
- [ ] Create detailed wireframe
- [ ] Choose theme and color palette
- [ ] List required tilesets

### Phase 2: Base Map (Week 2)
- [ ] Create new TMJ file (80×60)
- [ ] Set up all layers
- [ ] Add floor tiles
- [ ] Add wall tiles

### Phase 3: Zones & Objects (Week 3)
- [ ] Create all meeting rooms
- [ ] Add furniture
- [ ] Set up collision layer
- [ ] Add spawn points

### Phase 4: Interactions (Week 4)
- [ ] Configure Jitsi zones
- [ ] Add portal connections
- [ ] Set up NPC interactions
- [ ] Add popup zones

### Phase 5: Scripting (Week 5)
- [ ] Update main.ts
- [ ] Add zone handlers
- [ ] Test all interactions
- [ ] Performance testing

### Phase 6: Testing & Launch (Week 6)
- [ ] Load testing (50+ users)
- [ ] Bug fixes
- [ ] Documentation
- [ ] Deploy to production

---

## 9. Export Plan

### 9.1 File Structure

```
project/
├── improved_office.tmj      # Main map file
├── conference.tmj           # Conference room map
├── training.tmj             # Training room map
├── improved_office.png      # Map thumbnail (512×512)
├── src/
│   └── improved_main.ts     # Main script
├── tilesets/
│   ├── WA_*.png            # Standard tilesets
│   └── custom_*.png        # Custom tilesets
└── public/
    └── images/             # Static assets
```

### 9.2 Build Commands

```bash
# Development
npm run dev

# Production Build
npm run build

# Upload to WorkAdventure
npm run upload
```

### 9.3 Deployment Checklist

- [ ] All TMJ files validated
- [ ] All tilesets optimized
- [ ] Scripts compiled without errors
- [ ] Thumbnail images created
- [ ] Environment variables set
- [ ] Map tested locally
- [ ] Map tested with multiple users

### 9.4 Environment Variables

```env
# .env
UPLOAD_STRATEGY=MAP_STORAGE
MAP_STORAGE_URL=https://map-storage.workadventu.re
MAP_STORAGE_API_KEY=your-api-key
UPLOAD_DIRECTORY=/your-org/your-world
```

---

## 📚 Additional Resources

### Documentation
- [WorkAdventure Map Building Guide](https://docs.workadventu.re/map-building/)
- [Tiled Map Editor](https://www.mapeditor.org/)
- [WorkAdventure Scripting API](https://docs.workadventu.re/map-building/scripting/)

### Community
- [WorkAdventure Discord](https://discord.gg/G6Xh9ZM9aR)
- [GitHub Issues](https://github.com/workadventure/workadventure/issues)

### Tools
- [Tiled Map Editor](https://www.mapeditor.org/)
- [Aseprite](https://www.aseprite.org/) - Pixel art editor
- [TinyPNG](https://tinypng.com/) - Image optimization

---

## 🎯 Quick Reference Card

```
╔═══════════════════════════════════════════════════════════════╗
║                    WORKADVENTURE QUICK REF                    ║
╠═══════════════════════════════════════════════════════════════╣
║ Map Size:        80×60 tiles (2560×1920 px)                   ║
║ Tile Size:       32×32 pixels                                 ║
║ Corridor Width:  5-8 tiles minimum                            ║
║ Spawn Points:    10+ distributed                              ║
║ Max Capacity:    ~300 concurrent users                        ║
╠═══════════════════════════════════════════════════════════════╣
║ ESSENTIAL LAYERS:                                             ║
║ • start        - Spawn point tiles (tile ID: 2)               ║
║ • collisions   - Collision tiles (tile ID: 3)                 ║
║ • floor        - Floor tiles                                  ║
║ • walls        - Wall tiles                                   ║
║ • furniture    - Furniture tiles                              ║
║ • floorLayer   - Object layer for zones                       ║
║ • above        - Above-player tiles                           ║
╠═══════════════════════════════════════════════════════════════╣
║ ZONE PROPERTIES:                                              ║
║ • jitsiRoom         - Video chat room name                    ║
║ • jitsiTrigger      - "onaction" or automatic                 ║
║ • exitUrl           - Portal destination                      ║
║ • silent            - Disable voice/video                     ║
║ • focusable         - Camera focus on zone                    ║
║ • start             - Spawn point marker                      ║
╚═══════════════════════════════════════════════════════════════╝
```

---

**Created by**: AI Assistant  
**Version**: 1.0  
**Last Updated**: 2024


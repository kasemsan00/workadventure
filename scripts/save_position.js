// scripts/save_position.js
(async () => {
  await WA.onInit();

  // โหลดตำแหน่งล่าสุด (ถ้ามี)
  const last = await WA.player.state.loadVariable("lastPos");
  if (last && typeof last.x === "number" && typeof last.y === "number") {
    await WA.player.teleport(last.x, last.y);
  }

  // debounce การบันทึกตำแหน่ง
  let saveTimer;
  WA.player.onPlayerMove((ev) => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      const pos = { x: ev.x, y: ev.y };
      await WA.player.state.saveVariable("lastPos", pos, {
        persist: true,         // คงข้าม session
        public: false,         // มองเห็นเฉพาะผู้เล่นนี้
        scope: "world",        // จำทุกห้องใน world เดียวกัน
        ttl: 86400             // อายุข้อมูล (ในวินาที) ตัวเลือกใหม่
      });
    }, 300);
  });
})();

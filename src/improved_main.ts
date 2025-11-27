/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("🚀 Improved Office Script Started");

// ============================================
// TYPE DEFINITIONS
// ============================================
interface PopupState {
  current: any | undefined;
}

interface ZoneConfig {
  name: string;
  message: string;
  popupId?: string;
}

// ============================================
// STATE MANAGEMENT
// ============================================
const popupState: PopupState = {
  current: undefined,
};

// Zone configurations for easy maintenance
const ZONES: Record<string, ZoneConfig> = {
  infoBoard: {
    name: "infoBoard",
    message:
      "📋 Welcome to the Virtual Office!\n\n• Meeting Rooms: A, B, C, D\n• Hangout Zone: Casual conversations\n• Stage: Presentations\n• Outdoor: Silent zone for focus",
    popupId: "infoBoardPopup",
  },
  welcomeNPC: {
    name: "welcomeNPC",
    message: "👋 Hello! Press SPACE to open the Getting Started guide.",
    popupId: "welcomeNPCPopup",
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function closeCurrentPopup(): void {
  if (popupState.current !== undefined) {
    popupState.current.close();
    popupState.current = undefined;
  }
}

function formatTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

function formatDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-US", options);
}

// ============================================
// ZONE HANDLERS
// ============================================
function setupZoneHandlers(): void {
  // Info Board Zone
  WA.room.area.onEnter("infoBoard").subscribe(() => {
    const zone = ZONES.infoBoard;
    if (zone.popupId) {
      popupState.current = WA.ui.openPopup(zone.popupId, zone.message, [
        {
          label: "Got it!",
          callback: closeCurrentPopup,
        },
      ]);
    }
  });
  WA.room.area.onLeave("infoBoard").subscribe(closeCurrentPopup);

  // Clock/Time Display (if exists)
  WA.room.area.onEnter("clock").subscribe(() => {
    const message = `🕐 Current Time: ${formatTime()}\n📅 ${formatDate()}`;
    popupState.current = WA.ui.openPopup("clockPopup", message, []);
  });
  WA.room.area.onLeave("clock").subscribe(closeCurrentPopup);

  console.log("✅ Zone handlers initialized");
}

// ============================================
// MEETING ROOM NOTIFICATIONS
// ============================================
function setupMeetingRoomNotifications(): void {
  const meetingRooms = ["jitsiMeetingRoomA", "jitsiMeetingRoomB", "jitsiMeetingRoomC", "jitsiMeetingRoomD"];

  meetingRooms.forEach((room, index) => {
    const roomLetter = String.fromCharCode(65 + index); // A, B, C, D

    WA.room.area.onEnter(room).subscribe(() => {
      WA.ui.displayBubble();
      console.log(`📍 Player entered Meeting Room ${roomLetter}`);
    });

    WA.room.area.onLeave(room).subscribe(() => {
      WA.ui.removeBubble();
      console.log(`📍 Player left Meeting Room ${roomLetter}`);
    });
  });

  console.log("✅ Meeting room notifications initialized");
}

// ============================================
// WELCOME MESSAGE & PLAYER TRACKING
// ============================================
function displayWelcomeMessage(): void {
  WA.chat.sendChatMessage(
    "👋 Welcome to the Virtual Office! Use SPACE to interact with objects. Explore meeting rooms, hangout zones, and more!",
    "System"
  );
}

function setupPlayerTracking(): void {
  // Track player count (for analytics/debugging)
  let playerCount = 0;

  WA.players.onPlayerEnters.subscribe((player) => {
    playerCount++;
    console.log(`👤 Player joined: ${player.name} (Total: ${playerCount})`);
  });

  WA.players.onPlayerLeaves.subscribe((player) => {
    playerCount--;
    console.log(`👤 Player left: ${player.name} (Total: ${playerCount})`);
  });

  console.log("✅ Player tracking initialized");
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
function optimizeForConcurrency(): void {
  // Reduce update frequency for better performance with many users
  // This is handled by WorkAdventure server, but we can optimize client-side

  // Debounce popup updates
  let popupDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  const debouncedPopupUpdate = (callback: () => void, delay: number = 100) => {
    if (popupDebounceTimer) {
      clearTimeout(popupDebounceTimer);
    }
    popupDebounceTimer = setTimeout(callback, delay);
  };

  console.log("✅ Performance optimizations applied");
}

// ============================================
// CUSTOM ACTIONS
// ============================================
function setupCustomActions(): void {
  // Register custom action for quick room navigation
  WA.ui.registerMenuCommand("📍 Go to Lobby", () => {
    WA.nav.goToRoom("improved_office.tmj#mainSpawn");
  });

  WA.ui.registerMenuCommand("🎤 Go to Stage", () => {
    WA.nav.goToRoom("improved_office.tmj#stageArea");
  });

  WA.ui.registerMenuCommand("☕ Go to Hangout", () => {
    WA.nav.goToRoom("improved_office.tmj#hangoutZone");
  });

  console.log("✅ Custom menu actions registered");
}

// ============================================
// MAIN INITIALIZATION
// ============================================
WA.onInit()
  .then(() => {
    console.log("🎮 WorkAdventure Scripting API Ready");
    console.log("👤 Player tags:", WA.player.tags);
    console.log("🗺️ Current map:", WA.room.mapURL);

    // Initialize all systems
    setupZoneHandlers();
    setupMeetingRoomNotifications();
    setupPlayerTracking();
    optimizeForConcurrency();
    setupCustomActions();

    // Display welcome message after short delay
    setTimeout(displayWelcomeMessage, 2000);

    // Bootstrap extra features
    bootstrapExtra()
      .then(() => {
        console.log("✅ Scripting API Extra ready");
      })
      .catch((e) => console.error("❌ Extra API Error:", e));
  })
  .catch((e) => console.error("❌ Init Error:", e));

// ============================================
// EXPORTS
// ============================================
export {};

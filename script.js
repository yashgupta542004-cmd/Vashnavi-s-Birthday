/**
 * A Little Birthday Surprise for Vaishnavi 🐾
 * Interactive Logic, Particle Canvas, Web Audio Synthesizer,
 * Music Box Melody, Puppy Petting Counter, Candle Blowout Ceremony,
 * State Transitions, and Keyboard Accessibility.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Data & Content Constants
  // ==========================================================================
  const ASSISTANT_DATA = {
    dog: {
      name: 'Dog',
      icon: '🐶',
      title: 'Chief Happiness Officer Approved',
      response: 'Excellent choice. This assistant will wag away 97% of your worries. The other 3% require snacks.',
      toast: 'The dog department approves! 🐶'
    },
    cat: {
      name: 'Cat',
      icon: '🐱',
      title: 'Chief Nap Officer Approved',
      response: 'Approved. This assistant recommends cancelling all unnecessary meetings and taking a nap.',
      toast: 'Nap mode officially authorized 🐱'
    },
    panda: {
      name: 'Panda',
      icon: '🐼',
      title: 'Chief Snack Officer Approved',
      response: 'A snack specialist! Finally, someone who understands the real priorities in life.',
      toast: 'Snack specialist on duty! 🐼'
    }
  };

  // Pastel party color palette for confetti
  const CONFETTI_COLORS = [
    '#FF6F9F', // Rose pink
    '#B892FF', // Lavender
    '#FFD166', // Warm gold
    '#70D6FF', // Soft sky
    '#FF9F1C', // Peach
    '#FFF0F5', // Blush
    '#7B3158'  // Deep plum accent
  ];

  // Cozy "Happy Birthday" Melody Notes (frequencies in Hz)
  const BDAY_MELODY = [
    // "Happy birthday to you"
    { note: 392.00, dur: 0.28, gap: 0.38 }, // G4
    { note: 392.00, dur: 0.20, gap: 0.30 }, // G4
    { note: 440.00, dur: 0.45, gap: 0.55 }, // A4
    { note: 392.00, dur: 0.45, gap: 0.55 }, // G4
    { note: 523.25, dur: 0.50, gap: 0.60 }, // C5
    { note: 493.88, dur: 0.90, gap: 1.10 }, // B4
    // "Happy birthday to you"
    { note: 392.00, dur: 0.28, gap: 0.38 }, // G4
    { note: 392.00, dur: 0.20, gap: 0.30 }, // G4
    { note: 440.00, dur: 0.45, gap: 0.55 }, // A4
    { note: 392.00, dur: 0.45, gap: 0.55 }, // G4
    { note: 587.33, dur: 0.50, gap: 0.60 }, // D5
    { note: 523.25, dur: 0.90, gap: 1.10 }, // C5
    // "Happy birthday dear Vaishnavi"
    { note: 392.00, dur: 0.28, gap: 0.38 }, // G4
    { note: 392.00, dur: 0.20, gap: 0.30 }, // G4
    { note: 783.99, dur: 0.50, gap: 0.60 }, // G5
    { note: 659.25, dur: 0.50, gap: 0.60 }, // E5
    { note: 523.25, dur: 0.50, gap: 0.60 }, // C5
    { note: 493.88, dur: 0.50, gap: 0.60 }, // B4
    { note: 440.00, dur: 0.85, gap: 1.00 }, // A4
    // "Happy birthday to you"
    { note: 698.46, dur: 0.28, gap: 0.38 }, // F5
    { note: 698.46, dur: 0.20, gap: 0.30 }, // F5
    { note: 659.25, dur: 0.50, gap: 0.60 }, // E5
    { note: 523.25, dur: 0.50, gap: 0.60 }, // C5
    { note: 587.33, dur: 0.50, gap: 0.60 }, // D5
    { note: 523.25, dur: 1.10, gap: 1.80 }  // C5
  ];

  // ==========================================================================
  // 2. Application State
  // ==========================================================================
  const state = {
    currentScreen: 'welcome', // 'welcome' | 'assistant' | 'notifications' | 'candle' | 'letter'
    selectedAssistant: null,
    voucherRevealed: false,
    soundEnabled: true,
    musicPlaying: false,
    candleBlown: false,
    petCount: 0,
    audioCtx: null
  };

  let musicTimeouts = [];
  let musicLoopTimeout = null;
  let tailFastTimeout = null;

  // ==========================================================================
  // 3. DOM Elements
  // ==========================================================================
  const screens = {
    welcome: document.getElementById('screen-welcome'),
    assistant: document.getElementById('screen-assistant'),
    notifications: document.getElementById('screen-notifications'),
    candle: document.getElementById('screen-candle'),
    letter: document.getElementById('screen-letter')
  };

  const progressBar = document.getElementById('progress-bar');
  const stepDots = {
    1: document.getElementById('step-dot-1'),
    2: document.getElementById('step-dot-2'),
    3: document.getElementById('step-dot-3'),
    4: document.getElementById('step-dot-4')
  };
  const connectors = {
    1: document.getElementById('connector-1'),
    2: document.getElementById('connector-2'),
    3: document.getElementById('connector-3')
  };

  // Top Nav Buttons
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundStatus = document.getElementById('sound-status');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const musicIcon = document.getElementById('music-icon');
  const musicStatus = document.getElementById('music-status');

  // Welcome Screen & Petting Elements
  const btnStartMission = document.getElementById('btn-start-mission');
  const puppyPetZone = document.getElementById('puppy-pet-zone');
  const puppyTailElem = document.getElementById('puppy-tail-elem');
  const petCountDisplay = document.getElementById('pet-count-display');
  const petStatusMsg = document.getElementById('pet-status-msg');

  // Mission 1 Elements
  const assistantCards = document.querySelectorAll('.assistant-card');
  const assistantFeedback = document.getElementById('assistant-feedback');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackTitle = document.getElementById('feedback-title');
  const feedbackText = document.getElementById('feedback-text');
  const assistantActionWrap = document.getElementById('assistant-action-wrap');
  const btnNextToNotifications = document.getElementById('btn-next-to-notifications');

  // Mission 2 Elements
  const btnToCandle = document.getElementById('btn-to-candle');

  // Mission 3 (Candle Wish) Elements
  const cakeContainer = document.getElementById('cake-container');
  const candleFlameGroup = document.getElementById('candle-flame-group');
  const flameHalo = document.getElementById('flame-halo');
  const candleSmoke = document.getElementById('candle-smoke');
  const wishInstructionText = document.getElementById('wish-instruction-text');
  const blowActionWrap = document.getElementById('blow-action-wrap');
  const candleNextWrap = document.getElementById('candle-next-wrap');
  const btnBlowCandle = document.getElementById('btn-blow-candle');
  const btnUnlockLetter = document.getElementById('btn-unlock-letter');

  // Mission 4 (Letter & Voucher) Elements
  const voucherTriggerSection = document.getElementById('voucher-trigger-section');
  const btnRevealVoucher = document.getElementById('btn-reveal-voucher');
  const voucherContainer = document.getElementById('voucher-container');
  const btnReplay = document.getElementById('btn-replay');

  // Global utilities
  const toastContainer = document.getElementById('toast-container');
  const confettiCanvas = document.getElementById('confetti-canvas');

  // ==========================================================================
  // 4. Lightweight Web Audio Synthesizer (Zero External Audio Files)
  // ==========================================================================
  function initAudioContext() {
    if (!state.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      state.audioCtx = new AudioCtxClass();
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1, delay = 0) {
    if (!state.soundEnabled) return;
    try {
      initAudioContext();
      if (!state.audioCtx) return;

      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      const startTime = state.audioCtx.currentTime + delay;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(gainVal, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(state.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      // Audio playback fails gracefully if browser restricts
    }
  }

  function soundPop() {
    playTone(520, 'sine', 0.1, 0.12);
  }

  function soundChime() {
    // Cheerful pentatonic chime (C5, E5, G5, C6)
    playTone(523.25, 'triangle', 0.18, 0.1, 0.0);
    playTone(659.25, 'triangle', 0.22, 0.1, 0.08);
    playTone(783.99, 'triangle', 0.26, 0.1, 0.16);
    playTone(1046.50, 'triangle', 0.35, 0.12, 0.24);
  }

  function soundCelebration() {
    // Celebratory fanfare arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      playTone(freq, 'triangle', 0.3, 0.12, idx * 0.09);
    });
  }

  function soundBlowCandle() {
    if (!state.soundEnabled) return;
    try {
      initAudioContext();
      // Gentle breath / whoosh tone
      playTone(280, 'sine', 0.32, 0.08);
      // Magical sparkle chime
      setTimeout(() => {
        playTone(1046.50, 'triangle', 0.22, 0.1, 0.0);
        playTone(1318.51, 'triangle', 0.26, 0.1, 0.08);
        playTone(1567.98, 'triangle', 0.36, 0.12, 0.16);
      }, 180);
    } catch (e) {}
  }

  // ==========================================================================
  // Music Box Synthesizer (Vintage Kalimba / Lullaby Chime)
  // ==========================================================================
  function playMusicBoxNote(freq, duration = 0.8, gainVal = 0.12) {
    if (!state.musicPlaying) return;
    try {
      initAudioContext();
      if (!state.audioCtx) return;
      const now = state.audioCtx.currentTime;

      // Primary sine bell
      const osc1 = state.audioCtx.createOscillator();
      const gain1 = state.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      gain1.gain.setValueAtTime(gainVal, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc1.connect(gain1);
      gain1.connect(state.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + duration);

      // Delicate overtone (kalimba resonance)
      const osc2 = state.audioCtx.createOscillator();
      const gain2 = state.audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);
      gain2.gain.setValueAtTime(gainVal * 0.26, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);
      osc2.connect(gain2);
      gain2.connect(state.audioCtx.destination);
      osc2.start(now);
      osc2.stop(now + duration * 0.6);
    } catch (e) {}
  }

  function startMusicBox() {
    stopMusicBox();
    state.musicPlaying = true;
    musicToggleBtn.classList.add('active');
    musicStatus.textContent = 'ON';
    showToast('Playing cozy birthday music box 🎵', '🎶');

    let accumTime = 0;
    BDAY_MELODY.forEach((item) => {
      const t = setTimeout(() => {
        if (state.musicPlaying) {
          playMusicBoxNote(item.note, item.dur * 1.8, 0.14);
        }
      }, accumTime * 1000);
      musicTimeouts.push(t);
      accumTime += item.gap;
    });

    // Seamless loop after full melody
    musicLoopTimeout = setTimeout(() => {
      if (state.musicPlaying) {
        startMusicBox();
      }
    }, (accumTime + 2.5) * 1000);
  }

  function stopMusicBox() {
    state.musicPlaying = false;
    musicToggleBtn.classList.remove('active');
    musicStatus.textContent = 'OFF';
    musicTimeouts.forEach(t => clearTimeout(t));
    musicTimeouts = [];
    if (musicLoopTimeout) {
      clearTimeout(musicLoopTimeout);
      musicLoopTimeout = null;
    }
  }

  function toggleMusicBoxHandler() {
    initAudioContext();
    if (state.musicPlaying) {
      stopMusicBox();
      showToast('Music box paused ⏸️', '🎵');
    } else {
      startMusicBox();
    }
  }

  function soundToggleHandler() {
    state.soundEnabled = !state.soundEnabled;
    if (state.soundEnabled) {
      soundIcon.textContent = '🔔';
      soundStatus.textContent = 'ON';
      initAudioContext();
      soundPop();
      showToast('Sound effects turned ON 🎶', '🔔');
    } else {
      soundIcon.textContent = '🔕';
      soundStatus.textContent = 'OFF';
      showToast('Sound muted 🔕', '🤫');
    }
  }

  // ==========================================================================
  // 5. Canvas Confetti & Particle Engine (Vanilla JS, 0 dependencies)
  // ==========================================================================
  const ctx = confettiCanvas.getContext('2d');
  let particles = [];
  let animationFrameId = null;

  function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor(x, y, options = {}) {
      this.x = x;
      this.y = y;
      const angle = (Math.random() * (options.angleSpread || 360)) * (Math.PI / 180);
      const velocity = (options.velocity || 7) + Math.random() * (options.velocitySpread || 8);

      this.vx = Math.cos(angle) * velocity;
      this.vy = -Math.abs(Math.sin(angle) * velocity) - (options.lift || 3);
      this.gravity = 0.28 + Math.random() * 0.15;
      this.drag = 0.98;
      this.color = options.color || CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      this.size = options.size || (8 + Math.random() * 7);
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.shape = options.shape || (Math.random() > 0.35 ? 'rect' : 'circle');
      this.opacity = 1;
      this.decay = 0.008 + Math.random() * 0.008;
    }

    update() {
      this.vx *= this.drag;
      this.vy = this.vy * this.drag + this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.opacity -= this.decay;
      return this.opacity > 0 && this.y < confettiCanvas.height + 50;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;

      if (this.shape === 'rect') {
        ctx.fillRect(-this.size / 2, -this.size / 3, this.size, this.size * 0.65);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function fireConfetti({
    count = 60,
    originX = window.innerWidth / 2,
    originY = window.innerHeight * 0.45,
    velocity = 7,
    velocitySpread = 8
  } = {}) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Particle(originX, originY, {
        velocity,
        velocitySpread,
        angleSpread: 360,
        lift: 4
      }));
    }

    if (!animationFrameId) {
      renderParticles();
    }
  }

  function renderParticles() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    particles = particles.filter(p => p.update());

    for (let i = 0; i < particles.length; i++) {
      particles[i].draw(ctx);
    }

    if (particles.length > 0) {
      animationFrameId = requestAnimationFrame(renderParticles);
    } else {
      animationFrameId = null;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // ==========================================================================
  // 6. Toast Notification Helper
  // ==========================================================================
  function showToast(message, icon = '✨', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');

    const iconSpan = document.createElement('span');
    iconSpan.className = 'toast-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.textContent = icon;

    const textSpan = document.createElement('span');
    textSpan.className = 'toast-text';
    textSpan.textContent = message;

    toast.appendChild(iconSpan);
    toast.appendChild(textSpan);
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-leave');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // ==========================================================================
  // 7. Feature 3: Interactive Puppy Petting Engine
  // ==========================================================================
  function spawnPetHeart(e) {
    const heart = document.createElement('span');
    heart.className = 'floating-pet-heart';
    const symbols = ['❤️', '🐾', '✨', '🦴', '🌸'];
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.35;
    if (e && e.clientX && e.clientY) {
      x = e.clientX;
      y = e.clientY;
    } else if (puppyPetZone) {
      const rect = puppyPetZone.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height * 0.4;
    }

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 1200);
  }

  function petThePuppy(e) {
    initAudioContext();
    state.petCount++;
    petCountDisplay.textContent = `Pets: ${state.petCount}`;

    // Accelerated tail wag
    if (puppyTailElem) {
      puppyTailElem.classList.add('wag-fast');
      if (tailFastTimeout) clearTimeout(tailFastTimeout);
      tailFastTimeout = setTimeout(() => {
        puppyTailElem.classList.remove('wag-fast');
      }, 1600);
    }

    // Play soft cheerful high chirp
    playTone(620 + Math.random() * 180, 'sine', 0.12, 0.1);

    // Spawn floating emoji
    spawnPetHeart(e);

    // Dynamic milestones
    if (state.petCount === 1) {
      petStatusMsg.textContent = 'Puppy says thank you! 🐶';
      showToast('The puppy loves headpats! 🐾', '🐶');
    } else if (state.petCount === 3) {
      petStatusMsg.textContent = 'Tail wagging at 200% speed! ⚡';
      showToast('Tail wag overdrive! 💨', '⚡');
    } else if (state.petCount === 6) {
      petStatusMsg.textContent = 'Happiness overload! ❤️🐶';
      showToast('Chief Happiness Officer is overjoyed! ❤️', '🐾');
    } else if (state.petCount === 10) {
      petStatusMsg.textContent = 'Achievement: Puppy Whisperer 🏆';
      showToast('Achievement Unlocked: Puppy Whisperer 🏆🐾', '🎉');
      fireConfetti({ count: 35, originX: window.innerWidth / 2, originY: window.innerHeight * 0.4 });
    } else if (state.petCount > 10) {
      petStatusMsg.textContent = `Infinite cuddles (${state.petCount})! ✨`;
    }
  }

  puppyPetZone.addEventListener('click', petThePuppy);
  puppyPetZone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      petThePuppy(e);
    }
  });

  // ==========================================================================
  // 8. Navigation & Screen Flow Engine (4 Steps)
  // ==========================================================================
  function updateProgressBar(screenKey) {
    if (screenKey === 'welcome') {
      progressBar.style.display = 'none';
      return;
    }

    progressBar.style.display = 'flex';

    // Reset steps
    Object.keys(stepDots).forEach(num => {
      stepDots[num].classList.remove('active', 'completed');
    });
    connectors[1].classList.remove('filled');
    connectors[2].classList.remove('filled');
    connectors[3].classList.remove('filled');

    if (screenKey === 'assistant') {
      stepDots[1].classList.add('active');
    } else if (screenKey === 'notifications') {
      stepDots[1].classList.add('completed');
      stepDots[2].classList.add('active');
      connectors[1].classList.add('filled');
    } else if (screenKey === 'candle') {
      stepDots[1].classList.add('completed');
      stepDots[2].classList.add('completed');
      stepDots[3].classList.add('active');
      connectors[1].classList.add('filled');
      connectors[2].classList.add('filled');
    } else if (screenKey === 'letter') {
      stepDots[1].classList.add('completed');
      stepDots[2].classList.add('completed');
      stepDots[3].classList.add('completed');
      stepDots[4].classList.add('active');
      connectors[1].classList.add('filled');
      connectors[2].classList.add('filled');
      connectors[3].classList.add('filled');
    }
  }

  function goToScreen(targetScreenKey) {
    const currentEl = screens[state.currentScreen];
    const targetEl = screens[targetScreenKey];

    if (!targetEl || targetScreenKey === state.currentScreen) return;

    // Fade out current screen
    currentEl.style.opacity = '0';
    currentEl.style.transform = 'translateY(-14px)';

    setTimeout(() => {
      currentEl.classList.remove('active');
      currentEl.style.display = 'none';

      // Prepare target screen
      targetEl.style.display = 'block';
      // Force reflow
      void targetEl.offsetHeight;

      targetEl.classList.add('active');
      targetEl.style.opacity = '1';
      targetEl.style.transform = 'translateY(0)';

      state.currentScreen = targetScreenKey;
      updateProgressBar(targetScreenKey);

      // Smooth scroll target card into view
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 280);
  }

  // ==========================================================================
  // 9. Event Handlers: Welcome & Mission 1 (Assistant Selector)
  // ==========================================================================
  btnStartMission.addEventListener('click', () => {
    initAudioContext();
    soundCelebration();
    fireConfetti({
      count: 70,
      originX: window.innerWidth / 2,
      originY: window.innerHeight * 0.4
    });
    showToast('Birthday mission activated! 🐾', '🎉');
    goToScreen('assistant');
  });

  function selectAssistant(assistantKey) {
    const data = ASSISTANT_DATA[assistantKey];
    if (!data) return;

    state.selectedAssistant = assistantKey;

    // Update Card UI
    assistantCards.forEach(card => {
      const isSelected = card.getAttribute('data-assistant') === assistantKey;
      card.classList.toggle('selected', isSelected);
      card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
    });

    // Populate feedback box
    feedbackIcon.textContent = data.icon;
    feedbackTitle.textContent = data.title;
    feedbackText.textContent = data.response;

    assistantFeedback.style.display = 'block';
    assistantActionWrap.style.display = 'flex';

    // Play sound & micro-burst
    soundPop();
    const activeCard = document.getElementById(`card-${assistantKey}`);
    const rect = activeCard ? activeCard.getBoundingClientRect() : null;
    fireConfetti({
      count: 24,
      originX: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
      originY: rect ? rect.top + rect.height / 2 : window.innerHeight * 0.5,
      velocity: 5
    });

    showToast(data.toast, data.icon);
  }

  assistantCards.forEach(card => {
    card.addEventListener('click', () => {
      initAudioContext();
      const assistantKey = card.getAttribute('data-assistant');
      selectAssistant(assistantKey);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        initAudioContext();
        const assistantKey = card.getAttribute('data-assistant');
        selectAssistant(assistantKey);
      }
    });
  });

  btnNextToNotifications.addEventListener('click', () => {
    initAudioContext();
    soundChime();
    goToScreen('notifications');
  });

  // ==========================================================================
  // 10. Event Handlers: Mission 2 -> Mission 3 (Candle Wish)
  // ==========================================================================
  btnToCandle.addEventListener('click', () => {
    initAudioContext();
    soundChime();
    goToScreen('candle');
  });

  // ==========================================================================
  // 11. Feature 1: Candle Blowout Ceremony
  // ==========================================================================
  function blowOutCandle() {
    if (state.candleBlown) return;
    state.candleBlown = true;
    initAudioContext();

    // Extinguish Flame visually
    if (candleFlameGroup) candleFlameGroup.classList.add('blown-out');
    if (flameHalo) flameHalo.classList.add('blown-out');
    if (candleSmoke) candleSmoke.classList.add('puff');

    soundBlowCandle();

    // Confetti shower
    fireConfetti({
      count: 85,
      originX: window.innerWidth / 2,
      originY: window.innerHeight * 0.45,
      velocity: 8
    });

    // Update instruction text & swap buttons
    wishInstructionText.textContent = '✨ Wish safely registered with the cosmos! Now, unlock your birthday note...';
    blowActionWrap.style.display = 'none';
    candleNextWrap.style.display = 'flex';

    showToast('Wish registered! ✨ Happy Birthday!', '🎂');
  }

  cakeContainer.addEventListener('click', blowOutCandle);
  cakeContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      blowOutCandle();
    }
  });
  btnBlowCandle.addEventListener('click', blowOutCandle);

  btnUnlockLetter.addEventListener('click', () => {
    initAudioContext();
    soundCelebration();
    goToScreen('letter');

    // Trigger grand celebratory confetti when the letter unlocks!
    setTimeout(() => {
      fireConfetti({
        count: 95,
        originX: window.innerWidth / 2,
        originY: window.innerHeight * 0.35,
        velocity: 8,
        velocitySpread: 10
      });
      showToast('Birthday note unlocked! 💌', '🎂');
    }, 350);
  });

  // ==========================================================================
  // 12. Event Handlers: Final Mission (Letter & Digital Treat Voucher)
  // ==========================================================================
  btnRevealVoucher.addEventListener('click', () => {
    if (state.voucherRevealed) return;

    initAudioContext();
    state.voucherRevealed = true;

    // Show voucher container
    voucherContainer.style.display = 'block';

    // Hide or disable trigger button per requirement:
    // "The button should reveal the voucher only once per visit and then become hidden or disabled."
    voucherTriggerSection.style.display = 'none';

    soundCelebration();
    fireConfetti({
      count: 75,
      originX: window.innerWidth / 2,
      originY: window.innerHeight * 0.6,
      velocity: 7
    });

    showToast('Treat voucher unlocked! 🍰', '🦴');

    setTimeout(() => {
      voucherContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  });

  // ==========================================================================
  // 13. Event Handlers: Replay Mission (Complete Clean State Reset)
  // ==========================================================================
  btnReplay.addEventListener('click', () => {
    initAudioContext();
    soundChime();

    // Reset application states
    state.selectedAssistant = null;
    state.voucherRevealed = false;
    state.candleBlown = false;

    // Reset Assistant Cards
    assistantCards.forEach(card => {
      card.classList.remove('selected');
      card.setAttribute('aria-checked', 'false');
    });
    assistantFeedback.style.display = 'none';
    assistantActionWrap.style.display = 'none';

    // Reset Candle screen
    if (candleFlameGroup) candleFlameGroup.classList.remove('blown-out');
    if (flameHalo) flameHalo.classList.remove('blown-out');
    if (candleSmoke) candleSmoke.classList.remove('puff');
    wishInstructionText.textContent = 'Tap the cake or button below to blow out your candle!';
    blowActionWrap.style.display = 'flex';
    candleNextWrap.style.display = 'none';

    // Reset Voucher
    voucherContainer.style.display = 'none';
    voucherTriggerSection.style.display = 'flex';
    btnRevealVoucher.removeAttribute('disabled');

    // Navigate smoothly back to Mission 1 (First Mission)
    goToScreen('assistant');

    showToast('Mission reset! Ready for round 2? 🐾', '↻');
  });

  // Sound and Music toggle listeners
  soundToggleBtn.addEventListener('click', soundToggleHandler);
  musicToggleBtn.addEventListener('click', toggleMusicBoxHandler);

  // Initialize accessibility keyboard navigation on start button
  btnStartMission.focus();

})();

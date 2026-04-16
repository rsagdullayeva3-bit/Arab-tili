// ============================================
// ArabLearn – app.js
// Asosiy dastur mantiq fayli
// ============================================

// ─── Global State ───
const STATE = {
    learnedLetters: [],
    totalPoints: 0,
    quizBestScore: 0,
    wordsViewed: 0,
    currentQuizIdx: 0,
    currentQuizScore: 0,
    quizQuestions: [],
    audioEnabled: true,
    currentFilter: 'all',
    currentDictCategory: 'Barchasi',
};

// ─── LocalStorage ───
function saveState() {
    localStorage.setItem('arablearn_state', JSON.stringify({
        learnedLetters: STATE.learnedLetters,
        totalPoints: STATE.totalPoints,
        quizBestScore: STATE.quizBestScore,
        wordsViewed: STATE.wordsViewed,
    }));
}

function loadState() {
    const saved = localStorage.getItem('arablearn_state');
    if (saved) {
        const data = JSON.parse(saved);
        STATE.learnedLetters = data.learnedLetters || [];
        STATE.totalPoints = data.totalPoints || 0;
        STATE.quizBestScore = data.quizBestScore || 0;
        STATE.wordsViewed = data.wordsViewed || 0;
    }
}

// ─── Toast ───
function showToast(msg, type = 'info', duration = 3000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// ─── Speech Synthesis ───
window._speechUtterances = [];
if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices(); // Ovozlar oldindan yuklanishi uchun
}

function speak(text, lang = 'ar-SA') {
    if (!STATE.audioEnabled) {
        showToast("Ovoz o'chirilgan! Ekranning pastki qismidagi 🔇 tugmani bosing", "info", 3000);
        return;
    }
    
    // Eng ishonchli Google TTS API Endpointi
    const audioLang = lang.includes('ar') ? 'ar' : lang;
    const url = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${audioLang}&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(err => {
            console.warn("Google TTS ishlamadi, brauzer ovoziga o'tilmoqda:", err);
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                setTimeout(() => {
                    const utt = new SpeechSynthesisUtterance(text);
                    utt.lang = lang;
                    utt.rate = 0.8;
                    utt.pitch = 1;
                    
                    window._speechUtterances.push(utt);
                    utt.onend = () => {
                        const index = window._speechUtterances.indexOf(utt);
                        if (index > -1) window._speechUtterances.splice(index, 1);
                    };
                    utt.onerror = () => {
                        const index = window._speechUtterances.indexOf(utt);
                        if (index > -1) window._speechUtterances.splice(index, 1);
                    };
                    window.speechSynthesis.speak(utt);
                }, 50);
            }
        });
    }
}

// ─── Navbar ───
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        updateActiveNav();
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.id;
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}

// ─── Particle Aniamtion ───
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const symbols = ['ب', 'ك', 'ا', 'ه', 'و', 'ي', 'م', 'ن', 'س', 'ع', '★', '◆'];
    const count = window.innerWidth < 768 ? 12 : 22;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 24 + 10;
        const isArabic = Math.random() > 0.4;
        p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      font-size: ${size}px;
      font-family: 'Amiri', serif;
      color: ${isArabic ? 'rgba(212,175,55,0.3)' : 'rgba(108,63,232,0.25)'};
      background: transparent;
      border-radius: 0;
      animation-duration: ${Math.random() * 15 + 12}s;
      animation-delay: ${Math.random() * -15}s;
    `;
        if (isArabic) {
            p.style.width = 'auto';
            p.style.height = 'auto';
            p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        } else {
            p.style.background = Math.random() > 0.5 ? 'rgba(108,63,232,0.15)' : 'rgba(212,175,55,0.1)';
        }
        container.appendChild(p);
    }
}

// ─── Hero Letter Rotator ───
function initHeroRotator() {
    const letterEl = document.getElementById('floatLetter');
    if (!letterEl) return;

    let idx = 0;
    setInterval(() => {
        letterEl.style.opacity = '0';
        letterEl.style.transform = 'scale(0.8)';
        setTimeout(() => {
            idx = (idx + 1) % ALPHABET.length;
            const letter = ALPHABET[idx];
            letterEl.textContent = letter.arabic;

            const nameEl = letterEl.nextElementSibling?.querySelector('.float-name');
            const soundEl = letterEl.nextElementSibling?.querySelector('.float-sound');
            if (nameEl) nameEl.textContent = letter.name;
            if (soundEl) soundEl.textContent = `/${letter.sound}/ tovushi`;

            letterEl.style.opacity = '1';
            letterEl.style.transform = 'scale(1)';
        }, 300);
    }, 2500);

    letterEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// ─── Counter Animation ───
function animateCounter(el, target) {
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / 60));
    let current = 0;
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
    }, duration / (target / step));
}

function initCounters() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = document.querySelector('.hero-stats');
                if (!el) return;
                document.querySelectorAll('.stat-num').forEach(num => {
                    animateCounter(num, parseInt(num.dataset.target));
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const statsEl = document.querySelector('.hero-stats');
    if (statsEl) observer.observe(statsEl);
}

// ─── Scroll Reveal ───
function initScrollReveal() {
    const els = document.querySelectorAll('.letter-card, .dict-card, .prog-card, .achieve-item');
    els.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
}

// ─── Alphabet Section ───
function renderAlphabet(filter = 'all') {
    const grid = document.getElementById('alphabetGrid');
    if (!grid) return;

    const letters = filter === 'all' ? ALPHABET : ALPHABET.filter(l => l.type === filter);
    grid.innerHTML = '';

    letters.forEach((letter, i) => {
        const isLearned = STATE.learnedLetters.includes(letter.id);
        const card = document.createElement('div');
        card.className = `letter-card ${isLearned ? 'learned' : ''}`;
        card.id = `letter-card-${letter.id}`;
        card.innerHTML = `
      <div class="letter-badge">✓</div>
      <span class="letter-arabic">${letter.arabic}</span>
      <div class="letter-name">${letter.name}</div>
      <div class="letter-transliteration">${letter.transliteration}</div>
    `;

        card.addEventListener('click', () => {
            speak(letter.arabic);
            // Mark as learned
            if (!STATE.learnedLetters.includes(letter.id)) {
                STATE.learnedLetters.push(letter.id);
                card.classList.add('learned');
                STATE.totalPoints += 2;
                saveState();
                updateProgress();
                showToast(`✅ "${letter.name}" harfi o'rganildi! +2 ball`, 'success');
                checkAchievements();
            }
            // Flash animation
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.transform = '', 150);
        });

        setTimeout(() => grid.appendChild(card), i * 30);
    });

    setTimeout(initScrollReveal, 100);
}

function initAlphabetFilter() {
    const tabs = document.querySelectorAll('#alphabetFilter .tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderAlphabet(tab.dataset.filter);
        });
    });
}



// ─── Quiz Section ───
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initQuiz() {
    STATE.quizQuestions = shuffleArray(QUIZ_QUESTIONS).slice(0, 10);
    STATE.currentQuizIdx = 0;
    STATE.currentQuizScore = 0;

    document.getElementById('quizCard').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizPoints').textContent = '0';

    renderQuizQuestion();
}

function renderQuizQuestion() {
    const q = STATE.quizQuestions[STATE.currentQuizIdx];
    if (!q) {
        showQuizResult();
        return;
    }

    const total = STATE.quizQuestions.length;
    const pct = (STATE.currentQuizIdx / total) * 100;

    document.getElementById('quizProgress').style.width = `${pct}%`;
    document.getElementById('quizProgressText').textContent = `${STATE.currentQuizIdx} / ${total}`;
    document.getElementById('quizCategory').textContent = q.category;

    const questionEl = document.getElementById('quizQuestion');
    if (q.qArabic) {
        questionEl.innerHTML = `
      <span class="quiz-q-arabic" onclick="speak(this.getAttribute('data-arabic'))" data-arabic="${q.qArabic}" style="cursor:pointer">${q.qArabic}</span>
      <span style="font-size:15px;color:var(--text2)">${q.q}</span>
    `;
    } else {
        questionEl.innerHTML = `<span>${q.q}</span>`;
    }

    const optionsEl = document.getElementById('quizOptions');
    optionsEl.innerHTML = '';

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.id = `quiz-opt-${i}`;

        // If looks Arabic
        const isArabicOpt = /[\u0600-\u06FF]/.test(opt);
        if (isArabicOpt) {
            btn.innerHTML = `<span style="font-family:'Amiri',serif;font-size:28px;direction:rtl">${opt}</span>`;
        } else {
            btn.textContent = opt;
        }

        btn.addEventListener('click', () => handleAnswer(i, q));
        optionsEl.appendChild(btn);
    });
}

function handleAnswer(selected, q) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(o => o.classList.add('disabled'));

    const correct = q.answer;
    options[correct].classList.add('correct');

    if (selected === correct) {
        STATE.currentQuizScore++;
        STATE.totalPoints += 10;
        saveState();
        document.getElementById('quizPoints').textContent = STATE.currentQuizScore * 10;
        showToast('✅ To\'g\'ri javob! +10 ball', 'success', 1500);
    } else {
        options[selected].classList.add('wrong');
        showToast('❌ Noto\'g\'ri! Qayta urinib ko\'ring', 'info', 1500);
    }

    setTimeout(() => {
        STATE.currentQuizIdx++;
        if (STATE.currentQuizIdx >= STATE.quizQuestions.length) {
            showQuizResult();
        } else {
            renderQuizQuestion();
        }
    }, 1200);
}

function showQuizResult() {
    const total = STATE.quizQuestions.length;
    const score = STATE.currentQuizScore;
    const pct = Math.round((score / total) * 100);

    document.getElementById('quizCard').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('quizProgress').style.width = '100%';
    document.getElementById('quizProgressText').textContent = `${total} / ${total}`;

    let stars = '⭐';
    let title = '';
    let desc = '';

    if (pct >= 90) { stars = '⭐⭐⭐'; title = 'Ajoyib!'; desc = `Siz ${score}/${total} ta to'g'ri javob berdingiz. Zo'r natija!`; }
    else if (pct >= 70) { stars = '⭐⭐'; title = 'Yaxshi!'; desc = `Siz ${score}/${total} ta to'g'ri javob berdingiz. Yanada yaxshilanib boring!`; }
    else { stars = '⭐'; title = 'Harakat qiling!'; desc = `Siz ${score}/${total} ta to'g'ri javob berdingiz. Ko'proq mashq qiling!`; }

    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultDesc').textContent = desc;
    document.getElementById('resultStars').textContent = stars;

    if (pct > STATE.quizBestScore) {
        STATE.quizBestScore = pct;
        saveState();
        checkAchievements();
    }

    updateProgress();
    showToast(`🏆 Test tugadi: ${score}/${total} – ${pct}%`, 'gold', 5000);
}

function initQuizRestart() {
    document.getElementById('restartQuiz').addEventListener('click', initQuiz);
}

// ─── Dictionary ───
const DICT_CATEGORIES = ['Barchasi', ...new Set(WORDS.map(w => w.category))];

function renderDictCategories() {
    const el = document.getElementById('dictCategories');
    if (!el) return;

    el.innerHTML = DICT_CATEGORIES.map(cat => `
    <button class="tab-btn ${cat === 'Barchasi' ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');

    el.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            el.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            STATE.currentDictCategory = btn.dataset.cat;
            renderDict();
        });
    });
}

function renderDict(search = '') {
    const grid = document.getElementById('dictGrid');
    if (!grid) return;

    let words = WORDS;
    if (STATE.currentDictCategory !== 'Barchasi') {
        words = words.filter(w => w.category === STATE.currentDictCategory);
    }
    if (search) {
        const s = search.toLowerCase();
        words = words.filter(w =>
            w.uz.toLowerCase().includes(s) ||
            w.arabic.includes(s) ||
            w.trans.toLowerCase().includes(s)
        );
    }

    grid.innerHTML = words.map((w, i) => `
    <div class="dict-card" onclick="handleWordClick(this.getAttribute('data-arabic'), this.getAttribute('data-uz'))" data-arabic="${w.arabic}" data-uz="${w.uz}" id="dict-${i}">
      <div class="dict-info">
        <div class="dict-uz">${w.icon} ${w.uz}</div>
        <div class="dict-transcription">${w.trans}</div>
      </div>
      <div class="dict-arabic">${w.arabic}</div>
      <div class="dict-speak">🔊</div>
    </div>
  `).join('');

    if (words.length === 0) {
        grid.innerHTML = `<div style="text-align:center;color:var(--text3);padding:40px;grid-column:1/-1">
      🔍 Hech narsa topilmadi
    </div>`;
    }

    setTimeout(initScrollReveal, 50);
}

function handleWordClick(arabic, uz) {
    speak(arabic);
    STATE.wordsViewed++;
    saveState();
    showToast(`🔊 "${uz}" – arabcha: ${arabic}`, 'info', 2500);
    checkAchievements();
}

function initDictSearch() {
    const input = document.getElementById('dictSearch');
    if (!input) return;
    let timeout;
    input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => renderDict(input.value.trim()), 300);
    });
}

// ─── Progress Dashboard ───
function updateProgress() {
    const learnedCount = STATE.learnedLetters.length;
    const totalPts = STATE.totalPoints;
    const quizPct = STATE.quizBestScore;

    // Text values
    const el = (id) => document.getElementById(id);
    if (el('learnedLetters')) el('learnedLetters').textContent = learnedCount;
    if (el('totalPoints')) el('totalPoints').textContent = totalPts;
    if (el('quizScore')) el('quizScore').textContent = `${quizPct}%`;

    // Circle progress bars
    const letterPct = Math.min((learnedCount / ALPHABET.length) * 100, 100);
    const ptsPct = Math.min((totalPts / 500) * 100, 100);

    setCircleProgress('letterBar', letterPct);
    setCircleProgress('pointBar', ptsPct);
    setCircleProgress('quizBar', quizPct);
}

function setCircleProgress(id, pct) {
    const wrap = document.getElementById(id)?.parentElement;
    if (!wrap) return;
    const color = pct >= 80 ? '#10B981' : pct >= 50 ? '#F59E0B' : '#6C3FE8';
    wrap.style.background = `conic-gradient(${color} ${pct * 3.6}deg, var(--surface2) 0deg)`;
}

// ─── Achievements ───
function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    const s = {
        learnedLetters: STATE.learnedLetters.length,
        totalPoints: STATE.totalPoints,
        quizBestScore: STATE.quizBestScore,
        wordsViewed: STATE.wordsViewed,
    };

    grid.innerHTML = ACHIEVEMENTS.map(a => {
        const unlocked = a.condition(s);
        return `
      <div class="achieve-item ${unlocked ? 'unlocked' : ''}" title="${a.desc}">
        <div class="achieve-icon">${unlocked ? a.icon : '🔒'}</div>
        <div class="achieve-info">
          <div class="achieve-name">${a.name}</div>
          <div class="achieve-desc">${a.desc}</div>
        </div>
      </div>
    `;
    }).join('');

    setTimeout(initScrollReveal, 50);
}

function checkAchievements() {
    const s = {
        learnedLetters: STATE.learnedLetters.length,
        totalPoints: STATE.totalPoints,
        quizBestScore: STATE.quizBestScore,
        wordsViewed: STATE.wordsViewed,
    };

    ACHIEVEMENTS.forEach(a => {
        const key = `achieve_notified_${a.id}`;
        if (a.condition(s) && !localStorage.getItem(key)) {
            localStorage.setItem(key, '1');
            setTimeout(() => showToast(`🏅 Yangi yutuq: "${a.name}"!`, 'gold', 5000), 600);
            renderAchievements();
        }
    });
}

// ─── Audio FAB ───
function initAudioFab() {
    const fab = document.getElementById('audioFab');
    if (!fab) return;

    fab.addEventListener('click', () => {
        STATE.audioEnabled = !STATE.audioEnabled;
        fab.textContent = STATE.audioEnabled ? '🔊' : '🔇';
        showToast(STATE.audioEnabled ? '🔊 Ovoz yoqildi' : '🔇 Ovoz o\'chirildi', 'info', 1500);
    });
}

// ─── Hero Arabic Ayat Rotator ───
const HERO_TEXTS = [
    { arabic: 'بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ', uz: 'Alloh nomi bilan, Mehribon va Rahmdil' },
    { arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ', uz: 'Rabbingiz nomi bilan o\'qi' },
    { arabic: 'الْعِلْمُ نُورٌ', uz: 'Ilm – nur' },
    { arabic: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ', uz: 'Ilm izlash – farzdir' },
];

function initHeroTextRotator() {
    const arabicEl = document.getElementById('heroArabic');
    if (!arabicEl) return;
    const transEl = arabicEl.nextElementSibling;
    let idx = 0;

    setInterval(() => {
        arabicEl.style.opacity = '0';
        transEl.style.opacity = '0';

        setTimeout(() => {
            idx = (idx + 1) % HERO_TEXTS.length;
            arabicEl.textContent = HERO_TEXTS[idx].arabic;
            transEl.textContent = HERO_TEXTS[idx].uz;
            arabicEl.style.opacity = '1';
            transEl.style.opacity = '1';
        }, 500);
    }, 4000);

    arabicEl.style.transition = 'opacity 0.5s ease';
    transEl.style.transition = 'opacity 0.5s ease';
}

// ─── Smooth Section Transitions ───
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section, .section-dark');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05 });

    sections.forEach(sec => {
        sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(sec);
    });
}

// ─── Keyboard Shortcut: press 'q' to focus quiz ───
function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (e.target.tagName === 'INPUT') return;
        if (e.key === 'q' || e.key === 'Q') {
            document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
        }
        if (e.key === 'a' || e.key === 'A') {
            document.getElementById('alphabet')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ─── Signup Modal ───
function initSignupModal() {
    const btn = document.getElementById('openSignupBtn');
    const overlay = document.getElementById('signupModal');
    const closeBtn = document.getElementById('signupModalClose');
    const form = document.getElementById('signupForm');

    if (!btn || !overlay || !closeBtn || !form) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    const closeSignup = () => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeSignup);
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeSignup();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        showToast(`Muvaffaqiyatli ro'yxatdan o'tdingiz, ${name}!`, 'success', 3000);
        closeSignup();
        form.reset();
        
        btn.textContent = name;
        btn.classList.remove('nav-btn-signup');
        btn.style.background = 'transparent';
        btn.style.boxShadow = 'none';
        btn.style.color = 'var(--text)';
        btn.disabled = true;
    });
}

// ─── Main Init ───
document.addEventListener('DOMContentLoaded', () => {
    loadState();

    // Core UI
    initNavbar();
    initParticles();
    initHeroRotator();
    initHeroTextRotator();
    initCounters();
    initSectionAnimations();

    // Sections
    renderAlphabet();
    initAlphabetFilter();



    // Quiz
    initQuiz();
    initQuizRestart();

    // Dictionary
    renderDictCategories();
    renderDict();
    initDictSearch();

    // Progress
    updateProgress();
    renderAchievements();

    // Misc
    initAudioFab();
    initKeyboardShortcuts();
    initSignupModal();

    // Welcome toast
    setTimeout(() => {
        const name = STATE.learnedLetters.length > 0
            ? `Xush kelibsiz! Siz ${STATE.learnedLetters.length} ta harf o'rgandingiz 🎓`
            : 'ArabLearn\'ga xush kelibsiz! 🕌 O\'rganishni boshlang!';
        showToast(name, 'gold', 4000);
    }, 1500);
});


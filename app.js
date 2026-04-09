// ============================================
// ArabLearn – app.js
// Asosiy dastur mantiq fayli
// ============================================

// ─── Global State ───
const STATE = {
    completedLessons: [],
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
        completedLessons: STATE.completedLessons,
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
        STATE.completedLessons = data.completedLessons || [];
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
function speak(text, lang = 'ar-SA') {
    if (!STATE.audioEnabled) return;
    
    const audioLang = lang.includes('ar') ? 'ar' : lang;
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${audioLang}&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    
    audio.play().catch(err => {
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
    const els = document.querySelectorAll('.letter-card, .lesson-card, .dict-card, .prog-card, .achieve-item');
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

// ─── Lessons Section ───
function renderLessons() {
    const grid = document.getElementById('lessonsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    LESSONS.forEach((lesson, i) => {
        const isDone = STATE.completedLessons.includes(lesson.id);
        const card = document.createElement('div');
        card.className = `lesson-card ${isDone ? 'completed' : ''}`;
        card.id = `lesson-card-${lesson.id}`;
        card.innerHTML = `
      <span class="lesson-icon">${lesson.icon}</span>
      <span class="lesson-level level-${lesson.level}">${lesson.levelText}</span>
      <h3 class="lesson-title">${lesson.title}</h3>
      <p class="lesson-desc">${lesson.desc}</p>
      <div class="lesson-footer">
        <span class="lesson-duration">⏱ ${lesson.duration}</span>
        <span class="lesson-status">${isDone ? '✅' : '▶️'}</span>
      </div>
    `;

        card.addEventListener('click', () => openLesson(lesson));
        setTimeout(() => grid.appendChild(card), i * 60);
    });

    setTimeout(initScrollReveal, 200);
}

// ─── Lesson Modal ───
function openLesson(lesson) {
    const overlay = document.getElementById('lessonModal');
    const content = document.getElementById('modalContent');
    const isDone = STATE.completedLessons.includes(lesson.id);

    const vocabHTML = lesson.content.vocabulary.map(v => `
    <div class="vocab-item" onclick="speak(this.getAttribute('data-arabic'))" data-arabic="${v.arabic}">
      <div class="vocab-arabic">${v.arabic}</div>
      <div class="vocab-info">
        <div class="vocab-uz">${v.uz}</div>
        <div class="vocab-trans">${v.trans}</div>
      </div>
      <span style="font-size:18px">🔊</span>
    </div>
  `).join('');

    const examplesHTML = lesson.content.examples.map(ex => `
    <div class="arabic-example" onclick="speak(this.getAttribute('data-arabic'))" data-arabic="${ex.arabic}">
      <span class="ex-arabic">${ex.arabic}</span>
      <span class="ex-trans">${ex.trans}</span>
    </div>
  `).join('');

    content.innerHTML = `
    <div class="modal-lesson-header">
      <span class="modal-lesson-icon">${lesson.icon}</span>
      <h2 class="modal-lesson-title">${lesson.title}</h2>
      <p class="modal-lesson-subtitle">${lesson.section} · ${lesson.duration}</p>
    </div>
    <div class="lesson-content-body">
      <p>${lesson.content.intro}</p>
      <h4>📝 Namuna gaplar:</h4>
      ${examplesHTML}
    </div>
    <div class="lesson-vocabulary">
      <div class="vocab-title">📖 Yangi so'zlar (bosing va tinglang)</div>
      <div class="vocab-grid">${vocabHTML}</div>
    </div>
    ${!isDone ? `
      <button class="btn btn-primary modal-complete-btn" id="completeBtn">
        ✅ Darsni Tugatdim (+15 ball)
      </button>
    ` : `
      <div style="text-align:center;margin-top:24px;color:var(--success);font-weight:700;font-size:16px">
        ✅ Bu dars allaqachon tugatilgan!
      </div>
    `}
  `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    const completeBtn = document.getElementById('completeBtn');
    if (completeBtn) {
        completeBtn.addEventListener('click', () => completeLesson(lesson.id));
    }
}

function completeLesson(lessonId) {
    if (!STATE.completedLessons.includes(lessonId)) {
        STATE.completedLessons.push(lessonId);
        STATE.totalPoints += 15;
        saveState();
        updateProgress();
        renderLessons();
        showToast('🎉 Dars muvaffaqiyatli tugatildi! +15 ball', 'gold', 4000);
        checkAchievements();
    }
    closeModal();
}

function closeModal() {
    const overlay = document.getElementById('lessonModal');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

function initModal() {
    const overlay = document.getElementById('lessonModal');
    const closeBtn = document.getElementById('modalClose');

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
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
    const completedCount = STATE.completedLessons.length;
    const learnedCount = STATE.learnedLetters.length;
    const totalPts = STATE.totalPoints;
    const quizPct = STATE.quizBestScore;

    // Text values
    const el = (id) => document.getElementById(id);
    if (el('completedLessons')) el('completedLessons').textContent = completedCount;
    if (el('learnedLetters')) el('learnedLetters').textContent = learnedCount;
    if (el('totalPoints')) el('totalPoints').textContent = totalPts;
    if (el('quizScore')) el('quizScore').textContent = `${quizPct}%`;

    // Circle progress bars
    const lessonPct = Math.min((completedCount / LESSONS.length) * 100, 100);
    const letterPct = Math.min((learnedCount / ALPHABET.length) * 100, 100);
    const ptsPct = Math.min((totalPts / 500) * 100, 100);

    setCircleProgress('lessonBar', lessonPct);
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
        completedLessons: STATE.completedLessons.length,
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
        completedLessons: STATE.completedLessons.length,
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

// ─── VIDEO DARSLIKLAR MA'LUMOTLARI (44 ta) ───
const VIDEO_LESSONS = [
  { id:1,  title:"Arab alifbosi – Kirish",                   desc:"Arab alifbosi bilan tanishish. Harflar, yozuv yo'nalishi va tinish belgilari haqida umumiy ma'lumot.",           level:"boshlangich", levelText:"Boshlang'ich", duration:"12:30", section:"Alifbo",         youtubeId:"", views:"1.2K" },
  { id:2,  title:"Alif, Ba, Ta, Sa harflari",                desc:"Dastlabki 4 ta harfning yozilishi, o'qilishi va shakllari bilan tanishamiz.",                                      level:"boshlangich", levelText:"Boshlang'ich", duration:"14:45", section:"Alifbo",         youtubeId:"", views:"980" },
  { id:3,  title:"Jim, Ha, Xa harflari",                     desc:"Jim, Ha va Xa harflarining to'liq o'qilishi va yozilish tartibi.",                                                 level:"boshlangich", levelText:"Boshlang'ich", duration:"13:15", section:"Alifbo",         youtubeId:"", views:"870" },
  { id:4,  title:"Dal, Zal, Ra, Zay harflari",               desc:"O'ngdan chapga yoziladigan va ulashmaydigan harflarni o'rganamiz.",                                                level:"boshlangich", levelText:"Boshlang'ich", duration:"15:00", section:"Alifbo",         youtubeId:"", views:"760" },
  { id:5,  title:"Sin, Shin harflari",                       desc:"Sin va Shin harflarining farqi, shakllari va misol so'zlar bilan mustahkamlash.",                                  level:"boshlangich", levelText:"Boshlang'ich", duration:"11:50", section:"Alifbo",         youtubeId:"", views:"820" },
  { id:6,  title:"Sod, Dod harflari",                        desc:"Og'ir (emphatic) undoshlar: Sod va Dod harflarining talaffuzi va yozilishi.",                                      level:"boshlangich", levelText:"Boshlang'ich", duration:"13:40", section:"Alifbo",         youtubeId:"", views:"690" },
  { id:7,  title:"To, Zo harflari",                          desc:"To va Zo harflari – og'ir undoshlarning ikkinchi juftligi.",                                                       level:"boshlangich", levelText:"Boshlang'ich", duration:"12:20", section:"Alifbo",         youtubeId:"", views:"710" },
  { id:8,  title:"Ayn, G'ayn harflari",                      desc:"Arab tiliga xos bo'lgan Ayn va G'ayn harflarining to'g'ri talaffuzi.",                                             level:"boshlangich", levelText:"Boshlang'ich", duration:"16:10", section:"Alifbo",         youtubeId:"", views:"940" },
  { id:9,  title:"Fa, Qof, Kof harflari",                    desc:"Fa, Qof va Kof harflari – o'xshash va farqli tomonlari bilan o'rganamiz.",                                        level:"boshlangich", levelText:"Boshlang'ich", duration:"14:30", section:"Alifbo",         youtubeId:"", views:"660" },
  { id:10, title:"Lam, Mim, Nun harflari",                   desc:"Eng ko'p uchraydigan harflardan biri – Lam, Mim va Nun.",                                                          level:"boshlangich", levelText:"Boshlang'ich", duration:"13:55", section:"Alifbo",         youtubeId:"", views:"780" },
  { id:11, title:"Ha, Vov, Ya harflari va Hamza",            desc:"Alifboning oxirgi harflari: Ha, Vov, Ya va maxsus belgi Hamza.",                                                   level:"boshlangich", levelText:"Boshlang'ich", duration:"15:25", section:"Alifbo",         youtubeId:"", views:"850" },
  { id:12, title:"Harakat belgilari – Fatha, Kasra, Damma",  desc:"Arab harflarini qanday o'qish kerak? Harakat belgilarini o'rganamiz.",                                            level:"boshlangich", levelText:"Boshlang'ich", duration:"17:00", section:"Harakat",        youtubeId:"", views:"1.5K" },
  { id:13, title:"Sukun va Shadda belgilari",                 desc:"Sukun va Shadda – alifboning muhim qo'shimcha belgilari.",                                                         level:"boshlangich", levelText:"Boshlang'ich", duration:"14:10", section:"Harakat",        youtubeId:"", views:"720" },
  { id:14, title:"Tanvin – un, in, an",                       desc:"Tanvin belgisi nima? Uch xil tanvinning yozilishi va talaffuzi.",                                                  level:"boshlangich", levelText:"Boshlang'ich", duration:"13:00", section:"Harakat",        youtubeId:"", views:"680" },
  { id:15, title:"Madda va Wasla belgilari",                  desc:"Cho'ziq unlilar va Wasla belgisining qo'llanilishi.",                                                              level:"boshlangich", levelText:"Boshlang'ich", duration:"12:45", section:"Harakat",        youtubeId:"", views:"590" },
  { id:16, title:"Salom va tanishish iboralari",              desc:"Arabcha salomlashish, tanishish va xayrlashish iboralari amaliyotda.",                                             level:"boshlangich", levelText:"Boshlang'ich", duration:"18:30", section:"Muloqot",        youtubeId:"", views:"2.1K" },
  { id:17, title:"Raqamlar 1–10",                             desc:"Arabcha raqamlarni o'rganamiz: 1 dan 10 gacha yozilishi va aytilishi.",                                           level:"boshlangich", levelText:"Boshlang'ich", duration:"16:20", section:"Raqamlar",       youtubeId:"", views:"1.8K" },
  { id:18, title:"Raqamlar 11–100",                           desc:"O'n birdan yuz gacha arabcha raqamlar va ularning grammatikasi.",                                                  level:"boshlangich", levelText:"Boshlang'ich", duration:"19:40", section:"Raqamlar",       youtubeId:"", views:"1.3K" },
  { id:19, title:"Oila a'zolari so'zlari",                    desc:"Ota, ona, aka, singil va boshqa oila a'zolarining arabcha nomlari.",                                              level:"boshlangich", levelText:"Boshlang'ich", duration:"15:50", section:"Lug'at",         youtubeId:"", views:"1.1K" },
  { id:20, title:"Ranglar arabcha",                           desc:"12 ta asosiy rang nomlarini arabchada o'rganamiz va gaplarda qo'llaymiz.",                                        level:"boshlangich", levelText:"Boshlang'ich", duration:"14:00", section:"Lug'at",         youtubeId:"", views:"960" },
  { id:21, title:"Kunlar va oylar",                           desc:"Haftaning 7 kuni va yilning 12 oyi arabchada – to'liq o'rganish.",                                               level:"orta",        levelText:"O'rta",        duration:"20:15", section:"Vaqt",           youtubeId:"", views:"1.4K" },
  { id:22, title:"Soat va vaqt ifodalash",                    desc:"Arabchada soat qanday so'raladi va aytiladi? Amaliy mashqlar bilan.",                                             level:"orta",        levelText:"O'rta",        duration:"18:45", section:"Vaqt",           youtubeId:"", views:"1.2K" },
  { id:23, title:"Fe'llar – O'tgan zamon",                    desc:"Arab tilidagi asosiy fe'l shakli: o'tgan zamon qurilishi va namunalar.",                                           level:"orta",        levelText:"O'rta",        duration:"22:30", section:"Grammatika",     youtubeId:"", views:"1.6K" },
  { id:24, title:"Fe'llar – Hozirgi/Kelajak zamon",           desc:"Mudar'i (hozirgi/kelajak) zamon fe'l shakllari va qo'llanish qoidalari.",                                        level:"orta",        levelText:"O'rta",        duration:"24:00", section:"Grammatika",     youtubeId:"", views:"1.7K" },
  { id:25, title:"Otlar – Muzakkar va Mu'annas",               desc:"Arab tilida erkak va ayol jinsidagi otlar – qanday farqlanadi?",                                                  level:"orta",        levelText:"O'rta",        duration:"19:20", section:"Grammatika",     youtubeId:"", views:"1.3K" },
  { id:26, title:"Ko'plik shakllari",                          desc:"Arab tilida ko'plik (jam') – tartibli va tartibsiz ko'plik shakllari.",                                           level:"orta",        levelText:"O'rta",        duration:"21:50", section:"Grammatika",     youtubeId:"", views:"1.1K" },
  { id:27, title:"Al- artiklining qoidalari",                  desc:"Muayyanlik artikli 'al-' va shamsiy/qamariy harflardagi o'zgarishlar.",                                           level:"orta",        levelText:"O'rta",        duration:"17:35", section:"Grammatika",     youtubeId:"", views:"1.5K" },
  { id:28, title:"Olmoshlar – Men, Sen, U",                    desc:"Arab tilidagi shaxs olmoshlari va ularning to'liq jadvalini o'rganamiz.",                                         level:"orta",        levelText:"O'rta",        duration:"20:40", section:"Grammatika",     youtubeId:"", views:"1.9K" },
  { id:29, title:"Taqqoslash qoidalari",                       desc:"Sifatlarni taqqoslash – afzallik va orttirma darajalar arabchada.",                                              level:"orta",        levelText:"O'rta",        duration:"18:00", section:"Grammatika",     youtubeId:"", views:"980" },
  { id:30, title:"Restorandagi muloqot",                       desc:"Restorandа buyurtma berish, narx so'rash va suhbat iboralari.",                                                   level:"orta",        levelText:"O'rta",        duration:"23:10", section:"Muloqot",        youtubeId:"", views:"2.3K" },
  { id:31, title:"Bozordagi muloqot",                          desc:"Savdo-sotiq iboralari: narxlash, kelishish va xarid qilish.",                                                    level:"orta",        levelText:"O'rta",        duration:"21:00", section:"Muloqot",        youtubeId:"", views:"2.0K" },
  { id:32, title:"Yo'l so'rash va yo'nalishlar",               desc:"Arabchada yo'l ko'rsatish, manzil so'rash va savol-javob.",                                                      level:"orta",        levelText:"O'rta",        duration:"19:55", section:"Muloqot",        youtubeId:"", views:"1.7K" },
  { id:33, title:"Sodda gaplar qurilishi",                     desc:"Arab tilida sodda gap tuzish: ot gapi (jumlah ismiyya) asoslari.",                                               level:"orta",        levelText:"O'rta",        duration:"25:20", section:"Grammatika",     youtubeId:"", views:"2.2K" },
  { id:34, title:"Mubtada va Xabar",                           desc:"Arab jumla qurilishining asosi – to'ldiruvchi va хabar tushunchasi.",                                            level:"yuqori",      levelText:"Yuqori",       duration:"28:00", section:"Grammatika",     youtubeId:"", views:"1.4K" },
  { id:35, title:"Fe'lli gaplar va tartib",                    desc:"Feili gap (jumlah fi'liyya) qurilishi va so'z tartibi qoidalari.",                                               level:"yuqori",      levelText:"Yuqori",       duration:"26:45", section:"Grammatika",     youtubeId:"", views:"1.2K" },
  { id:36, title:"Shart gaplari",                              desc:"'Agar ... bo'lsa' – arabcha shart gaplari va ularga javob shakllari.",                                           level:"yuqori",      levelText:"Yuqori",       duration:"30:15", section:"Grammatika",     youtubeId:"", views:"1.0K" },
  { id:37, title:"Passiv shakl – Majhul",                      desc:"Arabchada majhul shakl (passive voice) qurilishi va ishlatilinishi.",                                             level:"yuqori",      levelText:"Yuqori",       duration:"27:30", section:"Grammatika",     youtubeId:"", views:"890" },
  { id:38, title:"Qur'on tilining asoslari – 1",              desc:"Qur'on arabchasiga kirish: xususiyatlari, tajvid va asosiy qoidalar.",                                            level:"quron",       levelText:"Qur'on",       duration:"32:00", section:"Qur'on",         youtubeId:"", views:"3.5K" },
  { id:39, title:"Qur'on tilining asoslari – 2",              desc:"Qur'on arabchasidagi grammatik o'ziga xosliklar va misol oyatlar.",                                               level:"quron",       levelText:"Qur'on",       duration:"34:15", section:"Qur'on",         youtubeId:"", views:"3.1K" },
  { id:40, title:"Al-Fotiha surasi tahlili",                   desc:"Al-Fotiha surasining so'zma-so'z arabcha tahlili va grammatik tuzilishi.",                                       level:"quron",       levelText:"Qur'on",       duration:"38:00", section:"Qur'on",         youtubeId:"", views:"4.2K" },
  { id:41, title:"Qisqa suralar lug'ati",                      desc:"An-Nas, Al-Falaq, Al-Ikhlos suralarining so'z tahlili va tarjimasi.",                                            level:"quron",       levelText:"Qur'on",       duration:"36:20", section:"Qur'on",         youtubeId:"", views:"3.8K" },
  { id:42, title:"Tajvid qoidalari – 1",                       desc:"Qur'on qiroatining asosi: Idgom, Ikhfa, Izhār qoidalari.",                                                      level:"quron",       levelText:"Qur'on",       duration:"40:00", section:"Qur'on",         youtubeId:"", views:"2.9K" },
  { id:43, title:"Tajvid qoidalari – 2",                       desc:"Qalqalah, Madd va Waqf – Qur'on o'qishni to'g'rilash uchun muhim qoidalar.",                                    level:"quron",       levelText:"Qur'on",       duration:"42:30", section:"Qur'on",         youtubeId:"", views:"2.7K" },
  { id:44, title:"Yakuniy muloqot amaliyoti",                  desc:"44-dars yakuniy: o'rganilgan barcha mavzularni amaliy suhbat orqali mustahkamlash.",                             level:"yuqori",      levelText:"Yuqori",       duration:"45:00", section:"Muloqot",        youtubeId:"", views:"3.3K" },
];

// ─── Video Section State ───
let currentVideoFilter = 'all';
let currentVideoSearch = '';

// ─── Yuklangan videolar (localStorage) ───
const UPLOADED_VIDEOS_KEY = 'arablearn_uploaded_videos';

function getUploadedVideos() {
    try {
        return JSON.parse(localStorage.getItem(UPLOADED_VIDEOS_KEY) || '{}');
    } catch { return {}; }
}

function saveUploadedVideo(videoId, objectUrl, fileName) {
    // objectUrl – sessionStorage'da saqlaymiz (sahifa yopilganda o'chadi)
    const session = JSON.parse(sessionStorage.getItem(UPLOADED_VIDEOS_KEY) || '{}');
    session[videoId] = { url: objectUrl, name: fileName };
    sessionStorage.setItem(UPLOADED_VIDEOS_KEY, JSON.stringify(session));
}

function getSessionVideos() {
    try {
        return JSON.parse(sessionStorage.getItem(UPLOADED_VIDEOS_KEY) || '{}');
    } catch { return {}; }
}

// Yuklangan video nomlarini localStorage'da saqlaymiz
function saveUploadedVideoMeta(videoId, fileName) {
    const meta = getUploadedVideosMeta();
    meta[videoId] = fileName;
    localStorage.setItem(UPLOADED_VIDEOS_KEY, JSON.stringify(meta));
}

function getUploadedVideosMeta() {
    try {
        return JSON.parse(localStorage.getItem(UPLOADED_VIDEOS_KEY) || '{}');
    } catch { return {}; }
}

function triggerVideoUpload(videoId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', () => {
        const file = input.files[0];
        if (!file) { document.body.removeChild(input); return; }

        const objectUrl = URL.createObjectURL(file);
        saveUploadedVideo(videoId, objectUrl, file.name);
        saveUploadedVideoMeta(videoId, file.name);

        // Tugmani yangilash
        updateUploadBtn(videoId, file.name);
        showToast(`✅ "${file.name}" muvaffaqiyatli yuklandi!`, 'success', 3500);
        document.body.removeChild(input);
    });

    input.click();
}

// ─── Render Video Stats Bar ───
function renderVideoStats() {
    const counts = {
        boshlangich: VIDEO_LESSONS.filter(v => v.level === 'boshlangich').length,
        orta:        VIDEO_LESSONS.filter(v => v.level === 'orta').length,
        yuqori:      VIDEO_LESSONS.filter(v => v.level === 'yuqori').length,
        quron:       VIDEO_LESSONS.filter(v => v.level === 'quron').length,
    };

    const statsBar = document.createElement('div');
    statsBar.className = 'video-stats-bar';
    statsBar.innerHTML = `
      <div class="vstats-item">
        <span class="vstats-num">${VIDEO_LESSONS.length}</span>
        <span class="vstats-label">Jami video</span>
      </div>
      <div class="vstats-divider"></div>
      <div class="vstats-item">
        <span class="vstats-num">${counts.boshlangich}</span>
        <span class="vstats-label">Boshlang'ich</span>
      </div>
      <div class="vstats-divider"></div>
      <div class="vstats-item">
        <span class="vstats-num">${counts.orta + counts.yuqori}</span>
        <span class="vstats-label">Ilg'or</span>
      </div>
      <div class="vstats-divider"></div>
      <div class="vstats-item">
        <span class="vstats-num">${counts.quron}</span>
        <span class="vstats-label">Qur'on</span>
      </div>
    `;

    const filterEl = document.getElementById('videoFilter');
    if (filterEl) filterEl.parentNode.insertBefore(statsBar, filterEl);
}

// ─── Render Video Grid ───
function renderVideoGrid() {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;

    let videos = VIDEO_LESSONS;
    if (currentVideoFilter !== 'all') {
        videos = videos.filter(v => v.level === currentVideoFilter);
    }
    if (currentVideoSearch) {
        const s = currentVideoSearch.toLowerCase();
        videos = videos.filter(v =>
            v.title.toLowerCase().includes(s) ||
            v.desc.toLowerCase().includes(s) ||
            v.section.toLowerCase().includes(s)
        );
    }

    grid.innerHTML = '';

    if (videos.length === 0) {
        grid.innerHTML = `
          <div class="video-empty">
            <span class="empty-icon">🎬</span>
            Hech qanday video topilmadi
          </div>`;
        return;
    }

    const playSVG = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;

    videos.forEach((v, i) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.id = `video-card-${v.id}`;

        const thumbContent = v.youtubeId
            ? `<img class="video-thumb-img" src="https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg" alt="${v.title}" loading="lazy" />`
            : `<div class="video-thumb-placeholder"><span class="video-thumb-number">${v.id}</span></div>`;

        const sessionVideos = getSessionVideos();
        const metaVideos = getUploadedVideosMeta();
        const hasUploaded = !!sessionVideos[v.id];
        const uploadedName = metaVideos[v.id] || '';

        const uploadBtnLabel = hasUploaded
            ? `<span class="upload-check">✅</span> Yuklangan`
            : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Video yuklash`;

        const uploadBtnClass = hasUploaded ? 'video-upload-btn uploaded' : 'video-upload-btn';
        const uploadedFileBadge = uploadedName
            ? `<div class="uploaded-file-badge" id="uploaded-name-${v.id}" title="${uploadedName}">📁 ${uploadedName.length > 18 ? uploadedName.slice(0,18)+'…' : uploadedName}</div>`
            : `<div class="uploaded-file-badge" id="uploaded-name-${v.id}" style="display:none"></div>`;

        card.innerHTML = `
          <div class="video-thumb">
            ${thumbContent}
            <div class="video-play-overlay">
              <div class="video-play-btn">${playSVG}</div>
            </div>
            <span class="video-num-badge">${v.id}-dars</span>
            <span class="video-duration-badge">⏱ ${v.duration}</span>
          </div>
          <div class="video-card-body">
            <div class="video-card-top">
              <span class="video-level-badge vlevel-${v.level}">${v.levelText}</span>
              <span class="video-views">👁 ${v.views}</span>
            </div>
            <div class="video-card-desc">${v.desc}</div>
            ${uploadedFileBadge}
            <div class="video-card-footer">
              <button class="${uploadBtnClass}" onclick="event.stopPropagation(); triggerVideoUpload(${v.id})" id="video-upload-${v.id}">
                ${uploadBtnLabel}
              </button>
              <button class="video-watch-btn" onclick="openVideoModal(${v.id})" id="video-watch-${v.id}">
                ▶ Ko'rish
              </button>
            </div>
          </div>`;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.video-watch-btn')) openVideoModal(v.id);
        });

        setTimeout(() => grid.appendChild(card), i * 40);
    });
}

// ─── Upload Button yangilash ───
function updateUploadBtn(videoId, fileName) {
    const btn = document.getElementById(`video-upload-${videoId}`);
    if (btn) {
        btn.classList.add('uploaded');
        btn.innerHTML = `<span class="upload-check">✅</span> Yuklangan`;
    }
    const nameBadge = document.getElementById(`uploaded-name-${videoId}`);
    if (nameBadge) {
        const displayName = fileName.length > 18 ? fileName.slice(0,18)+'…' : fileName;
        nameBadge.textContent = `📁 ${displayName}`;
        nameBadge.title = fileName;
        nameBadge.style.display = '';
    }
}

// ─── Open Video Modal ───
function openVideoModal(videoId) {
    const v = VIDEO_LESSONS.find(x => x.id === videoId);
    if (!v) return;

    const overlay  = document.getElementById('videoModal');
    const iframe   = document.getElementById('videoIframe');
    const title    = document.getElementById('videoModalTitle');
    const desc     = document.getElementById('videoModalDesc');
    const badge    = document.getElementById('videoModalBadge');
    const duration = document.getElementById('videoModalDuration');
    const lesson   = document.getElementById('videoModalLesson');
    const wrap     = document.querySelector('.video-player-wrap');

    // Clear old placeholder
    const oldPlaceholder = wrap.querySelector('.video-player-placeholder');
    if (oldPlaceholder) oldPlaceholder.remove();

    // Avval session'dan yuklangan video bor-yo'qligini tekshiramiz
    const sessionVideos = getSessionVideos();
    const uploadedVideo = sessionVideos[v.id];

    if (uploadedVideo) {
        // Foydalanuvchi yuklagan lokal video
        iframe.src = '';
        iframe.style.display = 'none';
        const localPlayer = document.createElement('video');
        localPlayer.className = 'local-video-player';
        localPlayer.src = uploadedVideo.url;
        localPlayer.controls = true;
        localPlayer.autoplay = true;
        localPlayer.style.cssText = 'width:100%;height:100%;border-radius:12px;background:#000;';
        localPlayer.id = 'localVideoPlayer';
        wrap.appendChild(localPlayer);
    } else if (v.youtubeId) {
        iframe.src = `https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0`;
        iframe.style.display = 'block';
    } else {
        iframe.src = '';
        iframe.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'video-player-placeholder';
        const metaVideos = getUploadedVideosMeta();
        const savedName = metaVideos[v.id];
        if (savedName) {
            placeholder.innerHTML = `
              <span class="placeholder-icon">📁</span>
              <p>"${savedName}" fayli sahifani yangilash tufayli yo'qoldi.</p>
              <button class="btn btn-primary" style="margin-top:16px;" onclick="triggerVideoUpload(${v.id}); closeVideoModal();">
                🔄 Qayta Yuklash
              </button>`;
        } else {
            placeholder.innerHTML = `
              <span class="placeholder-icon">🎬</span>
              <p>${v.id}-dars uchun video hali yuklanmagan.</p>
              <button class="btn btn-primary" style="margin-top:16px;" onclick="triggerVideoUpload(${v.id}); closeVideoModal();">
                ⬆️ Video Yuklash
              </button>`;
        }
        wrap.appendChild(placeholder);
    }

    title.textContent    = v.title;
    desc.textContent     = v.desc;
    badge.textContent    = v.levelText;
    duration.textContent = `⏱ ${v.duration}`;
    lesson.textContent   = `📂 ${v.section}`;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// ─── Close Video Modal ───
function closeVideoModal() {
    const overlay = document.getElementById('videoModal');
    const iframe  = document.getElementById('videoIframe');
    iframe.src = '';
    iframe.style.display = 'none';
    const placeholder = document.querySelector('.video-player-placeholder');
    if (placeholder) placeholder.remove();
    const localPlayer = document.getElementById('localVideoPlayer');
    if (localPlayer) { localPlayer.pause(); localPlayer.remove(); }
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// ─── Init Video Modal Events ───
function initVideoModal() {
    const closeBtn = document.getElementById('videoModalClose');
    const overlay  = document.getElementById('videoModal');
    if (!closeBtn || !overlay) return;

    closeBtn.addEventListener('click', closeVideoModal);
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeVideoModal();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeVideoModal();
    });
}

// ─── Init Video Filter Tabs ───
function initVideoFilter() {
    const tabs = document.querySelectorAll('#videoFilter .tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentVideoFilter = tab.dataset.vfilter;
            renderVideoGrid();
        });
    });
}

// ─── Init Video Search ───
function initVideoSearch() {
    const input = document.getElementById('videoSearch');
    if (!input) return;
    let timeout;
    input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            currentVideoSearch = input.value.trim();
            renderVideoGrid();
        }, 300);
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
    renderLessons();
    initModal();

    // Video Darsliklar
    renderVideoStats();
    renderVideoGrid();
    initVideoFilter();
    initVideoSearch();
    initVideoModal();

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
        const name = STATE.completedLessons.length > 0
            ? `Xush kelibsiz! Siz ${STATE.completedLessons.length} dars o'tdingiz 🎓`
            : 'ArabLearn\'ga xush kelibsiz! 🕌 Darsni boshlang!';
        showToast(name, 'gold', 4000);
    }, 1500);
});


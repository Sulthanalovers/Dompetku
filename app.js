/* ============================================================================
 * DOMPETKU — BUKU KAS & KEUANGAN (GABUNGAN SEMUA KEUNGGULAN + 17 MODUL)
 * ============================================================================ */

const CATEGORIES = {
  pengeluaran: ['Makan & Minum', 'Transportasi', 'Belanja Harian', 'Tagihan & Utilitas', 'Kesehatan', 'Hiburan', 'Pendidikan', 'Keluarga & Sosial', 'Cicilan', 'Zakat & Donasi', 'Asuransi', 'Lainnya'],
  pemasukan: ['Gaji', 'Tunjangan & Bonus', 'THR', 'Usaha & Freelance', 'Investasi & Dividen', 'Hadiah', 'Lainnya'],
  transfer: ['Transfer Dompet']
};

const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const MONTHS_FULL_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const DAYS_SHORT_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const FX_RATES = { IDR: 1, USD: 15850, SGD: 11800, MYR: 3580 };

const CATEGORY_SVG_PATHS = {
  'Makan & Minum': '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  'Transportasi': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  'Belanja Harian': '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  'Tagihan & Utilitas': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'Kesehatan': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  'Hiburan': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/>',
  'Pendidikan': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  'Keluarga & Sosial': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
  'Cicilan': '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  'Zakat & Donasi': '<path d="M12 21s-7-4.5-9-9.5C1.5 7.5 4.5 4 8 4c2 0 3.5 1 4 2.5C12.5 5 14 4 16 4c3.5 0 6.5 3.5 5 7.5-2 5-9 9.5-9 9.5z"/>',
  'Asuransi': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'Gaji': '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'Transfer Dompet': '<path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>',
  'Lainnya': '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>'
};

function renderIcon(name, cls = 'h-4 w-4') {
  const p = CATEGORY_SVG_PATHS[name] || CATEGORY_SVG_PATHS['Lainnya'];
  return `<svg class="${cls}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
}

const STORE_KEY = 'dompetku_unified_v4';

function getTodayYMD() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
}
function shiftYMD(ymd, delta) {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(y, m - 1, d + delta);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
}

function defaultState() {
  const today = getTodayYMD();
  return {
    profile: { name: 'Endang Kartini', pin: '' },
    apiUrl: '',
    apiToken: '',
    darkMode: false,
    privacyHidden: false,
    dailyBudgetLimit: 150000,
    activeSpace: 'Pribadi',
    monthlyNotes: {},
    spaces: [{ id: 'SP-1', name: 'Pribadi', role: 'Admin' }, { id: 'SP-2', name: 'Keluarga', role: 'Admin' }],
    wallets: [
      { id: 'W-1', name: 'Bank Utama', type: 'Rekening Bank', currency: 'IDR', balance: 12500000, archived: false },
      { id: 'W-2', name: 'Dompet Tunai', type: 'Tunai', currency: 'IDR', balance: 850000, archived: false },
      { id: 'W-3', name: 'E-Wallet', type: 'E-Wallet', currency: 'IDR', balance: 1450000, archived: false },
      { id: 'W-4', name: 'Kartu Kredit', type: 'Kartu Kredit', currency: 'IDR', balance: -1200000, limit: 15000000, dueDay: 25, archived: false },
      { id: 'W-5', name: 'Tabungan USD', type: 'Tabungan Berjangka', currency: 'USD', balance: 500, archived: false }
    ],
    transactions: [
      { id: 'TX-1', type: 'pemasukan', nws: 'Saving', tanggal: shiftYMD(today, -12), kategori: 'Gaji', nominal: 8500000, walletId: 'W-1', catatan: 'Gaji bulanan', space: 'Pribadi' },
      { id: 'TX-2', type: 'pemasukan', nws: 'Saving', tanggal: shiftYMD(today, -5), kategori: 'Usaha & Freelance', nominal: 2250000, walletId: 'W-1', catatan: 'Proyek konsultasi', space: 'Pribadi' },
      { id: 'TX-3', type: 'pengeluaran', nws: 'Need', tanggal: shiftYMD(today, -10), kategori: 'Tagihan & Utilitas', nominal: 650000, walletId: 'W-1', catatan: 'Listrik & IndiHome', space: 'Pribadi' },
      { id: 'TX-4', type: 'pengeluaran', nws: 'Need', tanggal: shiftYMD(today, -6), kategori: 'Belanja Harian', nominal: 480000, walletId: 'W-3', catatan: 'Belanja mingguan', space: 'Keluarga' },
      { id: 'TX-5', type: 'pengeluaran', nws: 'Need', tanggal: shiftYMD(today, -3), kategori: 'Transportasi', nominal: 150000, walletId: 'W-2', catatan: 'BBM', space: 'Pribadi' },
      { id: 'TX-6', type: 'pengeluaran', nws: 'Want', tanggal: shiftYMD(today, -1), kategori: 'Makan & Minum', nominal: 85000, walletId: 'W-3', catatan: 'Makan siang', space: 'Pribadi' },
      { id: 'TX-7', type: 'pengeluaran', nws: 'Want', tanggal: today, kategori: 'Makan & Minum', nominal: 35000, walletId: 'W-2', catatan: 'Kopi pagi', space: 'Pribadi' }
    ],
    allocationTemplate: '50/30/20',
    allocations: [
      { name: 'Kebutuhan Pokok (Need)', pct: 50 },
      { name: 'Keinginan (Want)', pct: 30 },
      { name: 'Tabungan & Investasi (Saving)', pct: 20 }
    ],
    budgets: [
      { id: 'B-1', category: 'Makan & Minum', limit: 1500000, period: 'Bulanan', rollover: true },
      { id: 'B-2', category: 'Transportasi', limit: 600000, period: 'Bulanan', rollover: false },
      { id: 'B-3', category: 'Tagihan & Utilitas', limit: 1000000, period: 'Bulanan', rollover: false }
    ],
    sinkingFunds: [{ id: 'SF-1', name: 'Pajak Kendaraan & Servis', target: 3600000, saved: 1800000, monthly: 300000 }],
    goals: [
      { id: 'G-1', name: 'Dana Darurat (6x Pengeluaran)', target: 30000000, saved: 14500000, monthly: 1500000 },
      { id: 'G-2', name: 'Dana Pendidikan / Sertifikasi', target: 15000000, saved: 6000000, monthly: 1000000 }
    ],
    debts: [
      { id: 'D-1', name: 'Cicilan Laptop Kerja', kind: 'Pinjaman', remaining: 3500000, rate: 6, monthly: 550000, dueDay: 15 },
      { id: 'D-2', name: 'Tagihan Kartu Kredit', kind: 'Kartu Kredit', remaining: 1200000, rate: 21, monthly: 300000, dueDay: 25 }
    ],
    bills: [
      { id: 'BL-1', name: 'IndiHome Fiber', amount: 450000, dueDay: 20, category: 'Tagihan & Utilitas', paidThisMonth: false },
      { id: 'BL-2', name: 'Netflix & Spotify', amount: 185000, dueDay: 24, category: 'Hiburan', paidThisMonth: false }
    ],
    assets: [
      { id: 'A-1', name: 'Reksa Dana Pasar Uang', kind: 'Reksa Dana', cost: 10000000, current: 10650000 },
      { id: 'A-2', name: 'Emas Antam (10g)', kind: 'Emas', cost: 12000000, current: 14200000 },
      { id: 'A-3', name: 'SBN Ritel ORI', kind: 'Obligasi/SBN', cost: 15000000, current: 15450000 }
    ],
    featureFlags: { gamification: true, nlpInput: true, familyMode: true }
  };
}

let appState = defaultState();
const nowDt = new Date();
let uiState = {
  view: 'dashboard',
  selectedYear: nowDt.getFullYear(),
  selectedMonth: nowDt.getMonth(),
  selectedCalDay: nowDt.getDate(),
  txSubView: 'daily',
  planTab: 'compare',
  hubModule: null,
  bulkMode: false,
  selectedIds: new Set(),
  formType: 'pengeluaran',
  formCategory: 'Makan & Minum',
  formNws: 'Need',
  calcExpr: '0',
  pendingDeleteId: null,
  homeDonut: null
};

function loadState() {
  try { const raw = localStorage.getItem(STORE_KEY); if (raw) appState = { ...defaultState(), ...JSON.parse(raw) }; } catch (_) {}
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(appState)); } catch (_) {}
}

function fmtRp(num, maskable = false) {
  if (maskable && appState.privacyHidden) return 'Rp ••••••';
  const n = Math.round(Number(num) || 0);
  return (n < 0 ? '-Rp ' : 'Rp ') + Math.abs(n).toLocaleString('id-ID');
}
function fmtShortRp(num) {
  const n = Math.abs(Number(num) || 0);
  if (n >= 1000000) return `Rp ${(n / 1000000).toFixed(2).replace(/\.00$/, '')} jt`;
  if (n >= 1000) return `Rp ${Math.round(n / 1000)} rb`;
  return `Rp ${n}`;
}
function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
function toast(msg, type = 'dark') {
  const t = document.getElementById('toast');
  const inner = document.getElementById('toastInner');
  document.getElementById('toastMsg').textContent = msg;
  inner.className = 'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-xl ' +
    (type === 'success' ? 'bg-[#0D6E4E]' : type === 'error' ? 'bg-rose-600' : 'bg-[#181816]');
  t.classList.remove('opacity-0', 'translate-y-[-16px]');
  t.classList.add('opacity-100', 'translate-y-0');
  clearTimeout(toast._tm);
  toast._tm = setTimeout(() => { t.classList.add('opacity-0', 'translate-y-[-16px]'); t.classList.remove('opacity-100', 'translate-y-0'); }, 2400);
}

/* ---------------- NLP PARSER ---------------- */
function parseNlpInput(text) {
  const clean = text.trim();
  const numMatch = clean.match(/(\d+(?:[.,]\d+)?)\s*(jt|juta|rb|ribu|k|m)?/i);
  if (!numMatch) return null;
  let val = parseFloat(numMatch[1].replace(',', '.'));
  const unit = (numMatch[2] || '').toLowerCase();
  if (unit === 'jt' || unit === 'juta' || unit === 'm') val *= 1000000;
  else if (unit === 'rb' || unit === 'ribu' || unit === 'k') val *= 1000;
  val = Math.round(val);
  if (!val || val <= 0) return null;
  const lower = clean.toLowerCase();
  const isIncome = /(gaji|bonus|thr|terima|dapat|freelance|dividen)/.test(lower);
  let cat = 'Lainnya';
  if (/makan|kopi|minum|bakso|nasi|sarapan|siang|malam/.test(lower)) cat = 'Makan & Minum';
  else if (/bensin|bbm|gojek|grab|ojek|parkir|tol/.test(lower)) cat = 'Transportasi';
  else if (/listrik|air|internet|wifi|indihome|pulsa/.test(lower)) cat = 'Tagihan & Utilitas';
  else if (/belanja|alfamart|indomaret/.test(lower)) cat = 'Belanja Harian';
  else if (/gaji/.test(lower)) cat = 'Gaji';
  const note = clean.replace(numMatch[0], '').trim() || cat;
  return { id: 'TX-' + Date.now(), type: isIncome ? 'pemasukan' : 'pengeluaran', nws: isIncome ? 'Saving' : 'Need', tanggal: getTodayYMD(), kategori: cat, nominal: val, walletId: appState.wallets[0]?.id || 'W-1', catatan: note, space: appState.activeSpace };
}

function getTotalWalletsIDR() {
  return appState.wallets.filter((w) => !w.archived).reduce((s, w) => s + (Number(w.balance) * (FX_RATES[w.currency] || 1)), 0);
}
function getTotalAssetsIDR() {
  return appState.assets.reduce((s, a) => s + Number(a.current), 0) + Math.max(0, getTotalWalletsIDR());
}
function getTotalDebtsIDR() {
  return appState.debts.reduce((s, d) => s + Number(d.remaining), 0);
}
function getMonthPrefix(yr, mIdx) {
  return `${yr}-${String(mIdx + 1).padStart(2, '0')}`;
}

/* ---------------- RENDER DASHBOARD ---------------- */
function renderDashboard() {
  if (appState.darkMode) document.body.classList.add('dark-mode');
  else document.body.classList.remove('dark-mode');

  document.getElementById('spaceBadge').textContent = appState.activeSpace;
  document.getElementById('connectionBadge').textContent = (appState.apiUrl && appState.apiToken) ? 'Terhubung ke Google Sheets' : 'Mode Lokal • Siap Hubung Sheets';

  const prevIdx = (uiState.selectedMonth + 11) % 12;
  const nextIdx = (uiState.selectedMonth + 1) % 12;
  document.getElementById('prevMonthText').textContent = MONTHS_ID[prevIdx];
  document.getElementById('nextMonthText').textContent = MONTHS_ID[nextIdx];
  document.getElementById('activeMonthBadge').textContent = `${MONTHS_FULL_ID[uiState.selectedMonth]} ${uiState.selectedYear}`;

  const prefix = getMonthPrefix(uiState.selectedYear, uiState.selectedMonth);
  const monthTx = appState.transactions.filter((t) => t.tanggal.startsWith(prefix));
  const totalIn = monthTx.filter((t) => t.type === 'pemasukan').reduce((s, t) => s + Number(t.nominal), 0);
  const totalOut = monthTx.filter((t) => t.type === 'pengeluaran').reduce((s, t) => s + Number(t.nominal), 0);
  const netWorth = getTotalAssetsIDR() - getTotalDebtsIDR();
  const savePct = totalIn > 0 ? Math.max(0, Math.round(((totalIn - totalOut) / totalIn) * 100)) : 0;

  document.getElementById('statSaldo').textContent = fmtRp(getTotalWalletsIDR(), true);
  document.getElementById('statNetWorth').textContent = `Kekayaan bersih: ${fmtRp(netWorth, true)}`;
  document.getElementById('statPemasukan').textContent = fmtRp(totalIn, true);
  document.getElementById('statPengeluaran').textContent = fmtRp(totalOut, true);
  document.getElementById('ringPeriodLabel').textContent = `${MONTHS_FULL_ID[uiState.selectedMonth]} ${uiState.selectedYear}`;
  document.getElementById('homeRingPct').textContent = `${savePct}%`;

  const alertEl = document.getElementById('homeRingAlert');
  if (totalIn > 0 && totalOut > totalIn * 0.5) {
    alertEl.textContent = 'Pengeluaran lebih dari setengah pemasukan periode ini.';
  } else {
    alertEl.textContent = 'Pengeluaran terjaga di bawah 50% pemasukan periode ini.';
  }

  // Home Ring Chart
  if (typeof Chart !== 'undefined') {
    if (uiState.homeDonut) uiState.homeDonut.destroy();
    const remainVal = Math.max(0, totalIn - totalOut);
    uiState.homeDonut = new Chart(document.getElementById('homeDonutChart'), {
      type: 'doughnut',
      data: {
        labels: ['Tersimpan', 'Pengeluaran'],
        datasets: [{ data: (totalIn === 0 && totalOut === 0) ? [1, 0] : [remainVal, totalOut], backgroundColor: ['#0D6E4E', '#E11D48'], borderWidth: 0 }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '74%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }
    });
  }

  // Budget Harian
  const today = getTodayYMD();
  const todaySpent = appState.transactions.filter((t) => t.tanggal === today && t.type === 'pengeluaran').reduce((s, t) => s + Number(t.nominal), 0);
  const dailyLimit = appState.dailyBudgetLimit || 150000;
  const dailyRem = dailyLimit - todaySpent;
  const dailyPct = Math.min(100, Math.round((todaySpent / dailyLimit) * 100));
  document.getElementById('dailyBudgetTarget').textContent = fmtRp(dailyLimit);
  document.getElementById('dailyBudgetBar').style.width = `${dailyPct}%`;
  document.getElementById('dailyBudgetBar').className = `h-full rounded-full transition-all duration-300 ${dailyRem < 0 ? 'bg-rose-600' : 'bg-[#0D6E4E]'}`;
  document.getElementById('dailyBudgetRemain').textContent = dailyRem >= 0 ? `Sisa ${fmtRp(dailyRem)} hari ini` : `Melebihi ${fmtRp(Math.abs(dailyRem))}`;
  document.getElementById('dailyBudgetRemain').className = `font-semibold ${dailyRem >= 0 ? 'text-[#0D6E4E]' : 'text-rose-600'}`;
  document.getElementById('dailyBudgetSpent').textContent = `Terpakai ${fmtRp(todaySpent)}`;

  const uniqueDays = new Set(appState.transactions.map((t) => t.tanggal)).size;
  document.getElementById('streakBadge').textContent = `Streak ${uniqueDays} Hari`;
  document.getElementById('streakBadge').classList.toggle('hidden', !appState.featureFlags.gamification);

  renderGroupedDailyLedger(document.getElementById('recentList'), [...monthTx].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 5), false);
}

/* ---------------- GROUPED BY DATE LEDGER (from 369881.jpg) ---------------- */
function renderGroupedDailyLedger(container, items, allowBulk) {
  if (!items.length) {
    container.innerHTML = '<div class="py-6 text-center text-xs text-[#6B6B64]">Belum ada transaksi di periode ini.</div>';
    return;
  }
  const groups = {};
  items.forEach((tx) => {
    if (!groups[tx.tanggal]) groups[tx.tanggal] = [];
    groups[tx.tanggal].push(tx);
  });

  container.innerHTML = Object.entries(groups).map(([dateStr, txs]) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    const dayName = DAYS_SHORT_ID[dt.getDay()];
    const dayIn = txs.filter((t) => t.type === 'pemasukan').reduce((s, t) => s + Number(t.nominal), 0);
    const dayOut = txs.filter((t) => t.type === 'pengeluaran').reduce((s, t) => s + Number(t.nominal), 0);

    return `
      <div class="surface-card rounded-2xl overflow-hidden">
        <div class="flex items-center justify-between bg-[#FAF9F6] px-3.5 py-2 border-b border-[#EFECE4]">
          <div class="flex items-center gap-2">
            <span class="font-display text-sm font-bold text-[#181816]">${d}</span>
            <span class="rounded bg-[#E5E3DC] px-1.5 py-0.5 text-[10px] font-semibold text-[#57564F]">${dayName}</span>
            <span class="text-[11px] text-[#6B6B64]">${MONTHS_ID[m - 1]} ${y}</span>
          </div>
          <div class="flex items-center gap-3 text-[11px] font-bold tabular-nums">
            ${dayIn > 0 ? `<span class="text-[#0D6E4E]">+${fmtRp(dayIn, true)}</span>` : ''}
            ${dayOut > 0 ? `<span class="text-rose-600">-${fmtRp(dayOut, true)}</span>` : ''}
          </div>
        </div>
        <div class="divide-y divide-[#EFECE4]">
          ${txs.map((tx) => {
            const wName = appState.wallets.find((w) => w.id === tx.walletId)?.name || 'Dompet';
            const isIn = tx.type === 'pemasukan';
            const checked = uiState.selectedIds.has(tx.id) ? 'checked' : '';
            return `
              <div class="flex items-center justify-between gap-2 px-3.5 py-2.5">
                <div class="flex items-center gap-2.5 min-w-0">
                  ${allowBulk && uiState.bulkMode ? `<input type="checkbox" data-bulkid="${escapeHtml(tx.id)}" ${checked} class="h-4 w-4 accent-[#0D6E4E]" />` : ''}
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isIn ? 'bg-[#E6F2ED] text-[#0D6E4E]' : 'bg-[#F5F4F0] text-[#57564F]'}">${renderIcon(tx.kategori, 'h-4 w-4')}</div>
                  <div class="min-w-0">
                    <p class="text-xs font-semibold text-[#181816] truncate">${escapeHtml(tx.kategori)} ${tx.nws ? `<span class="rounded bg-[#F5F4F0] px-1 text-[9px] font-semibold text-[#6B6B64]">${tx.nws}</span>` : ''}</p>
                    <p class="text-[11px] text-[#6B6B64] truncate">${escapeHtml(tx.catatan || '-')} • ${escapeHtml(wName)}</p>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <span class="text-xs font-bold tabular-nums ${isIn ? 'text-[#0D6E4E]' : 'text-[#181816]'}">${isIn ? '+' : '-'}${fmtRp(tx.nominal, true)}</span>
                  <button type="button" data-edit="${escapeHtml(tx.id)}" class="rounded p-1 text-[#9C9A90] hover:text-[#0D6E4E]" title="Edit"><svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" /></svg></button>
                  <button type="button" data-del="${escapeHtml(tx.id)}" class="rounded p-1 text-[#9C9A90] hover:text-rose-600" title="Hapus"><svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button>
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');
}

/* ---------------- RENDER HISTORY & CALENDAR HEATMAP (from 369880.jpg) ---------------- */
function renderHistory() {
  const q = (document.getElementById('historySearch').value || '').toLowerCase().trim();
  const tf = document.getElementById('historyTypeFilter').value;
  const wf = document.getElementById('historyWalletFilter').value;
  const cf = document.getElementById('historyCategoryFilter').value;

  const wSel = document.getElementById('historyWalletFilter');
  const prevW = wSel.value;
  wSel.innerHTML = '<option value="all">Semua Dompet</option>' + appState.wallets.map((w) => `<option value="${w.id}">${escapeHtml(w.name)}</option>`).join('');
  if (appState.wallets.some((w) => w.id === prevW)) wSel.value = prevW;

  const cSel = document.getElementById('historyCategoryFilter');
  const prevC = cSel.value;
  const cats = Array.from(new Set(appState.transactions.map((t) => t.kategori))).sort();
  cSel.innerHTML = '<option value="all">Semua Kategori</option>' + cats.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  if (cats.includes(prevC)) cSel.value = prevC;

  const filtered = appState.transactions.filter((t) => {
    if (tf !== 'all' && t.type !== tf) return false;
    if (wf !== 'all' && t.walletId !== wf) return false;
    if (cf !== 'all' && t.kategori !== cf) return false;
    if (q && !`${t.kategori} ${t.catatan} ${t.nominal}`.toLowerCase().includes(q)) return false;
    return true;
  }).sort((a, b) => b.tanggal.localeCompare(a.tanggal));

  document.getElementById('historyCountLabel').textContent = `${filtered.length} transaksi`;
  renderGroupedDailyLedger(document.getElementById('historyList'), filtered, true);

  // Calendar Heatmap
  const yr = uiState.selectedYear;
  const m = uiState.selectedMonth;
  document.getElementById('calTitle').textContent = `${MONTHS_FULL_ID[m]} ${yr}`;
  const daysInMonth = new Date(yr, m + 1, 0).getDate();
  const firstDayOffset = (new Date(yr, m, 1).getDay() + 6) % 7;
  const prefix = getMonthPrefix(yr, m);

  let html = '';
  for (let i = 0; i < firstDayOffset; i++) html += '<div></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const ymd = `${prefix}-${String(d).padStart(2, '0')}`;
    const hasTx = appState.transactions.some((t) => t.tanggal === ymd);
    const isSel = d === uiState.selectedCalDay;
    html += `<button type="button" data-calday="${d}" class="h-9 rounded-full text-xs font-semibold transition ${isSel ? 'bg-[#0D6E4E] text-white' : hasTx ? 'bg-[#E6F2ED] text-[#0D6E4E]' : 'bg-[#FAF9F6] text-[#6B6B64]'}">${d}</button>`;
  }
  document.getElementById('calendarHeatmapGrid').innerHTML = html;

  const selYmd = `${prefix}-${String(uiState.selectedCalDay).padStart(2, '0')}`;
  const dayTx = appState.transactions.filter((t) => t.tanggal === selYmd);
  renderGroupedDailyLedger(document.getElementById('calendarDayDetail'), dayTx, false);

  // 12-Month Grid
  document.getElementById('monthGrid').innerHTML = MONTHS_ID.map((mName, idx) => {
    const mp = getMonthPrefix(yr, idx);
    const mTx = appState.transactions.filter((t) => t.tanggal.startsWith(mp));
    const mOut = mTx.filter((t) => t.type === 'pengeluaran').reduce((s, t) => s + Number(t.nominal), 0);
    const isAct = idx === uiState.selectedMonth;
    return `<button type="button" data-pickmonth="${idx}" class="rounded-xl p-2.5 text-left ${isAct ? 'bg-[#0D6E4E] text-white' : 'bg-[#FAF9F6] text-[#181816]'}"><p class="text-xs font-bold">${mName}</p><p class="text-[10px] ${isAct ? 'text-emerald-100' : 'text-[#6B6B64]'}">${fmtShortRp(mOut)}</p></button>`;
  }).join('');

  document.getElementById('monthlyNoteInput').value = appState.monthlyNotes[prefix] || '';
}

/* ---------------- RENDER PLAN & DETAIL LAPORAN (from 369879.jpg) ---------------- */
function renderDotMatrix(count = 14, activeCount = 10, color = '#0D6E4E') {
  let dots = '';
  for (let i = 0; i < count; i++) {
    dots += `<span class="h-2 w-2 rounded-sm ${i < activeCount ? '' : 'opacity-25'}" style="background:${color}"></span>`;
  }
  return `<div class="flex flex-wrap gap-1 mt-1.5">${dots}</div>`;
}

function renderPlan() {
  const el = document.getElementById('planContent');
  const tab = uiState.planTab;

  if (tab === 'compare') {
    const curP = getMonthPrefix(uiState.selectedYear, uiState.selectedMonth);
    const prevM = (uiState.selectedMonth + 11) % 12;
    const prevY = uiState.selectedMonth === 0 ? uiState.selectedYear - 1 : uiState.selectedYear;
    const prevP = getMonthPrefix(prevY, prevM);

    const curTx = appState.transactions.filter((t) => t.tanggal.startsWith(curP));
    const prevTx = appState.transactions.filter((t) => t.tanggal.startsWith(prevP));

    const curIn = curTx.filter((t) => t.type === 'pemasukan').reduce((s, t) => s + Number(t.nominal), 0);
    const curOut = curTx.filter((t) => t.type === 'pengeluaran').reduce((s, t) => s + Number(t.nominal), 0);
    const prevOut = prevTx.filter((t) => t.type === 'pengeluaran').reduce((s, t) => s + Number(t.nominal), 0);
    const wantOut = curTx.filter((t) => t.type === 'pengeluaran' && t.nws === 'Want').reduce((s, t) => s + Number(t.nominal), 0);
    const wantPct = curOut > 0 ? Math.round((wantOut / curOut) * 100) : 0;
    const deltaPct = prevOut > 0 ? Math.round(((curOut - prevOut) / prevOut) * 100) : 0;

    el.innerHTML = `
      <div class="surface-card rounded-2xl p-4 space-y-2 border-[#0D6E4E]/30 bg-[#E6F2ED]/40">
        <p class="text-[10px] font-bold uppercase tracking-wider text-[#0D6E4E]">${deltaPct <= 0 ? 'MEMBAIK' : 'PERHATIAN'}</p>
        <p class="font-display text-base font-bold text-[#181816]">${prevOut === 0 ? 'Ringkasan Arus Kas Bulan Ini' : (deltaPct <= 0 ? `Pengeluaran turun ${Math.abs(deltaPct)}% dari bulan lalu` : `Pengeluaran naik ${deltaPct}% dari bulan lalu`)}</p>
        <p class="text-xs text-[#57564F]">Porsi pengeluaran <strong>Want</strong> saat ini <strong>${wantPct}%</strong> (${fmtRp(wantOut)}) dari total pengeluaran.</p>
      </div>
      <div class="grid grid-cols-2 gap-2.5">
        <div class="surface-card rounded-2xl p-3.5">
          <p class="text-[11px] font-medium text-[#6B6B64]">Pemasukan</p>
          <p class="font-display text-lg font-bold text-[#181816] mt-0.5 tabular-nums">${fmtShortRp(curIn)}</p>
          ${renderDotMatrix(14, 12, '#0D6E4E')}
        </div>
        <div class="surface-card rounded-2xl p-3.5">
          <p class="text-[11px] font-medium text-[#6B6B64]">Pengeluaran</p>
          <p class="font-display text-lg font-bold text-[#181816] mt-0.5 tabular-nums">${fmtShortRp(curOut)}</p>
          ${renderDotMatrix(14, 8, '#E11D48')}
        </div>
        <div class="surface-card rounded-2xl p-3.5">
          <p class="text-[11px] font-medium text-[#6B6B64]">Arus Bersih</p>
          <p class="font-display text-lg font-bold text-[#0D6E4E] mt-0.5 tabular-nums">${fmtShortRp(curIn - curOut)}</p>
          ${renderDotMatrix(14, 11, '#0D6E4E')}
        </div>
        <div class="surface-card rounded-2xl p-3.5">
          <p class="text-[11px] font-medium text-[#6B6B64]">Porsi Want</p>
          <p class="font-display text-lg font-bold text-[#181816] mt-0.5 tabular-nums">${wantPct}%</p>
          ${renderDotMatrix(14, Math.round(wantPct / 7), '#D97706')}
        </div>
      </div>`;
  } else if (tab === 'salary') {
    const monthlySalary = appState.transactions.filter((t) => t.type === 'pemasukan').reduce((s, t) => s + Number(t.nominal), 0);
    const totalPct = appState.allocations.reduce((s, a) => s + Number(a.pct), 0);
    el.innerHTML = `
      <div class="surface-card rounded-2xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <div><h3 class="text-sm font-bold">Alokasi Gaji & Penghasilan</h3><p class="text-[11px] text-[#6B6B64]">Dasar: <strong>${fmtRp(monthlySalary)}</strong></p></div>
          <select id="allocTemplateSelect" class="rounded-lg border border-[#E5E3DC] bg-[#FAF9F6] px-2 py-1 text-xs font-semibold">
            <option value="50/30/20" ${appState.allocationTemplate === '50/30/20' ? 'selected' : ''}>50 / 30 / 20</option>
            <option value="Amplop" ${appState.allocationTemplate === 'Amplop' ? 'selected' : ''}>Amplop</option>
            <option value="Zero-Based" ${appState.allocationTemplate === 'Zero-Based' ? 'selected' : ''}>Zero-Based</option>
          </select>
        </div>
        <div class="rounded-lg bg-[#E6F2ED] px-3 py-2 text-xs font-semibold text-[#0D6E4E]">Total Dialokasikan: ${totalPct}% • Sisa: ${Math.max(0, 100 - totalPct)}%</div>
        ${appState.allocations.map((a, i) => `
          <div class="space-y-1">
            <div class="flex justify-between text-xs"><span class="font-semibold">${escapeHtml(a.name)}</span><span class="font-bold tabular-nums">${a.pct}% (${fmtRp(monthlySalary * a.pct / 100)})</span></div>
            <input type="range" min="0" max="70" step="0.5" value="${a.pct}" data-allocidx="${i}" class="w-full accent-[#0D6E4E]" />
          </div>
        `).join('')}
      </div>`;
    el.querySelectorAll('[data-allocidx]').forEach((rng) => rng.addEventListener('input', (e) => { appState.allocations[Number(e.target.dataset.allocidx)].pct = Number(e.target.value); saveState(); renderPlan(); }));
  } else if (tab === 'budget') {
    el.innerHTML = `
      <div class="surface-card rounded-2xl p-4 space-y-3">
        <h3 class="text-sm font-bold">Anggaran per Kategori & Sinking Fund</h3>
        ${appState.budgets.map((b) => {
          const spent = appState.transactions.filter((t) => t.type === 'pengeluaran' && t.kategori === b.category).reduce((s, t) => s + Number(t.nominal), 0);
          const pct = Math.min(100, Math.round((spent / b.limit) * 100));
          return `<div class="rounded-xl border border-[#EFECE4] p-3 space-y-1.5"><div class="flex justify-between text-xs"><span class="font-semibold">${escapeHtml(b.category)}</span><span class="font-bold tabular-nums">${pct}% (${fmtRp(spent)} / ${fmtRp(b.limit)})</span></div><div class="h-1.5 w-full rounded-full bg-[#EFECE4] overflow-hidden"><div class="h-full ${pct >= 100 ? 'bg-rose-600' : 'bg-[#0D6E4E]'}" style="width:${pct}%"></div></div></div>`;
        }).join('')}
      </div>`;
  } else if (tab === 'goals') {
    el.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-3"><h3 class="text-sm font-bold">Tujuan Tabungan</h3>${appState.goals.map((g) => `<div class="rounded-xl border border-[#EFECE4] p-3 space-y-1.5"><div class="flex justify-between text-xs"><span class="font-bold">${escapeHtml(g.name)}</span><span class="font-semibold text-[#0D6E4E]">${Math.round(g.saved / g.target * 100)}%</span></div><div class="h-2 w-full rounded-full bg-[#EFECE4] overflow-hidden"><div class="h-full bg-[#0D6E4E]" style="width:${Math.min(100, Math.round(g.saved / g.target * 100))}%"></div></div><p class="text-[11px] text-[#6B6B64] tabular-nums">${fmtRp(g.saved)} / ${fmtRp(g.target)}</p></div>`).join('')}</div>`;
  } else if (tab === 'debt') {
    el.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-3"><h3 class="text-sm font-bold">Utang & Cicilan (Snowball & Avalanche)</h3>${appState.debts.map((d) => `<div class="rounded-xl border border-[#EFECE4] p-3 flex justify-between items-center text-xs"><div><p class="font-bold">${escapeHtml(d.name)}</p><p class="text-[11px] text-[#6B6B64]">Bunga ${d.rate}% • ${fmtRp(d.monthly)}/bln</p></div><span class="font-bold text-rose-600 tabular-nums">${fmtRp(d.remaining)}</span></div>`).join('')}</div>`;
  } else if (tab === 'bills') {
    el.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-3"><h3 class="text-sm font-bold">Tagihan & Langganan</h3>${appState.bills.map((b) => `<div class="rounded-xl border border-[#EFECE4] p-3 flex justify-between items-center text-xs"><div><p class="font-bold">${escapeHtml(b.name)}</p><p class="text-[11px] text-[#6B6B64]">Tgl ${b.dueDay} • ${fmtRp(b.amount)}</p></div><button type="button" data-paybill="${b.id}" ${b.paidThisMonth ? 'disabled' : ''} class="rounded-lg px-3 py-1.5 font-semibold ${b.paidThisMonth ? 'bg-[#E6F2ED] text-[#0D6E4E]' : 'bg-[#0D6E4E] text-white'}">${b.paidThisMonth ? 'Lunas' : 'Bayar'}</button></div>`).join('')}</div>`;
    el.querySelectorAll('[data-paybill]').forEach((btn) => btn.addEventListener('click', () => {
      const b = appState.bills.find((x) => x.id === btn.dataset.paybill);
      if (!b || b.paidThisMonth) return;
      b.paidThisMonth = true;
      appState.transactions.unshift({ id: 'TX-' + Date.now(), type: 'pengeluaran', nws: 'Need', tanggal: getTodayYMD(), kategori: b.category, nominal: b.amount, walletId: 'W-1', catatan: 'Bayar: ' + b.name, space: appState.activeSpace });
      saveState(); renderPlan(); renderDashboard(); toast(`Tagihan ${b.name} dibayar`, 'success');
    }));
  } else if (tab === 'sim') {
    el.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-3"><h3 class="text-sm font-bold">Kalkulator KPR</h3><div class="grid grid-cols-3 gap-2"><div><label class="text-[10px] font-semibold text-[#6B6B64]">Pinjaman</label><input id="kprP" type="number" value="400000000" class="w-full rounded-lg border p-1.5 text-xs font-bold" /></div><div><label class="text-[10px] font-semibold text-[#6B6B64]">Bunga %</label><input id="kprR" type="number" value="7.5" step="0.1" class="w-full rounded-lg border p-1.5 text-xs font-bold" /></div><div><label class="text-[10px] font-semibold text-[#6B6B64]">Tenor (Thn)</label><input id="kprT" type="number" value="15" class="w-full rounded-lg border p-1.5 text-xs font-bold" /></div></div><button id="btnCalcKpr" type="button" class="w-full rounded-lg bg-[#0D6E4E] py-2 text-xs font-semibold text-white">Hitung Cicilan</button><p id="kprOut" class="text-xs font-semibold text-[#0D6E4E]"></p></div>`;
    document.getElementById('btnCalcKpr').addEventListener('click', () => {
      const P = Number(document.getElementById('kprP').value) || 0, r = ((Number(document.getElementById('kprR').value) || 0) / 100) / 12, n = (Number(document.getElementById('kprT').value) || 1) * 12;
      const m = r > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
      document.getElementById('kprOut').textContent = `Estimasi cicilan: ${fmtRp(m)} / bulan`;
    });
  }
}

/* ---------------- HUB MODULES ---------------- */
const HUB_MODULES = [
  { id: 'wallets', title: 'Dompet & Mata Uang', desc: 'Rekening, kurs & rekonsiliasi' },
  { id: 'assets', title: 'Aset & Investasi', desc: 'Saham, emas, SBN & DCA' },
  { id: 'reports', title: 'Laporan & Ekspor', desc: 'Laba-rugi, neraca & PDF/CSV' },
  { id: 'family', title: 'Keluarga & Split Bill', desc: 'Ruang bersama & patungan' },
  { id: 'tax', title: 'Pajak, Zakat & Brankas', desc: 'SPT, zakat 2.5% & dokumen' },
  { id: 'integrations', title: 'Bank, E-Wallet & Sheets', desc: 'Koneksi bank RI, webhook & CSV' },
  { id: 'security', title: 'Keamanan & UU PDP', desc: 'PIN kunci, backup & hapus data' },
  { id: 'admin', title: 'Admin & Feature Flag', desc: 'Panel kontrol & tips edukasi' }
];

function renderHub() {
  document.getElementById('hubGrid').innerHTML = HUB_MODULES.map((m) => `<button type="button" data-openhub="${m.id}" class="surface-card rounded-2xl p-3.5 text-left hover:border-[#0D6E4E]"><p class="text-xs font-bold text-[#181816]">${m.title}</p><p class="mt-1 text-[11px] text-[#6B6B64]">${m.desc}</p></button>`).join('');
}

function openHubDetail(id) {
  uiState.hubModule = id;
  document.getElementById('hubMenu').classList.add('hidden');
  document.getElementById('hubDetail').classList.remove('hidden');
  const body = document.getElementById('hubDetailBody');
  if (id === 'wallets') {
    body.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-3"><h3 class="text-sm font-bold">Dompet & Multi-Mata Uang</h3>${appState.wallets.map((w) => `<div class="flex justify-between border-b border-[#EFECE4] pb-2 text-xs"><div><p class="font-semibold">${escapeHtml(w.name)} (${w.currency})</p><p class="text-[11px] text-[#6B6B64]">${w.type}</p></div><span class="font-bold tabular-nums">${w.currency === 'IDR' ? fmtRp(w.balance) : `${w.currency} ${w.balance}`}</span></div>`).join('')}</div>`;
  } else if (id === 'assets') {
    body.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-3"><h3 class="text-sm font-bold">Aset & Investasi</h3>${appState.assets.map((a) => `<div class="flex justify-between border-b border-[#EFECE4] pb-2 text-xs"><div><p class="font-semibold">${escapeHtml(a.name)}</p><p class="text-[11px] text-[#6B6B64]">${a.kind}</p></div><span class="font-bold tabular-nums text-[#0D6E4E]">${fmtRp(a.current)}</span></div>`).join('')}</div>`;
  } else if (id === 'reports') {
    body.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-3"><h3 class="text-sm font-bold">Ekspor Laporan</h3><div class="flex gap-2"><button id="btnPrintPdf" type="button" class="flex-1 rounded-lg bg-[#0D6E4E] py-2 text-xs font-semibold text-white">Cetak / PDF</button><button id="btnHubExportCsv" type="button" class="flex-1 rounded-lg border border-[#E5E3DC] py-2 text-xs font-semibold">Ekspor CSV</button></div></div>`;
    document.getElementById('btnPrintPdf').addEventListener('click', () => window.print());
    document.getElementById('btnHubExportCsv').addEventListener('click', exportTransactionsCsv);
  } else if (id === 'family') {
    body.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-3"><h3 class="text-sm font-bold">Ruang Keluarga & Split Bill</h3><div class="flex gap-2">${appState.spaces.map((s) => `<button type="button" data-setspace="${s.name}" class="flex-1 rounded-lg border py-2 text-xs font-semibold ${appState.activeSpace === s.name ? 'bg-[#0D6E4E] text-white' : 'bg-white'}">${s.name}</button>`).join('')}</div><div class="grid grid-cols-2 gap-2"><input id="sbTotal" type="number" value="250000" class="rounded-lg border p-2 text-xs font-bold" /><input id="sbPeople" type="number" value="4" class="rounded-lg border p-2 text-xs font-bold" /></div><button id="btnCalcSb" type="button" class="w-full rounded-lg bg-[#0D6E4E] py-2 text-xs font-semibold text-white">Hitung Patungan</button><p id="sbOut" class="text-xs font-semibold text-[#0D6E4E]"></p></div>`;
    body.querySelectorAll('[data-setspace]').forEach((b) => b.addEventListener('click', () => { appState.activeSpace = b.dataset.setspace; saveState(); openHubDetail('family'); renderDashboard(); }));
    document.getElementById('btnCalcSb').addEventListener('click', () => { document.getElementById('sbOut').textContent = `Per orang: ${fmtRp((Number(document.getElementById('sbTotal').value) || 0) / Math.max(1, Number(document.getElementById('sbPeople').value) || 1))}`; });
  } else if (id === 'tax') {
    const inc = appState.transactions.filter((t) => t.type === 'pemasukan').reduce((s, t) => s + Number(t.nominal), 0);
    body.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-2 text-xs"><h3 class="text-sm font-bold">Pajak SPT & Zakat (2.5%)</h3><p>Total Penghasilan: <strong>${fmtRp(inc)}</strong></p><p>Estimasi Zakat: <strong class="text-[#0D6E4E]">${fmtRp(inc * 0.025)}</strong></p></div>`;
  } else if (id === 'integrations') {
    const idBanks = ['BCA', 'BRI', 'Bank Mandiri', 'BNI', 'BTN', 'BSI', 'CIMB Niaga', 'Permata', 'Bank Jago', 'SeaBank', 'Blu by BCA', 'Jenius (SMBC)', 'Neobank (BNC)', 'Superbank', 'Krom Bank'];
    const idWallets = ['GoPay', 'OVO', 'DANA', 'ShopeePay', 'LinkAja', 'AstraPay', 'i.saku', 'DOKU'];
    body.innerHTML = `
      <div class="surface-card rounded-2xl p-4 space-y-3">
        <h3 class="text-sm font-bold">1. Koneksi Google Sheets</h3>
        <input id="hubApiUrl" type="url" value="${escapeHtml(appState.apiUrl)}" placeholder="URL Web App Apps Script (.../exec)" class="w-full rounded-lg border p-2 text-xs" />
        <input id="hubApiToken" type="password" value="${escapeHtml(appState.apiToken)}" placeholder="API Token Rahasia" class="w-full rounded-lg border p-2 text-xs" />
        <button id="btnHubSaveSheets" type="button" class="w-full rounded-lg bg-[#0D6E4E] py-2 text-xs font-semibold text-white">Simpan & Sinkronkan</button>
      </div>
      <div class="surface-card rounded-2xl p-4 space-y-3">
        <h3 class="text-sm font-bold">2. Tambah Provider Bank & E-Wallet Indonesia</h3>
        <p class="text-[11px] text-[#6B6B64]">Pilih bank umum/digital atau dompet digital berizin BI untuk dihubungkan sebagai dompet terpisah:</p>
        <div class="grid grid-cols-2 gap-2">
          <select id="idProviderSelect" class="rounded-lg border p-2 text-xs font-semibold">
            <optgroup label="Bank Umum & Digital Indonesia">${idBanks.map(b => `<option value="${b}|Rekening Bank">${b}</option>`).join('')}</optgroup>
            <optgroup label="E-Wallet Berizin BI">${idWallets.map(w => `<option value="${w}|E-Wallet">${w}</option>`).join('')}</optgroup>
          </select>
          <button id="btnAddIdProvider" type="button" class="rounded-lg bg-[#0D6E4E] text-xs font-semibold text-white">+ Tambah Akun</button>
        </div>
      </div>
      <div class="surface-card rounded-2xl p-4 space-y-2">
        <h3 class="text-sm font-bold">3. Auto-Sync Mutasi (Webhook SNAP / Notifikasi HP)</h3>
        <p class="text-[11px] text-[#6B6B64]">Kirim POST JSON dari agregator Open Banking (Brick/Ayoconnect) atau aplikasi penerus notifikasi Android (MacroDroid/Tasker) ke URL Apps Script-mu:</p>
        <pre class="overflow-x-auto rounded-lg bg-[#FAF9F6] border border-[#E5E3DC] p-2.5 text-[10px] text-[#181816]">{"token":"API_TOKEN","action":"bankWebhook","provider":"BCA","direction":"debit","nominal":50000,"kategori":"Makan & Minum","catatan":"QRIS Merchant"}</pre>
      </div>`;
    document.getElementById('btnHubSaveSheets').addEventListener('click', async () => { appState.apiUrl = document.getElementById('hubApiUrl').value.trim(); appState.apiToken = document.getElementById('hubApiToken').value.trim(); saveState(); await syncFromSheets(); toast('Tersimpan', 'success'); });
    document.getElementById('btnAddIdProvider').addEventListener('click', () => {
      const [pName, pType] = document.getElementById('idProviderSelect').value.split('|');
      if (appState.wallets.some(w => w.name === pName)) return toast(pName + ' sudah ada di daftar dompet', 'error');
      appState.wallets.push({ id: 'W-' + Date.now(), name: pName, type: pType, currency: 'IDR', balance: 0, archived: false });
      saveState(); renderDashboard(); toast(pName + ' ditambahkan sebagai dompet', 'success');
    });
  } else if (id === 'security') {
    body.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-3"><h3 class="text-sm font-bold">Keamanan & Privasi (UU PDP)</h3><div class="flex gap-2"><input id="setPinInput" type="password" maxlength="6" value="${escapeHtml(appState.profile.pin)}" placeholder="Set PIN (4-6 digit)" class="flex-1 rounded-lg border p-2 text-xs" /><button id="btnSavePin" type="button" class="rounded-lg bg-[#0D6E4E] px-3 text-xs font-semibold text-white">Simpan</button></div><div class="flex gap-2"><button id="btnDownloadBackup" type="button" class="flex-1 rounded-lg border py-2 text-xs font-semibold">Cadangan JSON</button><button id="btnWipeData" type="button" class="flex-1 rounded-lg bg-rose-600 py-2 text-xs font-semibold text-white">Reset Data</button></div></div>`;
    document.getElementById('btnSavePin').addEventListener('click', () => { appState.profile.pin = document.getElementById('setPinInput').value.trim(); saveState(); toast('PIN diperbarui', 'success'); });
    document.getElementById('btnDownloadBackup').addEventListener('click', () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' })); a.download = `dompetku-backup-${getTodayYMD()}.json`; a.click(); });
    document.getElementById('btnWipeData').addEventListener('click', () => { appState = defaultState(); saveState(); renderAll(); toast('Data direset', 'dark'); });
  } else if (id === 'admin') {
    body.innerHTML = `<div class="surface-card rounded-2xl p-4 space-y-2 text-xs"><h3 class="text-sm font-bold">Admin & Feature Flag</h3>${Object.entries(appState.featureFlags).map(([k, v]) => `<label class="flex justify-between border-b border-[#EFECE4] pb-1.5"><span>${k}</span><input type="checkbox" data-flag="${k}" ${v ? 'checked' : ''} class="accent-[#0D6E4E]" /></label>`).join('')}</div>`;
    body.querySelectorAll('[data-flag]').forEach((cb) => cb.addEventListener('change', (e) => { appState.featureFlags[e.target.dataset.flag] = e.target.checked; saveState(); renderDashboard(); }));
  }
}

async function syncFromSheets() {
  if (!appState.apiUrl || !appState.apiToken) return renderAll();
  document.getElementById('syncIcon').classList.add('animate-spin');
  try {
    const res = await fetch(`${appState.apiUrl}?action=getAll&token=${encodeURIComponent(appState.apiToken)}`, { redirect: 'follow' });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) { appState.transactions = json.data.map((t) => ({ ...t, walletId: 'W-1', nws: 'Need', space: 'Pribadi' })); saveState(); renderAll(); toast('Sinkronisasi berhasil', 'success'); }
  } catch (err) { toast('Gagal: ' + err.message, 'error'); }
  finally { document.getElementById('syncIcon').classList.remove('animate-spin'); }
}

function exportTransactionsCsv() {
  const rows = [['ID', 'Tanggal', 'Jenis', 'Tipe', 'Kategori', 'Nominal', 'Catatan']].concat(appState.transactions.map((t) => [t.id, t.tanggal, t.type, t.nws || 'Need', t.kategori, t.nominal, `"${String(t.catatan || '').replace(/"/g, '""')}"`]));
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' })); a.download = `dompetku-${getTodayYMD()}.csv`; a.click();
}

/* ---------------- BUILT-IN NUMPAD CALCULATOR & TX MODAL ---------------- */
function evaluateCalcExpr(expr) {
  try {
    const sanitized = String(expr).replace(/[^0-9+\-]/g, '');
    if (!sanitized) return 0;
    const parts = sanitized.split(/(?=[+\-])/).map(Number);
    return Math.max(0, Math.round(parts.reduce((s, v) => s + (isNaN(v) ? 0 : v), 0)));
  } catch (_) { return 0; }
}

function openTxModal(tx = null) {
  const m = document.getElementById('txModal');
  document.getElementById('txNominalError').classList.add('hidden');
  const wOpts = appState.wallets.filter((w) => !w.archived).map((w) => `<option value="${w.id}">${escapeHtml(w.name)}</option>`).join('');
  document.getElementById('txWallet').innerHTML = wOpts;
  document.getElementById('txToWallet').innerHTML = wOpts;
  if (tx) {
    document.getElementById('txModalTitle').textContent = 'Edit Transaksi';
    document.getElementById('txId').value = tx.id;
    uiState.calcExpr = String(tx.nominal);
    document.getElementById('txTanggal').value = tx.tanggal;
    document.getElementById('txCatatan').value = tx.catatan || '';
    document.getElementById('txWallet').value = tx.walletId || 'W-1';
    uiState.formCategory = tx.kategori;
    uiState.formNws = tx.nws || 'Need';
    setFormType(tx.type);
  } else {
    document.getElementById('txModalTitle').textContent = 'Catat Transaksi';
    document.getElementById('txId').value = '';
    uiState.calcExpr = '0';
    document.getElementById('txTanggal').value = getTodayYMD();
    document.getElementById('txCatatan').value = '';
    uiState.formCategory = CATEGORIES.pengeluaran[0];
    uiState.formNws = 'Need';
    setFormType('pengeluaran');
  }
  document.getElementById('txNominalExpr').value = uiState.calcExpr;
  document.querySelectorAll('.nws-btn').forEach((b) => b.classList.toggle('active', b.dataset.nws === uiState.formNws));
  m.classList.remove('hidden'); m.classList.add('flex');
}

function setFormType(type) {
  uiState.formType = type;
  document.querySelectorAll('.tx-type-btn').forEach((b) => {
    b.className = 'tx-type-btn';
    if (b.dataset.txtype === type) b.classList.add(type === 'pemasukan' ? 'active-income' : type === 'transfer' ? 'active-transfer' : 'active-expense');
  });
  document.getElementById('txToWalletWrap').classList.toggle('hidden', type !== 'transfer');
  const list = CATEGORIES[type] || CATEGORIES.pengeluaran;
  if (!list.includes(uiState.formCategory)) uiState.formCategory = list[0];
  document.getElementById('txCategoryGrid').innerHTML = list.map((c) => `<button type="button" data-cat="${escapeHtml(c)}" class="cat-pill ${c === uiState.formCategory ? 'active' : ''}">${renderIcon(c, 'h-3.5 w-3.5')}<span>${escapeHtml(c)}</span></button>`).join('');
}

function renderAll() {
  renderDashboard();
  renderHistory();
  if (uiState.view === 'plan') renderPlan();
  if (uiState.view === 'hub') renderHub();
}

function switchView(v) {
  uiState.view = v;
  document.querySelectorAll('.view-panel').forEach((p) => p.classList.add('hidden'));
  document.getElementById(`view-${v}`).classList.remove('hidden');
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.nav === v));
  if (v === 'plan') renderPlan();
  if (v === 'hub') { document.getElementById('hubMenu').classList.remove('hidden'); document.getElementById('hubDetail').classList.add('hidden'); renderHub(); }
}

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  if (appState.profile.pin) { const pm = document.getElementById('pinLockModal'); pm.classList.remove('hidden'); pm.classList.add('flex'); }
  document.getElementById('btnUnlockApp').addEventListener('click', () => {
    if (document.getElementById('pinUnlockInput').value === appState.profile.pin) { document.getElementById('pinLockModal').classList.add('hidden'); document.getElementById('pinLockModal').classList.remove('flex'); } else toast('PIN salah', 'error');
  });

  document.querySelectorAll('.nav-btn').forEach((b) => b.addEventListener('click', () => switchView(b.dataset.nav)));
  document.getElementById('btnGoHistory').addEventListener('click', () => switchView('history'));
  document.getElementById('chipLaporan').addEventListener('click', () => { uiState.planTab = 'compare'; switchView('plan'); });
  document.getElementById('btnHeaderAdd').addEventListener('click', () => openTxModal());
  document.getElementById('btnCloseTxModal').addEventListener('click', () => { document.getElementById('txModal').classList.add('hidden'); document.getElementById('txModal').classList.remove('flex'); });
  document.getElementById('btnThemeToggle').addEventListener('click', () => { appState.darkMode = !appState.darkMode; saveState(); renderDashboard(); });
  document.getElementById('btnSync').addEventListener('click', syncFromSheets);
  document.getElementById('btnTogglePrivacy').addEventListener('click', () => { appState.privacyHidden = !appState.privacyHidden; saveState(); renderDashboard(); });

  document.getElementById('btnPrevMonth').addEventListener('click', () => { uiState.selectedMonth = (uiState.selectedMonth + 11) % 12; renderAll(); });
  document.getElementById('btnNextMonth').addEventListener('click', () => { uiState.selectedMonth = (uiState.selectedMonth + 1) % 12; renderAll(); });
  document.getElementById('btnEditDailyBudget').addEventListener('click', () => {
    appState.dailyBudgetLimit = appState.dailyBudgetLimit === 150000 ? 250000 : 150000;
    saveState(); renderDashboard(); toast(`Budget harian diatur ke ${fmtRp(appState.dailyBudgetLimit)}`, 'success');
  });

  document.getElementById('quickNlpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const parsed = parseNlpInput(document.getElementById('quickNlpInput').value);
    if (!parsed) return toast('Contoh format: "Makan siang 35rb"', 'error');
    appState.transactions.unshift(parsed);
    const w = appState.wallets.find((x) => x.id === parsed.walletId);
    if (w) w.balance += (parsed.type === 'pemasukan' ? parsed.nominal : -parsed.nominal);
    document.getElementById('quickNlpInput').value = '';
    saveState(); renderAll(); toast(`Tercatat: ${parsed.kategori} ${fmtRp(parsed.nominal)}`, 'success');
  });

  // Transaction sub-tabs (Harian | Kalender | Bulanan | Catatan)
  document.querySelectorAll('[data-txview]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-txview]').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    const v = b.dataset.txview;
    document.getElementById('txViewDaily').classList.toggle('hidden', v !== 'daily');
    document.getElementById('txViewCalendar').classList.toggle('hidden', v !== 'calendar');
    document.getElementById('txViewMonthly').classList.toggle('hidden', v !== 'monthly');
    document.getElementById('txViewNotes').classList.toggle('hidden', v !== 'notes');
  }));
  document.getElementById('monthlyNoteInput').addEventListener('input', (e) => { appState.monthlyNotes[getMonthPrefix(uiState.selectedYear, uiState.selectedMonth)] = e.target.value; saveState(); });

  // Numpad & Need/Want/Saving
  document.querySelectorAll('.nws-btn').forEach((b) => b.addEventListener('click', () => {
    uiState.formNws = b.dataset.nws;
    document.querySelectorAll('.nws-btn').forEach((x) => x.classList.toggle('active', x.dataset.nws === uiState.formNws));
  }));
  document.querySelectorAll('.numpad-key').forEach((k) => k.addEventListener('click', () => {
    const key = k.dataset.key;
    if (key === 'DEL') uiState.calcExpr = uiState.calcExpr.length > 1 ? uiState.calcExpr.slice(0, -1) : '0';
    else if (key === '=') uiState.calcExpr = String(evaluateCalcExpr(uiState.calcExpr));
    else if (uiState.calcExpr === '0' && key !== '+' && key !== '-') uiState.calcExpr = key === '000' ? '0' : key;
    else uiState.calcExpr += key;
    document.getElementById('txNominalExpr').value = uiState.calcExpr;
    document.getElementById('txNominalError').classList.add('hidden');
  }));

  document.querySelectorAll('[data-ptab]').forEach((p) => p.addEventListener('click', () => {
    document.querySelectorAll('[data-ptab]').forEach((x) => x.classList.remove('active'));
    p.classList.add('active'); uiState.planTab = p.dataset.ptab; renderPlan();
  }));
  document.querySelectorAll('.tx-type-btn').forEach((b) => b.addEventListener('click', () => setFormType(b.dataset.txtype)));
  document.getElementById('txCategoryGrid').addEventListener('click', (e) => { const btn = e.target.closest('.cat-pill'); if (btn) { uiState.formCategory = btn.dataset.cat; setFormType(uiState.formType); } });

  document.getElementById('txForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = evaluateCalcExpr(uiState.calcExpr);
    if (!nom || nom <= 0) return document.getElementById('txNominalError').classList.remove('hidden');
    const id = document.getElementById('txId').value;
    const wId = document.getElementById('txWallet').value;
    const tx = { id: id || 'TX-' + Date.now(), type: uiState.formType, nws: uiState.formNws, tanggal: document.getElementById('txTanggal').value || getTodayYMD(), kategori: uiState.formCategory, nominal: nom, walletId: wId, catatan: document.getElementById('txCatatan').value.trim(), space: appState.activeSpace };
    if (id) { const idx = appState.transactions.findIndex((t) => t.id === id); if (idx !== -1) appState.transactions[idx] = tx; }
    else { appState.transactions.unshift(tx); const w = appState.wallets.find((x) => x.id === wId); if (w) w.balance += (tx.type === 'pemasukan' ? nom : -nom); }
    saveState(); document.getElementById('txModal').classList.add('hidden'); document.getElementById('txModal').classList.remove('flex'); renderAll(); toast('Transaksi tersimpan', 'success');
  });

  document.getElementById('historySearch').addEventListener('input', renderHistory);
  document.getElementById('historyTypeFilter').addEventListener('change', renderHistory);
  document.getElementById('historyWalletFilter').addEventListener('change', renderHistory);
  document.getElementById('historyCategoryFilter').addEventListener('change', renderHistory);
  document.getElementById('btnExportCsv').addEventListener('click', exportTransactionsCsv);
  document.getElementById('btnImportCsvOpen').addEventListener('click', () => { document.getElementById('csvModal').classList.remove('hidden'); document.getElementById('csvModal').classList.add('flex'); });
  document.getElementById('btnCloseCsvModal').addEventListener('click', () => { document.getElementById('csvModal').classList.add('hidden'); document.getElementById('csvModal').classList.remove('flex'); });
  document.getElementById('csvFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result).split(/\r?\n/).slice(1).filter(Boolean);
      let added = 0;
      lines.forEach((ln) => { const cols = ln.split(','); if (cols.length >= 4 && Number(cols[3]) > 0) { appState.transactions.unshift({ id: 'CSV-' + Date.now() + '-' + added, tanggal: cols[0].trim(), type: cols[1].trim() === 'pemasukan' ? 'pemasukan' : 'pengeluaran', nws: 'Need', kategori: cols[2].trim(), nominal: Number(cols[3]), catatan: (cols[4] || '').replace(/"/g, ''), walletId: 'W-1', space: 'Pribadi' }); added++; } });
      saveState(); renderAll(); document.getElementById('csvModal').classList.add('hidden'); toast(`${added} transaksi diimpor`, 'success');
    };
    reader.readAsText(file);
  });

  document.getElementById('btnToggleBulk').addEventListener('click', () => { uiState.bulkMode = !uiState.bulkMode; uiState.selectedIds.clear(); document.getElementById('bulkActionBar').classList.toggle('hidden', !uiState.bulkMode); document.getElementById('bulkActionBar').classList.toggle('flex', uiState.bulkMode); renderHistory(); });
  document.getElementById('btnBulkDelete').addEventListener('click', () => { appState.transactions = appState.transactions.filter((t) => !uiState.selectedIds.has(t.id)); uiState.selectedIds.clear(); saveState(); renderAll(); toast('Transaksi dihapus', 'success'); });

  document.addEventListener('click', (e) => {
    const calBtn = e.target.closest('[data-calday]');
    if (calBtn) { uiState.selectedCalDay = Number(calBtn.dataset.calday); renderHistory(); return; }
    const mBtn = e.target.closest('[data-pickmonth]');
    if (mBtn) { uiState.selectedMonth = Number(mBtn.dataset.pickmonth); renderAll(); return; }
    const planBtn = e.target.closest('[data-openplan]');
    if (planBtn) { uiState.planTab = planBtn.dataset.openplan; switchView('plan'); return; }
    const hubBtn = e.target.closest('[data-openhub]');
    if (hubBtn) { switchView('hub'); openHubDetail(hubBtn.dataset.openhub); return; }
    const editBtn = e.target.closest('[data-edit]');
    if (editBtn) { const tx = appState.transactions.find((t) => t.id === editBtn.dataset.edit); if (tx) openTxModal(tx); return; }
    const delBtn = e.target.closest('[data-del]');
    if (delBtn) { uiState.pendingDeleteId = delBtn.dataset.del; document.getElementById('deleteModal').classList.remove('hidden'); document.getElementById('deleteModal').classList.add('flex'); return; }
    const bulkCb = e.target.closest('[data-bulkid]');
    if (bulkCb) { if (bulkCb.checked) uiState.selectedIds.add(bulkCb.dataset.bulkid); else uiState.selectedIds.delete(bulkCb.dataset.bulkid); document.getElementById('bulkCountLabel').textContent = `${uiState.selectedIds.size} dipilih`; }
  });

  document.getElementById('btnHubBack').addEventListener('click', () => { document.getElementById('hubDetail').classList.add('hidden'); document.getElementById('hubMenu').classList.remove('hidden'); });
  document.getElementById('btnCancelDelete').addEventListener('click', () => { document.getElementById('deleteModal').classList.add('hidden'); document.getElementById('deleteModal').classList.remove('flex'); });
  document.getElementById('btnConfirmDelete').addEventListener('click', () => { appState.transactions = appState.transactions.filter((t) => t.id !== uiState.pendingDeleteId); saveState(); document.getElementById('deleteModal').classList.add('hidden'); document.getElementById('deleteModal').classList.remove('flex'); renderAll(); toast('Transaksi dihapus', 'success'); });

  renderAll();
});

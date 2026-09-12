import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Calculator,
  Check,
  ChevronDown,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileCheck2,
  Fingerprint,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type IconType = React.ComponentType<{ className?: string; strokeWidth?: number }>;
type StatusTone = "green" | "amber" | "blue";

type Customer = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  score: number;
  label: string;
  product: string;
  amount: string;
  updated: string;
  tone: StatusTone;
};

const customers: Customer[] = [
  {
    id: "MS-2401",
    name: "أحمد ولد محمد",
    initials: "أم",
    phone: "22 45 12 88",
    score: 742,
    label: "ممتاز",
    product: "BNPL • إلكترونيات",
    amount: "12,000 أوقية",
    updated: "منذ 12 دقيقة",
    tone: "green",
  },
  {
    id: "MS-2398",
    name: "فاطمة بنت المختار",
    initials: "فم",
    phone: "36 21 09 44",
    score: 681,
    label: "جيد",
    product: "تمويل شخصي",
    amount: "28,000 أوقية",
    updated: "منذ 38 دقيقة",
    tone: "blue",
  },
  {
    id: "MS-2397",
    name: "محمد الأمين سيدي",
    initials: "مس",
    phone: "45 88 13 02",
    score: 612,
    label: "مراجعة",
    product: "BNPL • هاتف",
    amount: "8,500 أوقية",
    updated: "منذ ساعة",
    tone: "amber",
  },
  {
    id: "MS-2394",
    name: "مريم عبد الله",
    initials: "مع",
    phone: "20 74 18 63",
    score: 756,
    label: "ممتاز",
    product: "قرض مشروع صغير",
    amount: "65,000 أوقية",
    updated: "منذ ساعتين",
    tone: "green",
  },
];

const navItems: { label: string; icon: IconType; active?: boolean; count?: string }[] = [
  { label: "نظرة عامة", icon: LayoutDashboard, active: true },
  { label: "طلبات الائتمان", icon: FileCheck2, count: "24" },
  { label: "العملاء", icon: Users },
  { label: "تحليل المخاطر", icon: BarChart3 },
];

const secondaryItems: { label: string; icon: IconType }[] = [
  { label: "قواعد التقييم", icon: SlidersHorizontal },
  { label: "سجل الموافقات", icon: Fingerprint },
  { label: "إعدادات المؤسسة", icon: Settings2 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatScore(value: number) {
  return new Intl.NumberFormat("ar-MR").format(value);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MauriScore — ذكاء ائتماني لموريتانيا" },
      {
        name: "description",
        content: "نموذج تجريبي لمنصة MauriScore لتقييم الجدارة الائتمانية بموافقة العميل.",
      },
      { property: "og:title", content: "MauriScore — ذكاء ائتماني لموريتانيا" },
      {
        property: "og:description",
        content: "لوحة تجريبية لدرجة ائتمانية قابلة للتفسير للمؤسسات المالية.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: MauriScorePrototype,
});

function MauriScorePrototype() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("نظرة عامة");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(customers[0].id);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [consent, setConsent] = useState(true);
  const [form, setForm] = useState({
    income: 18000,
    obligations: 4200,
    bankingMonths: 28,
    mobileMoney: 14,
    utilityPaid: true,
  });

  const filteredCustomers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return customers;
    return customers.filter((customer) =>
      `${customer.name} ${customer.id} ${customer.phone}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  const selectedCustomer = customers.find((customer) => customer.id === selectedId) ?? customers[0];

  const score = useMemo(() => {
    const debtRatio = form.income > 0 ? (form.obligations / form.income) * 100 : 100;
    return clamp(
      Math.round(
        620 +
          form.income / 1000 +
          (form.utilityPaid ? 52 : 18) +
          Math.min(form.bankingMonths, 36) * 2 +
          Math.min(form.mobileMoney, 24) * 1.2 -
          debtRatio * 1.25,
      ),
      300,
      850,
    );
  }, [form]);

  const scoreLabel = score >= 740 ? "ممتاز" : score >= 680 ? "جيد" : "مراجعة";
  const scoreTone = score >= 740 ? "green" : score >= 680 ? "blue" : "amber";
  const debtRatio = form.income > 0 ? Math.round((form.obligations / form.income) * 100) : 0;
  const stability = clamp(Math.round(52 + form.bankingMonths * 1.2), 0, 96);
  const paymentHistory = form.utilityPaid ? 88 : 58;
  const footprint = clamp(Math.round(42 + form.mobileMoney * 2), 0, 92);

  function updateNumber(
    key: "income" | "obligations" | "bankingMonths" | "mobileMoney",
    value: string,
  ) {
    setForm((current) => ({ ...current, [key]: Number(value) || 0 }));
    setCalculated(false);
  }

  function beginNewReview() {
    setShowCalculator(true);
    window.setTimeout(
      () => document.getElementById("score-calculator")?.scrollIntoView({ behavior: "smooth" }),
      20,
    );
  }

  return (
    <div dir="rtl" className="mauri-app min-h-screen bg-background text-foreground">
      <aside className={`mauri-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="mauri-brand">
          <div className="mauri-logo-mark">
            <span />
            <span />
            <span />
          </div>
          <div>
            <div className="mauri-brand-name">
              Mauri<span>Score</span>
            </div>
            <div className="mauri-brand-caption">ذكاء ائتماني موريتاني</div>
          </div>
          <button
            className="mauri-mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="إغلاق القائمة"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mauri-workspace">
          <div className="mauri-workspace-avatar">BM</div>
          <div className="min-w-0">
            <div className="mauri-workspace-label">مساحة العمل</div>
            <div className="truncate text-sm font-semibold text-white">بنك موريتانيا الجديد</div>
          </div>
          <ChevronDown className="mr-auto size-4 text-white/40" />
        </div>

        <div className="mauri-sidebar-label">المنصة</div>
        <nav className="mauri-nav" aria-label="التنقل الرئيسي">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`mauri-nav-item ${activeNav === item.label ? "active" : ""}`}
                onClick={() => {
                  setActiveNav(item.label);
                  setSidebarOpen(false);
                }}
              >
                <Icon className="size-[18px]" strokeWidth={1.8} />
                <span>{item.label}</span>
                {item.count && <span className="mauri-nav-count">{item.count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="mauri-sidebar-label mauri-sidebar-label-secondary">الإدارة</div>
        <nav className="mauri-nav" aria-label="الإدارة">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="mauri-nav-item"
                onClick={() => setActiveNav(item.label)}
              >
                <Icon className="size-[18px]" strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mauri-sidebar-bottom">
          <div className="mauri-security-card">
            <div className="mauri-security-icon">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">بياناتك محمية</div>
              <div className="mt-1 text-[10px] leading-4 text-white/45">
                تشفير وموافقة لكل عملية تحليل
              </div>
            </div>
          </div>
          <div className="mauri-user">
            <div className="mauri-user-avatar">م</div>
            <div className="min-w-0">
              <div className="truncate text-xs font-semibold text-white">محمد ولد أحمد</div>
              <div className="truncate text-[10px] text-white/45">مسؤول الائتمان</div>
            </div>
            <MoreHorizontal className="mr-auto size-4 text-white/35" />
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="mauri-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="إغلاق القائمة"
        />
      )}

      <main className="mauri-main">
        <header className="mauri-topbar">
          <div className="flex items-center gap-3">
            <button
              className="mauri-mobile-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="فتح القائمة"
            >
              <Menu className="size-5" />
            </button>
            <div className="mauri-breadcrumb">
              <span>الرئيسية</span>
              <span className="text-muted-foreground/40">/</span>
              <strong>{activeNav}</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="mauri-topbar-status">
              <span className="mauri-live-dot" /> النظام يعمل بشكل طبيعي
            </div>
            <button className="mauri-icon-button" aria-label="المساعدة">
              <CircleHelp className="size-[18px]" />
            </button>
            <button className="mauri-icon-button relative" aria-label="الإشعارات">
              <Bell className="size-[18px]" />
              <span className="mauri-notification-dot" />
            </button>
          </div>
        </header>

        <div className="mauri-content">
          <section className="mauri-welcome-row">
            <div>
              <div className="mauri-eyebrow">
                <span className="mauri-eyebrow-line" /> السبت، 12 سبتمبر 2026
              </div>
              <h1 className="mauri-title">
                صباح الخير، محمد <span>👋</span>
              </h1>
              <p className="mauri-subtitle">تابع طلبات الائتمان واتخذ قرارات أذكى بثقة.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="mauri-secondary-button"
                onClick={() => setShowCalculator((value) => !value)}
              >
                <Calculator className="size-4" />
                حاسبة النقاط
              </button>
              <button className="mauri-primary-button" onClick={beginNewReview}>
                <Plus className="size-4" strokeWidth={2.2} />
                دراسة جديدة
              </button>
            </div>
          </section>

          <section className="mauri-stats-grid" aria-label="المؤشرات الرئيسية">
            <StatCard
              icon={FileCheck2}
              label="طلبات هذا الشهر"
              value="128"
              delta="18.4%"
              note="مقارنة بالشهر الماضي"
              tone="blue"
            />
            <StatCard
              icon={Clock3}
              label="قيد المراجعة"
              value="24"
              delta="6.2%"
              note="من إجمالي الطلبات"
              tone="amber"
            />
            <StatCard
              icon={ShieldCheck}
              label="دقة التنبؤ"
              value="94.8%"
              delta="2.1%"
              note="آخر 30 يوماً"
              tone="green"
            />
            <StatCard
              icon={CircleDollarSign}
              label="قيمة التسهيلات"
              value="2.4M"
              suffix="أوقية"
              delta="12.8%"
              note="تمت الموافقة عليها"
              tone="violet"
            />
          </section>

          <section className="mauri-grid mauri-grid-top">
            <div className="mauri-panel mauri-score-panel">
              <div className="mauri-panel-heading">
                <div>
                  <div className="mauri-section-kicker">ملخص المحفظة</div>
                  <h2>توزيع الجدارة الائتمانية</h2>
                </div>
                <button className="mauri-filter-button">
                  <span>آخر 30 يوماً</span>
                  <ChevronDown className="size-3.5" />
                </button>
              </div>
              <div className="mauri-score-layout">
                <div
                  className="mauri-score-donut"
                  style={{ "--score-progress": "76%" } as React.CSSProperties}
                >
                  <div className="mauri-score-donut-inner">
                    <span className="mauri-score-donut-value">742</span>
                    <span className="mauri-score-donut-label">متوسط النقاط</span>
                  </div>
                </div>
                <div className="mauri-score-legend">
                  <LegendRow color="green" label="ممتاز" value="48%" count="61 طلب" />
                  <LegendRow color="blue" label="جيد" value="34%" count="43 طلب" />
                  <LegendRow color="amber" label="مراجعة" value="18%" count="24 طلب" />
                  <div className="mauri-score-insight">
                    <Sparkles className="size-3.5" /> تحسن متوسط النقاط بمقدار 6.3% هذا الشهر
                  </div>
                </div>
              </div>
              <div className="mauri-chart-wrap">
                <div className="mauri-chart-labels">
                  <span>نمو متوسط النقاط</span>
                  <span className="mauri-chart-period">يونيو — سبتمبر 2026</span>
                </div>
                <div className="mauri-bars" aria-label="مخطط نمو متوسط النقاط">
                  {[55, 60, 58, 64, 68, 66, 72, 74, 78, 76, 84, 88].map((height, index) => (
                    <div key={index} className="mauri-bar-column">
                      <div
                        className={`mauri-bar ${index === 11 ? "highlight" : ""}`}
                        style={{ height: `${height}%` }}
                      />
                      <span>
                        {["ي", "ي", "ي", "أ", "أ", "أ", "س", "س", "س", "ص", "ص", "ص"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mauri-panel mauri-activity-panel">
              <div className="mauri-panel-heading">
                <div>
                  <div className="mauri-section-kicker">نشاط اليوم</div>
                  <h2>آخر العمليات</h2>
                </div>
                <button
                  className="mauri-link-button"
                  onClick={() => setActiveNav("طلبات الائتمان")}
                >
                  عرض الكل <ArrowLeft className="size-3.5" />
                </button>
              </div>
              <div className="mauri-activity-list">
                <ActivityRow
                  icon={FileCheck2}
                  title="طلب ائتمان جديد"
                  desc="أحمد ولد محمد • BNPL"
                  time="منذ 12 دقيقة"
                  tone="green"
                />
                <ActivityRow
                  icon={ShieldCheck}
                  title="اكتملت الموافقة"
                  desc="فاطمة بنت المختار • تمويل شخصي"
                  time="منذ 38 دقيقة"
                  tone="blue"
                />
                <ActivityRow
                  icon={AlertTriangle}
                  title="تحتاج مراجعة يدوية"
                  desc="محمد الأمين سيدي • BNPL"
                  time="منذ ساعة"
                  tone="amber"
                />
                <ActivityRow
                  icon={Fingerprint}
                  title="تم تحديث موافقة بيانات"
                  desc="مريم عبد الله • سجل الدفع"
                  time="منذ ساعتين"
                  tone="violet"
                />
              </div>
              <div className="mauri-activity-footer">
                <Activity className="size-3.5" /> كل العمليات مسجلة ومشفرة
              </div>
            </div>
          </section>

          <section className="mauri-panel mauri-customer-panel">
            <div className="mauri-panel-heading mauri-customer-heading">
              <div>
                <div className="mauri-section-kicker">إدارة الطلبات</div>
                <h2>
                  طلبات الائتمان الأخيرة <span className="mauri-count-badge">24</span>
                </h2>
              </div>
              <div className="mauri-table-actions">
                <div className="mauri-search">
                  <Search className="size-4" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="ابحث عن عميل أو رقم طلب..."
                    aria-label="البحث في الطلبات"
                  />
                </div>
                <button className="mauri-icon-button table-filter" aria-label="تصفية الطلبات">
                  <SlidersHorizontal className="size-4" />
                </button>
                <button className="mauri-export-button">
                  <Download className="size-3.5" /> تصدير
                </button>
              </div>
            </div>
            <div className="mauri-table-scroll">
              <table className="mauri-table">
                <thead>
                  <tr>
                    <th>العميل</th>
                    <th>المنتج المطلوب</th>
                    <th>المبلغ</th>
                    <th>الدرجة الائتمانية</th>
                    <th>الحالة</th>
                    <th>آخر تحديث</th>
                    <th aria-label="إجراء" />
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className={selectedId === customer.id ? "selected" : ""}
                      onClick={() => setSelectedId(customer.id)}
                    >
                      <td>
                        <div className="mauri-customer-cell">
                          <div className={`mauri-customer-avatar avatar-${customer.tone}`}>
                            {customer.initials}
                          </div>
                          <div>
                            <div className="mauri-customer-name">{customer.name}</div>
                            <div className="mauri-customer-id">
                              {customer.id} <span>•</span> {customer.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="mauri-product">{customer.product}</span>
                      </td>
                      <td>
                        <span className="mauri-amount">{customer.amount}</span>
                      </td>
                      <td>
                        <div className="mauri-table-score">
                          <span>{customer.score}</span>
                          <div className={`mauri-score-track tone-${customer.tone}`}>
                            <span style={{ width: `${((customer.score - 300) / 550) * 100}%` }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`mauri-status status-${customer.tone}`}>
                          <span />
                          {customer.label}
                        </span>
                      </td>
                      <td>
                        <span className="mauri-updated">{customer.updated}</span>
                      </td>
                      <td>
                        <button className="mauri-row-action" aria-label={`عرض ${customer.name}`}>
                          <Eye className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCustomers.length === 0 && (
                <div className="mauri-empty">لا توجد طلبات تطابق بحثك.</div>
              )}
            </div>
            <div className="mauri-table-footer">
              <span>عرض {filteredCustomers.length} من 24 طلب</span>
              <button className="mauri-link-button">
                فتح إدارة الطلبات <ArrowLeft className="size-3.5" />
              </button>
            </div>
          </section>

          <section className="mauri-bottom-grid">
            <div className="mauri-panel mauri-how-panel">
              <div className="mauri-panel-heading">
                <div>
                  <div className="mauri-section-kicker">كيف يعمل MauriScore؟</div>
                  <h2>من البيانات إلى قرار أوضح</h2>
                </div>
                <div className="mauri-demo-badge">
                  <Sparkles className="size-3.5" /> نموذج تجريبي
                </div>
              </div>
              <div className="mauri-flow">
                <FlowStep
                  number="01"
                  icon={Users}
                  title="موافقة العميل"
                  desc="يختار العميل البيانات التي يسمح باستخدامها."
                />
                <div className="mauri-flow-arrow">
                  <ArrowDownLeft className="size-4" />
                </div>
                <FlowStep
                  number="02"
                  icon={Activity}
                  title="تحليل ذكي"
                  desc="نحلل إشارات السداد والدخل بشكل آمن."
                />
                <div className="mauri-flow-arrow">
                  <ArrowDownLeft className="size-4" />
                </div>
                <FlowStep
                  number="03"
                  icon={Gauge}
                  title="درجة قابلة للتفسير"
                  desc="تحصل المؤسسة على تقييم واضح ومبرر."
                />
              </div>
              <div className="mauri-disclaimer">
                <LockKeyhole className="size-3.5" />
                <span>
                  MauriScore لا يمنح القروض ولا يتخذ القرار النهائي. هو أداة مساعدة للمؤسسة المالية
                  فقط.
                </span>
              </div>
            </div>

            <div className="mauri-panel mauri-insight-panel">
              <div className="mauri-panel-heading">
                <div>
                  <div className="mauri-section-kicker">إشارة المحفظة</div>
                  <h2>فرصة شمول مالي</h2>
                </div>
                <div className="mauri-insight-icon">
                  <TrendingUp className="size-4" />
                </div>
              </div>
              <div className="mauri-insight-number">
                31<span>%</span>
              </div>
              <p>
                من المتقدمين هذا الشهر لا يملكون تاريخاً ائتمانياً تقليدياً كافياً، لكن لديهم إشارات
                سداد بديلة قابلة للتحليل.
              </p>
              <div className="mauri-insight-progress">
                <div>
                  <span>طلبات بدون سجل تقليدي</span>
                  <strong>40 من 128</strong>
                </div>
                <div className="mauri-progress-track">
                  <span style={{ width: "31%" }} />
                </div>
              </div>
              <button className="mauri-text-button" onClick={() => setActiveNav("تحليل المخاطر")}>
                استكشاف التحليل <ArrowLeft className="size-3.5" />
              </button>
            </div>
          </section>

          {showCalculator && (
            <section id="score-calculator" className="mauri-panel mauri-calculator-panel">
              <div className="mauri-panel-heading">
                <div>
                  <div className="mauri-section-kicker">محرك تجريبي</div>
                  <h2>احسب درجة MauriScore</h2>
                  <p className="mauri-panel-description">
                    عدّل المؤشرات وشاهد كيف تتغير النتيجة. هذه محاكاة تعليمية وليست قراراً
                    ائتمانياً.
                  </p>
                </div>
                <button
                  className="mauri-icon-button"
                  onClick={() => setShowCalculator(false)}
                  aria-label="إخفاء الحاسبة"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="mauri-calculator-grid">
                <div className="mauri-form-card">
                  <div className="mauri-form-grid">
                    <label className="mauri-field">
                      <span>
                        الدخل الشهري <small>أوقية</small>
                      </span>
                      <input
                        type="number"
                        value={form.income}
                        onChange={(event) => updateNumber("income", event.target.value)}
                        min="0"
                      />
                    </label>
                    <label className="mauri-field">
                      <span>
                        الالتزامات الشهرية <small>أوقية</small>
                      </span>
                      <input
                        type="number"
                        value={form.obligations}
                        onChange={(event) => updateNumber("obligations", event.target.value)}
                        min="0"
                      />
                    </label>
                    <label className="mauri-field">
                      <span>
                        مدة التعامل البنكي <small>شهر</small>
                      </span>
                      <input
                        type="number"
                        value={form.bankingMonths}
                        onChange={(event) => updateNumber("bankingMonths", event.target.value)}
                        min="0"
                        max="120"
                      />
                    </label>
                    <label className="mauri-field">
                      <span>
                        عمليات المحفظة الرقمية <small>آخر 6 أشهر</small>
                      </span>
                      <input
                        type="number"
                        value={form.mobileMoney}
                        onChange={(event) => updateNumber("mobileMoney", event.target.value)}
                        min="0"
                        max="100"
                      />
                    </label>
                  </div>
                  <label className="mauri-consent-row">
                    <input
                      type="checkbox"
                      checked={form.utilityPaid}
                      onChange={(event) => {
                        setForm((current) => ({ ...current, utilityPaid: event.target.checked }));
                        setCalculated(false);
                      }}
                    />
                    <span className="mauri-checkbox">
                      <Check className="size-3" />
                    </span>
                    <span>يوجد سجل منتظم لسداد فواتير الخدمات</span>
                  </label>
                  <label className="mauri-consent-row">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                    />
                    <span className="mauri-checkbox">
                      <Check className="size-3" />
                    </span>
                    <span>أوافق على استخدام هذه البيانات لأغراض التقييم فقط</span>
                  </label>
                  <button
                    className="mauri-primary-button w-full justify-center"
                    disabled={!consent}
                    onClick={() => setCalculated(true)}
                  >
                    <Calculator className="size-4" /> تحليل البيانات وحساب الدرجة
                  </button>
                </div>
                <div className="mauri-result-card">
                  <div className="mauri-result-top">
                    <span>النتيجة التقديرية</span>
                    <span className={`mauri-status status-${scoreTone}`}>
                      <span />
                      {scoreLabel}
                    </span>
                  </div>
                  <div className="mauri-result-score">
                    {formatScore(score)}
                    <small>/ 850</small>
                  </div>
                  <div className="mauri-result-track">
                    <span style={{ width: `${((score - 300) / 550) * 100}%` }} />
                  </div>
                  <div className="mauri-result-scale">
                    <span>مخاطر أعلى</span>
                    <span>مخاطر أقل</span>
                  </div>
                  <div className="mauri-result-factors">
                    <ResultFactor
                      label="نسبة الالتزامات"
                      value={`${debtRatio}%`}
                      score={clamp(100 - debtRatio * 1.6, 15, 96)}
                      tone={debtRatio < 35 ? "green" : "amber"}
                    />
                    <ResultFactor
                      label="استقرار التعامل"
                      value={`${stability}%`}
                      score={stability}
                      tone="blue"
                    />
                    <ResultFactor
                      label="سجل السداد البديل"
                      value={`${paymentHistory}%`}
                      score={paymentHistory}
                      tone={paymentHistory > 70 ? "green" : "amber"}
                    />
                    <ResultFactor
                      label="البصمة المالية"
                      value={`${footprint}%`}
                      score={footprint}
                      tone="violet"
                    />
                  </div>
                  {calculated && (
                    <div className="mauri-calculated-note">
                      <Check className="size-3.5" /> تم تحديث التقييم وفق البيانات المدخلة
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          <footer className="mauri-footer">
            <span>© 2026 MauriScore</span>
            <span className="mauri-footer-dot" />
            <span>نسخة تجريبية للعرض فقط</span>
            <span className="mauri-footer-spacer" />
            <span>آخر مزامنة: منذ دقيقتين</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  delta,
  note,
  tone,
}: {
  icon: IconType;
  label: string;
  value: string;
  suffix?: string;
  delta: string;
  note: string;
  tone: string;
}) {
  return (
    <div className="mauri-stat-card">
      <div className="mauri-stat-top">
        <div className={`mauri-stat-icon tone-${tone}`}>
          <Icon className="size-[18px]" />
        </div>
        <span className="mauri-stat-delta">
          <ArrowUpRight className="size-3" /> {delta}
        </span>
      </div>
      <div className="mauri-stat-value">
        {value} {suffix && <small>{suffix}</small>}
      </div>
      <div className="mauri-stat-label">{label}</div>
      <div className="mauri-stat-note">{note}</div>
    </div>
  );
}

function LegendRow({
  color,
  label,
  value,
  count,
}: {
  color: string;
  label: string;
  value: string;
  count: string;
}) {
  return (
    <div className="mauri-legend-row">
      <span className={`mauri-legend-dot ${color}`} />
      <span className="mauri-legend-label">{label}</span>
      <strong>{value}</strong>
      <span className="mauri-legend-count">{count}</span>
    </div>
  );
}

function ActivityRow({
  icon: Icon,
  title,
  desc,
  time,
  tone,
}: {
  icon: IconType;
  title: string;
  desc: string;
  time: string;
  tone: string;
}) {
  return (
    <div className="mauri-activity-row">
      <div className={`mauri-activity-icon tone-${tone}`}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mauri-activity-title">{title}</div>
        <div className="mauri-activity-desc">{desc}</div>
      </div>
      <span className="mauri-activity-time">{time}</span>
    </div>
  );
}

function FlowStep({
  number,
  icon: Icon,
  title,
  desc,
}: {
  number: string;
  icon: IconType;
  title: string;
  desc: string;
}) {
  return (
    <div className="mauri-flow-step">
      <div className="mauri-flow-top">
        <span>{number}</span>
        <div className="mauri-flow-icon">
          <Icon className="size-4" />
        </div>
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function ResultFactor({
  label,
  value,
  score,
  tone,
}: {
  label: string;
  value: string;
  score: number;
  tone: string;
}) {
  return (
    <div className="mauri-factor">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="mauri-factor-track">
        <span className={`factor-${tone}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default MauriScorePrototype;

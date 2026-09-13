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
import { useEffect, useMemo, useState } from "react";

type IconType = React.ComponentType<{ className?: string; strokeWidth?: number }>;
type StatusTone = "green" | "amber" | "blue";
type Language = "ar" | "fr";

const translations = {
  ar: {
    brandCaption: "ذكاء ائتماني موريتاني",
    workspace: "مساحة العمل",
    bank: "بنك موريتانيا الجديد",
    platform: "المنصة",
    management: "الإدارة",
    protected: "بياناتك محمية",
    protectedDesc: "تشفير وموافقة لكل عملية تحليل",
    creditOfficer: "مسؤول الائتمان",
    home: "الرئيسية",
    systemOk: "النظام يعمل بشكل طبيعي",
    help: "المساعدة",
    notifications: "الإشعارات",
    morning: "صباح الخير، محمد",
    subtitle: "تابع طلبات الائتمان واتخذ قرارات أذكى بثقة.",
    scoreCalculator: "حاسبة النقاط",
    newReview: "دراسة جديدة",
    monthlyRequests: "طلبات هذا الشهر",
    vsLastMonth: "مقارنة بالشهر الماضي",
    pending: "قيد المراجعة",
    totalRequests: "من إجمالي الطلبات",
    accuracy: "دقة التنبؤ",
    last30: "آخر 30 يوماً",
    facilities: "قيمة التسهيلات",
    approved: "تمت الموافقة عليها",
    portfolioSummary: "ملخص المحفظة",
    scoreDistribution: "توزيع الجدارة الائتمانية",
    avgScore: "متوسط النقاط",
    excellent: "ممتاز",
    good: "جيد",
    review: "مراجعة",
    scoreGrowth: "نمو متوسط النقاط",
    todayActivity: "نشاط اليوم",
    latestOperations: "آخر العمليات",
    viewAll: "عرض الكل",
    creditRequests: "طلبات الائتمان",
    requestManagement: "إدارة الطلبات",
    latestCreditRequests: "طلبات الائتمان الأخيرة",
    customer: "العميل",
    product: "المنتج المطلوب",
    amount: "المبلغ",
    creditScore: "الدرجة الائتمانية",
    status: "الحالة",
    lastUpdate: "آخر تحديث",
    export: "تصدير",
    searchPlaceholder: "ابحث عن عميل أو رقم طلب...",
    noResults: "لا توجد طلبات تطابق بحثك.",
    openManagement: "فتح إدارة الطلبات",
    howItWorks: "كيف يعمل MauriScore؟",
    clearerDecision: "من البيانات إلى قرار أوضح",
    demo: "نموذج تجريبي",
    consentStep: "موافقة العميل",
    consentDesc: "يختار العميل البيانات التي يسمح باستخدامها.",
    smartAnalysis: "تحليل ذكي",
    smartDesc: "نحلل إشارات السداد والدخل بشكل آمن.",
    explainableScore: "درجة قابلة للتفسير",
    explainableDesc: "تحصل المؤسسة على تقييم واضح ومبرر.",
    inclusionOpportunity: "فرصة شمول مالي",
    exploreAnalysis: "استكشاف التحليل",
    experimentalEngine: "محرك تجريبي",
    calculateScore: "احسب درجة MauriScore",
    educationalSimulation:
      "عدّل المؤشرات وشاهد كيف تتغير النتيجة. هذه محاكاة تعليمية وليست قراراً ائتمانياً.",
    monthlyIncome: "الدخل الشهري",
    monthlyObligations: "الالتزامات الشهرية",
    bankingMonths: "مدة التعامل البنكي",
    digitalWallet: "عمليات المحفظة الرقمية",
    month: "شهر",
    ouguiya: "أوقية",
    lastSixMonths: "آخر 6 أشهر",
    utilityHistory: "يوجد سجل منتظم لسداد فواتير الخدمات",
    consent: "أوافق على استخدام هذه البيانات لأغراض التقييم فقط",
    analyze: "تحليل البيانات وحساب الدرجة",
    estimatedResult: "النتيجة التقديرية",
    higherRisk: "مخاطر أعلى",
    lowerRisk: "مخاطر أقل",
    obligationRatio: "نسبة الالتزامات",
    relationshipStability: "استقرار التعامل",
    alternativeHistory: "سجل السداد البديل",
    financialFootprint: "البصمة المالية",
    scoreUpdated: "تم تحديث التقييم وفق البيانات المدخلة",
    prototypeOnly: "نسخة تجريبية للعرض فقط",
    lastSync: "آخر مزامنة: منذ دقيقتين",
    french: "Français",
  },
  fr: {
    brandCaption: "Intelligence de crédit mauritanienne",
    workspace: "Espace de travail",
    bank: "Banque de Mauritanie Nouvelle",
    platform: "Plateforme",
    management: "Administration",
    protected: "Données protégées",
    protectedDesc: "Chiffrement et consentement à chaque analyse",
    creditOfficer: "Responsable crédit",
    home: "Accueil",
    systemOk: "Système opérationnel",
    help: "Aide",
    notifications: "Notifications",
    morning: "Bonjour, Mohamed",
    subtitle: "Suivez les demandes de crédit et prenez de meilleures décisions.",
    scoreCalculator: "Calculateur de score",
    newReview: "Nouvelle étude",
    monthlyRequests: "Demandes ce mois",
    vsLastMonth: "vs. mois dernier",
    pending: "En revue",
    totalRequests: "du total des demandes",
    accuracy: "Précision prédictive",
    last30: "30 derniers jours",
    facilities: "Financements accordés",
    approved: "Montant approuvé",
    portfolioSummary: "Résumé du portefeuille",
    scoreDistribution: "Répartition de la solvabilité",
    avgScore: "Score moyen",
    excellent: "Excellent",
    good: "Bon",
    review: "À revoir",
    scoreGrowth: "Évolution du score moyen",
    todayActivity: "Activité du jour",
    latestOperations: "Dernières opérations",
    viewAll: "Voir tout",
    creditRequests: "Demandes de crédit",
    requestManagement: "Gestion des demandes",
    latestCreditRequests: "Dernières demandes de crédit",
    customer: "Client",
    product: "Produit demandé",
    amount: "Montant",
    creditScore: "Score de crédit",
    status: "Statut",
    lastUpdate: "Dernière mise à jour",
    export: "Exporter",
    searchPlaceholder: "Rechercher un client ou une demande...",
    noResults: "Aucune demande ne correspond à votre recherche.",
    openManagement: "Ouvrir la gestion",
    howItWorks: "Comment fonctionne MauriScore ?",
    clearerDecision: "Des données à une décision plus claire",
    demo: "Prototype",
    consentStep: "Consentement client",
    consentDesc: "Le client choisit les données qu'il autorise.",
    smartAnalysis: "Analyse intelligente",
    smartDesc: "Nous analysons les signaux de paiement et de revenus en toute sécurité.",
    explainableScore: "Score explicable",
    explainableDesc: "L'institution reçoit une évaluation claire et justifiée.",
    inclusionOpportunity: "Opportunité d'inclusion",
    exploreAnalysis: "Explorer l'analyse",
    experimentalEngine: "Moteur expérimental",
    calculateScore: "Calculer le score MauriScore",
    educationalSimulation:
      "Modifiez les indicateurs pour voir le résultat évoluer. Cette simulation est pédagogique et ne constitue pas une décision de crédit.",
    monthlyIncome: "Revenu mensuel",
    monthlyObligations: "Engagements mensuels",
    bankingMonths: "Ancienneté bancaire",
    digitalWallet: "Opérations portefeuille digital",
    month: "mois",
    ouguiya: "ouguiyas",
    lastSixMonths: "6 derniers mois",
    utilityHistory: "Historique régulier de paiement des services",
    consent: "J'autorise l'utilisation de ces données à des fins d'évaluation uniquement",
    analyze: "Analyser et calculer le score",
    estimatedResult: "Résultat estimé",
    higherRisk: "Risque élevé",
    lowerRisk: "Risque faible",
    obligationRatio: "Ratio d'engagement",
    relationshipStability: "Stabilité de la relation",
    alternativeHistory: "Historique de paiement alternatif",
    financialFootprint: "Empreinte financière",
    scoreUpdated: "Évaluation mise à jour selon les données saisies",
    prototypeOnly: "Prototype de démonstration",
    lastSync: "Dernière synchronisation : il y a 2 min",
    french: "العربية",
  },
} as const;

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

function productInFrench(id: string) {
  const products: Record<string, string> = {
    "MS-2401": "BNPL • Électronique",
    "MS-2398": "Financement personnel",
    "MS-2397": "BNPL • Téléphone",
    "MS-2394": "Prêt petite entreprise",
  };
  return products[id] ?? "Financement";
}

function statusInFrench(label: string) {
  return { ممتاز: "Excellent", جيد: "Bon", مراجعة: "À revoir" }[label] ?? label;
}

function updatedInFrench(id: string) {
  return (
    {
      "MS-2401": "Il y a 12 min",
      "MS-2398": "Il y a 38 min",
      "MS-2397": "Il y a 1 h",
      "MS-2394": "Il y a 2 h",
    }[id] ?? "Récemment"
  );
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
  const [language, setLanguage] = useState<Language>("ar");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("نظرة عامة");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(customers[0].id);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [consent, setConsent] = useState(true);
  const [notice, setNotice] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusTone | "all">("all");
  const [form, setForm] = useState({
    income: 18000,
    obligations: 4200,
    bankingMonths: 28,
    mobileMoney: 14,
    utilityPaid: true,
  });
  const copy = translations[language];
  const isFrench = language === "fr";
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isFrench ? "ltr" : "rtl";
  }, [isFrench, language]);
  const displayNav = (label: string) => {
    const labels: Record<string, string> = {
      "نظرة عامة": isFrench ? "Vue d’ensemble" : "نظرة عامة",
      "طلبات الائتمان": isFrench ? "Demandes de crédit" : "طلبات الائتمان",
      العملاء: isFrench ? "Clients" : "العملاء",
      "تحليل المخاطر": isFrench ? "Analyse des risques" : "تحليل المخاطر",
      "قواعد التقييم": isFrench ? "Règles de scoring" : "قواعد التقييم",
      "سجل الموافقات": isFrench ? "Journal des consentements" : "سجل الموافقات",
      "إعدادات المؤسسة": isFrench ? "Paramètres de l’institution" : "إعدادات المؤسسة",
    };
    return labels[label] ?? label;
  };

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function handleNavClick(label: string) {
    setActiveNav(label);
    setSidebarOpen(false);
    const targets: Record<string, string> = {
      "نظرة عامة": "overview",
      "طلبات الائتمان": "credit-requests",
      العملاء: "credit-requests",
      "تحليل المخاطر": "portfolio-insight",
      "قواعد التقييم": "score-calculator",
      "سجل الموافقات": "how-it-works",
      "إعدادات المؤسسة": "overview",
    };
    document.getElementById(targets[label] ?? "overview")?.scrollIntoView({ behavior: "smooth" });
    if (label === "قواعد التقييم") setShowCalculator(true);
    if (label === "إعدادات المؤسسة")
      showNotice(
        isFrench
          ? "Les paramètres seront disponibles dans la prochaine version."
          : "إعدادات المؤسسة ستتوفر في النسخة القادمة.",
      );
  }

  function exportRequests() {
    const headers = ["ID", "Customer", "Product", "Amount", "Score", "Status"];
    const rows = customers.map((customer) => [
      customer.id,
      customer.name,
      isFrench ? productInFrench(customer.id) : customer.product,
      customer.amount,
      customer.score,
      isFrench ? statusInFrench(customer.label) : customer.label,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mauriscore-credit-requests.csv";
    link.click();
    URL.revokeObjectURL(url);
    showNotice(isFrench ? "Export CSV téléchargé." : "تم تنزيل ملف CSV بنجاح.");
  }

  const filteredCustomers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return customers.filter((customer) => {
      const matchesStatus = statusFilter === "all" || customer.tone === statusFilter;
      const matchesQuery =
        !normalized ||
        `${customer.name} ${customer.id} ${customer.phone}`.toLowerCase().includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

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
    <div
      dir={isFrench ? "ltr" : "rtl"}
      className="mauri-app min-h-screen bg-background text-foreground"
    >
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
            <div className="mauri-brand-caption">{copy.brandCaption}</div>
          </div>
          <button
            className="mauri-mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label={isFrench ? "Fermer le menu" : "إغلاق القائمة"}
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mauri-workspace">
          <div className="mauri-workspace-avatar">BM</div>
          <div className="min-w-0">
            <div className="mauri-workspace-label">{copy.workspace}</div>
            <div className="truncate text-sm font-semibold text-white">{copy.bank}</div>
          </div>
          <ChevronDown className="mr-auto size-4 text-white/40" />
        </div>

        <div className="mauri-sidebar-label">{copy.platform}</div>
        <nav className="mauri-nav" aria-label={copy.platform}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`mauri-nav-item ${activeNav === item.label ? "active" : ""}`}
                onClick={() => handleNavClick(item.label)}
              >
                <Icon className="size-[18px]" strokeWidth={1.8} />
                <span>{displayNav(item.label)}</span>
                {item.count && <span className="mauri-nav-count">{item.count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="mauri-sidebar-label mauri-sidebar-label-secondary">{copy.management}</div>
        <nav className="mauri-nav" aria-label={copy.management}>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="mauri-nav-item"
                onClick={() => handleNavClick(item.label)}
              >
                <Icon className="size-[18px]" strokeWidth={1.8} />
                <span>{displayNav(item.label)}</span>
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
              <div className="text-xs font-semibold text-white">{copy.protected}</div>
              <div className="mt-1 text-[10px] leading-4 text-white/45">{copy.protectedDesc}</div>
            </div>
          </div>
          <div className="mauri-user">
            <div className="mauri-user-avatar">م</div>
            <div className="min-w-0">
              <div className="truncate text-xs font-semibold text-white">محمد ولد أحمد</div>
              <div className="truncate text-[10px] text-white/45">{copy.creditOfficer}</div>
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
              <span>{copy.home}</span>
              <span className="text-muted-foreground/40">/</span>
              <strong>{displayNav(activeNav)}</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="mauri-topbar-status">
              <span className="mauri-live-dot" /> {copy.systemOk}
            </div>
            <button
              className="mauri-language-toggle"
              onClick={() => setLanguage(isFrench ? "ar" : "fr")}
              aria-label={isFrench ? "Changer la langue en arabe" : "تغيير اللغة إلى الفرنسية"}
            >
              {copy.french}
            </button>
            <button
              className="mauri-icon-button"
              aria-label={copy.help}
              onClick={() =>
                showNotice(
                  isFrench
                    ? "Use the language switcher and the calculator to explore the prototype."
                    : "استخدم مفتاح اللغة والحاسبة لاستكشاف النموذج.",
                )
              }
            >
              <CircleHelp className="size-[18px]" />
            </button>
            <button
              className="mauri-icon-button relative"
              aria-label={copy.notifications}
              onClick={() =>
                showNotice(isFrench ? "No new notifications." : "لا توجد إشعارات جديدة.")
              }
            >
              <Bell className="size-[18px]" />
              <span className="mauri-notification-dot" />
            </button>
          </div>
        </header>

        <div className="mauri-content">
          {notice && (
            <div className="mauri-notice" role="status">
              {notice}
            </div>
          )}
          <section id="overview" className="mauri-welcome-row">
            <div>
              <div className="mauri-eyebrow">
                <span className="mauri-eyebrow-line" />{" "}
                {isFrench ? "Samedi 12 septembre 2026" : "السبت، 12 سبتمبر 2026"}
              </div>
              <h1 className="mauri-title">
                {copy.morning} <span>👋</span>
              </h1>
              <p className="mauri-subtitle">{copy.subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="mauri-secondary-button"
                onClick={() => setShowCalculator((value) => !value)}
              >
                <Calculator className="size-4" />
                {copy.scoreCalculator}
              </button>
              <button className="mauri-primary-button" onClick={beginNewReview}>
                <Plus className="size-4" strokeWidth={2.2} />
                {copy.newReview}
              </button>
            </div>
          </section>

          <section className="mauri-stats-grid" aria-label="المؤشرات الرئيسية">
            <StatCard
              icon={FileCheck2}
              label={copy.monthlyRequests}
              value="128"
              delta="18.4%"
              note={copy.vsLastMonth}
              tone="blue"
            />
            <StatCard
              icon={Clock3}
              label={copy.pending}
              value="24"
              delta="6.2%"
              note={copy.totalRequests}
              tone="amber"
            />
            <StatCard
              icon={ShieldCheck}
              label={copy.accuracy}
              value="94.8%"
              delta="2.1%"
              note={copy.last30}
              tone="green"
            />
            <StatCard
              icon={CircleDollarSign}
              label={copy.facilities}
              value="2.4M"
              suffix={copy.ouguiya}
              delta="12.8%"
              note={copy.approved}
              tone="violet"
            />
          </section>

          <section id="portfolio" className="mauri-grid mauri-grid-top">
            <div className="mauri-panel mauri-score-panel">
              <div className="mauri-panel-heading">
                <div>
                  <div className="mauri-section-kicker">{copy.portfolioSummary}</div>
                  <h2>{copy.scoreDistribution}</h2>
                </div>
                <button
                  className="mauri-filter-button"
                  onClick={() =>
                    showNotice(
                      isFrench ? "The chart shows the last 30 days." : "المخطط يعرض آخر 30 يوماً.",
                    )
                  }
                >
                  <span>{copy.last30}</span>
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
                    <span className="mauri-score-donut-label">{copy.avgScore}</span>
                  </div>
                </div>
                <div className="mauri-score-legend">
                  <LegendRow
                    color="green"
                    label={copy.excellent}
                    value="48%"
                    count={isFrench ? "61 demandes" : "61 طلب"}
                  />
                  <LegendRow
                    color="blue"
                    label={copy.good}
                    value="34%"
                    count={isFrench ? "43 demandes" : "43 طلب"}
                  />
                  <LegendRow
                    color="amber"
                    label={copy.review}
                    value="18%"
                    count={isFrench ? "24 demandes" : "24 طلب"}
                  />
                  <div className="mauri-score-insight">
                    <Sparkles className="size-3.5" />{" "}
                    {isFrench
                      ? "Le score moyen progresse de 6,3 % ce mois-ci"
                      : "تحسن متوسط النقاط بمقدار 6.3% هذا الشهر"}
                  </div>
                </div>
              </div>
              <div className="mauri-chart-wrap">
                <div className="mauri-chart-labels">
                  <span>{copy.scoreGrowth}</span>
                  <span className="mauri-chart-period">
                    {isFrench ? "Juin — septembre 2026" : "يونيو — سبتمبر 2026"}
                  </span>
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
                  <div className="mauri-section-kicker">{copy.todayActivity}</div>
                  <h2>{copy.latestOperations}</h2>
                </div>
                <button
                  className="mauri-link-button"
                  onClick={() => handleNavClick("طلبات الائتمان")}
                >
                  {copy.viewAll} <ArrowLeft className="size-3.5" />
                </button>
              </div>
              <div className="mauri-activity-list">
                <ActivityRow
                  icon={FileCheck2}
                  title={isFrench ? "Nouvelle demande de crédit" : "طلب ائتمان جديد"}
                  desc="أحمد ولد محمد • BNPL"
                  time={isFrench ? "Il y a 12 min" : "منذ 12 دقيقة"}
                  tone="green"
                />
                <ActivityRow
                  icon={ShieldCheck}
                  title={isFrench ? "Consentement validé" : "اكتملت الموافقة"}
                  desc="فاطمة بنت المختار • تمويل شخصي"
                  time={isFrench ? "Il y a 38 min" : "منذ 38 دقيقة"}
                  tone="blue"
                />
                <ActivityRow
                  icon={AlertTriangle}
                  title={isFrench ? "Revue manuelle requise" : "تحتاج مراجعة يدوية"}
                  desc="محمد الأمين سيدي • BNPL"
                  time={isFrench ? "Il y a 1 h" : "منذ ساعة"}
                  tone="amber"
                />
                <ActivityRow
                  icon={Fingerprint}
                  title={isFrench ? "Consentement mis à jour" : "تم تحديث موافقة بيانات"}
                  desc="مريم عبد الله • سجل الدفع"
                  time={isFrench ? "Il y a 2 h" : "منذ ساعتين"}
                  tone="violet"
                />
              </div>
              <div className="mauri-activity-footer">
                <Activity className="size-3.5" />{" "}
                {isFrench
                  ? "Toutes les opérations sont journalisées et chiffrées"
                  : "كل العمليات مسجلة ومشفرة"}
              </div>
            </div>
          </section>

          <section id="credit-requests" className="mauri-panel mauri-customer-panel">
            <div className="mauri-panel-heading mauri-customer-heading">
              <div>
                <div className="mauri-section-kicker">{copy.requestManagement}</div>
                <h2>
                  {copy.latestCreditRequests} <span className="mauri-count-badge">24</span>
                </h2>
              </div>
              <div className="mauri-table-actions">
                <div className="mauri-search">
                  <Search className="size-4" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={copy.searchPlaceholder}
                    aria-label={copy.searchPlaceholder}
                  />
                </div>
                <button
                  className="mauri-icon-button table-filter"
                  aria-label={isFrench ? "Filtrer les demandes" : "تصفية الطلبات"}
                  onClick={() => {
                    const next =
                      statusFilter === "all"
                        ? "green"
                        : statusFilter === "green"
                          ? "blue"
                          : statusFilter === "blue"
                            ? "amber"
                            : "all";
                    setStatusFilter(next);
                    showNotice(
                      isFrench
                        ? `Filter: ${next === "all" ? "all requests" : next}`
                        : `التصفية: ${next === "all" ? "كل الطلبات" : next === "green" ? "ممتاز" : next === "blue" ? "جيد" : "مراجعة"}`,
                    );
                  }}
                  title={isFrench ? "Cycle status filter" : "تغيير تصفية الحالة"}
                >
                  <SlidersHorizontal className="size-4" />
                </button>
                <button className="mauri-export-button" onClick={exportRequests}>
                  <Download className="size-3.5" /> {copy.export}
                </button>
              </div>
            </div>
            <div className="mauri-table-scroll">
              <table className="mauri-table">
                <thead>
                  <tr>
                    <th>{copy.customer}</th>
                    <th>{copy.product}</th>
                    <th>{copy.amount}</th>
                    <th>{copy.creditScore}</th>
                    <th>{copy.status}</th>
                    <th>{copy.lastUpdate}</th>
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
                        <span className="mauri-product">
                          {isFrench ? productInFrench(customer.id) : customer.product}
                        </span>
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
                          {isFrench ? statusInFrench(customer.label) : customer.label}
                        </span>
                      </td>
                      <td>
                        <span className="mauri-updated">
                          {isFrench ? updatedInFrench(customer.id) : customer.updated}
                        </span>
                      </td>
                      <td>
                        <button
                          className="mauri-row-action"
                          aria-label={`عرض ${customer.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedId(customer.id);
                            showNotice(
                              isFrench
                                ? `${customer.name} — score ${customer.score}`
                                : `${customer.name} — الدرجة ${customer.score}`,
                            );
                          }}
                        >
                          <Eye className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCustomers.length === 0 && (
                <div className="mauri-empty">{copy.noResults}</div>
              )}
            </div>
            <div className="mauri-table-footer">
              <span>
                {isFrench
                  ? `Affichage de ${filteredCustomers.length} sur 24 demandes`
                  : `عرض ${filteredCustomers.length} من 24 طلب`}
              </span>
              <button
                className="mauri-link-button"
                onClick={() => handleNavClick("طلبات الائتمان")}
              >
                {copy.openManagement} <ArrowLeft className="size-3.5" />
              </button>
            </div>
          </section>

          <section className="mauri-bottom-grid">
            <div id="how-it-works" className="mauri-panel mauri-how-panel">
              <div className="mauri-panel-heading">
                <div>
                  <div className="mauri-section-kicker">{copy.howItWorks}</div>
                  <h2>{copy.clearerDecision}</h2>
                </div>
                <div className="mauri-demo-badge">
                  <Sparkles className="size-3.5" /> {copy.demo}
                </div>
              </div>
              <div className="mauri-flow">
                <FlowStep
                  number="01"
                  icon={Users}
                  title={copy.consentStep}
                  desc={copy.consentDesc}
                />
                <div className="mauri-flow-arrow">
                  <ArrowDownLeft className="size-4" />
                </div>
                <FlowStep
                  number="02"
                  icon={Activity}
                  title={copy.smartAnalysis}
                  desc={copy.smartDesc}
                />
                <div className="mauri-flow-arrow">
                  <ArrowDownLeft className="size-4" />
                </div>
                <FlowStep
                  number="03"
                  icon={Gauge}
                  title={copy.explainableScore}
                  desc={copy.explainableDesc}
                />
              </div>
              <div className="mauri-disclaimer">
                <LockKeyhole className="size-3.5" />
                <span>
                  {isFrench
                    ? "MauriScore n'accorde pas de prêts et ne prend pas la décision finale. C'est un outil d'aide pour l'institution financière."
                    : "MauriScore لا يمنح القروض ولا يتخذ القرار النهائي. هو أداة مساعدة للمؤسسة المالية فقط."}
                </span>
              </div>
            </div>

            <div id="portfolio-insight" className="mauri-panel mauri-insight-panel">
              <div className="mauri-panel-heading">
                <div>
                  <div className="mauri-section-kicker">
                    {isFrench ? "Signal du portefeuille" : "إشارة المحفظة"}
                  </div>
                  <h2>{copy.inclusionOpportunity}</h2>
                </div>
                <div className="mauri-insight-icon">
                  <TrendingUp className="size-4" />
                </div>
              </div>
              <div className="mauri-insight-number">
                31<span>%</span>
              </div>
              <p>
                {isFrench
                  ? "Ce mois-ci, 31 % des demandeurs ne disposent pas d'un historique de crédit traditionnel suffisant, mais présentent des signaux de paiement alternatifs analysables."
                  : "من المتقدمين هذا الشهر لا يملكون تاريخاً ائتمانياً تقليدياً كافياً، لكن لديهم إشارات سداد بديلة قابلة للتحليل."}
              </p>
              <div className="mauri-insight-progress">
                <div>
                  <span>
                    {isFrench ? "Demandes sans historique traditionnel" : "طلبات بدون سجل تقليدي"}
                  </span>
                  <strong>{isFrench ? "40 sur 128" : "40 من 128"}</strong>
                </div>
                <div className="mauri-progress-track">
                  <span style={{ width: "31%" }} />
                </div>
              </div>
              <button className="mauri-text-button" onClick={() => handleNavClick("تحليل المخاطر")}>
                {copy.exploreAnalysis} <ArrowLeft className="size-3.5" />
              </button>
            </div>
          </section>

          {showCalculator && (
            <section id="score-calculator" className="mauri-panel mauri-calculator-panel">
              <div className="mauri-panel-heading">
                <div>
                  <div className="mauri-section-kicker">{copy.experimentalEngine}</div>
                  <h2>{copy.calculateScore}</h2>
                  <p className="mauri-panel-description">{copy.educationalSimulation}</p>
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
                        {copy.monthlyIncome} <small>{copy.ouguiya}</small>
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
                        {copy.monthlyObligations} <small>{copy.ouguiya}</small>
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
                        {copy.bankingMonths} <small>{copy.month}</small>
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
                        {copy.digitalWallet} <small>{copy.lastSixMonths}</small>
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
                    <span>{copy.utilityHistory}</span>
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
                    <span>{copy.consent}</span>
                  </label>
                  <button
                    className="mauri-primary-button w-full justify-center"
                    disabled={!consent}
                    onClick={() => setCalculated(true)}
                  >
                    <Calculator className="size-4" /> {copy.analyze}
                  </button>
                </div>
                <div className="mauri-result-card">
                  <div className="mauri-result-top">
                    <span>{copy.estimatedResult}</span>
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
                    <span>{copy.higherRisk}</span>
                    <span>{copy.lowerRisk}</span>
                  </div>
                  <div className="mauri-result-factors">
                    <ResultFactor
                      label={copy.obligationRatio}
                      value={`${debtRatio}%`}
                      score={clamp(100 - debtRatio * 1.6, 15, 96)}
                      tone={debtRatio < 35 ? "green" : "amber"}
                    />
                    <ResultFactor
                      label={copy.relationshipStability}
                      value={`${stability}%`}
                      score={stability}
                      tone="blue"
                    />
                    <ResultFactor
                      label={copy.alternativeHistory}
                      value={`${paymentHistory}%`}
                      score={paymentHistory}
                      tone={paymentHistory > 70 ? "green" : "amber"}
                    />
                    <ResultFactor
                      label={copy.financialFootprint}
                      value={`${footprint}%`}
                      score={footprint}
                      tone="violet"
                    />
                  </div>
                  {calculated && (
                    <div className="mauri-calculated-note">
                      <Check className="size-3.5" /> {copy.scoreUpdated}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          <footer className="mauri-footer">
            <span>© 2026 MauriScore</span>
            <span className="mauri-footer-dot" />
            <span>{copy.prototypeOnly}</span>
            <span className="mauri-footer-spacer" />
            <span>{copy.lastSync}</span>
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

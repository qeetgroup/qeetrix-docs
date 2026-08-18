"use client";

import {
  IconApiKey,
  IconAuditLog,
  IconCrossDevice,
  IconMfaShield,
  IconOidcConnector,
  IconPasskey,
  IconSamlConnector,
  IconScimSync,
  IconTenant,
  IconWebhook,
} from "@qeetrix/ui/brand";
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bell,
  BellOff,
  Bookmark,
  Box,
  Calendar,
  Camera,
  ChartColumn,
  ChartLine,
  ChartPie,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleX,
  ClipboardCheck,
  Clock,
  Cloud,
  Code,
  Coffee,
  Command,
  Compass,
  Copy,
  Cpu,
  CreditCard,
  Database,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileText,
  Filter,
  Flag,
  Flame,
  Folder,
  FolderOpen,
  Gift,
  Github,
  Globe,
  HardDrive,
  Heart,
  Home,
  Image,
  Info,
  LayoutDashboard,
  LayoutGrid,
  Link,
  List,
  LoaderCircle,
  Lock,
  LockOpen,
  LogIn,
  LogOut,
  type LucideIcon,
  Mail,
  Map as MapIcon,
  MapPin,
  Menu,
  MessageSquare,
  Mic,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  Paperclip,
  Pause,
  Pencil,
  Phone,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  RotateCw,
  Save,
  Search,
  Server,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Smile,
  Sparkles,
  Star,
  Sun,
  Table,
  Tag,
  Terminal,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Upload,
  User,
  UserPlus,
  Users,
  Video,
  Volume2,
  VolumeX,
  Wand,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type IconCmp = React.ComponentType<{ className?: string }>;

const LUCIDE: Record<string, LucideIcon> = {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bell,
  BellOff,
  Bookmark,
  Box,
  Calendar,
  Camera,
  ChartColumn,
  ChartLine,
  ChartPie,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleX,
  ClipboardCheck,
  Clock,
  Cloud,
  Code,
  Coffee,
  Command,
  Compass,
  Copy,
  Cpu,
  CreditCard,
  Database,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileText,
  Filter,
  Flag,
  Flame,
  Folder,
  FolderOpen,
  Gift,
  Github,
  Globe,
  HardDrive,
  Heart,
  Home,
  Image,
  Info,
  LayoutDashboard,
  LayoutGrid,
  Link,
  List,
  Lock,
  LockOpen,
  LoaderCircle,
  LogIn,
  LogOut,
  Mail,
  Map: MapIcon,
  MapPin,
  Menu,
  MessageSquare,
  Mic,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  Paperclip,
  Pause,
  Pencil,
  Phone,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  RotateCw,
  Save,
  Search,
  Server,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Smile,
  Sparkles,
  Star,
  Sun,
  Table,
  Tag,
  Terminal,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Upload,
  User,
  UserPlus,
  Users,
  Video,
  Volume2,
  VolumeX,
  Wand,
  X,
  Zap,
};

const BRAND: Record<string, IconCmp> = {
  IconApiKey,
  IconAuditLog,
  IconCrossDevice,
  IconMfaShield,
  IconOidcConnector,
  IconPasskey,
  IconSamlConnector,
  IconScimSync,
  IconTenant,
  IconWebhook,
};

const LUCIDE_ENTRIES = Object.entries(LUCIDE) as [string, IconCmp][];
const BRAND_ENTRIES = Object.entries(BRAND);

export function IconBrowser() {
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const query = q.trim().toLowerCase();

  const lucide = useMemo(
    () => LUCIDE_ENTRIES.filter(([name]) => name.toLowerCase().includes(query)),
    [query],
  );
  const brand = useMemo(
    () => BRAND_ENTRIES.filter(([name]) => name.toLowerCase().includes(query)),
    [query],
  );

  const copy = (name: string, source: "lucide" | "brand") => {
    const line =
      source === "brand"
        ? `import { ${name} } from "@qeetrix/ui/brand";`
        : `import { ${name} } from "lucide-react";`;
    void navigator.clipboard.writeText(line);
    setCopied(name);
    setTimeout(() => setCopied((c) => (c === name ? null : c)), 1500);
  };

  const Cell = ({
    name,
    Cmp,
    source,
  }: {
    name: string;
    Cmp: IconCmp;
    source: "lucide" | "brand";
  }) => (
    <button
      type="button"
      onClick={() => copy(name, source)}
      title={`Copy import for ${name}`}
      className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-brand hover:bg-accent hover:text-foreground"
    >
      {copied === name ? <Check className="size-5 text-brand" /> : <Cmp className="size-5" />}
      <span className="w-full truncate text-center text-[0.6rem]">
        {copied === name ? "Copied" : name}
      </span>
    </button>
  );

  return (
    <div>
      <div className="sticky top-14 z-10 -mx-1 mb-6 bg-background/80 px-1 py-2 backdrop-blur">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search icons…"
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
      </div>

      {brand.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 font-display text-lg font-semibold">
            Qeet brand icons{" "}
            <span className="text-sm font-normal text-muted-foreground">({brand.length})</span>
          </h2>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {brand.map(([name, Cmp]) => (
              <Cell key={name} name={name} Cmp={Cmp} source="brand" />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">
          Lucide{" "}
          <span className="text-sm font-normal text-muted-foreground">
            ({lucide.length} of a curated set)
          </span>
        </h2>
        {lucide.length === 0 && brand.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No icons match “{q}”. The full lucide set (1,500+) is available in{" "}
            <code className="font-mono">lucide-react</code>.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {lucide.map(([name, Cmp]) => (
              <Cell key={name} name={name} Cmp={Cmp} source="lucide" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

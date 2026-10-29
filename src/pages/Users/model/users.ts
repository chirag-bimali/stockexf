import alexMorgan from "../assets/alex-morgan.jpg";
import elenaRostova from "../assets/elena-rostova.jpg";
import sarahJenkins from "../assets/sarah-jenkins.jpg";

export type UserRole =
  | "system_admin"
  | "exchange_officer"
  | "company_rep"
  | "investor";

export type UserStatus = "active" | "suspended" | "locked";

export type AvatarTone = "brand" | "blue" | "warning" | "gray";

export type User = {
  name: string;
  email: string;
  role: UserRole;
  roleShort?: string;
  status: UserStatus;
  verified: boolean;
  lastActiveOn: string;
  lastActiveAgo: string;
  isCurrentUser?: boolean;
  isOnline?: boolean;
  avatar?: string;
  avatarTone?: AvatarTone;
  initials?: string;
};

export const USERS: readonly User[] = [
  {
    name: "Alex Morgan",
    email: "alex.morgan@stockex.io",
    role: "system_admin",
    status: "active",
    verified: true,
    lastActiveOn: "Oct 12, 2025",
    lastActiveAgo: "2 min ago",
    isCurrentUser: true,
    isOnline: true,
    avatar: alexMorgan,
  },
  {
    name: "Taylor Vance",
    email: "t.vance@stockex.internal",
    role: "exchange_officer",
    status: "suspended",
    verified: true,
    lastActiveOn: "Jan 15, 2026",
    lastActiveAgo: "14d ago",
    avatarTone: "blue",
    initials: "TV",
  },
  {
    name: "Elena Rostova",
    email: "elena.r@fintech.ventures",
    role: "exchange_officer",
    status: "active",
    verified: true,
    lastActiveOn: "Mar 02, 2026",
    lastActiveAgo: "1h ago",
    avatar: elenaRostova,
  },
  {
    name: "Marcus Chen",
    email: "marcus.c@quantumhedge.co",
    role: "company_rep",
    roleShort: "CR",
    status: "locked",
    verified: true,
    lastActiveOn: "Jun 18, 2026",
    lastActiveAgo: "Yesterday",
    avatarTone: "warning",
    initials: "MC",
  },
  {
    name: "Sarah Jenkins",
    email: "s.jenkins@stockex.io",
    role: "system_admin",
    status: "active",
    verified: true,
    lastActiveOn: "Aug 09, 2026",
    lastActiveAgo: "3h ago",
    avatar: sarahJenkins,
  },
  {
    name: "David Kim",
    email: "d.kim@kimcapital.kr",
    role: "investor",
    status: "active",
    verified: false,
    lastActiveOn: "Sep 29, 2026",
    lastActiveAgo: "6d ago",
    avatarTone: "gray",
    initials: "DK",
  },
];

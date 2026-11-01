import type { WalletSave } from "./walletStorage";

export type WalletData = {
  selectedCompanionId: string | null;
  nicheEntries: Record<string, { id: string; text: string; done: boolean }[]>;
  journalEntries: { id: string; date: string; text: string }[];
  subscriptions: { id: string; name: string; amount: number; cadence: "monthly" | "yearly" }[];
  carAmount: string;
  carDueDay: string;
  carLender: string;
  carAutopay: boolean;
  carNote: string;
  homeAmount: string;
  homeDueDay: string;
  homePayee: string;
  homeAutopay: boolean;
  homePointer: string;
  internetProvider: string;
  internetAmount: string;
  internetDue: string;
  internetPlan: string;
  internetSupport: string;
  phoneCarrier: string;
  phoneAmount: string;
  phoneDue: string;
  deviceBalance: string;
  phoneAutopay: boolean;
  groceries: { id: string; name: string; category: string; done: boolean }[];
  laundryDates: Record<"everyday" | "bedding" | "towels" | "work" | "delicates", string>;
  friendPlans: { id: string; person: string; plan: string; date: string }[];
  appointments: { id: string; title: string; date: string; time: string; place: string }[];
  workDays: Record<string, boolean>;
  workStart: string;
  workEnd: string;
  workNote: string;
  tasks: { id: string; title: string; due: string; priority: "Normal" | "Soon" | "Important"; done: boolean }[];
};

type Check = (value: unknown) => boolean;
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const str: Check = (v) => typeof v === "string";
const bool: Check = (v) => typeof v === "boolean";
const num: Check = (v) => typeof v === "number" && Number.isFinite(v);
const nullableStr: Check = (v) => v === null || str(v);
const objectOf = (check: Check): Check => (v) => record(v) && Object.values(v).every(check);
const shape = (fields: Record<string, Check>): Check => (v) =>
  record(v) && Object.entries(fields).every(([key, check]) => check(v[key]));
const arrayOf = (check: Check): Check => (v) => Array.isArray(v) && v.every(check);
const oneOf = (...values: string[]): Check => (v) => typeof v === "string" && values.includes(v);

const checks: Record<keyof WalletData, Check> = {
  selectedCompanionId: nullableStr,
  nicheEntries: objectOf(arrayOf(shape({ id: str, text: str, done: bool }))),
  journalEntries: arrayOf(shape({ id: str, date: str, text: str })),
  subscriptions: arrayOf(shape({ id: str, name: str, amount: num, cadence: oneOf("monthly", "yearly") })),
  carAmount: str,
  carDueDay: str,
  carLender: str,
  carAutopay: bool,
  carNote: str,
  homeAmount: str,
  homeDueDay: str,
  homePayee: str,
  homeAutopay: bool,
  homePointer: str,
  internetProvider: str,
  internetAmount: str,
  internetDue: str,
  internetPlan: str,
  internetSupport: str,
  phoneCarrier: str,
  phoneAmount: str,
  phoneDue: str,
  deviceBalance: str,
  phoneAutopay: bool,
  groceries: arrayOf(shape({ id: str, name: str, category: str, done: bool })),
  laundryDates: shape({ everyday: str, bedding: str, towels: str, work: str, delicates: str }),
  friendPlans: arrayOf(shape({ id: str, person: str, plan: str, date: str })),
  appointments: arrayOf(shape({ id: str, title: str, date: str, time: str, place: str })),
  workDays: shape({ Monday: bool, Tuesday: bool, Wednesday: bool, Thursday: bool, Friday: bool, Saturday: bool, Sunday: bool }),
  workStart: str,
  workEnd: str,
  workNote: str,
  tasks: arrayOf(shape({ id: str, title: str, due: str, priority: oneOf("Normal", "Soon", "Important"), done: bool })),
};

export function isWalletData(value: unknown): value is WalletData {
  return shape(checks)(value);
}

// Retain the versioned envelope contract at the storage boundary.
export type WalletSnapshot = WalletSave<WalletData>;
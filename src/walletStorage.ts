import { load, type Store } from "@tauri-apps/plugin-store";

const FILE_NAME = "life-wallet.json";
const RECORD_KEY = "wallet";
const SCHEMA_VERSION = 1;

export type WalletSave<T> = {
  schemaVersion: 1;
  data: T;
};

let storePromise: Promise<Store> | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function getStore(): Promise<Store> {
  if (!storePromise) {
    storePromise = load(FILE_NAME, {
      autoSave: false,
    }).catch((error: unknown) => {
      storePromise = null;
      throw error;
    });
  }

  return storePromise;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" &&
    value !== null &&
    !Array.isArray(value);
}

export async function loadWallet<T>(
  validate: (value: unknown) => value is T,
): Promise<T | null> {
  const store = await getStore();
  const saved = await store.get<unknown>(RECORD_KEY);

  if (saved === null || saved === undefined) {
    return null;
  }

  if (
    !isRecord(saved) ||
    saved.schemaVersion !== SCHEMA_VERSION ||
    !validate(saved.data)
  ) {
    throw new Error(
      "Unsupported or invalid Life Wallet save. Existing data was not modified.",
    );
  }

  return saved.data;
}

export function saveWallet<T>(data: T): Promise<void> {
  const snapshot: WalletSave<T> = {
    schemaVersion: SCHEMA_VERSION,
    data: structuredClone(data),
  };

  const write = async (): Promise<void> => {
    const store = await getStore();
    await store.set(RECORD_KEY, snapshot);
    await store.save();
  };

  const result = writeQueue.then(write);

  // Keep later writes possible even after a failed write.
  writeQueue = result.catch(() => {});

  return result;
}
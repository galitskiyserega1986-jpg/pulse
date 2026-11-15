import { VIKTOR_PASSWORDS } from "./config";

/*
 * Состояние входа в аккаунт Виктора хранится в localStorage этого устройства:
 *  - сколько неудачных попыток уже было (первые две всегда с предупреждением);
 *  - до какого времени действует блокировка на 24 часа;
 *  - верный пароль, которым игрок вошёл (дальше вход с первой попытки).
 */

const STORAGE_KEY = "pulse_viktor_auth_v2";
const LEGACY_KEY = "pulse_viktor_attempts_v1";
export const VIKTOR_LOCK_MS = 24 * 60 * 60 * 1000;

export interface ViktorState {
  failed: number;
  lockedUntil: number | null;
  savedPassword: string | null;
}

export type ViktorAttemptResult =
  | { kind: "success" }
  | { kind: "wrong" }
  | { kind: "warn-first" }
  | { kind: "warn-last" }
  | { kind: "locked"; until: number };

const EMPTY_STATE: ViktorState = { failed: 0, lockedUntil: null, savedPassword: null };

// запасной вариант, если localStorage недоступен (например, в некоторых встроенных окнах)
let memoryState: ViktorState | null = null;

export function getViktorState(): ViktorState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_STATE };
    const parsed = JSON.parse(raw) as Partial<ViktorState>;
    return {
      failed: typeof parsed.failed === "number" ? parsed.failed : 0,
      lockedUntil: typeof parsed.lockedUntil === "number" ? parsed.lockedUntil : null,
      savedPassword: typeof parsed.savedPassword === "string" ? parsed.savedPassword : null,
    };
  } catch {
    return memoryState ? { ...memoryState } : { ...EMPTY_STATE };
  }
}

function saveViktorState(state: ViktorState) {
  memoryState = { ...state };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage недоступен — состояние остаётся в памяти страницы
  }
}

export function resetViktorState() {
  memoryState = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    // ничего страшного: состояния и так нет
  }
}

/**
 * Одна попытка входа в аккаунт Виктора (логин уже проверен).
 * 1-я и 2-я попытка — всегда неудачные, с предупреждением.
 * 3-я попытка — успешна, если пароль из списка; иначе блокировка на 24 часа.
 * Верный пароль сохраняется на устройстве: дальше вход с первой попытки.
 */
export function attemptViktorLogin(
  password: string,
  now: number = Date.now()
): ViktorAttemptResult {
  const state = getViktorState();

  // 1. Действующая блокировка на 24 часа
  if (state.lockedUntil !== null) {
    if (now < state.lockedUntil) {
      return { kind: "locked", until: state.lockedUntil };
    }
    // срок блокировки истёк — начинаем заново
    state.failed = 0;
    state.lockedUntil = null;
    saveViktorState(state);
  }

  // 2. Верный пароль уже сохранён на этом устройстве
  if (state.savedPassword !== null) {
    return password === state.savedPassword ? { kind: "success" } : { kind: "wrong" };
  }

  // 3. Первые две попытки — всегда неудачные
  if (state.failed < 2) {
    const failed = state.failed + 1;
    saveViktorState({ ...state, failed });
    return failed === 1 ? { kind: "warn-first" } : { kind: "warn-last" };
  }

  // 4. Третья попытка — решающая: любой из пяти паролей открывает профиль
  if (VIKTOR_PASSWORDS.includes(password)) {
    saveViktorState({ failed: 0, lockedUntil: null, savedPassword: password });
    return { kind: "success" };
  }

  // 5. Третья попытка неверна — блокировка на 24 часа
  const until = now + VIKTOR_LOCK_MS;
  saveViktorState({ failed: 0, lockedUntil: until, savedPassword: null });
  return { kind: "locked", until };
}

/** Остаток блокировки в читаемом виде: «23 ч 59 мин 58 с» */
export function formatLeft(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${h} ч ${pad(m)} мин ${pad(s)} с`;
}

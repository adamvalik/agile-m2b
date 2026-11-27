import { ANSWERS_STORAGE_KEY } from './answers';
import {
  loadDone,
  PROGRESS_STORAGE_KEY,
  type ProgressStorage,
  saveDone,
  toggleDone,
} from './progress';

function memoryStorage(initial: Record<string, string> = {}): ProgressStorage {
  const items = new Map(Object.entries(initial));
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value),
  };
}

/** Storage the browser blocks, for example in some private windows. */
const unavailable: ProgressStorage = {
  getItem: () => {
    throw new Error('SecurityError');
  },
  setItem: () => {
    throw new Error('QuotaExceededError');
  },
};

describe('toggleDone', () => {
  it('marks a step as done', () => {
    expect(toggleDone(new Set(), 'tax-code')).toEqual(new Set(['tax-code']));
  });

  it('removes the mark from a step that is already done', () => {
    expect(toggleDone(new Set(['tax-code', 'sim-card']), 'tax-code')).toEqual(
      new Set(['sim-card']),
    );
  });

  it('leaves the marks it is given as they are', () => {
    const done = new Set(['tax-code']);
    toggleDone(done, 'sim-card');
    expect(done).toEqual(new Set(['tax-code']));
  });
});

describe('saveDone and loadDone', () => {
  afterEach(() => localStorage.clear());

  it('keep a mark and its removal across a reload', () => {
    const storage = memoryStorage();
    expect(saveDone(toggleDone(loadDone(storage), 'tax-code'), storage)).toBe(true);
    expect(loadDone(storage)).toEqual(new Set(['tax-code']));

    expect(saveDone(toggleDone(loadDone(storage), 'tax-code'), storage)).toBe(true);
    expect(loadDone(storage)).toEqual(new Set());
  });

  it('use localStorage when no storage is given', () => {
    saveDone(new Set(['tax-code']));
    expect(loadDone()).toEqual(new Set(['tax-code']));
  });

  it('store only the ids of the done steps', () => {
    const storage = memoryStorage();
    saveDone(new Set(['tax-code', 'sim-card']), storage);
    expect(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY)!)).toEqual(['tax-code', 'sim-card']);
  });

  it('leave the saved answers alone', () => {
    const answers = '{"status":"eu","arrivalDate":"2027-03-01"}';
    const storage = memoryStorage({ [ANSWERS_STORAGE_KEY]: answers });
    saveDone(new Set(['tax-code']), storage);
    expect(storage.getItem(ANSWERS_STORAGE_KEY)).toBe(answers);
  });

  it('give no marks and report false when the browser does not allow storage', () => {
    expect(loadDone(unavailable)).toEqual(new Set());
    expect(saveDone(new Set(['tax-code']), unavailable)).toBe(false);
  });
});

describe('loadDone', () => {
  it('returns no marks when nothing is saved', () => {
    expect(loadDone(memoryStorage())).toEqual(new Set());
  });

  it('returns no marks for saved data it cannot use', () => {
    const broken = ['not json', '{"tax-code":true}', '"tax-code"', '42', 'null'];
    for (const raw of broken) {
      expect(loadDone(memoryStorage({ [PROGRESS_STORAGE_KEY]: raw }))).toEqual(new Set());
    }
  });

  it('skips saved entries that are not step ids', () => {
    const storage = memoryStorage({ [PROGRESS_STORAGE_KEY]: '["tax-code",3,null]' });
    expect(loadDone(storage)).toEqual(new Set(['tax-code']));
  });
});

import {
  ANSWERS_STORAGE_KEY,
  type Answers,
  type AnswersStorage,
  loadAnswers,
  loadSavedAnswers,
  saveAnswers,
} from './answers';
import { buildChecklist, type ChecklistStep } from './checklist';

function memoryStorage(initial: Record<string, string> = {}): AnswersStorage {
  const items = new Map(Object.entries(initial));
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value),
  };
}

const answers: Answers = { status: 'non-eu', arrivalDate: '2027-03-01', stay: 'semester' };

function storageWith(saved: Answers): AnswersStorage {
  const storage = memoryStorage();
  saveAnswers(saved, storage);
  return storage;
}

describe('saveAnswers and loadAnswers', () => {
  it('return the saved answers', () => {
    const storage = memoryStorage();
    expect(saveAnswers(answers, storage)).toBe(true);
    expect(loadAnswers(storage)).toEqual(answers);
  });

  it('replace earlier answers when the student changes them', () => {
    const storage = memoryStorage();
    saveAnswers(answers, storage);
    saveAnswers({ status: 'eu', arrivalDate: '2027-02-15', stay: 'year', under26: 'yes' }, storage);
    expect(loadAnswers(storage)).toEqual({
      status: 'eu',
      arrivalDate: '2027-02-15',
      stay: 'year',
      under26: 'yes',
    });
  });

  it('keep the optional age answer, including "Prefer not to say"', () => {
    for (const under26 of ['yes', 'no', 'prefer-not-to-say'] as const) {
      expect(loadAnswers(storageWith({ ...answers, under26 }))).toEqual({ ...answers, under26 });
    }
  });

  it('leave out the age answer when the student skipped it', () => {
    const storage = storageWith(answers);
    expect(JSON.parse(storage.getItem(ANSWERS_STORAGE_KEY)!)).not.toHaveProperty('under26');
  });

  it('store only the intake answers', () => {
    const storage = memoryStorage();
    saveAnswers({ ...answers, name: 'Someone' } as Answers, storage);
    expect(JSON.parse(storage.getItem(ANSWERS_STORAGE_KEY)!)).toEqual(answers);
  });

  it('report false when the browser does not allow saving', () => {
    const storage: AnswersStorage = {
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
    };
    expect(saveAnswers(answers, storage)).toBe(false);
  });
});

describe('Answers', () => {
  it('can be passed straight to buildChecklist', () => {
    const steps: ChecklistStep[] = [
      {
        id: 'tax-code',
        appliesTo: ['eu', 'non-eu'],
        optional: false,
        requires: [],
        deadline: null,
      },
      {
        id: 'residence-permit',
        appliesTo: ['non-eu'],
        optional: false,
        requires: [],
        deadline: null,
      },
    ];
    const saved = loadAnswers(storageWith(answers))!;

    expect(buildChecklist(steps, saved).map((step) => step.id)).toEqual([
      'tax-code',
      'residence-permit',
    ]);
  });
});

describe('loadAnswers', () => {
  it('returns null when nothing is saved', () => {
    expect(loadAnswers(memoryStorage())).toBeNull();
  });

  it('returns null for saved data it cannot use', () => {
    const broken = [
      'not json',
      '{"status":"martian","arrivalDate":"2027-03-01"}',
      '{"status":"eu","arrivalDate":"2027-02-30"}',
      '{"status":"eu"}',
      '{"status":"eu","arrivalDate":"2027-03-01","stay":"forever"}',
      'null',
    ];
    for (const raw of broken) {
      expect(loadAnswers(memoryStorage({ [ANSWERS_STORAGE_KEY]: raw }))).toBeNull();
    }
  });

  it('returns null for answers saved before the stay question', () => {
    const old = '{"status":"eu","arrivalDate":"2027-03-01"}';
    expect(loadAnswers(memoryStorage({ [ANSWERS_STORAGE_KEY]: old }))).toBeNull();
  });

  it('drops an age answer it cannot use and keeps the rest', () => {
    const raw = JSON.stringify({ ...answers, under26: 'maybe' });
    expect(loadAnswers(memoryStorage({ [ANSWERS_STORAGE_KEY]: raw }))).toEqual(answers);
  });
});

describe('loadSavedAnswers', () => {
  it('returns the valid answers even when the stay is missing', () => {
    const old = '{"status":"eu","arrivalDate":"2027-03-01","stay":"forever"}';
    expect(loadSavedAnswers(memoryStorage({ [ANSWERS_STORAGE_KEY]: old }))).toEqual({
      status: 'eu',
      arrivalDate: '2027-03-01',
    });
  });

  it('returns no answers when nothing usable is saved', () => {
    expect(loadSavedAnswers(memoryStorage())).toEqual({});
    expect(loadSavedAnswers(memoryStorage({ [ANSWERS_STORAGE_KEY]: 'not json' }))).toEqual({});
  });
});

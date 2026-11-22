import {
  ANSWERS_STORAGE_KEY,
  type Answers,
  type AnswersStorage,
  loadAnswers,
  saveAnswers,
} from './answers';

function memoryStorage(initial: Record<string, string> = {}): AnswersStorage {
  const items = new Map(Object.entries(initial));
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => void items.set(key, value),
  };
}

const answers: Answers = { status: 'non-eu', arrivalDate: '2027-03-01' };

describe('saveAnswers and loadAnswers', () => {
  it('return the saved answers', () => {
    const storage = memoryStorage();
    expect(saveAnswers(answers, storage)).toBe(true);
    expect(loadAnswers(storage)).toEqual(answers);
  });

  it('replace earlier answers when the student changes them', () => {
    const storage = memoryStorage();
    saveAnswers(answers, storage);
    saveAnswers({ status: 'eu', arrivalDate: '2027-02-15' }, storage);
    expect(loadAnswers(storage)).toEqual({ status: 'eu', arrivalDate: '2027-02-15' });
  });

  it('store only the two answers', () => {
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
      'null',
    ];
    for (const raw of broken) {
      expect(loadAnswers(memoryStorage({ [ANSWERS_STORAGE_KEY]: raw }))).toBeNull();
    }
  });
});

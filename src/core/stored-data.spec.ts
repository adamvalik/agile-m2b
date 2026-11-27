import { ANSWERS_STORAGE_KEY, loadAnswers, saveAnswers } from './answers';
import { loadDone, PROGRESS_STORAGE_KEY, saveDone } from './progress';
import { type ClearableStorage, clearStoredData } from './stored-data';

describe('clearStoredData', () => {
  afterEach(() => localStorage.clear());

  it('removes the answers, the done marks and every other app key', () => {
    saveAnswers({ status: 'eu', arrivalDate: '2027-03-01', stay: 'semester' });
    saveDone(new Set(['tax-code']));

    expect(clearStoredData()).toBe(true);
    expect(localStorage.getItem(ANSWERS_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(PROGRESS_STORAGE_KEY)).toBeNull();
    expect(loadAnswers()).toBeNull();
    expect(loadDone().size).toBe(0);
  });

  it('leaves keys of other apps alone', () => {
    localStorage.setItem('m2b.answers', '{}');
    localStorage.setItem('other-app', 'keep');

    clearStoredData();

    expect(localStorage.getItem('other-app')).toBe('keep');
    expect(localStorage).toHaveLength(1);
  });

  it('works when nothing is stored', () => {
    expect(clearStoredData()).toBe(true);
  });

  it('returns false when the browser does not allow it', () => {
    const blocked: ClearableStorage = {
      length: 1,
      key: () => 'm2b.answers',
      removeItem: () => {
        throw new Error('SecurityError');
      },
    };

    expect(clearStoredData(blocked)).toBe(false);
  });
});

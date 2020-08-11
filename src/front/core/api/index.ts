import AccountAPI from './account';
import QuestionAPI from './questions';

export default {
    account: new AccountAPI(),
    questions: new QuestionAPI()
}
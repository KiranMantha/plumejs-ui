import { fromEvent } from 'rxjs';

const windowClick = fromEvent(window, 'click');
export { windowClick };
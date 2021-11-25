import { fromEvent } from 'rxjs';

const windowClick: any = fromEvent(window, 'click');
export { windowClick };

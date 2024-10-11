import { Callout } from '@radix-ui/themes';
import { Provider } from 'jotai';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { fetchMe } from './core/api/user/useMeQuery';
import { meStore, updateMeStore } from './core/store';
import { InfoIcon } from './shared/svg-icons';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

void (async function () {
  try {
    const user = await fetchMe().catch(() => null);
    updateMeStore(user);

    root.render(
      <StrictMode>
        <Provider store={meStore}>
          <App />
        </Provider>
      </StrictMode>
    );
  } catch (err) {
    root.render(
      <Callout.Root color="red">
        <Callout.Icon>
          <InfoIcon />
        </Callout.Icon>
        <Callout.Text>Произошла ошибка</Callout.Text>
      </Callout.Root>
    );
  }
})();

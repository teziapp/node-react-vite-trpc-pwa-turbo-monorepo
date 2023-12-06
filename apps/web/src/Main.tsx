import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RecoilRoot } from 'recoil';
import App from './App';

// changing the inbuilt setItem function because it doesnt fire event in same window
// more on this here --> https://stackoverflow.com/a/43634169/13305008

Storage.prototype.setItem = new Proxy(Storage.prototype.setItem, {
  apply(target, thisArg, argumentList) {
    const event: StorageEvent = Object.assign(new Event('storage'), 
      {
        initStorageEvent:() => null,
        key: argumentList[0],
        newValue: argumentList[1],
        oldValue: localStorage.getItem(argumentList[0]),
        storageArea: localStorage,
        url: window.location.href
      }
    );
    window.dispatchEvent(event);
    return Reflect.apply(target, thisArg, argumentList);
  },
});

Storage.prototype.removeItem = new Proxy(Storage.prototype.removeItem, {
  apply(target, thisArg, argumentList) {
    const event: StorageEvent = Object.assign(new Event('storage'), 
      {
        initStorageEvent:() => null,
        key: argumentList[0],
        newValue: null,
        oldValue: localStorage.getItem(argumentList[0]),
        storageArea: localStorage,
        url: window.location.href
      }
    );
    window.dispatchEvent(event);
    return Reflect.apply(target, thisArg, argumentList);
  },
});

Storage.prototype.clear = new Proxy(Storage.prototype.clear, {
  apply(target, thisArg, argumentList) {
    const event: StorageEvent = Object.assign(new Event('storage'), 
      {
        initStorageEvent:() => null,
        key: '__all__',
        newValue: null,
        oldValue: null,
        storageArea: localStorage,
        url: window.location.href
      }
    );
    window.dispatchEvent(event);
    return Reflect.apply(target, thisArg, argumentList);
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </HelmetProvider>
  </React.StrictMode>,
)

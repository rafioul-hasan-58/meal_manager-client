"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { ReactNode } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ReduxProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="lottie-ring">
            <DotLottieReact
              src="https://lottie.host/38eb1f6e-5ba2-4dfb-b136-2fb1ce63d15f/1xoUyYtq5G.lottie"
              loop
              autoplay
              style={{ width: 150, height: 150 }}
            />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;

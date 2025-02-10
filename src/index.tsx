import { createRoot } from 'react-dom/client';
import { RootRouter } from './App';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { msalInstance } from '@/config';
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config';
import { RouterProvider } from 'react-router';

dayjs.extend(relativeTime);

const container = document.querySelector('#root');
const root = createRoot(container!);

await msalInstance.initialize();

root.render(
  <React.StrictMode>
    <React.Suspense>
      <QueryClientProvider client={queryClient}>
        <MsalProvider instance={msalInstance}>
          <RouterProvider router={RootRouter} />
        </MsalProvider>
      </QueryClientProvider>
    </React.Suspense>
  </React.StrictMode>
);

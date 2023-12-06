import { QueryClientProvider } from '@tanstack/react-query';
import { format } from 'date-fns';
import MotionLazyContainer from 'mui-components-tezi/animate/MotionLazyContainer';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWatchLocalStorage } from './hooks/useWatchLocalStorage';
import { allRouter, publicRouter } from './router';
import { ThemeProvider } from './theme/ThemeProvider';
import { queryClient, trpc, trpcClient } from './trpc/trpc';
import { localCacheItems } from './utils/localCacheApi';

function App() {
  
  const user = useWatchLocalStorage<localCacheItems['userObj']>('userObj');
  const activeSubscription = user?.subscription_end_date && user.subscription_end_date >= format(new Date(), 'yyyy-MM-dd');


  useEffect(() => {
    console.log('App.tsx mounted.');

    return () => {
      console.log('App.tsx unmounted.');
    }
  },[])

  return (
    <ThemeProvider>
      <MotionLazyContainer>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
          <ToastContainer />
            <RouterProvider router={(user?.og_id && activeSubscription ) ? allRouter : publicRouter} />
          </QueryClientProvider>
        </trpc.Provider>
      </MotionLazyContainer>
    </ThemeProvider>
  )
}

export default App

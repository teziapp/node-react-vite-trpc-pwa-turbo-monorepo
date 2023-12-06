import { LazyMotion, domMax } from 'framer-motion';
import { PropsWithChildren } from 'react';

// ----------------------------------------------------------------------

export default function MotionLazyContainer({ children }: PropsWithChildren) {
  return (
    <LazyMotion strict features={domMax}>
      {children}
    </LazyMotion>
  );
}

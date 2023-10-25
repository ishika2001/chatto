import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../slices/store';

interface Props {
  children: ReactNode;
}

export function Protected({ children }: Props) {
  const token = useSelector((state: RootState) => state.verifys.Token);
  const emails = useSelector((state: RootState) => state.emails.email);
  if (token && emails) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function ProtectVerify({ children }: Props) {
  const isLogin = useSelector((state: RootState) => state.checks.isCheck);
  const token = useSelector((state: RootState) => state.verifys.Token);
  const emails = useSelector((state: RootState) => state.emails.email);
  if (emails && token) {
    return <Navigate to="/" replace />;
  } else if (!isLogin) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}

export function ProtectedDashboard ({ children }: Props)  {
  const token = useSelector((state: RootState) => state.verifys.Token);
  if (!token) {
    return <Navigate to="/sign-in" replace/>;
  }
  return children;
}






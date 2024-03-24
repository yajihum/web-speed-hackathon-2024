import { Link as RouterLink } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to: string;
} & Omit<JSX.IntrinsicElements['a'], 'ref' | 'key'>;

export const Link: React.FC<Props> = ({ children, to, ...rest }) => {
  return (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  );
};

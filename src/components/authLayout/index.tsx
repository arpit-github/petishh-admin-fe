interface IProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IProps) => {
  return <>{children}</>;
};

export default AuthLayout;

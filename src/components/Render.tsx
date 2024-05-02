type IProps = {
  if: boolean;
  children: JSX.Element;
};

export const Render = (props: IProps): JSX.Element | null => {
  return props.if ? props.children : null;
};

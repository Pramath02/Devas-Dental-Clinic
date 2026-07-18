import useScrollReveal from '../hooks/useScrollReveal';

export default function ScrollAnimations({ children, as: Tag = 'div', ...props }) {
  const ref = useScrollReveal();
  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  );
}
import styles from './ListTitle.module.css'


type ListTitleProps = {
  listTitle: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
};

const ListTitle: React.FC<ListTitleProps> = ({ listTitle, headingLevel = 2 }) => {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  return <HeadingTag className={styles.title}>{listTitle}</HeadingTag>;
};

export default ListTitle;
import styles from './index.module.scss';

interface IProps {
  type?: 'circle' | 'triangle' | 'rect';
  text?: string;
}

export default function Loader({ type = 'circle', text }: Readonly<IProps>) {
  const render = () => {
    switch (type) {
      case 'triangle':
        return (
          <div className={`${styles.loader} ${styles.triangle}`}>
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
        );
      case 'rect':
        return (
          <div className={styles.loader}>
            <svg viewBox="0 0 80 80">
              <rect height="64" width="64" y="8" x="8"></rect>
            </svg>
          </div>
        );
      case 'circle':
      default:
        return (
          <div className={styles.loader}>
            <svg viewBox="0 0 80 80">
              <circle r="32" cy="40" cx="40" id="test"></circle>
            </svg>
          </div>
        );
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      {render()}
      {text && <span className="text-black dark:text-white">{text}</span>}
    </div>
  );
}

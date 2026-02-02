import { Button, Modal, Space, Typography } from "antd";
import styles from "../styles/DocPreviewModal.module.css";

type DocPreviewModalProps = {
  url: string;
  title: string;
  zoom: number;
  onZoomChange: (nextZoom: number) => void;
  onClose: () => void;
}

const getScaleClass = (zoom: number) => {
  switch (zoom) {
    case 0.75:
      return styles.scale075;
    case 1:
      return styles.scale100;
    case 1.25:
      return styles.scale125;
    case 1.5:
      return styles.scale150;
    case 1.75:
      return styles.scale175;
    case 2:
      return styles.scale200;
    case 2.25:
      return styles.scale225;
    case 2.5:
      return styles.scale250;
    default:
      return styles.scale100;
  }
};

export const DocPreviewModal = (props: DocPreviewModalProps) => {
  const safeZoom = Number.isFinite(props.zoom) ? props.zoom : 1;
  const scaleClass = getScaleClass(safeZoom);

  return (
    <Modal
      open
      onCancel={props.onClose}
      footer={null}
      title={
        <Space className={styles.titleRow}>
          <Typography.Text title={props.title}>{props.title}</Typography.Text>
          <Space>
            <Button
              onClick={() => props.onZoomChange(Math.max(0.75, Number((safeZoom - 0.25).toFixed(2))))}
              aria-label="Zoom out"
            >
              −
            </Button>
            <Typography.Text type="secondary" aria-label="Zoom level">
              {Math.round(safeZoom * 100)}%
            </Typography.Text>
            <Button
              onClick={() => props.onZoomChange(Math.min(2.5, Number((safeZoom + 0.25).toFixed(2))))}
              aria-label="Zoom in"
            >
              +
            </Button>
            <Button onClick={() => props.onZoomChange(1)} aria-label="Reset zoom">
              100%
            </Button>
            <Button href={props.url} target="_blank" rel="noreferrer">
              Open
            </Button>
          </Space>
        </Space>
      }
      width={960}
    >
      <div className={styles.viewer}>
        <div className={`${styles.scaler} ${scaleClass}`}>
          <iframe
            className={styles.frame}
            src={props.url}
            title={props.title}
            loading="lazy"
          />
        </div>
      </div>
    </Modal>
  );
};

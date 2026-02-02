import { CloseOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import type { CSSProperties, ReactNode } from "react";
import styles from "../styles/HeaderModal.module.css";

type HeaderModalProps = {
  title: ReactNode;
  brandColor?: string;
  onClose: () => void;
};

export const HeaderModal = (props: HeaderModalProps) => {
  const styleVars: CSSProperties | undefined = props.brandColor
    ? ({ "--brand-color": props.brandColor } as CSSProperties)
    : undefined;

  return (
    <div className={styles.root} style={styleVars}>
      <div aria-hidden="true" className={styles.brandBar} />
      <Flex className={styles.row} align="center" justify="space-between">
        <Typography.Text strong>{props.title}</Typography.Text>
        <Button
          type="text"
          size="small"
          aria-label="Close"
          icon={<CloseOutlined />}
          onClick={props.onClose}
          className={styles.closeBtn}
        />
      </Flex>
    </div>
  );
};

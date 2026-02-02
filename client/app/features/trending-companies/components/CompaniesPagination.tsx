import { Pagination } from "antd";

type CompaniesPaginationProps = Readonly<{
  visible: boolean;
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
  className?: string;
}>;

export const CompaniesPagination = ({
  visible,
  page,
  totalPages,
  onPageChange,
  className,
}: CompaniesPaginationProps) => {
  if (!visible) return null;

  const safeTotal = Math.max(1, totalPages);
  const safeCurrent = Math.min(Math.max(1, page), safeTotal);

  const handleChange = (next: number) => {
    const clamped = Math.min(Math.max(1, next), safeTotal);
    onPageChange(clamped);
  };

  return (
    <div className={className} aria-label="Pagination">
      <Pagination
        simple
        current={safeCurrent}
        // AntD expects "total items", so treat pages as items with pageSize=1.
        total={safeTotal}
        pageSize={1}
        showSizeChanger={false}
        onChange={handleChange}
      />
    </div>
  );
};

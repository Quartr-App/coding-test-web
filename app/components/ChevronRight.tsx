export function ChevronRight({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
      className={className}
    >
      <path
        stroke='#999'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='m9 18 6-6-6-6'
      />
    </svg>
  );
}

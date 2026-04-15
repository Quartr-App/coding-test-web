import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

const SkeletonContainer = styled.div`
  position: relative;
`;

const SkeletonOverlay = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const SkeletonBone = styled.div<{ delay?: number }>`
  position: absolute;
  background-color: #e0e0e0;
  animation: pulse 1.5s ease-in-out infinite;
  opacity: 0;
  animation: pulse 1.5s ease-in-out infinite, fadeIn 0.3s ease-out ${props => props.delay || 0}ms forwards;

  @keyframes pulse {
    0%, 100% { background-color: #e0e0e0; }
    50% { background-color: #f0f0f0; }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Content = styled.div<{ hidden: boolean }>`
  ${props => props.hidden && 'visibility: hidden;'}
`;

interface SimpleSkeletonProps {
  loading: boolean;
  bones?: Array<[number, number, number, number, number | string, boolean?]>;
  containerWidth?: number;
  containerHeight?: number;
  stagger?: number;
}

export const SimpleSkeleton: FC<PropsWithChildren<SimpleSkeletonProps>> = ({
  loading,
  bones = [],
  containerWidth = 1024,
  containerHeight = 320,
  stagger = 0,
  children
}) => {
  console.log('SimpleSkeleton render:', { loading, bonesCount: bones.length });

  if (!loading) {
    return <>{children}</>;
  }

  return (
    <SkeletonContainer>
      <Content hidden={loading}>{children}</Content>
      {loading && bones.length > 0 && (
        <SkeletonOverlay>
          <div style={{ position: 'relative', width: '100%', height: containerHeight }}>
            {bones.map((bone, i) => {
              const [x, y, w, h, r, isCircle] = bone;
              const pxW = (w / 100) * containerWidth;
              const isReallyCircle = r === '50%' && Math.abs(pxW - h) < 4;

              return (
                <SkeletonBone
                  key={i}
                  delay={stagger * i}
                  style={{
                    left: `${x}%`,
                    top: y,
                    width: isReallyCircle ? h : `${w}%`,
                    height: h,
                    borderRadius: typeof r === 'string' ? r : `${r}px`,
                  }}
                />
              );
            })}
          </div>
        </SkeletonOverlay>
      )}
    </SkeletonContainer>
  );
};

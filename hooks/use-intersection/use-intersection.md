$:usage
import { useRef } from 'react';

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
  root: containerRef.current,
  threshold: 1,
  });

    return (
      <div ref={containerRef} style={{ overflowY: 'scroll' }}>
        <div>
          <div
            ref={ref}
            style={{
              backgroundColor: entry?.isIntersecting
                ? 'cyan'
                : 'red',
            }}
          >
            <h6>
              {entry?.isIntersecting ? 'Fully visible' : 'Obscured'}
            </h6>
          </div>
        </div>
      </div>
    );

}

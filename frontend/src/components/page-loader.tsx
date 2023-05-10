import { Loader } from '@mantine/core';

export const PageLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Loader size={60} />
      </div>
    </div>
  );
};

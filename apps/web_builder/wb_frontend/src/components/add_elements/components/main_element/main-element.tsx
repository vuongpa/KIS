import { useNode } from '@craftjs/core';
import { ReactNode } from 'react';

interface DeviceMockupProps {
  width?: string;
  height?: string;
  name?: string;
  gap?: string;
  padding?: string;
  children?: ReactNode;
}

export const DeviceMockup = ({
  width = '940px',
  height = '700px',
  name = '💻 Desktop',
  gap = '0px',
  padding = '0px',
  children,
}: DeviceMockupProps) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div
      ref={connect as unknown as React.Ref<HTMLDivElement>}
      className="bg-white p-4 rounded-lg shadow-lg"
      style={{ gap }}>
      <h3 className="text-center text-gray-700 font-semibold">{name}</h3>
      <div
        className="border-solid border-4 border-gray-300 mx-auto rounded-lg bg-gray-50 shadow-inner"
        style={{ width: width, height: height, padding: padding }}>
        <div className="h-full w-full flex flex-col">{children}</div>
      </div>
    </div>
  );
};

DeviceMockup.craft = {
  displayName: 'DeviceMockup',
  props: {
    width: '840px',
    height: '500px',
    name: '💻 Desktop',
    gap: '0px',
    padding: '0px',
  },
  rules: {
    canDrop: () => true,
  },
};

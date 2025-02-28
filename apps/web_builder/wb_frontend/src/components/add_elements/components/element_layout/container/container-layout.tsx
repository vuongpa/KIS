import { useEditor, useNode } from '@craftjs/core';
import React, { useState } from 'react';
import { DeleteContextMenu } from '../../../delete_context_menu/delete-context-menu';
import { DefaultContainerProperties, getDefaultContainerProperties } from './container-properties';
import { ContainerProperties } from './properties-container-panel';
import { Resizer } from '../resizer';

export const ContainerLayout = (props: Partial<DefaultContainerProperties>) => {
  const { selected, id } = useNode((node) => ({
    selected: node.events.selected,
    id: node.id,
  }));

  const { actions } = useEditor();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const {
    justifyContent,
    flexDirection,
    alignItems,
    fillSpace,
    backgroundColor,
    textColor,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    boxShadow,
    borderRadius,
    display = 'flex',
    gap,
    position = 'relative',
    top,
    left,
    right,
    bottom,
    zIndex,
    overflow,
    opacity,
    children,
  } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log('Node clicked and selected:', id);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <Resizer
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      propKey={{ width: 'width', height: 'height' }}
      style={{
        display,
        gap,
        position,
        top,
        left,
        right,
        bottom,
        zIndex,
        overflow,
        opacity,
        outline: selected ? '2px solid gray' : 'none',
        justifyContent,
        flexDirection,
        alignItems,
        background: backgroundColor,
        color: textColor,
        padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
        margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`,
        boxShadow,
        borderRadius,
        flex: fillSpace === 'yes' ? 1 : 'unset',
      }}>
      {children}
      <DeleteContextMenu nodeId={id} onClose={handleCloseContextMenu} position={contextMenu} onDelete={() => {}} />
    </Resizer>
  );
};

ContainerLayout.craft = {
  displayName: 'ContainerLayout',
  props: getDefaultContainerProperties(),
  rules: {
    canDrop: () => true,
  },
  related: {
    toolbar: ContainerProperties,
  },
};

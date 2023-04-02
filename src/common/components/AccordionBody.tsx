import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, useState } from 'react';
import { Transition } from 'react-transition-group';

const ANIM_DURATION_MS = 350;
const TRANSITION = `height ${ANIM_DURATION_MS}ms ease`;

export type AccordionBodyProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
};

const AccordionBody = ({ children, isOpen, className }: AccordionBodyProps) => {
  const [style, setStyle] = useState<Readonly<CSSProperties>>({ display: 'none' });

  const onEnter = () =>
    setStyle({ height: '0px' })

  function onEntering(node: any) {
    setStyle({
      height: node.scrollHeight,
      overflow: 'hidden',
      transition: TRANSITION
    });
  }

  const onExit = (node: any) =>
    setStyle({
      height: node.scrollHeight
    });

  const onExiting = (node: any) => {
    // Keep this: It triggers a reflow
    const unused = node.scrollHeight;
    setStyle({
      height: 0,
      overflow: 'hidden',
      transition: TRANSITION
    });
  }

  const onExited = (node: any) =>
    setStyle({
      display: 'none'
    });

  return <Transition
    in={isOpen}
    timeout={ANIM_DURATION_MS}
    onEnter={onEnter}
    onEntering={onEntering}
    onEntered={() => setStyle({})}
    onExit={onExit}
    onExiting={onExiting}
    onExited={onExited}
  >
    {state => {
      return (
        <div
          data-testid='accordion-body'
          className='accordion-body'
          style={style}>
          <div className={classNames('p-3 border-t', className)}>
            {children}
          </div>
        </div>
      );
    }}
  </Transition>;
}

export default AccordionBody;

import React, { Fragment, useState, useRef } from 'react';

export const Accordion = ({
  title = <Fragment />,
  content = <Fragment />,
  defaultExpanded = false,
}) => {
  const [height, setHeight] = useState('0px')
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
    setHeight(isExpanded ? '0px' : `${contentSpace.current.scrollHeight}px`)
  }

  const contentSpace = useRef(null);
  
  return (
    <div className="flex flex-col w-full">
       <div
        className="box-border w-full appearance-none cursor-pointer focus:outline-none flex justify-between"
        onClick={toggleAccordion}
      >
        {title}
      </div>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        <div className="">{content}</div>
      </div>
    </div>
  )
}
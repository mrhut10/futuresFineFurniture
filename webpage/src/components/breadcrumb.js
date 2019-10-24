import react from 'react';

const Breadcrumb = ({ children }) => (
  <ol>
    {Array(children).map((child, index) => (
      <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
    ))}
  </ol>
);

const BreadcrumbItem = ({ children, ...props }) => (
  <li className="breadcrumb-item" {...props}>{ children }</li>
);

export default {
  Breadcrumb,
  BreadcrumbItem,
};

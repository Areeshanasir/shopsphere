import "./EmptyState.css";
const EmptyState = ({
  title = "No Products Found",
  message = "Try changing your search or filter."
}) => {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
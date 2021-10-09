import "./Pagination.scss";
export const Pagination = ({ signalsPerPage, totalSignals, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalSignals / signalsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

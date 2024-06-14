import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");
  const [order, setOrder] = useState("asc");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAuthors();
  }, [page, search, sort, order, limit]);

  const fetchAuthors = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/authors", {
        params: {
          page,
          limit,
          search,
          sort,
          order,
        },
      });
      setAuthors(response.data.authors);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Erreur de récupération des données.");
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Liste des Publications</h1>
      <p className="text-center">
        Découvrez les publications disponibles dans notre base de données.
      </p>
      <div className="mb-3 row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Recherche..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <select
            className="form-select me-2"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="title">Titre</option>
            <option value="year">Année</option>
            <option value="booktitle">Livre</option>
          </select>
          <select
            className="form-select me-2"
            value={order}
            onChange={handleOrderChange}
          >
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
          <select
            className="form-select"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="card mb-3">
            <div className="card-body">
              {authors.length > 0 ? (
                <ul className="list-group">
                  {authors.map((publi) => (
                    <li key={publi._id} className="list-group-item">
                      <h5>{publi.title}</h5>
                      <p>
                        <strong>Auteurs:</strong> {publi.authors.join(", ")}
                      </p>
                      <p>
                        <strong>Année:</strong> {publi.year}
                      </p>
                      <p>
                        <strong>Livre:</strong> {publi.booktitle}
                      </p>
                      <a
                        href={`http://dblp.uni-trier.de/${publi.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Voir Plus
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="alert alert-info">Aucun résultat trouvé.</div>
              )}
            </div>
          </div>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Précédent
                </button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">
                  Page {page} sur {totalPages}
                </span>
              </li>
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Suivant
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default App;

import "./Signals.scss";
import { useState, useEffect } from "react";
import dateFormat from "dateformat";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSignal } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from "../Pagination/Pagination";
import { Link } from "react-router-dom";

export const Signals = () => {
  const [signals, setSignals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [signalsPerPage] = useState(10);

  const getCookie = () => {
    const cookie = document.cookie;
    const token = cookie.split("=");
    return token;
  };

  useEffect(() => {
    (async () => {
      const token = await getCookie()[1];
      console.log(token);
      const response = await fetch(
        `http://localhost:8010/proxy/api/v1/Signals?Page=1&Limit=25`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setSignals(data.items);
    })();
  }, []);

  const indexOfLastSignal = currentPage * signalsPerPage;
  const indexOfFirstSignal = indexOfLastSignal - signalsPerPage;
  const currentSignals = signals.slice(indexOfFirstSignal, indexOfLastSignal);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="containerSignal">
      <div className="tableContent">
        <Link className="homeLink" to="/">
          <h2 className="text-center titleSignal">
            <Icon icon={faSignal} />
            &nbsp; Signals
          </h2>
        </Link>

        <table
          className="table table-bordered"
          style={{
            border: "1px solid lightgray",

            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 8px 8px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
          }}
        >
          <thead>
            <tr>
              <th>alarmNum</th>
              <th>eventCodeDesc</th>
              <th>pointDesc</th>
              <th>signalCode</th>
              <th>xmit</th>
              <th>siteDate</th>
            </tr>
          </thead>
          <tbody>
            {currentSignals ? (
              currentSignals.map((signal) => {
                return (
                  <tr key={signal.signalId}>
                    <td data-title="Alarm #">{signal.alarmNum}</td>
                    <td data-title="Code Desc" className="desc">
                      {signal.eventCodeDesc}
                    </td>
                    <td data-title="Point Desc">{signal.pointDesc}</td>
                    <td data-title="Signal Code">{signal.signalCode}</td>
                    <td data-title="Xmit">{signal.xmit}</td>
                    <td data-title="Date">
                      {dateFormat(signal.siteDate, "mm/dd/yyyy HH:MM:ss")}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        paginate={paginate}
        signalsPerPage={signalsPerPage}
        totalSignals={signals.length}
      />
    </div>
  );
};

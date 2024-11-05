import React, { useState, useEffect } from "react";
import axios, { useMemo } from "axios";
import ApiConstants from "../../../Services/apiconstants";
import DataTable from "react-data-table-component";
import "./allCompanies.css";
import { useSelector } from "react-redux";
import { Interceptor } from "../../../ErrorStatus/errorStatus"

export default function AllCompanies() {
  const [values, setValues] = useState({
    companyData: {},
  })
  const [pending, setPending] = useState(true);
  const [columnsList, setColumnsList] = useState([]);
  const searchItem = useSelector((state) => state.searchBar);
  const companyUserData = () => {
    axios
      .get(ApiConstants.COMPANY_DATA)
      .then((response) => {
        setValues({ ...values, companyData: response.data.company });
      })
      .catch((error) => {
        if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
          Interceptor(error.response.status)
        }
        // Swal.fire({
        //   title: error.response.data.error,
        //   icon: "error",
        //   width: 400,
        //   height: 100,
        // });
      });
  };
  useEffect(() => {
    companyUserData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setColumnsList([
        {
          name: "Id",
          cell: (row, index) => index + 1,
          sortable: true,
        },
        {
          name: "Company Name",
          selector: (row) => row.companyName,
          sortable: true,
        },
        {
          name: "Company Email",
          selector: (row) => row.email,
          sortable: true,
        },
      ]);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [])


  return (
    <>
      <div className="table myTables">
        {Object.keys(values.companyData).length && (
          <DataTable
            title="All Companies"
            striped
            responsive
            pagination
            paginationRowsPerPageOptions={[10, 15, 20]}
            paginationPerPage={10}
            highlightOnHover
            columns={columnsList}
            progressPending={pending}
            data={values.companyData.filter((item) => {
              if (searchItem.initialValue === "") {
                return item;
              } else if (
                item.companyName.toLowerCase().includes(searchItem.initialValue.toLowerCase())
              ) {
                return item;
              }
            })}
          />
        )}
      </div>
    </>
  );
}

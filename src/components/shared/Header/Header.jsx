import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../LoadingIndicator/LoadingIndicator";
import { LoadingContext } from "../../../App";


export const Header = () => {
  const isLoading = useContext(LoadingContext);

  return (
    <div className="row mt-4 mb-2">
      <div className="col-12">
        <div className="d-flex justify-content-between">
          <Link to={"/"}>
            <p className="text-primary m-0">Podcaster</p>
          </Link>
          <LoadingIndicator visible={isLoading}/>
        </div>
        <hr />
      </div>
    </div>
  );
};

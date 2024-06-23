import React, { useEffect, useState } from "react";
import FilterAccordion from "../components/home/FilterAccordion";
import SearchBar from "../components/home/Search";
import Grid from "../components/home/Grid";
import Pagination from "../components/pagination/Pagination";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;

let PageSize = 6;
const getPageNumber = (search) => {
  const queryParams = search.split("&");
  const pageParam = queryParams.find((param) => param.startsWith("page="));
  if (pageParam) {
    const pageNo = parseInt(pageParam.split("=")[1], 10);
    return pageNo;
  } else {
    return 1;
  }
};

const Home = () => {
  const { search } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(getPageNumber(search) || 1);
  const navigate = useNavigate();
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  let toAdd = ``;

  function convertToValueFormat(str) {
    return str.split(" ").join("+");
  }
  const handleSelection = (value, category) => {
    switch (category) {
      case "technologies":
        setSelectedTechnologies((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "branches":
        setSelectedBranches((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "years":
        setSelectedYears((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };
  const applyPageChange = () => {
    toAdd = `/users?page=${currentPage}`;
    goToNewUrl();
  }
  const applyFilters = () => {
    toAdd = `/users?page=1`;
    setCurrentPage(1);
    goToNewUrl();
  };
  const goToNewUrl = () => {
    if (selectedTechnologies.length > 0) {
      selectedTechnologies.map((tech) => {
        toAdd += `&tech=${convertToValueFormat(tech)}`;
      });
    }

    if (selectedBranches.length > 0) {
      selectedBranches.map((br) => {
        toAdd += `&branch=${convertToValueFormat(br)}`;
      });
    }

    if (selectedYears.length > 0) {
      selectedYears.map((yr) => {
        toAdd += `&year=${convertToValueFormat(yr)}`;
      });
    }

    if (searchQuery) {
      toAdd += `&query=${convertToValueFormat(searchQuery)}`;
    }
    navigate(toAdd);
  }
  const clearFilters = () => {
    setSelectedTechnologies([]);
    setSelectedBranches([]);
    setSelectedYears([]);
    navigate("/users?page=1");
  };
  const getData = async () => {
    try {
      console.log(search);
      console.log(url);
      const { data } = await axios.get(
        `${url}/user/users${search}`,
        { withCredentials: true }
      );
      setData(data?.users);
      setTotalCount(data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);
  useEffect(() => {
    applyFilters();
  }, [searchQuery]);
  useEffect(()=>{
    applyPageChange();
  },[currentPage])
  return (
    <div className="h-[90vh] flex flex-row w-full">
      <div className="w-1/5 pt-4 pl-4">
        <FilterAccordion
          selectedTechnologies={selectedTechnologies}
          selectedBranches={selectedBranches}
          selectedYears={selectedYears}
          handleSelection={handleSelection}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      </div>
      <div className="w-4/5 flex flex-col">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="w-full">
          <Grid users={data} />
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

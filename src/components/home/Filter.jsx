import { useState } from "react";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;

const sortOptions = [
  { name: "Passing Year - High to Low", href: "#", current: true },
  { name: "Passing Year - Low to High", href: "#", current: false },
  { name: "Working", href: "#", current: false },
];
const subCategories = [
  { name: "Web Development", href: "#", value: "web+development" },
  { name: "App Development", href: "#", value: "app+development" },
  { name: "Cloud & Devops", href: "#", value: "cloud+devops" },
  { name: "Machine Learning", href: "#", value: "machine+learning" },
  { name: "Artificial Intelligence", href: "#", value: "artificial+intelligence" },
  { name: "Automation", href: "#", value: "automation" }, 
  { name: "Data Structures", href: "#", value: "data+structures" },
  { name: "Competitive Programming", href: "#", value: "competitive+programming" },
];

const technologies = [
  { "value": "Flutter", "label": "Flutter", "checked": false },
  { "value": "React", "label": "React", "checked": false },
  { "value": "Angular", "label": "Angular", "checked": false },
  { "value": "Vuejs", "label": "Vue.js", "checked": false },
  { "value": "Nodejs", "label": "Node.js", "checked": false },
  { "value": "Spring boot", "label": "Spring Boot", "checked": false },
  { "value": "React Native", "label": "React Native", "checked": false },
  { "value": "Swift", "label": "Swift", "checked": false }
]

const branches = [
  { value: "Computer Science", label: "Computer Science", checked: false },
  { value: "Electronics", label: "Electronics", checked: false },
  { value: "Information Technology", label: "Information Technology", checked: false },
];
const years = [
  { value: "2024", label: "2024", checked: false },
  { value: "2025", label: "2025", checked: false },
  { value: "2026", label: "2026", checked: false },
];

const Filter = () => {
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  function convertToValueFormat(str) {
    return str.toLowerCase().split(' ').join('+');
  }
  const [search,setSearch] = useState("");
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

  const applyFilters = async() => {
    console.log("Selected Technologies:", selectedTechnologies);
    console.log("Selected Branches:", selectedBranches);
    console.log("Selected Years:", selectedYears);
    // Apply filters to your data here

    // const queryParams = new URLSearchParams();
    const queryUrl = "1"
    const queryParams = {};
    let toAdd = `${url}/user/users?page=1`;
    let filterFrontend="";
    if (selectedTechnologies.length > 0) {
      
      selectedTechnologies.map((tech)=> {
        toAdd += `&tech=${convertToValueFormat(tech)}`
        filterFrontend += `&tech=${convertToValueFormat(tech)}`
      })
    }

    if (selectedBranches.length > 0) {
      selectedBranches.map((br)=> {
        toAdd += `&branch=${convertToValueFormat(br)}`
        toAdd += `&branch=${convertToValueFormat(br)}`
      })
    }

    if (selectedYears.length > 0) {
      selectedYears.map((yr)=> {
        toAdd += `&year=${convertToValueFormat(yr)}`
        toAdd += `&year=${convertToValueFormat(yr)}`
      })
    }

    if(search){
      toAdd+= `&query=${convertToValueFormat(search)}`
    }
    console.log(toAdd);

    try {
      
    } catch (error) {

    }
  };

  // Function to clear filters
  const clearFilters = () => {
    setSelectedTechnologies([]);
    setSelectedBranches([]);
    setSelectedYears([]);
  };

  return (
    <div className="filter-container">
      <div>
        <input type="text" placeholder="Search..." value = {search} onChange={(e)=>setSearch(e.target.value)}/>
        <h3>Filter By Technology</h3>
        {technologies.map((tech, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              id={tech.value}
              checked={selectedTechnologies.includes(tech.value)}
              onChange={() => handleSelection(tech.value, "technologies")}
            />
            <label htmlFor={tech.value}>{tech.label}</label>
          </div>
        ))}
      </div>
      <div>
        <h3>Filter By Branch</h3>
        {branches.map((branch, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              id={branch.value}
              checked={selectedBranches.includes(branch.value)}
              onChange={() => handleSelection(branch.value, "branches")}
            />
            <label htmlFor={branch.value}>{branch.label}</label>
          </div>
        ))}
      </div>
      <div>
        <h3>Filter By Year</h3>
        {years.map((year, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              id={year.value}
              checked={selectedYears.includes(year.value)}
              onChange={() => handleSelection(year.value, "years")}
            />
            <label htmlFor={year.value}>{year.label}</label>
          </div>
        ))}
      </div>
      <button onClick={applyFilters}>Apply Filters</button>
      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};



export default Filter;

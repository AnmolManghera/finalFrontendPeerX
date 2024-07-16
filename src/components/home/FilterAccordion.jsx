import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
  ButtonGroup,
  Button
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const technologies = [
  { value: "Flutter", label: "Flutter", checked: false },
  { value: "React", label: "React", checked: false },
  { value: "Angular", label: "Angular", checked: false },
  { value: "Vuejs", label: "Vue.js", checked: false },
  { value: "Nodejs", label: "Node.js", checked: false },
  { value: "Spring Boot", label: "Spring Boot", checked: false },
  { value: "React Native", label: "React Native", checked: false },
  { value: "Swift", label: "Swift", checked: false },
];

const branches = [
  { value: "Computer Science", label: "Computer Science", checked: false },
  { value: "Electronics", label: "Electronics", checked: false },
  {
    value: "Information Technology",
    label: "Information Technology",
    checked: false,
  },
];
const years = [
  { value: "2024", label: "2024", checked: false },
  { value: "2025", label: "2025", checked: false },
  { value: "2026", label: "2026", checked: false },
];


export default function FilterAccordion({selectedTechnologies,selectedBranches, selectedYears,handleSelection,applyFilters,clearFilters}) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  
  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Filter By Tech Stack
        </AccordionHeader>
        <AccordionBody>
          {technologies.map((tech, idx) => (
            <Checkbox
              label={tech.value}
              key={idx}
              checked={selectedTechnologies.includes(tech.value)}
              onChange={() => handleSelection(tech.value, "technologies")}
            />
          ))}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Filter By Branch
        </AccordionHeader>
        <AccordionBody>
        {branches.map((branch, idx) => (
            <Checkbox
            key = {idx}
              label={branch.value}
              checked={selectedBranches.includes(branch.value)}
              onChange={() => handleSelection(branch.value, "branches")}
            />
            
        ))}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Filter By Passing Year
        </AccordionHeader>
        <AccordionBody>
        {years.map((yr, idx) => (
            <Checkbox
            key = {idx}
              label={yr.value}
              checked={selectedYears.includes(yr.value)}
              onChange={() => handleSelection(yr.value, "years")}
            />
            
        ))}
        </AccordionBody>
      </Accordion>
      <div className="pt-5">
      <ButtonGroup>
        <Button onClick={applyFilters}>Apply Filter</Button>
        <Button onClick={clearFilters}>Remove Filter</Button>
      </ButtonGroup>
    </div>
    </>
  );
}

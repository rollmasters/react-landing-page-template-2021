import React from "react";
import styles from "./FilterComponent.module.css";
import {FilterTypes} from '../../Types/FilterTypes';
import Image from "next/image";

type FilterComponentProps = {
    filter: FilterTypes;
    onFilterChange: (filter: FilterTypes) => void;
};

type FilterButtonProps = {
    type: FilterTypes;
    filter: FilterTypes;
    onFilterChange: (filter: FilterTypes) => void;
    imgSrc: string;
    altText: string;
};

const FilterButton = ({type, filter, onFilterChange, imgSrc, altText}: FilterButtonProps) => (
    <button
        className={`${styles["filter-button"]} ${filter === type ? styles["active"] : ""}`}
        onClick={() => onFilterChange(type)}
    >
        <div className={`${styles["circle"]} ${filter === type ? styles["large"] : ""}`}>
            <img
            src={imgSrc}
            alt={altText}
            width={filter === type ? 60 : 40}
            height={filter === type ? 60 : 40}
            className={`${styles["filter-image"]} ${filter === type ? styles["filter-image-large"] : ""}`}
        />
            {/*<Image
                src={imgSrc}
                alt={altText}
                width={filter === type ? 60 : 40}
                height={filter === type ? 60 : 40}
                className={`${styles["filter-image"]} ${filter === type ? styles["filter-image-large"] : ""}`}
            />*/}
        </div>
    </button>
);
export default function FilterComponent({filter, onFilterChange}: FilterComponentProps) {
    return (
        <div className={styles["filter-container"]}>
            <FilterButton
                type={FilterTypes.TOPS}
                filter={filter}
                onFilterChange={onFilterChange}
                imgSrc="/img/tshirt_4715759.png"
                altText="tops"
            />
            <FilterButton
                type={FilterTypes.BOTTOMS}
                filter={filter}
                onFilterChange={onFilterChange}
                imgSrc="/img/clothes_16092464.png"
                altText="bottoms"
            />
            <FilterButton
                type={FilterTypes.OVER_WEARS}
                filter={filter}
                onFilterChange={onFilterChange}
                imgSrc="/img/parka_3798182.png"
                altText="overwears"
            />
            <FilterButton
                type={FilterTypes.FULLBODYS}
                filter={filter}
                onFilterChange={onFilterChange}
                imgSrc="/img/clothes_12839267.png"
                altText="overwears"
            />
        </div>
    );
}
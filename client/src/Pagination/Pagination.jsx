import { useState, useEffect } from "react";
const Pagination = () => {
    const sampleData = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" },
        { id: 5, name: "Item 5" },
        { id: 6, name: "Item 6" },
        { id: 7, name: "Item 7" },
        { id: 8, name: "Item 8" },
        { id: 9, name: "Item 9" },
        { id: 10, name: "Item 10" },
        { id: 11, name: "Item 11" },
        { id: 12, name: "Item 12" },
        { id: 13, name: "Item 13" },
        { id: 14, name: "Item 14" },
        { id: 15, name: "Item 15" },
        { id: 16, name: "Item 16" },
        { id: 17, name: "Item 17" },
        { id: 18, name: "Item 18" },
        { id: 19, name: "Item 19" },
        { id: 20, name: "Item 20" },
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const itemsToShow = sampleData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sampleData.length / itemsPerPage);
    const handleNextClick = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePrevClick = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    return (
        <div className="container mx-auto w-96 p-4 text-center">
            <div className="card bg-neutral text-neutral-content p-4">
                <ul>
                    {itemsToShow.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <div className="btn-group mt-4">

                    <button className={`btn ${currentPage > 1 ? "" : "btn-disabled"}`} onClick={handlePrevClick}>
                        Prev
                    </button>
                    <span className="btn btn-ghost">{currentPage}</span>

                    <button className={`btn ${currentPage < totalPages ? "" : "btn-disabled"}`} onClick={handleNextClick}>
                        Next
                    </button>

                </div>
            </div>
        </div>
    );
}
export default Pagination;
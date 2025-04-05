"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [everythingNewsResponse, setEverythingNewsResponse] = useState([]);

  const url =
    "https://newsapi.org/v2/everything?q=bitcoin&apiKey=01ea484ef48b424bb8abc8e7e6f58b44";

  async function getEverythingNews() {
    try {
      let data = await fetch(url);
      let response = await data.json();
      console.log("response:", response);
      setEverythingNewsResponse(response.articles || []); // Ensure it's an array
    } catch (error) {
      console.log("error: everythingNewsResponse", error);
    }
  }

  useEffect(() => {
    getEverythingNews();
  }, []);

  function PaginatedItems({ items, itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <div  className="news-container md:grid md:grid-cols-3 m-2">
          {currentItems.map((el, i) => (
            <div key={i} className="news-item md:border-1 p-2">
              <h3>{el.title}</h3>
              <p>{el.description}</p>
              <p><strong>Author:</strong> {el.author || "Unknown"}</p>
              <p><strong>Published At:</strong> {new Date(el.publishedAt).toLocaleString()}</p>
              {el.urlToImage ? (
                <Image src={el.urlToImage} width={400} height={400} alt="News Image" />
              ) : (
                <p>No Image Available</p>
              )}
              <a href={el.url} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          ))}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
          className="flex"
        />
      </>
    );
  }

  return (
    <div className="container">
      <h1>Latest Bitcoin News</h1>
      <PaginatedItems  items={everythingNewsResponse} itemsPerPage={6} />
    </div>
  );
}

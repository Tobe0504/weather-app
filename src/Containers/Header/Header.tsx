import React, { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Input from "../../Components/Input/Input";
import Loader from "../../Components/Loader/Loader";
import { AppContext } from "../../Context/AppContext";
import { inputChangeHandler } from "../../HelperFunctions/inputChangeHandler";
import classes from "./Header.module.css";

const Header = () => {
  // Context
  const { countries, setBookmarks } = useContext(AppContext);

  // States
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Refs
  const dropdown = useRef<HTMLDivElement | null>(null);

  // Router
  const [, setSearchParams] = useSearchParams();

  // Requests

  // Effects
  useEffect(() => {
    const clearDropdown = (e: any) => {
      if (dropdown.current && !dropdown?.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", clearDropdown);

    return () => {
      document.removeEventListener("mousedown", clearDropdown);
    };
  }, []);

  return (
    <section className={classes.container} ref={dropdown}>
      <Input
        placeholder="Search"
        name="search"
        onChange={(e) => {
          inputChangeHandler(e, setSearch, true);
        }}
        value={search}
        onKeyup={() => {
          setShowDropdown(true);
        }}
      />

      {showDropdown && (
        <div ref={dropdown}>
          <Card className={classes.countryDropdown}>
            {countries.isLoading ? (
              <Loader />
            ) : (
              countries.data
                ?.filter((data: any) => {
                  return data?.name?.common
                    ?.toLowerCase()
                    .includes(search?.toLowerCase());
                })
                ?.sort((a: any, b: any) => {
                  return a?.name?.common - b?.name?.common;
                })
                ?.map((data: any) => {
                  return (
                    <div
                      onClick={() => {
                        setSearchParams({
                          selectedCountry: data?.name?.common
                            ?.replaceAll(" ", "-")
                            .toLowerCase(),
                        });
                      }}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() =>
                          setBookmarks((prevState) => {
                            if (prevState?.length > 0) {
                              return [...prevState, data];
                            } else {
                              return [data];
                            }
                          })
                        }
                      >
                        <path
                          d="M25 4C16.7179 4 10 10.5835 10 18.7C10 29.725 25 46 25 46C25 46 40 29.725 40 18.7C40 10.5835 33.2821 4 25 4ZM25 23.95C22.0429 23.95 19.6429 21.598 19.6429 18.7C19.6429 15.802 22.0429 13.45 25 13.45C27.9571 13.45 30.3571 15.802 30.3571 18.7C30.3571 21.598 27.9571 23.95 25 23.95Z"
                          fill="white"
                        />
                      </svg>
                      <span>{data?.name?.common}</span>
                    </div>
                  );
                })
            )}
          </Card>
        </div>
      )}
    </section>
  );
};

export default Header;

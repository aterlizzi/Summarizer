import React, { useState } from "react";
import SideBar from "./SideBar";
import styles from "../../styles/components/DefaultDisplay.module.scss";
import CreateBundle from "./CreateBundle";
import { useQuery } from "urql";
import SearchBar from "./SearchBar";
import Slider from "./Slider";

const Me = `
    query{
        me{
            bundles{
                title
            }
            settings{
              extensionSettings{
                lastBundleSortType
              }
            }
        }
    }
`;

const ReturnBundles = `
    query($sort: String){
      returnBundles(sort: $sort){
        title
        id
      }
    }
`;

function DefaultDisplay({
  setSection,
  section,
  popupSection,
  setPopupSection,
}) {
  const [sort, setSort] = useState("");
  const [execute, setExecute] = useState(false);
  const [result, rexecuteMe] = useQuery({ query: Me });
  const [bundleResult, reexecuteBundle] = useQuery({
    query: ReturnBundles,
    variables: { sort },
    pause: !execute,
  });

  return (
    <>
      <SideBar
        setPopupSection={setPopupSection}
        popupSection={popupSection}
        setSection={setSection}
        section={section}
        bundleResult={bundleResult}
        reexecuteBundle={reexecuteBundle}
        meResult={result}
        setSort={setSort}
        sort={sort}
        setExecute={setExecute}
      />
      <section className={styles.home}>
        <SearchBar />
        <Slider type={"recentReads"} title={"Recently Read"} />
      </section>
      {popupSection === "Create_Bundle" ? (
        <CreateBundle
          setPopupSection={setPopupSection}
          reexecuteBundle={reexecuteBundle}
        />
      ) : null}
    </>
  );
}

export default DefaultDisplay;

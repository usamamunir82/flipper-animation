
import React, {  useEffect, useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import Card from "./Card";
import data from "./data";

const ListExample = ()=>{
  
  const [state,setState]=useState({
    type: "list",
    sort: "asc",
    filteredIds: [],
    stagger: "forward",
    spring: "noWobble"
  })
  // console.log(state)

 const addToFilteredIds = id => {
  console.log(id)
  // setState({...state, filteredIds: state.filteredIds.concat(id)})
    setState(prevState => {
    
      console.log(prevState)
      return {
        ...state,
        filteredIds: prevState.filteredIds.concat(id)
      };
    });
  };
  
  return (
    <div className="fm-example">
    
        <Flipper
          flipKey={`${state.type}-${state.sort}-${JSON.stringify(
            state.filteredIds
          )}-${JSON.stringify(state.stagger)}`}
          spring={state.spring}
          staggerConfig={{
            default: {
              reverse: state.stagger !== "forward",
              speed: 1
            }
          }}
          decisionData={state}
        >
          <div className="fm-flex-container">
            <fieldset>
              <legend>Sort</legend>
              <label
                onClick={() => {
                  setState({
                    sort: "asc"
                  });
                }}
              >
                <input
                  type="radio"
                  name="sort"
                  checked={state.sort === "asc"}
                />
                asc
              </label>
              <label
                onClick={() => {
                  setState({
                    sort: "desc"
                  });
                }}
              >
                <input
                  type="radio"
                  name="sort"
                  checked={state.sort === "desc"}
                />
                desc
              </label>
            </fieldset>

            <fieldset>
              <legend>Type</legend>
              <label
                onClick={() => {
                  setState({
                    type: "grid"
                  });
                }}
              >
                <input
                  type="radio"
                  name="type"
                  checked={state.type === "grid"}
                />
                grid
              </label>
              <label
                onClick={() => {
                  setState({
                    type: "list"
                  });
                }}
              >
                <input
                  type="radio"
                  name="type"
                  checked={state.type === "list"}
                />
                list
              </label>
            </fieldset>

            <fieldset>
              <legend>Stagger</legend>
              <div className="fm-flex-container">
                {["forward", "reverse", "none"].map(type => {
                  return (
                    <label>
                      <input
                        type="radio"
                        name="stagger"
                        checked={state.stagger === type}
                        onChange={() => {
                          setState({
                            stagger: type,
                            sort: state.sort === "asc" ? "desc" : "asc"
                          });
                        }}
                      />
                      {type}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <fieldset>
              <legend>Spring</legend>
              {["stiff", "noWobble", "veryGentle", "gentle", "wobbly"].map(
                type => {
                  return (
                    <label>
                      <input
                        type="radio"
                        name="spring"
                        checked={state.spring === type}
                        onChange={() => {
                          setState({
                            spring: type,
                            sort: state.sort === "asc" ? "desc" : "asc"
                          });
                        }}
                      />
                      {type}
                    </label>
                  );
                }
              )}
            </fieldset>
          </div>
          <div>
            {state.filteredIds.length > 0 && (
              <button
              className="fm-show-all"
              onClick={() => {
                setState({
                  filteredIds: []
                });
              }}
              >
                
                show all cards
              </button>
            )}
          </div>

          <Flipped flipId="list">
            <div className={state.type === "grid" ? "fm-grid" : "fm-list"}>
              <Flipped inverseFlipId="list">
                <ul className="list-contents">
                  {[...data]
                    .filter(d => !state.filteredIds.includes(d.id))
                    .sort((a, b) => {
                      if (state.sort === "asc") {
                        return a.id - b.id;
                      } else {
                        return b.id - a.id;
                      }
                    })
                    .map(({ title, id }) => (
                      <Card
                        id={id}
                        title={title}
                        stagger={["forward", "reverse"].includes(
                          state.stagger
                        )}
                        type={state.type}
                        key={id}
                        addToFilteredIds={addToFilteredIds}
                      />
                    ))}
                </ul>
              </Flipped>
            </div>
          </Flipped>
        </Flipper>
      </div>
    );
  }

export default ListExample;

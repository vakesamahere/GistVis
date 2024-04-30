import React from "react";
import { Sparkline, Trend } from "./widgets/sparkline";
import Barchart from "./widgets/barchart";
import Piechart from "./widgets/piechart";
import Extremechart from "./widgets/maxmin";
import "./page.css";
import { demo2_1 } from "../demo/demo2_1";

const ArtcleProcess = (llmarticle) => {
  let optionsDefault = {
    width: 75,
    height: 30,
    data: [20, 20, 25, 40, 45, 40, 46, 50, 60, 80, 85, 92, 99],
  };
  // console.log(llmarticle);
  // const llm = llmarticle.llmarticle;
  // console.log(llm);
  const renderParts = () => {
    return llmarticle.llmarticle.map((part, index) => {
      // return demo1_1.map((part, index) => {
      if (part.type === undefined) {
        return (
          <span key={part.id}>
            {/s0/.test(part.id) && <br />}
            <span key={index} className="text">
              {part.context}
            </span>
          </span>
        );
      } else {
        switch (part.type.trim()) {
          case "comparison":
            // console.log("运行到compl");
            const newdataset = [100, 20];
            if (part.spec.value1 !== "NAN" && part.spec.value2 !== "NAN") {
              newdataset[0] = Math.max(parseFloat(part.spec.value1), parseFloat(part.spec.value2));
              newdataset[1] = Math.min(parseFloat(part.spec.value1), parseFloat(part.spec.value2));
            }
            let delta1;
            if (part.spec.value3 !== "NAN") {
              delta1 = part.spec.value3
            } else {
              if (part.spec.value1 !== "NAN" && part.spec.value2 !== "NAN")
              delta1 = Math.abs(
                parseFloat(part.spec.value1) - parseFloat(part.spec.value2)
              );
            }
            const newoptionsDefault = {
              ...optionsDefault,
              data: newdataset,
              delta: delta1,
            };
            // console.log(newoptionsDefault);
            return (
              <span key={part.id}>
                {/s0/.test(part.id) && <br />}
                <span className="text">{part.context}</span>
                <Barchart key={part.id + "-chart"} option={newoptionsDefault} delta = {"true"} />
              </span>
            );
          case "trend":
            let newData5 = [0, 100, 50, 150, 100, 300];
            let type = "positive-trend";
            let centerValue = undefined;
            if (part.spec.attribute === "negative") {
              newData5 = [300, 100, 150, 50, 100, 0];
              type = "negative-trend";
            }

            const newoptionsDefault6 = {
              ...optionsDefault,
              data: newData5,
            };

            // console.dir(newoptionsDefault6);
            if (part.spec.value3 === "NAN") {
              if (part.spec.value1 !== "NAN" && part.spec.value2 !== "NAN") {
                centerValue = Math.abs(
                  parseFloat(part.spec.value1) - parseFloat(part.spec.value2)
                );
              }
            } else {
              centerValue = part.spec.value3;
            }
            return (
              <span key={part.id}>
                {/s0/.test(part.id) && <br />}
                <span className="text">{part.context}</span>
                <Trend
                  options={newoptionsDefault6}
                  type={type}
                  centerValue={centerValue}
                />
              </span>
            );
          // case "association":
          //   const regex3 = new RegExp("(" + part.pos + ")", "g");
          //   const parts3 = part.text.split(regex3);
          //   const attribute1 = part.attribute;
          //   let classna = "pos_text";
          //   if (attribute1 === "negative") {
          //     classna = "neg_text";
          //   }
          //   return (
          //     <span key={part.id}>
          //       {parts3.map((item, index) => {
          //         if (index % 2 === 1) {
          //           return (
          //             <span key={index} className={classna}>
          //               {item}
          //             </span>
          //           );
          //         } else {
          //           return (
          //             <span key={index} className="text">
          //               {item}
          //             </span>
          //           );
          //         }
          //       })}
          //     </span>
          //   );
          case "rank":
            let highLIndex1 = 0;
            const value2 = parseInt(part.spec.value1);
            const newdataset4 = [100, 66, 33];
            let rankrange = [1, 2, 3];
            if (value2 > 3) {
              rankrange.push(value2);
            }
            const ranklength = Math.max(rankrange);
            function range(start, end, step = 1) {
              const result = [];
              for (let i = start; i <= end; i += step) {
                result.push(i);
              }
              return result;
            }
            if (ranklength > 3) {
              rankrange = range(1, ranklength + 1);
            }
            if (ranklength > 3) {
              const increment = Math.round(100 / ranklength);
              const result = [];
              for (let i = 0; i < ranklength; i++) {
                result.push(increment * (i + 1));
              }
              newdataset4 = result;
            }

            const newoptionsDefault4 = {
              ...optionsDefault,
              data: newdataset4,
            };
            // console.dir(newoptionsDefault4);

            return (
              <span key={part.id}>
                {/s0/.test(part.id) && <br />}
                <span className="text">{part.context}</span>
                <Barchart
                  option={newoptionsDefault4}
                  highLIndex={highLIndex1}
                  rankrange={rankrange}
                />
              </span>
            );
          case "proportion":
            let highLIndex = 0;
            let value = parseFloat(part.spec.value1);
            const pieCharts = [];
            while (value > 1) {
              const percentage1 = Math.min(value, 1);
              const percentage2 = 1 - percentage1;
              const newDataset2 = [percentage1, percentage2];
              pieCharts.push(newDataset2);
              value -= 1;
            }
            if (value <= 1) {
              const newDataset3 = [value, 1 - value];
              pieCharts.push(newDataset3);
            }
            const renderPieCharts = () => {
              return pieCharts.map((dataset, index) => (
                <Piechart
                  key={part.id + "-pie-" + index}
                  highLIndex={highLIndex}
                  option={{ ...optionsDefault, data: dataset }}
                />
              ));
            };
            return (
              <span key={part.id}>
                {/s0/.test(part.id) && <br />}
                <span className="text">{part.context}</span>
                {renderPieCharts()}
              </span>
            );
          case "extreme":
            const regex2 = new RegExp("(" + part.spec.pos + ")", "g");
            const parts2 = part.context.split(regex2);
            const attribute = part.spec.attribute;
            const newdataset5 = [part.value1];
            const newoptionsDefault5 = {
              ...optionsDefault,
              data: newdataset5,
            };
            let classn = "max_value";
            if (attribute === "minimum") {
              classn = "min_value";
            }
            return (
              <span key={part.id}>
                {/s0/.test(part.id) && <br />}
                {parts2.map((item, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span>
                        <Extremechart
                          option={newoptionsDefault5}
                          attribute={attribute}
                        />
                        <span key={index} className={classn}>
                          {item}
                        </span>
                      </span>
                    );
                  } else {
                    return (
                      <span key={index} className="text">
                        {item}
                      </span>
                    );
                  }
                })}
              </span>
            );
          case "anomaly":
            const regex1 = new RegExp("(" + part.spec.pos + ")", "g");
            const parts1 = part.context.split(regex1);
            // console.log(parts1);
            return (
              <span key={part.id}>
                {/s0/.test(part.id) && <br />}
                {parts1.map((item, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} className="ano_value">
                        {item}
                      </span>
                    );
                  } else {
                    return (
                      <span key={index} className="text">
                        {item}
                      </span>
                    );
                  }
                })}
              </span>
            );
          case "value":
            const regex = new RegExp("(" + part.spec.pos + ")", "g");
            const parts = part.context.split(regex);
            // console.log(parts);
            return (
              <span key={part.id}>
                {/s0/.test(part.id) && <br />}
                {parts.map((item, index) => {
                  if (index % 2 === 1) {
                    return (
                      <span key={index} className="spec_value">
                        {item}
                      </span>
                    );
                  } else {
                    return (
                      <span key={index} className="text">
                        {item}
                      </span>
                    );
                  }
                })}
              </span>
            );
          default:
            return (
              <span key={index} className="text">
                {part.context}
              </span>
            );
        }
      }
    });
  };

  return <div>{renderParts()}</div>;
};

export { ArtcleProcess };

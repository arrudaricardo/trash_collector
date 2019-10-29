import React from "react";

export default ({inputHandle}) => (
          <div className="robot-input" id="{id}">
            <div id="controller">
                <div>
                    <button
                        style={{ marginLeft: "38px" }}
                        id="up"
                        onClick={e => inputHandle("up")}
                    >
                        {" "}
                        ^{" "}
                    </button>
                </div>

                <div>
                    <button
                        style={{ marginLeft: "15px" }}
                        id="left"
                        onClick={e => inputHandle("left")}
                    >
                        {" "}
                        {"<"}{" "}
                    </button>
                    <button
                        style={{ marginLeft: "20px" }}
                        id="right"
                        onClick={e => inputHandle("right")}
                    >
                        {" "}
                        {">"}{" "}
                    </button>
                </div>

                <div>
                    <button
                        style={{ marginLeft: "38px" }}
                        id="donw"
                        onClick={e => inputHandle("down")}
                    >
                        {" "}
                        v{" "}
                    </button>
                </div>
            </div>
  </div>
)
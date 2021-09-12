import React, { Component } from "react";
import Portal from "@reach/portal";

import styled from "styled-components";
import { Spring } from "react-spring/renderprops.cjs.js";
// import { MdClose } from "react-icons/md";
import { useKeyPress } from "../hooks/useKeyPress";
import classnames from "classnames";
const ModalConatiner: any = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: ${(props: any) => props.zIndex || 100};
`;
const SideModalConatiner: any = styled.div.attrs({
  className: "flex justify-end",
})`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: ${(props: any) => props.zIndex || 100};
`;
const SideModalContentFull: any = styled.div`
  background: white;
  margin: 0px 0px 0px 0px;
  width: ${(props: any) => props.modalContentWidth || "50%"};
  min-height: 100vh;
`;
const ModalHeaderContainer = styled.header.attrs({
  className: "flex justify-between items-center",
})`
  padding: 1rem 1.2rem;
`;

const ModalContent: any = styled.div.attrs({ className: "bg-white" })`
  margin: ${(props: any) => (props.full ? "0px 0px 0px 0px" : "1.7rem auto")};
  max-width: ${(props: any) =>
    props.modalContentWidth ? props.modalContentWidth : "465px"};
  @media (max-width: 767px) {
    max-width: 90%;
  }
  @media (max-width: 1300px) {
    max-width: 70%;
  }
  min-width: ${(props: any) =>
    props.full
      ? "100%"
      : props.modalContentWidth
      ? props.modalContentWidth
      : "50%"};
  min-height: ${(props: any) => props.full && "100vh"};
`;
const ModalContentFull = styled.div`
  margin: 0px 0px 0px 0px;
  width: 100%;
  min-height: 100vh;
`;
export function Modal({
  isActive,
  header,
  close = () => null,
  renderBody,
  modalContentWidth,
  zIndex,
  contentStyle,
}: {
  isActive: boolean;
  header?: (() => React.ReactNode) | boolean;
  close?: () => void;
  renderBody: () => React.ReactNode;
  modalContentWidth?: string;
  zIndex?: string | number;
  contentStyle?: any;
}): JSX.Element {
  const ref = React.useRef<HTMLDivElement>();
  const escPress = useKeyPress("Escape");
  React.useEffect(() => {
    if (escPress && close && isActive) {
      close();
    }
  }, [escPress, close, isActive]);

  return (
    <Portal>
      {isActive ? (
        <ModalConatiner
          full
          zIndex={zIndex}
          style={{
            background: "rgba(124, 124, 124, 0.5)",
          }}
        >
          <Spring
            from={{
              transform: "translateY(100px)",
            }}
            to={{
              transform: "translateY(0)",
            }}
          >
            {(props: any) => {
              return (
                <ModalContent
                  style={{ ...props, ...contentStyle }}
                  modalContentWidth={modalContentWidth}
                  className={classnames("rounded ")}
                  ref={ref}
                >
                  {typeof header === "function" ? (
                    <ModalHeaderContainer>
                      <h5 className="font-bold text-gray-800 text-center">
                        {header()}
                      </h5>
                      {/* <button
                        onClick={close}
                        className="transition-all duration-75 ease-linear rounded-full hover:bg-gray-700 hover:text-white"
                      >
                        <MdClose size={25} />
                      </button> */}
                    </ModalHeaderContainer>
                  ) : null}
                  <section className="p-4 bg-white rounded">
                    {renderBody()}
                  </section>
                </ModalContent>
              );
            }}
          </Spring>
        </ModalConatiner>
      ) : null}
    </Portal>
  );
}

export class ModalFull extends Component<any> {
  render() {
    const { isActive, renderBody, zIndex, contentStyle, header, close } =
      this.props;
    return (
      <Portal>
        {isActive ? (
          <ModalConatiner
            zIndex={zIndex}
            style={{
              background: "white",
            }}
          >
            <Spring
              from={{
                transform: "translateY(100px)",
              }}
              to={{
                transform: "translateY(0)",
              }}
            >
              {(props: any) => {
                return (
                  <ModalContentFull style={{ ...props, ...contentStyle }}>
                    {header && (
                      <div className="sticky top-0 z-10 flex items-center p-4 bg-white border-b">
                        {/* <button
                          onClick={close}
                          className="mr-4 hover:text-white hover:bg-gray-700"
                        >
                          <MdClose size={25} />
                        </button> */}
                        <h1>{header()}</h1>
                      </div>
                    )}
                    <section className="min-h-screen p-0">
                      {renderBody()}
                    </section>
                  </ModalContentFull>
                );
              }}
            </Spring>
          </ModalConatiner>
        ) : null}
      </Portal>
    );
  }
}
export function SideModal({
  isActive,
  renderBody,
  zIndex,
  contentStyle,
  header,
  close,
  modalContentWidth,
}: any) {
  return (
    <Portal>
      {isActive ? (
        <SideModalConatiner
          zIndex={zIndex}
          style={{
            background: "rgba(124, 124, 124, 0.5)",
          }}
        >
          <Spring
            from={{
              transform: "translateX(200px)",
            }}
            to={{
              transform: "translateX(0)",
            }}
          >
            {(props: any) => {
              return (
                <SideModalContentFull
                  modalContentWidth={modalContentWidth}
                  className="w-full lg:w-6/12 md:w-9/12"
                  style={{ ...props, ...contentStyle }}
                >
                  {header && (
                    <div className="sticky top-0 z-10 flex items-center p-4 bg-white border-b">
                      {/* <button
                        onClick={close}
                        className="mr-4 rounded-full hover:text-black hover:bg-gray-200"
                      >
                        <MdClose size={20} />
                      </button> */}
                      <h3 className="font-bold text-gray-700">{header()}</h3>
                    </div>
                  )}
                  <section
                    className="h-full p-0 overflow-y-auto bg-white"
                    style={{
                      height: "calc(100vh - 53)",
                    }}
                  >
                    {renderBody()}
                  </section>
                </SideModalContentFull>
              );
            }}
          </Spring>
        </SideModalConatiner>
      ) : null}
    </Portal>
  );
}

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import * as Styles from "./ConfirmDialog.style";

// window.confirm()은 브라우저 기본 팝업이라 프로젝트 디자인과 안 맞아서(전에도 지적받음),
// 어디서든 이걸로 대체해서 쓴다: const confirm = useConfirm(); if (await confirm("...")) { ... }
const ConfirmContext = createContext(null);

export const ConfirmProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const resolveRef = useRef(null);

  const confirm = useCallback((message, options = {}) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setState({
        message,
        danger: !!options.danger,
        confirmText: options.confirmText || "확인",
        cancelText: options.cancelText || "취소",
      });
    });
  }, []);

  const close = (result) => {
    resolveRef.current?.(result);
    resolveRef.current = null;
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Styles.ConfirmModal isOpen={!!state} onRequestClose={() => close(false)} ariaHideApp={false} style={{ overlay: { zIndex: 1000, backgroundColor: "rgba(20, 20, 30, 0.5)" } }}>
        {state && (
          <>
            <Styles.Message>{state.message}</Styles.Message>
            <Styles.BtnRow>
              <Styles.CancelBtn onClick={() => close(false)}>{state.cancelText}</Styles.CancelBtn>
              <Styles.ConfirmBtn danger={state.danger} onClick={() => close(true)}>
                {state.confirmText}
              </Styles.ConfirmBtn>
            </Styles.BtnRow>
          </>
        )}
      </Styles.ConfirmModal>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm은 ConfirmProvider 안에서만 사용할 수 있습니다.");
  return ctx;
};

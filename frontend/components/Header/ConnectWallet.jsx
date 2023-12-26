import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import Image from "next/image";
import BraavosIcon from "@/public/braavos-icon.svg";
import ArgentIcon from "@/public/argent-icon.svg";
import { truncateEthAddress } from "@/utils/utils";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./header.module.css";

import { useAccount, useConnectors } from "@starknet-react/core";
import { getUser, loginUser } from "@/requests/useMe";
import { useRouter } from "next/router";

export default function ConnectWallet({ mutateQuiz, mutateMyQuiz }) {
  const router = useRouter();

  const { address, account } = useAccount();
  const [isConnect, setIsConnect] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { connectors, connect, disconnect } = useConnectors();
  const { userAddress, mutateUser } = getUser();

  useEffect(() => {
    if (address && isConnect) {
      const login = async () => {
        await loginUser(address, account);
        mutateUser();
        if (router.pathname === "/my-quizzes") {
          mutateMyQuiz();
        } else {
          mutateQuiz();
        }
      };
      login();
      handleClose();
    }
  }, [address]);

  const connectAccount = (connector) => {
    connect(connector);
    setIsConnect(true);
  };

  const disconnectAccount = () => {
    disconnect();
    localStorage.removeItem("accessToken");
    mutateUser();
    if (router.pathname === "/my-quizzes") {
      mutateMyQuiz();
    } else if (mutateQuiz) {
      mutateQuiz();
    }
    router.push("/");
  };

  return (
    <>
      {!userAddress ? (
        <Box sx={{ flexGrow: 0 }}>
          <Button
            variant="outlined"
            onClick={handleOpen}
            style={{ textTransform: "capitalize" }}
          >
            Connect wallet
          </Button>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 0 }}>
          {router.pathname !== "/my-quizzes" && (
            <Button
              variant="contained"
              onClick={() => router.push("my-quizzes")}
              style={{ textTransform: "capitalize", marginRight: "15px" }}
            >
              My Quizzes
            </Button>
          )}
          {router.pathname !== "/create-quizz" && (
            <Button
              variant="contained"
              onClick={() => router.push("create-quiz")}
              style={{ textTransform: "capitalize", marginRight: "15px" }}
            >
              Create Quiz
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => disconnectAccount()}
            style={{ textTransform: "capitalize" }}
          >
            {truncateEthAddress(userAddress)}
            <LogoutIcon style={{ marginLeft: "10px", fontSize: "20px" }} />
          </Button>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalBox}>
          <div className={styles.modalBody}>
            {connectors.map((connector) => {
              return (
                <Button
                  variant="outlined"
                  key={connector.id()}
                  onClick={() => connectAccount(connector)}
                  style={{ width: "90%", marginBottom: "20px" }}
                >
                  <Image
                    src={
                      connector.id() === "argentX" ? ArgentIcon : BraavosIcon
                    }
                    width={30}
                    height={30}
                    alt={connector.id()}
                    style={{ marginRight: "10px" }}
                  />
                  Connect {connector.id()}
                </Button>
              );
            })}
          </div>
        </Box>
      </Modal>
    </>
  );
}

import React, { useState, useEffect } from "react";
import DisplayQuizzes from "./DisplayQuizzes";

import Loader from "@/utils/Loader";
import { useAccount, useConnectors } from "@starknet-react/core";
import { getUser, loginUser } from "@/requests/useMe";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BraavosIcon from "@/public/braavos-icon.svg";
import ArgentIcon from "@/public/argent-icon.svg";
import Container from "@mui/system/Container";
import Image from "next/image";

import styles from "./allQuizz.module.css";

const Allquizz = ({ data, isLoading, mutateQuiz }) => {
  const { address, account } = useAccount();

  const { connectors, connect } = useConnectors();
  const [isConnect, setIsConnect] = useState(false);

  const { mutateUser } = getUser();

  useEffect(() => {
    if (address && isConnect) {
      const login = async () => {
        await loginUser(address, account);
        mutateUser();
        mutateQuiz();
      };
      login();
    }
  }, [address]);

  const connectAccount = (connector) => {
    connect(connector);
    setIsConnect(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {data?.length > 0 ? (
            <DisplayQuizzes allQuizz={data} />
          ) : data?.length < 1 ? (
            <Typography
              variant="h1"
              style={{
                marginTop: "50px",
                fontSize: "35px",
                textAlign: "center",
              }}
            >
              There aren't any quizzes yet.
            </Typography>
          ) : (
            <Container maxWidth="lg" className={styles.quizzesContainer}>
              <Typography variant="h1" className={styles.connectTitle}>
                Connect your wallet to access to our quizzes
              </Typography>
              {connectors.map((connector) => {
                return (
                  <Button
                    variant="outlined"
                    key={connector.id()}
                    onClick={() => connectAccount(connector)}
                    style={{ width: "300px", marginBottom: "20px" }}
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
            </Container>
          )}
        </div>
      )}
    </>
  );
};

export default Allquizz;

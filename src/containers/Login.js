import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin, GoogleLogout } from "react-google-login";
import { ethers } from "ethers";
import networks from "../assets/networks.json";
import OpenApp from "react-open-app";

const Login = ({ setProfile, profile, clientId }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [network, setNetwork] = useState(null);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged([result[0]]);
          console.log(result[0]);
        });
    } else {
      // setErrorMessage("Install Metamask");
      // console.log({ errorMessage });
      alert("install metamask extension!!");
      return <OpenApp href="https://metamask.io/download/">MetaMask</OpenApp>;
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
    getNetwork(accountName);
    changeNetwork(accountName);
    setProfile(accountName);
  };

  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
        console.log(balance);
      });
  };

  const getNetwork = (accountAddress) => {
    window.ethereum
      .request({ method: "net_version", params: [String(accountAddress)] })
      .then((network) => {
        setNetwork(network);
        console.log(network);
      });
  };

  const network_name = networks.map((element, i) => {
    if (element.chainId.toString() === network) {
      return <div>{element.name}</div>;
    } else return null;
  });

  const changeNetwork = async ({ networkName }) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x5",
          },
        ],
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleNetworkSwitch = async (networkName) => {
    await changeNetwork({ networkName });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
    connectWallet();
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  return (
    <div className="login-container">
      <h2>Login in and out with Metamask</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <button className="button-logout meta" onClick={connectWallet}>
            Connect wallet
          </button>
          <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
            User Logged in
          </h3>
          <h3 style={{ marginBottom: "10px" }}>Address: {defaultAccount}</h3>
          <p style={{ marginBottom: "10px" }}>Balance: {userBalance}</p>
          <p style={{ marginBottom: "10px" }}>Network: {network_name}</p>
          <br />
          <br />
          <button
            className="button-logout meta"
            onClick={() => handleNetworkSwitch()}
          >
            Switch to Goerli
          </button>
        </div>
      ) : (
        <OpenApp href="https://metamask.io/download/">MetaMask</OpenApp>
        // <button onClick={connectWallet}>Connect wallet</button>
      )}
    </div>
  );
};

export default Login;

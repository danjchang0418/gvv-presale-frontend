import { Else, If, Then } from "react-if";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../core/hooks/rtkHooks";

import buy from "../../assets/webroot/img/index/buy.svg";
import Logo from "../../assets/webroot/img/logos/logo(38x26).png";
import { RESPONSIVE } from "../../core/constants/responsive.const";
import { colors } from "../../core/constants/styleguide.const";
import { useWatchResize } from "../../core/hooks/useWatchResize";
import {
  setShowSignInModalAction,
  setShowSignUpModalAction,
} from "../../core/store/slices/modalSlice";
import {
  faqPath,
  featuresPath,
  homePath,
} from "../../core/util/pathBuilder.util";
import BurgerButton from "../button/burger-button/BurgerButton";
import { ButtonPrimarySmall } from "../styleguide/styleguide";

import SignInModal from "../modal/children/modal-content/SignInModal";
import SignUpModal from "../modal/children/modal-content/SignUpModal";
import AlertComponent from "../alert/AlertComponent";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import {
  createWeb3Modal,
  useWeb3Modal,
  useWeb3ModalEvents,
  useWeb3ModalState,
  useWeb3ModalTheme,
} from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient for WAGMIv2
const queryClient = new QueryClient();
const projectId = "localhost:3000";
if (!projectId) {
  throw new Error("VITE_PROJECT_ID is not set");
}

// 2. Create wagmiConfig
const wagmiConfig = defaultWagmiConfig({
  chains: [mainnet, arbitrum],
  projectId,
  metadata: {
    name: "Web3Modal React Example",
    description: "Web3Modal React Example",
    url: "",
    icons: [],
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  themeMode: "light",
  themeVariables: {
    "--w3m-color-mix": "#00DCFF",
    "--w3m-color-mix-strength": 20,
  },
});

const Header = () => {
  const modal = useWeb3Modal();
  const state = useWeb3ModalState();
  const { themeMode, themeVariables, setThemeMode } = useWeb3ModalTheme();
  const events = useWeb3ModalEvents();
  const { smallerThanLarge } = useWatchResize();

  const dispatch = useAppDispatch();

  const { showSignUpModal, showSignInModal } = useAppSelector(
    (state) => state.modal
  );
  const { showAlert } = useAppSelector((state) => state.alert);

  const sign_up = () => {
    dispatch(setShowSignUpModalAction(true));
  };

  const sign_in = () => {
    dispatch(setShowSignInModalAction(true));
  };

  return (
    <>
      <StyledHeader style={{ zIndex: 2 }}>
        <LogoSection>
          <img
            src={Logo}
            style={{ width: "25px", height: "24px" }}
            alt="logo"
          ></img>
          <h3 style={{ color: `${colors.neutrals8}` }}>{`GVV`}</h3>
        </LogoSection>
        <NavigateSection>
          <If condition={!smallerThanLarge}>
            <Then>
              <LinkGroup>
                <WagmiProvider config={wagmiConfig}>
                  <QueryClientProvider client={queryClient}>
                    <w3m-button />
                    <w3m-network-button />
                    <w3m-connect-button />
                    <w3m-account-button />

                    <button onClick={() => modal.open()}>Connect Wallet</button>
                    <button onClick={() => modal.open({ view: "Networks" })}>
                      Choose Network
                    </button>
                    <button
                      onClick={() =>
                        setThemeMode(themeMode === "dark" ? "light" : "dark")
                      }
                    >
                      Toggle Theme Mode
                    </button>
                    <pre>{JSON.stringify(state, null, 2)}</pre>
                    <pre>
                      {JSON.stringify({ themeMode, themeVariables }, null, 2)}
                    </pre>
                    <pre>{JSON.stringify(events, null, 2)}</pre>
                  </QueryClientProvider>
                </WagmiProvider>
                <StyledLink to={homePath()}>{`Home`}</StyledLink>
                <StyledLink to={""}>{`Page`}</StyledLink>
                <StyledLink to={""}>{`Portfolio`}</StyledLink>
                <StyledLink to={featuresPath()}>{`Features`}</StyledLink>
                <StyledLink to={faqPath()}>{`Blog`}</StyledLink>
                <StyledLink to={""}>{`Contact`}</StyledLink>
              </LinkGroup>
            </Then>
            <Else>
              <BurgerButton />
            </Else>
          </If>
          <StyledButtonGroup>
            <StyledJoinLink to={"sign"}>{`Join pre-Sell`}</StyledJoinLink>
          </StyledButtonGroup>
        </NavigateSection>
      </StyledHeader>
      {showSignUpModal && <SignUpModal />}
      {showSignInModal && <SignInModal />}
      {showAlert && <AlertComponent />}
    </>
  );
};

const StyledHeader = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: auto;
  background-color: ${colors.mainColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 1px 1px grey;
  justify-content: space-between;
  padding: 10px 10px 10px 10px;
  @media screen and (min-width: ${RESPONSIVE.bigmobile}) {
    display: flex;
    flex-direction: row;
  }
  @media screen and (min-width: ${RESPONSIVE.small}) {
    padding: 0px 100px 0px 100px;
  }
  @media screen and (min-width: ${RESPONSIVE.xLarge}) {
    padding: 0px 300px 0px 300px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const NavigateSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  gap: 30px;
  @media screen and (max-width: ${RESPONSIVE.large}) {
    gap: 15px;
  }
  @media screen and (max-width: ${RESPONSIVE.small}) {
    gap: 5px;
  }
  @media screen and (max-width: ${RESPONSIVE.bigmobile}) {
    width: 100%;
  }
`;
const StyledLink = styled(Link)`
  font-size: 15px;
  padding: 0px 20px;
  text-decoration: none;
  font-weight: 300;
  color: ${colors.neutrals8};
  &:hover {
    color: ${colors.primaryYellow};
  }
`;
const StyledJoinLink = styled(Link)`
  border-radius: 0px;
  font-size: 16px;
  font-family: ABeeZee;
  font-style: italic;
  font-weight: 400;
  border: none;
  padding: 10px 20px;
  background: ${colors.primaryYellow};
  color: ${colors.mainColor};
  &:hover {
    color: ${colors.mainColor} !important;
  }
`;

const LinkGroup = styled.div``;

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export default Header;

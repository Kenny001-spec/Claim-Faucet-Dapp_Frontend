import "./config/connection";
import Layout from "./components/Layout";
import CreateFaucet from "./components/CreateFaucet";
import Faucets from "./components/Faucets";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Layout>
        <CreateFaucet />
        <Faucets />
        <ToastContainer position="bottom-right"/>
      </Layout>
    </>
  );
}

export default App;
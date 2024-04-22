import { Routes, Route } from "react-router-dom";

// contexts
import ConnectionsProvider from "./contexts/ConnectionsContext";
import ZanoDetailsProvider from "./contexts/ZanoDetailsContext";

// components
import Layout from "./component/Layout/Layout";
import { IndexAssets } from "./component/IndexAssets";
import { IndexManage } from "./component/IndexManage";
import { IndexAirdrop } from "./component/IndexAirdrop";

import "./App.css";

function App() {
  return (
    <ConnectionsProvider>
      <ZanoDetailsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<IndexAssets />} />
            <Route path="/manage" element={<IndexManage />} />
            <Route path="/airdrop" element={<IndexAirdrop />} />
          </Routes>
        </Layout>
      </ZanoDetailsProvider>
    </ConnectionsProvider>
  );
}

export default App;

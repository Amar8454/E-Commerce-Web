import { Outlet } from "react-router";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { ToastContainer } from "react-toastify";
import { SummaryAPI } from "./commonFile/Summary";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Context from "./context";
import { setUserDetials } from "./featureSlice/CounterSlice";

function App() {
  const [countADDCArt, setCountADDCArt] = useState(0);
  const dispatch = useDispatch();

  const fetchUserDetials = async () => {
    const response = await fetch(SummaryAPI.userDetail.url, {
      method: SummaryAPI.userDetail.method,
      credentials: "include",
    });
    const dataAPI = await response.json();
    if (dataAPI.success) {
      dispatch(setUserDetials(dataAPI.data));
    }

    console.log(dataAPI);
  };

  const FetchAddCArtProduct = async () => {
    const countData = await fetch(SummaryAPI.getCountTotalAddCarts.url, {
      method: SummaryAPI.getCountTotalAddCarts.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataAPI = await countData.json();
    setCountADDCArt(dataAPI?.data);

    console.log(dataAPI);
  };

  useEffect(() => {
    // userDetail
    fetchUserDetials();

    // user detials cart Product
    FetchAddCArtProduct();
  }, []);

  return (
    <>
      <Context.Provider
        value={{ fetchUserDetials, countADDCArt, FetchAddCArtProduct }}
      >
        <ToastContainer position="top-center" />
        <Header />

        <main className="min-h-[calc(100vh-120px)] pt-16 pb-8">
          <Outlet />
        </main>

        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;

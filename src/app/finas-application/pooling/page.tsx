import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PoolingList from "@/screens/finas-application/pooling/PoolingList";

export const metadata: Metadata = {
  title: "Effinance - Pooling",
};

const Pooling = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pooling" />
      <PoolingList/>
    </DefaultLayout>
  );
};

export default Pooling;
